# Node 2 Engineering Brief

Node 2 expands the EMBA Activity Archive backend from a foundation CMS into an activity-recording workspace. It focuses on the content model for activity minutes, people/guests, external video metadata, cover previews, and a consistent editor template for activity detail pages.

## Version

- Node: `2`
- Version: `0.3.0`
- Date: `2026-04-23`
- Status: approved with follow-ups

## Goals

- Define the activity archive fields needed to record EMBA event summaries and minutes.
- Add people and guest modeling so activities can reference speakers, classmates, hosts, organizers, and other participants consistently.
- Capture external video links without treating every video as a locally uploaded asset.
- Capture cover-preview fields that help editors choose the public thumbnail/hero treatment later.
- Standardize the activity detail field template before public archive pages are finalized.
- Preserve a review placeholder for the main thread to complete after validation.

## Scope

Node 2 covers backend content modeling and admin editing experience:

- Activity records and activity-minutes fields.
- People/guest records and relationship fields from activities.
- External video metadata fields, including provider, URL, provider id, duration, captions, source notes, and rights notes.
- Cover-preview fields for selected image, focal/preview notes, caption, credit, and display intent.
- Unified activity detail field template for editors.
- Admin grouping, labels, descriptions, and editor guidance for the new content surfaces.
- Changelog, README, UI iteration, and review placeholder updates for `0.3.0`.

Node 2 does not finalize public-site visual design, public archive page layouts, production migration policy, video transcoding, automated ingest, or permanent external provider allowlists unless the main thread explicitly adds those items.

## Content Model Targets

### Activities

Activity records should give editors one place to describe an event:

- Basic identity: title, slug, subtitle/short description, activity type, tags, and archive status.
- Timing and place: start/end date, timezone if needed, venue, city/campus, and location notes.
- Editorial summary: excerpt, full minutes/body, agenda notes, highlights, outcomes, follow-up actions, and selected quotes.
- Participation: hosts, speakers, guests, classmates, organizers, photographers, and related people.
- Media: cover image, gallery/media references, attachments, external video references, and preview notes.
- Publishing: draft/review/published state, featured flag, review notes, published date, and SEO/share metadata.

### People / Guests

People records should support reusable references across activities:

- Name, display name, role/category, affiliation, title, biography, and contact-safe public notes.
- Portrait/media reference and alt text.
- Guest/speaker metadata such as topic, organization, cohort relationship, and external profile links.
- Internal notes for editors that are not intended for public display.

### External Video And Cover Preview

Video fields should model externally hosted video as structured metadata:

- Provider, canonical URL, provider id, duration, language, transcript/caption status, and source notes.
- Poster image or selected cover, preview caption, credit, rights/permission notes, and whether the video is approved for public display.

Cover-preview fields should help editors choose how an activity appears before the public UI is finalized:

- Primary cover image, mobile/thumbnail preference, focal point or crop note, cover caption, credit/source, rights note, and display intent such as archive card, detail hero, or private editorial reference.

## Unified Activity Detail Field Template

Editors should be able to fill activity records in a predictable order:

1. Identity: title, slug, activity type, status, summary.
2. Time and venue: dates, place, location notes.
3. Participants: hosts, speakers, guests, organizers, related people.
4. Minutes: agenda, narrative minutes, highlights, outcomes, quotes, follow-ups.
5. Media: cover preview, gallery/media, attachments.
6. Video: external video metadata, poster/cover, rights and source notes.
7. Review and publication: workflow state, reviewer notes, publish date, featured state.
8. Search/share: SEO title, description, social preview, internal archive tags.

## Permission Expectations

Node 2 should build on the Node 1 roles:

- `superAdmin` and `admin`: full management of activity, people/guest, video, and cover metadata.
- `editor`: create and update activity content and related editorial metadata.
- `materialManager`: manage media assets and visibility; activity, people, and external-video publishing stays with content roles.
- `reviewer`: read records in the admin UI and participate in review-state workflows if implemented.
- Anonymous/public reads: only published activity/video data, published public people, and public media records should be exposed.

The main thread should confirm exact collection-level and field-level access rules during implementation review.

## Acceptance Criteria

Node 2 can close when:

1. Version `0.3.0` is confirmed in package metadata by the main thread.
2. Activity, people/guest, external video, and cover-preview fields are implemented or explicitly deferred with owners.
3. Admin labels, grouping, and descriptions make the activity-minutes editing flow understandable.
4. README and `CHANGELOG.md` describe the Node 2 content model and editor template.
5. `docs/reviews/node-2-review.md` is completed from the review template.
6. `docs/ui-iterations.md` records the admin UX change and states that public visual design is not finalized by this node.
7. `pnpm lint`, `pnpm typecheck`, `pnpm build`, and relevant Payload admin smoke checks pass, or blockers are recorded with owners.

## Review Focus

The Node 2 review should check:

- Activity records contain enough structure for both minutes and later public detail pages.
- People/guest relationships are reusable and avoid duplicating names in activity records.
- External video fields do not require local uploads and preserve provider/source/rights information.
- Cover-preview metadata supports later public card/detail rendering without locking the visual design.
- Publication/review state prevents draft or private content from being publicly exposed.
- Admin editing order, labels, and field descriptions are clear for non-developer operators.
- No code or package changes were made by the docs/process worker.

## Handoff Notes

- Main thread should fill actual check results in `docs/reviews/node-2-review.md` before closing Node 2.
- Main thread owns package version changes for `0.3.0`.
- If the implementation introduces migrations or seeds, document the run path before Node 2 closes.
- Later public UI nodes should treat Node 2 cover/video fields as editorial inputs, not as a final visual design mandate.
