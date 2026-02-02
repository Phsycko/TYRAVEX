<script setup lang="ts">
type BadgeVariant = 'success' | 'danger' | 'warning' | 'neutral' | 'primary' | 'secondary'

interface Props {
  variant?: BadgeVariant
  dot?: boolean
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  dot: false,
  pulse: false
})

const variantClasses: Record<BadgeVariant, string> = {
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-warning',
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary'
}
</script>

<template>
  <span :class="variantClasses[variant]">
    <span
      v-if="dot"
      class="w-1.5 h-1.5 rounded-full"
      :class="[
        variant === 'success' ? 'bg-tyravex-success' : '',
        variant === 'danger' ? 'bg-tyravex-danger' : '',
        variant === 'warning' ? 'bg-tyravex-warning' : '',
        variant === 'neutral' ? 'bg-tyravex-gray-400' : '',
        variant === 'primary' ? 'bg-tyravex-primary-light' : '',
        variant === 'secondary' ? 'bg-tyravex-secondary' : '',
        pulse ? 'animate-pulse-live' : ''
      ]"
    />
    <slot />
  </span>
</template>
