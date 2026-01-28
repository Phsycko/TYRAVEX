<template>
  <nav class="sidenav">
    <div class="sidenav-content">
      <!-- Navigation Links -->
      <ul class="nav-list">
        <li v-for="route in routes" :key="route.path">
          <router-link 
            :to="route.path" 
            class="nav-link"
            :class="{ 'nav-link-active': isActive(route.path) }"
          >
            <span class="nav-icon">{{ route.icon }}</span>
            <span class="nav-label">{{ route.label }}</span>
          </router-link>
        </li>
      </ul>

      <!-- System Info -->
      <div class="sidenav-footer">
        <div class="system-info">
          <div class="info-row">
            <span class="info-label">UPTIME</span>
            <span class="info-value text-mono">{{ systemStore.uptimeFormatted }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">ÚLTIMA SYNC</span>
            <span class="info-value text-mono">{{ formatTime(systemStore.lastSync) }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/store/system'

const route = useRoute()
const systemStore = useSystemStore()

const routes = [
  { path: '/overview', label: 'VISIÓN GENERAL', icon: '◆' },
  { path: '/domains', label: 'DOMINIOS', icon: '◇' },
  { path: '/intelligence', label: 'INTELIGENCIA', icon: '◈' },
  { path: '/operations', label: 'OPERACIONES', icon: '◉' },
  { path: '/audit', label: 'AUDITORÍA', icon: '◎' },
  { path: '/settings', label: 'CONFIGURACIÓN', icon: '◐' }
]

function isActive(path: string): boolean {
  return route.path === path
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
.sidenav {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  bottom: 0;
  width: var(--sidenav-width);
  background-color: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border-default);
  z-index: var(--z-sticky);
}

.sidenav-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-6) 0;
}

.nav-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: 0 var(--space-4);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.02em;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-border-subtle);
}

.nav-link-active {
  color: var(--color-text-primary);
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-accent-primary);
}

.nav-icon {
  font-size: var(--font-size-lg);
  line-height: 1;
}

.nav-label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidenav-footer {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border-default);
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.info-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}
</style>
