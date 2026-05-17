# World of Sofia

World of Sofia is a Codex skill collection and toolkit. It turns philosopher-derived software work habits into isolated, installable skills.

The repository is structured around one hard rule: skills do not mix. Every skill lives in its own folder with its own manifest, instructions, and references so it can be copied and installed without depending on private files from another skill.

## Skills

- **Audit Plan Descartes**: separates facts, constraints, assumptions, and missing evidence before final planning.
- **Pattern Code Wittgenstein**: inspects repository patterns before implementation and recommends whether to reuse, extend, extract, copy carefully, or create new code.
- **Synthesis Code Hegel**: reviews real code changes and recommends whether to leave, rename, extract, merge, split, inline, deprecate, or delete.
- **Communication Review Ciceron**: reviews message intent, audience uptake, tone, clarity, and reformulation.
- **Sofia Coordinator**: routes multi-skill planning, creation, update, review, and validation workflows through the smallest useful set of skills.

## Repository Layout

- `skills/<slug>`: one self-contained skill per folder.
- `scripts`: skill creation, validation, installation, and repository analysis tools.
- `scripts/lib`: shared root helpers for skill validation and loading.
- `templates/skill`: source template for new skills.
- `docs`: architecture notes and evaluation cases.

## Commands

```bash
npm install
npm run validate:skills
npm run validate:skill-traces
npm run check:isolation
npm run test
npm run check
```

## Install Skills Into Codex

After cloning the repo, install the project skills into Codex with an explicit install command:

```bash
npm install
npm run validate:skills
npm run install:skills
```

The installer copies every validation-valid folder from `skills/<slug>` into `$CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise into `~/.codex/skills`. Existing target skills are backed up under `.backups/world-of-sofia/<slug>-<timestamp>` before they are replaced.

To install or update one skill:

```bash
npm run install:skill -- audit-plan-descartes
```

Rerun the same install command whenever skills change. Open a new Codex session if a newly installed or updated skill does not appear immediately.

The legacy `sync:skills` and `sync:skill` aliases are still available and run the same installer.

## Adding A Skill

```bash
npm run new:skill -- "Stoic Triage" "Epictetus"
npm run validate:skills
npm run check:isolation
npm run test
```

Each generated skill folder is expected to remain distributable on its own.
