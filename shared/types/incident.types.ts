export enum IncidentStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum IncidentPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
export enum IncidentHistoryType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  STARTED = "STARTED",
  RESOLVED = "RESOLVED",
  REOPENED = "REOPENED",
  CLOSED = "CLOSED",
  RESOLUTION_NOTE_UPDATED = "RESOLUTION_NOTE_UPDATED",
  PRIORITY_CHANGED = "PRIORITY_CHANGED",
  DUE_DATE_CHANGED = "DUE_DATE_CHANGED",
  TITLE_UPDATED = "TITLE_UPDATED",
  DESCRIPTION_UPDATED = "DESCRIPTION_UPDATED",
}

export interface IncidentHistory {
  id: string;
  type: string;
  field: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  dueDate: string | null;
  resolutionNote: string | null;
  isOverdue: boolean;
  availableActions: string[];
  history: IncidentHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface IncidentFilters {
  status?: IncidentStatus;
  priority?: IncidentPriority;
  page?: number;
  limit?: number;
}

export interface IncidentColumn {
  title: string;

  status: IncidentStatus;

  incidents: Incident[];
}

export interface IncidentFormData {
  title: string;
  description: string;
  priority: IncidentPriority;
  status: IncidentStatus | null;
  dueDate: string | null;
  resolutionNote: string | null;
}

export interface PaginatedResponse {
  items: Incident[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}