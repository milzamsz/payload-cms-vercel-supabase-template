# AGENTS.md

Guidance for AI agents working in this starter template. Read this before editing.

## What this project is

A **starter template** built on Payload CMS 3.84, Next.js 16.2, React 19.2, Tailwind CSS 4.3, and Supabase (Postgres + Storage). Not a live business. Do not introduce client-specific brand names, real email addresses, real phone numbers, real domain names, or real logos. Generic placeholder values (`Northstar IT Services`, `hello@northstar.example.com`, `+1 (555) 010-4102`) are intentional.

Runtime: Node `>=24.14.1 <26`. TypeScript 6.0.

## Secrets hygiene

Never commit:

- `.env`, `.env.local`, `.env.*.local`, `.env.vercel.local`
- `.vercel/`, `.git/`, `.next/`, `node_modules/`, `test-results/`, `playwright-report/`
- Any API key, token, or password — even in examples.

Always commit:

- `.env.example`, `.env.vercel.example` with placeholder values only.

If you find a real secret in a file you are editing, remove it and warn the user.

## Frontend-first vibe-coding workflow

- Frontend pages render from `src/lib/it-services-content.ts` first. Edit that file when updating copy, images, or CTAs.
- **Do not** add Payload CMS fallbacks to a page just to move text into the CMS. That work is captured in `docs/cms-sync-it-services.md` and should be run as a separate, explicit sync step.
- **Do not** modify access controls, hooks, or collection slugs without a deliberate instruction. The template's Payload backend (`Pages`, `Posts`, `Services`, `Portfolios`, `Testimonials`, `TeamMembers`, `Media`, `ContactSubmissions`, `Users`, `Plants`, `PlantCategories`, globals: `Header`, `Footer`, `SiteSettings`, `EmailSettings`) must stay stable.
- Agriculture-specific collections (`plants`, `plant-categories`) are retained for compatibility. They should not appear in the public navigation or home page of the IT starter.

## Payload artifact rules

If you touch anything under `src/collections/`, `src/globals/`, `src/blocks/`, `src/fields/`, or the admin component paths in `payload.config.ts`, you must regenerate:

```bash
npm run generate:types
npm run generate:importmap
```

Commit both `src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` together with the schema change.

## Preferred file structure

- Frontend routes live under `src/app/(frontend)/`. The required public routes are `/`, `/about`, `/services`, `/pricing`, `/blog`, `/blog/[slug]`, `/contact`, `/legal/privacy-policy`, plus `/admin-login`.
- Payload routes live under `src/app/(payload)/` — do not edit the admin import map by hand.
- Reusable UI goes in `src/components/ui/`. Layout chrome lives in `src/components/layout/`.
- Hardcoded template content lives in `src/lib/it-services-content.ts`.
- Supabase / Resend / URL helpers live in `src/utilities/`.

## Visual direction

Neutral B2B: ink, white, slate, teal, amber, one warm accent. Avoid:

- Dark-blue / slate monotone dominance.
- Generic purple gradient hero clichés.
- Client-specific agriculture or food imagery.

Swap Unsplash placeholder URLs for real assets (hosted in Supabase Storage) before production.

## Testing

The Playwright 1.60 suite covers public routes, the admin login + 2FA shell, Payload REST API availability, and contact form submission. Run with `npm run test:e2e` against a running dev server. Prefer fixing regressions over adding broad skip lists.

## Commit style

Follow Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `chore(scope): ...`, `refactor(scope): ...`. Commit one logical change at a time.

## When in doubt

- Ask before renaming collection slugs, deleting migrations, or changing access helpers.
- Ask before introducing a new provider dependency (Postgres host, Storage host, email provider).
- Ask before dropping the Payload build-time CMS guard in `src/lib/frontend-cms.ts`.
