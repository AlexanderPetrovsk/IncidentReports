-- CreateEnum
CREATE TYPE "IncidentPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "IncidentHistoryType" AS ENUM ('CREATED', 'UPDATED', 'PRIORITY_CHANGED', 'DUE_DATE_CHANGED', 'STARTED', 'RESOLVED', 'REOPENED', 'CLOSED', 'RESOLUTION_NOTE_UPDATED', 'DELETED');

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "IncidentPriority" NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'NEW',
    "dueDate" TIMESTAMP(3),
    "resolutionNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentHistory" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "type" "IncidentHistoryType" NOT NULL,
    "field" VARCHAR(100),
    "oldValue" TEXT,
    "newValue" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Incident_status_idx" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "Incident_priority_idx" ON "Incident"("priority");

-- CreateIndex
CREATE INDEX "Incident_status_priority_idx" ON "Incident"("status", "priority");

-- CreateIndex
CREATE INDEX "IncidentHistory_incidentId_idx" ON "IncidentHistory"("incidentId");

-- AddForeignKey
ALTER TABLE "IncidentHistory" ADD CONSTRAINT "IncidentHistory_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
