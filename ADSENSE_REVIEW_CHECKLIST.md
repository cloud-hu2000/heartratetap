# AdSense review checklist

This file documents the site state expected before requesting another AdSense review. It is an operational checklist,
not a guarantee that Google will approve the site.

## Decision — code ready; do not request review until production passes

The repository is **ready after deployment and account checks**, but the live site is not at parity with this build.
On August 15, 2026, the automated crawler check passed all 43 expected canonical publisher URLs in the local production
build. The same check found only 18 of those URLs in the production sitemap, with 25 current routes absent. Do not
request another review until the current commit is deployed, `npm run audit:adsense -- https://www.heartratetap.com`
exits successfully, and the owner-only checks below are confirmed.

### Findings ordered by severity

**Blockers**

- No content-policy blocker was found in the repository. The remaining blocker-class unknowns require the owner to
  confirm AdSense eligibility, absence of a duplicate account, domain control and the status shown in the AdSense Sites
  page.

**High risks**

- `ADS-UX-01`: the production homepage still lacks the repository's accessible mobile-menu control and direct links to
  the two working calculators. Deploy the current build and test the collapsed menu at narrow widths before review.
- `ADS-CRAWL-01`: on August 15, 2026, all 18 URLs in the production sitemap returned 200 to a
  `Mediapartners-Google` user agent, but production is missing 25 routes from the current 43-URL publisher baseline,
  including both calculators, the age-reference guide and all Spanish canonical pages. Deployment is the exact fix.
- `ADS-PRIV-04`: analytics already waits for consent, but Google advertising must remain disabled until a Google-certified
  consent solution is configured for applicable EEA/UK traffic and both accepted and rejected sessions are tested.

**Medium risks**

- The current content expansion was published in a short period. Do not respond by generating more keyword variants.
  Let the consolidated pages be crawled, keep adding only first-party product evidence or genuinely distinct tools, and
  update existing pages when a question belongs to an established intent owner.
- Owner-only evidence is still required for traffic sources, visual-asset rights and any future personalized-ad audience
  configuration.

### Low-value-content remediation evidence

- Fourteen canonical guide articles contain at least 800 substantive English words in source before shared
  navigation, metadata and footer copy. Each has a distinct search intent, visible publication/review information,
  authoritative sources and explicit product or health limitations.
- The target-heart-rate and heart-rate-recovery landing pages place a working calculator before their supporting copy and
  each contains more than 1,100 words of formula, examples, limitations and source-backed guidance.
- The methodology article now includes a first-party interactive interval explorer that applies the repository's actual
  `60,000 ÷ average interval` calculation and demonstrates one late tap and one missed beat without claiming clinical
  validation.
- The HR-versus-HRV guide includes an original interval demonstration in which two patterns retain the same average BPM
  while their spacing changes, making the product boundary visible without presenting the tap series as clinical HRV.
- The personal-log guide now offers a blank CSV with only relevant field headings; it contains no fabricated observations
  or health claims.
- A five-word-shingle comparison across the canonical articles found a maximum pairwise similarity of 1.74%, supporting
  that the articles are not template copies despite necessary recurring safety boundaries.
- The repository loads no AdSense serving script or ad unit. Publisher content, citations and tools remain the main page
  content.
- Guest-post solicitation pages are now `noindex`, absent from primary navigation and footer, and excluded from the
  sitemap. They remain directly accessible for legitimate contributors but are not presented as core publisher content.
- `npm run audit:adsense -- <base-url>` now checks the full 43-URL publisher baseline, H1 and canonical output,
  `robots.txt`, `ads.txt`, permanent redirects, excluded screens and premature AdSense serving code.

### Official basis refreshed August 15, 2026

- [AdSense eligibility](https://support.google.com/adsense/answer/9724?hl=en) requires original, high-quality content
  that attracts an audience and compliance with Program policies.
- [Google's unapproved-account guidance](https://support.google.com/adsense/answer/81904?hl=en) says Google may review
  all pages, not only the signup URL, and identifies insufficient text, under-construction pages, and a lack of original,
  rich content as common reasons for rejection.
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies) classify scaled pages
  made primarily to manipulate rankings, including AI-generated or stitched pages without added value, as abuse.
- [Google Publisher Policies and Restrictions](https://support.google.com/adsense/answer/10008391?hl=en) apply to all
  page content, including user-generated content, other ads and outbound links.

## Current ad state

- The repository does not load an AdSense ad-serving script or render an ad unit. The global
  `google-adsense-account` meta tag remains for site ownership/association.
- `public/ads.txt` authorizes publisher `pub-4356459181693102` as a direct Google seller.
- Do not add the AdSense script globally until route exclusions and the required consent configuration are ready.

## Indexable publisher content

- `/` — complete tap tool, actual interval formula, limitations, cited reference ranges and local-history explanation.
- `/guides` — curated content hierarchy and responsible-use explanation.
- `/target-heart-rate-calculator` — a working age/HRR calculator with formulas, examples, limitations and named sources.
- `/heart-rate-recovery-calculator` — a working timed-difference calculator with protocol-specific interpretation limits.
- `/blog/free-online-heart-rate-checker` — original, reproducible product methodology.
- `/blog/heart-rate-vs-heart-rate-variability` — an original same-BPM interval demonstration and a sourced explanation
  of why average tap BPM is not HRV.
- `/blog/daily-resting-heart-rate-check` — a distinct comparison routine with a recording template.
- `/blog/normal-resting-heart-rate-by-age` — population evidence separated from personal and diagnostic interpretation.
- `/blog/heart-rate-zones-for-running` — exercise context, talk test and post-exercise timing limitation.
- `/blog/how-to-check-pulse-manually` — a step-by-step manual wrist-pulse technique, repeatability routine and safety limits.
- `/about` — ownership, editorial standards, corrections and monetization separation.
- `/contact` — public operator contact channels, correction procedure, privacy-request route and emergency limitation.
- `/privacy-policy` and `/terms` — data, advertising and service disclosures.

The current build contains 42 URLs across 21 English/Spanish canonical pairs plus the new English-only HR/HRV guide. Its Spanish
alternate and language switch are intentionally withheld until a reviewed translation exists. The automated check
therefore requires 43 canonical publisher URLs before production is considered ready.

The former keyword-variant tool and article URLs return permanent redirects to consolidated canonical content and are
not in the sitemap. Guest-post solicitation routes are also outside the publisher sitemap and carry `noindex` metadata.

## Screens that must not receive Google-served ads

Never place ad code on or automatically monetize:

- `/login`, `/register`, `/reset-password`
- `/profile`
- `/roadmap` (public ideas must be reviewed before a `planned`, `in_progress` or `shipped` status is assigned)
- `/sentry-example-page`, error and not-found screens
- `/api/*`

Authentication, account, diagnostic and example routes are excluded from search in route metadata and/or `robots.txt`.
Search indexing controls do not replace ad route exclusions.

## Before requesting review

1. Deploy the commit and wait until production serves the 43 expected publisher URLs, redirects, `robots.txt`,
   `sitemap.xml` and `ads.txt`.
2. Run `npm run audit:adsense -- https://www.heartratetap.com`. Do not continue until it exits successfully. Then open
   representative English and Spanish pages in a logged-out/private browser and check mobile navigation visually.
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

## Skill audit snapshot — August 15, 2026

This is a repository and public-URL audit, not access to the publisher account. `Unknown` items require the account
owner to verify them before requesting a review. The current decision is **code ready; production not ready until the
43-URL audit and account checks pass**.

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
| ADS-CONTENT-01 | Pass | Original calculators, product methodology, an interactive interval explorer, downloadable blank templates, source-backed guides and explicit limitations provide visitor-relevant value. |
| ADS-CONTENT-02 | Pass | No copied feed or embedded-only content was found. |
| ADS-CONTENT-03 | Pass | The local build includes home, bilingual guide hubs, 14 canonical English guide intents, 13 Spanish guide intents and two working calculator landing pages per language; every canonical English blog source meets the project's 800-word floor. |
| ADS-CONTENT-04 | Pass | No placeholder or ad-only page found. |
| ADS-CONTENT-05 | Pass | No Google ad script or ad units are currently rendered. |
| ADS-CONTENT-06 | Pass | English and Spanish are supported AdSense languages. |
| ADS-CONTENT-07 | Pass | New feedback is pending until reviewed; pending items are not public. |
| ADS-CONTENT-08 | Pass | Keyword-variant URLs permanently redirect to canonical content. |
| ADS-UX-01 | Fail | The repository has an accessible mobile menu and content-first calculator links, but the August 15 production homepage does not yet contain that control or those links. Deploy and verify at narrow widths. |
| ADS-UX-02 | Pass | Tool, guide hub, article links and footer provide clear paths. |
| ADS-UX-03 | Pass | No fake downloads, deceptive buttons or irrelevant redirects found. |
| ADS-UX-04 | Pass | No forced download, popup or preference-changing behavior found. |
| ADS-UX-05 | Pass | About, contact, privacy and terms pages are public. |
| ADS-UX-06 | Pass | No ad-like slots are present before approval. |
| ADS-CRAWL-01 | Fail | The local production build passes all 43 expected publisher URLs. Production exposes only 18 of them and is missing 25 current routes, including both calculators, all Spanish canonicals and the new English HR/HRV guide. Deploy, then rerun the automated audit. |
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
| ADS-PRIV-04 | Fail | Ads are inactive, but a Google-certified CMP and accepted/rejected EEA/UK tests are still required before ad serving is enabled. |
| ADS-PRIV-05 | N/A | The app does not request precise location. |
| ADS-PRIV-06 | Pass | General-audience policy and child-directed restriction are stated. |
| ADS-PRIV-07 | Pass | No custom code changes Google-domain cookies. |
| ADS-PRIV-08 | N/A | No personalized-ad audience implementation is active. |
| ADS-PRIV-09 | N/A | No housing, employment or credit ad targeting. |
| ADS-PRIV-10 | N/A | Personalized ads are inactive. |

## Completeness check

- Requirement IDs in the installed skill reference: **73**
- Requirement IDs in this report: **73**
- Missing IDs: **none**
