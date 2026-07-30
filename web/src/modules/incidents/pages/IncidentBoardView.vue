<template>
  <div v-if="store.loading" class="flex min-h-[400px] items-center justify-center">
    <AppSpinner size="lg" />
  </div>

  <div v-else class="flex flex-col gap-6">
    <header class="flex items-center justify-between flex-wrap">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Incidents</h1>

        <p class="mt-1 text-sm text-slate-500 mb-6 md:mb-0">
          Track and manage organization incidents.
        </p>
      </div>

      <button
        class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        @click="isCreateModalOpen = true"
      >
        New Incident
      </button>
    </header>

    <IncidentFilters :filters="filters" @update:filters="updateFilters" />

    <IncidentBoard @select-incident="selectIncident" />

    <AppModal :model-value="isCreateModalOpen">
      <IncidentForm
        v-model="createForm"
        @submit="handleCreateIncident"
        @cancel="handleCloseCreateForm"
        mode="Create"
      />
    </AppModal>

    <AppModal :model-value="isEditModalOpen">
      <IncidentForm
        v-model="editForm"
        @submit="handleEditIncident"
        @cancel="handleCloseEditForm"
        @delete="handleDeleteForm"
        mode="Edit"
      />
      <IncidentHistory v-if="selectedIncident" :history="selectedIncident.history" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import IncidentFilters from '../components/IncidentFilters.vue';

import {
  IncidentPriority,
  IncidentStatus,
  type IncidentFilters as IncidentFilterState,
  type IncidentFormData,
} from '@monorepo/shared/types/incident.types.ts';

import { useIncidentsStore } from '../stores/useIncidentsStore.ts';
import AppModal from '@/ui/AppModal.vue';
import IncidentForm from '../forms/IncidentForm.vue';
import IncidentBoard from '../components/IncidentBoard.vue';
import AppSpinner from '@/ui/AppSpinner.vue';
import IncidentHistory from '../components/IncidentHistory.vue';
import { storeToRefs } from 'pinia';

const store = useIncidentsStore();

onMounted(async () => {
  if (!store.incidents.length) {
    await store.fetchIncidents();
  }
});

const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);

const filters = reactive<IncidentFilterState>({
  status: undefined,
  priority: undefined,
  page: 1,
  limit: 20,
});

let createForm = reactive<IncidentFormData>({
  title: '',
  description: '',
  priority: IncidentPriority.MEDIUM,
  dueDate: null,
  status: IncidentStatus.NEW,
  resolutionNote: null,
});

let editForm = reactive<IncidentFormData>({
  title: '',
  description: '',
  priority: IncidentPriority.MEDIUM,
  dueDate: null,
  status: null,
  resolutionNote: null,
});

const { selectedIncident } = storeToRefs(store);

const selectIncident = () => {
  isEditModalOpen.value = true;
  Object.assign(editForm, selectedIncident.value);
};

const updateFilters = async (event: IncidentFilterState) => {
  Object.assign(filters, event);

  await store.fetchIncidents(filters);
};

const handleCreateIncident = async () => {
  await store.createIncident(createForm);

  isCreateModalOpen.value = false;
};

const handleEditIncident = async () => {
  if (!selectedIncident.value) {
    return;
  }

  await store.updateIncident(selectedIncident.value.id, editForm);

  isEditModalOpen.value = false;
};

const handleDeleteForm = async () => {
  if (!selectedIncident.value) {
    return;
  }

  await store.deleteIncident(selectedIncident.value.id);

  isEditModalOpen.value = false;
};

const handleCloseCreateForm = () => {
  selectedIncident.value = null;
  isCreateModalOpen.value = false;
};

const handleCloseEditForm = () => {
  selectedIncident.value = null;
  isEditModalOpen.value = false;
};
</script>
