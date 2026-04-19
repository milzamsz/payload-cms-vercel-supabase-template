import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "email_settings_admin_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "email_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"from_name" varchar DEFAULT 'Kebun Kumara',
  	"from_email" varchar,
  	"reply_to_email" varchar,
  	"send_contact_admin_notification" boolean DEFAULT true,
  	"send_contact_auto_reply" boolean DEFAULT true,
  	"contact_admin_subject_prefix" varchar DEFAULT '[Kebun Kumara Contact]',
  	"contact_auto_reply_subject" varchar DEFAULT 'We received your message',
  	"contact_auto_reply_intro" varchar DEFAULT 'Thank you for reaching out to Kebun Kumara. Our team has received your message and will get back to you soon.',
  	"contact_auto_reply_signature" varchar DEFAULT 'Warm regards,
  Kebun Kumara',
  	"forgot_password_subject" varchar DEFAULT 'Reset your Kebun Kumara password',
  	"forgot_password_intro" varchar DEFAULT 'We received a request to reset your Kebun Kumara account password. Use the secure link below to set a new password.',
  	"forgot_password_signature" varchar DEFAULT 'Warm regards,
  Kebun Kumara',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "email_settings_admin_recipients" ADD CONSTRAINT "email_settings_admin_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."email_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "email_settings_admin_recipients_order_idx" ON "email_settings_admin_recipients" USING btree ("_order");
  CREATE INDEX "email_settings_admin_recipients_parent_id_idx" ON "email_settings_admin_recipients" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "email_settings_admin_recipients" CASCADE;
  DROP TABLE "email_settings" CASCADE;`)
}
