import { ref } from 'vue';
import { defineStore } from 'pinia';
import { incidentService } from '../api/incidents.service';
import type {
  Incident,
  IncidentFilters,
  IncidentFormData,
  PaginatedResponse,
} from '@monorepo/shared/types/incident.types';

export const useIncidentsStore = defineStore('incidents', () => {
  const incidents = ref<Incident[]>([]);
  const selectedIncident = ref<Incident | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchIncidents = async (filters?: IncidentFilters) => {
    try {
      loading.value = true;

      error.value = null;

      const fetchedIncidents: PaginatedResponse = await incidentService.getIncidents(filters);

      incidents.value = fetchedIncidents.items;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const getIncident = async (id: string) => {
    try {
      const incident = incidents.value.find((i) => i.id === id);

      if (!incident) {
        throw Error('Incident not found');
      }

      selectedIncident.value = incident;
    } catch (err) {
      error.value = err as Error;
    }
  };

  const clearSelection = () => {
    selectedIncident.value = null;
  };

  const createIncident = async (data: IncidentFormData) => {
    try {
      loading.value = true;
      error.value = null;

      const createdIncident = await incidentService.create(data);

      incidents.value.unshift(createdIncident);
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const updateIncident = async (id: string, data: IncidentFormData) => {
    try {
      loading.value = true;
      error.value = null;

      const existing = incidents.value.find((i) => i.id === id);

      if (!existing) {
        throw Error('Incident not found');
      }

      const changes = diff(existing, data) as IncidentFormData;

      const updatedIncident = await incidentService.update(id, changes);
      const index = incidents.value.findIndex((incident) => incident.id === id);

      incidents.value[index] = updatedIncident;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const deleteIncident = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;

      const index = incidents.value.findIndex((incident) => incident.id === id);

      if (index === -1) {
        throw Error('Incident not found');
      }

      incidents.value.splice(index, 1);

      await incidentService.delete(id);
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const diff = <T extends Record<string, any>>(original: T, updated: T) => {
    return Object.fromEntries(
      Object.entries(updated).filter(([key, value]) => {
        return original[key] !== value;
      }),
    );
  };

  return {
    incidents,
    loading,
    error,
    selectedIncident,
    fetchIncidents,
    createIncident,
    updateIncident,
    getIncident,
    clearSelection,
    deleteIncident,
  };
});
