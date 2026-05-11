# Node 5 Review Record

## Summary

- Node: `5`
- Version: `0.6.0`
- Date: `2026-04-24`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 5 review covers the public information layer:

- Payload site-settings global.
- Public homepage recommendation and information layer.
- Public class introduction route at `/about`.
- Public people/guest directory at `/people`.
- Public contact surface at `/contact`.
- Default SEO metadata sourced from site settings.
- Documentation, changelog, and UI iteration updates for `0.6.0`.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-5.md`
- `docs/reviews/node-5-review.md`
- `docs/ui-iterations.md`
- `package.json`
- `apps/web/package.json`
- `packages/content-schema/package.json`
- `packages/design-tokens/package.json`
- `apps/web/payload.config.ts`
- `apps/web/src/globals/SiteSettings.ts`
- `apps/web/src/lib/cms/access.ts`
- `apps/web/src/lib/cms/admin.ts`
- `apps/web/src/lib/site-routes.ts`
- `apps/web/src/lib/public-content/site.ts`
- `apps/web/src/lib/public-content/site-fixtures.ts`
- `apps/web/src/lib/public-content/people.ts`
- `apps/web/src/lib/public-content/people-fixtures.ts`
- `apps/web/src/components/public/SiteChrome.tsx`
- `apps/web/src/components/public/HomePortal.tsx`
- `apps/web/src/components/public/AboutOverview.tsx`
- `apps/web/src/components/public/PeopleDirectory.tsx`
- `apps/web/src/components/public/ContactHub.tsx`
- `apps/web/src/components/public/ContactEmailForm.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/(site)/layout.tsx`
- `apps/web/src/app/(site)/page.tsx`
- `apps/web/src/app/(site)/about/page.tsx`
- `apps/web/src/app/(site)/people/page.tsx`
- `apps/web/src/app/(site)/contact/page.tsx`
- `apps/web/src/styles/public.css`

## Required Process Checks

- [x] Node 5 scope completed.
- [x] Version `0.6.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 5 implementation and test notes.
- [x] `README.md` updated with public information-layer routes and site-settings responsibilities.
- [x] `docs/ui-iterations.md` updated for the new homepage and information routes.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Site settings are defined as a global content source.
- [x] Public homepage recommendations are no longer tied to a single activity boolean.
- [x] Public pages continue to read from adapter/view-model layers.
- [x] Public people filtering respects published + public rules in the local adapter.
- [x] Contact interaction clearly avoids pretending to store data.
- [x] No unrelated files were changed or reverted.

## UI Checklist

- [x] Affected UI surfaces are listed as `/`, `/about`, `/people`, `/contact`.
- [x] Homepage now acts as both archive entrance and public-facing portal.
- [x] Public about page presents class introduction clearly.
- [x] Public people page presents people and related activities.
- [x] Public contact page explains the lightweight email-draft interaction.
- [x] Empty states exist for homepage recommendations and people directory.
- [ ] Browser screenshots captured for desktop and mobile.
- [x] Node 5 is recorded as an iteration pass, not final visual approval.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm lint` | passed | Completed directly and again inside `pnpm review:node5`. |
| `pnpm typecheck` | passed | Completed directly and again inside `pnpm review:node5`. |
| `pnpm build` | passed | Completed inside `pnpm review:node5` outside the sandbox so Next.js could spawn its build worker. |
| `pnpm audit --prod` | passed | No known production vulnerabilities found. |
| `pnpm --filter @emba/web payload:types` | passed | Generated updated Payload collection/global types. |
| `pnpm review:node5` | passed | Ran lint, typecheck, build, audit, and Payload type generation. |
| HTTP smoke for `/`, `/about`, `/people`, `/contact` | passed | `/`, `/about`, `/people`, `/contact`, `/activities`, `/videos`, `/gallery`, and one representative detail page returned `200`; unknown activity slug returned `404`. |
| Browser or Playwright smoke | blocked | Local tooling has been blocked in earlier nodes; confirm current status during final validation. |
| Payload/database-backed check | deferred | Node 5 remains fixture-backed locally until PostgreSQL is available. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Browser screenshot and true responsive verification may still be blocked by local tooling, so Node 5 may need to close on build and HTTP smoke rather than visual captures. | Local tooling | open |
| P2 | Site settings and people directory still rely on fixture-backed public-content adapters locally; Payload-backed reads remain a follow-up once PostgreSQL is available. | Next CMS integration owner | open |
| P2 | The contact interaction is intentionally mailto-based and non-persistent; upgrading to stored submissions should be treated as a new system with privacy and abuse controls. | Product / backend owner | open |

## Database / Payload Status

- PostgreSQL availability: unavailable in this local environment.
- Payload public settings/people query status: deferred; Node 5 uses fixture-backed public-content adapters by design.
- Payload global availability in config: added.
- Known blocker: database-backed admin smoke and public settings reads still require PostgreSQL.

## Follow-ups

- Connect site-settings and people adapters to Payload published reads.
- Restore browser screenshot tooling or run external Playwright coverage for homepage, about, people, and contact routes.
- Decide later whether the contact surface should remain mailto-based or grow into a controlled submission system.
- Continue iterating homepage hierarchy, density, and imagery after real class-owned assets replace demo fixtures.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-24
