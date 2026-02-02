<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const isPositive = (change: number) => change > 0
const formatChange = (change: number) => {
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}
</script>

<template>
  <div class="stat-card">
    <div class="flex items-start justify-between">
      <span class="stat-label">{{ label }}</span>
      <span v-if="icon" class="text-tyravex-text-muted text-xl">{{ icon }}</span>
    </div>

    <div v-if="loading" class="mt-2">
      <div class="skeleton h-8 w-24 rounded" />
      <div class="skeleton h-4 w-16 rounded mt-2" />
    </div>

    <template v-else>
      <div class="stat-value mt-1">{{ value }}</div>

      <div
        v-if="change !== undefined"
        class="stat-change"
        :class="isPositive(change) ? 'positive' : 'negative'"
      >
        <svg
          v-if="isPositive(change)"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <svg
          v-else
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span>{{ formatChange(change) }}</span>
        <span v-if="changeLabel" class="text-tyravex-text-muted ml-1">{{ changeLabel }}</span>
      </div>
    </template>
  </div>
</template>
