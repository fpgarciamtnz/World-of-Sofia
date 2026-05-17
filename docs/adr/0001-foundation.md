# ADR 0001: World of Sofia foundation

## Status

Accepted, revised.

## Decision

Use a root-script Node toolkit with:

- `skills/<slug>` for self-contained skill units
- `scripts` for creation, validation, installation, and analysis commands
- `templates/skill` for new skill scaffolding
- `docs` for architecture notes and evaluation cases

Keep skill content in-repo and install skills into Codex through explicit sync commands.

## Rationale

- The project is a skill collection and toolkit, not an application.
- Root scripts keep validation and installation available without a package workspace layer.
- Repo-managed content is simple to review and validate.
- Strict per-skill folders make extraction and redistribution practical.

## Consequences

- Generated website data is no longer produced.
- Skill validation runs from root scripts.
- Cross-skill file references are treated as validation failures.
- CI verifies linting, validation, isolation checks, and tests only.
