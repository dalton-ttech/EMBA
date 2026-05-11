# Node 0 Engineering Brief

Node 0 establishes the project foundation for the EMBA Activity Archive. It is the baseline for later content, CMS, and public UI work.

## Version

- Node: `0`
- Version: `0.1.0`
- Date: `2026-04-22`
- Status: passed

## Scope

Node 0 covers the initial engineering skeleton only:

- pnpm workspace structure.
- Next.js App Router application at `apps/web`.
- Payload CMS configuration, admin routes, and API routes inside the web app.
- PostgreSQL development infrastructure under `infra/dev`.
- Shared package placeholders for content schema and design tokens.
- Public home page placeholder and base style token entry points.
- Documentation for node review, architecture, versioning, changelog upkeep, and UI iteration records.

Node 0 does not include production content modeling, final visual design, deployment automation, authentication hardening, or production media storage.

## Engineering Boundaries

- `apps/web` owns the public site, Payload admin, Payload API routes, app styles, and CMS collection definitions.
- `packages/content-schema` is reserved for shared content types and lifecycle definitions that should not be duplicated across apps.
- `packages/design-tokens` is reserved for shared breakpoint, spacing, color, and typography tokens.
- `infra/dev` owns local development infrastructure only.

## Exit Criteria

Node 0 was closed after:

1. The Node 0 review record is completed from `docs/review-template.md`.
2. Dependency installation is verified.
3. `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm review:node0` are run or explicitly marked blocked.
4. Version `0.1.0` is confirmed as the Node 0 release version.
5. `CHANGELOG.md` includes Node 0 changes, review status, and test status.
6. `docs/ui-iterations.md` includes the initial public UI iteration.
7. Any known risks are recorded before Node 1 starts.

## Review Focus

The Node 0 review should check:

- Workspace scripts and package boundaries are coherent.
- Payload and Next.js routes can coexist in the same app.
- Environment variables are documented and secrets are not committed.
- Local PostgreSQL startup path is clear.
- Public placeholder UI renders without layout, encoding, or responsive issues.
- The project has enough documentation for the next worker to continue without guessing.

## Handoff Notes

- Treat Node 0 as a foundation checkpoint, not a feature-complete release.
- Future nodes should update the relevant package versions and `CHANGELOG.md` in the same change set as implementation.
- Any future UI change, even a small visual adjustment, should add an entry to `docs/ui-iterations.md`.
