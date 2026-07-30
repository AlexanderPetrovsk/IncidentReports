import { Incident, IncidentHistoryType } from "@prisma/client";
import { HistoryRepository } from "./history.repository";
import { determineHistoryType } from "./utils/history.utils";
import { dateToIsoString } from "@monorepo/shared/utils/shared.utils";

type TrackableField =
  | "title"
  | "description"
  | "priority"
  | "status"
  | "dueDate"
  | "resolutionNote";

const TRACKED_FIELDS: TrackableField[] = [
  "title",
  "description",
  "priority",
  "status",
  "dueDate",
  "resolutionNote",
];

export class HistoryService {
  constructor(private readonly repository = new HistoryRepository()) {}

  recordChange = async (
    incidentId: string,
    type: IncidentHistoryType,
    field?: string,
    oldValue?: string | null,
    newValue?: string | null,
  ) => {
    return this.repository.create({
      incidentId,
      field,
      type,
      oldValue: !oldValue ? null : String(oldValue),
      newValue: !newValue ? null : String(newValue),
    });
  };

  recordManyChanges = async (original: Incident, updated: Incident) => {
    const changes = TRACKED_FIELDS.flatMap((field) => {
      const oldValue = original[field];
      const newValue = updated[field];

      if (oldValue === newValue) {
        return [];
      }

      return [
        {
          incidentId: updated.id,
          field,
          type: determineHistoryType(field, oldValue, newValue),
          oldValue: dateToIsoString(oldValue),
          newValue: dateToIsoString(newValue),
        },
      ];
    });

    if (changes.length === 0) {
      return;
    }

    await this.repository.createMany(changes);
  };
}
