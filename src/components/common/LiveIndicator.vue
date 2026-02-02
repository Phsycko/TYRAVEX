<script setup lang="ts">
interface Props {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  text: 'EN VIVO',
  size: 'md'
})

const sizeClasses = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-3 py-1',
  lg: 'text-sm px-4 py-1.5'
}

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5'
}
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full bg-tyravex-danger/20 text-tyravex-danger font-bold uppercase tracking-wide"
    :class="sizeClasses[size]"
  >
    <span
      class="rounded-full bg-tyravex-danger animate-pulse-live"
      :class="dotSizes[size]"
    />
    {{ text }}
  </span>
</template>
