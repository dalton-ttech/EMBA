# Changelog

## [0.9.0] - 2026-04-25

### Added

- Added `docs/node-8.md` as the Node 8 engineering brief for the first raw-material cleaning and feature-story integration pass.
- Added `docs/reviews/node-8-review.md` as the Node 8 review record.
- Added `review:node8` so Node 8 can close with lint, typecheck, build, and audit checks.
- Added a first cleaned public feature story module at `apps/web/src/lib/public-content/gobi21-support-feature.ts`, built from the dropped `content-drop/test` package.
- Added curated class-owned public media assets under `apps/web/public/media/gobi21-support/`.

### Changed

- Version metadata is now `0.9.0` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.
- The fixture-backed public archive now includes a real feature story, `2026-gobi21-class-support`, derived from raw WeChat article materials instead of placeholder stock-only data.
- Homepage recommendation content, site stats, about-page copy, and default OG imagery now reflect the 8A-194 class identity and the Gobi 21 support story more directly.
- The public activity detail page now supports a richer hero mosaic, signal cards, tag chips, and portrait-aware gallery items.
- README and UI iteration logs now document the raw-material intake and front-end integration path.

### Process

- Node 8 establishes the first repeatable content-ingestion loop: `content-drop/test` -> curated public assets -> public-content fixture -> front-end rendering.
- Raw source files remain untouched in `content-drop/test`; the public site consumes only curated assets and structured view-model data.

### Review

- Added `docs/reviews/node-8-review.md` as the Node 8 review record.
- Node 8 implementation review completed with follow-ups for publish-date confirmation, more real story coverage, and later Payload migration.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm review:node8`
  - HTTP smoke: `GET http://127.0.0.1:3011/` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/about` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/activities/2026-gobi21-class-support` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/gallery` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/videos` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3011/contact` returned `200`
  - HTTP smoke: unknown activity slug returned `404`

## [0.8.1] - 2026-04-25

### Added

- Added `content-drop/README.md` as the raw-material intake guide for future class activity copy, images, and video links.

### Changed

- Version metadata is now `0.8.1` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.

### Process

- Prepared a stable local handoff path so editorial materials can be dropped into `content-drop/test/` before cleaning, archiving, and frontend presentation work begins.

## [0.8.0] - 2026-04-25

### Added

- Added `docs/node-7.md` as the Node 7 engineering brief for the Payload-backed public data adapter pass.
- Added `docs/reviews/node-7-review.md` as the Node 7 review record.
- Added `review:node7` so the node can close with lint/typecheck/build/audit checks.
- Added a server-side Payload client helper plus a lightweight PostgreSQL reachability probe for public-content reads.
- Added shared public-content mapping utilities for Payload media, people, videos, links, rich-text sections, date labels, and theme labels.

### Changed

- Version metadata is now `0.8.0` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.
- Public activities now prefer published Payload activity docs behind `src/lib/public-content/activities.ts`, including media, people, links, and video mapping.
- Public people now prefer published and public Payload people docs behind `src/lib/public-content/people.ts`, with featured state derived from site settings.
- Public site settings now prefer the Payload `site-settings` global behind `src/lib/public-content/site-settings-source.ts`.
- Public activities, videos, gallery, homepage recommendations, people, and metadata continue to consume the same public view models even though their source can now be Payload-backed.
- Local builds now short-circuit to fixture fallback before hitting Payload when the configured PostgreSQL is unreachable, reducing noisy connection errors during local review.
- README and node docs now document that the public-content layer prefers Payload published data when available.

### Security

- Added a root pnpm override for `postcss: 8.5.10` to clear the current audit finding inherited through Next.js.

### Process

- Node 7 is recorded as version `0.8.0`.
- The implementation used multiple subagents for repo inspection and mapping risk review, with final integration completed in the main thread.
- Node 7 intentionally leaves the public route and component contracts unchanged.

### Review

- Node 7 review record added at `docs/reviews/node-7-review.md`.
- Node 7 implementation review completed with follow-ups for live database validation and editorial-content verification.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm audit --prod`
  - `pnpm review:node7`
  - HTTP smoke: `GET http://127.0.0.1:3008/` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/about` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/people` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/contact` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/videos` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/gallery` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3008/activities/2025-ai-leadership-forum` returned `200`
  - HTTP smoke: unknown activity slug returned `404`

## [0.7.0] - 2026-04-24

### Added

- Added `docs/node-6.md` as the Node 6 engineering brief for the public-site UI refinement pass.
- Added `docs/reviews/node-6-review.md` as the Node 6 review record.
- Added `review:node6` so the node can close with a documented lint/typecheck/build/audit check bundle.
- Added new page-specific UI hooks in `public.css` for refined homepage, about, people, and contact layouts without changing the public-content data boundary.

### Changed

- Version metadata is now `0.7.0` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.
- Homepage now uses a clearer archive-entry hierarchy with a split hero, quieter browse section, lead featured activity, and stronger people preview.
- About page now reads more like a class dossier, with an opening statement band, numbered narrative sections, and a captioned hero image.
- People page now has stronger overview framing plus grouped directory sections so scanning feels closer to an archive index than a flat card gallery.
- Contact page now distinguishes institutional details from the mail-draft interaction more clearly and uses calmer visual hierarchy.
- Shared site chrome navigation and public page styling were refined so the public information layer feels more archival and less product-template-like.
- README and UI iteration notes now document Node 6 as a dedicated visual refinement pass.

### Process

- Node 6 is recorded as version `0.7.0`.
- The implementation used multiple parallel subagents: one UI audit explorer and two component-structure workers, with final integration done in the main thread.
- Node 6 intentionally keeps the same route and public-content adapter contracts introduced in earlier nodes.

### Review

- Node 6 review record added at `docs/reviews/node-6-review.md`.
- Node 6 implementation review completed with follow-ups for browser tooling, class-owned imagery, and later site-chrome refinement.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm audit --prod`
  - `pnpm review:node6`
  - HTTP smoke: `GET http://127.0.0.1:3007/` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/about` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/people` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/contact` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/videos` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/gallery` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3007/activities/2025-ai-leadership-forum` returned `200`
  - HTTP smoke: unknown activity slug returned `404`

## [0.6.0] - 2026-04-24

### Added

- Added a Payload `site-settings` global for homepage recommendation, class introduction, contact information, and default SEO metadata.
- Added public-content adapters and fixture-backed sources for site settings and people directory data.
- Added public routes at `/about`, `/people`, and `/contact`.
- Added shared public site chrome with header and footer navigation.
- Added a homepage information layer with recommended activities, recommended people, and class-facing summary blocks.
- Added a lightweight email-draft contact interaction that lets visitors fill in email and message without storing submissions on-site.
- Added `docs/node-5.md` as the Node 5 engineering brief.
- Added `docs/reviews/node-5-review.md` as the Node 5 review record.

### Changed

- Version metadata is now `0.6.0` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.
- Public site routes now sit inside a shared site chrome rather than isolated pages.
- Root metadata now uses the site-settings fallback layer for default title, description, keywords, and OG image.
- Homepage recommendations now come from a site-settings driven adapter boundary instead of relying only on an activity-level boolean.
- README now documents the public information routes, site-settings responsibility, and the current non-persistent contact interaction.
- UI iteration notes now record Node 5 as the first public information-layer pass.

### Process

- Node 5 is recorded as version `0.6.0`.
- Site settings and people directory remain fixture-backed in local review while PostgreSQL is unavailable.
- Contact interaction intentionally stops at drafting an email and does not introduce a lead-storage backend in this node.

### Review

- Node 5 review record added at `docs/reviews/node-5-review.md`.
- Node 5 implementation review completed with follow-ups for browser tooling and later Payload-backed reads.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm audit --prod`
  - `pnpm review:node5`
  - `pnpm --filter @emba/web payload:types`
  - HTTP smoke: `GET http://127.0.0.1:3004/` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/about` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/people` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/contact` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/videos` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/gallery` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3004/activities/2025-ai-leadership-forum` returned `200`
  - HTTP smoke: unknown activity slug returned `404`
- Blocked by local tooling:
  - Browser screenshot checks remain unavailable because Playwright/Chrome MCP tooling is still not working in this environment
- Deferred:
  - Payload-backed site settings and people reads still require PostgreSQL

## [0.5.0] - 2026-04-24

### Added

- Added public media-library view model types at `apps/web/src/types/media-library.ts` for video cards, yearly video groups, gallery album cards, and gallery spotlight images.
- Added fixture-backed video-library derivation utilities at `apps/web/src/lib/public-content/videos.ts`.
- Added fixture-backed gallery derivation utilities at `apps/web/src/lib/public-content/gallery.ts`.
- Added `getActivityDetails()` plus expanded public-content exports so Node 4 public media pages can consume the same public-safe activity view model boundary introduced in Node 3.
- Added public routes at `/videos` and `/gallery`.
- Added homepage archive entry cards for activities, videos, and gallery browsing.
- Added `ArchiveMedia` for public image fallbacks when explicit covers are missing.
- Added `site-routes` helpers so public internal links do not rely on broad inline route casting.
- Added `docs/node-4.md` as the Node 4 engineering brief.
- Added `docs/reviews/node-4-review.md` as the Node 4 review record.

### Changed

- Version metadata is now `0.5.0` across the root workspace, `@emba/web`, `@emba/content-schema`, and `@emba/design-tokens`.
- Public activity, video, and gallery surfaces now use shared public-media fallback behavior instead of assuming every record has a required cover.
- Public CSS was reorganized around shared archive foundations plus media-page blocks, with page-level variables reserved for later UI iteration.
- Video items now sort by published date fallback and group by year through the public data adapter.
- Gallery albums now fall back from explicit cover to hero/gallery media before rendering a placeholder.
- README now documents `/videos`, `/gallery`, the public preview-image fallback rule, and Node 4 documentation links.
- UI iteration notes now record Node 4 as the first public media-archive pass.

### Process

- Node 4 is recorded as version `0.5.0`.
- Public media pages remain fixture-backed in local review; live Payload reads are still deferred until PostgreSQL is available.
- Gallery cards intentionally route back to activity details in this node; dedicated album pages are a later product decision.

### Review

- Node 4 review record added at `docs/reviews/node-4-review.md`.
- Node 4 implementation review completed with follow-ups for browser tooling and later Payload-backed reads.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm audit --prod`
  - `pnpm review:node4`
  - HTTP smoke: `GET http://127.0.0.1:3003/` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3003/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3003/videos` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3003/gallery` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3003/activities/2025-ai-leadership-forum` returned `200`
  - HTTP smoke: unknown activity slug returned `404`
- Blocked by local tooling:
  - Browser screenshot checks remain unavailable because Playwright/Chrome MCP tooling is still not working in this environment
- Deferred:
  - Payload-backed public media reads and admin validation still require PostgreSQL

## [0.4.0] - 2026-04-23

### Added

- Added the public activity archive list route at `/activities`.
- Added the public activity detail route at `/activities/[slug]`.
- Added public activity view model types, fixture data, and a data access boundary at `apps/web/src/lib/public-content`.
- Added public activity archive components for scannable list rows, featured activity preview, detail facts, activity minutes, people, videos, links, and gallery sections.
- Added fixture fallback data so public pages render without PostgreSQL or Payload reads.
- Added `docs/node-3.md` as the Node 3 engineering brief.
- Added `docs/reviews/node-3-review.md` as a review placeholder for the main thread.

### Changed

- README now documents the public activity archive routes and clarifies that the first public pages are designed around view models and fixture fallback before the Payload connection is finalized.
- UI iteration notes now record the first visual direction for public activity list/detail pages and explicitly keep the public-site UI open for repeated iteration.
- Homepage now links into the activity archive.
- `next.config.mjs` allows the specific remote image host used by fixture/demo media instead of allowing arbitrary remote image hosts.
- Removed a duplicate `public.css` import from global styles.

### Process

- Node 3 is recorded as version `0.4.0`.
- The public site UI is still expected to iterate after the first activity archive pass.
- Later work should replace or supplement fixture fallback with Payload-backed data while preserving the view model boundary.
- Public activity pages are statically generated from fixtures in Node 3, so `next build` does not depend on local PostgreSQL.

### Review

- Node 3 review placeholder added at `docs/reviews/node-3-review.md`.
- Node 3 implementation review completed with follow-ups for browser screenshot tooling and later Payload-backed data reads.

### Tests

- Passed:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm audit --prod`
  - `pnpm review:node3`
  - HTTP smoke: `GET http://127.0.0.1:3002/activities` returned `200`
  - HTTP smoke: `GET http://127.0.0.1:3002/activities/2025-ai-leadership-forum` returned `200`
  - HTTP smoke: unknown activity slug returned `404`
- Blocked by local tooling:
  - Playwright MCP could not create its temp directory under `C:\Windows\System32`
  - Chrome MCP had an invalid local browser executable path
- Deferred:
  - Database-backed Payload published activity reads remain a follow-up until PostgreSQL is available

## [0.3.0] - 2026-04-23

### Added

- Added Payload collections for activity minutes, people/guests, and external video metadata.
- Added activity minutes fields for identity, time/place, participants, long-form minutes, agenda notes, highlights, outcomes, quotes, follow-ups, media, videos, links, SEO/share metadata, and publication state.
- Added people/guest fields for reusable speakers, classmates, hosts, organizers, affiliations, portraits, public profile links, public visibility, and editor-only notes.
- Added external video fields for provider, provider ID, canonical URL, duration, language, caption/transcript state, uploaded cover image, preview notes, source notes, and rights notes.
- Added a unified activity detail field template so editors can capture consistent activity identity, timing, venue, participants, media, video, minutes, review, and SEO/share metadata.
- Added generated Payload TypeScript definitions at `apps/web/payload-types.ts`.
- Added a Node 2 engineering brief at `docs/node-2.md`.
- Added a Node 2 review placeholder at `docs/reviews/node-2-review.md`.

### Changed

- README now summarizes the backend content models for activities, people/guests, videos, and the editor-facing activity-minutes field template.
- UI iteration notes now record Node 2 as an admin editing experience change, not a public-site visual direction or final public archive design.
- Media records now include `visibility`; anonymous reads only expose media explicitly marked public.
- Remote image proxy configuration no longer allows arbitrary HTTPS hostnames.

### Security

- Anonymous reads for activities and external videos are limited to `published` records.
- Anonymous reads for people require both `published` status and public visibility.
- Content management for activities, people, and external videos is limited to `superAdmin`, `admin`, and `editor`; `materialManager` remains focused on media assets.
- External video records validate URL shape and restrict source links to an explicit platform host allowlist; editors do not paste iframe, script, or arbitrary HTML.
- Any externally sourced video or cover metadata preserves source, rights, and attribution fields before public display.

### Process

- Node 2 package versions were updated to `0.3.0` by the main thread.
- Review feedback from the Node 2 security explorer was integrated into the access rules, media visibility, external video validation, and image host policy.

### Review

- Node 2 review placeholder added at `docs/reviews/node-2-review.md`.
- Node 2 implementation review completed with follow-ups for database-backed admin smoke tests and relationship publication validation.

### Tests

- Passed:
  - `pnpm install --lockfile-only`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm audit --prod`
  - `pnpm review:node2`
  - `pnpm --filter @emba/web payload:types`
  - Temporary local smoke test: `GET http://127.0.0.1:3001/` returned `200`
- Blocked by local environment:
  - `GET http://127.0.0.1:3001/admin` returned `500` because PostgreSQL was unavailable at `127.0.0.1:5432`
  - `GET http://127.0.0.1:3001/api/activities` returned `500` for the same database connection reason
  - Database-backed create/edit/admin role checks for activities, people, external videos, and media

## [0.2.0] - 2026-04-23

### Added

- Added the Node 1 backend foundation for the operator-facing Payload admin surface.
- Added role-aware CMS user management for `superAdmin`, `admin`, `reviewer`, `editor`, and `materialManager`.
- Added the media library collection with image/video upload support, alt text, caption, source, preview focus, rights metadata, and generated image sizes.
- Added documentation for local backend startup, required environment variables, and first administrator creation.
- Added the Node 1 engineering brief and review placeholder.
- Added strict-environment checks for required Payload secrets and database configuration.

### Changed

- Payload admin is now configured with an EMBA Archive title suffix and grouped admin navigation for system users and media assets.
- User access rules now allow first-user bootstrap, user self-read/update, admin-managed user operations, super-admin-only user deletion, and media management by editorial/material roles.
- Media read access is public while create/update/delete access is restricted to authorized CMS operators.
- Added a `uuid: 14.0.0` pnpm override to clear the current `@payloadcms/db-postgres` transitive vulnerability.

### Security

- Added explicit CMS role boundaries for admin panel access, user management, role assignment, user deletion, and media management.
- Documented `PAYLOAD_SECRET` and `DATABASE_URL` as required backend configuration, with `EMBA_STRICT_ENV` available for production-like fail-fast checks.

### Process

- Node 1 documentation records scope, acceptance criteria, validation placeholders, and follow-up handoff notes for the main thread.
- Package version updates remain owned by the main thread for this node.

### Review

- Node 1 review placeholder added at `docs/reviews/node-1-review.md`.
- Node 1 implementation review completed with follow-ups for database-backed admin smoke tests.

### Tests

- Passed:
  - `pnpm install`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm audit --prod`
  - Temporary local smoke test: `GET http://127.0.0.1:3001/` returned `200`
- Blocked by local environment:
  - `GET http://127.0.0.1:3001/admin` returned `500` because PostgreSQL was unavailable at `127.0.0.1:5432`
  - First administrator creation flow
  - Role/access checks for users and media

## [0.1.0] - 2026-04-22

### Added

- Initialized the pnpm monorepo for the EMBA activity archive.
- Added the Next.js, TypeScript, Payload CMS, and PostgreSQL project skeleton.
- Reserved public UI iteration directories, design token entry points, and review documentation.
- Added Node 0 engineering documentation, architecture notes, node workflow, review template, Node 0 review record, and UI iteration log.

### Changed

- Upgraded the initial runtime baseline to `Next.js 16.2.3` and `Payload CMS 3.83.0` after dependency audit.
- Added pnpm overrides for patched `dompurify` and `esbuild` transitive dependency versions.
- Migrated ESLint config to the Next 16 flat-config export shape.

### Security

- `pnpm audit --prod` completed with no known production vulnerabilities.

### Process

- Documented the gated node exit flow: per-node review, version update, `CHANGELOG.md` update, and UI iteration record update before the next node starts.

### Review

- Node 0 review record added at `docs/reviews/node-0-review.md`.
- Node 0 implementation review completed.
- No unrelated tracked files were changed.

### Tests

- `pnpm install --lockfile-only`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm review:node0`
- `pnpm audit --prod`
- Local dev smoke test: `GET http://127.0.0.1:3000/` returned `200` and contained the homepage title.

### Notes

- The local Windows sandbox requires workspace-scoped user/temp environment variables for pnpm commands.
- `next build` requires elevated execution in this sandbox because Next.js spawns a production build worker.
