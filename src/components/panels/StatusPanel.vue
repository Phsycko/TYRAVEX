<template>
  <div class="status-panel">
    <div class="status-header">
      <h3 class="status-title">ESTADO DEL SISTEMA</h3>
      <div class="status-indicator" :style="{ backgroundColor: systemStore.statusColor }"></div>
    </div>
    
    <div class="status-items">
      <div class="status-item">
        <span class="status-label">ESTADO</span>
        <span class="status-value" :style="{ color: systemStore.statusColor }">
          {{ systemStore.status }}
        </span>
      </div>
      
      <div class="status-item">
        <span class="status-label">UPTIME</span>
        <span class="status-value text-mono">{{ systemStore.uptimeFormatted }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">ÚLTIMA SYNC</span>
        <span class="status-value text-mono">{{ formatDateTime(systemStore.lastSync) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'

const systemStore = useSystemStore()

function formatDateTime(date: Date): string {
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.status-panel {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-default);
}

.status-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
}

.status-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style>
