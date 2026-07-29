/*
  Warnings:

  - The values [DELETED] on the enum `IncidentHistoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IncidentHistoryType_new" AS ENUM ('CREATED', 'UPDATED', 'STARTED', 'RESOLVED', 'REOPENED', 'CLOSED', 'RESOLUTION_NOTE_UPDATED', 'PRIORITY_CHANGED', 'DUE_DATE_CHANGED', 'TITLE_UPDATED', 'DESCRIPTION_UPDATED');
ALTER TABLE "IncidentHistory" ALTER COLUMN "type" TYPE "IncidentHistoryType_new" USING ("type"::text::"IncidentHistoryType_new");
ALTER TYPE "IncidentHistoryType" RENAME TO "IncidentHistoryType_old";
ALTER TYPE "IncidentHistoryType_new" RENAME TO "IncidentHistoryType";
DROP TYPE "public"."IncidentHistoryType_old";
COMMIT;
