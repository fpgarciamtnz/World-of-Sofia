# ADR 0010: Sofia coordinates by phase

## Status

Accepted, 2026-11-26. Extends ADR 0009.

## Context

Claude Code picks a skill from its description, but not where the work stands. On 2026-11-26 the user asked Sofia to tell which part of the process the work is in and to optimize for it, in three phases: make it work, putting Magallanes, Aquinas, and Descartes first to get something running; then make it efficient, cutting what is left over and keeping what truly matters; then make it look right, organized and intuitive. They did not know how to coordinate each skill's strengths, the order for each case, or the gaps to look for, and asked for that to be worked out.

## Decision

- Sofia tells the phase from the evidence as well as the request: phase 1 until an oracle confirms that a real case works end to end, phase 2 while the request is about the same result with less, and phase 3 once it works and is lean and the request is about order and clarity. When the user names a phase, Sofia takes it.
- The phases run in order, because each one guards the next: the phase 1 oracle lets phase 2 cut without breaking anything, and the lean shape from phase 2 lets phase 3 polish without waste. A change that breaks the oracle sends that part back to phase 1.
- Each phase has leads, the question each lead is asked in that phase, gaps to look for, what to leave for later, and a condition that closes it, in `skills/sofia/references/phases.md`, with a table of where common requests start. Leads: Aquinas, Magallanes, and Descartes for phase 1, as the user asked; Kondo, Hegel, and Descartes for phase 2; Ciceron, Ortega, and Kondo for phase 3.
- Descartes appears in two phases with different questions: in phase 1, whether "it works" rests on the oracle; in phase 2, whether the behavior is preserved and each efficiency claim has numbers.
- When the request is for a later phase and an earlier one is not met, Sofia says so, and closes the gap first only when it blocks the asked-for work.
- Sofia finishes the phase the request asks for and goes on only when the user asked for the whole way, since deciding when something is good enough to improve is the user's. It ends by naming the phase reached and the gaps left for the next.
- The phases live only in Sofia, as ADR 0009 keeps coordination there. The specialists do not learn about phases.

## Consequences

- Sofia's description names the phases, so it also triggers when a request is about where the work stands.
- No skill measures performance: in phase 2, Descartes checks that a speed or cost claim has numbers, but nothing owns how to measure. No skill designs a visual style either: Ciceron reviews attention and Kondo clutter. These are the gaps in the family that the phases make visible.
