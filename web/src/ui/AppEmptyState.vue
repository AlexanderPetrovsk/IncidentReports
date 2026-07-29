<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center"
  >
    <slot name="icon" />

    <h2 class="mt-4 text-lg font-semibold text-slate-800">
      {{ title }}
    </h2>

    <p v-if="description" class="mt-2 max-w-sm text-sm text-slate-500">
      {{ description }}
    </p>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>
