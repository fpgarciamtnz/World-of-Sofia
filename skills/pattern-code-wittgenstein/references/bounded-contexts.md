# Bounded Contexts

The prototype uses repository-local context labels derived from paths.

## Current context map

- `catalog access`
  - `packages/catalog/src/*`
- `catalog tests`
  - `packages/catalog/test/*`
- `showroom route page`
  - `apps/showroom/app/pages/*`
  - except `index.vue`
- `showroom landing page`
  - `apps/showroom/app/pages/index.vue`
- `showroom presentation`
  - `apps/showroom/app/components/*`
- `showroom tests`
  - `apps/showroom/test/*`
- `skill internals`
- `skills/pattern-code-wittgenstein/*`
- `project docs`
  - `docs/*`
- `project tooling`
  - everything else

## Adjacency policy

Not every context boundary is a hard exclusion.

Expected adjacency examples:

- route pages <-> presentation components
- route pages <-> catalog access
- route pages <-> showroom tests
- catalog access <-> catalog tests

High-risk combinations:

- route pages <-> skill internals
- route pages <-> project docs
- deployment/tooling tasks <-> showroom UI families

This map is intentionally narrow and repo-specific. It should be revised per repository family rather than treated as universal.
