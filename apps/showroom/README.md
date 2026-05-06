# Showroom App

This Nuxt application renders the World of Sofia catalog and is deployed to Cloudflare Workers.

## Key constraints

- The app reads generated catalog data from `@world-of-sofia/catalog`.
- It does not read the repository filesystem at runtime.
- Every skill page is derived from a validated `skill.meta.json` manifest plus local markdown content.

