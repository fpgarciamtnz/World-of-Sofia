# ADR 0001: World of Sofia foundation

## Status

Accepted

## Decision

Use an `npm` workspaces monorepo with:

- `apps/showroom` for the Nuxt frontend
- `packages/catalog` for validation and generated catalog data
- `skills/<slug>` for self-contained skill units

Deploy the frontend to Cloudflare Workers with Wrangler and keep skill content in-repo.

## Rationale

- The app needs a showroom surface, not a CMS first.
- Cloudflare Workers keeps the deployment path compatible with future dynamic features.
- Repo-managed content is simpler to review and validate.
- Strict per-skill folders make extraction and later redistribution practical.

## Consequences

- The app consumes generated static catalog data instead of reading the filesystem at runtime.
- Cross-skill file references are treated as build failures.
- Branch protection and Cloudflare secrets still require one-time GitHub repository setup.

