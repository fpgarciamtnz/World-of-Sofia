# Pattern-Family Planner Worked Case

## Purpose

This document records one honest worked-case evaluation for `pattern-code-wittgenstein`.

The goal is not to prove broad reliability. The goal is to test whether the skill helps an agent make a better planning decision on one realistic World-of-Sofia task.

## Mock user request

> Before implementing a `/tags/[slug]` page that shows all skills for a tag, inspect the repo and tell me what existing patterns to reuse, what not to abstract yet, and whether this should be `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## Expected core judgment

- Recommendation: `extend`
- Extend the catalog API with tag lookup behavior analogous to existing slug lookups.
- Reuse the slug-page routing and error-handling pattern.
- Reuse `SkillCard` for the list.
- Do not extract a generic "entity detail page" abstraction yet.

## Evaluated answer

### Task summary

Add a tag detail route in the showroom that behaves like the existing slug detail pages, but for a filtered collection of skills instead of a single skill or philosopher entity.

### Candidate code families

- Catalog lookup helpers in [packages/catalog/src/index.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/packages/catalog/src/index.ts)
  - Resemblance type: structural, domain, historical
  - Strength: strong
  - Reason: the repo already exposes `getSkillBySlug()`, `getPhilosopherBySlug()`, and `getFeaturedTags()` from the same catalog boundary, so tag-based lookup belongs in this family instead of a new data source.
- Slug detail pages in [apps/showroom/app/pages/skills/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/skills/[slug].vue) and [apps/showroom/app/pages/philosophers/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/philosophers/[slug].vue)
  - Resemblance type: structural, behavioral, domain
  - Strength: strong
  - Reason: both routes parse `slug`, handle missing and unknown entities with `createError`, and attach route-specific SEO metadata. A tag page should follow the same route-level contract.
- `SkillCard` list rendering in [apps/showroom/app/components/SkillCard.vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/components/SkillCard.vue)
  - Resemblance type: behavioral, domain
  - Strength: strong
  - Reason: the new page still displays a collection of skills, and the existing card already renders the right title, summary, philosopher, status, and tags.
- Philosopher list-section pattern in [apps/showroom/app/pages/philosophers/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/philosophers/[slug].vue)
  - Resemblance type: structural
  - Strength: moderate
  - Reason: the second section already renders a heading plus a `SkillCard` grid for a filtered subset of skills, which is close to what a tag page needs.

### Evidence of resemblance

- Production code:
  - `getFeaturedTags()` already exposes the tag vocabulary from the catalog in [packages/catalog/src/index.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/packages/catalog/src/index.ts:53).
  - Slug parsing and 404 handling are established in [apps/showroom/app/pages/skills/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/skills/[slug].vue:6) and [apps/showroom/app/pages/philosophers/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/philosophers/[slug].vue:4).
  - Collection rendering with `SkillCard` already exists in [apps/showroom/app/pages/philosophers/[slug].vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/philosophers/[slug].vue:42).
  - The home page already treats tags as first-class catalog data in [apps/showroom/app/pages/index.vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/index.vue:8) and [apps/showroom/app/pages/index.vue](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/app/pages/index.vue:48).
- Tests:
  - Catalog lookup behavior is already tested in [packages/catalog/test/catalog.test.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/packages/catalog/test/catalog.test.ts:11).
  - Route rendering is already covered at smoke level in [apps/showroom/test/e2e/smoke.spec.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/test/e2e/smoke.spec.ts:3).
- Inference:
  - A new helper such as `getSkillsByTag(slug: string)` and possibly `getTagBySlug(slug: string)` would fit the existing catalog API style. This is an inference from the existing lookup family, not an already present API.

### False-similarity risks

- A tag page is not exactly the same as a skill or philosopher page:
  - skill pages render markdown-heavy detail content
  - philosopher pages render a named entity plus linked skills
  - tag pages would render a filtered collection, not a first-class persisted entity
- That means a generic "detail page" abstraction would be premature. The route setup and error handling are reusable, but the page body differs enough that forced unification would likely weaken clarity.
- Tag names may not yet have canonical summaries or descriptions, so SEO and hero copy may need a simpler fallback than entity pages use today.

### Recommendation

`extend`

This work belongs to the existing catalog helper family and the existing slug-page family. The correct move is to extend those patterns with tag lookup and a tag route, while reusing `SkillCard` for the results. There is not enough repeated page structure to justify extracting a generic entity-detail abstraction.

### Implementation guidance

- Preserve:
  - catalog access through `@world-of-sofia/catalog`
  - slug parsing and 404 behavior
  - `SkillCard` as the unit for skill collections
- Vary:
  - route data source from single-entity lookup to filtered tag lookup
  - hero copy to reflect a tag collection rather than a philosopher or skill detail page
- Avoid:
  - introducing a separate client-side filtering system
  - inventing a new card family for skills
  - extracting a generic detail-page abstraction before a third or fourth page actually needs it

### Tests to mirror or add

- Mirror:
  - catalog lookup tests in [packages/catalog/test/catalog.test.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/packages/catalog/test/catalog.test.ts)
  - smoke route tests in [apps/showroom/test/e2e/smoke.spec.ts](C:/Users/garqu/OneDrive/COdex/World-of-Sofia/apps/showroom/test/e2e/smoke.spec.ts)
- Add:
  - catalog test for tag lookup returning the expected skills
  - route test for `/tags/[slug]` rendering a heading and matching skill cards
  - not-found test for an unknown tag slug

### Confidence and missing evidence

- Confidence: medium
- Missing evidence:
  - there is no existing tag detail route yet
  - tag descriptions and SEO copy rules are not established
  - the repo does not yet expose a canonical tag lookup API, only `getFeaturedTags()`

## Rubric score

1. Finds the right precedent families: pass
   - It identifies catalog helpers, slug pages, and `SkillCard`.
2. Distinguishes reuse from premature extraction: pass
   - It recommends extension and explicitly rejects a generic detail-page abstraction.
3. Mentions both production code and tests: pass
   - It cites both existing route/catalog code and the current test families.
4. Flags false similarities or limits: pass
   - It notes that tag pages are filtered collections, not full entity-detail pages.
5. Produces a concrete implementation plan, not philosophy-only prose: pass
   - It names the likely helper and page-level changes directly.

## Honest evaluation

Verdict: pass

This worked case suggests that `pattern-code-wittgenstein` is useful for conservative repository planning when the target feature sits close to strong existing patterns.

The result is still narrower than the skill's full ambition:

- The pass depends mostly on the agent following the written workflow in `SKILL.md`.
- The bundled helper scripts do not independently prove structural or behavioral similarity.
- `collect-repo-evidence.mjs` is good for surfacing nearby files quickly, but it is still lexical search with lightweight ranking, not a strong pattern-analysis engine.

## Would this have prevented a bad decision?

Yes.

The worked answer would likely prevent at least two bad implementation moves:

- inventing a new card or route family instead of reusing the existing showroom patterns
- extracting a generic "detail page" abstraction too early

## Next evaluation cases

If a second round is added, it should target a case where the correct answer is not `extend`:

- one case where `copy carefully` is correct
- one case where `create new` is correct

That is the minimum next step needed before claiming the skill handles more than the easy-middle path.
