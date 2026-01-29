<template>
  <aside class="context-panel bg-tyravex-bg-secondary border-r border-tyravex-border p-6 h-full overflow-y-auto custom-scrollbar">
    <div class="space-y-6">
      <!-- Active Domain -->
      <div class="context-section">
        <h3 class="text-xs font-mono text-tyravex-text-muted uppercase tracking-wider mb-3">
          Dominio Activo
        </h3>
        <div class="bg-tyravex-bg-tertiary border border-tyravex-border rounded-lg p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-tyravex-text-primary">
              {{ activeDomain.name }}
            </span>
            <div 
              class="w-2 h-2 rounded-full"
              :class="domainStatusClass"
            ></div>
          </div>
          <p class="text-xs text-tyravex-text-secondary">
            {{ activeDomain.description }}
          </p>
        </div>
      </div>

      <!-- Ongoing Operations -->
      <div class="context-section">
        <h3 class="text-xs font-mono text-tyravex-text-muted uppercase tracking-wider mb-3">
          Operaciones en Curso
        </h3>
        <div class="space-y-2">
          <div 
            v-for="operation in activeOperations"
            :key="operation.id"
            class="bg-tyravex-bg-tertiary border border-tyravex-border rounded p-2"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-tyravex-text-primary">{{ operation.name }}</span>
              <span 
                class="text-xs font-mono"
                :class="operationStatusClass(operation.status)"
              >
                {{ operation.status }}
              </span>
            </div>
            <div 
              v-if="operation.progress !== undefined"
              class="w-full bg-tyravex-bg-primary rounded-full h-1"
            >
              <div 
                class="bg-tyravex-accent-cyan h-1 rounded-full transition-all duration-500"
                :style="{ width: `${operation.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Level -->
      <div class="context-section">
        <h3 class="text-xs font-mono text-tyravex-text-muted uppercase tracking-wider mb-3">
          Nivel de Riesgo
        </h3>
        <div 
          class="rounded-lg p-3 border"
          :class="riskLevelClasses"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-mono font-bold">{{ riskLevel }}</span>
            <div class="flex space-x-1">
              <div 
                v-for="i in 4"
                :key="i"
                class="w-1.5 h-4 rounded-full"
                :class="i <= riskLevelValue ? riskBarClass : 'bg-tyravex-bg-primary'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/store/systemStore'
import type { RiskLevel } from '@/types/types'

const systemStore = useSystemStore()

const activeDomain = computed(() => systemStore.currentDomain)
const activeOperations = computed(() => systemStore.activeOperations)
const riskLevel = computed<RiskLevel>(() => systemStore.currentRisk)

const domainStatusClass = computed(() => {
  switch (activeDomain.value.status) {
    case 'ONLINE':
      return 'bg-tyravex-status-online'
    case 'ALERT':
      return 'bg-tyravex-status-alert'
    case 'CRITICAL':
      return 'bg-tyravex-status-critical'
    default:
      return 'bg-tyravex-text-muted'
  }
})

const operationStatusClass = (status: string) => {
  switch (status) {
    case 'running':
      return 'text-tyravex-accent-cyan'
    case 'pending':
      return 'text-tyravex-accent-yellow'
    case 'completed':
      return 'text-tyravex-accent-green'
    case 'failed':
      return 'text-tyravex-accent-red'
    default:
      return 'text-tyravex-text-muted'
  }
}

const riskLevelValue = computed(() => {
  switch (riskLevel.value) {
    case 'LOW':
      return 1
    case 'MEDIUM':
      return 2
    case 'HIGH':
      return 3
    case 'CRITICAL':
      return 4
    default:
      return 0
  }
})

const riskLevelClasses = computed(() => {
  switch (riskLevel.value) {
    case 'LOW':
      return 'bg-tyravex-status-green/10 border-tyravex-status-green/30 text-tyravex-status-green'
    case 'MEDIUM':
      return 'bg-tyravex-status-alert/10 border-tyravex-status-alert/30 text-tyravex-status-alert'
    case 'HIGH':
      return 'bg-tyravex-accent-orange/10 border-tyravex-accent-orange/30 text-tyravex-accent-orange'
    case 'CRITICAL':
      return 'bg-tyravex-status-critical/10 border-tyravex-status-critical/30 text-tyravex-status-critical'
    default:
      return 'bg-tyravex-bg-tertiary border-tyravex-border text-tyravex-text-muted'
  }
})

const riskBarClass = computed(() => {
  switch (riskLevel.value) {
    case 'LOW':
      return 'bg-tyravex-status-green'
    case 'MEDIUM':
      return 'bg-tyravex-status-alert'
    case 'HIGH':
      return 'bg-tyravex-accent-orange'
    case 'CRITICAL':
      return 'bg-tyravex-status-critical'
    default:
      return 'bg-tyravex-text-muted'
  }
})
</script>

<style scoped>
.context-panel {
  width: 280px;
  min-width: 280px;
}

.context-section {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
