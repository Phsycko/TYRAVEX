<template>
  <div class="metric-panel" :class="`metric-panel-${status}`">
    <div class="metric-header">
      <span class="metric-label">{{ label }}</span>
      <div class="metric-status-indicator" :style="{ backgroundColor: statusColor }"></div>
    </div>
    <div class="metric-value">{{ value }}</div>
    <div v-if="subtitle" class="metric-subtitle">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type MetricStatus = 'normal' | 'warning' | 'critical'

interface Props {
  label: string
  value: string | number
  subtitle?: string
  status?: MetricStatus
}

const props = withDefaults(defineProps<Props>(), {
  status: 'normal'
})

const statusColor = computed(() => {
  switch (props.status) {
    case 'normal':
      return 'var(--color-status-normal)'
    case 'warning':
      return 'var(--color-status-warning)'
    case 'critical':
      return 'var(--color-status-critical)'
    default:
      return 'var(--color-text-tertiary)'
  }
})
</script>

<style scoped>
.metric-panel {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.metric-panel:hover {
  border-color: var(--color-border-strong);
  background-color: var(--color-bg-tertiary);
}

.metric-panel-critical {
  border-color: var(--color-status-critical);
}

.metric-panel-warning {
  border-color: var(--color-status-warning);
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.metric-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.metric-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  color: var(--color-text-primary);
  line-height: 1;
}

.metric-subtitle {
  margin-top: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}
</style>
