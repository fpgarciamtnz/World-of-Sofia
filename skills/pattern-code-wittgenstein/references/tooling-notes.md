# Tooling Notes

## Prototype choice

V2 chooses `ast-grep` as the first structural analyzer.

Reason:

- lightweight integration in a Node/TypeScript workflow
- good pattern-based matching for exported helpers and route/page script structure
- easier prototype path than a heavier semantic engine

## What it is used for

- verifying repeated script-level structure
- identifying route hooks, error handling, SEO patterns, exports, and test blocks
- validating that lexical candidates have some structural support

## What it is not yet used for

- full call-graph construction
- true semantic equivalence
- repository-wide type reasoning
- historical evidence from git

## Alternatives held for later

- `Semgrep` for richer rule packs
- `Tree-sitter` for lower-level custom extraction
- heavier semantic tooling if the prototype proves worth the extra complexity
