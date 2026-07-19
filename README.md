# jon.dev

A small, Git-driven personal site for writing and projects.

## Content

Public content lives in [`content/site.ts`](content/site.ts). Add entries to
the `writing` or `projects` arrays, then commit and push the change.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm build
node --test tests/rendered-html.test.mjs
```

The production build targets the Cloudflare-compatible Sites runtime.
