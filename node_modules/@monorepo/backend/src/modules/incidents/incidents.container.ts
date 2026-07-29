import { IncidentRepository } from "./incidents.repository";

import { IncidentService } from "./incidents.service";

import { HistoryRepository } from "@/modules/history/history.repository";

import { HistoryService } from "@/modules/history/history.service";

const incidentRepository = new IncidentRepository();

const historyRepository = new HistoryRepository();

const historyService = new HistoryService(historyRepository);

export const incidentService = new IncidentService(
  incidentRepository,
  historyService,
);
