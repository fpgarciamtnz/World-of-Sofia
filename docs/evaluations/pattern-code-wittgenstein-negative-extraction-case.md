# Pattern-Family Planner Negative-Extraction Case

## Mock Prompt

Before extracting a generic `EntityDetailPage` abstraction for `skills/[slug]`, `philosophers/[slug]`, and a planned `/tags/[slug]` route, inspect the repo and tell me what patterns actually belong together, what should stay separate, and whether the right action is `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## Expected Judgment

- Recommendation: `extend`
- Reject: `extract`

## Why `extend` Is Correct

- Reuse the existing slug-route shell: `useRoute()`, missing-slug handling, `createError(...)`, and `useSeoMeta(...)` already form a real route-page family in the showroom.
- Extend the catalog access layer with a tag-oriented lookup adjacent to the current slug helpers in `packages/catalog/src/index.ts`.
- Keep `skills/[slug]` and `philosophers/[slug]` page bodies separate because they render different contracts: markdown-heavy skill detail versus philosopher summary plus linked skill cards.
- Treat `SkillCard` as relevant supporting evidence for a future tag page, not as proof that all three detail routes belong behind one generic page abstraction.

## False-Similarity Risks

- Shared slug parsing and route error plumbing are route-shell similarities, not proof of a common detail-body abstraction.
- The planned `/tags/[slug]` route is hypothetical and cannot be counted as evidence that a stable three-way family already exists.
- `SkillCard` is a presentation precedent for listing related skills, but it does not erase the route-level differences between skill, philosopher, and tag pages.

## Pass Criteria

- The scout returns `extend`.
- The report cites both existing slug pages and the catalog helper family.
- The report explicitly rejects generic detail-page extraction in repo terms.
- The report mentions tests to mirror or extend, especially the showroom smoke route coverage.
