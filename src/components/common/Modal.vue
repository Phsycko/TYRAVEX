<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true
})

const emit = defineEmits<{
  close: []
}>()

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

const close = () => {
  if (props.closable) {
    emit('close')
  }
}

watch(() => props.show, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="modal-backdrop" @click="close" />

        <div
          class="relative w-full bg-tyravex-bg-secondary border border-tyravex-border rounded-card shadow-2xl z-10"
          :class="sizeClasses[size]"
        >
          <div v-if="title || closable" class="modal-header">
            <h3 v-if="title" class="text-lg font-semibold text-tyravex-text-primary">
              {{ title }}
            </h3>
            <button
              v-if="closable"
              class="p-1 rounded-lg text-tyravex-text-muted hover:text-tyravex-text-primary hover:bg-tyravex-bg-tertiary transition-colors ml-auto"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="modal-body custom-scrollbar max-h-[70vh] overflow-y-auto">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-backdrop,
.modal-leave-to .modal-backdrop {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95);
  opacity: 0;
}
</style>
