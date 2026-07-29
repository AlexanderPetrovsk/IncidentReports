import { computed, type Ref } from 'vue';

import {
  IncidentPriority,
  IncidentStatus,
  type IncidentFormData,
} from '@monorepo/shared/types/incident.types';

export const useIncidentValidation = (form: Ref<IncidentFormData>) => {
  const errors = computed(() => {
    const result: Partial<Record<keyof IncidentFormData, string>> = {};

    if (!form.value.title.trim()) {
      result.title = 'Title is required.';
    }

    if (!form.value.description.trim()) {
      result.description = 'Description is required.';
    }

    if (form.value.priority === IncidentPriority.HIGH && !form.value.dueDate) {
      result.dueDate = 'High priority incidents require a due date.';
    }

    if (form.value.status === IncidentStatus.RESOLVED && !form.value.resolutionNote?.trim()) {
      result.resolutionNote = 'Resolution note is required to resolve the incident.';
    }

    return result;
  });

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  return {
    errors,
    isValid,
  };
};
