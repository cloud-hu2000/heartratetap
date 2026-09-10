---
name: heartratetap-seo
description: Create or review SEO-focused HeartRateTap blog articles and tool landing pages. Use whenever adding or editing a page under src/app/blog, publishing a new search landing page, changing article metadata, or planning keyword-to-page coverage for this project.
---

# HeartRateTap SEO

Create each page around one coherent search-intent and keyword group. Do not treat metadata as the only SEO surface: reinforce the group in the title, description, H1, introduction, section headings, functional copy, internal links, and useful body content without keyword stuffing.

## Non-negotiable SEO and launch rules

- Keep every HTML title at 60 characters or fewer. Keep every meta description unique and 140–160 characters long; write it as its own concise search snippet, never by copying the opening paragraph.
- Use exactly one H1, containing the page's primary keyword naturally. Include the primary keyword or a close natural variant in at least one H2.
- A core editorial or search-facing landing page needs 1,200+ substantive English words. A tool landing page needs 800+ substantive English words. Exclude navigation, metadata, source lists, and repeated boilerplate from the count.
- Make the information materially page-specific. Include relevant, verifiable real numbers (for example, a source-backed threshold, calculation, survey result, date, or worked measurement) when they help the reader; never pad pages with repeated template sentences or invented data.
- Include at least one relevant, authoritative external link on every search-facing page. Prefer a first-party official standard, university extension, or recognized industry/professional association, and ensure the linked source directly supports the nearby claim.
- Tool pages must render at least one visible, relevant input element in their initial static HTML (for example, an `<input>`, `<select>`, or `<textarea>`). Do not rely on client-side JavaScript to render the first usable control: crawlers must be able to recognize the page as a tool before JavaScript runs.
- Protect Core Web Vitals: target LCP under 2.5 s, INP under 200 ms, and CLS under 0.1. Avoid unnecessary client-side code, layout-shifting media or UI, and render-blocking assets; validate performance when a change could affect these metrics.
- For a newly launched page or site, do not change the title, meta description, or H1 during its first 1–4 weeks unless the user explicitly authorizes an exception. Treat these fields as frozen while indexing and rankings stabilize, and record the reason for any exception.

## Plan before writing

1. Define the page's primary keyword group, search intent, target reader, and URL slug.
2. List natural keyword variants, questions, and use cases that belong to that same intent.
3. Check existing routes and blog articles before choosing a slug. Do not create a near-duplicate page or force unrelated keyword groups onto one page.
4. Create a separate landing page when a distinct function or search intent deserves its own page. Each such page must let the visitor use a relevant version of the tool directly on that page; never make search visitors click through an introductory page solely to reach the tool.
5. For new factual, medical, legal, or rapidly changing content, research authoritative primary sources before drafting. Keep HeartRateTap's wellness-only and non-diagnostic positioning intact.
6. Before changing a title, description, or H1, determine whether the page or site is within its first 1–4 weeks after launch. Leave those fields unchanged during that period unless the user explicitly authorizes an exception.

## Blog article requirements

Use this baseline for every new `src/app/blog/<slug>/page.tsx` article unless the user explicitly authorizes an exception:

- Write at least 1,200 substantive English words, excluding navigation, sources, metadata, and repeated boilerplate. Prefer a complete answer over padding.
- Use one descriptive H1 containing the primary keyword naturally, and place the primary keyword or a close natural variant in at least one H2. Add a direct, intent-matching introduction and a logical hierarchy of H2/H3 sections that cover variants and follow-up questions.
- Set a unique `TITLE` of 60 characters or fewer and a unique 140–160-character `DESCRIPTION`. Include the primary keyword or a close natural variant, state the outcome for the reader, avoid claims the article cannot support, and do not reuse the first paragraph as the description.
- Provide `metadata` with title, description, canonical URL, and Open Graph title, description, URL, and site name.
- Include `ArticleMeta`, `ArticleStructuredData`, `BlogKnowledgeHub`, `Footer`, and `SourceList` following existing blog-page conventions. Use accurate published/reviewed dates and cite authoritative sources for health information.
- Link naturally to the most relevant HeartRateTap tool or landing page once in the editorial body. Do not repeat links to the same target just to manipulate internal-link weight.
- Add only useful links to related articles, guides, or editorial-policy pages. Use descriptive anchor text that matches the destination's intent.
- Add at least one relevant authoritative external link—preferably an official standard, university extension, or recognized professional/industry association—and position it beside the claim it supports.
- Use relevant, verifiable page-specific numbers where useful and avoid formulaic copy repeated across articles.
- Update the article's relevant links or hub entries when the page is intended to be discoverable from the blog library.

## Tool landing-page requirements

Put the tool itself in the first viewport and let visitors complete the core task in the same page. Its initial server-rendered/static HTML must contain at least one visible, relevant input control; a client-only placeholder or control rendered after hydration does not meet this requirement. Write at least 800 substantive English words outside navigation, metadata, source lists, and repeated boilerplate. Structure the page in this order where appropriate:

1. Brand/logo and an H1 with the core keyword.
2. Concise description covering natural variants and use cases.
3. Functional tool interface.
4. Clear usage steps and feature/benefit explanations for long-tail searches.
5. Credible examples, results, or evidence when available; never fabricate testimonials.
6. Related-content links, footer, and site navigation.

Give each tool landing page one keyword group. Build separate, interconnected pages for materially different functions or intents instead of cramming many unrelated keywords into the homepage.

Use relevant, verifiable page-specific numbers where useful and include at least one contextual authoritative external link on each tool page.

## Quality checks before handoff

- Confirm title (≤60 characters), unique 140–160-character description, canonical URL, H1, and Open Graph data all describe the same keyword group and intent; confirm the description is not copied from the opening paragraph.
- Confirm exactly one H1 contains the primary keyword and at least one H2 contains the primary keyword or a close natural variant.
- Confirm body copy has at least 1,200 substantive words for core editorial/search-facing pages and 800 for tool pages, contains no keyword stuffing or formulaic repeated copy, includes useful page-specific real numbers, and answers the search intent before asking for a conversion.
- Confirm each search-facing page contains at least one relevant authority external link (official standard, university extension, or recognized industry/professional association).
- Confirm the tool is usable without a redirect from every tool landing page, and inspect the initial static HTML to verify that a visible relevant input control is present before JavaScript executes.
- Check internal links resolve and the primary tool link appears once in the article body.
- Check health statements against cited sources and retain the site's medical-safety language.
- If performance-sensitive code or assets changed, validate that the page protects LCP <2.5 s, INP <200 ms, and CLS <0.1; record any limitation when field data is unavailable.
- For pages/sites launched within the prior 1–4 weeks, confirm title, meta description, and H1 were not changed without explicit user authorization.
- Run `npm run build` and fix all new lint, type, metadata, or link errors before handoff.
