---
name: heartratetap-seo
description: Create or review SEO-focused HeartRateTap blog articles and tool landing pages. Use whenever adding or editing a page under src/app/blog, publishing a new search landing page, changing article metadata, or planning keyword-to-page coverage for this project.
---

# HeartRateTap SEO

Create each page around one coherent search-intent and keyword group. Do not treat metadata as the only SEO surface: reinforce the group in the title, description, H1, introduction, section headings, functional copy, internal links, and useful body content without keyword stuffing.

## Plan before writing

1. Define the page's primary keyword group, search intent, target reader, and URL slug.
2. List natural keyword variants, questions, and use cases that belong to that same intent.
3. Check existing routes and blog articles before choosing a slug. Do not create a near-duplicate page or force unrelated keyword groups onto one page.
4. Create a separate landing page when a distinct function or search intent deserves its own page. Each such page must let the visitor use a relevant version of the tool directly on that page; never make search visitors click through an introductory page solely to reach the tool.
5. For new factual, medical, legal, or rapidly changing content, research authoritative primary sources before drafting. Keep HeartRateTap's wellness-only and non-diagnostic positioning intact.

## Blog article requirements

Use this baseline for every new `src/app/blog/<slug>/page.tsx` article unless the user explicitly authorizes an exception:

- Write at least 800 substantive English words, excluding navigation, sources, metadata, and repeated boilerplate. Prefer a complete answer over padding.
- Use one descriptive H1 containing the primary keyword naturally. Add a direct, intent-matching introduction and a logical hierarchy of H2/H3 sections that cover variants and follow-up questions.
- Set a unique `TITLE` and `DESCRIPTION`. Include the primary keyword or a close natural variant, state the outcome for the reader, and avoid claims the article cannot support.
- Provide `metadata` with title, description, canonical URL, and Open Graph title, description, URL, and site name.
- Include `ArticleMeta`, `ArticleStructuredData`, `BlogKnowledgeHub`, `Footer`, and `SourceList` following existing blog-page conventions. Use accurate published/reviewed dates and cite authoritative sources for health information.
- Link naturally to the most relevant HeartRateTap tool or landing page once in the editorial body. Do not repeat links to the same target just to manipulate internal-link weight.
- Add only useful links to related articles, guides, or editorial-policy pages. Use descriptive anchor text that matches the destination's intent.
- Update the article's relevant links or hub entries when the page is intended to be discoverable from the blog library.

## Tool landing-page requirements

Put the tool itself in the first viewport and let visitors complete the core task in the same page. Structure the page in this order where appropriate:

1. Brand/logo and an H1 with the core keyword.
2. Concise description covering natural variants and use cases.
3. Functional tool interface.
4. Clear usage steps and feature/benefit explanations for long-tail searches.
5. Credible examples, results, or evidence when available; never fabricate testimonials.
6. Related-content links, footer, and site navigation.

Give each tool landing page one keyword group. Build separate, interconnected pages for materially different functions or intents instead of cramming many unrelated keywords into the homepage.

## Quality checks before handoff

- Confirm title, description, canonical URL, H1, and Open Graph data all describe the same keyword group and intent.
- Confirm body copy has at least 800 substantive words for blog articles, contains no keyword stuffing, and answers the search intent before asking for a conversion.
- Confirm the tool is usable without a redirect from every tool landing page.
- Check internal links resolve and the primary tool link appears once in the article body.
- Check health statements against cited sources and retain the site's medical-safety language.
- Run `npm run build` and fix all new lint, type, metadata, or link errors before handoff.
