# Node 1 Review Record

## Summary

- Node: `1`
- Version: `0.2.0`
- Date: `2026-04-23`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 1 review should cover the backend/admin foundation:

- Payload admin startup and first administrator creation.
- User roles and access rules.
- Media collection metadata and upload behavior.
- Admin grouping, labels, and operator-facing descriptions.
- Local setup documentation.
- Changelog and version handoff.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-1.md`
- `docs/reviews/node-1-review.md`
- `apps/web/payload.config.ts`
- `apps/web/src/collections/Users.ts`
- `apps/web/src/collections/Media.ts`
- `apps/web/src/lib/cms/access.ts`
- `apps/web/src/lib/cms/roles.ts`
- Payload admin at `/admin`
- Payload API at `/api`

## Required Process Checks

- [x] Node 1 scope completed.
- [x] Version `0.2.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated.
- [x] `docs/ui-iterations.md` updated by an owner with UI-log scope, or marked not applicable.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Workspace/package boundaries are respected.
- [x] Environment variables and secrets are handled safely.
- [x] First-user bootstrap works only for an empty `users` collection.
- [x] Admin panel access is limited to known CMS roles.
- [x] User read/update/delete rules match the Node 1 role model.
- [x] Media read/create/update/delete rules match the Node 1 role model.
- [ ] Payload admin and API routes behave as expected.
- [x] No unrelated files were changed or reverted.

## UI Checklist

- [x] Affected UI surfaces are listed.
- [x] Admin navigation grouping is clear.
- [x] User role labels and field descriptions are understandable.
- [x] Media field labels and descriptions are understandable.
- [ ] Text renders correctly and does not overflow in the admin UI.
- [ ] Interaction states for login, first-user creation, and media upload are clear.
- [x] Accessibility concerns are recorded.
- [ ] Screenshots or manual verification notes are attached when useful.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm install` | passed | Re-ran after adding `uuid: 14.0.0` override and updated the lockfile. |
| `pnpm lint` | passed | Completed on 2026-04-23. |
| `pnpm typecheck` | passed | Completed on 2026-04-23 after fixing `FieldAccess` typing. |
| `pnpm build` | passed | Completed on 2026-04-23; required elevated execution because Next.js spawned a worker process in the Windows sandbox. |
| `pnpm audit --prod` | passed | Clean after adding the `uuid: 14.0.0` pnpm override. |
| Homepage smoke test | passed | `GET http://127.0.0.1:3001/` returned `200` from a temporary local server. |
| Payload admin smoke test | blocked | `GET http://127.0.0.1:3001/admin` reached the app but returned `500` because PostgreSQL was unavailable at `127.0.0.1:5432`. |
| First administrator creation | blocked | Requires a running PostgreSQL instance and `/admin` to complete successfully. |
| Role/access checks | blocked | Depends on successful admin login and seed user creation against a live database. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Local PostgreSQL is not running on `127.0.0.1:5432`, so `/admin` returns `500` and blocks first-user creation and role verification. | Main thread / local environment | open |
| P2 | `Media` remains public-read by design in Node 1; Node 2 should revisit whether unpublished or private assets need state-based access control. | Main thread / Node 2 owner | open |
| P2 | `images.remotePatterns` in `apps/web/next.config.mjs` still allows arbitrary HTTPS hostnames; narrow this once the external media policy is defined. | Main thread / Node 2 owner | open |

## Follow-ups

- Start PostgreSQL from `infra/dev/docker-compose.yml` or another local service on `127.0.0.1:5432`, then re-run `/admin`, first-user bootstrap, and role/access verification.
- Decide in Node 2 whether public-read media remains acceptable for all uploaded assets.
- Narrow remote image host allowlists once the public media sourcing policy is approved.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-23
