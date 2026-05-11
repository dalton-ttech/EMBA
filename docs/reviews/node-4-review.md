# Node 4 Review Record

## Summary

- Node: `4`
- Version: `0.5.0`
- Date: `2026-04-24`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 4 review covers the first public media-archive pass:

- Homepage navigation into public archive surfaces.
- Public video library route at `/videos`.
- Public gallery archive route at `/gallery`.
- Shared media-library view models and fallback-preview logic.
- Public route builder cleanup and shared style-layer changes.
- Documentation, changelog, and UI iteration updates for `0.5.0`.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-4.md`
- `docs/reviews/node-4-review.md`
- `docs/ui-iterations.md`
- `package.json`
- `apps/web/package.json`
- `packages/content-schema/package.json`
- `packages/design-tokens/package.json`
- `apps/web/src/app/(site)/page.tsx`
- `apps/web/src/app/(site)/videos/page.tsx`
- `apps/web/src/app/(site)/gallery/page.tsx`
- `apps/web/src/app/(site)/activities/[slug]/page.tsx`
- `apps/web/src/components/public/ActivityArchive.tsx`
- `apps/web/src/components/public/VideoLibrary.tsx`
- `apps/web/src/components/public/GalleryArchive.tsx`
- `apps/web/src/components/public/ArchiveMedia.tsx`
- `apps/web/src/components/public/index.ts`
- `apps/web/src/types/activity.ts`
- `apps/web/src/types/media-library.ts`
- `apps/web/src/lib/public-content/activities.ts`
- `apps/web/src/lib/public-content/videos.ts`
- `apps/web/src/lib/public-content/gallery.ts`
- `apps/web/src/lib/public-content/index.ts`
- `apps/web/src/lib/site-routes.ts`
- `apps/web/src/styles/public.css`

## Required Process Checks

- [x] Node 4 scope completed.
- [x] Version `0.5.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 4 implementation and test notes.
- [x] `README.md` updated with public media routes and preview fallback notes.
- [x] `docs/ui-iterations.md` updated for the new public media pages.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Workspace/package boundaries are respected.
- [x] Public media pages read from the view model boundary rather than raw Payload documents.
- [x] Public media rendering no longer assumes every record has a required cover image.
- [x] Public route builders are centralized for activity links.
- [x] Fixture-backed behavior is documented and deterministic.
- [x] No draft/private/internal CMS fields are intentionally rendered publicly.
- [x] No unrelated files were changed or reverted.

## UI Checklist

- [x] Affected UI surfaces are listed as `/`, `/videos`, `/gallery`, and linked activity routes.
- [x] Homepage exposes clear entry points into the new archive surfaces.
- [x] Video library page presents provider, date/duration, source activity, and preview media.
- [x] Gallery archive page presents cover imagery, image counts, and clear routes back to source activities.
- [x] Missing preview media has a graceful placeholder state.
- [ ] Browser screenshots captured for desktop and mobile.
- [x] Node 4 is recorded as an iteration pass, not final visual approval.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm lint` | passed | Completed directly and again inside `pnpm review:node4`. |
| `pnpm typecheck` | passed | Completed directly and again inside `pnpm review:node4`. |
| `pnpm build` | passed | Completed inside `pnpm review:node4` outside sandbox so Next.js could spawn its build worker. |
| `pnpm audit --prod` | passed | No known production vulnerabilities found. |
| `pnpm review:node4` | passed | Ran lint, typecheck, build, and audit. |
| `/` HTTP smoke | passed | `GET http://127.0.0.1:3003/` returned `200`. |
| `/activities` HTTP smoke | passed | `GET http://127.0.0.1:3003/activities` returned `200`. |
| `/videos` HTTP smoke | passed | `GET http://127.0.0.1:3003/videos` returned `200`. |
| `/gallery` HTTP smoke | passed | `GET http://127.0.0.1:3003/gallery` returned `200`. |
| `/activities/[slug]` HTTP smoke | passed | `GET http://127.0.0.1:3003/activities/2025-ai-leadership-forum` returned `200`. |
| Unknown activity slug / not-found smoke | passed | Unknown slug returned `404`. |
| Browser or Playwright smoke | blocked | Local Playwright/Chrome MCP tooling remains unavailable in this environment. |
| Responsive check: mobile | blocked | Browser tooling unavailable. CSS includes dedicated breakpoints at 960px and 560px. |
| Responsive check: desktop | blocked | Browser tooling unavailable. HTTP/build checks passed. |
| Payload/database-backed check | deferred | Node 4 remains fixture-backed by design until PostgreSQL is available. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Browser screenshot and true responsive verification are still blocked by local tooling, so Node 4 closes on build and HTTP smoke rather than visual captures. | Local tooling | open |
| P2 | Public media pages still read from fixture-derived activity data; the Payload adapter must preserve the same fallback and public-filter rules when PostgreSQL is available. | Next CMS integration owner | open |
| P2 | External-video thumbnails still rely on uploaded/activity media fallback; provider-hosted thumbnails remain intentionally deferred until remote-image policy is revisited. | Product / frontend owner | open |

## Database / Payload Status

- PostgreSQL availability: unavailable in this local environment.
- Payload public media query status: deferred; Node 4 uses fixture-derived view models by design.
- Fixture fallback status: working; build and HTTP smoke completed without database access.
- Known blocker: database-backed public reads and admin smoke still require PostgreSQL.

## Follow-ups

- Connect video and gallery view models to Payload published reads while preserving current public filters and image fallbacks.
- Restore browser screenshot tooling or run external Playwright coverage for `/videos`, `/gallery`, and homepage media navigation.
- Revisit gallery spotlight density, card rhythm, and class-owned imagery after demo fixtures are replaced.
- Decide whether the gallery archive should stay activity-linked or grow dedicated album detail routes later.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-24
