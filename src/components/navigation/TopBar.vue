<template>
  <header class="topbar">
    <div class="topbar-content">
      <!-- Logo -->
      <div class="topbar-logo">
        <span class="logo-text">TYRAVEX</span>
      </div>

      <!-- System Status -->
      <div class="topbar-status">
        <div class="status-indicator" :style="{ backgroundColor: systemStore.statusColor }"></div>
        <span class="status-text">{{ systemStore.status }}</span>
      </div>

      <!-- Operator Info -->
      <div class="topbar-operator">
        <div class="operator-info">
          <span class="operator-id text-mono">{{ operatorStore.operator.id }}</span>
          <span class="operator-role">{{ operatorStore.operator.role }}</span>
        </div>
        <div class="operator-clearance" :style="{ color: operatorStore.clearanceColor }">
          {{ operatorStore.clearanceLevel }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { useOperatorStore } from '@/store/operator'

const systemStore = useSystemStore()
const operatorStore = useOperatorStore()
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-default);
  z-index: var(--z-fixed);
}

.topbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--space-6);
}

.topbar-logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  color: var(--color-text-primary);
  font-family: var(--font-family-mono);
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.status-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-mono);
  letter-spacing: 0.05em;
}

.topbar-operator {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.operator-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-1);
}

.operator-id {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.operator-role {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.operator-clearance {
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-mono);
  letter-spacing: 0.05em;
}
</style>
