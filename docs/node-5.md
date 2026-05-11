# Node 5 Engineering Brief

Node 5 expands the public site from an archive browser into a clearer public-facing class portal. It adds the institution and class information layer around the archive: class introduction, people and guest directory, contact surface, homepage recommendations, and default SEO settings.

## Version

- Node: `5`
- Version: `0.6.0`
- Date: `2026-04-24`
- Status: approved with follow-ups

## Goals

- Add a single global content source for homepage recommendations, class introduction, contact information, and default SEO.
- Add a public class introduction route at `/about`.
- Add a public people and guest directory at `/people`.
- Add a public contact surface at `/contact`.
- Extend the homepage so it acts as both archive entrance and public-facing class portal.
- Preserve the existing public-content adapter boundary instead of letting public pages read raw Payload documents directly.
- Keep the new information layer easy to iterate visually without changing route contracts or data shapes.

## Scope

Node 5 covers the public information layer and its editorial source:

- Payload global for site settings.
- Public adapter for site settings and people directory data.
- Homepage recommendations for activities and people.
- Public layout header/footer shared across the site routes.
- Public `/about`, `/people`, and `/contact` routes.
- Default SEO metadata sourced from the site-settings layer.
- Documentation, changelog, UI iteration, and review updates associated with `0.6.0`.

Node 5 does not add a CRM, newsletter backend, lead storage system, or complex public-submission workflow. The contact interaction stays lightweight and explicit about not storing visitor email on-site.

## Editorial Boundary

The Node 5 public information layer should follow the same discipline established in Nodes 3 and 4:

- Payload collections and globals remain the editorial source of truth.
- `src/lib/public-content` adapts content into public-safe view models.
- Public pages consume those view models and stay agnostic about whether content currently comes from Payload or fixture fallback.
- Public pages do not directly expose internal notes, draft-only settings, or private media.
- Aggregated pages must re-check referenced people and media visibility, not only the parent document status.

## Public Routes

### `/about`

The class introduction route should:

- Explain what the class archive is trying to preserve and why it exists.
- Present class positioning, shared learning direction, and a stable introductory narrative.
- Reuse the same visual system as the archive routes rather than feeling like a separate microsite.

### `/people`

The people and guest directory should:

- Only expose public-safe people entries.
- Show role/category, organization, biography, and related activity context where available.
- Help visitors understand who has shaped the public activity history of the class.

### `/contact`

The contact surface should:

- Show public contact information and external contact links.
- Allow a visitor to fill in their email and context, while clearly explaining that the site will only open a mail draft and not store the submission.
- Keep the interaction boundary obvious so future upgrades to a real intake system can be treated as a separate decision.

## Site Settings Responsibilities

Node 5 defines site settings as the global content source for:

- Homepage recommendations.
- Class introduction.
- Contact information and public outreach entry points.
- Default SEO title, description, keywords, and sharing image.

These settings should be centralized rather than scattered across page constants or environment variables. Page-level overrides can still exist, but the site needs one stable default layer.

## Acceptance Criteria

Node 5 can close when:

1. Version `0.6.0` is confirmed in package metadata by the main thread.
2. A site-settings global exists for homepage recommendation, class introduction, contact information, and default SEO.
3. `/about`, `/people`, and `/contact` render from the public adapter layer.
4. The homepage presents class information and recommendations in addition to archive navigation.
5. Public people pages only expose published and public profiles.
6. The contact surface clearly communicates that visitor email is not stored on-site in this node.
7. Default SEO metadata is sourced from the site-settings layer.
8. `CHANGELOG.md`, `docs/ui-iterations.md`, and `docs/reviews/node-5-review.md` are updated.

## Review Focus

The Node 5 review should check:

- Site settings act as a clear global content boundary.
- Homepage recommendations no longer depend on a single activity boolean.
- Public pages continue to rely on adapter/view-model layers rather than direct CMS reads.
- People and contact pages respect public/private boundaries.
- Empty states exist for recommended content and public people.
- SEO defaults are centralized and page-level metadata remains coherent.
- The contact flow does not pretend to store submissions when it currently only drafts an email.
- The information layer feels like part of the same archive system, not a separate design language.

## Handoff Notes

- The current Node 5 contact interaction is mailto-based and intentionally non-persistent.
- Site settings and people directory still use fixture-backed fallback locally because PostgreSQL is unavailable.
- The next likely step after Node 5 is either Payload-backed public reads for settings/people or a focused UI refinement pass across homepage and information pages.
