import { IncidentStatus } from "@/modules/incidents/enums/incident.enums";

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

export function canTransition(
  from: IncidentStatus,
  to: IncidentStatus,
): boolean {
  return transitions[from].includes(to);
}

export function getAvailableTransitions(
  status: IncidentStatus,
): IncidentStatus[] {
  return [...transitions[status]];
}
