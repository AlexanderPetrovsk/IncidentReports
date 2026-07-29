<template>
  <div class="max-h-64 overflow-y-auto p-3 mt-3">
    <h3 class="mb-4 text-lg font-semibold text-slate-900">History</h3>

    <div
      v-if="!history.length"
      class="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500"
    >
      No history available.
    </div>

    <ol v-else class="relative border-l border-slate-200">
      <li v-for="item in history" :key="item.id" class="relative ml-6 pb-8 last:pb-0">
        <span
          class="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow"
        />

        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-slate-900">
                {{ getActionLabel(item) }}
              </p>

              <template v-if="item.oldValue || item.newValue">
                <p class="mt-2 text-sm text-slate-600">
                  <span class="font-medium">
                    {{ formatValues(item.oldValue) }}
                  </span>
                  ->
                  <span class="font-medium">
                    {{ formatValues(item.newValue) }}
                  </span>
                </p>
              </template>
            </div>

            <span class="shrink-0 text-xs text-slate-500">
              {{ formatDate(item.createdAt) }}
            </span>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { IncidentHistory } from '@monorepo/shared/types/incident.types';
import { IncidentHistoryType } from '@monorepo/shared/types/incident.types';

import { formatDate } from '../utils/formatDate';
import { computed } from 'vue';

interface Props {
  history: IncidentHistory[];
}

const props = defineProps<Props>();

const getActionLabel = (item: IncidentHistory): string => {
  switch (item.type) {
    case IncidentHistoryType.CREATED:
      return 'Incident created';

    case IncidentHistoryType.STARTED:
      return 'Work started';

    case IncidentHistoryType.RESOLVED:
      return 'Incident resolved';

    case IncidentHistoryType.CLOSED:
      return 'Incident closed';

    case IncidentHistoryType.REOPENED:
      return 'Incident reopened';

    default:
      return `${formatFieldName(item.field)} updated`;
  }
};

const formatFieldName = (field?: string | null) => {
  if (!field) {
    return '';
  }

  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
};

const formatValues = (value?: string | null) => {
  if (!value) {
    return '""';
  }

  if (!isNaN(Date.parse(value))) {
    const dateObject = new Date(value);
    return dateObject.toDateString();
  }

  return value;
};
</script>
