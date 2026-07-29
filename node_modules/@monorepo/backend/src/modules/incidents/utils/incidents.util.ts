import { Incident } from "@prisma/client";
import {
  IncidentAction,
  IncidentPriority,
  IncidentStatus,
} from "@/modules/incidents/enums/incident.enums";
import { ValidationError } from "@/utils/errors";

const actions = {
  [IncidentStatus.NEW]: [
    IncidentAction.EDIT,
    IncidentAction.DELETE,
    IncidentAction.START,
  ],

  [IncidentStatus.IN_PROGRESS]: [IncidentAction.EDIT, IncidentAction.RESOLVE],

  [IncidentStatus.RESOLVED]: [IncidentAction.CLOSE, IncidentAction.REOPEN],

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

  return dueDate < new Date();
};

export const getAvailableActions = (
  status: Incident["status"],
): IncidentAction[] => {
  return [...actions[status]];
};
