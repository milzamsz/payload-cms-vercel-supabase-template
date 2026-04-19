import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_two_factor_method" AS ENUM('email', 'authenticator');
  CREATE TABLE "users_two_factor_backup_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hash" varchar
  );
  
  ALTER TABLE "users" ADD COLUMN "two_factor_enabled" boolean DEFAULT false;
  ALTER TABLE "users" ADD COLUMN "two_factor_method" "enum_users_two_factor_method";
  ALTER TABLE "users" ADD COLUMN "two_factor_secret" varchar;
  ALTER TABLE "users" ADD COLUMN "two_factor_email_code" varchar;
  ALTER TABLE "users" ADD COLUMN "two_factor_email_code_expires_at" timestamp(3) with time zone;
  ALTER TABLE "users_two_factor_backup_codes" ADD CONSTRAINT "users_two_factor_backup_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_two_factor_backup_codes_order_idx" ON "users_two_factor_backup_codes" USING btree ("_order");
  CREATE INDEX "users_two_factor_backup_codes_parent_id_idx" ON "users_two_factor_backup_codes" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_two_factor_backup_codes" CASCADE;
  ALTER TABLE "users" DROP COLUMN "two_factor_enabled";
  ALTER TABLE "users" DROP COLUMN "two_factor_method";
  ALTER TABLE "users" DROP COLUMN "two_factor_secret";
  ALTER TABLE "users" DROP COLUMN "two_factor_email_code";
  ALTER TABLE "users" DROP COLUMN "two_factor_email_code_expires_at";
  DROP TYPE "public"."enum_users_two_factor_method";`)
}
