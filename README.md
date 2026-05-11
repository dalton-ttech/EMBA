# EMBA Activity Archive

An EMBA class activity archive with a public editorial site and an operator-facing visual content backend.

## Documentation

- [Node 0 Engineering Brief](docs/node-0.md)
- [Node 1 Engineering Brief](docs/node-1.md)
- [Node 2 Engineering Brief](docs/node-2.md)
- [Node 3 Engineering Brief](docs/node-3.md)
- [Node 4 Engineering Brief](docs/node-4.md)
- [Node 5 Engineering Brief](docs/node-5.md)
- [Node 6 Engineering Brief](docs/node-6.md)
- [Node 7 Engineering Brief](docs/node-7.md)
- [Node 8 Engineering Brief](docs/node-8.md)
- [Architecture](docs/architecture.md)
- [Node Workflow](docs/node-process.md)
- [Review Template](docs/review-template.md)
- [Node 0 Review Record](docs/reviews/node-0-review.md)
- [Node 1 Review Record](docs/reviews/node-1-review.md)
- [Node 2 Review Record](docs/reviews/node-2-review.md)
- [Node 3 Review Record](docs/reviews/node-3-review.md)
- [Node 4 Review Record](docs/reviews/node-4-review.md)
- [Node 5 Review Record](docs/reviews/node-5-review.md)
- [Node 6 Review Record](docs/reviews/node-6-review.md)
- [Node 7 Review Record](docs/reviews/node-7-review.md)
- [Node 8 Review Record](docs/reviews/node-8-review.md)
- [UI Iteration Log](docs/ui-iterations.md)

## Stack

- Next.js App Router
- TypeScript
- Payload CMS
- PostgreSQL
- pnpm workspace

## Local Setup

1. Copy `.env.example` to `.env.local` and fill in real values.
2. Start PostgreSQL using `infra/dev/docker-compose.yml`.
3. Install dependencies with `pnpm install`.
4. Run the development server with `pnpm dev`.

The local web app serves both the public site and Payload backend:

- Public site: `http://localhost:3000/`
- Activity list: `http://localhost:3000/activities`
- Activity detail: `http://localhost:3000/activities/[slug]`
- Video library: `http://localhost:3000/videos`
- Gallery archive: `http://localhost:3000/gallery`
- About / class profile: `http://localhost:3000/about`
- People directory: `http://localhost:3000/people`
- Contact page: `http://localhost:3000/contact`
- Payload admin: `http://localhost:3000/admin`
- Payload API: `http://localhost:3000/api`

Required local environment variables:

- `DATABASE_URL`: PostgreSQL connection string.
- `PAYLOAD_SECRET`: long random secret for Payload auth/session signing.
- `NEXT_PUBLIC_SITE_URL`: local public origin, normally `http://localhost:3000`.
- `EMBA_STRICT_ENV`: set to `true` in production-like checks to fail fast when required backend secrets are missing.

For first admin setup, start PostgreSQL and the dev server, then open `/admin`. When the `users` collection is empty, Payload allows the first account to be created from the admin screen. The backend forces that first account to `superAdmin`; use it to manage later admin, editor, reviewer, and material manager users.

## Backend Content Models

The Payload backend is organized around the archive editing workflow:

- Activities: event identity, timing, venue, activity type, editorial summary, activity minutes, highlights, outcomes, quotes, follow-ups, related people, media, video, cover preview, review state, and publication metadata.
- People / guests: reusable records for speakers, classmates, hosts, organizers, and guests, including display name, role/category, affiliation, title, biography, portrait, profile links, and editor-only notes.
- Video: externally hosted video metadata such as provider, canonical URL, provider id, duration, poster/cover image, captions/transcript status, source notes, rights notes, and public-display approval.
- Site settings: a global content source for homepage recommendation, class introduction, contact information, and default SEO metadata.

Public reads are intentionally conservative: activities and videos must be `published`, people must be `published` and explicitly public, and media records must be marked as publicly visible. Editors should use uploaded media covers for video previews instead of pasting iframe or arbitrary embed HTML.

Activity minutes should follow a consistent editor template: identity, time and venue, participants, minutes, media, video, review/publication, and search/share metadata. Node 2 documents this template in `docs/node-2.md`; later public UI work should treat these fields as editorial inputs, not as a finalized visual design.

## Public Archive Routes

The public archive currently includes three reader-facing route groups:

- `/activities`: a public activity list for browsing published activity summaries.
- `/activities/[slug]`: a public activity detail page template for one activity.
- `/videos`: a public video library derived from the same public-safe activity boundary.
- `/gallery`: a public gallery archive that links visual materials back to their source activity page.
- `/about`: a public class introduction page driven by site settings.
- `/people`: a public people and guest directory that only shows published and public profiles.
- `/contact`: a public contact hub with email-based outreach and non-persistent leave-your-email interaction.

These pages should render from public-safe activity view models instead of raw Payload collection records. The view model boundary is responsible for normalizing dates, labels, participants, media, and video metadata while excluding draft content, internal notes, private media, review metadata, and editor-only fields.

During early development and local review, the public archive may use fixture fallback data so the UI remains reviewable when PostgreSQL or Payload reads are unavailable. Later work should connect the same view model shape to Payload published activity records without forcing route or component rewrites.

Node 5 extends this same adapter boundary to site settings and people directories. The intended layering is:

1. Payload collections and globals remain the editorial source of truth.
2. `src/lib/public-content` adapts that data into public-safe view models.
3. Public pages render those view models and stay agnostic about whether the data currently comes from Payload or fixture fallback.

Node 6 keeps the same architecture while refining the public information surfaces. Homepage, about, people, and contact now intentionally use different editorial rhythms so the site feels more like a class archive and less like a flat product brochure.

Node 7 connects that same adapter layer to live Payload published reads. Activities, people, and site settings now prefer Payload data when the configured PostgreSQL is reachable, while still falling back to fixtures when the database is unavailable during local review.

Node 8 proves the first raw-material intake loop. A dropped package in `content-drop/test` was cleaned into a real public feature story, curated into local public media assets, and threaded through the same public-content adapter boundary so the homepage and activity detail page can evolve with class-owned material instead of placeholder demos.

For public media previews, the current Node 4 rule is:

1. Use an explicit uploaded/linked cover when present.
2. Fall back to the activity cover image.
3. Fall back to the activity hero or gallery image.
4. Render a styled placeholder when no public image is available.

This keeps the public pages stable without widening remote image allowlists for third-party video platforms.

For contact interactions, the current Node 5 rule is intentionally lightweight: visitors can fill in their email and message, but the site only drafts an email through the user's mail client. The site does not yet store public submissions or run a separate lead/subscription backend.

## Node Plan

Development proceeds in gated nodes. Every node must close with a documented review before the next node starts.

Per-node exit requirements:

1. Complete the scoped work for the node.
2. Run the agreed checks, or record why a check could not run.
3. Fill a review record from `docs/review-template.md`.
4. Update the project version for the completed node.
5. Update `CHANGELOG.md` with changes, review status, and test results.
6. Update `docs/ui-iterations.md` whenever user-facing UI changed.
7. Record any follow-up risks before opening the next node.

Node 0 is documented as version `0.1.0`; see `docs/node-0.md` for scope and exit criteria.
Node 1 is documented as version `0.2.0`; see `docs/node-1.md` for backend foundation, access control, and admin UX scope.
Node 2 is documented as version `0.3.0`; see `docs/node-2.md` for activity minutes, people/guest, external video, cover-preview, and unified activity-detail field scope.
Node 3 is documented as version `0.4.0`; see `docs/node-3.md` for public activity list/detail routes, view model boundaries, fixture fallback, and the later Payload connection path.
Node 4 is documented as version `0.5.0`; see `docs/node-4.md` for the public media archive pass covering `/videos`, `/gallery`, shared preview fallbacks, and fixture-backed verification.
Node 5 is documented as version `0.6.0`; see `docs/node-5.md` for the public information layer covering class introduction, people and guest directory, contact surface, site settings, and default SEO handling.
Node 6 is documented as version `0.7.0`; see `docs/node-6.md` for the focused UI refinement pass across `/`, `/about`, `/people`, and `/contact`.
Node 7 is documented as version `0.8.0`; see `docs/node-7.md` for the Payload-backed published-data adapter pass across activities, people, and site settings.
Node 8 is documented as version `0.9.0`; see `docs/node-8.md` for the first raw-material cleaning and front-end feature-story integration pass.
