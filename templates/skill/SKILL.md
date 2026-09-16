---
name: __SLUG__
description: "__SUMMARY__"
---

# __TITLE__

Describe when this skill should be invoked and the outcome it should produce.

Keep this description short and trigger-specific. Put detailed procedures, examples, and optional references in supporting files so they are loaded only when needed.

## Degree Of Freedom

Set this skill to one of `conservative`, `exploratory`, or `bold-by-default`.

- `conservative`: preserve existing behavior and public contracts unless the user explicitly asks to change them.
- `exploratory`: surface viable alternatives, challenge accidental constraints, and test edge cases before narrowing.
- `bold-by-default`: prefer the clearest final design over compatibility inertia when the project is experimental, pre-1.0, or explicitly open to redesign.

State what the selected degree permits and what still requires a pause.

## Completion

Define the concrete outcome that means this skill is finished. Continue through applicable implementation, inspection, and targeted validation rather than stopping after a first draft; pause only at the decision boundary stated above.
