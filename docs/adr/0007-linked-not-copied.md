# ADR 0007: Linked, not copied; pulled at session start

## Status

Accepted, 2026-11-21. Replaces the copy installer from ADR 0001 on machines that work from a clone, and the ADR 0004 consequence that removed skills must be deleted by hand.

## Context

`npm run install:skills` copied each skill into `~/.claude/skills`, so every change needed a reinstall, and copies drifted. By November 2026 this machine held Sofia skills in eight places: this repository, a stale second clone with the retired router, the installed copies, two backup folders, and the old runtime's two skill folders. A skill removed from the repository stayed installed until someone deleted it by hand.

The user decided that Sofia skills exist in two places only, this repository and its pushed version on GitHub; that anything outside the repository points to it; and that building a skill, pushing it, and having the machine updated must be simple, with the machine updating itself.

## Decision

- `scripts/link-skills.mjs` (`npm run link:skills`; `install:skills` is an alias) makes each `~/.claude/skills/<slug>`, or `$CLAUDE_CONFIG_DIR/skills/<slug>`, a link to `skills/<slug>` for every folder with a `SKILL.md`. On Windows the link is a directory junction, which needs neither admin rights nor Developer Mode; elsewhere it is a symlink. A test on 2026-11-21 confirmed that Claude Code loads a skill through a junction.
- It removes links whose skill is gone from the repository, replaces an installed copy that matches the repository (ignoring `tests/`), and moves any other folder in the way to `~/.claude/.backups/world-of-sofia/<slug>-<timestamp>`, since it may hold work that exists nowhere else. It never touches other skills.
- With `--pull`, it first fetches from GitHub within 10 seconds and then fast-forwards. It never merges, rebases, stashes, or resets: a failed pull is reported and skipped.
- It prints nothing when nothing needs attention. Otherwise it prints one or two short lines: what it linked or removed, why a pull was skipped, or that work is waiting to be committed and pushed. It appends one line per run to `.git/sofia-sync.log`, which git does not track.
- A SessionStart hook in the user's `~/.claude/settings.json` runs `node "<repo>/scripts/link-skills.mjs" --pull` for new and resumed sessions, so pushing to `origin main` is the only manual step.
- `npm run new:skill` links the new skill at once, so it is live while it is being written.
- The copy mode is removed. `installCommand` in each manifest now names `npx skills add fpgarciamtnz/World-of-Sofia --skill <slug>`, the install that still copies, for everyone else.
- The linker uses only the Node standard library, so the hook works before `npm install`.

## Rationale

- One copy cannot drift, and an edit is live in the next turn without a reinstall.
- A removed skill disappears from Claude Code on the next session start, with nothing to clean up by hand.
- Pulling at session start makes a push the moment a skill ships everywhere this machine runs Claude Code.
- Fast-forward only keeps the hook safe to run unattended: it can add GitHub's commits, but it cannot lose or rewrite local work.
- The time limit covers only the fetch, the one step that talks to the network, so a slow connection is cut off before anything changes locally.
- Reporting instead of fixing keeps the user in charge: a skipped pull or unpushed work is something to decide, not something a hook should guess at.

## Consequences

- Editing `~/.claude/skills/<slug>` edits this repository, since both are the same folder. Edit only here, and let `git status` show every change.
- Isolation still holds. `npx skills add` installs copies for everyone else, so a skill still cannot depend on files outside its folder. Through the link, Node resolves a bundled script from this repository, where `node_modules` exists, so test a bundled script from a copy outside the repository before it ships.
- `tests/` folders are now visible inside installed skills. Claude Code reads only `SKILL.md` and the files a skill points to, so they cost nothing at runtime.
- The hook lives outside the repository. A new machine needs a clone, one `npm run link:skills`, and the hook from the README.
- Every session start costs one fetch, about a second on a normal connection, and at most ten seconds when GitHub does not answer.
