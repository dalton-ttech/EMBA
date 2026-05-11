# Node 2 Review Record

## Summary

- Node: `2`
- Version: `0.3.0`
- Date: `2026-04-23`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 2 review should cover the backend/admin content-model expansion:

- Activity records and activity-minutes fields.
- People/guest records and relationships from activities.
- External video metadata and cover-preview fields.
- Unified activity detail field template and admin editing order.
- Publication/review state and access behavior.
- Documentation, changelog, and UI iteration updates.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-2.md`
- `docs/reviews/node-2-review.md`
- `docs/ui-iterations.md`
- `apps/web/src/collections/Activities.ts`
- `apps/web/src/collections/People.ts`
- `apps/web/src/collections/ExternalVideos.ts`
- `apps/web/src/collections/Media.ts`
- `apps/web/src/lib/cms/access.ts`
- `apps/web/src/lib/cms/roles.ts`
- `apps/web/payload.config.ts`
- `apps/web/next.config.mjs`
- `apps/web/payload-types.ts`
- Payload admin editing screens: blocked until PostgreSQL is available.
- Payload API/public-read behavior: route compiled; database-backed runtime smoke blocked until PostgreSQL is available.

## Required Process Checks

- [x] Node 2 scope completed.
- [x] Version `0.3.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 2 implementation and test notes.
- [x] `docs/ui-iterations.md` updated for admin UX changes.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Workspace/package boundaries are respected.
- [x] Environment variables and secrets are handled safely.
- [x] Activity data model and migration impact is understood.
- [x] People/guest relationships are reusable across activities.
- [x] External video fields preserve provider/source/rights metadata.
- [x] Cover-preview fields preserve image, caption, credit, focal/display notes, and rights metadata.
- [x] Publication/review access prevents draft/private content from leaking publicly at collection access level.
- [ ] Payload admin and API routes behave as expected.
- [x] Docs/process worker did not edit code, package metadata, lockfiles, or generated files.
- [x] No unrelated files were changed or reverted.

## UI Checklist

- [x] Affected UI surfaces are listed as Payload admin/editor UX.
- [x] Admin grouping and field order match the unified activity detail template.
- [x] Field labels and descriptions are understandable for non-developer operators.
- [ ] Text renders correctly and does not overflow in the admin UI.
- [ ] Interaction states for create, edit, review, publish, and validation errors are clear.
- [x] Accessibility concerns are recorded.
- [ ] Screenshots or manual verification notes are attached when useful.
- [x] Public-site visual direction is explicitly not finalized by Node 2.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm install --lockfile-only` | passed | Dependency state confirmed; Node 2 did not add packages. |
| `pnpm lint` | passed | Completed after implementation and after Payload type generation. |
| `pnpm typecheck` | passed | Completed after implementation and after Payload type generation. |
| `pnpm build` | passed | Completed; build route output includes `/admin/[[...segments]]` and `/api/[...slug]`. |
| `pnpm audit --prod` | passed | No known production vulnerabilities found. |
| `pnpm review:node2` | passed | Ran lint, typecheck, build, and audit as one node review command. |
| `pnpm --filter @emba/web payload:types` | passed | Generated `apps/web/payload-types.ts`; elevated execution was required due esbuild/tsx worker spawn restrictions. |
| Homepage smoke test | passed | `GET http://127.0.0.1:3001/` returned `200`. |
| Payload admin smoke test | blocked | `/admin` returned `500` because PostgreSQL was unavailable at `127.0.0.1:5432`. |
| Activity API smoke test | blocked | `/api/activities` returned `500` for the same PostgreSQL connection reason. |
| Activity detail template review | passed in source | Field tabs follow identity, time/place, people, minutes, media/video, and publication/SEO order. Browser verification awaits database. |
| Role/access checks | partially passed in source | Collection access rules are implemented; database-backed login/role checks await PostgreSQL. |
| Public-read smoke test | partially passed in source | Collection access filters are implemented; runtime API checks await PostgreSQL. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Local PostgreSQL is not running on `127.0.0.1:5432`, so `/admin` and `/api/activities` return `500` and block real admin editing, first-user, and role checks. | Local environment | open |
| P2 | Published activities can still reference draft/private related records at authoring time; collection access limits public reads, but a publish-time relationship validator should be added before real content entry. | Node 3 / CMS owner | open |
| P2 | Media API records are hidden unless `visibility=public`, but locally uploaded files may still be reachable if a file URL is known. Production media storage and private asset policy should be designed before launch. | Deployment / CMS owner | open |

## Follow-ups

- Start PostgreSQL from `infra/dev/docker-compose.yml` or another local service, then verify `/admin`, first-user creation, role-specific permissions, and API public-read behavior.
- Add publish-time validation for activities that reference draft/private people, videos, or media before production content entry.
- Define production media storage and private-file behavior before public launch.
- Capture screenshots of the activity, people, and external-video admin screens once the database-backed admin is available.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-23
