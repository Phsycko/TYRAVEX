<template>
  <aside 
    v-if="visible"
    class="intel-panel bg-tyravex-bg-secondary border-l border-tyravex-border p-6 h-full overflow-y-auto custom-scrollbar"
  >
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-mono text-tyravex-text-muted uppercase tracking-wider">
          Intel Contextual
        </h2>
        <div class="w-2 h-2 rounded-full bg-tyravex-accent-cyan animate-pulse"></div>
      </div>

      <!-- Metrics -->
      <div class="intel-section">
        <h3 class="text-xs font-mono text-tyravex-accent-blue mb-3">Métricas Relevantes</h3>
        <div class="space-y-3">
          <div 
            v-for="metric in relevantMetrics"
            :key="metric.id"
            class="bg-tyravex-bg-tertiary border border-tyravex-border rounded-lg p-3"
          >
            <div class="flex items-start justify-between mb-2">
              <span class="text-xs text-tyravex-text-secondary">{{ metric.name }}</span>
              <div class="flex items-center space-x-1">
                <span 
                  class="text-lg font-mono font-bold"
                  :class="metricValueClass(metric.status)"
                >
                  {{ metric.value }}
                </span>
                <span 
                  v-if="metric.trend"
                  class="text-xs"
                  :class="trendClass(metric.trend)"
                >
                  {{ trendIcon(metric.trend) }}
                </span>
              </div>
            </div>
            <p class="text-xs text-tyravex-text-primary leading-relaxed">
              {{ metric.interpretation }}
            </p>
          </div>
        </div>
      </div>

      <!-- Events -->
      <div class="intel-section">
        <h3 class="text-xs font-mono text-tyravex-accent-blue mb-3">Eventos Correlacionados</h3>
        <div class="space-y-2">
          <div 
            v-for="event in relevantEvents"
            :key="event.id"
            class="bg-tyravex-bg-tertiary border-l-2 rounded p-2"
            :class="eventBorderClass(event.type)"
          >
            <div class="flex items-start justify-between mb-1">
              <span 
                class="text-xs font-medium"
                :class="eventTypeClass(event.type)"
              >
                {{ event.type.toUpperCase() }}
              </span>
              <span class="text-xs text-tyravex-text-muted font-mono">
                {{ formatEventTime(event.timestamp) }}
              </span>
            </div>
            <p class="text-xs text-tyravex-text-primary">{{ event.description }}</p>
            <span v-if="event.node" class="text-xs text-tyravex-accent-cyan font-mono">
              {{ event.node }}
            </span>
          </div>
        </div>
      </div>

      <!-- Mini Graph Placeholder -->
      <div class="intel-section">
        <h3 class="text-xs font-mono text-tyravex-accent-blue mb-3">Tendencia</h3>
        <div class="bg-tyravex-bg-tertiary border border-tyravex-border rounded-lg p-4 h-32 flex items-end justify-between space-x-1">
          <div 
            v-for="i in 20"
            :key="i"
            class="flex-1 bg-tyravex-accent-cyan/30 rounded-t transition-all duration-300 hover:bg-tyravex-accent-cyan/50"
            :style="{ height: `${Math.random() * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/store/systemStore'
import { useConversationStore } from '@/store/conversationStore'

const systemStore = useSystemStore()
const conversationStore = useConversationStore()

const visible = computed(() => conversationStore.context.showIntelPanel)

const relevantMetrics = computed(() => {
  const metricIds = conversationStore.context.relevantMetrics
  return systemStore.relevantMetrics(metricIds)
})

const relevantEvents = computed(() => {
  const eventIds = conversationStore.context.relevantEvents
  return systemStore.relevantEvents(eventIds)
})

const metricValueClass = (status?: string) => {
  switch (status) {
    case 'normal':
      return 'text-tyravex-status-online'
    case 'warning':
      return 'text-tyravex-status-alert'
    case 'critical':
      return 'text-tyravex-status-critical'
    default:
      return 'text-tyravex-text-primary'
  }
}

const trendClass = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'text-tyravex-accent-red'
    case 'down':
      return 'text-tyravex-accent-green'
    case 'stable':
      return 'text-tyravex-text-muted'
    default:
      return 'text-tyravex-text-muted'
  }
}

const trendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return '↑'
    case 'down':
      return '↓'
    case 'stable':
      return '→'
    default:
      return ''
  }
}

const eventBorderClass = (type: string) => {
  switch (type) {
    case 'info':
      return 'border-tyravex-accent-blue'
    case 'warning':
      return 'border-tyravex-status-alert'
    case 'critical':
      return 'border-tyravex-status-critical'
    default:
      return 'border-tyravex-border'
  }
}

const eventTypeClass = (type: string) => {
  switch (type) {
    case 'info':
      return 'text-tyravex-accent-blue'
    case 'warning':
      return 'text-tyravex-status-alert'
    case 'critical':
      return 'text-tyravex-status-critical'
    default:
      return 'text-tyravex-text-muted'
  }
}

const formatEventTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  return `${hours}h`
}
</script>

<style scoped>
.intel-panel {
  width: 320px;
  min-width: 320px;
  animation: slideIn 0.4s ease-out;
}

.intel-section {
  animation: fadeIn 0.5s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
