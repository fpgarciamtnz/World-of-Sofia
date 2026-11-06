---
name: communication-review-ciceron
description: "Review a message for intent, audience uptake, tone, emotional impact, clarity, and rewrite options. Use when communication may be misread or needs direct feedback."
---

# Communication Review Ciceron

Use this skill to review a message as a purposeful communicative act. The goal is to help the user express themselves more clearly, understand how their words may land, and improve the message without hiding necessary firmness.

Keep the review practical. Do not lecture about rhetoric unless the user asks. Do not claim certainty about private intent. Separate observed wording, inferred intent, likely audience uptake, and revision advice.

## Core Workflow

1. Identify the message and any stated context, audience, relationship, channel, or desired outcome.
2. Close-read the literal wording before interpreting intent.
3. Infer the dominant communicative act: inform, request, warn, apologize, align, negotiate, challenge, set a boundary, repair trust, de-escalate, or persuade.
4. Infer likely audience uptake from role, power distance, shared context, emotional stakes, register, and implied request.
5. Inspect emotional impact: what the speaker signals, what the receiver may feel, what face or status is threatened, and whether defensiveness, trust, urgency, shame, or clarity is likely.
6. Inspect rhetorical position: the role the speaker claims, such as peer, authority, ally, critic, expert, mediator, witness, or supplicant.
7. Flag tensions between declared goal, performed act, evidence, frame, tone, audience, and likely emotional cost.
8. Recommend the smallest effective reformulation: clarify the request, add grounds, change order, reduce needless face threat, repair framing, or make the intended act explicit.

Load [references/rhetorical-framework.md](references/rhetorical-framework.md) when the user asks for deeper reasoning, scoring, theory, or a more careful multi-pass review.
Load [references/output-format.md](references/output-format.md) when you need the standard report shape or examples.

## Plan Mode Behavior

When this skill runs in plan mode, confirm the intended meaning before drafting, because a rewrite built on the wrong intent wastes the review. Outside plan mode, review and rewrite directly.

In plan mode, build a fuller evidence ledger first, tying each important inference to exact wording and separating `observed wording`, `inference`, `confidence`, and `why it matters`. State the meaning you believe the user wants to communicate, or list the plausible readings with confidence if there are several, and ask them to confirm or correct it. Hold the `Better version` until they have.

Use this confirmation question shape in plan mode:

`I understand you want to mean: "<concise intended meaning>". Is that right, or should I change the intent before drafting?`

After the user confirms or corrects the intended meaning, draft the revised message from the confirmed intent and explain which wording problems the draft fixes.

## Review Rules

- Treat intention as an inference, not a fact. Name confidence when intent is ambiguous.
- Quote or paraphrase the exact wording that supports each important claim.
- Distinguish the speaker's likely goal from the message's likely effect.
- Do not optimize only for politeness. Preserve necessary boundaries, accountability, urgency, or refusal.
- Do not over-soften direct feedback. Be clear about what is confusing, loaded, evasive, vague, aggressive, or easy to misread.
- Do not moralize. Describe the communicative effect and how to improve it.
- Prefer one strong rewrite over many cosmetic variants. Add variants only when the user needs a firmer, warmer, shorter, or more formal option.
- If key context is missing, proceed with the best-supported reading and label the missing context that could change the review.

## Default Output

Use this structure unless the user asks for a different format:

1. `What you said` - the literal message and its surface meaning.
2. `What it is doing` - the likely speech act, intent, and confidence.
3. `What might be understood` - likely receiver interpretations, including unintended readings.
4. `Friction points` - ambiguity, contradiction, tone mismatch, evidence gaps, framing issues, or face threat.
5. `Straight feedback` - the direct communication problem to fix.
6. `Better version` - a revised message that preserves the user's goal while improving rhetorical fitness.

In Plan Mode, use the Plan Mode template in [references/output-format.md](references/output-format.md) instead of the default output, and pause before drafting.

## Scoring

Only score when the user asks, or when a compact score will make the feedback easier to act on. Use dimensions instead of a single mystical number:

- Purpose clarity
- Act fit
- Audience fit
- Evidence or grounding
- Emotional cost
- Ethical fit
- Style clarity

Explain any low score in one sentence tied to wording, not taste.
