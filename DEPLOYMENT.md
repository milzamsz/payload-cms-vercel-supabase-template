# Deployment Guide

This template is designed to deploy on Vercel with Supabase as the Postgres + Storage backend and Resend for email delivery. All instructions use placeholder values — fill in your own project identifiers before shipping.

## 1. Provision Supabase

1. Create a Supabase project.
2. Under **Settings → Database → Connection string**, grab two values:
   - **Session pooler (port 5432)** — use for local dev, migrations, and seed. Example:
     ```
     postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
     ```
   - **Transaction pooler (port 6543)** — use for Vercel production. Example:
     ```
     postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
3. Under **Storage**, create a bucket (default name in the template is `payload-media`). Mark it public if you want Payload-generated URLs to resolve without signed URLs.
4. Under **Settings → Storage → S3 Connection**, copy:
   - `S3_ACCESS_KEY_ID`
   - `S3_SECRET_ACCESS_KEY`
   - `S3_ENDPOINT` (e.g. `https://[PROJECT-REF].storage.supabase.co/storage/v1/s3`)
   - `S3_REGION` (e.g. `ap-southeast-1`)

## 2. Provision Resend

1. Create a Resend account and API key.
2. Verify the sending domain.
3. Save `RESEND_API_KEY` for your environment.

## 3. Set environment variables

Copy `.env.vercel.example` and fill in values in **Vercel → Project → Settings → Environment Variables**.

Required variables:

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | Supabase transaction pooler (port 6543). |
| `PAYLOAD_SECRET` | 32+ character random string. Generate via `openssl rand -hex 32`. |
| `NEXT_PUBLIC_SERVER_URL` | Full URL of the deployment, e.g. `https://your-project.vercel.app`. |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[PROJECT-REF].supabase.co`. |
| `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION` | Supabase Storage S3 credentials. |
| `RESEND_API_KEY` | Only required if email delivery is enabled in the CMS. |
| `APP_NAME` | Display name shown in fallbacks and admin copy. Default: `Northstar IT Services`. |
| `PAYLOAD_ALLOWED_ORIGINS` | Optional. Comma-separated extra origins for authenticated requests. |

Optional one-time seed credentials:

| Variable | Default |
| --- | --- |
| `SEED_ADMIN_EMAIL` | `admin@example.com` |
| `SEED_ADMIN_PASSWORD` | `ChangeMe123!` |

> Change seed credentials before running `npm run seed` against any shared database.

## 4. Deploy

1. Import the repository into Vercel.
2. Framework preset: **Next.js**. No build overrides are required — `vercel.json` pins the Payload `[...slug]` API route to a 60-second max duration.
3. Deploy.
4. After the first successful deploy, run migrations once against the Vercel database.
   - Locally, point `DATABASE_URL` at the Supabase **session pooler** (port 5432) and run `npm run migrate`.
5. Optionally run `npm run seed` locally pointed at the production DB to load sample content. Skip this for live customer databases.

## 5. Post-deploy checks

- Visit `/` — the marketing site should render with template content.
- Visit `/admin-login` and sign in with the seeded admin.
- Submit a test message through `/contact`. Verify a row lands in `ContactSubmissions`.
- Enable email delivery in **Globals → Email Settings** and send another test.
- Confirm Supabase Storage receives uploads when you upload media in the admin.

## 6. Rotating credentials

- Rotate `SEED_ADMIN_PASSWORD` after the first admin login by creating a fresh admin user and deleting the seed user.
- Rotate Supabase S3 keys from the Supabase dashboard.
- Rotate Resend API keys from the Resend dashboard.
- Update Vercel env vars and trigger a redeploy.

## Troubleshooting

- **`SSL connection required`** — ensure `DATABASE_URL` includes `?sslmode=require` (session pooler) or that you are using the transaction pooler (which implies TLS).
- **`Payload failed to initialize at build`** — the build-time CMS guard in `src/lib/frontend-cms.ts` intentionally skips CMS queries during `phase-production-build`. If you disable it, make sure `DATABASE_URL` is set at build time.
- **Storage URLs 404** — confirm the Supabase Storage bucket is public, or adjust `generateFileURL` in `payload.config.ts` to use signed URLs.
- **Emails not sending** — confirm Resend domain verification, `RESEND_API_KEY`, and that **Email Settings → Enable Email Delivery** is checked in the admin.
