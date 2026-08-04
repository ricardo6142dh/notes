import path from "node:path"
import { defineConfig } from "nuartz"

export default defineConfig({
  contentDir: path.join(process.cwd(), "content"),
  site: {
    title: "Ricardo Notes",
    description: "Ricardo's public Obsidian digital garden",
    baseUrl: "https://notes.rick.wiki",
  },
  homePage: "index",
  features: {
    wikilinks: true,
    callouts: true,
    tags: true,
    backlinks: true,
    toc: true,
    search: true,
    darkMode: true,
  },
  nav: {
    links: [
      { label: "GitHub", href: "https://github.com/ricardo6142dh/notes", external: true },
    ],
  },
})
