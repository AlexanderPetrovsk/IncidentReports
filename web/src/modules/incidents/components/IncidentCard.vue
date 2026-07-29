<template>
  <div
    class="cursor-pointer rounded-xl border-l-4 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    :class="borderColor"
    @click="handleClick"
  >
    <div class="flex items-start justify-between gap-4">
      <h3 class="line-clamp-2 font-semibold text-slate-900">
        {{ incident.title }}
      </h3>

      <AppBadge :color-class="badgeColor">
        {{ incident.priority }}
      </AppBadge>
    </div>
    <p class="mt-3 text-sm text-slate-600 truncate">
      {{ incident.description }}
    </p>
    <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
      <span v-if="dueDate"> Due {{ dueDate }} </span>
      <span v-else> No due date </span>
    </div>
    <div
      v-if="incident.isOverdue"
      class="mt-3 flex items-center gap-2 rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-600"
    >
      <span>⚠</span>
      <span>Overdue</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/ui/AppBadge.vue';

import type { Incident } from '@monorepo/shared/types/incident.types';

import { priorityColors, statusBorderColors } from '../utils/incidentColors';

import { formatDate } from '../utils/formatDate';

interface Props {
  incident: Incident;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', id: string): void;
}>();

const dueDate = computed(() => formatDate(props.incident.dueDate));

const borderColor = computed(() => statusBorderColors[props.incident.status]);

const badgeColor = computed(() => priorityColors[props.incident.priority]);

const handleClick = () => {
  emit('click', props.incident.id);
};
</script>
