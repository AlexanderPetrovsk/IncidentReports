import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/client";

export class HistoryRepository {
  async create(data: Prisma.IncidentHistoryUncheckedCreateInput) {
    return prisma.incidentHistory.create({
      data,
    });
  }

  async createMany(data: Prisma.IncidentHistoryUncheckedCreateInput[]) {
    return prisma.incidentHistory.createMany({
      data,
    });
  }

  async findByIncidentId(incidentId: string) {
    return prisma.incidentHistory.findMany({
      where: {
        incidentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
