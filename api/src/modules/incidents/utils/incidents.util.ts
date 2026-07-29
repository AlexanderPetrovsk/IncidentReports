import { Incident } from "@prisma/client";
import {
  IncidentPriority,
  IncidentStatus,
} from "@monorepo/shared/types/incident.types";
import { ValidationError } from "@/utils/errors";

const actions = {
  [IncidentStatus.NEW]: [IncidentStatus.IN_PROGRESS],

  [IncidentStatus.IN_PROGRESS]: [IncidentStatus.RESOLVED],

  [IncidentStatus.RESOLVED]: [
    IncidentStatus.CLOSED,
    IncidentStatus.IN_PROGRESS,
  ],

  [IncidentStatus.CLOSED]: [],
} as const;

export const requiresDueDate = (priority: IncidentPriority) => {
  return priority === IncidentPriority.HIGH;
};

export const validateDueDate = (
  priority: IncidentPriority,
  dueDate?: Date | null,
) => {
  if (requiresDueDate(priority) && !dueDate) {
    throw new ValidationError("High priority incidents require a due date.");
  }
};

export const validateResolution = (
  status?: IncidentStatus,
  resolutionNote?: string | null,
) => {
  if (status && status === IncidentStatus.RESOLVED && !resolutionNote) {
    throw new ValidationError("Resolution note is required.");
  }
};

export const isIncidentOverdue = (
  dueDate: Date | null,
  status: Incident["status"],
): boolean => {
  if (!dueDate) {
    return false;
  }

  if (status === IncidentStatus.CLOSED) {
    return false;
  }

  const today = new Date();
  const dateToCheck = new Date(dueDate.getTime());

  return dateToCheck < today;
};

export const getAvailableActions = (
  status: Incident["status"],
): IncidentStatus[] => {
  return [...actions[status]];
};
