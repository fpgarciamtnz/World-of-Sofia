---
name: earned-presence-kondo
description: "Review whether elements earn the cost of existing before adding more structure or rebuilding. Use when Codex or Sofia should simplify, declutter, reduce UI/code/workflow complexity, evaluate deletion or deprecation, challenge additive fixes, decide whether a feature, section, option, abstraction, branch, copy block, rule, or process should be kept, demoted, grouped, delayed, simplified, deprecated, deleted, replaced, or rebuilt simpler. Also use when the user's wording or subtext signals radical redesign, playful destruction, breaking compatibility, not caring about preserving the old structure, tearing something down, starting over, rebuilding from scratch, or building a new version that should not be trapped by the existing form."
---

# Earned Presence Kondo

Use this skill to run a subtractive review before adding more structure. Translate the Marie Kondo-inspired habit into a practical engineering test: every surviving thing must earn its presence.

Do not treat "spark joy" literally. Treat it as `earned presence`: a thing stays when its value to the user, system, workflow, codebase, project, or intended effect justifies its attention, cognitive, maintenance, coordination, emotional, trust, testing, migration, opportunity, or future-change cost.

## Degree Of Freedom

This skill is `exploratory`: surface viable subtractive options before narrowing, challenge accidental clutter, and test deletion risks. Still pause before destructive edits, public API removal, broad rewrites, data loss, or changes that need usage, legal, accessibility, compliance, migration, security, or operational evidence.

When the user explicitly asks to be radical, playful, unconstrained by compatibility, or willing to break the old structure, use a `bold-by-default` posture inside this skill: consider erasing or replacing larger structures, but still identify the essence, user value, safety constraints, data, trust, and recovery paths that must survive.

## Core Principle

Before adding more, ask what can be removed, demoted, grouped, delayed, progressively disclosed, simplified, deprecated, or replaced.

Never remove something only because it is boring, old, ugly, duplicated, visually flat, or emotionally unsatisfying. Preserve what still serves a necessary purpose.

Load [references/earned-presence-foundation.md](references/earned-presence-foundation.md) when deeper doctrine, danger checks, bridge rules, or examples are needed.

## Earned Presence Test

For every candidate element, section, feature, code path, abstraction, copy block, workflow step, option, or rule, ask:

1. What is this thing?
2. What purpose does it serve?
3. Who needs it?
4. When is it needed?
5. What value does it create?
6. What cost does it create?
7. What would break, weaken, or become unclear if it disappeared?
8. Is the value still necessary now?
9. Can the same value be preserved more cheaply?
10. Should the action be `keep`, `preserve`, `demote`, `group`, `delay`, `progressively disclose`, `simplify`, `rename`, `move`, `split`, `merge`, `inline`, `deprecate`, `delete`, `replace`, `rebuild simpler`, `leave as-is`, or `investigate further`?
11. What evidence supports that action?
12. What confidence level applies?
13. What re-check confirms the decision was safe?

## Workflow

1. Identify the artifact and intended purpose.
2. List only candidate items whose presence, weight, location, or complexity is plausibly questionable.
3. Separate value from cost for each candidate.
4. Check preservation risks before recommending removal.
5. Prefer reversible actions when confidence is incomplete: demote, group, delay, progressively disclose, deprecate, or investigate further.
6. Recommend `delete` only when evidence is strong and the re-check is clear.
7. Recommend `rebuild simpler` only when patching the old structure creates more risk than a bounded replacement.
8. For radical rebuild requests, split the judgment into `destroy`, `preserve`, and `rebuild simpler`: what old structure can be erased, what essential value must survive, and what new form should carry that value more cheaply.
9. Hand off to the right specialist when the artifact needs rendered UI evidence, real diff evidence, code pattern discovery, or planning audit.

## Safety Rules

- Preserve legal text, compliance content, accessibility affordances, warnings, tests, migration code, compatibility adapters, logs, observability hooks, security checks, fallback UI, recovery paths, and domain distinctions when they earn their cost.
- Do not collapse bounded contexts merely because two things look similar.
- Do not delete public behavior without deprecation or migration.
- Do not remove tests unless the encoded behavior is explicitly obsolete.
- Do not hide risk, warnings, or recovery actions behind aesthetics.
- If evidence is weak, recommend `leave as-is`, `preserve`, or `investigate further`.

## Confidence

- `High`: multiple evidence signals agree; the action has a safe path; value and cost are clear.
- `Medium`: evidence is useful but incomplete; prefer reversible demotion, grouping, delay, progressive disclosure, or deprecation.
- `Low`: intent, usage, references, risk, or ownership is unclear; do not recommend direct deletion.

## Sofia Bridges

- With `ui-attention-ciceron`: when attention problems may be solved by reducing competing elements before making the primary element louder, review the costly peaks and recommend keep, demote, group, delay, simplify, or remove.
- With `synthesis-code-hegel`: when a real diff suggests deletion, deprecation, inlining, replacement, or rebuilding simpler, run the Earned Presence Test and return evidence for Hegel's behavior-preserving review.
- With `grill-me-aquinas`: when Aquinas detects the user means "be radical", "break the old shape", "play", "start over", "do not preserve compatibility", or "build the new thing without being trapped by the current form", receive the intent handoff and decide what to destroy, preserve, and rebuild simpler.
- With Sofia routing: use this skill independently when the user asks to simplify, declutter, reduce options, remove old structure, start over, break compatibility, build a new version, or ask "why is this here?"

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
10. `Replace / Rebuild Simpler`
11. `Risks`
12. `Re-check`
13. `Confidence`
14. `Sofia Handoff`
