<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  type?: 'success' | 'warning' | 'danger' | 'info'
  title: string
  message?: string
  dismissible?: boolean
}>()

const emit = defineEmits(['dismiss'])

const styles = computed(() => {
  switch (props.type) {
    case 'success': return {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      icon: CheckCircleIcon
    }
    case 'warning': return {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: ExclamationTriangleIcon
    }
    case 'danger': return {
      bg: 'bg-danger/10',
      border: 'border-danger/20',
      text: 'text-danger',
      icon: XCircleIcon
    }
    case 'info':
    default: return {
      bg: 'bg-info/10',
      border: 'border-info/20',
      text: 'text-info',
      icon: InformationCircleIcon
    }
  }
})
</script>

<template>
  <div 
    class="rounded-md p-4 border flex items-start gap-3"
    :class="[styles.bg, styles.border]"
  >
    <component :is="styles.icon" class="h-5 w-5 flex-shrink-0" :class="styles.text" />
    
    <div class="flex-1">
      <h3 class="text-sm font-medium" :class="styles.text">{{ title }}</h3>
      <div v-if="message" class="mt-1 text-sm opacity-90" :class="styles.text">
        {{ message }}
      </div>
    </div>

    <button 
      v-if="dismissible" 
      @click="emit('dismiss')"
      class="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
      :class="[styles.text, `hover:${styles.bg}`]"
    >
      <XMarkIcon class="h-5 w-5" />
    </button>
  </div>
</template>
