# Node 7 Review Record

## Summary

- Node: `7`
- Version: `0.8.0`
- Date: `2026-04-25`
- Reviewer: Codex
- Decision: approved with follow-ups

## Scope Reviewed

Node 7 review covers the public data integration layer:

- Payload local API helper for public server-side reads.
- Public activities adapter backed by published Payload activity docs.
- Public people adapter backed by published/public Payload people docs.
- Public site-settings adapter backed by Payload global reads.
- Shared mappers for media, videos, people, links, and rich-text section flattening.
- Database reachability guard plus fixture fallback behavior.
- Documentation, changelog, version, and review updates for `0.8.0`.

## Files / Surfaces Reviewed

- `README.md`
- `CHANGELOG.md`
- `docs/node-7.md`
- `docs/reviews/node-7-review.md`
- `docs/ui-iterations.md`
- `package.json`
- `apps/web/package.json`
- `packages/content-schema/package.json`
- `packages/design-tokens/package.json`
- `apps/web/src/lib/payload/get-payload-client.ts`
- `apps/web/src/lib/public-content/activities.ts`
- `apps/web/src/lib/public-content/people.ts`
- `apps/web/src/lib/public-content/site.ts`
- `apps/web/src/lib/public-content/site-settings-source.ts`
- `apps/web/src/lib/public-content/payload-utils.ts`

## Required Process Checks

- [x] Node 7 scope completed.
- [x] Version `0.8.0` updated or explicitly confirmed by main thread.
- [x] `CHANGELOG.md` updated with Node 7 implementation and test notes.
- [x] `README.md` updated with Payload-backed public-content behavior.
- [x] `docs/ui-iterations.md` updated and marked as no visual UI change.
- [x] Tests/checks run or blockers recorded.
- [x] Follow-ups recorded.

## Engineering Checklist

- [x] Public pages still consume only the `src/lib/public-content` boundary.
- [x] Payload published reads are filtered and mapped before becoming public view models.
- [x] Private media and non-public people are filtered again in the adapter layer.
- [x] Site-settings relationships are re-resolved through public-safe indexes rather than trusted raw.
- [x] Fixture fallback remains available when PostgreSQL is unreachable.
- [x] No unrelated UI or schema files were changed or reverted.

## UI Checklist

- [x] No deliberate user-facing layout change was introduced in this node.
- [x] Existing routes remain the same: `/`, `/about`, `/activities`, `/videos`, `/gallery`, `/people`, `/contact`.
- [x] The node is recorded as a data-source integration pass rather than a visual redesign.
- [ ] Browser screenshots captured for desktop and mobile.

## Checks

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm lint` | passed | Completed directly and again inside `pnpm review:node7`. |
| `pnpm typecheck` | passed | Completed directly and again inside `pnpm review:node7`. |
| `pnpm build` | passed | Completed directly and again inside `pnpm review:node7`. |
| `pnpm audit --prod` | passed | Cleared after adding a root `postcss: 8.5.10` pnpm override and reinstalling workspace dependencies. |
| `pnpm review:node7` | passed | Ran lint, typecheck, build, and audit successfully at version `0.8.0`. |
| HTTP smoke for public routes | passed | Preview started with `apps/web`'s Next.js `16.2.3` runtime on `http://127.0.0.1:3008`; `/`, `/about`, `/people`, `/contact`, `/activities`, `/videos`, `/gallery`, and one representative detail page returned `200`, and an unknown activity slug returned `404`. |
| Browser or Playwright smoke | blocked | Local browser tooling remains unavailable in this environment. |

## Findings

| Priority | Finding | Owner | Status |
| --- | --- | --- | --- |
| P1 | Local validation is still running against fixture fallback because PostgreSQL is unavailable here; a true published-data smoke test still needs a running local database. | Local environment / next CMS integration owner | open |
| P2 | Activity schema and public activity view model are not one-to-one; the current mapper synthesizes sections and hero behavior, but real editorial content should still be reviewed against those assumptions. | Content/UI owner | open |
| P2 | Site settings remain immediately live because the global has no publish state; editorial workflow may later need a review/publish layer there. | Product / CMS owner | open |

## Follow-ups

- Start PostgreSQL locally and verify the public routes against real published Payload content instead of fixture fallback.
- Review the live-rendered activity detail pages to confirm the Lexical-to-section mapping matches editorial expectations.
- Decide later whether site settings need an explicit draft/review workflow instead of instant global publication.
- Reduce or retire fixtures once the Payload-backed path is trusted in local and deployment environments.

## Approval

- Decision: approved with follow-ups
- Approved by: Codex
- Approval date: 2026-04-25
