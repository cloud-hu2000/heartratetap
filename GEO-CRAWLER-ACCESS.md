# HeartRateTap AI Crawler Access Review

> Review of crawler access, indexing signals, sitemap discovery, and machine-readable AI discovery files for the P1 content matrix.

## Executive summary

HeartRateTap's public pages are crawlable without JavaScript-only content gates. The generated `robots.txt` allows general search crawlers and explicitly allows the principal AI search and assistant crawlers while excluding account, checkout, API, password-reset, and diagnostic-demo routes.

The P1 routes are included in the application sitemap:

- `https://www.heartratetap.com/target-heart-rate-calculator`
- `https://www.heartratetap.com/heart-rate-recovery-calculator`
- `https://www.heartratetap.com/blog/normal-resting-heart-rate-by-age`

The remaining P1 discovery gap was in `llms.txt` and `llms-full.txt`; both files now include all three routes with concise descriptions and appropriate medical-safety boundaries.

## Crawler access matrix

| Tier | Crawler | Access | Evidence |
|---|---|---:|---|
| Search and assistants | GPTBot | Allowed | Explicit `Allow: /` rule with private-route exclusions |
| Search and assistants | OAI-SearchBot | Allowed | Explicit `Allow: /` rule with private-route exclusions |
| Search and assistants | ChatGPT-User | Allowed | Explicit `Allow: /` rule with private-route exclusions |
| Search and assistants | ClaudeBot / Claude-SearchBot / Claude-User | Allowed | Explicit rules with private-route exclusions |
| Search and assistants | PerplexityBot / Perplexity-User | Allowed | Explicit rules with private-route exclusions |
| Search engines | Googlebot / Bingbot | Allowed | Explicit rules with private-route exclusions |
| Discovery and training | Google-Extended, Applebot-Extended, Amazonbot, CCBot, FacebookBot | Allowed | Explicit rules with private-route exclusions |
| Other | `User-agent: *` | Allowed | Public site-wide access with private-route exclusions |

## Technical findings

- **robots.txt:** Present at `/robots.txt`; references the canonical sitemap and does not apply blanket AI blocking.
- **Sitemap:** Present at `/sitemap.xml`; P1 routes are included and private, authentication, redirect-alias, checkout, and `noindex` pricing routes are excluded.
- **Page-level robots:** Public P1 pages do not declare `noindex`, `nofollow`, `noai`, or `noimageai`.
- **Private pages:** Login, registration, profile, reset-password, checkout-success, and the Sentry example are intentionally excluded by metadata and/or robots rules.
- **Rendering:** Next.js emits the P1 pages as pre-rendered HTML, so their primary copy and links do not depend on crawler-side JavaScript execution.
- **AI discovery:** `/llms.txt` and `/llms-full.txt` are served as plain text and now mirror the P1 content additions.
- **Response headers:** No repository configuration adds an `X-Robots-Tag` that blocks the public P1 pages.

## Content Signals draft

No `Content-Signal` directive is emitted. This is an emerging draft rather than a requirement for search discovery. The current policy favors broad discoverability through standards-supported robots rules and explicit machine-readable directories.

## Maintenance recommendation

Treat `src/app/sitemap.ts`, `public/llms.txt`, and `public/llms-full.txt` as one release checklist. Whenever a new search-facing page is published, add it to all applicable discovery surfaces and verify the generated production artifacts before deployment.

**Review date:** August 11, 2026
