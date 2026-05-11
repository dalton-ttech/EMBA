# Node 7 Engineering Brief

Node 7 connects the public site adapters to Payload published data while preserving the existing public-content boundary and fixture fallback path.

## Version

- Node: `7`
- Version: `0.8.0`
- Date: `2026-04-25`
- Status: approved with follow-ups

## Goals

- Replace fixture-only public data sources with Payload-backed published reads.
- Preserve the `src/lib/public-content` adapter boundary so pages/components do not read raw Payload docs.
- Keep public activities, people, videos, gallery, homepage recommendations, and site settings aligned to the same published content source.
- Keep local builds and previews working when PostgreSQL is unavailable by falling back to fixtures without noisy failure loops.

## Scope

Node 7 covers the public data integration layer:

- Payload local API helper for server-side reads.
- Published activity adapter behind `src/lib/public-content/activities.ts`.
- Published people adapter behind `src/lib/public-content/people.ts`.
- Published site-settings adapter behind `src/lib/public-content/site-settings-source.ts`.
- Shared Payload-to-public mappers for media, people, videos, links, date/location labels, and Lexical content flattening.
- Database reachability guard so local review can fall back to fixtures before Payload starts logging repeated connection failures.
- Documentation, changelog, version, and review updates associated with `0.8.0`.

Node 7 does not change the route map, create a new public design language, or add new CMS schema fields. It also does not remove fixture fallback entirely; that remains the local safety net when PostgreSQL is unavailable.

## Data Boundary Rules

Node 7 keeps the existing public-content boundary and tightens the mapping rules behind it:

- Activities: only `status = published`.
- People: only `status = published AND isPublic = true`.
- Media: only `visibility = public`.
- External videos: only `status = published`.
- Site settings: still adapted before being exposed to pages; raw global relationships are not trusted directly.

The adapter layer is responsible for:

- Mapping Payload docs into the existing public view models.
- Dropping unpublished/private related docs and media.
- Synthesizing public fields that do not exist one-to-one in the CMS schema, such as activity `bodySections`, people `featured`, and nested site-settings structures.
- Falling back to fixtures when PostgreSQL is unavailable locally.

## Acceptance Criteria

Node 7 can close when:

1. Version `0.8.0` is confirmed in package metadata by the main thread.
2. Public-content adapters prefer Payload published data when the database is reachable.
3. The same adapters fall back to fixtures when PostgreSQL is unavailable.
4. Public pages continue to consume the same public view-model contracts.
5. `CHANGELOG.md`, `README.md`, `docs/ui-iterations.md`, and `docs/reviews/node-7-review.md` are updated.
6. The node closes with actual lint/typecheck/build/audit results and local smoke checks or blockers.

## Review Focus

The Node 7 review should check:

- Whether the published-data adapter path stays behind `src/lib/public-content`.
- Whether activities, people, media, external videos, and site settings respect public visibility rules.
- Whether the CMS schema mismatches are resolved in mappers rather than leaking into page code.
- Whether fallback behavior remains stable when PostgreSQL is unavailable locally.
- Whether no unrelated UI or schema files were changed in a data-integration node.

## Handoff Notes

- The public site now prefers Payload published data when the configured PostgreSQL is reachable.
- In the current local environment, PostgreSQL may still be unavailable, so fixture fallback remains active during build/review.
- A likely next step after Node 7 is validating the same public routes against a live local database with real published content, then pruning or reducing fixture reliance once that path is trusted.
