# UI Attention Ciceron

Attention is treated as a public argument made by the screen: what is largest, loudest, most isolated, most central, or most active claims the user's eye first.

## What it does

- Reviews UI-changing work before final completion, especially when Sofia coordinates a final rendered-product audit.
- Still supports direct reviews of live pages, local browser targets, screenshots, and UI mockups.
- Ranks likely attention peaks from observable visual and DOM evidence.
- Checks whether visible phrasing, CTA language, and emotional tone align with the screen objective.
- Confirms the intended UI effect before judging goal fit when the target is unclear.
- Compares the likely attention path against what the screen is supposed to make the user notice, understand, or do.
- Gives direct feedback, severity, and the smallest useful changes to align attention with intent.
- Routes missed attention goals back through Sofia for improvement.

## Sofia workflow

Before a UI change is closed, Sofia should ask:

`Do you want UI Attention Ciceron to review the final product before we close this UI change?`

If accepted, UI Attention Ciceron reviews the rendered result with browser or screenshot evidence. Small distractions are reported as polish. A missed primary goal creates a Sofia handoff packet for improvement.

## Interference options

Choose the interference level per project or session:

- `Passive`: report findings only; never auto-route.
- `Advisory`: default. Small issues are optional polish; missed primary goals route back through Sofia.
- `Strict`: major attention conflicts block final completion unless the user explicitly waives them.

Use `Advisory` unless the user asks for a harder or softer review posture.

## Distribution boundary

This folder must stay self-contained. Do not reference private files in another skill directory.

## Global use

This catalog skill can later be copied or installed into `C:\Users\garqu\.codex\skills\ui-attention-ciceron` because the instructions are contained inside this folder.
