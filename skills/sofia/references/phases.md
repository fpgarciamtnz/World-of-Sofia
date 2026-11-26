# Phases

Read the section for the phase the work is in. Each one names who leads and what each is asked in that phase, the gaps to look for, what to leave for later, and what closes the phase. The table at the end shows where common requests start.

## 1. Make it work (hacer que funcione)

Goal: one real case runs end to end, and something other than your own judgment says so. That something is the oracle: a test, a command, a page that loads, known-good output.

Leads:

- `grill-me-aquinas`: what "works" means here, and the essence the later phases must keep. Skip it when the goal and its done-condition are already plain.
- `boil-the-ocean-magallanes`: the destination, the limits, the oracle, and the route, when the work is large or the way is blocked. For a small task the oracle alone is enough.
- `audit-plan-descartes`: whether "it works" rests on the oracle or on assumptions, and whether each limit has a source. On a Magallanes voyage it already audits the voyage; on a small task, load it only when the claim rests on something unchecked.

Support: `synthesis-code-hegel` before writing into code where precedent matters; `banco-animaciones-aristoteles` when the thing is an animation.

Gaps to look for:

- No stated done-condition, or no oracle that tells working from not working.
- A "can't" or a "needs" with no source.
- Stubs, mocks, or hard-coded values on the main path that only look like it works.
- Only the happy path: the first real input that breaks it.
- A dependency, credential, service, or file that nobody checked exists.

Leave for later: tuning, cleanup, abstractions, and polish, since the first real run may throw them away. Note what you see for phases 2 and 3 instead of doing it.

Closes when the oracle passes on a real case, end to end, and no open assumption decides that it does. Hand on the oracle, the essence, and a list of the scaffolding left behind: temporary code, debug output, workarounds.

## 2. Make it efficient (mejorar)

Goal: the same result with less, such as less code, fewer steps, or less time or cost, keeping only what truly matters.

Leads:

- `earned-presence-kondo`: what earns its place and what goes, starting with the scaffolding from phase 1.
- `synthesis-code-hegel`: on the real code and diff, whether to reuse, merge, inline, or delete, and whether something that exists already does the job.
- `audit-plan-descartes`: that the behavior is preserved, and that every claim of faster, smaller, or cheaper has a number before and after.

What truly matters is the essence from phase 1. When there is none, settle it with Aquinas before cutting, since cuts made without it remove the wrong things.

Gaps to look for:

- Scaffolding left from phase 1.
- Two ways of doing one thing, or a helper that repeats one that exists.
- A layer, option, setting, or abstraction with one caller or none.
- Code kept "just in case" for a case nobody has.
- Slowness or cost asserted without a measurement.
- Behavior that no test or oracle guards: add the guard before cutting near it.

Leave for later: appearance, since polishing something that may be cut wastes the polish.

Closes when the phase 1 oracle still passes, each cut has its evidence, and each efficiency claim has its numbers. Hand on the oracle and the list of what was cut and why, so phase 3 does not bring it back.

## 3. Make it look right (cómo se ve)

Goal: organized, clear, and intuitive for whoever uses or reads it, whether a screen, a command's output, a document, a message, or the layout of the code.

Leads:

- `communication-review-ciceron`: on the rendered screen or the finished text, what draws attention first, what gets misread, and the smallest correction.
- `implicit-explicit-ortega`: what a reader without this context needs and is not told, and what the work conveys without meaning to.
- `earned-presence-kondo`: clutter and crowding, and the empty space worth keeping.
- `synthesis-code-hegel`: names and organization, when "organized" means the code.

Gaps to look for:

- What draws the eye first is not what matters most.
- One thing with several names, or one name for several things.
- Missing states: empty, loading, error, first use.
- Steps or terms the reader must already know.
- Inconsistency with the rest of the product or the codebase.
- New decoration that phase 2 would cut.

Closes when it has been reviewed on the real rendered thing or the real text, not imagined from the code, no high-severity finding is left, and the phase 1 oracle still passes.

## Moving between phases

The phases run in order because each one guards the next: the phase 1 oracle lets phase 2 cut without breaking anything, and the lean shape from phase 2 lets phase 3 polish without waste. When a change in phase 2 or 3 breaks the oracle, that part goes back to phase 1.

## Where common requests start

| Request | Starts at | Usual order |
| --- | --- | --- |
| A new feature, tool, or project | 1 | Aquinas if the goal is fuzzy, Magallanes if it is large, Descartes on arrival; then 2 and 3 |
| A bug | 1 | Reproduce it as the oracle; Hegel before touching shared code; Descartes when the cause is a guess |
| "It's slow", "too complicated", "too much" | 2 | Measure with Descartes, cut with Kondo, judge the diff with Hegel, run the oracle again |
| A refactor | 2 | Guard the behavior first, then Hegel on precedent, Kondo, and Hegel on the diff |
| A screen or flow that works but confuses | 3 | Ciceron on the current render, Kondo, the change, then Ciceron again |
| A radical rebuild | 1 | Kondo decides what survives, Aquinas the essence, Magallanes the route, Descartes the arrival |
| A message, document, or prompt | 1, then 3 | Aquinas on what it must say, Ortega on what it leaves unsaid, Ciceron on how it lands |
