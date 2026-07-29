<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="closeOnOverlay && close()"
        />

        <div class="relative rounded-xl bg-white shadow-xl md:w-[800px]">
          <div v-if="title" class="border-b px-6 py-4">
            <h2 class="text-lg font-semibold">
              {{ title }}
            </h2>
          </div>

          <div class="p-6">
            <slot />
          </div>

          <div v-if="$slots.footer" class="border-t px-6 py-4">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  width?: string;
  closeOnOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: '32rem',
  closeOnOverlay: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed(() => props.modelValue);

const close = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
