<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'active' | 'ready' | 'idle' | 'warning' | 'error' | 'offline' | string
  pulse?: boolean
  label?: string
  size?: 'sm' | 'md'
}>()

const statusClasses = computed(() => {
  switch (props.status) {
    case 'active': return 'bg-success text-success'
    case 'ready': return 'bg-success text-success'
    case 'idle': return 'bg-warning text-warning'
    case 'warning': return 'bg-warning text-warning'
    case 'error': return 'bg-danger text-danger'
    case 'offline': return 'bg-text-tertiary text-text-tertiary'
    default: return 'bg-text-tertiary text-text-tertiary'
  }
})

const dotSize = computed(() => props.size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="relative flex" :class="dotSize">
      <span 
        v-if="pulse || status === 'active' || status === 'warning' || status === 'error'" 
        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        :class="statusClasses.split(' ')[0]"
      ></span>
      <span 
        class="relative inline-flex rounded-full"
        :class="[dotSize, statusClasses.split(' ')[0]]"
      ></span>
    </span>
    <span 
      v-if="label" 
      class="font-mono font-medium tracking-wide uppercase"
      :class="[
        size === 'sm' ? 'text-[10px]' : 'text-xs',
        statusClasses.split(' ')[1]
      ]"
    >
      {{ label }}
    </span>
  </div>
</template>
