---
name: earned-presence-kondo
description: "Simplify or rebuild when added structure may not earn its cost. Use for deletion, deprecation, decluttering, or explicit radical redesign requests."
---

# Earned Presence Kondo

Use this skill to run a subtractive review before adding more structure. Translate the Marie Kondo-inspired habit into a practical engineering test: every surviving thing must earn its presence.

Do not treat "spark joy" literally. Treat it as `earned presence`: a thing stays when its value to the user, system, workflow, codebase, project, or intended effect justifies its attention, cognitive, maintenance, coordination, emotional, trust, testing, migration, opportunity, or future-change cost.
Measuring this means being able to evaluate the role of the item and compare it with the workflow and attention-span structure of the design.

## Degree Of Freedom

This skill is `exploratory`: surface viable subtractive options before narrowing, challenge accidental clutter, and test deletion risks. Still pause before destructive edits, public API removal, broad rewrites, data loss, or changes that need usage, legal, accessibility, compliance, migration, security, or operational evidence. This skill is meant to change and review UI/UX elements.

## Core Principle

The goal when called is to challenge all items on display and find arguments to avoid deleting them. The conclusion of the Earned Presence Test determines whether each one is removed, demoted, grouped, delayed, progressively disclosed, simplified, deprecated, or replaced.

Space is a luxury. Empty space, such as whitespace, a quiet column, the slot a removal frees, a section with nothing to say yet, or a setting that does not exist, gives what remains attention, contrast, and room to change, and filling it spends all three. Treat empty space as the option every filler must beat: a new or surviving item earns its place by serving better than the space it takes, not merely by being useful.

Load [references/earned-presence-foundation.md](references/earned-presence-foundation.md) when deeper doctrine, danger checks, UI or code specifics, or examples are needed.

## Earned Presence Test

For every candidate element, section, feature, code path, abstraction, copy block, workflow step, option, or rule, ask:

1. What is this thing?
2. What purpose does it serve?
3. Who needs it?
4. When is it needed?
5. What value does it create?
6. What cost does it create?
7. How does this affect the user's workflow and attention process?
8. What would break, weaken, or become unclear if it disappeared?
9. Is the value still necessary now?
10. Can the same value be preserved more cheaply?
11. Would the space it takes, or would take, serve better left empty?
12. Should the action be `keep`, `preserve`, `demote`, `group`, `delay`, `progressively disclose`, `simplify`, `rename`, `move`, `split`, `merge`, `inline`, `deprecate`, `delete`, `replace`, `rebuild simpler`, `leave empty`, `leave as-is`, or `investigate further`?
13. What evidence supports that action?
14. What confidence level applies?
15. What re-check confirms the decision was safe?

## Workflow

1. Identify the artifact and intended purpose.
2. List only candidate items whose presence, weight, location, or complexity is plausibly questionable, including anything proposed to fill an empty space.
3. Separate value from cost for each candidate.
4. Assess whether the place and display match the role.
5. Prefer reversible actions when confidence is incomplete: demote, group, delay, progressively disclose, deprecate, or investigate further.
6. Recommend `delete` only when evidence is strong and the re-check is clear.
7. Leave the space a delete, demote, move, or merge frees empty unless something earns it. Do not backfill a slot because it looks empty; that is the additive habit coming back.
8. Recommend `rebuild simpler` only when patching the old structure creates more risk than a bounded replacement.
9. For radical rebuild requests, split the judgment into `destroy`, `preserve`, and `rebuild simpler`: what old structure can be erased, what essential value must survive, and what new form should carry that value more cheaply, and what room it leaves empty.
10. Judge from the artifact itself: the rendered screen for UI, the real diff and its references for code, and the stated purpose for docs and workflows. When that evidence is missing, say what is missing instead of judging without it.

## Safety Rules

- Preserve legal text, compliance content, accessibility affordances, warnings, tests, migration code, compatibility adapters, logs, observability hooks, security checks, fallback UI, recovery paths, and domain distinctions when they earn their cost.
- Do not collapse bounded contexts merely because two things look similar.
- Do not delete public behavior without deprecation or migration.
- Do not remove tests unless the encoded behavior is explicitly obsolete.
- Do not hide risk, warnings, or recovery actions behind aesthetics.
- Do not leave a space empty where a label, warning, error message, next action, or recovery path belongs: an empty state still owes the user a way forward, and a gap must not read as broken or still loading.
- If evidence is weak, recommend `leave as-is`, `preserve`, or `investigate further`.

## Confidence

- `High`: multiple evidence signals agree; the action has a safe path; value and cost are clear.
- `Medium`: evidence is useful but incomplete; prefer reversible demotion, grouping, delay, progressive disclosure, or deprecation.
- `Low`: intent, usage, references, risk, or ownership is unclear; do not recommend direct deletion.

## Required Output

Use only sections with real findings:

1. `Artifact Reviewed`
2. `Intended Purpose`
3. `Candidate Items`
4. `Earned Presence Analysis`
5. `Keep / Preserve`
6. `Demote / Group / Delay`
7. `Simplify / Rename / Move`
8. `Split / Merge / Inline`
9. `Deprecate / Delete`
10. `Leave Empty`
11. `Replace / Rebuild Simpler`
12. `Risks`
13. `Re-check`
14. `Confidence`
