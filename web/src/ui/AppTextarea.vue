<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="textareaId" class="block text-sm font-medium text-slate-700">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <textarea
      :id="textareaId"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      class="block w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
      :class="[
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
          : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
      ]"
      @input="onInput"
    />

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

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  name?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 5,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const textareaId = computed(() => props.id ?? props.name ?? crypto.randomUUID());

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
};
</script>
