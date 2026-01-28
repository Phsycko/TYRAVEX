<template>
  <div class="timeline-panel">
    <div class="timeline-header">
      <h3 class="timeline-title">{{ title }}</h3>
    </div>
    <div class="timeline-content">
      <svg class="timeline-svg" :width="width" :height="height">
        <!-- Timeline axis -->
        <line 
          :x1="padding" 
          :y1="height / 2" 
          :x2="width - padding" 
          :y2="height / 2" 
          stroke="var(--color-border-strong)" 
          stroke-width="2"
        />
        
        <!-- Event markers (placeholder) -->
        <g v-for="(event, index) in events" :key="index">
          <circle 
            :cx="getEventX(index)" 
            :cy="height / 2" 
            :r="6" 
            :fill="getEventColor(event.type)"
            stroke="var(--color-bg-secondary)"
            stroke-width="2"
          />
          <text 
            :x="getEventX(index)" 
            :y="height / 2 - 20" 
            text-anchor="middle" 
            fill="var(--color-text-secondary)"
            font-size="12"
            font-family="var(--font-family-mono)"
          >
            {{ event.label }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TimelineEvent {
  label: string
  type: 'normal' | 'warning' | 'critical'
}

interface Props {
  title?: string
  events?: TimelineEvent[]
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'LÍNEA TEMPORAL',
  events: () => [],
  width: 800,
  height: 120
})

const padding = 40

function getEventX(index: number): number {
  const totalEvents = props.events.length
  if (totalEvents === 0) return 0
  const availableWidth = props.width - (padding * 2)
  return padding + (availableWidth / (totalEvents - 1 || 1)) * index
}

function getEventColor(type: string): string {
  switch (type) {
    case 'critical':
      return 'var(--color-status-critical)'
    case 'warning':
      return 'var(--color-status-warning)'
    default:
      return 'var(--color-status-normal)'
  }
}
</script>

<style scoped>
.timeline-panel {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.timeline-header {
  margin-bottom: var(--space-4);
}

.timeline-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-content {
  overflow-x: auto;
}

.timeline-svg {
  display: block;
}
</style>
