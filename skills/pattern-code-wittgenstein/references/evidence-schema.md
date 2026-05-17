# Evidence Schema

V2 uses three internal records.

## `PatternCandidate`

Represents one candidate precedent family.

Fields:

- `id`: stable identifier for the candidate, currently the relative file path
- `familyLabel`: human-readable family label such as `skill validation helper family`
- `target.path`: file path
- `target.symbol`: first exported symbol when available
- `boundedContext`: repo-local context label
- `languageGame`: route page, helper module, ui component, test suite, and so on
- `contextFit`: `same`, `adjacent`, or `distant`
- `relatedTests`: nearby tests worth mirroring
- `collaborators`: imported modules or repeated collaborators
- `evidenceItems`: explicit evidence records
- `scoreBreakdown`: weighted scores by evidence type plus total

## `EvidenceItem`

Represents one observed or inferred signal.

Fields:

- `type`: `structural`, `behavioral`, `semantic`, `naming`, `domain`, or `historical`
- `source.path`
- `source.line`
- `observed`: `true` when sourced directly from code, `false` when inferred from context/pathing
- `rationale`: short explanation of why this signal matters
- `confidence`: `0.0` to `1.0`
- `excerpt`: short source snippet or label

The core rule is simple:

- direct AST or source hits are `observed`
- context-fit and family-inference signals are `inferred`

## `DecisionRecord`

Represents the final recommendation.

Fields:

- `recommendation`
- `rationale`
- `competingRecommendations`
- `falseSimilarityRisks`
- `missingEvidence`
- `confidence`

V2 should never emit a recommendation without explicit evidence items behind it.
