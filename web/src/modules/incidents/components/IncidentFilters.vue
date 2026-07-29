<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex flex-wrap gap-3">
      <AppSelect
        v-model="filters.status as string"
        :options="statusFilterOptions"
        @update:model-value="updateFilter('status', $event)"
      />
      <AppSelect
        v-model="filters.priority as string"
        :options="priorityFilterOptions"
        @update:model-value="updateFilter('priority', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IncidentFilters as IncidentFilterState } from '@monorepo/shared/types/incident.types';
import { priorityFilterOptions, statusFilterOptions } from '../utils/formSelectOptions';
import AppSelect from '@/ui/AppSelect.vue';

interface Props {
  filters: IncidentFilterState;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:filters', value: IncidentFilterState): void;
}>();

const updateFilter = (key: keyof IncidentFilterState, value: string | number) => {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
    page: 1,
  });
};
</script>
