# Node 6 Engineering Brief

Node 6 is a focused public-site UI refinement pass. It does not expand the data model or route map; instead, it reworks the visual hierarchy of the public information surfaces so the site feels like a premium EMBA archive rather than a generic product site with archive content dropped into it.

## Version

- Node: `6`
- Version: `0.7.0`
- Date: `2026-04-24`
- Status: approved with follow-ups

## Goals

- Refine `/` so it feels like the archive's front hall instead of a flat landing page.
- Refine `/about` into a slower, editorial class dossier.
- Refine `/people` into a clearer directory with stronger taxonomy and better scanning rhythm.
- Refine `/contact` into a calm correspondence page instead of a support-style utility surface.
- Preserve the existing public-content adapter boundary and route contracts.
- Keep adding UI hooks that let later passes keep iterating without reshaping the CMS model.

## Scope

Node 6 covers visual and structural refinement for the current public information layer:

- Homepage component hierarchy and featured-content rhythm.
- About page narrative layout and opening statement treatment.
- People directory framing, grouping, and card hierarchy.
- Contact surface hierarchy between institutional details and the mail-draft flow.
- Shared public CSS hooks used by those pages.
- Shared header/footer polish where it supports the public information surfaces.
- Documentation, changelog, UI iteration, and review updates associated with `0.7.0`.

Node 6 does not add new CMS schema, new public routes, browser automation tooling, or database-backed Payload reads. It also does not finalize the visual design forever; this node intentionally leaves room for later rounds of image, motion, and typography refinement.

## Design Direction

The public site should feel:

- Refined.
- Archival.
- Academic.
- Warm.
- Restrained.

This means the UI should avoid:

- Repeating the same equal-weight card pattern on every page.
- Making the site read like a SaaS dashboard or KPI portal.
- Making every page follow the same hero + grid + CTA rhythm.

Instead, Node 6 should push the four surfaces into distinct identities:

- `/`: curated entry and recommendation layer.
- `/about`: editorial preface and class positioning.
- `/people`: public directory and relationship index.
- `/contact`: institutional contact and quiet outreach path.

## Acceptance Criteria

Node 6 can close when:

1. Version `0.7.0` is confirmed in package metadata by the main thread.
2. Homepage, about, people, and contact use visibly different page rhythms while staying in the same visual system.
3. No route contracts or public-content data shapes are broken by the refinement pass.
4. Shared CSS introduces reusable hooks for future visual iteration.
5. `CHANGELOG.md`, `docs/ui-iterations.md`, and `docs/reviews/node-6-review.md` are updated.
6. The node closes with actual checks or explicit blockers recorded.

## Review Focus

The Node 6 review should check:

- Whether the four public surfaces now have clearer and more distinct information hierarchy.
- Whether the site reads more like an archive and less like a generic marketing/product layout.
- Whether text density, spacing, and emphasis are balanced across desktop and mobile breakpoints.
- Whether the new UI hooks remain compatible with fixture-backed and later Payload-backed data.
- Whether no unrelated backend/content-model files were changed in a UI-only node.
- Whether known tooling gaps (browser screenshots) are clearly recorded instead of silently skipped.

## Handoff Notes

- Browser screenshot tooling is still blocked locally, so Node 6 will likely close on lint/typecheck/build plus HTTP smoke rather than screenshot evidence.
- Public information pages remain fixture-backed locally until PostgreSQL is available for published Payload reads.
- A likely next step after Node 6 is either another visual pass with real imagery and tighter typography, or reconnecting the same surfaces to live Payload-backed content.
