# UI Iteration Log

This log records user-facing UI changes by node. Update it whenever public pages, Payload admin behavior, visual tokens, layout, copy, imagery, or responsive behavior changes.

## Required Entry Fields

Each UI entry should include:

- Node and version.
- Date.
- Surface changed.
- User goal.
- Change summary.
- Verification performed.
- Follow-ups.

## Entries

### Node 0 / `0.1.0` / 2026-04-22

- Surface: public home page placeholder and base design tokens.
- User goal: establish a visible public archive entry point for later editorial work.
- Change summary: introduced a public route shell, hero-style first viewport, global styles, and initial design token variables.
- Verification: pending local browser review after dependencies are installed.
- Follow-ups:
  - Verify Chinese copy renders correctly in browser and source.
  - Replace placeholder copy with approved editorial content.
  - Capture responsive screenshots after the first local run.

### Node 1 / `0.2.0` / 2026-04-23

- Surface: Payload admin foundation for operators.
- User goal: make the backend feel like a content operations workspace before activity records are added.
- Change summary: planned/admin-facing changes cover clearer collection grouping, readable role labels, media metadata fields, and first-user setup guidance.
- Verification: pending local `/admin` smoke test and role/access checks after backend implementation is integrated.
- Follow-ups:
  - Capture admin screenshots once the local database is running.
  - Revisit public-site visual language in Node 3 and later UI iteration passes.

### Node 2 / `0.3.0` / 2026-04-23

- Surface: Payload admin editing experience for activity archive content.
- User goal: let editors record activity minutes, related people/guests, external video details, and cover-preview metadata in a consistent order.
- Change summary: documents the admin UX direction for activity detail fields, including identity, timing, participants, minutes, media, video, review/publication, and search/share metadata. This is an admin/editor workflow change, not a public-site visual design approval or final archive-detail layout.
- Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm review:node2`, and Payload type generation passed. Browser/admin smoke remains blocked until local PostgreSQL is running.
- Follow-ups:
  - Capture screenshots of the activity, people/guest, video, and cover-preview editing screens.
  - Confirm labels and descriptions are understandable for non-developer operators.
  - Keep public visual treatment for activity cards/details open for later UI nodes.

### Node 3 / `0.4.0` / 2026-04-23

- Surface: public activity list and activity detail pages.
- User goal: let public visitors browse EMBA activities and open a readable detail page while the archive data source is still being stabilized.
- Change summary: records the first visual direction for the public archive pages: scannable activity summaries, clear date/place context, editorial detail pages, restrained media/video presentation, and fixture-backed content for early review. This is the first public-site direction, not the final visual language.
- Verification: `pnpm review:node3` passed; HTTP smoke returned `200` for `/activities` and a representative detail page, and unknown slugs returned `404`. Browser screenshot checks are blocked by local Playwright/Chrome MCP permissions/configuration.
- Follow-ups:
  - Iterate repeatedly on activity card density, imagery, filters, and detail-page rhythm after real activity content is available.
  - Confirm fixture fallback and later Payload-backed data produce the same visible page structure.
  - Capture screenshots for the first public archive pass and compare mobile/desktop layouts.
  - Revisit typography, spacing, empty states, and optional media/video sections before public launch.

### Node 4 / `0.5.0` / 2026-04-24

- Surface: public homepage navigation, video library page, and gallery archive page.
- User goal: let visitors browse class videos and image-heavy activity memories directly, without needing to scan the full activity archive first.
- Change summary: added a media-archive visual layer beside the activity archive, including `/videos`, `/gallery`, and homepage entry cards. The new pages share the same archive system language as Node 3, but introduce distinct media blocks for feature cards, yearly video groupings, spotlight imagery, and album cards. UI hooks now expose page-level CSS variables such as `--archive-hero-columns`, `--media-grid-columns`, `--card-padding`, and `--page-accent` so later redesign passes can change rhythm and tone without rewriting route or data code.
- Verification: `pnpm review:node4` passed; temporary production smoke returned `200` for `/`, `/activities`, `/videos`, `/gallery`, and a representative activity detail page, and returned `404` for an unknown activity slug.
- Follow-ups:
  - Capture screenshots for `/videos` and `/gallery` once browser MCP tooling is restored.
  - Revisit card density, imagery scale, and gallery spotlight rhythm after real class-owned media replaces demo fixtures.
  - Decide whether gallery cards should eventually open dedicated album-detail routes instead of routing through activity details.
  - Connect the same media view models to Payload-published content when PostgreSQL becomes available locally.

### Node 5 / `0.6.0` / 2026-04-24

- Surface: homepage information layer, class introduction, people and guest directory, and contact page.
- User goal: let visitors quickly understand what kind of class this is, who represents it publicly, what they should read first, and how to get in touch.
- Change summary: Node 5 moved the public site from “archive browser” toward “archive + public-facing portal.” The homepage gained class positioning, recommended activities, recommended people, and a contact entry point; `/about`, `/people`, and `/contact` were added; and homepage recommendation, class introduction, contact information, and default SEO were consolidated behind one `site-settings` boundary. The visual language still stayed inside the archive system rather than branching into a separate brand microsite.
- Verification: `pnpm review:node5` passed, Payload types were generated, and temporary production smoke returned `200` for `/`, `/about`, `/people`, `/contact`, `/activities`, `/videos`, `/gallery`, and one representative activity detail page; an unknown activity slug returned `404`.
- Follow-ups:
  - Check homepage, about, people, and contact in browser screenshots once local tooling is available again.
  - Strengthen imagery scale, layout hierarchy, and recommendation emphasis after real class-owned assets arrive.
  - Decide whether contact should remain mailto-based long-term or later upgrade to a controlled submission flow.
  - Connect the same `site-settings` and `people` view models to published Payload data.

### Node 6 / `0.7.0` / 2026-04-24

- Surface: homepage, about page, people directory, contact page, and shared public chrome.
- User goal: make the public information surfaces feel more like a premium class archive and less like a flat product/site template.
- Change summary: Node 6 is a dedicated UI refinement pass. The homepage now reads like an archive front hall with a split hero, a clearer browse rail, a lead featured activity, and a more deliberate people preview. The about page now behaves more like a dossier with an opening statement, numbered narrative sections, and a captioned image. The people page now has stronger directory framing and category grouping. The contact page now feels closer to institutional correspondence, with calmer hierarchy between primary contact details and the mail-draft interaction. Shared CSS was extended with new page-specific hooks so the public UI can keep iterating without changing route contracts or data adapters.
- Verification: `pnpm review:node6` passed, and HTTP smoke returned `200` for `/`, `/about`, `/people`, `/contact`, `/activities`, `/videos`, `/gallery`, and one representative activity detail page on `http://127.0.0.1:3007`; an unknown activity slug returned `404`. Browser screenshot verification is still blocked by local tooling.
- Follow-ups:
  - Capture desktop and mobile screenshots for `/`, `/about`, `/people`, and `/contact` once browser tooling is restored.
  - Replace demo imagery with class-owned photography or commissioned visuals and tune spacing/color contrast around those assets.
  - Decide whether the site chrome should gain active-nav styling or route-aware state in a later refinement pass.

### Node 7 / `0.8.0` / 2026-04-25

- Surface: not applicable.
- User goal: not applicable.
- Change summary: no deliberate user-facing UI changes in this node. Node 7 is the data-source integration pass that connects the existing public pages to Payload published data through the adapter layer while preserving fixture fallback.
- Verification: `pnpm review:node7` and HTTP smoke results are recorded in the node review.
- Follow-ups: none.

### Node 8 / `0.9.0` / 2026-04-25

- Surface: homepage recommendation area, activity detail page, about page imagery/copy, and local public media assets.
- User goal: turn a real dropped WeChat article package into a front-end story that feels like class-owned editorial content instead of demo data.
- Change summary: Node 8 introduces the first cleaned real-material feature story, `2026-gobi21-class-support`, built from `content-drop/test`. The homepage now leads with a class-owned Gobi 21 support story; the about page shifts from stock imagery toward class photography and more specific copy; and the activity detail page gains a richer hero treatment, tag chips, signal cards, and better handling for portrait poster images in the gallery. This is the first pass where the public site starts to read like an actual 8A-194 archive rather than a generic EMBA demo.
- Verification: `pnpm review:node8` plus HTTP smoke on the preview server are recorded in the node review.
- Follow-ups:
  - Replace inferred metadata such as the provisional archive date with the exact WeChat publish timestamp once confirmed.
  - Add more real class stories so homepage recommendations and people signals stop depending on older demo fixtures.
  - Review portrait poster treatment and gallery density again after two or three more real content packages are added.

## No-UI-Change Marker

If a node does not change UI, add a short entry such as:

```markdown
### Node N / `x.y.z` / YYYY-MM-DD

- Surface: not applicable.
- User goal: not applicable.
- Change summary: no user-facing UI changes in this node.
- Verification: not applicable.
- Follow-ups: none.
```
