import { IncidentHistoryType, IncidentStatus } from "@prisma/client";

const STATUS_TRANSITIONS: Record<
  IncidentStatus,
  Partial<Record<IncidentStatus, IncidentHistoryType>>
> = {
  [IncidentStatus.NEW]: {
    [IncidentStatus.IN_PROGRESS]: IncidentHistoryType.STARTED,
  },

  [IncidentStatus.IN_PROGRESS]: {
    [IncidentStatus.RESOLVED]: IncidentHistoryType.RESOLVED,
  },

  [IncidentStatus.RESOLVED]: {
    [IncidentStatus.CLOSED]: IncidentHistoryType.CLOSED,
    [IncidentStatus.IN_PROGRESS]: IncidentHistoryType.REOPENED,
  },

  [IncidentStatus.CLOSED]: {},
};

export const determineHistoryType = (
  field: string,
  oldValue: unknown,
  newValue: unknown,
): IncidentHistoryType => {
  switch (field) {
    case "title":
      return IncidentHistoryType.TITLE_UPDATED;
    case "description":
      return IncidentHistoryType.DESCRIPTION_UPDATED;
    case "priority":
      return IncidentHistoryType.PRIORITY_CHANGED;
    case "dueDate":
      return IncidentHistoryType.DUE_DATE_CHANGED;
    case "resolutionNote":
      return IncidentHistoryType.RESOLUTION_NOTE_UPDATED;
    case "status":
      return determineStatusChange(
        oldValue as IncidentStatus,
        newValue as IncidentStatus,
      );
    default:
      return IncidentHistoryType.UPDATED;
  }
};

const determineStatusChange = (
  oldStatus: IncidentStatus,
  newStatus: IncidentStatus,
): IncidentHistoryType => {
  return (
    STATUS_TRANSITIONS[oldStatus]?.[newStatus] ?? IncidentHistoryType.UPDATED
  );
};
