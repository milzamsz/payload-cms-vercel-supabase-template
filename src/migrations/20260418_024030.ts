import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_type" AS ENUM('home', 'about', 'why-garden', 'contact', 'media', 'educational-program', 'garden-product', 'landscaping-consultancy', 'movement', 'privacy-policy');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('home', 'about', 'why-garden', 'contact', 'media', 'educational-program', 'garden-product', 'landscaping-consultancy', 'movement', 'privacy-policy');
  CREATE TYPE "public"."enum_posts_content_blocks_block_type" AS ENUM('heading', 'paragraph', 'full-image', 'callout');
  CREATE TYPE "public"."enum__posts_v_version_content_blocks_block_type" AS ENUM('heading', 'paragraph', 'full-image', 'callout');
  CREATE TYPE "public"."enum_services_cta_links_style" AS ENUM('text', 'primary', 'secondary');
  CREATE TYPE "public"."enum__services_v_version_cta_links_style" AS ENUM('text', 'primary', 'secondary');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_mentions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_mentions_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_home_sections_why_garden_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_home_sections_what_we_do_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"image_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "pages_home_sections_garden_visit_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_about_sections_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_about_sections_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_about_sections_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_why_garden_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_why_garden_sections_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"story_id" varchar,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"link_text" varchar,
  	"link_url" varchar,
  	"color" varchar
  );
  
  CREATE TABLE "pages_why_garden_sections_resources_blog_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"color_class" varchar
  );
  
  CREATE TABLE "pages_media_sections_card_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_privacy_policy_sections_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_sections_why_garden_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_sections_what_we_do_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_sections_garden_visit_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_about_sections_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_about_sections_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_about_sections_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_garden_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_garden_sections_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"story_id" varchar,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"link_text" varchar,
  	"link_url" varchar,
  	"color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_garden_sections_resources_blog_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"color_class" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_media_sections_card_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_privacy_policy_sections_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "posts_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_type" "enum_posts_content_blocks_block_type",
  	"text" varchar,
  	"title" varchar,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "_posts_v_version_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_type" "enum__posts_v_version_content_blocks_block_type",
  	"text" varchar,
  	"title" varchar,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "plants_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "_plants_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_image_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "services_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "services_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "services_why_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "services_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_services_cta_links_style" DEFAULT 'text'
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_image_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_why_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum__services_v_version_cta_links_style" DEFAULT 'text',
  	"_uuid" varchar
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_photo_id" integer,
  	"background_image_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_author_name" varchar,
  	"version_author_role" varchar,
  	"version_author_photo_id" integer,
  	"version_background_image_id" integer,
  	"version_display_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_photo_id" integer,
  	"version_display_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media_mentions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"display_date" varchar,
  	"excerpt" varchar,
  	"source" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_media_mentions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_media_mentions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_display_date" varchar,
  	"version_excerpt" varchar,
  	"version_source" varchar,
  	"version_url" varchar,
  	"version_image_id" integer,
  	"version_display_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_mentions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages" ADD COLUMN "page_type" "enum_pages_page_type";
  ALTER TABLE "pages" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_canonical_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "home_sections_why_garden_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_why_garden_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_content" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_about_excerpt_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_what_we_do_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_what_we_do_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_garden_visit_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_garden_visit_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_garden_visit_map_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_highlighted_text" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_background_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_primary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_primary_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_secondary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "home_sections_final_cta_secondary_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_story_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_story_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_story_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "about_sections_team_intro_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_team_intro_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_team_intro_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_cta_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "about_sections_cta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_feedback_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_feedback_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_feedback_content" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_stories_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_plant_story_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_plant_story_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_plant_story_button_text" varchar;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_plant_story_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "why_garden_sections_resources_blog_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "contact_sections_form_intro_eyebrow" varchar;
  ALTER TABLE "pages" ADD COLUMN "contact_sections_form_intro_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "contact_sections_form_intro_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_icon" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_primary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_primary_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_secondary_cta_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "service_index_sections_cta_secondary_cta_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "privacy_policy_sections_effective_date" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_type" "enum__pages_v_version_page_type";
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_canonical_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_og_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_why_garden_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_why_garden_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_content" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_about_excerpt_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_what_we_do_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_what_we_do_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_garden_visit_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_garden_visit_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_garden_visit_map_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_highlighted_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_background_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_primary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_primary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_secondary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_home_sections_final_cta_secondary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_story_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_story_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_story_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_team_intro_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_team_intro_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_team_intro_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_cta_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_about_sections_cta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_feedback_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_feedback_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_feedback_content" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_stories_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_plant_story_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_plant_story_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_plant_story_button_text" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_plant_story_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_why_garden_sections_resources_blog_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_contact_sections_form_intro_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_contact_sections_form_intro_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_contact_sections_form_intro_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_icon" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_primary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_primary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_secondary_cta_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_service_index_sections_cta_secondary_cta_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_privacy_policy_sections_effective_date" varchar;
  ALTER TABLE "posts_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "services" ADD COLUMN "tagline" varchar;
  ALTER TABLE "services" ADD COLUMN "long_description" varchar;
  ALTER TABLE "services" ADD COLUMN "whatsapp_number" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_long_description" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_whatsapp_number" varchar;
  ALTER TABLE "portfolios_gallery" ADD COLUMN "alt" varchar;
  ALTER TABLE "portfolios_gallery" ADD COLUMN "label" varchar;
  ALTER TABLE "portfolios_gallery" ADD COLUMN "badge" varchar;
  ALTER TABLE "portfolios_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "portfolios" ADD COLUMN "tagline" varchar;
  ALTER TABLE "portfolios_rels" ADD COLUMN "plants_id" integer;
  ALTER TABLE "_portfolios_v_version_gallery" ADD COLUMN "alt" varchar;
  ALTER TABLE "_portfolios_v_version_gallery" ADD COLUMN "label" varchar;
  ALTER TABLE "_portfolios_v_version_gallery" ADD COLUMN "badge" varchar;
  ALTER TABLE "_portfolios_v_version_gallery" ADD COLUMN "caption" varchar;
  ALTER TABLE "_portfolios_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_portfolios_v_rels" ADD COLUMN "plants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_mentions_id" integer;
  ALTER TABLE "pages_home_sections_why_garden_items" ADD CONSTRAINT "pages_home_sections_why_garden_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_home_sections_why_garden_items" ADD CONSTRAINT "pages_home_sections_why_garden_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_sections_what_we_do_cards" ADD CONSTRAINT "pages_home_sections_what_we_do_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_home_sections_what_we_do_cards" ADD CONSTRAINT "pages_home_sections_what_we_do_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_sections_garden_visit_slides" ADD CONSTRAINT "pages_home_sections_garden_visit_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_home_sections_garden_visit_slides" ADD CONSTRAINT "pages_home_sections_garden_visit_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_about_sections_story_paragraphs" ADD CONSTRAINT "pages_about_sections_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_about_sections_values" ADD CONSTRAINT "pages_about_sections_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_about_sections_values" ADD CONSTRAINT "pages_about_sections_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_about_sections_timeline" ADD CONSTRAINT "pages_about_sections_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_garden_sections_items" ADD CONSTRAINT "pages_why_garden_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_why_garden_sections_items" ADD CONSTRAINT "pages_why_garden_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_garden_sections_stories" ADD CONSTRAINT "pages_why_garden_sections_stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_why_garden_sections_stories" ADD CONSTRAINT "pages_why_garden_sections_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_garden_sections_resources_blog_links" ADD CONSTRAINT "pages_why_garden_sections_resources_blog_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_media_sections_card_images" ADD CONSTRAINT "pages_media_sections_card_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_media_sections_card_images" ADD CONSTRAINT "pages_media_sections_card_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_privacy_policy_sections_sections" ADD CONSTRAINT "pages_privacy_policy_sections_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_why_garden_items" ADD CONSTRAINT "_pages_v_version_home_sections_why_garden_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_why_garden_items" ADD CONSTRAINT "_pages_v_version_home_sections_why_garden_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_what_we_do_cards" ADD CONSTRAINT "_pages_v_version_home_sections_what_we_do_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_what_we_do_cards" ADD CONSTRAINT "_pages_v_version_home_sections_what_we_do_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_garden_visit_slides" ADD CONSTRAINT "_pages_v_version_home_sections_garden_visit_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_sections_garden_visit_slides" ADD CONSTRAINT "_pages_v_version_home_sections_garden_visit_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_about_sections_story_paragraphs" ADD CONSTRAINT "_pages_v_version_about_sections_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_about_sections_values" ADD CONSTRAINT "_pages_v_version_about_sections_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_about_sections_values" ADD CONSTRAINT "_pages_v_version_about_sections_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_about_sections_timeline" ADD CONSTRAINT "_pages_v_version_about_sections_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_garden_sections_items" ADD CONSTRAINT "_pages_v_version_why_garden_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_garden_sections_items" ADD CONSTRAINT "_pages_v_version_why_garden_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_garden_sections_stories" ADD CONSTRAINT "_pages_v_version_why_garden_sections_stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_garden_sections_stories" ADD CONSTRAINT "_pages_v_version_why_garden_sections_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_garden_sections_resources_blog_links" ADD CONSTRAINT "_pages_v_version_why_garden_sections_resources_blog_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_media_sections_card_images" ADD CONSTRAINT "_pages_v_version_media_sections_card_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_media_sections_card_images" ADD CONSTRAINT "_pages_v_version_media_sections_card_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_privacy_policy_sections_sections" ADD CONSTRAINT "_pages_v_version_privacy_policy_sections_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_content_blocks" ADD CONSTRAINT "posts_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_content_blocks" ADD CONSTRAINT "posts_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_content_blocks" ADD CONSTRAINT "_posts_v_version_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_content_blocks" ADD CONSTRAINT "_posts_v_version_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plants_benefits" ADD CONSTRAINT "plants_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plants_v_version_benefits" ADD CONSTRAINT "_plants_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_image_slides" ADD CONSTRAINT "services_image_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_image_slides" ADD CONSTRAINT "services_image_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_gallery" ADD CONSTRAINT "services_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_gallery" ADD CONSTRAINT "services_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_specs" ADD CONSTRAINT "services_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_why_choose" ADD CONSTRAINT "services_why_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faq" ADD CONSTRAINT "services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_cta_links" ADD CONSTRAINT "services_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_image_slides" ADD CONSTRAINT "_services_v_version_image_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_image_slides" ADD CONSTRAINT "_services_v_version_image_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_gallery" ADD CONSTRAINT "_services_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_gallery" ADD CONSTRAINT "_services_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_specs" ADD CONSTRAINT "_services_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_why_choose" ADD CONSTRAINT "_services_v_version_why_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_faq" ADD CONSTRAINT "_services_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_cta_links" ADD CONSTRAINT "_services_v_version_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_author_photo_id_media_id_fk" FOREIGN KEY ("author_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_author_photo_id_media_id_fk" FOREIGN KEY ("version_author_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_background_image_id_media_id_fk" FOREIGN KEY ("version_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_mentions" ADD CONSTRAINT "media_mentions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_mentions_v" ADD CONSTRAINT "_media_mentions_v_parent_id_media_mentions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_mentions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_mentions_v" ADD CONSTRAINT "_media_mentions_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_home_sections_why_garden_items_order_idx" ON "pages_home_sections_why_garden_items" USING btree ("_order");
  CREATE INDEX "pages_home_sections_why_garden_items_parent_id_idx" ON "pages_home_sections_why_garden_items" USING btree ("_parent_id");
  CREATE INDEX "pages_home_sections_why_garden_items_image_idx" ON "pages_home_sections_why_garden_items" USING btree ("image_id");
  CREATE INDEX "pages_home_sections_what_we_do_cards_order_idx" ON "pages_home_sections_what_we_do_cards" USING btree ("_order");
  CREATE INDEX "pages_home_sections_what_we_do_cards_parent_id_idx" ON "pages_home_sections_what_we_do_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_home_sections_what_we_do_cards_image_idx" ON "pages_home_sections_what_we_do_cards" USING btree ("image_id");
  CREATE INDEX "pages_home_sections_garden_visit_slides_order_idx" ON "pages_home_sections_garden_visit_slides" USING btree ("_order");
  CREATE INDEX "pages_home_sections_garden_visit_slides_parent_id_idx" ON "pages_home_sections_garden_visit_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_home_sections_garden_visit_slides_image_idx" ON "pages_home_sections_garden_visit_slides" USING btree ("image_id");
  CREATE INDEX "pages_about_sections_story_paragraphs_order_idx" ON "pages_about_sections_story_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_about_sections_story_paragraphs_parent_id_idx" ON "pages_about_sections_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_about_sections_values_order_idx" ON "pages_about_sections_values" USING btree ("_order");
  CREATE INDEX "pages_about_sections_values_parent_id_idx" ON "pages_about_sections_values" USING btree ("_parent_id");
  CREATE INDEX "pages_about_sections_values_image_idx" ON "pages_about_sections_values" USING btree ("image_id");
  CREATE INDEX "pages_about_sections_timeline_order_idx" ON "pages_about_sections_timeline" USING btree ("_order");
  CREATE INDEX "pages_about_sections_timeline_parent_id_idx" ON "pages_about_sections_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_why_garden_sections_items_order_idx" ON "pages_why_garden_sections_items" USING btree ("_order");
  CREATE INDEX "pages_why_garden_sections_items_parent_id_idx" ON "pages_why_garden_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_why_garden_sections_items_image_idx" ON "pages_why_garden_sections_items" USING btree ("image_id");
  CREATE INDEX "pages_why_garden_sections_stories_order_idx" ON "pages_why_garden_sections_stories" USING btree ("_order");
  CREATE INDEX "pages_why_garden_sections_stories_parent_id_idx" ON "pages_why_garden_sections_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_why_garden_sections_stories_image_idx" ON "pages_why_garden_sections_stories" USING btree ("image_id");
  CREATE INDEX "pages_why_garden_sections_resources_blog_links_order_idx" ON "pages_why_garden_sections_resources_blog_links" USING btree ("_order");
  CREATE INDEX "pages_why_garden_sections_resources_blog_links_parent_id_idx" ON "pages_why_garden_sections_resources_blog_links" USING btree ("_parent_id");
  CREATE INDEX "pages_media_sections_card_images_order_idx" ON "pages_media_sections_card_images" USING btree ("_order");
  CREATE INDEX "pages_media_sections_card_images_parent_id_idx" ON "pages_media_sections_card_images" USING btree ("_parent_id");
  CREATE INDEX "pages_media_sections_card_images_image_idx" ON "pages_media_sections_card_images" USING btree ("image_id");
  CREATE INDEX "pages_privacy_policy_sections_sections_order_idx" ON "pages_privacy_policy_sections_sections" USING btree ("_order");
  CREATE INDEX "pages_privacy_policy_sections_sections_parent_id_idx" ON "pages_privacy_policy_sections_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_sections_why_garden_items_order_idx" ON "_pages_v_version_home_sections_why_garden_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_sections_why_garden_items_parent_id_idx" ON "_pages_v_version_home_sections_why_garden_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_sections_why_garden_items_image_idx" ON "_pages_v_version_home_sections_why_garden_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_home_sections_what_we_do_cards_order_idx" ON "_pages_v_version_home_sections_what_we_do_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_sections_what_we_do_cards_parent_id_idx" ON "_pages_v_version_home_sections_what_we_do_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_sections_what_we_do_cards_image_idx" ON "_pages_v_version_home_sections_what_we_do_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_home_sections_garden_visit_slides_order_idx" ON "_pages_v_version_home_sections_garden_visit_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_sections_garden_visit_slides_parent_id_idx" ON "_pages_v_version_home_sections_garden_visit_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_sections_garden_visit_slides_image_idx" ON "_pages_v_version_home_sections_garden_visit_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_about_sections_story_paragraphs_order_idx" ON "_pages_v_version_about_sections_story_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_about_sections_story_paragraphs_parent_id_idx" ON "_pages_v_version_about_sections_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_about_sections_values_order_idx" ON "_pages_v_version_about_sections_values" USING btree ("_order");
  CREATE INDEX "_pages_v_version_about_sections_values_parent_id_idx" ON "_pages_v_version_about_sections_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_about_sections_values_image_idx" ON "_pages_v_version_about_sections_values" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_about_sections_timeline_order_idx" ON "_pages_v_version_about_sections_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_version_about_sections_timeline_parent_id_idx" ON "_pages_v_version_about_sections_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_items_order_idx" ON "_pages_v_version_why_garden_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_garden_sections_items_parent_id_idx" ON "_pages_v_version_why_garden_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_items_image_idx" ON "_pages_v_version_why_garden_sections_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_stories_order_idx" ON "_pages_v_version_why_garden_sections_stories" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_garden_sections_stories_parent_id_idx" ON "_pages_v_version_why_garden_sections_stories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_stories_image_idx" ON "_pages_v_version_why_garden_sections_stories" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_resources_blog_links_order_idx" ON "_pages_v_version_why_garden_sections_resources_blog_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_garden_sections_resources_blog_links_parent_id_idx" ON "_pages_v_version_why_garden_sections_resources_blog_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_media_sections_card_images_order_idx" ON "_pages_v_version_media_sections_card_images" USING btree ("_order");
  CREATE INDEX "_pages_v_version_media_sections_card_images_parent_id_idx" ON "_pages_v_version_media_sections_card_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_media_sections_card_images_image_idx" ON "_pages_v_version_media_sections_card_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_privacy_policy_sections_sections_order_idx" ON "_pages_v_version_privacy_policy_sections_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_version_privacy_policy_sections_sections_parent_id_idx" ON "_pages_v_version_privacy_policy_sections_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_content_blocks_order_idx" ON "posts_content_blocks" USING btree ("_order");
  CREATE INDEX "posts_content_blocks_parent_id_idx" ON "posts_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "posts_content_blocks_image_idx" ON "posts_content_blocks" USING btree ("image_id");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_content_blocks_order_idx" ON "_posts_v_version_content_blocks" USING btree ("_order");
  CREATE INDEX "_posts_v_version_content_blocks_parent_id_idx" ON "_posts_v_version_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_content_blocks_image_idx" ON "_posts_v_version_content_blocks" USING btree ("image_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "plants_benefits_order_idx" ON "plants_benefits" USING btree ("_order");
  CREATE INDEX "plants_benefits_parent_id_idx" ON "plants_benefits" USING btree ("_parent_id");
  CREATE INDEX "_plants_v_version_benefits_order_idx" ON "_plants_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_plants_v_version_benefits_parent_id_idx" ON "_plants_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_image_slides_order_idx" ON "services_image_slides" USING btree ("_order");
  CREATE INDEX "services_image_slides_parent_id_idx" ON "services_image_slides" USING btree ("_parent_id");
  CREATE INDEX "services_image_slides_image_idx" ON "services_image_slides" USING btree ("image_id");
  CREATE INDEX "services_gallery_order_idx" ON "services_gallery" USING btree ("_order");
  CREATE INDEX "services_gallery_parent_id_idx" ON "services_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_gallery_image_idx" ON "services_gallery" USING btree ("image_id");
  CREATE INDEX "services_specs_order_idx" ON "services_specs" USING btree ("_order");
  CREATE INDEX "services_specs_parent_id_idx" ON "services_specs" USING btree ("_parent_id");
  CREATE INDEX "services_why_choose_order_idx" ON "services_why_choose" USING btree ("_order");
  CREATE INDEX "services_why_choose_parent_id_idx" ON "services_why_choose" USING btree ("_parent_id");
  CREATE INDEX "services_faq_order_idx" ON "services_faq" USING btree ("_order");
  CREATE INDEX "services_faq_parent_id_idx" ON "services_faq" USING btree ("_parent_id");
  CREATE INDEX "services_cta_links_order_idx" ON "services_cta_links" USING btree ("_order");
  CREATE INDEX "services_cta_links_parent_id_idx" ON "services_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_image_slides_order_idx" ON "_services_v_version_image_slides" USING btree ("_order");
  CREATE INDEX "_services_v_version_image_slides_parent_id_idx" ON "_services_v_version_image_slides" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_image_slides_image_idx" ON "_services_v_version_image_slides" USING btree ("image_id");
  CREATE INDEX "_services_v_version_gallery_order_idx" ON "_services_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_version_gallery_parent_id_idx" ON "_services_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_gallery_image_idx" ON "_services_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_services_v_version_specs_order_idx" ON "_services_v_version_specs" USING btree ("_order");
  CREATE INDEX "_services_v_version_specs_parent_id_idx" ON "_services_v_version_specs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_why_choose_order_idx" ON "_services_v_version_why_choose" USING btree ("_order");
  CREATE INDEX "_services_v_version_why_choose_parent_id_idx" ON "_services_v_version_why_choose" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_faq_order_idx" ON "_services_v_version_faq" USING btree ("_order");
  CREATE INDEX "_services_v_version_faq_parent_id_idx" ON "_services_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_cta_links_order_idx" ON "_services_v_version_cta_links" USING btree ("_order");
  CREATE INDEX "_services_v_version_cta_links_parent_id_idx" ON "_services_v_version_cta_links" USING btree ("_parent_id");
  CREATE INDEX "testimonials_author_photo_idx" ON "testimonials" USING btree ("author_photo_id");
  CREATE INDEX "testimonials_background_image_idx" ON "testimonials" USING btree ("background_image_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_author_photo_idx" ON "_testimonials_v" USING btree ("version_author_photo_id");
  CREATE INDEX "_testimonials_v_version_version_background_image_idx" ON "_testimonials_v" USING btree ("version_background_image_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_parent_idx" ON "_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_latest_idx" ON "_team_members_v" USING btree ("latest");
  CREATE INDEX "_team_members_v_autosave_idx" ON "_team_members_v" USING btree ("autosave");
  CREATE INDEX "media_mentions_image_idx" ON "media_mentions" USING btree ("image_id");
  CREATE INDEX "media_mentions_updated_at_idx" ON "media_mentions" USING btree ("updated_at");
  CREATE INDEX "media_mentions_created_at_idx" ON "media_mentions" USING btree ("created_at");
  CREATE INDEX "media_mentions__status_idx" ON "media_mentions" USING btree ("_status");
  CREATE INDEX "_media_mentions_v_parent_idx" ON "_media_mentions_v" USING btree ("parent_id");
  CREATE INDEX "_media_mentions_v_version_version_image_idx" ON "_media_mentions_v" USING btree ("version_image_id");
  CREATE INDEX "_media_mentions_v_version_version_updated_at_idx" ON "_media_mentions_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_mentions_v_version_version_created_at_idx" ON "_media_mentions_v" USING btree ("version_created_at");
  CREATE INDEX "_media_mentions_v_version_version__status_idx" ON "_media_mentions_v" USING btree ("version__status");
  CREATE INDEX "_media_mentions_v_created_at_idx" ON "_media_mentions_v" USING btree ("created_at");
  CREATE INDEX "_media_mentions_v_updated_at_idx" ON "_media_mentions_v" USING btree ("updated_at");
  CREATE INDEX "_media_mentions_v_latest_idx" ON "_media_mentions_v" USING btree ("latest");
  CREATE INDEX "_media_mentions_v_autosave_idx" ON "_media_mentions_v" USING btree ("autosave");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_sections_about_excerpt_image_id_media_id_fk" FOREIGN KEY ("home_sections_about_excerpt_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_sections_final_cta_background_image_id_media_id_fk" FOREIGN KEY ("home_sections_final_cta_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_about_sections_story_image_id_media_id_fk" FOREIGN KEY ("about_sections_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_why_garden_sections_resources_plant_story_image_id_media_id_fk" FOREIGN KEY ("why_garden_sections_resources_plant_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_home_sections_about_excerpt_image_id_media_id_fk" FOREIGN KEY ("version_home_sections_about_excerpt_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_home_sections_final_cta_background_image_id_media_id_fk" FOREIGN KEY ("version_home_sections_final_cta_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_about_sections_story_image_id_media_id_fk" FOREIGN KEY ("version_about_sections_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_why_garden_sections_resources_plant_story_image_id_media_id_fk" FOREIGN KEY ("version_why_garden_sections_resources_plant_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_rels" ADD CONSTRAINT "portfolios_rels_plants_fk" FOREIGN KEY ("plants_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_rels" ADD CONSTRAINT "_portfolios_v_rels_plants_fk" FOREIGN KEY ("plants_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_mentions_fk" FOREIGN KEY ("media_mentions_id") REFERENCES "public"."media_mentions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_home_sections_about_excerpt_home_sections_about_ex_idx" ON "pages" USING btree ("home_sections_about_excerpt_image_id");
  CREATE INDEX "pages_home_sections_final_cta_home_sections_final_cta_ba_idx" ON "pages" USING btree ("home_sections_final_cta_background_image_id");
  CREATE INDEX "pages_about_sections_story_about_sections_story_image_idx" ON "pages" USING btree ("about_sections_story_image_id");
  CREATE INDEX "pages_why_garden_sections_resources_why_garden_sections__idx" ON "pages" USING btree ("why_garden_sections_resources_plant_story_image_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_home_sections_about_excerpt_version_hom_idx" ON "_pages_v" USING btree ("version_home_sections_about_excerpt_image_id");
  CREATE INDEX "_pages_v_version_home_sections_final_cta_version_home_se_idx" ON "_pages_v" USING btree ("version_home_sections_final_cta_background_image_id");
  CREATE INDEX "_pages_v_version_about_sections_story_version_about_sect_idx" ON "_pages_v" USING btree ("version_about_sections_story_image_id");
  CREATE INDEX "_pages_v_version_why_garden_sections_resources_version_w_idx" ON "_pages_v" USING btree ("version_why_garden_sections_resources_plant_story_image_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "portfolios_rels_plants_id_idx" ON "portfolios_rels" USING btree ("plants_id");
  CREATE INDEX "_portfolios_v_rels_plants_id_idx" ON "_portfolios_v_rels" USING btree ("plants_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_media_mentions_id_idx" ON "payload_locked_documents_rels" USING btree ("media_mentions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_home_sections_why_garden_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_home_sections_what_we_do_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_home_sections_garden_visit_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_about_sections_story_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_about_sections_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_about_sections_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_why_garden_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_why_garden_sections_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_why_garden_sections_resources_blog_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_media_sections_card_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_privacy_policy_sections_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_home_sections_why_garden_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_home_sections_what_we_do_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_home_sections_garden_visit_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_about_sections_story_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_about_sections_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_about_sections_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_why_garden_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_why_garden_sections_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_why_garden_sections_resources_blog_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_media_sections_card_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_privacy_policy_sections_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_content_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_content_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "plants_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_plants_v_version_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_image_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_why_choose" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_image_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_why_choose" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_testimonials_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_members_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_mentions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_media_mentions_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_home_sections_why_garden_items" CASCADE;
  DROP TABLE "pages_home_sections_what_we_do_cards" CASCADE;
  DROP TABLE "pages_home_sections_garden_visit_slides" CASCADE;
  DROP TABLE "pages_about_sections_story_paragraphs" CASCADE;
  DROP TABLE "pages_about_sections_values" CASCADE;
  DROP TABLE "pages_about_sections_timeline" CASCADE;
  DROP TABLE "pages_why_garden_sections_items" CASCADE;
  DROP TABLE "pages_why_garden_sections_stories" CASCADE;
  DROP TABLE "pages_why_garden_sections_resources_blog_links" CASCADE;
  DROP TABLE "pages_media_sections_card_images" CASCADE;
  DROP TABLE "pages_privacy_policy_sections_sections" CASCADE;
  DROP TABLE "_pages_v_version_home_sections_why_garden_items" CASCADE;
  DROP TABLE "_pages_v_version_home_sections_what_we_do_cards" CASCADE;
  DROP TABLE "_pages_v_version_home_sections_garden_visit_slides" CASCADE;
  DROP TABLE "_pages_v_version_about_sections_story_paragraphs" CASCADE;
  DROP TABLE "_pages_v_version_about_sections_values" CASCADE;
  DROP TABLE "_pages_v_version_about_sections_timeline" CASCADE;
  DROP TABLE "_pages_v_version_why_garden_sections_items" CASCADE;
  DROP TABLE "_pages_v_version_why_garden_sections_stories" CASCADE;
  DROP TABLE "_pages_v_version_why_garden_sections_resources_blog_links" CASCADE;
  DROP TABLE "_pages_v_version_media_sections_card_images" CASCADE;
  DROP TABLE "_pages_v_version_privacy_policy_sections_sections" CASCADE;
  DROP TABLE "posts_content_blocks" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "_posts_v_version_content_blocks" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "plants_benefits" CASCADE;
  DROP TABLE "_plants_v_version_benefits" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_image_slides" CASCADE;
  DROP TABLE "services_gallery" CASCADE;
  DROP TABLE "services_specs" CASCADE;
  DROP TABLE "services_why_choose" CASCADE;
  DROP TABLE "services_faq" CASCADE;
  DROP TABLE "services_cta_links" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v_version_image_slides" CASCADE;
  DROP TABLE "_services_v_version_gallery" CASCADE;
  DROP TABLE "_services_v_version_specs" CASCADE;
  DROP TABLE "_services_v_version_why_choose" CASCADE;
  DROP TABLE "_services_v_version_faq" CASCADE;
  DROP TABLE "_services_v_version_cta_links" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "_team_members_v" CASCADE;
  DROP TABLE "media_mentions" CASCADE;
  DROP TABLE "_media_mentions_v" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_home_sections_about_excerpt_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_home_sections_final_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_about_sections_story_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_why_garden_sections_resources_plant_story_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_home_sections_about_excerpt_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_home_sections_final_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_about_sections_story_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_why_garden_sections_resources_plant_story_image_id_media_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  ALTER TABLE "portfolios_rels" DROP CONSTRAINT "portfolios_rels_plants_fk";
  
  ALTER TABLE "_portfolios_v_rels" DROP CONSTRAINT "_portfolios_v_rels_plants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_mentions_fk";
  
  DROP INDEX "pages_seo_seo_og_image_idx";
  DROP INDEX "pages_home_sections_about_excerpt_home_sections_about_ex_idx";
  DROP INDEX "pages_home_sections_final_cta_home_sections_final_cta_ba_idx";
  DROP INDEX "pages_about_sections_story_about_sections_story_image_idx";
  DROP INDEX "pages_why_garden_sections_resources_why_garden_sections__idx";
  DROP INDEX "_pages_v_version_seo_version_seo_og_image_idx";
  DROP INDEX "_pages_v_version_home_sections_about_excerpt_version_hom_idx";
  DROP INDEX "_pages_v_version_home_sections_final_cta_version_home_se_idx";
  DROP INDEX "_pages_v_version_about_sections_story_version_about_sect_idx";
  DROP INDEX "_pages_v_version_why_garden_sections_resources_version_w_idx";
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "portfolios_rels_plants_id_idx";
  DROP INDEX "_portfolios_v_rels_plants_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_mentions_id_idx";
  ALTER TABLE "pages" DROP COLUMN "page_type";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_title";
  ALTER TABLE "pages" DROP COLUMN "seo_meta_description";
  ALTER TABLE "pages" DROP COLUMN "seo_canonical_url";
  ALTER TABLE "pages" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "pages" DROP COLUMN "home_sections_why_garden_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "home_sections_why_garden_heading";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_title";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_content";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_image_id";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_cta_label";
  ALTER TABLE "pages" DROP COLUMN "home_sections_about_excerpt_cta_url";
  ALTER TABLE "pages" DROP COLUMN "home_sections_what_we_do_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "home_sections_what_we_do_heading";
  ALTER TABLE "pages" DROP COLUMN "home_sections_garden_visit_heading";
  ALTER TABLE "pages" DROP COLUMN "home_sections_garden_visit_description";
  ALTER TABLE "pages" DROP COLUMN "home_sections_garden_visit_map_label";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_heading";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_highlighted_text";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_description";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_background_image_id";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_primary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_primary_cta_url";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_secondary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "home_sections_final_cta_secondary_cta_url";
  ALTER TABLE "pages" DROP COLUMN "about_sections_story_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "about_sections_story_heading";
  ALTER TABLE "pages" DROP COLUMN "about_sections_story_image_id";
  ALTER TABLE "pages" DROP COLUMN "about_sections_team_intro_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "about_sections_team_intro_heading";
  ALTER TABLE "pages" DROP COLUMN "about_sections_team_intro_description";
  ALTER TABLE "pages" DROP COLUMN "about_sections_cta_heading";
  ALTER TABLE "pages" DROP COLUMN "about_sections_cta_description";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_feedback_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_feedback_heading";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_feedback_content";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_stories_heading";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_heading";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_description";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_plant_story_heading";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_plant_story_description";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_plant_story_button_text";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_plant_story_image_id";
  ALTER TABLE "pages" DROP COLUMN "why_garden_sections_resources_blog_heading";
  ALTER TABLE "pages" DROP COLUMN "contact_sections_form_intro_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "contact_sections_form_intro_heading";
  ALTER TABLE "pages" DROP COLUMN "contact_sections_form_intro_description";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_icon";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_heading";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_description";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_primary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_primary_cta_url";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_secondary_cta_label";
  ALTER TABLE "pages" DROP COLUMN "service_index_sections_cta_secondary_cta_url";
  ALTER TABLE "pages" DROP COLUMN "privacy_policy_sections_effective_date";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_canonical_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_og_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_why_garden_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_why_garden_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_about_excerpt_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_what_we_do_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_what_we_do_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_garden_visit_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_garden_visit_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_garden_visit_map_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_highlighted_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_background_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_primary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_primary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_secondary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_home_sections_final_cta_secondary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_story_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_story_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_story_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_team_intro_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_team_intro_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_team_intro_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_cta_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_about_sections_cta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_feedback_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_feedback_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_feedback_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_stories_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_plant_story_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_plant_story_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_plant_story_button_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_plant_story_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_why_garden_sections_resources_blog_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_contact_sections_form_intro_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_contact_sections_form_intro_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_contact_sections_form_intro_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_icon";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_primary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_primary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_secondary_cta_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_service_index_sections_cta_secondary_cta_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_privacy_policy_sections_effective_date";
  ALTER TABLE "posts_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "services" DROP COLUMN "tagline";
  ALTER TABLE "services" DROP COLUMN "long_description";
  ALTER TABLE "services" DROP COLUMN "whatsapp_number";
  ALTER TABLE "_services_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_services_v" DROP COLUMN "version_long_description";
  ALTER TABLE "_services_v" DROP COLUMN "version_whatsapp_number";
  ALTER TABLE "portfolios_gallery" DROP COLUMN "alt";
  ALTER TABLE "portfolios_gallery" DROP COLUMN "label";
  ALTER TABLE "portfolios_gallery" DROP COLUMN "badge";
  ALTER TABLE "portfolios_gallery" DROP COLUMN "caption";
  ALTER TABLE "portfolios" DROP COLUMN "tagline";
  ALTER TABLE "portfolios_rels" DROP COLUMN "plants_id";
  ALTER TABLE "_portfolios_v_version_gallery" DROP COLUMN "alt";
  ALTER TABLE "_portfolios_v_version_gallery" DROP COLUMN "label";
  ALTER TABLE "_portfolios_v_version_gallery" DROP COLUMN "badge";
  ALTER TABLE "_portfolios_v_version_gallery" DROP COLUMN "caption";
  ALTER TABLE "_portfolios_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_portfolios_v_rels" DROP COLUMN "plants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_mentions_id";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum_posts_content_blocks_block_type";
  DROP TYPE "public"."enum__posts_v_version_content_blocks_block_type";
  DROP TYPE "public"."enum_services_cta_links_style";
  DROP TYPE "public"."enum__services_v_version_cta_links_style";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum__team_members_v_version_status";
  DROP TYPE "public"."enum_media_mentions_status";
  DROP TYPE "public"."enum__media_mentions_v_version_status";`)
}
