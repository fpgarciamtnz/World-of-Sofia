---
name: __SLUG__
description: "__SUMMARY__"
---

# __TITLE__

Replace the description above with one short sentence on what this skill does and one on when to use it. It is always loaded, so name the trigger precisely and keep procedures out of it.

State the goal, the constraints that matter, and why they matter. Leave out what Claude would do anyway, and put detail that only some runs need in `references/`, saying when to read each file.

## Degree Of Freedom

Set this skill to one of `conservative`, `exploratory`, or `bold-by-default`.

- `conservative`: preserve existing behavior and public contracts unless the user explicitly asks to change them.
- `exploratory`: surface viable alternatives, challenge accidental constraints, and test edge cases before narrowing.
- `bold-by-default`: prefer the clearest final design over compatibility inertia when the project is experimental, pre-1.0, or explicitly open to redesign.

State what the selected degree permits and what still requires a pause.

## Completion

Define the concrete outcome that means this skill is finished. Continue through applicable implementation, inspection, and targeted validation rather than stopping after a first draft; pause only at the decision boundary stated above.
