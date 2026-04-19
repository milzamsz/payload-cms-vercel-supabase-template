import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolios" ADD COLUMN IF NOT EXISTS "category" varchar;`)
  await db.execute(sql`
   ALTER TABLE "portfolios" ADD COLUMN IF NOT EXISTS "area" varchar;`)
  await db.execute(sql`
   ALTER TABLE "_portfolios_v" ADD COLUMN IF NOT EXISTS "version_category" varchar;`)
  await db.execute(sql`
   ALTER TABLE "_portfolios_v" ADD COLUMN IF NOT EXISTS "version_area" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolios" DROP COLUMN IF EXISTS "category";`)
  await db.execute(sql`
   ALTER TABLE "portfolios" DROP COLUMN IF EXISTS "area";`)
  await db.execute(sql`
   ALTER TABLE "_portfolios_v" DROP COLUMN IF EXISTS "version_category";`)
  await db.execute(sql`
   ALTER TABLE "_portfolios_v" DROP COLUMN IF EXISTS "version_area";`)
}
