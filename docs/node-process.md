# Node Workflow

Development moves through gated nodes. A node is not complete until implementation, review, versioning, changelog, tests, and UI iteration records are all handled.

## Node Entry

Before work starts:

1. Confirm the node number, target version, and scope.
2. Read the previous node review record and open follow-ups.
3. Confirm which files are in scope for the worker.
4. Decide the checks required for the node.

## During The Node

Workers should keep changes scoped to the node. If a new requirement appears, record it as a follow-up unless it is necessary to finish the current node safely.

For UI work, record meaningful design decisions as they happen:

- Surface changed.
- User goal served.
- Visual or interaction change made.
- Screenshot or verification path.
- Follow-up created.

## Node Exit Gate

Every node must complete these items before the next node starts:

1. **Per-node review**: create or update a review record from `docs/review-template.md`.
2. **Version update**: update the project version for the completed node. At minimum, confirm the root version and any changed package versions are aligned with the node.
3. **CHANGELOG update**: update `CHANGELOG.md` with added, changed, fixed, review, and test notes.
4. **UI iteration record**: update `docs/ui-iterations.md` if any public or admin UI changed.
5. **Checks**: run the agreed checks, or write down the blocker and owner.
6. **Handoff**: record unresolved risks and next-node recommendations.

## Version Rules

- Node 0 is `0.1.0`.
- Each completed node must have an explicit version.
- Feature-bearing nodes should increment the minor version unless the team agrees the work is a patch-level correction.
- Review-only or documentation-only corrections can use a patch increment when they need a release marker.
- Version changes should be committed with the implementation and `CHANGELOG.md` update for the same node.

## Review Rules

Each review record should include:

- Scope reviewed.
- Files or surfaces reviewed.
- Checks run.
- Issues found.
- Decision: approved, approved with follow-ups, changes requested, or blocked.
- Reviewer/date.

Review is required even when the node is mostly documentation. The review can be lightweight, but it must be explicit.

## Changelog Rules

`CHANGELOG.md` is the release memory for the project. Every node entry should include:

- Version and date.
- User-visible and engineering changes.
- Review state.
- Test/check state.
- Known follow-ups when they affect the next node.

Do not close a node with only code changes and no changelog entry.

## UI Iteration Rules

Update `docs/ui-iterations.md` whenever a node changes:

- Public pages.
- Payload admin configuration that affects editors.
- Layout, typography, colors, tokens, motion, imagery, or responsive behavior.
- User-facing copy.

The entry should be short but concrete enough for the next worker to understand why the UI changed and how it was verified.
