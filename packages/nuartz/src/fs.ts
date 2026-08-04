import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import type { Frontmatter } from "./types.js"

const IGNORED_DIRS = new Set([".obsidian", ".trash", "private", "Templates"])

export function slugifySegment(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function displayNameSegment(value: string): string {
  const labels: Record<string, string> = {
    "api-gateway": "API Gateway",
    "cap-and-databases": "CAP and Databases",
    "comunicacao-sincrona": "Comunicacao Sincrona",
    "concorrencia-e-paralelismo": "Concorrencia e Paralelismo",
    "grpc": "gRPC",
    "graphql": "GraphQL",
    "http-and-rest": "HTTP & REST",
    "operational-systems": "Operational Systems",
    "system-design": "System Design",
  }
  return labels[value] ?? value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export interface MarkdownFile {
  slug: string        // relative path without .md, e.g. "notes/foo"
  filePath: string    // absolute file path
  frontmatter: Frontmatter
  raw: string
  mtime?: Date        // File modification time
}

/** Extract date from frontmatter or filename (e.g. 2025-10-13-title.md) */
function extractDate(file: MarkdownFile): number {
  if (file.frontmatter.date) {
    const d = new Date(file.frontmatter.date as string | Date)
    if (!isNaN(d.getTime())) return d.getTime()
  }
  const basename = file.slug.split("/").pop() ?? ""
  const match = basename.match(/^(\d{4}-\d{2}-\d{2})/)
  if (match) {
    const d = new Date(match[1])
    if (!isNaN(d.getTime())) return d.getTime()
  }
  return 0
}

/**
 * Recursively walks a directory and returns all .md files.
 */
export async function getAllMarkdownFiles(
  contentDir: string
): Promise<MarkdownFile[]> {
  const results: MarkdownFile[] = []

  async function walk(dir: string) {
    let entries: { name: string; isDirectory(): boolean }[]
    try {
      entries = await fs.readdir(dir, { withFileTypes: true }) as { name: string; isDirectory(): boolean }[]
    } catch {
      return
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || IGNORED_DIRS.has(entry.name)) continue
        await walk(fullPath)
      } else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
        const raw = await fs.readFile(fullPath, "utf-8")
        const { data } = matter(raw)

        // Skip draft or unpublished files
        if (data.draft === true || data.published === false) continue

        const relative = path.relative(contentDir, fullPath)
        const rawSegments = relative
          .replace(/\.md$/, "")
          .replace(/\\/g, "/")
          .split("/")
        const slugSegments = rawSegments.map(slugifySegment)
        const last = slugSegments.at(-1)
        const parent = slugSegments.at(-2)
        const slug = parent && last === parent
          ? [...slugSegments.slice(0, -1), "index"].join("/")
          : slugSegments.join("/")
        
        // Get file modification time
        let mtime: Date | undefined
        try {
          const stat = await fs.stat(fullPath)
          mtime = stat.mtime
        } catch {
          mtime = undefined
        }

        results.push({
          slug,
          filePath: fullPath,
          frontmatter: data as Frontmatter,
          raw,
          mtime,
        })
      }
    }
  }

  await walk(contentDir)
  return results
}

/**
 * Reads a single markdown file by slug.
 * Returns null if the file doesn't exist.
 */
export async function getMarkdownBySlug(
  contentDir: string,
  slug: string
): Promise<MarkdownFile | null> {
  const filePath = path.join(contentDir, slug + ".md")
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const { data } = matter(raw)
    let mtime: Date | undefined
    try {
      const stat = await fs.stat(filePath)
      mtime = stat.mtime
    } catch {
      mtime = undefined
    }
    return { slug, filePath, frontmatter: data as Frontmatter, raw, mtime }
  } catch {
    return null
  }
}

export interface FileTreeNode {
  name: string
  path: string
  type: "file" | "folder"
  children?: FileTreeNode[]
  mtime?: Date
  date?: number  // Resolved date timestamp for sorting (frontmatter > filename > 0)
}

export interface BuildFileTreeOptions {
  /** Sort method: 'name' (alphabetical), 'modified' (file mtime), or 'date' (frontmatter/filename date) */
  sortBy?: 'name' | 'modified' | 'date'
}

/**
 * Builds a nested file tree from a flat list of MarkdownFile entries.
 */
export function buildFileTree(files: MarkdownFile[], options?: BuildFileTreeOptions): FileTreeNode[] {
  const { sortBy = 'name' } = options ?? {}
  const root: FileTreeNode[] = []
  const nodeMap = new Map<string, FileTreeNode>()

  const sortedFiles = [...files].sort((a, b) => {
    if (sortBy === 'modified') {
      return (b.mtime?.getTime() ?? 0) - (a.mtime?.getTime() ?? 0)
    }
    if (sortBy === 'date') {
      return extractDate(b) - extractDate(a)
    }
    return a.slug.localeCompare(b.slug)
  })

  for (const file of sortedFiles) {
    const parts = file.slug.split("/")
    if (parts.length === 1 && parts[0] === "index") continue
    let parentList = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const partPath = parts.slice(0, i + 1).join("/")
      const isLast = i === parts.length - 1

      if (isLast) {
        if (part === "index") continue
        const node: FileTreeNode = {
          name: file.frontmatter.title ?? displayNameSegment(part),
          path: file.slug,
          type: "file",
          mtime: file.mtime,
          date: extractDate(file),
        }
        parentList.push(node)
      } else {
        let folderNode = nodeMap.get(partPath)
        if (!folderNode) {
          folderNode = { name: displayNameSegment(part), path: partPath, type: "folder", children: [], date: 0 }
          nodeMap.set(partPath, folderNode)
          parentList.push(folderNode)
        }
        // Bubble up the latest date to the folder
        if (sortBy === 'date') {
          const fileDate = extractDate(file)
          if (fileDate > (folderNode.date ?? 0)) folderNode.date = fileDate
        } else if (sortBy === 'modified') {
          const t = file.mtime?.getTime() ?? 0
          if (t > (folderNode.mtime?.getTime() ?? 0)) folderNode.mtime = file.mtime
        }
        parentList = folderNode.children!
      }
    }
  }

  // Sort each level: folders first, then by chosen method
  function sortNodes(nodes: FileTreeNode[]): FileTreeNode[] {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1
      if (sortBy === 'date') return (b.date ?? 0) - (a.date ?? 0)
      if (sortBy === 'modified') return (b.mtime?.getTime() ?? 0) - (a.mtime?.getTime() ?? 0)
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    })
    for (const node of nodes) {
      if (node.children) sortNodes(node.children)
    }
    return nodes
  }

  return sortNodes(root)
}
