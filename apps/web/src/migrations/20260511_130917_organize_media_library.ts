import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_album_category" AS ENUM('gobi', 'campus', 'visit', 'banquet', 'reading', 'people', 'other');
  ALTER TABLE "media" ADD COLUMN "album_category" "enum_media_album_category";
  ALTER TABLE "media" ADD COLUMN "related_activity_id" integer;
  ALTER TABLE "media" ADD COLUMN "keywords" varchar;
  ALTER TABLE "media" ADD CONSTRAINT "media_related_activity_id_activities_id_fk" FOREIGN KEY ("related_activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_album_category_idx" ON "media" USING btree ("album_category");
  CREATE INDEX "media_related_activity_idx" ON "media" USING btree ("related_activity_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP CONSTRAINT "media_related_activity_id_activities_id_fk";
  
  DROP INDEX "media_album_category_idx";
  DROP INDEX "media_related_activity_idx";
  ALTER TABLE "media" DROP COLUMN "album_category";
  ALTER TABLE "media" DROP COLUMN "related_activity_id";
  ALTER TABLE "media" DROP COLUMN "keywords";
  DROP TYPE "public"."enum_media_album_category";`)
}
