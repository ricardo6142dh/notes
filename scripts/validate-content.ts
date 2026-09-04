#!/usr/bin/env bun
/**
 * nuartz content validator
 * Usage: bun scripts/validate-content.ts [content-dir]
 */
import path from "node:path"
import { getAllMarkdownFiles, slugifySegment } from "nuartz"
import { renderMarkdown } from "nuartz/markdown"

const CONTENT_DIR = path.resolve(process.argv[2] ?? "apps/web/Notas")

async function main() {
  console.log(`\nValidating content in: ${CONTENT_DIR}\n`)

  let files
  try {
    files = await getAllMarkdownFiles(CONTENT_DIR)
  } catch {
    console.error(`Could not read content directory: ${CONTENT_DIR}`)
    process.exit(1)
  }

  if (files.length === 0) {
    console.log("No markdown files found.")
    process.exit(0)
  }

  const slugifyPath = (value: string) =>
    value
      .split("/")
      .map(slugifySegment)
      .filter(Boolean)
      .join("/")

  const slugByName = new Map<string, string>()
  for (const file of files) {
    const parts = file.slug.split("/")
    const name = parts.at(-1) === "index" ? parts.at(-2)! : parts.at(-1)!
    const target = file.slug.endsWith("/index") ? file.slug.slice(0, -"/index".length) : file.slug
    if (!slugByName.has(name)) slugByName.set(name, target)
  }

  const slugSet = new Set(files.flatMap((f) => (
    f.slug.endsWith("/index") ? [f.slug, f.slug.slice(0, -"/index".length)] : [f.slug]
  )))

  const resolveLink = (target: string): string => {
    const normalized = slugifyPath(target)
    const exact = files.find((f) => f.slug === normalized)
    if (exact) return `/${exact.slug}`
    const byName = slugByName.get(normalized.split("/").pop()!)
    if (byName) return `/${byName}`
    return `/${normalized}`
  }

  const results: {
    slug: string
    errors: string[]
    warnings: string[]
  }[] = []

  for (const file of files) {
    const errors: string[] = []
    const warnings: string[] = []

    if (!file.frontmatter.title) {
      warnings.push("Missing frontmatter title")
    }

    let result
    try {
      result = await renderMarkdown(file.raw, {
        resolveLink,
        knownSlugs: slugSet,
        filePath: file.slug + ".md",
      })
    } catch (e) {
      errors.push(`Render error: ${e instanceof Error ? e.message : String(e)}`)
      results.push({ slug: file.slug, errors, warnings })
      continue
    }

    for (const link of result.links) {
      const normalized = slugifyPath(link)
      const resolved = resolveLink(link).replace(/^\/+/, "")
      const found = [...slugSet].some(
        s => s === normalized || s.endsWith("/" + normalized) || s === resolved
      )
      if (!found) {
        warnings.push(`Broken wikilink: [[${link}]]`)
      }
    }

    results.push({ slug: file.slug, errors, warnings })
  }

  const failures = results.filter(r => r.errors.length > 0)
  const withWarnings = results.filter(r => r.warnings.length > 0)

  if (failures.length === 0 && withWarnings.length === 0) {
    console.log(`All ${files.length} files validated successfully!\n`)
  } else {
    if (failures.length > 0) {
      console.log(`\nERRORS (${failures.length} files):\n`)
      for (const r of failures) {
        console.log(`  ${r.slug}`)
        for (const e of r.errors) console.log(`    [error] ${e}`)
      }
    }

    if (withWarnings.length > 0) {
      console.log(`\nWARNINGS (${withWarnings.length} files):\n`)
      for (const r of withWarnings) {
        console.log(`  ${r.slug}`)
        for (const w of r.warnings) console.log(`    [warn] ${w}`)
      }
    }
  }

  console.log(`\nSummary: ${results.length} files | ${failures.length} errors | ${withWarnings.length} with warnings\n`)

  if (failures.length > 0) process.exit(1)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
