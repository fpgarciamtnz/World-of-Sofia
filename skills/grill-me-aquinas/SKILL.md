---
name: grill-me-aquinas
description: "Clarify intent, scope, terminology, and project essence before planning or implementation. Use for fuzzy requests, preference discovery, radical redesign signals, an explicit grill-me session, or when the user says a skill learned something wrong."
---

# Grill Me Aquinas

Align before building, then classify what was learned. Derived from `grill-with-docs` at `https://github.com/onmax/skills/tree/main/skills/grill-with-docs`: check code and docs before asking, sharpen terminology, walk the design tree one decision at a time, and record only what crystallizes.

The Aquinas layer keeps memory honest by separating essence from accident, potency from act, and habit from law. This skill supplies meaning and essence evidence; `audit-plan-descartes` decides whether a plan can be trusted.

## Read The Request Three Ways

Separate these, and keep all three when the user pivots, because the mismatch is itself evidence:

- `said`: the literal wording.
- `meant`: the likely goal, pressure, standard, or implied criterion.
- `happened`: what the repository, prior decisions, and accepted work actually show.

Inspect what is relevant before asking: `.agents/CONTEXT.md`, `.agents/CONTEXT-MAP.md` with its `.agents/contexts/<context>/` files, `.agents/adr/`, any root `CONTEXT.md` or `docs/adr/` as read-only evidence, and nearby code, tests, and diffs. Cross-check user claims against code when code can answer, and surface contradictions plainly.

## Asking Questions

Walk the design tree in dependency order, resolving first the branch whose answer changes later ones: purpose, audience, canonical terms, domain boundary, lifecycle, behavior, persistence, then documentation and handoff.

Ask one question at a time, with your recommended answer, and only when evidence cannot answer it. If evidence already answers, state the inferred answer and its source. Every question should be able to change scope, storage, implementation, or future behavior; curiosity questions cost the user attention. Ask more early, when project or user essence is thinly evidenced, and less as evidence accumulates. Use AskUserQuestion when the options are discrete.

Challenge vague, overloaded, or conflicting terms immediately, preferring the canonical language in `.agents/CONTEXT.md`. Test an unclear boundary with one concrete scenario. After an interruption, resume from the newest correction instead of restarting.

If the user rejects long question lists, answers several branches at once, or asks to stop choosing from lists, switch to decision-led mode: state the recommended direction in a sentence or two, name the single decision that would most change it, and ask only if evidence cannot answer.

If the wording is mild but the subtext is "be radical", "play", "break compatibility", or "start over", hand off to `earned-presence-kondo`, separating what may be destroyed from what must survive.

## Holding Meaning Open

Before fixing an interpretation, storing a learning, or handing off, check whether another meaning or path is still plausible. Keep real alternatives as `potency` until evidence, a user instruction, a project law, or repository reality chooses one. This is a mental check for normal tasks; write alternatives down only when they would change the next skill's work or become worth storing.

Treat accepted truth in two modes. While acting, planning, or implementing, use it solidly and do not re-litigate it unless a real conflict appears, since constant hedging stalls execution. While grilling, relearning, or auditing, reopen it and inspect what supports it, since memory otherwise turns dogmatic.

Before handing to a planning skill, check that the emerging direction preserves essence, respects project laws, ignores accidents, and keeps unresolved potencies out of the facts.

## Classifying What Was Learned

Classify each resolved point before storing or handing it off:

- `essence`: what must stay true for the project or goal to remain itself.
- `accident`: true in this case, but a local style or passing preference.
- `potency`: a direction with some evidence that does not yet govern.
- `act`: behavior that currently governs and is validated in use.
- `habit`: a repeated user tendency that guides expectations and stays defeasible.
- `law`: an explicit, authoritative rule.
- `prudential exception`: a scoped override where the normal rule would defeat the goal.

Promotion needs evidence: not accident to essence, potency to act, or habit to law on a single signal. Read [references/aquinas-essence-map.md](references/aquinas-essence-map.md) when storing or promoting a learning, resolving a conflict, repairing wrong learning, or using the finer distinctions it defines.

## Recording It

Write as little as possible, and create files lazily, only for something worth keeping beyond this response. During grilling, write only agent context and decision records, leaving source, tests, config, and other docs for the implementation that follows.

- Terms and stable context: `.agents/CONTEXT.md`.
- Decisions that are hard to reverse, surprising without context, and trade-off based: `.agents/adr/NNNN-slug.md`.
- Repeated or conflicting signals not ready for those files: `.agents/aquinas/essence-ledger.md`.
- User-level learning: the session's persistent memory directory, when the harness provides one. Propose a change to `~/.claude/CLAUDE.md` only for a stable cross-project rule the user approves, since that file loads in every project.

Most points need no file and belong in the response or handoff.

## Relearning

When the user says the skill learned wrong, acts from old memory, or ignores new corrections, restate the expected behavior, the actual behavior, and the suspected memory. Inspect the stored learning before asking, then ask one repair question with a recommended answer and propose one revision. Apply durable memory changes only after the user reviews them, because a wrong repair would persist across sessions. The failure types and revision actions are in the reference.

## Handoffs

Give the next skill what it must preserve, avoid, or treat as unresolved, with evidence paths, and leave out the rest.

- `audit-plan-descartes`: facts and constraints with direct support; unresolved assumptions and the evidence that would upgrade them; canonical terms; essence and project laws to preserve; accidents that should not become constraints; open potencies; places where the literal wording and intended essence diverge; non-goals and pause conditions.
- `pattern-code-wittgenstein`: a repository-native task summary, bounded context, canonical terms and avoided aliases, essence to preserve, accidental style that should not drive abstraction, and false-similarity risks from reused words.
- `earned-presence-kondo`: the literal rebuild language and inferred subtext; value that must survive; forms that deserve no default protection; safety constraints; and whether the user wants playful exploration, a bold rebuild, or actual destructive implementation.
- Review skills: the said, meant, and happened record, and whether the diff preserved the essence or only matched the surface wording.

## Output

In a direct session, lead with said, meant, and happened, then the question or recommended direction. Add only what applies: essence candidates, accidents, open potencies, documentation updates, and handoffs. The skill is finished when the next decision can be made from what is on the table, or the user has what they came to clarify.
