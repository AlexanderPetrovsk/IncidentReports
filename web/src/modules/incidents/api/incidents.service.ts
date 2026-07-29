import { api } from '@/api/axios';

import type { Incident, IncidentFilters } from '@monorepo/shared/types/incident.types';
import type { PaginatedResponse } from '@monorepo/shared/types/incident.types';

export interface CreateIncidentRequest {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string | null;
}

export interface UpdateIncidentRequest extends CreateIncidentRequest {}

export const incidentService = {
  async getIncidents(filters?: IncidentFilters): Promise<PaginatedResponse> {
    const response = await api.get('/incidents', {
      params: filters,
    });

    return response.data;
  },

  async getIncident(id: string): Promise<Incident> {
    const response = await api.get<Incident>(`/incidents/${id}`);

    return response.data;
  },

  async create(data: CreateIncidentRequest): Promise<Incident> {
    const response = await api.post<Incident>('/incidents', data);

    return response.data;
  },

  async update(id: string, data: UpdateIncidentRequest): Promise<Incident> {
    const response = await api.patch<Incident>(`/incidents/${id}`, data);

    return response.data;
  },

  async delete(id: string): Promise<void> {
    const response = await api.delete(`/incidents/${id}`);

    return response.data;
  },
};
