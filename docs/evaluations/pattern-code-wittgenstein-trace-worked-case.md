# Pattern-Family Planner Worked Case

## Purpose

This document records one worked-case evaluation for `pattern-code-wittgenstein`.

The goal is to test whether the skill helps an agent make a better planning decision on one realistic World-of-Sofia skill-tooling task.

## Mock user request

> Before adding opt-in developer trace metadata to another skill, inspect the repo and tell me what existing patterns to reuse, what not to abstract yet, and whether this should be `reuse`, `extend`, `extract`, `copy carefully`, or `create new`.

## Expected core judgment

- Recommendation: `extend`
- Extend the existing developer trace metadata pattern in `skill.meta.json`.
- Reuse the `Skill Impact Trace` instruction shape from the existing skill.
- Reuse the registered trace contract file shape.
- Reuse root validation for trace metadata.
- Do not create a second trace format or runtime instrumentation system.

## Evaluated answer

### Task summary

Add developer trace support to another skill by following the established manifest, instruction, contract, and validation pattern.

### Candidate code families

- Developer trace manifest metadata in `skills/pattern-code-wittgenstein/skill.meta.json`
  - Resemblance type: structural, domain
  - Strength: strong
  - Reason: the existing metadata defines the supported trace mode, response surface, triggers, and contract path.
- Skill instruction text in `skills/pattern-code-wittgenstein/SKILL.md`
  - Resemblance type: behavioral, domain
  - Strength: strong
  - Reason: the file states when trace mode activates and how the response section should be appended.
- Trace contract in `skills/pattern-code-wittgenstein/references/developer-trace-contract.md`
  - Resemblance type: structural, behavioral
  - Strength: strong
  - Reason: the contract names the required trace fields and output shape.
- Root validation in `scripts/validate-skill-traces.mjs` and `scripts/lib/skills.mjs`
  - Resemblance type: behavioral, structural
  - Strength: strong
  - Reason: validation already checks the trace mode, response surface, registered contract, triggers, and required contract fields.

### Evidence of resemblance

- Production code:
  - `skill.meta.json` contains the current trace metadata shape.
  - `SKILL.md` contains the `Developer Trace Mode` section and `Skill Impact Trace` output requirement.
  - `developer-trace-contract.md` names required fields such as `trigger evidence`, `instructions applied`, and `decision impact`.
  - `scripts/validate-skill-traces.mjs` checks the manifest and contract consistency.
- Tests:
  - `scripts/lib/skills.test.mjs` preserves the trace metadata exposed by the root validation helper.
- Inference:
  - Another skill should reuse the same manifest shape and contract rules unless it has a materially different trace surface.

### False-similarity risks

- Response trace metadata is not runtime instrumentation.
- A new skill may need different triggers, but it should not invent different field names without validator support.
- A shared trace contract should remain opt-in and skill-local unless multiple skills prove the exact same contract is stable.

### Recommendation

`extend`

This work belongs to the existing developer trace and skill validation families. Extend the established pattern for the next skill, keep the contract registered in that skill's manifest, and validate it through the root trace checker.

### Implementation guidance

- Preserve:
  - `developerTrace.mode` as `opt-in`
  - `developerTrace.surfaces` including `response`
  - the registered contract file path in `references`
  - the `Skill Impact Trace` section name
- Vary:
  - trigger phrases can be skill-specific
  - contract wording can vary only when validation is updated accordingly
- Avoid:
  - a second trace metadata schema
  - global trace files that break skill isolation
  - claiming the response trace measures runtime effectiveness

### Tests to mirror or add

- Mirror `scripts/lib/skills.test.mjs` for manifest loading behavior.
- Run `npm run validate:skill-traces`.
- Add validator coverage if the trace schema grows beyond the current opt-in response surface.

### Confidence and missing evidence

- Confidence: medium
- Missing evidence:
  - only one skill currently uses developer trace metadata
  - the contract may need adjustment after a second skill uses it

## Rubric score

1. Finds the right precedent families: pass
2. Distinguishes extension from premature extraction: pass
3. Mentions both production code and tests: pass
4. Flags false similarities or limits: pass
5. Produces concrete implementation guidance: pass

## Honest evaluation

Verdict: pass

This worked case suggests that `pattern-code-wittgenstein` is useful for conservative repository planning when a task sits close to existing skill metadata, references, and validation scripts.
