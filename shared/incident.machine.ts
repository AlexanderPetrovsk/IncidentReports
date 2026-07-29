import { IncidentStatus } from "@monorepo/shared/types/incident.types";

const transitions = {
  [IncidentStatus.NEW]: [IncidentStatus.IN_PROGRESS],

  [IncidentStatus.IN_PROGRESS]: [IncidentStatus.RESOLVED],

  [IncidentStatus.RESOLVED]: [
    IncidentStatus.CLOSED,
    IncidentStatus.IN_PROGRESS,
  ],

  [IncidentStatus.CLOSED]: [],
} as {
  [key: string]: IncidentStatus[];
};

export const canTransition =(
  from: IncidentStatus,
  to: IncidentStatus,
): boolean =>{
  return transitions[from].includes(to);
}

export const getAvailableTransitions = (
  status: IncidentStatus,
): IncidentStatus[] => {
  return [...transitions[status]];
}
