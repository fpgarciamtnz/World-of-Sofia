---
name: audit-plan-descartes
description: "Audit a plan or prior work by separating facts, constraints, assumptions, risks, and verification evidence, giving every limit a source and checking every cut in scope. Use when planning needs an evidence or assumption check, when sources of truth disagree, when previous work must be verified, right after creating a drop, or alongside boil-the-ocean-magallanes on the way to a far destination."
---

# Audit Plan Descartes

Use this skill when planning work would benefit from explicit evidence handling, when multiple sources of truth are in play, or when previous code or work, such as a drop just created, needs to be verified.

The focus is on establishing what evidence and proof show that the material we are working on is relevant, matters, or is complete. The final goal is to avoid hallucinations and to have a solid foundation before starting the work.

## Workflow

1. Gather direct evidence before asking planning questions, since most questions can be answered by inspection.
2. Build the foundation ledger:
   - `Foundation-Fact`: directly observed, with its source, such as a path, command output, or document.
   - `Foundation-Constraint`: a requirement stated by the user, a project law, or the environment.
   - Unresolved assumption: anything inferred, along with the evidence that would upgrade it.
3. Keep inference out of the facts. A claim that sounds settled but has no source stays an assumption until it is checked.
4. Record every limit the plan keeps with its source, and check every cut that makes the plan smaller than the request, as described below.
5. If essence context is available, run the essence-fit check below.
6. When an unresolved assumption could change the plan, offer an assumption audit before finalizing, using AskUserQuestion with `Audit this plan` first and `Do not review the plan` second. When none could, finalize without asking. In plan mode, put the ledger in the plan.

An assumption audit tries to break the plan: check each assumption against evidence, name what would change if it were false, and adjust the plan or list what must be verified first.

## Limits And Cuts

Methodic doubt applies to what bounds a plan as much as to what it rests on. A limit is a premise: keep it and plan around it, but record it as a `Foundation-Constraint` with the source you checked, such as law, a license, security, safety, money nobody approved, or a boundary the user set.

A cut is different. "Too big for now", "phase 2", "out of scope", "start simpler", or a stack picked only because it is familiar each make the plan smaller than the request, and each is a claim. Without a source it is an unresolved assumption, usually an obstacle on one route or a habit about distance, so check it, and keep the cut part in the plan unless the evidence makes it a limit.

`boil-the-ocean-magallanes` takes a huge request at its full size and reaches the destination by whatever route stays inside the limits, and this skill audits its walls, its oracle, and its hand-back. On that path, sorting the walls is the assumption audit, so run it without asking first.

## Verifying A Drop

Right after a drop is created on Drop, or gets a new version, read it back and verify it, since reviewers open what Drop stored, not the draft it was made from. Drop's skills do not share one standard, so check the drop against the rules of the skill that made it. Reading it back is the audit here, so run it without asking first, and follow [references/drop-verification.md](references/drop-verification.md).

## Essence Fit

Run this check only when there is evidence to support it. Valid sources are explicit user correction, `.agents/CONTEXT.md`, `.agents/adr/`, `.agents/aquinas/essence-ledger.md`, repository facts, or a `grill-me-aquinas` handoff.

Check whether the plan preserves project essence, respects project laws, avoids treating accidents as constraints, and does not rely on an unresolved potency as if it were fact. An essence claim without such a source is an unresolved assumption. If the plan is factually sound but violates project essence, surface that as an essence-fit risk, and adjust the plan or mark the conflict explicitly.

Read [references/foundation-ledger.md](references/foundation-ledger.md) for prompts when a claim is hard to classify.

## Output

- Foundation ledger
- Data needed to upgrade unresolved assumptions
- Limits with their sources, and each cut with its evidence, when the plan is smaller than the request
- Essence fit, when essence context is available
- Assumption audit, when run
- Final plan, or for prior work such as a drop, a verdict on what is verified, what is not, and what to check or fix next

The audit is finished when every claim the plan depends on, including every limit it keeps and every cut it makes, is classified, and each assumption that could change it has been checked or named as open.
