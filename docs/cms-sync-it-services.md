# CMS Sync — IT Services Template

Use this document as the follow-up prompt after a frontend-first vibe-coding session. It instructs an agent (or a human operator) how to push the hardcoded starter content from `src/lib/it-services-content.ts` into the Payload CMS without touching access controls or hooks.

## Preconditions

- The Payload admin is reachable at `/admin`.
- A seed admin user exists (see `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).
- `DATABASE_URL` points at the database you intend to mutate.
- `src/lib/it-services-content.ts` contains the final approved copy and image URLs.
- `npm run migrate` has been run against the target database.

## Prompt for the sync agent

> You are an agent responsible for syncing `src/lib/it-services-content.ts` into Payload CMS. Do not modify access controls, hooks, collection slugs, or the admin import map. Do not add new collections. Publish all frontend-visible docs with `_status: published`. Idempotent upserts only — look up existing records by slug or `authorName`/`name` before creating new ones. Use the exported constants in the content file as the single source of truth.

## Sync targets

Each bullet maps directly to an exported constant in `src/lib/it-services-content.ts`.

### Globals

- **Header** (`header`)
  - `navLinks` ← `navLinks` (map `{ label, href }` → `{ label, url }`)
  - `ctaButton` ← the first `navLinks` entry with `isButton: true`
- **Footer** (`footer`)
  - `columns` ← `footerColumns` (map inner `{ label, href }` → `{ label, url }`)
  - `socialLinks` ← `socialLinks`
  - `copyrightText` ← `siteSettings.copyright`
- **Site Settings** (`siteSettings`)
  - `siteName`, `siteDescription`, `email`, `address`, `mapsEmbedUrl` from the `siteSettings` export
  - `socialMedia.linkedin` / `socialMedia.youtube` from `socialLinks`
- **Email Settings** (`emailSettings`)
  - `fromName` ← `siteSettings.siteName`
  - `adminRecipients[0].email` ← `siteSettings.email`
  - Leave `enabled` at `false` for the first sync; the operator will enable it manually after Resend domain verification.

### Collections

- **Pages** (`pages`) — upsert by `slug`:
  - `home`, `about`, `services`, `pricing`, `contact`, `privacy-policy`
  - For each, set `title`, `slug`, a `hero` group (`heading`, `subheading`), and `_status: published`.
- **Services** (`services`) — upsert by `slug` using entries from `services`:
  - Required: `name`, `slug`, `serviceCategory`, `shortDescription`, `displayOrder`, `_status: published`.
  - Map `service.slug` → `serviceCategory` enum: `managed-it`, `cloud`, `security`, `software`, `data`, `support`.
- **Posts** (`posts`) — upsert by `slug` using entries from `blogPosts`:
  - Convert `body` paragraphs into Lexical rich text with a leading excerpt paragraph and a single `h2` heading for the category.
  - `publishedAt` ← `post.date`, `_status: published`.
- **Categories** (`categories`) — upsert by slug using `blogCategories` (exclude `All`). Slug = lowercase kebab-case of the category name.
- **Testimonials** (`testimonials`) — upsert by `authorName` using `testimonials`:
  - `quote`, `authorName`, `authorRole` = `"${title}, ${company}"`, `displayOrder`, `_status: published`.
- **Team Members** (`teamMembers`) — upsert by `name` using `teamMembers`:
  - `name`, `role`, `displayOrder`, `_status: published`. Photo uploads are optional.
- **Portfolios** (`portfolios`) — upsert by `slug`, using the three sample case studies in `src/seed.ts` (or add your own). Required: `projectName`, `slug`, `category`, `_status: published`.

### Media

- Upload or replace placeholder images in the `media` collection. When you change an image URL in `src/lib/it-services-content.ts`, the frontend renders immediately; Payload-referenced media requires re-uploading and relinking in the corresponding collection.

## How to run the sync

The fastest route is the built-in seed script, which already implements idempotent upserts:

```bash
npm run seed
```

For a scripted agent sync, either:

1. Extend `src/seed.ts` with any content you need that is not already seeded, then re-run `npm run seed`, **or**
2. Write a one-off script under `scripts/` that imports `getPayload`, reads `src/lib/it-services-content.ts`, and applies the upserts above.

Avoid direct SQL writes — stay inside the Payload local API so hooks, versions, and access controls stay consistent.

## After the sync

- Visit `/admin` and spot-check each collection.
- Confirm `_status: published` on every public-facing doc.
- Run `npm run generate:types` and `npm run generate:importmap` **only if** you changed any schema (`src/collections/`, `src/globals/`, `src/blocks/`, `src/fields/`, or admin component paths).
- Run `npm run build` to confirm the build-time CMS guard still works end to end.
- Run `npm run test:e2e` if you have a browser available.

## What not to do

- Do not rename collection slugs (`pages`, `posts`, `services`, `portfolios`, `testimonials`, `teamMembers`, `media`, `contactSubmissions`, `plants`, `plant-categories`).
- Do not change access helpers under `src/access/`.
- Do not delete or rewrite existing migrations. If you must add new fields, create a new migration via `npm run migrate:create`.
- Do not commit secrets. Seed credentials live in env vars, not in checked-in scripts.
