<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max?: number
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'primary',
  showLabel: false,
  size: 'md',
  animated: false
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
}

const variantClasses = {
  primary: 'bg-tyravex-secondary',
  success: 'bg-tyravex-success',
  warning: 'bg-tyravex-warning',
  danger: 'bg-tyravex-danger'
}
</script>

<template>
  <div class="w-full">
    <div
      v-if="showLabel"
      class="flex items-center justify-between mb-1"
    >
      <slot name="label" />
      <span class="text-sm font-mono text-tyravex-text-muted">
        {{ percentage.toFixed(1) }}%
      </span>
    </div>

    <div
      class="w-full bg-tyravex-bg-tertiary rounded-full overflow-hidden"
      :class="sizeClasses[size]"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="[
          variantClasses[variant],
          animated ? 'animate-pulse' : ''
        ]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
