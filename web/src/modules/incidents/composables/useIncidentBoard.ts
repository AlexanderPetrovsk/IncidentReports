import { computed } from 'vue';

import { IncidentStatus, type Incident } from '@monorepo/shared/types/incident.types';

export const useIncidentBoard = (incidents: Incident[]) => {
  const columns = computed(() => {
    return [
      {
        title: 'New',
        status: IncidentStatus.NEW,
        incidents: incidents.filter((i) => i.status === IncidentStatus.NEW),
      },
      {
        title: 'In Progress',
        status: IncidentStatus.IN_PROGRESS,
        incidents: incidents.filter((i) => i.status === IncidentStatus.IN_PROGRESS),
      },
      {
        title: 'Resolved',
        status: IncidentStatus.RESOLVED,
        incidents: incidents.filter((i) => i.status === IncidentStatus.RESOLVED),
      },
      {
        title: 'Closed',
        status: IncidentStatus.CLOSED,
        incidents: incidents.filter((i) => i.status === IncidentStatus.CLOSED),
      },
    ];
  });

  return {
    columns,
  };
};
