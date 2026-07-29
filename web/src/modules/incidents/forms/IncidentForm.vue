<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <AppInput
      v-model="form.title"
      label="Title"
      placeholder="Incident title"
      :error="errors.title"
      required
      :disabled="isDisabled"
    />

    <AppTextarea
      v-model="form.description"
      label="Description"
      placeholder="Describe the incident..."
      :rows="5"
      :error="errors.description"
      required
      :disabled="isDisabled"
    />

    <AppSelect
      v-model="form.priority"
      label="Priority"
      :options="priorityOptions"
      :disabled="isDisabled"
    />

    <AppInput
      v-model="form.dueDate"
      type="date"
      label="Due Date"
      :error="errors.dueDate"
      required
      :disabled="isDisabled"
    />

    <AppInput
      v-model="form.resolutionNote"
      label="Resolution Note:"
      placeholder="Resolution Note"
      :disabled="isDisabled"
      :error="errors.resolutionNote"
    />

    <AppSelect
      v-if="selectedIncident && !isDisabled"
      label="Move To:"
      v-model="form.status"
      :options="getAvailableActionOptions(selectedIncident.availableActions)"
      :error="errors.status"
      placeholder="Move To:"
    />

    <div class="flex justify-end gap-3 border-t border-slate-200 pt-6">
      <AppButton type="submit" :loading="loading" v-show="!isDisabled">
        {{ submitLabel }}
      </AppButton>
      <AppButton
        type="button"
        variant="danger"
        v-show="mode === 'Edit' && !isDisabled"
        @click="isDeleteModalOpen = true"
      >
        Delete
      </AppButton>
      <AppButton type="button" variant="secondary" @click="emit('cancel')"> Cancel </AppButton>
    </div>

    <AppModal :model-value="isDeleteModalOpen">
      <h3 class="line-clamp-2 font-semibold text-slate-900 text-center">
        Are you sure you want to delete this incident
      </h3>
      <div class="flex justify-center gap-3 border-t border-slate-300 pt-6">
        <AppButton @click="emit('delete')">Yes</AppButton>
        <AppButton variant="secondary" @click="isDeleteModalOpen = false">Cancel</AppButton>
      </div>
    </AppModal>
  </form>
</template>

<script setup lang="ts">
import AppButton from '@/ui/AppButton.vue';
import AppInput from '@/ui/AppInput.vue';
import AppSelect from '@/ui/AppSelect.vue';
import AppTextarea from '@/ui/AppTextarea.vue';
import AppModal from '@/ui/AppModal.vue';

import { IncidentStatus, type IncidentFormData } from '@monorepo/shared/types/incident.types';
import { useIncidentValidation } from '../composables/useIncidentValidation';
import { getAvailableActionOptions, priorityOptions } from '../utils/formSelectOptions';
import { useIncidentsStore } from '../stores/useIncidentsStore';
import { computed, ref } from 'vue';

interface Props {
  loading?: boolean;
  submitLabel?: string;
  mode: 'Edit' | 'Create';
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  submitLabel: 'Save Incident',
});

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
  (e: 'delete'): void;
}>();

const form = defineModel<IncidentFormData>({
  required: true,
});

const { errors, isValid } = useIncidentValidation(form);

const { selectedIncident } = useIncidentsStore();

const onSubmit = () => {
  if (!isValid.value) {
    return;
  }

  emit('submit');
};

const isDeleteModalOpen = ref(false);
const isDisabled = computed(() => {
  return !!selectedIncident && selectedIncident.status === IncidentStatus.CLOSED;
})
</script> 
