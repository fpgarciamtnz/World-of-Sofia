# Bounded Contexts

The prototype uses repository-local context labels derived from paths.

## Current context map

- `skill definition`
  - `skills/<slug>/SKILL.md`
  - `skills/<slug>/README.md`
  - `skills/<slug>/skill.meta.json`
  - `skills/<slug>/references/*`
- `skill tooling`
  - `scripts/*`
  - `scripts/lib/*`
- `skill tests`
  - `skills/<slug>/tests/*`
  - `scripts/**/*.test.mjs`
- `templates`
  - `templates/skill/*`
- `project docs`
  - `docs/*`
  - root markdown files
- `project config`
  - package, lint, CI, and repository configuration files

## Adjacency policy

Not every context boundary is a hard exclusion.

Expected adjacency examples:

- skill definition <-> skill tooling
- skill definition <-> skill tests
- templates <-> skill creation tooling
- project docs <-> project config

High-risk combinations:

- skill install workflow <-> skill template generation
- trace metadata <-> runtime instrumentation
- documentation examples <-> executable validation behavior

This map is intentionally narrow and repo-specific. It should be revised per repository family rather than treated as universal.
