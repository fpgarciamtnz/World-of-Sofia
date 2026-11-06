# UI Attention Ciceron

Philosopher idea: Cicero's public persuasion becomes a UI habit: hierarchy, contrast, position, motion, and wording argue for what matters first.

Practical use: Use at final validation of UI-changing work, or to inspect a live page, screenshot, or mockup. It ranks likely attention peaks from observable visual and DOM evidence, checks language fit, and recommends the smallest correction when attention misses the screen's goal.

## What it does

- Confirms the intended UI effect before judging goal fit when the target is unclear.
- Reviews in two passes, using Kahneman's System 1 and System 2 as a practical model: a first-glance read of what pops out, then an evidence check of that impression.
- Shows contested judgments in an Attention Evidence Matrix, a transparency tool rather than a score or an eye-tracking result.
- Classifies findings as polish, concern, or goal miss, and routes goal misses back through Sofia for improvement.
- Reviews rendered screens only, and offers the review rather than opening a browser when none was requested.

## Interference options

Choose the level per project or session:

- `Passive`: report findings only; never auto-route.
- `Advisory`: default. Small issues are optional polish, and missed primary goals route back through Sofia.
- `Strict`: major attention conflicts block final completion unless the user explicitly waives them.

## Distribution boundary

This folder must stay self-contained. Do not reference private files in another skill directory.
