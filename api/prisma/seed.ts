import {
  IncidentHistoryType,
  IncidentPriority,
  IncidentStatus,
  PrismaClient
} from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });


const main = async () => {
  console.log("Seeding database");

  await prisma.incidentHistory.deleteMany();
  await prisma.incident.deleteMany();

  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  const newIncident = await prisma.incident.create({
    data: {
      title: "Database backup failed",
      description: "Nightly backup job failed on production.",
      priority: IncidentPriority.MEDIUM,
      status: IncidentStatus.NEW,
      history: {
        create: [
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });

  const inProgressIncident = await prisma.incident.create({
    data: {
      title: "Login service unavailable",
      description: "Users cannot authenticate.",
      priority: IncidentPriority.HIGH,
      dueDate: tomorrow,
      status: IncidentStatus.IN_PROGRESS,
      history: {
        create: [
          {
            type: IncidentHistoryType.STARTED,
            field: "status",
            oldValue: IncidentStatus.NEW,
            newValue: IncidentStatus.IN_PROGRESS,
          },
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });

  const overdueIncident = await prisma.incident.create({
    data: {
      title: "Payment gateway timeout",
      description: "Checkout intermittently fails.",
      priority: IncidentPriority.HIGH,
      dueDate: yesterday,
      status: IncidentStatus.IN_PROGRESS,
      history: {
        create: [
          {
            type: IncidentHistoryType.STARTED,
            field: "status",
            oldValue: IncidentStatus.NEW,
            newValue: IncidentStatus.IN_PROGRESS,
          },
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });

  const resolvedIncident = await prisma.incident.create({
    data: {
      title: "Email notifications delayed",
      description: "Notification queue was blocked.",
      priority: IncidentPriority.MEDIUM,
      status: IncidentStatus.RESOLVED,
      resolutionNote: "Restarted worker containers and cleared the queue.",
      history: {
        create: [
          {
            type: IncidentHistoryType.RESOLVED,
            field: "status",
            oldValue: IncidentStatus.IN_PROGRESS,
            newValue: IncidentStatus.RESOLVED,
          },
          {
            type: IncidentHistoryType.STARTED,
            field: "status",
            oldValue: IncidentStatus.NEW,
            newValue: IncidentStatus.IN_PROGRESS,
          },
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });


  const closedIncident = await prisma.incident.create({
    data: {
      title: "API rate limiting issue",
      description: "Requests were incorrectly throttled.",
      priority: IncidentPriority.LOW,
      status: IncidentStatus.CLOSED,
      resolutionNote: "Configuration corrected and monitoring added.",
      history: {
        create: [
          {
            type: IncidentHistoryType.CLOSED,
            field: "status",
            oldValue: IncidentStatus.RESOLVED,
            newValue: IncidentStatus.CLOSED,
          },
          {
            type: IncidentHistoryType.RESOLVED,
            field: "status",
            oldValue: IncidentStatus.IN_PROGRESS,
            newValue: IncidentStatus.RESOLVED,
          },
          {
            type: IncidentHistoryType.STARTED,
            field: "status",
            oldValue: IncidentStatus.NEW,
            newValue: IncidentStatus.IN_PROGRESS,
          },
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });

  await prisma.incident.create({
    data: {
      title: "Search indexing issue",
      description: "Recently uploaded products are not searchable.",
      priority: IncidentPriority.HIGH,
      dueDate: nextWeek,
      status: IncidentStatus.IN_PROGRESS,
      history: {
        create: [
          {
            type: IncidentHistoryType.UPDATED,
            field: "dueDate",
            oldValue: "",
            newValue: nextWeek.toISOString(),
          },
          {
            type: IncidentHistoryType.STARTED,
            field: "status",
            oldValue: IncidentStatus.NEW,
            newValue: IncidentStatus.IN_PROGRESS,
          },
          {
            type: IncidentHistoryType.UPDATED,
            field: "priority",
            oldValue: "MEDIUM",
            newValue: "HIGH",
          },
          {
            type: IncidentHistoryType.CREATED,
          },
        ],
      },
    },
  });

  console.log("Seed complete");
  console.log(`Created:
  - ${newIncident.title}
  - ${inProgressIncident.title}
  - ${overdueIncident.title}
  - ${resolvedIncident.title}
  - ${closedIncident.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
