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
- `/blog/how-to-check-pulse-manually` — a step-by-step manual wrist-pulse technique, repeatability routine and safety limits.
- `/about` — ownership, editorial standards, corrections and monetization separation.
- `/contact` — public operator contact channels, correction procedure, privacy-request route and emergency limitation.
- `/privacy-policy` and `/terms` — data, advertising and service disclosures.

The former keyword-variant tool and article URLs return permanent redirects to consolidated canonical content and are
not in the sitemap.

## Screens that must not receive Google-served ads

Never place ad code on or automatically monetize:

- `/login`, `/register`, `/reset-password`
- `/profile`
- `/checkout/*`
- `/pricing`
- `/roadmap` (public ideas must be reviewed before a `planned`, `in_progress` or `shipped` status is assigned)
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
3. Confirm `/contact` returns HTTP 200, both email links open correctly, and the footer, primary navigation, About,
   Terms and Privacy Policy all link to it.
4. Confirm the deployed Privacy Policy names third-party vendors, including Google, and states that cookies, web beacons
   or identifiers may be used for advertising when ads are enabled.
5. Confirm that the four consolidated legacy URLs return HTTP 308/301 and are absent from the sitemap.
6. Confirm that login, registration, password reset, profile, checkout, pricing, roadmap and error screens load no ad
   requests.
7. Validate the sitemap in Search Console and request indexing for the homepage, guide library and substantive
   guides after deployment.
8. If AdSense ads are enabled later, configure Google's required consent solution for applicable regions and test a
   rejected-consent session as well as an accepted session.
9. Request review from the Sites page only after the deployed version has been crawled. Keep adding genuinely distinct,
   manually reviewed content over time; do not recreate keyword-variant doorway pages.
10. Review each feedback submission before making it public. New submissions are stored as `pending`; only reviewed
   `planned`, `in_progress` or `shipped` records are returned to public pages.

## Skill audit snapshot — July 22, 2026

This is a repository and public-URL audit, not access to the publisher account. `Unknown` items require the account
owner to verify them before requesting a review. The current decision is **Ready after deployment and account checks**.

| Requirement | Status | Evidence / next action |
| --- | --- | --- |
| ADS-ELIG-01 | Unknown | Owner must confirm applicant is eligible. |
| ADS-ELIG-02 | Unknown | Owner must confirm no duplicate AdSense account. |
| ADS-ELIG-03 | Pass | Source and public-page audit found no prohibited topic or ad policy violation. |
| ADS-ELIG-04 | N/A | This is an independent Next.js website, not a hosted product. |
| ADS-OWN-01 | Pass | Repository controls the app layout and head injection path. |
| ADS-OWN-02 | Unknown | Confirm domain ownership in AdSense/Search Console. |
| ADS-OWN-03 | Pass | Public Next.js pages render normally with JavaScript enabled. |
| ADS-SITE-01 | Unknown | Confirm the site is marked Ready in the AdSense Sites page. |
| ADS-SITE-02 | Pass | Google verification meta tag and ads.txt are present. |
| ADS-TXT-01 | Pass | `public/ads.txt` has the supplied Google direct-seller line. |
| ADS-TXT-02 | Pass | ads.txt is deployed at the public root. |
| ADS-CONTENT-01 | Pass | Tool documentation, original guides, sources and limitations are public. |
| ADS-CONTENT-02 | Pass | No copied feed or embedded-only content was found. |
| ADS-CONTENT-03 | Pass | Home, guide hub and three guides have substantive visible content. |
| ADS-CONTENT-04 | Pass | No placeholder or ad-only page found. |
| ADS-CONTENT-05 | Pass | No Google ad script or ad units are currently rendered. |
| ADS-CONTENT-06 | Pass | English and Spanish are supported AdSense languages. |
| ADS-CONTENT-07 | Pass | New feedback is pending until reviewed; pending items are not public. |
| ADS-CONTENT-08 | Pass | Keyword-variant URLs permanently redirect to canonical content. |
| ADS-UX-01 | Pass | Navigation and sitemap expose the main content and trust pages. |
| ADS-UX-02 | Pass | Tool, guide hub, article links and footer provide clear paths. |
| ADS-UX-03 | Pass | No fake downloads, deceptive buttons or irrelevant redirects found. |
| ADS-UX-04 | Pass | No forced download, popup or preference-changing behavior found. |
| ADS-UX-05 | Pass | About, contact, privacy and terms pages are public. |
| ADS-UX-06 | Pass | No ad-like slots are present before approval. |
| ADS-CRAWL-01 | Pass | Homepage, guides, articles and legal pages returned HTTP 200. |
| ADS-CRAWL-02 | Pass | robots.txt allows Googlebot and public content has no login wall. |
| ADS-CRAWL-03 | Pass | Content URLs are readable without POST data. |
| ADS-CRAWL-04 | Pass | Legacy URLs use explicit permanent canonical redirects. |
| ADS-CRAWL-05 | Pass | Canonicals and stable sitemap URLs are defined. |
| ADS-CRAWL-06 | Pass | Production HTTPS pages responded successfully. |
| ADS-CRAWL-07 | Pass | Sitemap lists the canonical publisher pages. |
| ADS-PROG-01 | Unknown | Owner must ensure no invalid-traffic activity. |
| ADS-PROG-02 | Pass | No request or incentive to click ads is present. |
| ADS-PROG-03 | Pass | No ad units are present. |
| ADS-PROG-04 | Unknown | Owner must verify traffic sources are legitimate. |
| ADS-PROG-05 | Pass | No modified Google ad code is present. |
| ADS-PROG-06 | Pass | No ads are served on non-content or account pages. |
| ADS-PROG-07 | N/A | No app WebView monetization. |
| ADS-PUB-01 | Pass | No illegal-content topic or instruction found. |
| ADS-PUB-02 | Unknown | Owner must confirm rights to all original visual assets. |
| ADS-PUB-03 | Pass | No dangerous, hateful or abusive content found. |
| ADS-PUB-04 | N/A | No animal-cruelty or wildlife-product content. |
| ADS-PUB-05 | Pass | About page identifies purpose, operator and correction contact. |
| ADS-PUB-06 | Pass | Tool limits and non-medical status are stated prominently. |
| ADS-PUB-07 | N/A | No dishonest-behavior-enabling content. |
| ADS-PUB-08 | N/A | No sexual-content topic. |
| ADS-PUB-09 | Unknown | Confirm account site identity in AdSense before review. |
| ADS-PUB-10 | Pass | No ad overlay or ad-driven interaction exists. |
| ADS-PUB-11 | Pass | Ads are absent; canonical content pages are substantive. |
| ADS-PUB-12 | Pass | No out-of-context ad placements exist. |
| ADS-PUB-13 | Pass | Health content is cautious, sourced and does not make harmful claims. |
| ADS-PUB-14 | N/A | No manipulated public-interest media. |
| ADS-PUB-15 | N/A | No child-endangerment content. |
| ADS-PUB-16 | N/A | No sensitive-event monetization. |
| ADS-REST-01 | N/A | No sexual content or products. |
| ADS-REST-02 | N/A | No shocking or graphic content. |
| ADS-REST-03 | N/A | No weapons content. |
| ADS-REST-04 | N/A | No tobacco or recreational-drug content. |
| ADS-REST-05 | N/A | No alcohol-sales content. |
| ADS-REST-06 | N/A | No gambling content. |
| ADS-REST-07 | N/A | No prescription-drug sales or pharmacy content. |
| ADS-REST-08 | Pass | No ad or video implementation can obstruct content. |
| ADS-PRIV-01 | Pass | Public privacy policy covers data and Google ad technologies. |
| ADS-PRIV-02 | Pass | Policy discloses third-party advertising identifiers. |
| ADS-PRIV-03 | Pass | No Google ad requests or PII-bearing ad URLs are implemented. |
| ADS-PRIV-04 | N/A | Ads are inactive; configure Google's certified CMP before enabling ads. |
| ADS-PRIV-05 | N/A | The app does not request precise location. |
| ADS-PRIV-06 | Pass | General-audience policy and child-directed restriction are stated. |
| ADS-PRIV-07 | Pass | No custom code changes Google-domain cookies. |
| ADS-PRIV-08 | N/A | No personalized-ad audience implementation is active. |
| ADS-PRIV-09 | N/A | No housing, employment or credit ad targeting. |
| ADS-PRIV-10 | N/A | Personalized ads are inactive. |
