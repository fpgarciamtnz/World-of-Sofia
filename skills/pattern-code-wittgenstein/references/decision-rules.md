# Decision Rules

Use these rules after building the evidence ledger.

## `reuse`

Choose `reuse` when the candidate and the new task share the same bounded context, the same important invariants, and compatible tests or call-site expectations.

Strong signals:

- Same layer and same domain language
- Same collaborator shape
- Tests can be mirrored with only light adaptation
- No hidden divergence in side-effects or runtime constraints

## `extend`

Choose `extend` when the new task belongs to the same family but adds a clear variant, option, branch, or supported case to an existing stable pattern.

Strong signals:

- Existing abstraction is already intentional
- The new behavior fits the current interface
- The additional complexity stays local

## `extract`

Choose `extract` only when multiple concrete precedents already exist and they reveal a stable interface that would hide meaningful complexity behind a simpler module boundary.

Require all of these:

- At least two or three real precedents
- Stable repeated behavior, not just repeated names
- A clearer public interface after extraction

Do not extract just to remove superficial duplication.

## `copy carefully`

Choose `copy carefully` when an existing implementation is the best starting point, but shared abstraction would lock in unstable assumptions or mix contexts too early.

Strong signals:

- The precedent is informative
- Reuse pressure is real
- Shared abstraction still feels premature

## `create new`

Choose `create new` when the old family would hide a different bounded context, a different invariant set, or a new force that the existing pattern does not handle cleanly.

Strong signals:

- Same word, different meaning
- Same structure, different invariants
- Existing pattern would need awkward exceptions
- New work introduces a genuinely new shape

## Red Flags

- Name-only resemblance
- Missing tests
- Cross-context vocabulary collisions
- Shared code that would deepen coupling instead of hiding complexity
- Extraction motivated by tidiness rather than a stable interface
