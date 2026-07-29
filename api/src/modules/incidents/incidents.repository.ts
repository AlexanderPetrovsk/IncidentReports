import {
  PrismaClient,
  IncidentStatus,
  IncidentPriority,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/prisma/client";

export class IncidentRepository {
  create = async (data: Prisma.IncidentCreateInput) => {
    return prisma.incident.create({ data });
  };

  async findById(id: string) {
    return prisma.incident.findUnique({
      where: {
        id,
      },
      include: {
        history: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  findAll = async (query: any) => {
    const { status, priority, page = 1, limit = 200 } = query;

    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(status && {
        status: status as IncidentStatus,
      }),

      ...(priority && {
        priority: priority as IncidentPriority,
      }),
    };

    const [items, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: "desc",
        },
        include: {
          history: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }),

      prisma.incident.count({
        where,
      }),
    ]);

    return {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  };

  update = async (id: string, data: Prisma.IncidentUpdateInput) => {
    return prisma.incident.update({
      where: {
        id,
      },
      include: {
        history: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      data,
    });
  };

  delete = async (id: string) => {
    return prisma.incident.delete({
      where: {
        id,
      },
    });
  };
}
