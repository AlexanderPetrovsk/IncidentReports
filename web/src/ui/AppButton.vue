<template>
  <button :class="classes" :disabled="disabled || loading">
    <AppSpinner v-if="loading" class="mr-2" />

    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppSpinner from './AppSpinner.vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
});

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',

  {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',

    secondary: 'bg-slate-200 hover:bg-slate-300',

    danger: 'bg-red-600 text-white hover:bg-red-700',

    ghost: 'hover:bg-slate-100',
  }[props.variant],

  {
    sm: 'px-3 py-1.5 text-sm',

    md: 'px-4 py-2',

    lg: 'px-5 py-3 text-lg',
  }[props.size],
]);
</script>
