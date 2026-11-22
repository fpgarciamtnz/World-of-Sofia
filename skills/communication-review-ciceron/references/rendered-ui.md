# Rendered UI Review

Read this when the review target is a screen: a live page, a screenshot, or a mockup.

Judge where the screen is likely to pull attention, and whether that attention and its wording support what the user should understand or do. Attention is an evidence-backed inference, so keep what is visible, what is measured, what is inferred, and how confident you are separate. There is no eye-tracking here: prefer "the strongest observable peak is here, so I infer it draws first attention" over "users will look here".

## Intended Effect

Compare against what the screen is for:

- Target attention: what the user should notice first.
- Intended outcome: what they should understand, decide, or do next.
- Language objective: what the wording should make them feel or expect, such as focused, reassured, or motivated.

If this is stated, label it as the comparison target. If it is missing or ambiguous, ask: `I understand this screen is supposed to make the user notice "[target]", then understand or do "[outcome]", and feel or expect "[objective]". Is that right, or should I change it before reviewing?` Do not invent product goals; when you cannot ask, label the goal as inferred and lower your confidence.

## The Review

The method borrows Kahneman's two systems as a practical model, not as a psychological claim.

**First-glance read.** Before analyzing, name the first three likely attention peaks from immediate salience: scale, contrast, position, isolation, motion, imagery, novelty, or loaded wording.

**Evidence check.** Test each peak against what can be observed. A screenshot often suffices; measure through the DOM when a claim depends on it, such as computed contrast, sticky or fixed position, above-the-fold placement, or animation. Check density and competing CTAs. Check language too: for productivity goals wording should reduce noise and support momentum, for engagement goals it can be warmer and more curious, and for trust goals it should be clear, calm, and specific. If a target is visually quiet but semantically important, say so.

**Bias guard.** Ask whether you are anchoring on the first thing noticed, overvaluing polish, confirming the design intent too easily, or recommending louder emphasis where reducing a competitor would work better. If the first glance and the evidence disagree, lower confidence and explain why.

Make a high-confidence claim only when several signals converge and the intended effect is known. Use medium when signals are mixed or the evidence is screenshot-only, and low when the page state is incomplete, the viewport is unrepresentative, or the intended effect is unclear.

When peaks compete or the recommendation depends on the competition, show the reasoning in this matrix. It makes the judgment inspectable; it is not a score, so never sum it or present it as proof.

| Element | First-glance salience | Task relevance | Semantic force | Competition risk | Evidence | Confidence |
|---|---|---|---|---|---|---|
| [element] | Low/Medium/High | Low/Medium/High | Low/Medium/High | Low/Medium/High | [observable signals] | Low/Medium/High |

## Severity

- `Polish`: a minor distraction; the primary focus and outcome are still clear. Non-blocking.
- `Concern`: attention conflict exists, but the primary goal is recoverable. Recommend a small change.
- `Goal miss`: the intended action or focus is not among the top peaks, or stronger peaks pull toward a different goal.

Interference defaults to `Advisory`, which reports polish as optional and treats a goal miss as a fix the work still needs. Apply `Passive` (report only) or `Strict` (major conflicts block completion until fixed or waived) if the user or project chooses one.

## Fixing

Recommend the smallest change that aligns attention with intent, naming the visual problem before the fix, and preserve the user's intended effect unless the evidence shows the page does something else. Do not implement fixes unless the user has moved from review into implementation.

Before making the primary element louder, check whether demoting, grouping, delaying, or removing a competitor would work better, since a louder fix adds weight to a screen that is already crowded. Keep accessibility affordances, important warnings, legal or compliance content, trust information for risky actions, and recovery paths, since these can look like clutter while still earning their place.

Do not claim eye-tracking certainty, conversion impact, or accessibility compliance unless directly tested, or state user emotion as fact.

## Output

Lead with the verdict, then cover: what you see; the intended effect; the attention ranking with evidence and confidence; the likely attention path; language fit and goal fit; severity; and the smallest useful changes. Add the matrix and the bias check when they changed the judgment.

For a `Goal miss`, also say where the fix starts: the product location (URL or page, viewport region, element), the likely code location if you can find it, and the recommended fix direction. After a fix, review the rendered result again. The review is finished when the severity and the next action are clear.
