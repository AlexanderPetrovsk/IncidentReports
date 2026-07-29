<template>
  <div class="flex min-h-[500px] flex-col rounded-xl bg-slate-100 p-4">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="font-semibold text-slate-800">
        {{ column.title }}
      </h2>

      <span class="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        {{ column.incidents.length }}
      </span>
    </header>

    <!-- Cards -->
    <div class="flex flex-1 flex-col gap-3">
      <IncidentCard
        v-for="incident in column.incidents"
        :key="incident.id"
        :incident="incident"
        @click="handleIncidentClick"
      />

      <div
        v-if="column.incidents.length === 0"
        class="rounded-lg border border-dashed p-6 text-center text-sm text-slate-400"
      >
        No incidents
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Incident, IncidentStatus } from '@monorepo/shared/types/incident.types.ts';
import IncidentCard from './IncidentCard.vue';
import { useIncidentsStore } from '../stores/useIncidentsStore.ts';

interface Props {
  column: {
    title: string;
    status: IncidentStatus;
    incidents: Incident[];
  };
}

defineProps<Props>();

const emit = defineEmits<{
  (event: 'selectIncident'): void;
}>();

const { getIncident } = useIncidentsStore();

const handleIncidentClick = async (id: string) => {
  await getIncident(id);

  emit('selectIncident');
};
</script>
