import { z } from "zod";

import { IncidentPriority, IncidentStatus } from "./enums/incident.enums";

export const createIncidentSchema = z.object({
  title: z.string().min(3).max(200),

  description: z.string().min(5),

  priority: z.enum(IncidentPriority),

  dueDate: z.iso.datetime().nullable().optional(),

  resolutionNote: z.string().min(5).optional(),
});

export const updateIncidentSchema = createIncidentSchema.partial().extend({
  status: z.enum(IncidentStatus).optional(),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;

export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
