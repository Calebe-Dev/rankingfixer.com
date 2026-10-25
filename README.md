# rankingfixer.com

English-language site for technical SEO fixing services: audits, Core Web Vitals, indexing issues and site migrations.

Same stack as [calebearaujo.com.br](https://calebearaujo.com.br): SvelteKit with every page prerendered and no client-side JavaScript (`csr = false`), deployed as a Cloudflare Worker with static assets.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Prerenders every page into `.svelte-kit/cloudflare` |
| `npm run cards` | Generates the 1200×630 share card of each page from the build (needs Chrome and ffmpeg) |
| `npm run preview` | Build and serve locally with Wrangler |
| `npm run check` | Type and template checks |

New page: create `src/routes/<path>/+page.svelte`, register it in `src/lib/site.ts`, run `npm run build && npm run cards && npm run build`. The sitemap picks it up on its own.

Maintained by [Calebe Araujo](https://calebearaujo.com.br).
