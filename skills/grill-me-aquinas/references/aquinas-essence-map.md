# Aquinas Essence Map

Use this reference when a task requires passive learning, cross-project memory, or an explanation of how user language should become durable project context.

## Core Distinctions

| Aquinas distinction | Skill use | Promotion rule |
|---|---|---|
| Essence vs accident | Separate identity-bearing constraints from local style. | Promote to essence only when explicit definitions, exclusions, or cross-context corrections show the point governs project identity. |
| Form vs matter | Separate stable structure from individual examples. | Infer form when different artifacts share the same relation pattern. Keep example content as matter. |
| Act vs potency | Separate current governing behavior from latent capacity. | Store recurring but unsettled signals as potency; promote to act after successful use across contexts. |
| Habit vs law | Separate repeated user tendency from explicit authority. | Treat habits as defeasible until the user promulgates them as rules or repeated corrections make them binding. |
| Truth as adequation | Test codex claims against evidence and reality. | Downgrade any claim that fits style but conflicts with repository facts or validated outcomes. |
| Prudence | Apply rules according to circumstance and end. | Allow exceptions when ordinary rule application would defeat the user's actual goal. |
| Order and dependency | Keep memory layered instead of flat. | Revise local claims first; revise foundational claims only with impact assessment. |

## Practical Truth

Truth is practical, not absolute certainty. For this skill, truth means the currently best-fit learning for practical action, built from evidence and still revisable under inquiry.

Truth has two modes:

- `use mode`: while acting, planning, handing off, or implementing, accepted truth is solid. Do not constantly hedge, re-litigate, or weaken active project/user guidance unless a real conflict appears.
- `inquiry mode`: while grilling, relearning, auditing, or checking mismatches, truth is open to examination. Inspect how the truth was built, what evidence supports it, what evidence challenges it, and whether it should be promoted, narrowed, downgraded, or replaced.

Use mode prevents endless doubt during execution. Inquiry mode prevents dogmatic old memory.

## Said, Meant, Happened

- `said`: preserve the literal wording, including ambiguity or conflict.
- `meant`: infer the intended result, criterion, pressure, or correction.
- `happened`: record observable repo state, accepted output, rejected output, file change, or documented decision.

Use all three fields when the user pivots. Do not erase the first request; the mismatch is learning evidence.

## Question Ladder

Use the Question Ladder to decide what to ask. Ask one question at a time, include a recommended answer, and ask only when evidence cannot answer.

| Question type | What it asks | Learning output |
|---|---|---|
| Meaning | What did the user mean beyond the literal wording? | `said/meant/happened`, ambiguity, handoff |
| Term boundary | Which overloaded word, alias, or glossary boundary matters? | glossary, ambiguity, conflict |
| Scope | Is this case, project, or user learning? | storage scope, case cluster, project/user learning |
| Evidence | Is the signal explicit, repeated, inferred, or accidental? | potency, accident, candidate cluster |
| Potency/gap | What condition would make this relevant or true later? | activation condition, truth gap, promotion/discard condition |
| Open potency | What viable alternative meaning or path should remain open? | potency, common notion, false-closure handoff |
| Scenario | What concrete example tests the boundary? | scoped rule, exception, conflict |
| Conflict | Which old/new, law/habit, or project/user claim wins? | conflict ledger, supersede/narrow/downgrade |
| Decision/ADR | Is this durable, surprising, hard to reverse, and trade-off based? | ADR or handoff only |
| Handoff | What must another skill preserve, avoid, or treat as unresolved? | compact handoff |

Do not ask curiosity questions. Ask only when the answer changes storage, scope, implementation, or future behavior.

## Passive Learning Ladder

Every learning starts as a case. A case is evidence, not guidance.

Use this ladder:

1. `case evidence`: a single utterance, correction, repository fact, accepted output, rejected output, or diff outcome.
2. `clustered candidate`: repeated or important cases compacted into one emerging pattern.
3. `reviewed project learning`: a candidate accepted as project essence, habit, law, or scoped exception.
4. `cross-project user learning`: similar reviewed project learnings that reveal a stable user habit, common notion, or explicit user law.

Do not skip levels unless the user states an explicit law. Even then, record the scope and conditions before treating the law as global.

## Storage And Scope

Use project-first storage:

- temporary project evidence: `.agents/aquinas/case-inbox.md`;
- durable project learning: `.agents/CONTEXT.md`, `.agents/adr/`, or `.agents/aquinas/essence-ledger.md`;
- durable user learning: `C:\Users\garqu\.codex\memories\grill-me-aquinas.md`.

Create storage lazily. Do not create `.agents/aquinas/` for preparation alone.

Project memory is authoritative for current project behavior unless the user explicitly overrides it. Global user memory guides expectations across projects, but it does not override current instructions, project law, or repository evidence.

## Case Clustering And Pruning

Use aggressive compaction. Store cases only when they are useful beyond the current response.

Keep a case when it:

- is an explicit user correction;
- conflicts with existing memory;
- repeats a known candidate;
- explains a rejected or accepted outcome;
- supports promotion from case to project or user learning.

Discard or leave unstored when it:

- is isolated and low-value;
- is merely local style;
- has no foreseeable effect on future decisions;
- duplicates an existing representative example.

Cluster similar cases instead of storing a full audit trail. Keep 1-3 representative examples per cluster unless the user asks for traceability.

Suggested cluster shape:

```yaml
cluster:
  candidate: ""
  scope: ["case", "project", "user-candidate"]
  aquinas_class: ["matter", "form", "potency", "habit", "essence", "law", "common_notion", "accident"]
  evidence_count: 0
  representative_examples:
    - said: ""
      meant: ""
      happened: ""
      source: ""
      date: ""
  promotion_condition: ""
  discard_condition: ""
  last_seen: ""
```

## Promotion Rules

Promote case evidence to a clustered candidate when similar evidence repeats or a single case is strong enough to protect against a future mistake.

Promote a candidate to project learning only after repeated evidence plus review. Use:

- `.agents/CONTEXT.md` for glossary terms, project essence, and stable operating context;
- `.agents/adr/` for hard-to-reverse trade-offs;
- `.agents/aquinas/essence-ledger.md` for compact essence, habit, potency, and conflict summaries that do not belong in context or ADR.

Promote project learning to user learning only when similar reviewed learnings appear across projects. Prefer `habit` or `common notion` before `law` unless the user explicitly makes the rule authoritative.

Downgrade stale or weak learnings to potency. Discard isolated accidents.

## Evidence Signals

Strong evidence:

- explicit user correction;
- repeated rejection of the same alternative;
- approval of the same pattern across projects;
- a term already defined in `.agents/CONTEXT.md`;
- an ADR that records a hard-to-reverse trade-off;
- tests or code that prove the current behavior.

Weak evidence:

- one-off tone preference;
- style that appears only in one artifact;
- naming similarity without behavioral match;
- coherence without definition;
- an inferred preference that has never survived a correction.

## Classification Glossary

- `essence`: what must remain true for the concept, project, or user goal to still be itself.
- `accident`: something true in a case but not required for identity.
- `form`: the reusable structure or relation pattern.
- `matter`: the concrete utterance, file, example, or artifact carrying the structure.
- `potency`: a possible direction, latent capacity, or emerging rule supported by evidence but not yet actual. Potency can suggest likely outcomes and useful options, but it cannot claim that an outcome will happen.
- `act`: a realized or currently governing behavior.
- `habit`: a repeated tendency that guides expectations but remains defeasible.
- `law`: an explicit, authoritative rule.
- `prudential exception`: a scoped override where applying the normal rule would defeat the actual goal.
- `common notion`: a stable coherence pattern that is not yet defined enough to be essence.

## Potency And Possible Outcomes

Use potency to represent "this could become true under these conditions," not "this will happen."

A potency record should include:

- candidate rule or direction;
- activation conditions;
- evidence count and evidence quality;
- expected value or usefulness if activated;
- risks if promoted too early;
- conditions that would promote it to act;
- conditions that would discard it as accident.

Example:

```yaml
potency:
  candidate: "expand explanations when revising skill workflows"
  activation_conditions: ["skill design", "workflow ambiguity", "user asks for detail"]
  value_if_actualized: "reduces future misrouting and vague handoffs"
  promotion_condition: "user repeatedly accepts longer workflow detail in skill-editing tasks"
  risk_if_promoted_too_early: "overexplains simple implementation tasks"
```

## Potency-To-Truth Loop

Potency is the bridge from possible learning to practical truth:

`possible meaning -> tested condition -> evidence response -> practical truth`

Rules:

- Weak or emerging claims stay as `potency`.
- Potency says: "This may become true if these conditions appear."
- Accepted truth is used solidly in action.
- Accepted truth is revisable in inquiry.
- Promote potency to `act`, `habit`, `essence`, or `law` only when evidence actualizes it.
- Downgrade old truth back to potency when newer evidence makes it uncertain.

Recommended shape:

```yaml
potency_to_truth:
  possible_learning: ""
  claimed_scope: "case | project | user"
  mode: "use | inquiry"
  truth_gap: ""
  evidence_for: []
  evidence_against: []
  test_condition: ""
  practical_truth: ""
  actualized_as: "act | habit | essence | law | common_notion | none"
  revision_action: "promote | narrow | downgrade | supersede | discard | keep_open"
```

## Open Potency Gate

Use the Open Potency Gate to prevent premature closure. The goal is not maximum novelty; the goal is to preserve plausible alternatives until evidence, user instruction, project law, or repository reality makes one path prudently better.

Run the gate before:

- resolving intent;
- storing a learning;
- promoting a candidate;
- handing context to implementation or review skills.

Ask:

- What else could the user mean?
- Is this learning stable, or only one possible interpretation?
- Are there other viable paths the next skill should know about?
- Which assumptions may be locked too early?
- What evidence would close or reopen this decision?

Recommended evaluation shape:

```yaml
open_potency_gate:
  current_interpretation: ""
  alternative_interpretations: []
  ignored_possibilities: []
  unusual_but_valid_options: []
  assumption_locked_too_early: []
  evidence_missing: []
  reversible_experiment: ""
  reason_to_keep_open: ""
  reason_to_close: ""
```

Use only the fields needed for the case. Normal tasks can apply the gate mentally or in a compact response. Do not write every alternative to `.agents/`; store alternatives only when they become useful evidence, a candidate cluster, or a handoff risk.

Use the concepts this way:

- `potency` preserves possible paths.
- `prudence` chooses the right path for this case.
- `essence` is only what survives after alternatives were considered.
- `common notion` preserves stable coherence that is not yet definable enough to become essence.
- `prudential exception` preserves an unusual but valid option when the ordinary rule would defeat the goal.

Close the gate when one interpretation or path is clearly favored. Keep the gate open when alternatives would materially change storage scope, implementation direction, or user intent. If a false-closure risk affects implementation, include it in the handoff.

## Conflicting Learnings

Conflicting learnings should be scoped, not blended.

Use this resolution order:

1. Explicit correction beats inferred pattern.
2. Current repository evidence beats stale memory for current behavior.
3. Law beats habit unless the user is revising the law.
4. Essence beats accident within the essence scope.
5. Scope both claims when they are true under different conditions.
6. Downgrade weak or stale claims to potency.
7. Ask one question if the conflict changes the next action and evidence cannot resolve it.

Use a conflict ledger:

```yaml
conflict:
  claim_a: ""
  claim_b: ""
  conflict_type: ["contradiction", "scope_mismatch", "priority_mismatch", "stale_rule", "exception", "terminology_collision"]
  evidence_a: []
  evidence_b: []
  resolution: ["supersede", "narrow_scope", "keep_both_with_conditions", "downgrade_to_potency", "mark_accident", "ask_user"]
  next_action_rule: ""
```

## Relearning Mode

Use Relearning Mode when the user says the skill learned wrong, is stuck in old behavior, ignores new corrections, overuses old memory, or is not acting as intended.

Start by recording:

```yaml
relearning:
  expected_behavior: ""
  actual_behavior: ""
  suspected_memory: ""
  inspected_sources: []
  failure_type: ""
  repair_question: ""
  recommended_answer: ""
  proposed_revision: ""
```

Inspect project context, ADRs, essence ledger, case inbox, and global memory before asking. Then classify the failure:

- `wrong_learning`: the stored claim does not fit the user or project.
- `stale_learning`: the claim used to fit but no longer does.
- `overgeneralized_user_habit`: a local pattern was treated as global.
- `scope_mismatch`: project learning and user learning were confused.
- `old_over_new`: old learning outweighed a newer correction.
- `false_essence`: an accident or potency was promoted too far.
- `unresolved_conflict`: competing claims were never scoped.
- `missing_learning`: the skill lacked a needed rule or context.
- `unactualized_potency_as_truth`: a possible learning was used as if already actual.
- `truth_outside_scope`: accepted truth was used beyond its proper conditions.

Use one repair question at a time. Prefer:

- What did you expect the skill to do?
- What did it do instead?
- Which learning caused the wrong behavior?
- Is the old learning wrong, too broad, stale, or valid only elsewhere?
- Should the new correction supersede, narrow, or become an exception?
- Is this project-specific or user-wide?
- What future behavior would prove the relearning worked?

Propose one revision action: `supersede`, `narrow_scope`, `downgrade_to_potency`, `mark_accident`, `keep_both_with_conditions`, `promote_newer_correction`, `discard`, or `ask_for_more_evidence`.

Apply durable memory changes only after user review. Record the repair as case evidence and, when useful, as a conflict/resolution entry.

## Handoff To Pattern Code Wittgenstein

When handing off to `pattern-code-wittgenstein`, provide:

- bounded context and files inspected;
- canonical terms and avoided aliases;
- essence candidates that must be preserved;
- accidental style that should not drive abstraction;
- potencies or habits that may guide, but not bind, implementation;
- false-similarity risks caused by reused words;
- concrete evidence paths.

## Spinoza Backup

Use the coherence backup only when an invariant is stable but not yet definable. Record it as a `common notion`, `coherence edge`, or `potency`, not as essence. The backup should prevent fragmentation, not override Aquinas' distinctions.
