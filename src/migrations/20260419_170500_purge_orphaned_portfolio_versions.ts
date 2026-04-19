import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "_portfolios_v_version_gallery"
    WHERE "_parent_id" IN (
      SELECT "id"
      FROM "_portfolios_v"
      WHERE "parent_id" IS NULL
    );
  `)

  await db.execute(sql`
    DELETE FROM "_portfolios_v_rels"
    WHERE "parent_id" IN (
      SELECT "id"
      FROM "_portfolios_v"
      WHERE "parent_id" IS NULL
    );
  `)

  await db.execute(sql`
    DELETE FROM "_portfolios_v"
    WHERE "parent_id" IS NULL;
  `)
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Irreversible cleanup migration.
}
