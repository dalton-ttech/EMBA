# Node 8 Review Record

## Summary

- Node: `8`
- Version: `0.9.0`
- Date: `2026-04-25`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 8 review covers the first raw-material cleaning and public integration pass:

- Inspection of the dropped `content-drop/test` package.
- Curated local image asset selection and copy-to-public flow.
- Structured feature-story integration behind `src/lib/public-content`.
- Homepage recommendation and about-page content refresh tied to that story.
- Activity detail page UI upgrades for richer image-driven content.
- Documentation, changelog, version, and review updates for `0.9.0`.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-8.md`
- `docs/reviews/node-8-review.md`
- `docs/ui-iterations.md`
- `package.json`
- `apps/web/package.json`
- `packages/content-schema/package.json`
- `packages/design-tokens/package.json`
- `apps/web/public/media/gobi21-support/*`
- `apps/web/src/lib/public-content/gobi21-support-feature.ts`
- `apps/web/src/lib/public-content/activity-fixtures.ts`
- `apps/web/src/lib/public-content/site-fixtures.ts`
- `apps/web/src/components/public/ActivityArchive.tsx`
- `apps/web/src/styles/public.css`

## Required Process Checks

- [x] Node 8 scope completed.
- [x] Version `0.9.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 8 implementation notes.
- [x] `README.md` updated with the raw-material intake path.
- [x] `docs/ui-iterations.md` updated for the user-facing UI change.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Raw source files remain in `content-drop/test` and are not read directly by page components.
- [x] Public pages still consume structured public-content view models.
- [x] Curated media is served from local public assets rather than direct raw-material paths.
- [x] The new story is injected through the fixture-backed boundary without breaking the Payload adapter path.
- [x] Existing routes continue to build and render.

## UI Checklist

- [x] Homepage visibly benefits from a real featured class story.
- [x] About page copy and imagery feel more specific to the actual class.
- [x] Activity detail pages render the richer hero and signal treatment.
- [x] Portrait poster imagery has a more appropriate gallery presentation.
- [ ] Browser screenshots captured for desktop and mobile.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm lint` | passed | Completed after the Node 8 component and fixture changes. |
| `pnpm typecheck` | passed | Completed after fixing one portrait-gallery `cx()` type issue. |
| `pnpm build` | passed | Production build completed successfully and generated `/activities/2026-gobi21-class-support`. |
| `pnpm audit --prod` | passed | Completed inside `pnpm review:node8`; no known vulnerabilities found. |
| `pnpm review:node8` | passed | Required combined review command passed after rerunning outside the sandbox to avoid the local Windows `spawn EPERM` build restriction. |
| HTTP smoke for public routes | passed | A temporary preview job on `http://127.0.0.1:3011` returned `200` for `/`, `/about`, `/activities`, `/activities/2026-gobi21-class-support`, `/gallery`, `/videos`, and `/contact`; an unknown activity slug returned `404`. |
| Browser or Playwright smoke | blocked | Local browser tooling remains partially unavailable in this environment. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | The story currently uses a provisional archive date because the exact original WeChat publish timestamp was not present in the dropped package. | Content/editorial owner | open |
| P2 | Homepage recommendations now include one real class story, but people recommendations still lean on older demo fixture data. | Content/UI owner | open |
| P2 | The first portrait-poster treatment is improved, but the gallery rhythm should be revisited after two or three more real campaigns are added. | UI owner | open |

## Follow-ups

- Confirm the exact original WeChat publish time and replace the provisional archive date.
- Add one or two more real class stories so the homepage and about page rely less on demo-era supporting content.
- Once PostgreSQL is available, migrate the cleaned story into Payload-published records and verify parity against the fixture-backed version.
- Capture browser screenshots when local tooling is restored and tune the hero/gallery rhythm with real visual feedback.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-25
