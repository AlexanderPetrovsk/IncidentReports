import { ConflictError, NotFoundError, ValidationError } from "@/utils/errors";

import { canTransition } from "@monorepo/shared/incident.machine";

import { validateDueDate, validateResolution } from "./utils/incidents.util";

import type {
  CreateIncidentInput,
  UpdateIncidentInput,
} from "./incidents.validator";
import { mapIncidentToDto } from "./dto/incidents.dto";
import { IncidentStatus } from "./enums/incident.enums";
import { IncidentHistoryType } from "@prisma/client";

export class IncidentService {
  constructor(
    private repository: any,
    private historyService: any,
  ) {}

  create = async (data: CreateIncidentInput) => {
    validateDueDate(
      data.priority,
      data.dueDate ? new Date(data.dueDate) : null,
    );

    const incident = await this.repository.create({
      ...data,

      dueDate: data.dueDate ? new Date(data.dueDate) : null,

      status: IncidentStatus.NEW,
    });

    await this.historyService.recordChange(
      incident.id,
      "CREATED" as IncidentHistoryType,
    );

    const fullIncident = await this.repository.findById(incident.id);

    return mapIncidentToDto(fullIncident);
  };

  findAll = async (query: any) => {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map(mapIncidentToDto),

      pagination: result.pagination,
    };
  };

  findById = async (id: string) => {
    const incident = await this.repository.findById(id);

    if (!incident) {
      throw new NotFoundError(`Incident with ID: ${id}`);
    }

    return mapIncidentToDto(incident);
  };

  update = async (id: string, data: UpdateIncidentInput) => {
    const incident = await this.findById(id);

    validateResolution(data.status, data.resolutionNote);

    if (incident.status === IncidentStatus.CLOSED) {
      throw new ConflictError("Closed incidents cannot be edited.");
    }

    if (
      data.status &&
      !canTransition(incident.status as IncidentStatus, data.status)
    ) {
      throw new ConflictError("Incident cannot be moved to this status.");
    }

    const updatedIncident = await this.repository.update(id, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });

    await this.historyService.recordManyChanges(incident, updatedIncident);

    return updatedIncident;
  };

  delete = async (id: string) => {
    const incident = await this.repository.findById(id);

    if (!incident) {
      throw new NotFoundError("Incident");
    }

    if (incident.status === IncidentStatus.CLOSED) {
      throw new ValidationError("Closed incidents cannot be deleted.");
    }

    const deltedIncident = await this.repository.delete(id);

    return mapIncidentToDto(deltedIncident);
  };
}
