<template>
  <div :class="colorClass">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  colorClass: string;
}

const props = withDefaults(defineProps<Props>(), {
  colorClass: 'red',
});
</script>
