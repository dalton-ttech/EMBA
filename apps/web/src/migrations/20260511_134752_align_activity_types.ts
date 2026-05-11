import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DATA TYPE text;
  UPDATE "activities" SET "activity_type" = CASE "activity_type"
    WHEN 'classEvent' THEN 'other'
    WHEN 'salon' THEN 'talk'
    WHEN 'companyVisit' THEN 'visit'
    WHEN 'course' THEN 'reading'
    WHEN 'sharing' THEN 'reading'
    ELSE "activity_type"
  END;
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DEFAULT 'gobi'::text;
  DROP TYPE "public"."enum_activities_activity_type";
  CREATE TYPE "public"."enum_activities_activity_type" AS ENUM('gobi', 'reading', 'visit', 'dinner', 'talk', 'charity', 'commencement', 'other');
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DEFAULT 'gobi'::"public"."enum_activities_activity_type";
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DATA TYPE "public"."enum_activities_activity_type" USING "activity_type"::"public"."enum_activities_activity_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DATA TYPE text;
  UPDATE "activities" SET "activity_type" = CASE "activity_type"
    WHEN 'gobi' THEN 'classEvent'
    WHEN 'reading' THEN 'course'
    WHEN 'visit' THEN 'companyVisit'
    WHEN 'dinner' THEN 'classEvent'
    WHEN 'talk' THEN 'salon'
    WHEN 'charity' THEN 'other'
    WHEN 'commencement' THEN 'classEvent'
    ELSE "activity_type"
  END;
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DEFAULT 'classEvent'::text;
  DROP TYPE "public"."enum_activities_activity_type";
  CREATE TYPE "public"."enum_activities_activity_type" AS ENUM('classEvent', 'salon', 'companyVisit', 'course', 'sharing', 'other');
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DEFAULT 'classEvent'::"public"."enum_activities_activity_type";
  ALTER TABLE "activities" ALTER COLUMN "activity_type" SET DATA TYPE "public"."enum_activities_activity_type" USING "activity_type"::"public"."enum_activities_activity_type";`)
}
