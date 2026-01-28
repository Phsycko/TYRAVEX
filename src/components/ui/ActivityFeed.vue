<template>
  <div class="activity-feed">
    <div class="feed-header">
      <h3 class="feed-title">{{ title }}</h3>
    </div>
    <div class="feed-content">
      <div v-for="event in events" :key="event.id" class="feed-item">
        <div class="feed-item-indicator" :style="{ backgroundColor: getEventColor(event.type) }"></div>
        <div class="feed-item-content">
          <div class="feed-item-header">
            <span class="feed-item-type">{{ event.type }}</span>
            <span class="feed-item-time text-mono">{{ formatTime(event.timestamp) }}</span>
          </div>
          <p class="feed-item-message">{{ event.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ActivityEvent {
  id: string
  type: string
  message: string
  timestamp: Date
  severity?: 'normal' | 'warning' | 'critical'
}

interface Props {
  title?: string
  events: ActivityEvent[]
}

withDefaults(defineProps<Props>(), {
  title: 'ACTIVIDAD DEL SISTEMA'
})

function getEventColor(type: string): string {
  const lowerType = type.toLowerCase()
  if (lowerType.includes('error') || lowerType.includes('crítico')) {
    return 'var(--color-status-critical)'
  }
  if (lowerType.includes('advertencia') || lowerType.includes('warning')) {
    return 'var(--color-status-warning)'
  }
  return 'var(--color-status-normal)'
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.activity-feed {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.feed-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-default);
}

.feed-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feed-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-height: 400px;
  overflow-y: auto;
}

.feed-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.feed-item:hover {
  border-color: var(--color-border-strong);
  background-color: var(--color-bg-elevated);
}

.feed-item-indicator {
  width: 4px;
  min-width: 4px;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 6px currentColor;
}

.feed-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.feed-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feed-item-type {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feed-item-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.feed-item-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}
</style>
