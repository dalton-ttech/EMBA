import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('superAdmin', 'admin', 'editor', 'materialManager', 'reviewer');
  CREATE TYPE "public"."enum_media_visibility" AS ENUM('private', 'public');
  CREATE TYPE "public"."enum_media_rights_license" AS ENUM('unknown', 'owned', 'licensed', 'publicDomain', 'creativeCommons');
  CREATE TYPE "public"."enum_people_role_category" AS ENUM('classmate', 'guest', 'faculty', 'host', 'staff', 'other');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'review', 'published', 'archived');
  CREATE TYPE "public"."enum_external_videos_provider" AS ENUM('wechatChannels', 'tencentVideo', 'bilibili', 'youku', 'douyin', 'youtube', 'vimeo', 'other');
  CREATE TYPE "public"."enum_external_videos_caption_status" AS ENUM('unknown', 'none', 'captioned', 'transcribed');
  CREATE TYPE "public"."enum_external_videos_status" AS ENUM('draft', 'review', 'published', 'archived');
  CREATE TYPE "public"."enum_activities_rich_body_block_type" AS ENUM('paragraph', 'heading', 'quote', 'figure', 'orderedList');
  CREATE TYPE "public"."enum_activities_rich_body_level" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_activities_activity_type" AS ENUM('classEvent', 'salon', 'companyVisit', 'course', 'sharing', 'other');
  CREATE TYPE "public"."enum_activities_cover_display_intent" AS ENUM('archiveCard', 'detailHero', 'socialPreview', 'editorialReference');
  CREATE TYPE "public"."enum_activities_status" AS ENUM('draft', 'review', 'published', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"display_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"visibility" "enum_media_visibility" DEFAULT 'private' NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"source" varchar,
  	"preview_focus_x" numeric DEFAULT 50,
  	"preview_focus_y" numeric DEFAULT 50,
  	"rights_copyright" varchar,
  	"rights_license" "enum_media_rights_license" DEFAULT 'unknown',
  	"rights_source_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "people_profile_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"role_category" "enum_people_role_category" DEFAULT 'guest',
  	"title" varchar,
  	"organization" varchar,
  	"bio" varchar,
  	"avatar_id" integer,
  	"status" "enum_people_status" DEFAULT 'draft' NOT NULL,
  	"is_public" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 100,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "external_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"provider" "enum_external_videos_provider" DEFAULT 'wechatChannels' NOT NULL,
  	"provider_id" varchar,
  	"source_url" varchar NOT NULL,
  	"duration" varchar,
  	"language" varchar,
  	"caption_status" "enum_external_videos_caption_status" DEFAULT 'unknown',
  	"cover_image_id" integer,
  	"cover_preview_note" varchar,
  	"status" "enum_external_videos_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"rights_note" varchar,
  	"source_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "external_videos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"activities_id" integer
  );
  
  CREATE TABLE "activities_byline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "activities_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "activities_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"date_label" varchar,
  	"title" varchar,
  	"value" varchar,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "activities_rich_body_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "activities_rich_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_type" "enum_activities_rich_body_block_type" DEFAULT 'paragraph' NOT NULL,
  	"text" varchar,
  	"level" "enum_activities_rich_body_level" DEFAULT '2',
  	"attribution" varchar,
  	"image_id" integer,
  	"number" varchar,
  	"tone" numeric,
  	"credit" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "activities_photo_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar NOT NULL,
  	"number" varchar,
  	"tone" numeric
  );
  
  CREATE TABLE "activities_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "activities_follow_ups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "activities_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"person_id" integer
  );
  
  CREATE TABLE "activities_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "activities_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "activities_related_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"activity_type" "enum_activities_activity_type" DEFAULT 'classEvent',
  	"theme" varchar,
  	"subtitle" varchar,
  	"album_category" varchar,
  	"archive_number" varchar,
  	"duration_label" varchar,
  	"dossier_label" varchar,
  	"photo_strip_title" varchar,
  	"photo_strip_total_label" varchar,
  	"photo_strip_href" varchar,
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"year" numeric NOT NULL,
  	"city" varchar,
  	"venue" varchar,
  	"location_notes" varchar,
  	"content" jsonb,
  	"agenda_notes" varchar,
  	"outcomes" varchar,
  	"cover_image_id" integer,
  	"cover_display_intent" "enum_activities_cover_display_intent" DEFAULT 'archiveCard',
  	"cover_crop_note" varchar,
  	"cover_caption" varchar,
  	"cover_credit" varchar,
  	"cover_rights_note" varchar,
  	"status" "enum_activities_status" DEFAULT 'draft' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"review_notes" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "activities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"activities_id" integer,
  	"people_id" integer,
  	"external_videos_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"people_id" integer,
  	"external_videos_id" integer,
  	"activities_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_home_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_class_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_class_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_eyebrow" varchar DEFAULT 'EMBA Class Archive',
  	"home_title" varchar NOT NULL,
  	"home_summary" varchar NOT NULL,
  	"class_name" varchar NOT NULL,
  	"class_subtitle" varchar,
  	"class_summary" varchar NOT NULL,
  	"class_hero_image_id" integer,
  	"contact_title" varchar NOT NULL,
  	"contact_summary" varchar NOT NULL,
  	"primary_email" varchar NOT NULL,
  	"location_label" varchar,
  	"office_hours" varchar,
  	"apply_url" varchar,
  	"newsletter_note" varchar,
  	"site_name" varchar NOT NULL,
  	"default_title" varchar NOT NULL,
  	"default_description" varchar NOT NULL,
  	"default_og_image_id" integer,
  	"footer_note" varchar,
  	"internal_seo_notes" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"activities_id" integer,
  	"people_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_profile_links" ADD CONSTRAINT "people_profile_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "external_videos" ADD CONSTRAINT "external_videos_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "external_videos_rels" ADD CONSTRAINT "external_videos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."external_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "external_videos_rels" ADD CONSTRAINT "external_videos_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_byline" ADD CONSTRAINT "activities_byline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_metrics" ADD CONSTRAINT "activities_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_timeline" ADD CONSTRAINT "activities_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rich_body_items" ADD CONSTRAINT "activities_rich_body_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities_rich_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rich_body" ADD CONSTRAINT "activities_rich_body_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_rich_body" ADD CONSTRAINT "activities_rich_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_photo_strip_items" ADD CONSTRAINT "activities_photo_strip_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_photo_strip_items" ADD CONSTRAINT "activities_photo_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_highlights" ADD CONSTRAINT "activities_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_follow_ups" ADD CONSTRAINT "activities_follow_ups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_quotes" ADD CONSTRAINT "activities_quotes_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_quotes" ADD CONSTRAINT "activities_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_gallery" ADD CONSTRAINT "activities_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_gallery" ADD CONSTRAINT "activities_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_tags" ADD CONSTRAINT "activities_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_related_links" ADD CONSTRAINT "activities_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_external_videos_fk" FOREIGN KEY ("external_videos_id") REFERENCES "public"."external_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_external_videos_fk" FOREIGN KEY ("external_videos_id") REFERENCES "public"."external_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_home_stats" ADD CONSTRAINT "site_settings_home_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_class_highlights" ADD CONSTRAINT "site_settings_class_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_class_sections" ADD CONSTRAINT "site_settings_class_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_channels" ADD CONSTRAINT "site_settings_contact_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_keywords" ADD CONSTRAINT "site_settings_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_class_hero_image_id_media_id_fk" FOREIGN KEY ("class_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_visibility_idx" ON "media" USING btree ("visibility");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "people_profile_links_order_idx" ON "people_profile_links" USING btree ("_order");
  CREATE INDEX "people_profile_links_parent_id_idx" ON "people_profile_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_avatar_idx" ON "people" USING btree ("avatar_id");
  CREATE INDEX "people_status_idx" ON "people" USING btree ("status");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "external_videos_cover_image_idx" ON "external_videos" USING btree ("cover_image_id");
  CREATE INDEX "external_videos_status_idx" ON "external_videos" USING btree ("status");
  CREATE INDEX "external_videos_published_at_idx" ON "external_videos" USING btree ("published_at");
  CREATE INDEX "external_videos_updated_at_idx" ON "external_videos" USING btree ("updated_at");
  CREATE INDEX "external_videos_created_at_idx" ON "external_videos" USING btree ("created_at");
  CREATE INDEX "external_videos_rels_order_idx" ON "external_videos_rels" USING btree ("order");
  CREATE INDEX "external_videos_rels_parent_idx" ON "external_videos_rels" USING btree ("parent_id");
  CREATE INDEX "external_videos_rels_path_idx" ON "external_videos_rels" USING btree ("path");
  CREATE INDEX "external_videos_rels_activities_id_idx" ON "external_videos_rels" USING btree ("activities_id");
  CREATE INDEX "activities_byline_order_idx" ON "activities_byline" USING btree ("_order");
  CREATE INDEX "activities_byline_parent_id_idx" ON "activities_byline" USING btree ("_parent_id");
  CREATE INDEX "activities_metrics_order_idx" ON "activities_metrics" USING btree ("_order");
  CREATE INDEX "activities_metrics_parent_id_idx" ON "activities_metrics" USING btree ("_parent_id");
  CREATE INDEX "activities_timeline_order_idx" ON "activities_timeline" USING btree ("_order");
  CREATE INDEX "activities_timeline_parent_id_idx" ON "activities_timeline" USING btree ("_parent_id");
  CREATE INDEX "activities_rich_body_items_order_idx" ON "activities_rich_body_items" USING btree ("_order");
  CREATE INDEX "activities_rich_body_items_parent_id_idx" ON "activities_rich_body_items" USING btree ("_parent_id");
  CREATE INDEX "activities_rich_body_order_idx" ON "activities_rich_body" USING btree ("_order");
  CREATE INDEX "activities_rich_body_parent_id_idx" ON "activities_rich_body" USING btree ("_parent_id");
  CREATE INDEX "activities_rich_body_image_idx" ON "activities_rich_body" USING btree ("image_id");
  CREATE INDEX "activities_photo_strip_items_order_idx" ON "activities_photo_strip_items" USING btree ("_order");
  CREATE INDEX "activities_photo_strip_items_parent_id_idx" ON "activities_photo_strip_items" USING btree ("_parent_id");
  CREATE INDEX "activities_photo_strip_items_image_idx" ON "activities_photo_strip_items" USING btree ("image_id");
  CREATE INDEX "activities_highlights_order_idx" ON "activities_highlights" USING btree ("_order");
  CREATE INDEX "activities_highlights_parent_id_idx" ON "activities_highlights" USING btree ("_parent_id");
  CREATE INDEX "activities_follow_ups_order_idx" ON "activities_follow_ups" USING btree ("_order");
  CREATE INDEX "activities_follow_ups_parent_id_idx" ON "activities_follow_ups" USING btree ("_parent_id");
  CREATE INDEX "activities_quotes_order_idx" ON "activities_quotes" USING btree ("_order");
  CREATE INDEX "activities_quotes_parent_id_idx" ON "activities_quotes" USING btree ("_parent_id");
  CREATE INDEX "activities_quotes_person_idx" ON "activities_quotes" USING btree ("person_id");
  CREATE INDEX "activities_gallery_order_idx" ON "activities_gallery" USING btree ("_order");
  CREATE INDEX "activities_gallery_parent_id_idx" ON "activities_gallery" USING btree ("_parent_id");
  CREATE INDEX "activities_gallery_image_idx" ON "activities_gallery" USING btree ("image_id");
  CREATE INDEX "activities_tags_order_idx" ON "activities_tags" USING btree ("_order");
  CREATE INDEX "activities_tags_parent_id_idx" ON "activities_tags" USING btree ("_parent_id");
  CREATE INDEX "activities_related_links_order_idx" ON "activities_related_links" USING btree ("_order");
  CREATE INDEX "activities_related_links_parent_id_idx" ON "activities_related_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "activities_slug_idx" ON "activities" USING btree ("slug");
  CREATE INDEX "activities_event_date_idx" ON "activities" USING btree ("event_date");
  CREATE INDEX "activities_year_idx" ON "activities" USING btree ("year");
  CREATE INDEX "activities_cover_cover_image_idx" ON "activities" USING btree ("cover_image_id");
  CREATE INDEX "activities_status_idx" ON "activities" USING btree ("status");
  CREATE INDEX "activities_published_at_idx" ON "activities" USING btree ("published_at");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "activities_rels_order_idx" ON "activities_rels" USING btree ("order");
  CREATE INDEX "activities_rels_parent_idx" ON "activities_rels" USING btree ("parent_id");
  CREATE INDEX "activities_rels_path_idx" ON "activities_rels" USING btree ("path");
  CREATE INDEX "activities_rels_activities_id_idx" ON "activities_rels" USING btree ("activities_id");
  CREATE INDEX "activities_rels_people_id_idx" ON "activities_rels" USING btree ("people_id");
  CREATE INDEX "activities_rels_external_videos_id_idx" ON "activities_rels" USING btree ("external_videos_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_external_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("external_videos_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_home_stats_order_idx" ON "site_settings_home_stats" USING btree ("_order");
  CREATE INDEX "site_settings_home_stats_parent_id_idx" ON "site_settings_home_stats" USING btree ("_parent_id");
  CREATE INDEX "site_settings_class_highlights_order_idx" ON "site_settings_class_highlights" USING btree ("_order");
  CREATE INDEX "site_settings_class_highlights_parent_id_idx" ON "site_settings_class_highlights" USING btree ("_parent_id");
  CREATE INDEX "site_settings_class_sections_order_idx" ON "site_settings_class_sections" USING btree ("_order");
  CREATE INDEX "site_settings_class_sections_parent_id_idx" ON "site_settings_class_sections" USING btree ("_parent_id");
  CREATE INDEX "site_settings_contact_channels_order_idx" ON "site_settings_contact_channels" USING btree ("_order");
  CREATE INDEX "site_settings_contact_channels_parent_id_idx" ON "site_settings_contact_channels" USING btree ("_parent_id");
  CREATE INDEX "site_settings_keywords_order_idx" ON "site_settings_keywords" USING btree ("_order");
  CREATE INDEX "site_settings_keywords_parent_id_idx" ON "site_settings_keywords" USING btree ("_parent_id");
  CREATE INDEX "site_settings_class_hero_image_idx" ON "site_settings" USING btree ("class_hero_image_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_activities_id_idx" ON "site_settings_rels" USING btree ("activities_id");
  CREATE INDEX "site_settings_rels_people_id_idx" ON "site_settings_rels" USING btree ("people_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "people_profile_links" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "external_videos" CASCADE;
  DROP TABLE "external_videos_rels" CASCADE;
  DROP TABLE "activities_byline" CASCADE;
  DROP TABLE "activities_metrics" CASCADE;
  DROP TABLE "activities_timeline" CASCADE;
  DROP TABLE "activities_rich_body_items" CASCADE;
  DROP TABLE "activities_rich_body" CASCADE;
  DROP TABLE "activities_photo_strip_items" CASCADE;
  DROP TABLE "activities_highlights" CASCADE;
  DROP TABLE "activities_follow_ups" CASCADE;
  DROP TABLE "activities_quotes" CASCADE;
  DROP TABLE "activities_gallery" CASCADE;
  DROP TABLE "activities_tags" CASCADE;
  DROP TABLE "activities_related_links" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "activities_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_home_stats" CASCADE;
  DROP TABLE "site_settings_class_highlights" CASCADE;
  DROP TABLE "site_settings_class_sections" CASCADE;
  DROP TABLE "site_settings_contact_channels" CASCADE;
  DROP TABLE "site_settings_keywords" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_visibility";
  DROP TYPE "public"."enum_media_rights_license";
  DROP TYPE "public"."enum_people_role_category";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum_external_videos_provider";
  DROP TYPE "public"."enum_external_videos_caption_status";
  DROP TYPE "public"."enum_external_videos_status";
  DROP TYPE "public"."enum_activities_rich_body_block_type";
  DROP TYPE "public"."enum_activities_rich_body_level";
  DROP TYPE "public"."enum_activities_activity_type";
  DROP TYPE "public"."enum_activities_cover_display_intent";
  DROP TYPE "public"."enum_activities_status";`)
}
