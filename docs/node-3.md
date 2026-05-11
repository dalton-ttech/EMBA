# Node 3 Engineering Brief

Node 3 introduces the first public activity archive experience. It makes the archive browsable through a public activity list, a reusable activity detail template, and a deliberately small view model boundary that can be backed by fixtures now and Payload later.

## Version

- Node: `3`
- Version: `0.4.0`
- Date: `2026-04-23`
- Status: approved with follow-ups

## Goals

- Add a public activity list route at `/activities`.
- Add a public activity detail route at `/activities/[slug]`.
- Shape activity list and detail pages around stable view models instead of binding UI components directly to Payload collection records.
- Provide fixture fallback data so the public archive can render during local development and review when PostgreSQL or Payload reads are unavailable.
- Leave a clear follow-up path for connecting the same view models to Payload-backed published activity data.
- Record the first public visual direction while keeping the activity archive open to repeated UI iteration.

## Scope

Node 3 covers the first public reader-facing archive surface:

- Activity list page structure, copy hierarchy, empty/loading/error-safe states as applicable, and link behavior to details.
- Activity detail template for title, date, venue, summary, minutes/highlights, participants, cover/media preview, video metadata, and share/search metadata when available.
- Data mapping layer that exposes only public-safe fields needed by the UI.
- Fixture fallback for development, database blockers, and early design review.
- Documentation, changelog, UI iteration, and review placeholder updates for `0.4.0`.

Node 3 does not need to finalize the visual design, production content migration, full search/filtering, pagination strategy, live Payload querying, or admin editing changes unless the main thread explicitly includes them.

## Public Routes

### `/activities`

The activity list should give public visitors a scannable entry point into the archive:

- Show published/public-safe activity summaries only.
- Use cards or list rows that expose title, date, venue or location, activity type, short description, and cover/preview media when available.
- Link each item to `/activities/[slug]`.
- Keep the first version flexible enough for later filters, tags, search, featured activities, and pagination.
- Fall back to fixture activities when Payload data is unavailable.

### `/activities/[slug]`

The activity detail template should make one activity readable without exposing raw CMS structure:

- Show public identity fields such as title, subtitle, activity type, date, venue, and summary.
- Render long-form minutes, highlights, outcomes, quotes, participants, gallery references, and video metadata only when present and public-safe.
- Preserve clear empty states for optional fields instead of showing internal placeholders.
- Use the same view model shape whether data comes from fixtures or Payload.
- Return an appropriate not-found state when the slug does not resolve.

## View Model Boundary

Public UI components should consume activity view models, not raw Payload documents. The view model boundary should:

- Include only fields intended for public display.
- Normalize dates, labels, participants, media, and video metadata into UI-friendly structures.
- Hide draft, internal notes, review notes, access-control fields, private media, rights-only notes, and editor-only metadata.
- Make fixture records and later Payload records interchangeable at the page/component layer.
- Keep route components focused on rendering and navigation rather than CMS-specific filtering.

## Fixture Fallback

Fixtures are part of the Node 3 development process, not the final data source:

- Fixture data should mirror the public view model shape.
- Fallback should keep `/activities` and representative `/activities/[slug]` pages reviewable when PostgreSQL is unavailable.
- Fixture copy and media should be clearly safe for public demo use.
- The main thread should document whether runtime currently uses fixtures only, Payload only, or Payload with fixture fallback.

## Payload Follow-up

Later work should connect the public archive to Payload without changing the page/component contract:

- Query only published activities.
- Respect public visibility for related people, external videos, and media.
- Preserve published-only and public-media access rules from Node 2.
- Keep fixture fallback available for local development or explicit demo mode if useful.
- Add database-backed route smoke tests once local PostgreSQL is available.

## Acceptance Criteria

Node 3 can close when:

1. Version `0.4.0` is confirmed in package metadata by the main thread.
2. `/activities` renders a public activity list from the agreed data source or fallback.
3. `/activities/[slug]` renders a public activity detail template from the same view model shape.
4. The public UI does not expose internal CMS fields, draft content, private media, or editor-only notes.
5. Fixture fallback behavior is documented and works during local review if Payload/database access is blocked.
6. README and `CHANGELOG.md` describe the new public routes and data boundary.
7. `docs/reviews/node-3-review.md` is completed by the main thread.
8. `docs/ui-iterations.md` records the first public visual direction and follow-up iteration plan.

## Review Focus

The Node 3 review should check:

- Public routes exist and route correctly.
- View models contain only public-safe fields.
- Fixture fallback is deterministic and does not mask unexpected production errors without a clear signal.
- Activity list and detail pages handle missing optional fields gracefully.
- Public pages are responsive across mobile and desktop breakpoints.
- Browser or Playwright smoke tests cover list, detail, not-found, and database-blocked states where feasible.
- No docs/process worker changes were made outside the allowed documentation files.

## Handoff Notes

- Main thread should fill actual validation results in `docs/reviews/node-3-review.md`.
- Main thread owns package version changes for `0.4.0`.
- Main thread should record whether PostgreSQL/Payload integration is complete, partially complete, or blocked.
- Future UI passes should revisit layout, imagery, density, filters, and detail-page rhythm after real activity content is available.
