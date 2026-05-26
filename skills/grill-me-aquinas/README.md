# Grill Me Aquinas

Philosopher idea: Aquinas' essence-versus-accident and act-versus-potency distinctions become a passive-learning habit: separate what defines the user's goal from what merely happened in one exchange.

Practical use: Grill Me Aquinas inspects user wording, project documents, code evidence, and prior decisions to distinguish what was said, what was meant, and what actually happened. It stores learning conservatively through this ladder:

`case evidence -> clustered candidate -> reviewed project learning -> cross-project user learning`

## What it does

- Adapts the `grill-with-docs` source approach from `https://github.com/onmax/skills/tree/main/skills/grill-with-docs`: walk the design tree, ask one decision question at a time, recommend an answer, inspect code/docs before asking, and capture resolved language under `.agents/`.
- Adds an Aquinas-based classification layer for essence, accident, act, potency, habit, law, and prudential exception.
- Uses a Question Ladder so every question has a purpose and expected learning output.
- Treats truth as practical: solid when used, flexible when questioned or rebuilt.
- Uses potency as the bridge from possible learning to practical truth.
- Builds passive user-understanding records from corrections, pivots, approvals, contradictions, and cross-project repetition.
- Provides Relearning Mode for wrong, stale, overgeneralized, or mis-scoped learning.
- Uses an Open Potency Gate to preserve plausible alternatives before fixing meaning, storing learning, or handing off implementation context.
- Uses aggressive compaction so temporary case learning does not become permanent noise.
- Updates `.agents/CONTEXT.md`, `.agents/adr/`, `.agents/aquinas/case-inbox.md`, or `.agents/aquinas/essence-ledger.md` only when the learning is worth keeping.
- Produces compact handoffs for `sofia-coordinatior`, `descartes-skill`, `pattern-code-wittgenstein`, and review skills.

## Runtime Workflow

1. Capture `said`, `meant`, and `happened` so user wording, inferred intent, and observed project reality stay separate.
2. Inspect `.agents/CONTEXT.md`, `.agents/adr/`, code, tests, README files, templates, and changed files before asking questions.
3. Run the Open Potency Gate: check whether plausible alternative meanings, paths, or assumptions should remain open.
4. Apply the Practical Truth Rule: use accepted truth solidly in action, but reopen it in inquiry, relearning, audit, or conflict.
5. Grill vague or conflicting terms through the Question Ladder, one question at a time with a recommended resolution.
6. Classify each resolved point as essence, accident, form, matter, potency, act, habit, law, prudential exception, or common notion.
7. Treat each new learning as case evidence first, then cluster, promote, downgrade, or discard it.
8. Run the Potency-To-Truth Loop when a possible learning may become practical truth.
9. Resolve conflicting learnings by scoping, superseding, downgrading, or asking one blocking question.
10. Choose a memory action: update glossary, flag ambiguity, create ADR, record case cluster, promote project/user learning, revise learned truth, hand off only, defer as potency, record scoped conflict, or discard as accident.
11. Enter Relearning Mode when behavior shows wrong, stale, overgeneralized, or mis-scoped learning.
12. Hand clarified context to implementation, planning, or review skills using their native evidence format.

## Practical Truth

Truth is the currently best-fit learning for practical action, built from evidence and still revisable under inquiry.

- Use mode: accepted truth is solid while acting, planning, handing off, or implementing.
- Inquiry mode: accepted truth can be questioned while grilling, relearning, auditing, or checking mismatches.

The skill should not doubt constantly during execution, but it must be able to rebuild truth when behavior no longer fits.

## Question Ladder

The skill asks only learning-bearing questions. Question types are meaning, term boundary, scope, evidence, potency/gap, open potency, scenario, conflict, decision/ADR, and handoff.

Each answer should produce a memory action: glossary, ambiguity, case cluster, potency, conflict, ADR, handoff only, discard, project learning, user learning, or revised learned truth.

## Open Potency Gate

The gate is a lightweight open-mindedness check, not a full creative pass. It asks:

- What else could the user mean?
- Is this stable learning, or only one possible interpretation?
- Are there other viable paths the next skill should know about?

Alternatives stay as `potency`, `common notion`, or `prudential exception` until evidence justifies closing the gate. They are not stored unless they become useful evidence, a candidate cluster, or a handoff risk.

## Potency-To-Truth Loop

Potency is how the skill builds truth without pretending weak evidence is already truth:

`possible meaning -> tested condition -> evidence response -> practical truth`

Weak or emerging claims stay as potency. Accepted truth is used solidly in action and reopened only in inquiry when evidence, user correction, or behavior mismatch requires it.

## Relearning Mode

Use Relearning Mode when the user says the skill learned wrong, is stuck in old behavior, ignores new corrections, overuses old memory, or is not acting as intended.

The skill restates expected behavior, actual behavior, and suspected memory; inspects existing project/global memory; classifies the failure; asks one repair question with a recommended answer; then proposes a revision such as supersede, narrow, downgrade to potency, mark accident, keep both with conditions, promote newer correction, discard, or ask for more evidence. Durable memory changes require user review.

## Learning Storage

The skill creates storage lazily. It should not create `.agents/aquinas/` unless there is learning worth keeping beyond the current response.

- Temporary project evidence: `.agents/aquinas/case-inbox.md`
- Durable project learning: `.agents/CONTEXT.md`, `.agents/adr/`, or `.agents/aquinas/essence-ledger.md`
- Durable user learning: `C:\Users\garqu\.codex\memories\grill-me-aquinas.md`

Project memory is the default source of truth for project behavior. Global user memory guides cross-project expectations, but it does not override current user instructions, project law, or repository evidence.

## File Structure

```text
skills/grill-me-aquinas/
  SKILL.md
  README.md
  skill.meta.json
  references/
    aquinas-essence-map.md
  deep-research-report (5).md
```

## Included resources

- [SKILL.md](SKILL.md): active runtime behavior. This is what Codex loads when the skill triggers.
- [references/aquinas-essence-map.md](references/aquinas-essence-map.md): compact operational rules for classification, practical truth, question ladder, passive learning, open potency, potency-to-truth, relearning, storage, pruning, promotion, conflicts, and handoffs.
- [skill.meta.json](skill.meta.json): package manifest used by World of Sofia tooling to identify the skill, source URL, install command, status, version, and registered references.
- `deep-research-report (5).md`: full research backup for the Aquinas/Spinoza model. Load only when deeper philosophical rationale is needed.

## Internal Connections

- `SKILL.md` is the entrypoint. It points to `references/aquinas-essence-map.md` for detailed classification and passive-learning rules.
- `references/aquinas-essence-map.md` defines how case evidence becomes clustered candidates, project learning, and user learning; how potency builds practical truth; and how relearning repairs bad or stale memory.
- `deep-research-report (5).md` justifies the model but is not part of the normal runtime path.
- `skill.meta.json` registers `references/aquinas-essence-map.md` and `deep-research-report (5).md` as formal references.
- The upstream source remains external: `https://github.com/onmax/skills/tree/main/skills/grill-with-docs`.

## Distribution boundary

This folder is intentionally self-contained. The skill carries its active instructions, compact Aquinas reference, and full research context without depending on private files from another skill.
