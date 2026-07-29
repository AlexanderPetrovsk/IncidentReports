<template>
  <AppEmptyState
    v-if="store.error && !store.incidents.length"
    title="Unable to load incidents"
    description="Something went wrong while loading incidents."
  />

  <div v-else class="flex gap-6 overflow-x-auto pb-4">
    <IncidentColumn
      v-for="column in columns"
      :key="column.status"
      :column="column"
      class="min-w-[320px] flex-1"
      @selectIncident="handleIncidentSelection"
    />
  </div>
</template>

<script setup lang="ts">
import IncidentColumn from './IncidentColumn.vue';

import AppEmptyState from '@/ui/AppEmptyState.vue';

import { useIncidentBoard } from '../composables/useIncidentBoard.ts';
import { useIncidentsStore } from '../stores/useIncidentsStore.ts';
import { storeToRefs } from 'pinia';

const store = useIncidentsStore();
const { incidents } = storeToRefs(store);
const { columns } = useIncidentBoard(incidents.value);

const emit = defineEmits<{
  (event: 'selectIncident'): void;
}>();

const handleIncidentSelection = () => {
  emit('selectIncident');
};
</script>
