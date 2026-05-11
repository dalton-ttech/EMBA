# Node 4 Engineering Brief

Node 4 extends the first public archive pass into media-focused browsing. It introduces a public video library and gallery archive beside the existing activity archive, while continuing to rely on a narrow public-safe view model boundary instead of exposing raw Payload collection structure.

## Version

- Node: `4`
- Version: `0.5.0`
- Date: `2026-04-24`
- Status: approved with follow-ups

## Goals

- Add a public video library route at `/videos`.
- Add a public gallery archive route at `/gallery`.
- Reuse the Node 3 public activity view model boundary so media surfaces are derived from public-safe activity data instead of binding directly to Payload records.
- Preserve fixture-backed reviewability while PostgreSQL and live Payload reads remain unavailable locally.
- Make video and gallery surfaces easy to iterate visually without rewriting the content/data contract.
- Record Node 4 as a public media-archive pass, not as the final public-site visual approval.

## Current Repository State

The current repository now includes the full Node 4 public-media pass:

- `apps/web/src/types/media-library.ts` defines `VideoLibraryItem`, `VideoYearGroup`, `GalleryAlbumItem`, and `GallerySpotlightImage`.
- `apps/web/src/lib/public-content/videos.ts` derives video-library items from the public-safe activity detail model.
- `apps/web/src/lib/public-content/gallery.ts` derives gallery album and spotlight data from the same public-safe activity detail model.
- `apps/web/src/lib/public-content/activities.ts` now exposes `getActivityDetails()` so later media routes can share one normalized activity source.
- `apps/web/src/lib/public-content/index.ts` exports the new video/gallery helpers alongside the existing activity helpers.
- `apps/web/src/components/public/VideoLibrary.tsx` and `GalleryArchive.tsx` render the two new public archive surfaces.
- `apps/web/src/components/public/ArchiveMedia.tsx` centralizes public-image fallback behavior.
- `apps/web/src/lib/site-routes.ts` keeps internal public links on stable route builders instead of spreading route casts through page components.
- `apps/web/src/styles/public.css` now exposes shared archive/page variables such as `--archive-hero-columns`, `--media-grid-columns`, `--card-padding`, and `--page-accent` so later UI passes can iterate without rewriting route logic.

## Scope

Node 4 covers the next public reader-facing archive surfaces:

- Video-library page structure, preview card rhythm, yearly grouping, and linkage back to the source activity detail page.
- Gallery-archive page structure, spotlight imagery or archive grouping, and linkage back to the source activity detail page unless scope later expands to dedicated album routes.
- Shared public view models for video and gallery surfaces.
- Public-safe image fallback behavior for missing activity or video cover assets.
- Homepage navigation updates so the media archive is discoverable from the first viewport.
- Fixture-backed behavior for local review and documentation while database access is still blocked.
- Documentation, changelog, UI iteration, and review updates associated with `0.5.0`.

Node 4 does not finalize the visual design, complete database-backed public reads, add advanced filtering/search, create dedicated public gallery detail routes, or expand the admin editing experience unless the main thread explicitly pulls those items into scope.

## Public Routes

### `/videos`

The public video library should help visitors browse media highlights without opening every activity first:

- Show public-safe video entries only.
- Present each entry with a thumbnail or cover preview, title, platform/provider label, optional duration/date, and context about the source activity.
- Keep a clear link back to the originating activity detail page.
- Group or sort in a way that supports later archive growth, such as by year.
- Fall back to fixture-derived data when live Payload data is unavailable.

### `/gallery`

The public gallery archive should make event imagery easier to scan across time:

- Show activity-linked gallery/album entries only from public-safe activity data.
- Present cover imagery, title, date, location/theme context, short summary, and image count where available.
- Optionally highlight a smaller set of standout images while preserving a scannable archive structure.
- Link each gallery item back to the relevant activity detail page unless a separate gallery detail route is intentionally added later.
- Fall back to fixture-derived data when live Payload data is unavailable.

## Thumbnail Strategy

Node 4 resolves public preview media in the following order:

1. Explicit public cover/thumbnail on the video or activity record.
2. Activity cover image.
3. Activity hero image.
4. First public gallery image.
5. Styled placeholder in the UI.

This keeps the public routes robust while `next/image` remains intentionally strict about remote hosts and while Payload-backed media relationships are not yet live locally.

## Shared Media Boundary

Node 4 should keep the same separation discipline established in Node 3:

- Public pages consume view models, not raw Payload documents.
- Shared view models include only public-facing labels, links, preview media, and archive metadata needed by the UI.
- Internal notes, moderation state, draft-only content, and private media remain outside the public component contract.
- Fixture records and future Payload-backed records should remain interchangeable at the route/component layer.
- External video handling should rely on approved metadata and cover/thumbnail fields, not arbitrary iframe or script input.

## Fixture and Payload Strategy

Fixtures remain part of the Node 4 development path:

- Video and gallery utilities should continue to work against the fixture-backed activity source already used in Node 3.
- Later work should swap or supplement that source with published Payload reads without rewriting the public components.
- Database-backed route smoke tests should be added only after PostgreSQL is available locally.
- Documentation should continue to make it explicit whether a public media page is currently fixture-only, Payload-backed, or hybrid.

## Acceptance Criteria

Node 4 can close when:

1. Version `0.5.0` is confirmed in package metadata by the main thread.
2. `/videos` renders a public-safe media archive from the agreed shared data boundary.
3. `/gallery` renders a public-safe gallery archive from the agreed shared data boundary.
4. Public media pages show stable cover/thumbnail previews for videos and gallery entries without exposing raw CMS fields or unsafe embed input.
5. Fixture-backed behavior remains documented and reviewable if live database access is blocked.
6. Homepage or equivalent public navigation exposes the new media surfaces if Node 4 includes that navigation step.
7. `CHANGELOG.md`, `docs/ui-iterations.md`, and `docs/reviews/node-4-review.md` are updated by the time the node closes.
8. Main-thread review records the actual validation outcome and any unresolved follow-ups.

## Review Focus

The Node 4 review should check:

- `/videos` and `/gallery` routes exist and render correctly.
- Video and gallery view models expose only public-safe fields.
- Preview images behave predictably for both activity media and external-video metadata, including missing-cover fallbacks.
- Public pages remain readable and responsive across mobile and desktop breakpoints.
- Fixture-backed media pages and later Payload-backed media pages preserve the same visible information hierarchy.
- Public navigation into and out of the media archive is clear.
- Browser smoke or screenshot tooling covers the new public routes where feasible.
- Route builders remain centralized so later Payload-backed slugs do not rely on wide `as Route` casting.

## Handoff Notes

- `/gallery` remains an archive page that links back to the source activity in Node 4; dedicated album routes can be evaluated later if curation needs deepen.
- Public video thumbnails should stay on uploaded-cover or activity-image fallback for now; provider-hosted thumbnails remain deferred until remote host policy is intentionally widened.
- Browser screenshot tooling remains a follow-up because local Playwright/Chrome MCP integration is still unavailable in this environment.
- The next likely node should connect these public media view models to live Payload published reads once PostgreSQL is available.
