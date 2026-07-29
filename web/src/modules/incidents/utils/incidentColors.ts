import { IncidentPriority, IncidentStatus } from '@monorepo/shared/types/incident.types';

export const priorityColors = {
  [IncidentPriority.LOW]: 'bg-slate-200 text-slate-700',

  [IncidentPriority.MEDIUM]: 'bg-orange-100 text-orange-700',

  [IncidentPriority.HIGH]: 'bg-red-100 text-red-700',
};

export const statusBorderColors = {
  [IncidentStatus.NEW]: 'border-blue-500',

  [IncidentStatus.IN_PROGRESS]: 'border-amber-500',

  [IncidentStatus.RESOLVED]: 'border-green-500',

  [IncidentStatus.CLOSED]: 'border-slate-400',
};
