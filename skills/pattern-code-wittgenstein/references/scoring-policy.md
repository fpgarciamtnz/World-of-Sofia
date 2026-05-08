# Scoring Policy

The prototype uses weighted evidence, not a black-box verdict.

## Evidence weights

- `structural`: 4
- `behavioral`: 3
- `domain`: 3
- `semantic`: 2
- `naming`: 1
- `historical`: 1

## Confidence handling

- observed evidence counts at full weight
- inferred evidence is discounted
- bounded-context fit multiplies the total score:
  - `same`: strong boost
  - `adjacent`: neutral
  - `distant`: penalty

## Prototype decision rules

- Prefer `extend` when strong route/helper or component/helper families converge in the same or adjacent context.
- Prefer `copy carefully` when one nearby precedent is useful but the target is a variant, teaser, or adaptation rather than a stable family extension.
- Prefer `create new` when the domain is novel or when only naming-heavy, cross-context matches appear.
- Prefer `reuse` only when a strong same-context precedent already exists.
- Prefer `extract` only when repeated helper structure is visible and the task explicitly pressures toward generalization.

## Important limitation

The prototype still reasons with heuristics. The score is meant to make those heuristics inspectable, not to claim final correctness.
