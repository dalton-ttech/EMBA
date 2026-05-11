# Node 8 Engineering Brief

Node 8 is the first real-material integration pass. It takes a dropped WeChat article package from `content-drop/test`, cleans it into a structured public feature story, and lets the front-end start reading like a real 8A-194 archive instead of a demo.

## Version

- Node: `8`
- Version: `0.9.0`
- Date: `2026-04-25`
- Status: approved with follow-ups

## Goals

- Prove a repeatable intake path from dropped raw materials to public-facing archive content.
- Keep the existing `src/lib/public-content` boundary intact while adding one real class-owned story.
- Curate local public media assets so the front-end can use class photography and campaign posters without widening remote image policy.
- Use the new story to raise the visual quality of the homepage and activity detail page.

## Scope

Node 8 covers the first editorial-material ingestion loop:

- Inspect and classify the dropped `content-drop/test` package.
- Clean the copy into a structured activity/detail story rather than reading raw files directly in pages.
- Curate selected images into `apps/web/public/media/gobi21-support/`.
- Add the cleaned story to the fixture-backed public-content layer.
- Promote that story into homepage recommendations.
- Refresh about-page imagery and copy so the public site feels more specifically like the 8A-194 class archive.
- Upgrade the public activity detail layout with a hero mosaic, signal cards, tag chips, and portrait-aware gallery rendering.
- Update docs, changelog, version metadata, and node review records for `0.9.0`.

Node 8 does not yet complete the live Payload CMS ingestion flow for this story. The PostgreSQL-backed path remains a follow-up once the local database is running and the cleaned content can be moved into Payload records.

## Material Interpretation

The dropped package is best interpreted as a campaign-style feature article, not a single conventional event record:

- Working title: `HKU EMBA | 8A班为港大戈21赛加油，累计捐赠133万`
- Core theme: class support for HKU Gobi 21 through multi-stop preparation, organization, and financial backing
- Key signals: `133万元`, `5位同学`, `深圳 / 福州 / 丽江 / 桂林 / 北京`
- Known limitation: the exact original WeChat publish timestamp is not explicitly present in the raw package, so the first front-end pass uses a provisional archive date that should be corrected later.

## Acceptance Criteria

Node 8 can close when:

1. Version `0.9.0` is updated across package metadata.
2. The cleaned story is available as a public activity detail route.
3. Homepage recommendations visibly include the cleaned story.
4. Public pages consume curated local images instead of the raw `content-drop` paths.
5. The public activity detail page visibly benefits from the richer real-content layout.
6. `CHANGELOG.md`, `README.md`, `docs/ui-iterations.md`, and `docs/reviews/node-8-review.md` are updated.
7. The node closes with lint, typecheck, build, audit, and HTTP smoke results or recorded blockers.

## Review Focus

The Node 8 review should check:

- Whether raw dropped materials remain outside the page/component layer.
- Whether curated media and cleaned copy stay behind the public-content boundary.
- Whether the new real-material story improves the visible archive experience without breaking other routes.
- Whether the new detail-page layout remains responsive and graceful for activities with less media.
- Whether any inferred metadata is clearly documented as provisional.

## Handoff Notes

- This node proves that future WeChat packages can be handled the same way: inspect -> curate assets -> write structured story -> feature it on the public site.
- When PostgreSQL becomes available locally, this cleaned story should be migrated from fixture-backed content into Payload-published records.
- The biggest editorial follow-up is confirming the exact original publish date and any canonical article link for the source story.
