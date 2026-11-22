# Aquinas Essence Map

Read this when storing or promoting a learning, resolving a conflict, repairing wrong learning, or using distinctions beyond those in `SKILL.md`.

## Further Distinctions

- `form`: a stable structure shared by different examples. Infer it when different artifacts share the same relation pattern.
- `matter`: the concrete utterance, file, or artifact that carries the structure.
- `common notion`: a stable pattern across contexts that is not yet definable enough to be essence. Use it to prevent fragmentation, without letting it override essence.
- `prudence`: choosing how a rule applies given the circumstance and the goal, which is what justifies a prudential exception.

## Learning Ladder

`case evidence -> clustered candidate -> reviewed project learning -> cross-project user learning`

- `case evidence`: a single utterance, correction, repository fact, or accepted or rejected result. It is evidence, and does not yet guide behavior.
- `clustered candidate`: repeated or important cases compacted into one emerging pattern, promoted when similar evidence repeats or one case is strong enough to protect against a future mistake.
- `reviewed project learning`: a candidate the user or project evidence has confirmed, requiring repetition plus review.
- `cross-project user learning`: similar reviewed learnings across projects. Prefer `habit` or `common notion` over `law` unless the user makes the rule authoritative.

Skip a level only when the user states an explicit law, and still record its scope. Project memory governs current project behavior unless the user overrides it; user-level memory guides expectations across projects and yields to current instructions, project law, and repository evidence.

## What To Keep

Keep a case when it is an explicit correction, conflicts with memory, repeats a candidate, explains an accepted or rejected outcome, or supports a promotion. Leave it unstored when it is isolated and low-value, merely local style, or a duplicate of an existing example. Cluster similar cases with one to three representative examples rather than keeping an audit trail.

Strong evidence: an explicit correction, repeated rejection of one alternative, approval of a pattern across projects, a term defined in `.agents/CONTEXT.md`, an ADR, or tests and code that prove current behavior.

Weak evidence: a one-off tone preference, a style in one artifact, naming similarity without behavioral match, coherence without definition, or an inference that has never survived a correction.

## Ledger Entries

Use `.agents/aquinas/essence-ledger.md` with only the fields a case needs:

```yaml
candidate: ""
scope: case | project | user-candidate
class: potency | habit | essence | law | common notion
evidence:
  - { said: "", meant: "", happened: "", source: "", date: "" }
activates_when: ""
promote_when: ""
discard_when: ""
last_seen: ""
```

A potency says "this could become true under these conditions", never "this will happen". Record what would actualize it and the risk of promoting it too early. The route from possibility to practical truth runs through a tested condition: possible meaning, tested condition, evidence response, practical truth. Downgrade an old truth back to potency when newer evidence makes it uncertain.

## Conflicting Learnings

Scope conflicts instead of blending them into a vague rule. Resolve in this order:

1. An explicit user correction beats an inferred pattern.
2. Current repository evidence beats stale memory for current behavior.
3. Law beats habit unless the user is revising the law.
4. Essence beats accident within the essence scope.
5. Scope both claims when each is true under different conditions.
6. Downgrade weak or stale claims to potency.
7. Ask one question if the conflict changes the next action and evidence cannot resolve it.

When a conflict is worth keeping, record both claims with their evidence, the type (contradiction, scope mismatch, priority mismatch, stale rule, exception, or terminology collision), the resolution, and the rule for the next action.

## Repairing Wrong Learning

Name the failure: wrong learning, stale learning, overgeneralized habit, project and user scope mismatch, old learning outweighing a newer correction, false essence, unresolved conflict, missing learning, potency used as truth, or truth used outside its scope.

Useful repair questions: What did you expect? What happened instead? Which learning caused it? Is it wrong, too broad, stale, or valid only elsewhere? Is this project-specific or user-wide? What future behavior would prove the repair worked?

Propose one revision: supersede, narrow scope, downgrade to potency, mark as accident, keep both with conditions, promote the newer correction, discard, or ask for more evidence. Record the repair as case evidence.
