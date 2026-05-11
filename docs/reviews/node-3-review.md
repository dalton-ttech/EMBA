# Node 3 Review Record

## Summary

- Node: `3`
- Version: `0.4.0`
- Date: `2026-04-23`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 3 review covers the first public activity archive experience:

- Public activity list route at `/activities`.
- Public activity detail route at `/activities/[slug]`.
- Activity view model boundary and public-safe data shape.
- Fixture fallback behavior.
- Future Payload connection path.
- Documentation, changelog, and UI iteration updates.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-3.md`
- `docs/reviews/node-3-review.md`
- `docs/ui-iterations.md`
- `apps/web/src/app/(site)/activities/page.tsx`
- `apps/web/src/app/(site)/activities/[slug]/page.tsx`
- `apps/web/src/components/public/ActivityArchive.tsx`
- `apps/web/src/types/activity.ts`
- `apps/web/src/lib/public-content/activities.ts`
- `apps/web/src/lib/public-content/activity-fixtures.ts`
- `apps/web/src/lib/public-content/index.ts`
- `apps/web/src/styles/public.css`
- `apps/web/src/app/(site)/page.tsx`
- `apps/web/next.config.mjs`
- `apps/web/src/styles/globals.css`

## Required Process Checks

- [x] Node 3 scope completed.
- [x] Version `0.4.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 3 implementation and test notes.
- [x] `README.md` updated with public activity routes.
- [x] `docs/ui-iterations.md` updated for the public activity pages.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Workspace/package boundaries are respected.
- [x] Public UI reads from a view model boundary rather than raw Payload documents.
- [x] View models expose only public-safe activity fields.
- [x] Draft/private/internal CMS fields are not rendered publicly.
- [x] Fixture fallback is documented and deterministic.
- [x] Payload follow-up path is clear.
- [x] Not-found behavior for unknown activity slugs is verified.
- [x] No code, package metadata, lockfiles, or generated files were changed by the docs/process worker.
- [x] No unrelated files were changed or reverted.

## UI Checklist

- [x] Affected UI surfaces are listed as `/activities` and `/activities/[slug]`.
- [x] Activity list is scannable and supports the first public archive use case.
- [x] Activity detail template presents identity, date/place, summary, minutes, participants, media, and video metadata when present.
- [x] Missing optional fields do not produce awkward placeholders in source templates.
- [ ] Text renders correctly and does not overflow.
- [x] Interaction states for links and not-found are clear.
- [x] Accessibility concerns are recorded.
- [x] Public-site visual direction is recorded as first iteration, not final design approval.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm lint` | passed | Completed as part of `pnpm review:node3`. |
| `pnpm typecheck` | passed | Completed as part of `pnpm review:node3`. |
| `pnpm build` | passed | Build generated `/activities` and three static detail pages without database access. |
| `pnpm audit --prod` | passed | No known production vulnerabilities found. |
| `pnpm review:node3` | passed | Ran lint, typecheck, build, and audit. |
| `/activities` HTTP smoke | passed | `GET http://127.0.0.1:3002/activities` returned `200`. |
| `/activities/[slug]` HTTP smoke | passed | `GET http://127.0.0.1:3002/activities/2025-ai-leadership-forum` returned `200`. |
| Unknown activity slug / not-found smoke | passed | Unknown slug returned `404`. |
| Browser or Playwright smoke | blocked | Playwright MCP could not create its temp directory under `C:\Windows\System32`; Chrome MCP had an invalid executable path. |
| Responsive check: mobile | blocked | Browser tooling unavailable in this environment. CSS includes responsive breakpoints at 960px and 560px. |
| Responsive check: desktop | blocked | Browser tooling unavailable in this environment. HTTP/build checks passed. |
| Fixture fallback check | passed | Routes render from deterministic fixtures and do not connect to PostgreSQL. |
| Payload/database-backed check | deferred | Node 3 intentionally uses fixtures; Payload published reads are a follow-up once PostgreSQL is available. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Browser screenshot and true responsive verification could not run because both Playwright and Chrome MCP tooling are blocked by local environment issues. | Local tooling | open |
| P2 | Public pages currently use fixtures only; Payload-backed published activity reads should be added without changing the view model contract. | Node 4 / CMS integration owner | open |
| P2 | Demo images use Unsplash-hosted media for early review; replace with class-owned or CMS media before public launch. | Content / design owner | open |

## Database / Payload Status

- PostgreSQL availability: unavailable in this local environment.
- Payload public activity query status: deferred; Node 3 uses fixtures by design.
- Fixture fallback status: working; build and HTTP smoke completed without database access.
- Known blocker: database-backed public reads and admin smoke still require PostgreSQL.

## Playwright / Browser Smoke Notes

- `/activities`: HTTP `200` from temporary production server on port `3002`.
- `/activities/[slug]`: HTTP `200` for `2025-ai-leadership-forum`.
- Unknown slug / not-found: HTTP `404`.
- Screenshots or trace paths: not captured because browser MCP tooling was unavailable.

## Responsive Notes

- Mobile viewport result: blocked by browser tooling; CSS includes mobile-specific single-column rules.
- Tablet viewport result: blocked by browser tooling.
- Desktop viewport result: blocked by browser tooling; build and HTTP smoke passed.
- Text overflow or layout issues: no static type/build issues found; visual overflow needs browser verification when tooling is available.

## Follow-ups

- Connect activity view models to Payload published activity reads if Node 3 closes with fixture-only data.
- Restore browser screenshot tooling or run external Playwright coverage for list, detail, not-found, and database-blocked states.
- Revisit visual rhythm, media treatment, filters, and detail-page density after real activity content is available.
- Confirm public media and related people/video visibility before launch.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-23
