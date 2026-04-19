# CMS Upload Checklist — IT Services Template

Run this after finishing a frontend vibe-coding session when you are ready to move the hardcoded template content into Payload CMS.

Admin panel: **http://localhost:3000/admin**
Default seed credentials: `admin@example.com` / `ChangeMe123!` — change them via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` before running `npm run seed`.

---

## 0. Vibe coding edit history

> **2026-04 — IT Services template adaptation.** The Kebun Kumara source was refreshed into this starter. All public frontend pages were adapted first from hardcoded content in `src/lib/it-services-content.ts`. CMS sync is a separate, documented step (see `docs/cms-sync-it-services.md`). Agriculture-specific collections (`plants`, `plant-categories`) were retained in the schema for compatibility but are not exposed in the starter's public navigation.

Append future edits to this section as you adapt the template for a specific client or case.

---

## 1. If schema changed

Only needed if you touched `src/collections/`, `src/globals/`, `src/blocks/`, `src/fields/`, or admin component paths:

```bash
npm run generate:types
npm run generate:importmap
```

If you added or changed SQL-backed fields:

```bash
npm run migrate:create   # authored migration
npm run migrate          # apply to current DATABASE_URL
```

Commit both `src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` with the schema change.

---

## 2. Media

**Collection → Media**

- [ ] Upload logo / brand assets.
- [ ] Upload hero image(s).
- [ ] Upload service card images (one per service).
- [ ] Upload team member photos.
- [ ] Upload portfolio case-study imagery.
- [ ] Upload blog post cover images.

External Unsplash URLs are fine for dev but should be replaced before production.

---

## 3. Services

**Collection → Services**

For each entry in `services` (see `src/lib/it-services-content.ts`):

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Card title on `/services`. |
| `slug` | yes | Must match the frontend anchor on `/services#...`. |
| `serviceCategory` | yes | `managed-it`, `cloud`, `security`, `software`, `data`, or `support`. |
| `shortDescription` | recommended | Shown on the card. |
| `coverImage` | recommended | Uploaded in step 2. |
| `displayOrder` | yes | Ascending order in lists. |
| `_status` | yes | `published`. |

---

## 4. Blog posts & categories

**Collection → Categories**

- [ ] Create a category for each non-`All` entry in `blogCategories`.

**Collection → Blog Posts**

For each entry in `blogPosts`:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `slug` | yes | Matches the `/blog/[slug]` route. |
| `excerpt` | recommended | Shown on listing cards. |
| `featuredImage` | recommended | Uploaded in step 2. |
| `content` | yes | Lexical rich text. The seed builds a leading paragraph + `h2` category + body paragraphs. |
| `publishedAt` | yes | ISO date. |
| `_status` | yes | `published`. |

---

## 5. Testimonials

**Collection → Testimonials**

For each entry in `testimonials`:

- [ ] `quote`
- [ ] `authorName`
- [ ] `authorRole` = `"<title>, <company>"`
- [ ] `displayOrder`
- [ ] `_status: published`

---

## 6. Team members

**Collection → Team Members**

For each entry in `teamMembers`:

- [ ] `name`
- [ ] `role`
- [ ] `photo` (optional but recommended)
- [ ] `displayOrder`
- [ ] `_status: published`

---

## 7. Portfolios

**Collection → Portfolios**

Seed ships three IT-flavored case studies (Atrium cloud migration, BluePeak managed IT, Helios Labs SOC 2). Replace them with real engagements once they exist:

- [ ] `projectName`, `slug`, `clientName`, `location`, `yearCompleted`
- [ ] `category` — one of `Cloud Migration`, `Security`, `Managed IT`, `Custom Software`, `Data & Automation`.
- [ ] `tagline`, `description` (Lexical), `coverImage`.
- [ ] `_status: published`.

---

## 8. Pages

**Collection → Pages**

Upsert each of the following page slugs with hero heading + subheading:

- [ ] `home`
- [ ] `about`
- [ ] `services`
- [ ] `pricing`
- [ ] `contact`
- [ ] `privacy-policy`

---

## 9. Globals

- [ ] **Header** — navigation links + CTA.
- [ ] **Footer** — columns, social links, copyright.
- [ ] **Site Settings** — site name, description, email, address, socials.
- [ ] **Email Settings** — from name, admin recipients. Leave `enabled=false` until Resend is verified.

---

## 10. Verification

- [ ] Visit `/` and confirm hero, services, testimonials render.
- [ ] Visit `/services`, `/pricing`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/legal/privacy-policy`.
- [ ] Submit the contact form and confirm a row in `ContactSubmissions`.
- [ ] Run `npm run build`.
- [ ] Optional: `npm run test:e2e`.
