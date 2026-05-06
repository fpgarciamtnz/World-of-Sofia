# World of Sofia

World of Sofia is a `Nuxt + Cloudflare Workers` showroom for philosopher-derived skills. The repository is structured around one hard rule: skills do not mix. Every skill lives in its own folder with its own manifest, markdown, and references so it can be extracted and distributed elsewhere without untangling shared content.

## Repository layout

- `apps/showroom`: Nuxt frontend deployed to Cloudflare Workers.
- `packages/catalog`: catalog generation, validation, and isolation checks.
- `skills/<slug>`: one self-contained skill per folder.
- `templates/skill`: source template for new skills.

## Commands

```bash
npm install
npm run dev
npm run check
npm run test
npm run test:e2e
npm run deploy
```

## Cloudflare and GitHub

- The showroom is configured for Cloudflare Workers in `apps/showroom/wrangler.jsonc`.
- CI and deployment workflows live in `.github/workflows`.
- Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub Actions secrets before enabling deploys.

## Adding a skill

```bash
npm run new:skill -- "Stoic Triage" "Epictetus"
npm run validate:skills
npm run check:isolation
```

Each generated skill folder is expected to remain distributable on its own.
