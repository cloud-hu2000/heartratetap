# AdSense review checklist

This file documents the site state expected before requesting another AdSense review. It is an operational checklist,
not a guarantee that Google will approve the site.

## Current ad state

- The repository does not load an AdSense ad-serving script or render an ad unit. The global
  `google-adsense-account` meta tag remains for site ownership/association.
- `public/ads.txt` authorizes publisher `pub-4356459181693102` as a direct Google seller.
- Do not add the AdSense script globally until route exclusions and the required consent configuration are ready.

## Indexable publisher content

- `/` — complete tap tool, actual interval formula, limitations, cited reference ranges and local-history explanation.
- `/guides` — curated content hierarchy and responsible-use explanation.
- `/blog/free-online-heart-rate-checker` — original, reproducible product methodology.
- `/blog/daily-resting-heart-rate-check` — a distinct comparison routine with a recording template.
- `/blog/heart-rate-zones-for-running` — exercise context, talk test and post-exercise timing limitation.
- `/about` — ownership, editorial standards, corrections and monetization separation.
- `/privacy-policy` and `/terms` — data, advertising and service disclosures.

The former keyword-variant tool and article URLs return permanent redirects to consolidated canonical content and are
not in the sitemap.

## Screens that must not receive Google-served ads

Never place ad code on or automatically monetize:

- `/login`, `/register`, `/reset-password`
- `/profile`
- `/checkout/*`
- `/pricing`
- `/roadmap`
- `/sentry-example-page`, error and not-found screens
- `/api/*`

Authentication, account, checkout, diagnostic and example routes are excluded from search in route metadata and/or
`robots.txt`. Pricing and roadmap pages are also `noindex` because their primary purpose is transactional or behavioral,
not publisher content. Search indexing controls do not replace ad route exclusions.

## Before requesting review

1. Deploy the commit and wait until production serves the new pages, redirects, `robots.txt`, `sitemap.xml` and
   `ads.txt`.
2. Open each sitemap URL in a logged-out/private browser and confirm that it has a visible H1, substantial body content,
   working navigation and no placeholder state.
3. Confirm that the four consolidated legacy URLs return HTTP 308/301 and are absent from the sitemap.
4. Confirm that login, registration, password reset, profile, checkout, pricing, roadmap and error screens load no ad
   requests.
5. Validate the sitemap in Search Console and request indexing for the homepage, guide library and three substantive
   guides after deployment.
6. If AdSense ads are enabled later, configure Google's required consent solution for applicable regions and test a
   rejected-consent session as well as an accepted session.
7. Request review from the Sites page only after the deployed version has been crawled. Keep adding genuinely distinct,
   manually reviewed content over time; do not recreate keyword-variant doorway pages.
