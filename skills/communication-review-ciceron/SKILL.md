---
name: communication-review-ciceron
description: "Review communication for rhetorical intent, implied meaning, audience uptake, tone, emotional impact, clarity, and reformulation. Use when Codex should analyze what a user message says, what it is doing, what might be understood by the receiver, where it creates friction or misreadings, and how to rewrite it with direct feedback."
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

When this skill is invoked while the active collaboration mode is Plan Mode, switch from immediate review-and-rewrite to an evidence-first confirmation gate.

In Plan Mode:

1. Keep normal-mode behavior unchanged for every non-Plan Mode invocation.
2. Produce a more thorough evidence ledger before interpreting the user's intended meaning.
3. Tie each important inference to exact wording from the user's message, such as a phrase, sentence, or stated context cue.
4. Separate `observed wording`, `inference`, `confidence`, and `why it matters`.
5. State the intended meaning you believe the user wants to communicate.
6. Ask the user to confirm, reject, or correct that intended meaning before drafting a better version.
7. Do not include `Better version` yet unless the user has already confirmed or corrected the intended meaning in the same interaction.
8. If there are multiple plausible intent chains, list them with confidence and ask the user which one is right before rewriting.

Use this confirmation question shape in Plan Mode:

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
