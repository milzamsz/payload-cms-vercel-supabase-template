# Payload CMS · Vercel · Supabase Starter Template

A neutral B2B starter template for IT service businesses. Ships as **Northstar IT Services** — a reusable placeholder brand — with a full stack of Payload CMS 3, Next.js 16, Supabase Postgres, Supabase Storage (S3-compatible), Resend email, 2FA, and Playwright e2e tests. Frontend pages render from hardcoded template content first so you can vibe-code your copy, then sync into Payload CMS when you are ready.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js `16.2.4` (App Router, RSC) |
| CMS | Payload `3.83.0` (Postgres, Lexical rich text) |
| Database | Supabase Postgres via `@payloadcms/db-postgres` |
| Storage | Supabase Storage through `@payloadcms/storage-s3` |
| Email | Resend + Payload email adapter |
| UI | React `19.2.5`, Tailwind `4`, `@radix-ui/react-slot`, `lucide-react` |
| Auth | Payload users + TOTP/email 2FA in `/admin-login` |
| Tests | Playwright `1.59` (public routes, admin, CMS API, contact form) |
| Runtime | Node `>=24.14.1 <25` |

## Quick start

```bash
cp .env.example .env.local
npm install
npm run generate:types
npm run generate:importmap
npm run dev           # http://localhost:3000
```

Seed once the database and storage are configured:

```bash
npm run seed
```

Visit `http://localhost:3000/admin-login` and sign in with the credentials you set via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (defaults `admin@example.com` / `ChangeMe123!`).

## Public routes

- `/` — Home
- `/about`
- `/services`
- `/pricing`
- `/blog`, `/blog/[slug]`
- `/contact`
- `/legal/privacy-policy`
- `/admin-login`, `/admin`

Retained but hidden from navigation: `plants` and `plant-categories` collections (kept for schema compatibility and easy repurposing).

## Environment variables

All public-facing env vars live in `.env.example` and `.env.vercel.example`. Never commit real secrets.

Required for dev:

- `DATABASE_URL` — Supabase direct connection (port 5432) for local and migrations.
- `PAYLOAD_SECRET` — 32+ char random string.
- `NEXT_PUBLIC_SERVER_URL` — e.g. `http://localhost:3000`.
- `NEXT_PUBLIC_SUPABASE_URL`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION`.
- `RESEND_API_KEY` — only required when Resend email delivery is enabled in the CMS.

Optional:

- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` — one-time seed credentials.
- `PAYLOAD_ALLOWED_ORIGINS` — comma-separated extra origins for authenticated requests.

## Supabase setup

1. Create a Supabase project.
2. Under **Settings → Database**, copy the session-mode connection string (port 5432) to `DATABASE_URL` for local dev. Use the **pooler** (port 6543) for Vercel production.
3. Under **Storage**, create a bucket matching `S3_BUCKET`.
4. Under **Settings → Storage → S3 Connection**, copy the access key, secret key, endpoint, and region.
5. Run `npm run migrate` once locally to apply the Payload schema.

## Resend setup

1. Create a Resend API key.
2. Verify the sending domain you intend to use.
3. Add `RESEND_API_KEY` to your env.
4. Enable email delivery in **CMS → Globals → Email Settings**. Set `From Name`, `From Email`, and admin recipients.

## Deploying to Vercel

See [`DEPLOYMENT.md`](./DEPLOYMENT.md). TL;DR:

1. Import this repo into Vercel.
2. Set the env vars from `.env.vercel.example`.
3. Use the Supabase pooler connection string (port 6543) as `DATABASE_URL`.
4. Deploy.

## Frontend-first vibe coding workflow

1. Edit hardcoded starter content in `src/lib/it-services-content.ts`.
2. Pages render from this file immediately — no CMS required for dev.
3. When copy is approved, follow [`docs/cms-sync-it-services.md`](./docs/cms-sync-it-services.md) to sync the same shapes into Payload.
4. Re-run `npm run generate:types` and `npm run generate:importmap` only if you changed schemas or admin component config.

## Customization checklist

- [ ] Replace `siteSettings` in `src/lib/it-services-content.ts` with your brand.
- [ ] Update `hero`, `services`, `pricingTiers`, `testimonials`, `teamMembers`, `blogPosts`, `faqs`.
- [ ] Replace the SVG star mark in `src/components/layout/Navbar.tsx`, `Footer.tsx`, and `AdminLogo.tsx`.
- [ ] Swap the image URLs for your own (hosted on Supabase Storage or an Unsplash-compatible CDN).
- [ ] Update `src/app/(frontend)/legal/privacy-policy/page.tsx` with your legal copy.
- [ ] Update `src/components/seo/JsonLdScript.tsx` with the correct organization schema.
- [ ] Update `src/app/(frontend)/layout.tsx` metadata.
- [ ] Update defaults on Payload globals: `src/globals/SiteSettings.ts`, `src/globals/EmailSettings.ts`, `src/globals/Footer.ts`.
- [ ] Replace `public/images/**` logos with your brand assets.
- [ ] Regenerate Payload artifacts: `npm run generate:types && npm run generate:importmap`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start dev server. |
| `npm run build` | Production build (build-time CMS guard avoids DB failures during static analysis). |
| `npm run start` | Run the production build. |
| `npm run lint` | ESLint. |
| `npm run seed` | Seed the template sample content. |
| `npm run migrate:create` | Create a new Payload DB migration. |
| `npm run migrate` | Apply pending DB migrations. |
| `npm run generate:types` | Regenerate `src/payload-types.ts`. |
| `npm run generate:importmap` | Regenerate `src/app/(payload)/admin/importMap.js`. |
| `npm run test:e2e` | Run Playwright e2e tests. |

## License

MIT. Logos and sample content are placeholders — replace before shipping.
