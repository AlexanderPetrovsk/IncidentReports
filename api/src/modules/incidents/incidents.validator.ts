import { z } from "zod";

import {
  IncidentPriority,
  IncidentStatus,
} from "@monorepo/shared/types/incident.types";

export const createIncidentSchema = z.object({
  title: z.string().min(3).max(200),

  description: z.string().min(5),

  priority: z.enum(IncidentPriority),

  dueDate: z.string().date().nullable().optional(),

  resolutionNote: z.string().min(5).optional().nullable(),
});

export const updateIncidentSchema = createIncidentSchema.partial().extend({
  status: z.enum(IncidentStatus).optional(),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;

export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
