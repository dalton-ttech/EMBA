# Node 1 Engineering Brief

Node 1 establishes the first usable backend foundation for the EMBA Activity Archive. It focuses on Payload admin access, operator roles, the initial media library, and the local run path for creating the first administrator.

## Version

- Node: `1`
- Version: `0.2.0`
- Date: `2026-04-23`
- Status: pending review

## Goals

- Make the Payload backend reachable and understandable for local operators.
- Define the first CMS role model before content collections expand.
- Support media upload metadata needed by later activity, album, and editorial nodes.
- Document how a developer starts the backend and creates the first administrator.
- Leave a concrete review record for the main thread to complete after validation.

## Scope

Node 1 covers backend foundation and admin UX only:

- Payload admin bootstrapping at `/admin`.
- Payload API availability at `/api`.
- `users` collection role fields and admin grouping.
- CMS access helpers for admin panel access, user management, first-user creation, role assignment, and media management.
- `media` collection upload metadata, local upload handling, image sizes, and admin grouping.
- Local environment documentation for `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, and `EMBA_STRICT_ENV`.
- First administrator creation instructions.
- Node 1 changelog and review placeholder.

Node 1 does not include the final activity archive content model, public archive pages, production media storage, deployment automation, migration policy, or final editor workflow design.

## Role Model

Initial CMS roles:

- `superAdmin`: full admin access, user management, user deletion, and media management.
- `admin`: admin access, user management, and media management.
- `editor`: admin access and media management.
- `materialManager`: admin access and media management.
- `reviewer`: admin access with read-only/self-service boundaries until later review workflows are added.

The first user bootstrap path is intentionally allowed only while the `users` collection is empty. That first account is forced to `superAdmin`. After that, user creation and role assignment should be controlled by user-management roles.

## Admin UX Expectations

- Admin navigation separates system users from media library work.
- User records use email as the admin title and include display name support.
- Role selection labels are readable for non-developer operators.
- Media records require alt text and support caption, credit/source, preview focus, and rights metadata.
- Image upload derivatives reserve thumbnail, card, and hero sizes for later public UI work.

## Acceptance Criteria

Node 1 can close when:

1. Version `0.2.0` is confirmed in package metadata by the main thread.
2. `CHANGELOG.md` includes Node 1 backend, permission, admin UX, review, and test notes.
3. `README.md` explains local backend startup, environment variables, and first administrator creation.
4. `docs/reviews/node-1-review.md` is completed from the review template.
5. Payload admin starts locally at `/admin`.
6. A first administrator can be created against an empty local database.
7. Role/access behavior is manually checked or automated checks are added.
8. `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass, or blockers are recorded with owners.

## Review Focus

The Node 1 review should check:

- Access rules do not allow anonymous admin access after the first-user bootstrap.
- First-user creation is possible only when no users exist.
- User managers can manage users without giving every role delete access.
- Media read/write permissions match the intended public/admin split.
- Admin labels, grouping, and field descriptions are understandable.
- README setup instructions match the actual local run path.
- Production-like environments fail fast when `DATABASE_URL` or `PAYLOAD_SECRET` is missing.
- No package version or code changes were made by the docs/process worker.

## Handoff Notes

- Main thread should fill the actual check results in `docs/reviews/node-1-review.md` before closing Node 1.
- Main thread owns package version changes for `0.2.0`.
- If admin UI changed materially, the owner with `docs/ui-iterations.md` scope should add a Node 1 UI iteration entry.
- Later nodes should add activity, album, people, and video content models only after Node 1 permissions are validated.
