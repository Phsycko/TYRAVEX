<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: any
  loading?: boolean
  disabled?: boolean
  block?: boolean
}>()

const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-accent hover:bg-opacity-90 text-white shadow-glow'
    case 'secondary': return 'bg-bg-tertiary hover:bg-bg-secondary text-text-primary border border-border-medium hover:border-text-secondary'
    case 'danger': return 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 hover:border-danger/50'
    case 'outline': return 'bg-transparent border border-border-medium hover:border-text-secondary text-text-secondary hover:text-text-primary'
    case 'ghost': return 'bg-transparent hover:bg-bg-tertiary text-text-secondary hover:text-text-primary'
    default: return 'bg-accent hover:bg-opacity-90 text-white shadow-glow'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-1.5 text-xs rounded-sm'
    case 'lg': return 'px-6 py-3 text-base rounded'
    default: return 'px-4 py-2 text-sm rounded'
  }
})

const widthClasses = computed(() => props.block ? 'w-full' : '')
</script>

<template>
  <button 
    :class="[baseClasses, variantClasses, sizeClasses, widthClasses]"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <component v-if="icon && !loading" :is="icon" class="w-4 h-4" />
    <slot />
  </button>
</template>
