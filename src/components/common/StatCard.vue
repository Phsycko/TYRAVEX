<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  label: string
  value: string | number
  subValue?: string
  trend?: number // Percentage change
  trendLabel?: string
  status?: 'positive' | 'negative' | 'neutral'
  loading?: boolean
}>()

const statusColor = computed(() => {
  if (props.status) {
    if (props.status === 'positive') return 'text-success'
    if (props.status === 'negative') return 'text-danger'
    return 'text-text-tertiary'
  }
  
  // Auto-detect based on trend
  if (props.trend && props.trend > 0) return 'text-success'
  if (props.trend && props.trend < 0) return 'text-danger'
  return 'text-text-tertiary'
})

const TrendIcon = computed(() => {
  if (props.trend && props.trend > 0) return ArrowUpIcon
  if (props.trend && props.trend < 0) return ArrowDownIcon
  return MinusIcon
})
</script>

<template>
  <div class="card p-5 flex flex-col justify-between h-full bg-bg-secondary border-border-medium hover:border-border-accent transition-colors group">
    <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-mono text-text-tertiary uppercase tracking-wider group-hover:text-text-secondary transition-colors">{{ label }}</span>
        <div v-if="trend !== undefined" class="flex items-center gap-1 text-xs font-medium bg-bg-tertiary px-1.5 py-0.5 rounded" :class="statusColor">
            <component :is="TrendIcon" class="w-3 h-3" />
            <span>{{ Math.abs(trend) }}%</span>
        </div>
    </div>
    
    <div v-if="loading" class="animate-pulse space-y-2">
        <div class="h-8 bg-bg-tertiary rounded w-1/2"></div>
        <div class="h-4 bg-bg-tertiary rounded w-1/3"></div>
    </div>
    
    <div v-else>
        <div class="text-2xl font-bold text-text-primary font-mono tracking-tight">{{ value }}</div>
        <div v-if="subValue || trendLabel" class="text-xs text-text-tertiary mt-1">
            <span v-if="subValue">{{ subValue }}</span>
            <span v-if="trendLabel" class="ml-1">{{ trendLabel }}</span>
        </div>
    </div>
  </div>
</template>
