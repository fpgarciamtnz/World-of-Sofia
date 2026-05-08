# Output Format

Use this exact structure for the final answer.

## Task summary

Restate the requested work in repository-native language.

## Candidate code families

List two to five plausible families. Name them descriptively, not dogmatically.

For each family include:

- relevant files or symbols
- resemblance type
- strength: strong, moderate, weak, or superficial
- one-line reason

## Evidence of resemblance

List the concrete supporting evidence:

- code locations
- tests
- collaborators
- schemas or fixtures
- repeated call shapes

Flag any inference as inference.

## False-similarity risks

State what could make the match misleading:

- naming collision
- different bounded context
- different side-effects
- missing tests
- interface mismatch

## Recommendation

Choose exactly one:

- `reuse`
- `extend`
- `extract`
- `copy carefully`
- `create new`

Give one short paragraph explaining why.

## Implementation guidance

State what to preserve, what to vary, and what to avoid.

## Tests to mirror or add

Call out the precedent tests to follow and the new assertions required by the differences.

## Confidence and missing evidence

Return `high`, `medium`, or `low`.

If confidence is not high, state the missing evidence that would change the recommendation.
