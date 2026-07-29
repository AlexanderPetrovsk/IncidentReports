import { Incident } from "@prisma/client";
import {
  getAvailableActions,
  isIncidentOverdue,
} from "../utils/incidents.util";

export interface IncidentHistoryDto {
  id: string;
  type: string;
  field: string;
  oldValue?: string;
  newValue?: string;
  createdAt: Date;
}

export interface IncidentDto {
  id: string;
  title: string;
  description: string;
  priority: Incident["priority"];
  status: Incident["status"];
  dueDate: string | null;
  resolutionNote: string | null;
  isOverdue: boolean;
  availableActions: string[];
  history: IncidentHistoryDto[];
  createdAt: Date;
  updatedAt: Date;
}

export const mapIncidentToDto = (
  incident: Incident & {
    history?: any[];
  },
): IncidentDto => {
  return {
    id: incident.id,

    title: incident.title,

    description: incident.description,

    priority: incident.priority,

    status: incident.status,

    dueDate: incident.dueDate?.toISOString().split("T")[0] || null,

    resolutionNote: incident.resolutionNote,

    isOverdue: isIncidentOverdue(incident.dueDate, incident.status),

    availableActions: getAvailableActions(incident.status),

    history: (incident.history ?? []).map((item) => ({
      id: item.id,
      type: item.type,
      field: item.field,
      oldValue: item.oldValue,
      newValue: item.newValue,
      createdAt: item.createdAt,
    })),

    createdAt: incident.createdAt,

    updatedAt: incident.updatedAt,
  };
};
