# Workflow Patterns

## Development Workflow

### Starting development
```bash
npm run dev           # http://localhost:3000
```

### After schema changes (collections/globals/blocks/fields)
```bash
npm run generate:types
npm run generate:importmap
```

### Creating a new migration
```bash
npm run migrate:create
```

### Running migrations
```bash
npm run migrate
```

### Running tests
```bash
npm run test:e2e      # Requires dev server running
npm run test:e2e:ui   # Interactive Playwright UI
```

## Content Editing Workflow

1. Edit `src/lib/it-services-content.ts` for frontend content changes
2. Pages immediately reflect changes (no CMS dependency for dev)
3. When ready for CMS sync, follow `docs/cms-sync-it-services.md`

## Adding a New Page

1. Create route file at `src/app/(frontend)/<route>/page.tsx`
2. Add content structure to `src/lib/it-services-content.ts`
3. Update navigation in `src/components/layout/Navbar.tsx`
4. Update sitemap in `src/app/sitemap.ts`

## Adding a New Collection

1. Create collection config in `src/collections/<Name>.ts`
2. Register in `src/payload.config.ts`
3. Run `npm run generate:types`
4. Run `npm run generate:importmap`
5. Run `npm run migrate:create` to generate migration
6. Run `npm run migrate` to apply

## Troubleshooting

### Build fails without DATABASE_URL
The `src/lib/frontend-cms.ts` guard handles this gracefully during static analysis.
Do not remove it.

### Type errors after schema change
Run `npm run generate:types` to regenerate `src/payload-types.ts`.

### Import map out of date
Run `npm run generate:importmap` after adding/removing admin components.

### Peer dependency conflicts on install
Use `npm install --legacy-peer-deps` — Payload packages have strict peer deps.
