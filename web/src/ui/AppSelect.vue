<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-slate-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        class="block w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-10 text-sm shadow-sm outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100"
        :class="[
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        ]"
        @change="onChange"
      >
        <option value="" disabled selected v-if="placeholder">
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.148l3.71-3.917a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>

    <p v-else-if="helperText" class="text-sm text-slate-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number | null;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const selectId = computed(() => props.id ?? props.name ?? crypto.randomUUID());

const onChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
};
</script>
