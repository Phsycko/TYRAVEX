<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Props {
  show: boolean
  type?: ToastType
  title: string
  message?: string
  duration?: number
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
  closable: true
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

const typeConfig: Record<ToastType, { icon: string; class: string }> = {
  success: {
    icon: 'M5 13l4 4L19 7',
    class: 'bg-tyravex-success/20 border-tyravex-success/30 text-tyravex-success'
  },
  error: {
    icon: 'M6 18L18 6M6 6l12 12',
    class: 'bg-tyravex-danger/20 border-tyravex-danger/30 text-tyravex-danger'
  },
  warning: {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    class: 'bg-tyravex-warning/20 border-tyravex-warning/30 text-tyravex-warning'
  },
  info: {
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    class: 'bg-tyravex-primary/20 border-tyravex-primary/30 text-tyravex-gray-200'
  }
}

let timer: ReturnType<typeof setTimeout>

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      emit('close')
    }, props.duration)
  }
}

watch(() => props.show, (val) => {
  visible.value = val
  if (val) {
    startTimer()
  } else {
    clearTimeout(timer)
  }
})

onMounted(() => {
  if (props.show) {
    visible.value = true
    startTimer()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-4 right-4 z-50 w-80 border rounded-card shadow-lg p-4"
        :class="typeConfig[type].class"
      >
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="typeConfig[type].icon" />
          </svg>

          <div class="flex-1 min-w-0">
            <p class="font-medium">{{ title }}</p>
            <p v-if="message" class="text-sm opacity-80 mt-1">{{ message }}</p>
          </div>

          <button
            v-if="closable"
            class="p-1 rounded opacity-60 hover:opacity-100 transition-opacity"
            @click="emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
