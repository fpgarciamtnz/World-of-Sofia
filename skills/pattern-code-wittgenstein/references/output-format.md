# Output Format

Use this structure, omitting a section only when it has nothing to report.

## Task summary

Restate the requested work in repository-native language.

## Candidate code families

List the plausible families, named descriptively. For each one include:

- relevant files or symbols
- resemblance type
- strength: strong, moderate, weak, or superficial
- one-line reason

## Evidence of resemblance

List the concrete evidence: code locations, tests, collaborators, schemas or fixtures, and repeated call shapes. Flag any inference as inference.

## False-similarity risks

State what could make the match misleading, such as a naming collision, a different bounded context, different side effects, missing tests, or an interface mismatch.

## Recommendation

Choose exactly one of `reuse`, `extend`, `extract`, `copy carefully`, or `create new`, with a short paragraph explaining why.

## Implementation guidance

State what to preserve, what to vary, and what to avoid.

## Tests to mirror or add

Name the precedent tests to follow and the new assertions the differences require.

## Confidence and missing evidence

Return `high`, `medium`, or `low`. If confidence is not high, state the missing evidence that would change the recommendation.
