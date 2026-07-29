import { IncidentPriority, IncidentStatus } from '@monorepo/shared/types/incident.types';

export const priorityOptions = [
  {
    label: 'Low',
    value: IncidentPriority.LOW,
  },
  {
    label: 'Medium',
    value: IncidentPriority.MEDIUM,
  },
  {
    label: 'High',
    value: IncidentPriority.HIGH,
  },
];

export const statusFilterOptions = [
  {
    label: 'All statuses',
    value: '',
  },
  {
    label: 'New',
    value: IncidentStatus.NEW,
  },
  {
    label: 'In Progress',
    value: IncidentStatus.IN_PROGRESS,
  },
  {
    label: 'Resolved',
    value: IncidentStatus.RESOLVED,
  },
  {
    label: 'Closed',
    value: IncidentStatus.CLOSED,
  },
];

export const priorityFilterOptions = [
  {
    label: 'All priorities',
    value: '',
  },
  {
    label: 'Low',
    value: IncidentPriority.LOW,
  },
  {
    label: 'Medium',
    value: IncidentPriority.MEDIUM,
  },
  {
    label: 'High',
    value: IncidentPriority.HIGH,
  },
];
export const getAvailableActionOptions = (availableActions: string[]) => {
  return availableActions.map((status) => ({
    value: status,
    label: statusLabels[status as IncidentStatus],
  }));
};

const statusLabels: Record<IncidentStatus, string> = {
  [IncidentStatus.NEW]: 'Start Progress',
  [IncidentStatus.IN_PROGRESS]: 'Move to In Progress',
  [IncidentStatus.RESOLVED]: 'Resolve Incident',
  [IncidentStatus.CLOSED]: 'Close Incident',
};
