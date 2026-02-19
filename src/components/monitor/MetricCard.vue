<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number | string
  unit?: string
  change?: number
  trend?: number[]
  breakdown?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  change: 0,
  trend: () => [],
  breakdown: '',
  icon: ''
})

const emit = defineEmits<{
  click: []
}>()

const changeColor = computed(() => {
  if (!props.change) return 'text-tyravex-text-muted'
  return props.change > 0 ? 'text-tyravex-success' : 'text-tyravex-danger'
})

const changeIcon = computed(() => {
  if (!props.change) return '→'
  return props.change > 0 ? '↑' : '↓'
})

const sparklinePoints = computed(() => {
  if (!props.trend || props.trend.length === 0) return ''
  
  const max = Math.max(...props.trend)
  const min = Math.min(...props.trend)
  const range = max - min || 1
  
  const width = 100
  const height = 30
  const step = width / (props.trend.length - 1)
  
  return props.trend
    .map((value, index) => {
      const x = index * step
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')
})

const formatValue = (val: number | string): string => {
  if (typeof val === 'string') return val
  if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M'
  if (val >= 1000) return (val / 1000).toFixed(1) + 'K'
  return val.toString()
}
</script>

<template>
  <div 
    class="metric-card"
    @click="emit('click')"
  >
    <div class="metric-header">
      <h3 class="metric-title">{{ title }}</h3>
      <div v-if="change !== 0" class="metric-change" :class="changeColor">
        <span class="change-icon">{{ changeIcon }}</span>
        <span class="change-value">{{ Math.abs(change).toFixed(1) }}%</span>
      </div>
    </div>

    <div class="metric-value">
      <span class="value-number">{{ formatValue(value) }}</span>
      <span v-if="unit" class="value-unit">{{ unit }}</span>
    </div>

    <div v-if="trend && trend.length > 0" class="metric-sparkline">
      <svg width="100" height="30" viewBox="0 0 100 30" preserveAspectRatio="none">
        <polyline
          :points="sparklinePoints"
          fill="none"
          :stroke="change >= 0 ? '#52C41A' : '#D32F2F'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <p v-if="breakdown" class="metric-breakdown">{{ breakdown }}</p>
  </div>
</template>

<style scoped>
.metric-card {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.metric-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: #1E2838;
  transform: translateY(-2px);
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.metric-title {
  font-size: 13px;
  font-weight: 500;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Roboto Mono', monospace;
}

.change-icon {
  font-size: 14px;
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
}

.value-number {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Roboto Mono', monospace;
  color: #E8EAED;
  line-height: 1;
}

.value-unit {
  font-size: 18px;
  font-weight: 500;
  color: #9AA0A6;
}

.metric-sparkline {
  margin-bottom: 8px;
  opacity: 0.7;
}

.metric-breakdown {
  font-size: 12px;
  color: #9AA0A6;
  margin: 0;
}
</style>
