# Ricardo Notes

Public study notes and article summaries published from an Obsidian vault.

Live site: https://notes.rick.wiki

## What This Is

This repository is both:

- an Obsidian-compatible markdown vault
- a Next.js digital garden powered by Nuartz

The source notes live in `apps/web/content`. The website is generated from those markdown files and deployed to Vercel on every push to `main`.

## Repository Layout

```text
apps/web/
  app/                 Next.js App Router pages and API routes
  components/          Site UI
  content/             Obsidian vault content
  public/              Generated search/content assets, ignored by git

packages/nuartz/       Markdown, wikilink, backlink, search, and file-tree library
scripts/               Content prebuild and validation scripts
```

Main content folders:

```text
apps/web/content/
  Articles/
  Operational Systems/
  System Design/
  Templates/
  Unread/
```

## Local Development

Install dependencies:

```bash
bun install
```

Run the site locally:

```bash
bun run dev
```

Open:

```text
http://localhost:3000
```

Build production output:

```bash
bun run build
```

Run all checks:

```bash
bun run check
```

## Writing Notes

Create notes under `apps/web/content`.

Recommended frontmatter:

```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - course/system-design
  - topic/networking
---
```

Use `course/*` tags for structured study material:

- `course/system-design`
- `course/operating-systems`

Use `topic/*` tags for concepts that cut across courses:

- `topic/networking`
- `topic/databases`
- `topic/concurrency`

Avoid generic taxonomy tags such as `type`, `status`, or `area`. Folder structure and the sidebar already provide that context.

## Unread Articles

AI-generated article summaries should start in:

```text
apps/web/content/Unread/
```

Use this shape:

```markdown
---
status: unread
source: https://example.com/article
created: YYYY-MM-DD
tags:
  - topic/example
---

# Article Title

## Summary

## Key Ideas

## Questions

## Links
```

After review, move the note to the right course or topic folder.

## Links And Navigation

Use Obsidian wikilinks when linking between notes:

```markdown
[[HTTP & REST]]
[[Chapter 5 - The Stack]]
[[API Gateway|API gateways]]
```

The website generates:

- sidebar navigation from folders
- backlinks from wikilinks
- tag pages from frontmatter and inline tags
- graph data from note links
- search index with Pagefind

## Deployment

Deployment is handled by Vercel.

Project:

```text
notes
```

Production domain:

```text
notes.rick.wiki
```

The root `vercel.json` forces Vercel to use Bun and the Next.js app output:

```json
{
  "framework": "nextjs",
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build",
  "outputDirectory": "apps/web/.next"
}
```

## License

This repository includes code derived from Nuartz and Quartz-inspired work under the MIT license. Personal notes and article summaries remain owned by their respective authors.
