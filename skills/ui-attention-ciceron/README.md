# UI Attention Ciceron

Philosopher idea: Cicero's public persuasion becomes a UI habit: hierarchy, contrast, position, motion, and wording argue for what matters first.

Practical use: UI Attention Ciceron automatically reviews UI-changing work, ranks likely attention peaks from observable visual and DOM evidence, checks language fit, and recommends the smallest useful correction when attention misses the screen's goal.

## What it does

- Reviews every UI-changing task automatically before final completion, especially when Sofia coordinates a final rendered-product audit.
- Still supports direct reviews of live pages, local browser targets, screenshots, and UI mockups.
- Ranks likely attention peaks from observable visual and DOM evidence.
- Checks whether visible phrasing, CTA language, and emotional tone align with the screen objective.
- Confirms the intended UI effect before judging goal fit when the target is unclear.
- Compares the likely attention path against what the screen is supposed to make the user notice, understand, or do.
- Gives direct feedback, severity, and the smallest useful changes to align attention with intent.
- Routes missed attention goals back through Sofia for improvement.

## How the review builds trust

UI Attention Ciceron now uses a two-pass review:

- First, a System 1-style attention read identifies what is likely to pop out immediately.
- Then, a System 2-style evidence check verifies that first impression using visible UI signals, wording, and DOM evidence when available.
- When attention is contested, the skill uses an Attention Evidence Matrix to show why an element supports, competes with, or distracts from the screen goal.
- The matrix is not a mathematical proof or eye-tracking result. It is a transparency tool that makes the review easier to inspect and challenge.

## Sofia workflow

Before a UI change is closed, Sofia should automatically run UI Attention Ciceron against the rendered result when a rendered result is available.

No opt-in question is needed. UI Attention Ciceron should ask only for missing review inputs, such as the intended UI effect or a usable rendered artifact. Small distractions are reported as polish. A missed primary goal creates a Sofia handoff packet for improvement.

## Interference options

Choose the interference level per project or session:

- `Passive`: report findings only; never auto-route.
- `Advisory`: default. The audit runs automatically, small issues are optional polish, and missed primary goals route back through Sofia.
- `Strict`: major attention conflicts block final completion unless the user explicitly waives them.

Use `Advisory` unless the user asks for a harder or softer review posture.

## Distribution boundary

This folder must stay self-contained. Do not reference private files in another skill directory.

## Global use

This catalog skill can later be copied or installed into `C:\Users\garqu\.codex\skills\ui-attention-ciceron` because the instructions are contained inside this folder.
