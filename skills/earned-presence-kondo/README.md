# Earned Presence Kondo

Philosopher idea: Marie Kondo's keep-or-release habit becomes a practical review criterion: every surviving thing must earn its presence.

Practical use: Earned Presence Kondo reviews UI, code, docs, workflows, features, options, copy, and rules to decide whether each candidate should be kept, preserved, demoted, grouped, delayed, simplified, deprecated, deleted, replaced, or rebuilt simpler, including a radical rebuild, where it decides what to destroy, what must survive, and what simpler form replaces it.

## What it does

- Counters additive fixes by asking what can disappear, shrink, move later, or become cheaper before adding more structure.
- Translates "spark joy" into `earned presence`, not literal emotion or aesthetic minimalism.
- Treats empty space as a luxury: before anything fills a space, asks whether leaving it empty serves better, and does not backfill what a removal frees.
- Weighs value against attention, cognitive, maintenance, trust, testing, migration, coordination, and future-change costs.
- Protects boring but necessary elements such as legal text, warnings, accessibility affordances, tests, migrations, observability, compatibility paths, and security checks.
- Enters a destroy/preserve/rebuild judgment when the user wants to be radical, playful, break compatibility, start over, or build something new without being trapped by the current form.
- On a rendered screen, demotes, groups, or removes a competing element before anything is made louder.
- On real code changes, checks references before deletion and prefers deprecation where callers may exist.
- Reports concrete action verbs, evidence, confidence, risks, and a re-check.

## Distribution boundary

This folder must stay self-contained. Do not reference private files in another skill directory.

## Installation

Install it with `npx skills add fpgarciamtnz/World-of-Sofia --skill earned-presence-kondo`; the instructions are contained inside this folder.
