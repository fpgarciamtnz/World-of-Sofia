# ADR 0008: Keep Banco Animaciones Aristoteles

## Status

Accepted, 2026-11-22. Adds a ninth skill to the eight left by ADR 0006.

## Context

`banco-animaciones-aristoteles` was built on 2026-11-09 and stayed on a local branch, so it never reached `main`, and ADR 0004 cut the family to seven skills without seeing it. On 2026-11-22 the user asked to keep every skill when this repository started over from a clean copy. Its history is on the `test/onmax-routing` branch of [World-of-Sofia-viejo](https://github.com/fpgarciamtnz/World-of-Sofia-viejo).

## Decision

- Add `banco-animaciones-aristoteles`: 703 animation prompts from [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT), each credited to its author, classed by Aristotle's questions of what a thing is, what it is about, how it looks, what it is made with, and what state it is in, with a search script and a test.
- It works alone and names no other skill, as ADR 0004 asks of every skill.
- Its `installCommand` names `npx skills add`, as ADR 0007 set for the others.

## Consequences

- Nine skills remain.
- At about 3 MB it is the largest skill, since it carries the whole bank. It tells Claude to search the bank with its script instead of reading the folders.
- The prompts belong to their authors. If one asks for a prompt to be removed, delete its file and run `node scripts/indexar.mjs`, as `banco/ORIGEN.md` says.
