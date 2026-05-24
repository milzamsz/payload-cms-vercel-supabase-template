# Agent Rules — Payload CMS + Vercel + Supabase Template

## Identity

This is a **B2B starter template** using Payload CMS, Next.js, and Supabase. The placeholder
brand is "Northstar IT Services". Do not introduce real business names, secrets, or client data.

## Architecture Overview

```
src/
├── app/(frontend)/     # Public Next.js pages (/, /about, /services, /pricing, /blog, /contact)
├── app/(payload)/      # Payload CMS admin panel routes (do not hand-edit importMap.js)
├── app/api/            # Custom API routes (contact form, 2FA endpoints)
├── blocks/             # Payload block definitions (CTA, Content, FAQ, Gallery, etc.)
├── collections/        # Payload collection configs (13 collections)
├── components/         # React components (auth, contact, layout, payload, seo, ui)
├── globals/            # Payload globals (Header, Footer, SiteSettings, EmailSettings)
├── hooks/              # Payload lifecycle hooks
├── lib/                # Frontend content + utilities
├── migrations/         # Database migration files (never delete)
├── plugins/            # Payload plugin configuration
├── types/              # TypeScript declaration files
├── utilities/          # Email, auth, URL helpers
├── payload.config.ts   # Main Payload configuration
└── payload-types.ts    # Auto-generated types (do not hand-edit)
```

## Core Principles

1. **Frontend-first workflow**: Pages render from `src/lib/it-services-content.ts`. Edit that
   file for copy/images/CTAs. CMS sync is a separate, deliberate step.
2. **Schema stability**: Do not rename collection slugs, modify access controls, or change
   hooks without explicit instruction.
3. **Regeneration required**: After touching `src/collections/`, `src/globals/`, `src/blocks/`,
   `src/fields/`, or admin component paths → run `npm run generate:types` and
   `npm run generate:importmap`.
4. **Never commit secrets**: No `.env`, API keys, tokens, or passwords in source.
5. **Conventional Commits**: `feat(scope):`, `fix(scope):`, `chore(scope):`, `refactor(scope):`.

## Collections

| Slug | Purpose |
|------|---------|
| `users` | Admin users with roles (admin, editor) |
| `media` | File uploads (Supabase S3 storage) |
| `pages` | CMS-managed pages with blocks |
| `posts` | Blog content |
| `services` | Service offerings |
| `portfolios` | Portfolio/project showcase |
| `testimonials` | Client testimonials |
| `team-members` | Team member profiles |
| `categories` | Post categories |
| `contact-submissions` | Contact form entries |
| `media-mentions` | Press/media mentions |
| `plants` | Agriculture compat (hidden from nav) |
| `plant-categories` | Agriculture compat (hidden from nav) |

## Globals

- `Header` — Site navigation
- `Footer` — Footer content and links
- `SiteSettings` — Brand name, tagline, contact info, social links
- `EmailSettings` — Resend email configuration

## Key Files to Know

| File | Role |
|------|------|
| `src/lib/it-services-content.ts` | All hardcoded frontend content |
| `src/lib/frontend-cms.ts` | Build-time CMS guard (prevents DB failures during static analysis) |
| `src/payload.config.ts` | Payload configuration entry point |
| `src/utilities/twoFactorAuth.ts` | TOTP + email 2FA logic |
| `src/utilities/resendEmailAdapter.ts` | Resend integration for Payload |
| `scripts/generate-payload-artifacts.ts` | Type/importmap generation script |
| `scripts/next-runner.mjs` | Dev/start wrapper for Next.js |

## When to Ask Before Acting

- Renaming collection slugs or deleting migrations
- Introducing new provider dependencies (different DB host, storage, email provider)
- Dropping the build-time CMS guard in `src/lib/frontend-cms.ts`
- Modifying the 2FA authentication flow
- Changing the Payload admin panel component structure
