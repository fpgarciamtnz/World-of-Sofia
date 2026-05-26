---
name: grill-me-aquinas
description: "Passive learning and intent-clarification skill built from onmax/skills grill-with-docs. Use when Codex must grill fuzzy requests before implementation, infer stable user preferences, separate project essence from accidental style, update agent-owned `.agents/CONTEXT.md` or `.agents/adr/`, or hand clarified language and constraints to pattern-code-wittgenstein or other skills."
---

# Grill Me Aquinas

Use this skill to align before building, then classify what was learned. It is derived from `grill-with-docs` at `https://github.com/onmax/skills/tree/main/skills/grill-with-docs`: grill the plan, check code and agent-owned docs before asking questions, sharpen terminology, and update `.agents/` documentation only when decisions crystallize.

Use Aquinas as the compact memory layer: separate essence from accident, potency from act, habit from law, and rule from prudential exception. Load [aquinas-essence-map.md](references/aquinas-essence-map.md) for classification rules, conflict handling, and handoffs. Load `deep-research-report (5).md` only when deeper source rationale is needed.

## Workflow

1. Restate the user's request as:
   - `said`: literal wording.
   - `meant`: likely goal, pressure, standard, or implied criterion.
   - `happened`: what repository evidence, prior decisions, accepted work, or current files show.
2. Inspect evidence before asking:
   - `.agents/CONTEXT.md`;
   - `.agents/CONTEXT-MAP.md` and relevant `.agents/contexts/<context>/CONTEXT.md`;
   - `.agents/adr/` and context-level `.agents/contexts/<context>/adr/`;
   - legacy root `CONTEXT.md`, root `CONTEXT-MAP.md`, and `docs/adr/` as read-only fallback evidence;
   - nearby code, tests, README files, templates, prompts, and current diffs when relevant.
3. Run the Open Potency Gate before fixing meaning, storing learning, or handing off implementation context.
4. Apply the Practical Truth Rule: use accepted truth solidly in action; reopen it only in inquiry, relearning, audit, or real conflict.
5. Walk the Question Ladder one unresolved decision at a time. Start with the branch whose answer affects later branches: terminology, domain boundary, relationship, lifecycle, behavior, persistence, deletion/archive, documentation, or implementation gate.
6. Ask one question at a time only when evidence cannot answer it. Include a recommended answer with the question.
7. Challenge vague, overloaded, or conflicting terms immediately. Prefer canonical `.agents/CONTEXT.md` language when it exists.
8. Cross-check user claims against code when code can answer. Surface contradictions plainly.
9. During grilling, write only `.agents/` context or ADR files. Do not edit source, tests, config, package files, or other project docs.
10. After each resolved point, classify it with the Aquinas layer and choose a memory action.
11. Treat new learnings as case evidence first. Promote only through the passive learning lifecycle.
12. Enter Relearning Mode when the user says the skill learned wrong, is stuck in old behavior, ignores new corrections, or is not acting as intended.

## Practical Truth Rule

Truth is practical: the currently best-fit learning for action, built from evidence and still revisable under inquiry.

- `use mode`: when acting, planning, handing off, or implementing, treat accepted project or user truth as solid. Do not constantly hedge, re-litigate, or weaken active guidance unless a real conflict appears.
- `inquiry mode`: when grilling, relearning, auditing, or checking mismatches, reopen truth. Inspect how it was built, what evidence supports it, what evidence challenges it, and whether it should be promoted, narrowed, downgraded, or replaced.

Use mode prevents endless doubt during execution. Inquiry mode prevents dogmatic old memory.

## Open Potency Gate

Use this lightweight gate to avoid premature closure. "Open mind" means preserving plausible alternatives long enough for evidence, user intent, project law, or repository reality to choose; it does not mean generating random ideas.

- Before resolving intent, ask: "What else could the user mean?"
- Before storing learning, ask: "Is this stable learning, or only one possible interpretation?"
- Before handoff or implementation, ask: "Are there other viable paths the next skill should know about?"
- Keep alternatives as `potency`, `common notion`, or `prudential exception`; do not promote them to `essence`, `act`, or `law` without evidence.
- Close the gate when one option is clearly better because of evidence, user instruction, project law, or repository reality.
- Use the gate mentally for normal tasks. Write alternatives only when they become stored case evidence, a candidate cluster, or a handoff risk.

## Question Ladder

Use the question ladder as the "grill me" asking layer. Ask one question at a time, recommend an answer, and ask only when evidence cannot answer. Each question should produce a memory action.

- `meaning`: separate `said` from `meant`.
- `term boundary`: resolve overloaded words, avoided aliases, and glossary conflicts.
- `scope`: decide whether the learning is case, project, or user scoped.
- `evidence`: check whether the learning is explicit, repeated, inferred, or accidental.
- `potency/gap`: ask what condition would make the learning relevant or true later.
- `open potency`: preserve viable alternative meanings or paths.
- `scenario`: test boundaries with concrete examples.
- `conflict`: resolve old vs new learning, law vs habit, or project vs user scope.
- `decision/ADR`: decide whether a learning is durable, surprising, hard to reverse, and trade-off based.
- `handoff`: identify what other skills must preserve, avoid, or treat as unresolved.

Map each answer to one memory action: glossary, ambiguity, case cluster, potency, conflict, ADR, handoff only, discard, project learning, or user learning.

## Passive Learning Lifecycle

Use the conservative ladder:

`case evidence -> clustered candidate -> reviewed project learning -> cross-project user learning`

- `case evidence`: a concrete utterance, correction, repository fact, accepted result, rejected result, or diff outcome. It is evidence, not guidance.
- `clustered candidate`: several similar cases compacted into one emerging pattern with scope, evidence count, representative examples, promotion condition, discard condition, and last-seen date.
- `reviewed project learning`: a cluster the user or project evidence has confirmed as project essence, project habit, project law, or scoped exception.
- `cross-project user learning`: a stable pattern found across projects. Store it as a user habit, common notion, or explicit law only when evidence supports that scope.

Use project-first storage:

- temporary project evidence: `.agents/aquinas/case-inbox.md`;
- durable project learning: `.agents/CONTEXT.md`, `.agents/adr/`, or `.agents/aquinas/essence-ledger.md`;
- durable user learning: `C:\Users\garqu\.codex\memories\grill-me-aquinas.md`.

Create these files lazily. Do not create `.agents/aquinas/` just to prepare a place for learning; create it only when there is a case worth keeping beyond the current response.

Use aggressive compaction:

- discard isolated low-value cases as accidents;
- keep explicit corrections, conflicts, repeated signals, and evidence for active candidates;
- compress similar cases into clusters instead of storing a full audit trail;
- keep only 1-3 representative examples per cluster unless the user asks for a fuller audit trail.

Project learning requires a repeated cluster plus review. User learning requires similar project learnings across projects. Explicit corrections are strong evidence, but still scope them before treating them as global user learning.

## Potency-To-Truth Loop

Use potency as the bridge from possible learning to practical truth:

`possible meaning -> tested condition -> evidence response -> practical truth`

- Keep weak or emerging claims as `potency`.
- Define potency as: "This may become true if these conditions appear."
- Use accepted truth solidly in action.
- Reopen accepted truth in inquiry when evidence, user correction, or behavior mismatch requires it.
- Promote potency to `act`, `habit`, `essence`, or `law` only when evidence actualizes it.
- Downgrade old truth back to potency when newer evidence makes it uncertain.

## Aquinas Classification

Classify every resolved point before storing or handing it off:

- `essence`: constitutive identity, invariant, or project-governing criterion.
- `accident`: local style, temporary preference, or non-governing detail.
- `form`: stable structure shared by different examples.
- `matter`: individual example, file, utterance, or artifact.
- `potency`: possible direction supported by evidence but not yet governing.
- `act`: currently governing behavior, validated decision, or repeated practice already in use.
- `habit`: stable user tendency shown by repeated action or correction.
- `law`: explicit, authoritative rule or policy.
- `prudential exception`: scoped override where applying the normal rule would defeat the goal.
- `common notion`: stable cross-context coherence not yet definable enough to become essence.

Do not promote accident to essence, potency to act, habit to law, or coherence to essence without enough evidence.

## Memory Actions

Choose one action for each resolved point:

- `record glossary term`: update `.agents/CONTEXT.md` with a concise definition, avoided aliases, and relationships if useful.
- `record ambiguity`: add a flagged ambiguity with the current resolution.
- `record ADR`: create `.agents/adr/NNNN-slug.md` only when the decision is hard to reverse, surprising without context, and trade-off based.
- `record case cluster`: update `.agents/aquinas/case-inbox.md` with a compact candidate only when the case repeats, conflicts, corrects, or supports a potential promotion.
- `record handoff only`: keep the point in the response when it is useful now but too weak for durable docs.
- `defer as potency`: keep an unresolved alternative or emerging signal with activation conditions.
- `promote to project learning`: move a reviewed cluster into project context, ADR, or essence ledger.
- `promote to user learning`: move a stable cross-project pattern into `C:\Users\garqu\.codex\memories\grill-me-aquinas.md` as habit, common notion, or explicit law.
- `revise learned truth`: after user review, supersede, narrow, downgrade, discard, or promote a prior learning.
- `record scoped conflict`: preserve competing claims with conditions and a next-action rule.
- `discard as accident`: keep it out of durable memory.

Create `.agents/` files lazily. Read legacy docs as evidence, but do not create new legacy context or ADR files unless the user explicitly asks for that layout.

## Conflict Handling

When learnings conflict, do not blend them into a vague rule. Build a conflict ledger with:

- both claims;
- scope, evidence, confidence, and date for each claim;
- conflict type: contradiction, scope mismatch, priority mismatch, stale rule, exception, or terminology collision;
- resolution: supersede, narrow scope, keep both with conditions, downgrade to potency, mark as accident, or ask the user.

Resolution order:

1. Explicit user correction beats inferred pattern.
2. Current repository evidence beats stale memory for current behavior.
3. Law beats habit unless the user is revising the law.
4. Essence beats accident within the essence scope.
5. Scope both claims when each is true under different conditions.
6. Downgrade weak or stale claims to potency.
7. Ask one question if the conflict changes the next action and evidence cannot resolve it.

## Relearning Mode

Use Relearning Mode when the user says the skill learned wrong, behaves from old memory, ignores new corrections, overuses old learning, or is not acting as intended.

1. Restate:
   - `expected behavior`;
   - `actual behavior`;
   - `suspected memory`.
2. Inspect project context, ADRs, essence ledger, case inbox, and global memory before asking.
3. Identify the failure type:
   - wrong learning;
   - stale learning;
   - overgeneralized user habit;
   - project/user scope mismatch;
   - old learning overweighting new correction;
   - false essence;
   - unresolved conflict;
   - missing learning;
   - unactualized potency treated as truth;
   - accepted truth used outside its proper scope.
4. Ask one repair question at a time with a recommended answer.
5. Propose one revision action: supersede, narrow, downgrade to potency, mark as accident, keep both with conditions, promote newer correction, discard, or ask for more evidence.
6. Apply durable memory changes only after user review.
7. Record the repair as case evidence and, when useful, a conflict/resolution entry.

## Handoffs

For `pattern-code-wittgenstein`, provide:

- repository-native task summary;
- bounded context and files inspected;
- canonical terms and avoided aliases;
- essence candidates that must be preserved;
- accidental style that should not drive abstraction;
- potencies or habits that may guide but not bind implementation;
- viable alternatives and false-closure risks when they affect implementation;
- false-similarity risks caused by reused words;
- concrete evidence paths.

For planning skills, provide facts, constraints, unresolved assumptions, and any user-language mismatch.

For review skills, provide the `said / meant / happened` record and whether the diff preserved the intended essence or only matched surface wording.

For Sofia, Descartes, and Pattern-Code-Wittgenstein, accept learning signals back as case evidence. Store them only if they correct a prior claim, expose a conflict, repeat a known candidate, or justify promotion.

## Output

Return this structure when the skill is used directly:

1. `Said / Meant / Happened`
2. `Practical Truth Mode`
3. `Question Ladder Step`
4. `Essence Candidates`
5. `Accidents Or Local Style`
6. `Potencies, Habits, Laws`
7. `Questions`
8. `Documentation Updates`
9. `Handoff To Other Skills`

When another skill needs the result, keep the handoff compact and evidence-backed.
