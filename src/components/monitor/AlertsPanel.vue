<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/common/Badge.vue'

interface Alert {
  id: string
  severidad: 'critical' | 'high' | 'medium' | 'low'
  titulo: string
  descripcion: string
  fuente: string
  tiempo: string
  alcance: number
  engagement: number
  sentimiento: number
}

interface Props {
  alerts: Alert[]
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3
})

const emit = defineEmits<{
  viewDetails: [alert: Alert]
  createResponse: [alert: Alert]
  markViewed: [alert: Alert]
  viewAll: []
}>()

const displayedAlerts = computed(() => {
  return props.alerts.slice(0, props.limit)
})

const getSeverityIcon = (severidad: string) => {
  switch (severidad) {
    case 'critical': return '🔴'
    case 'high': return '🟡'
    case 'medium': return '🟢'
    default: return '🔵'
  }
}

const getSeverityLabel = (severidad: string) => {
  switch (severidad) {
    case 'critical': return 'CRÍTICO'
    case 'high': return 'ALTO'
    case 'medium': return 'MEDIO'
    default: return 'BAJO'
  }
}

const getSeverityClass = (severidad: string) => {
  switch (severidad) {
    case 'critical': return 'severity-critical'
    case 'high': return 'severity-high'
    case 'medium': return 'severity-medium'
    default: return 'severity-low'
  }
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="alerts-panel">
    <div class="panel-header">
      <h3 class="panel-title">
        ⚠️ Alertas Críticas
        <span class="alert-count">({{ alerts.length }})</span>
      </h3>
      <button class="btn-link" @click="emit('viewAll')">
        Ver todas →
      </button>
    </div>

    <div class="alerts-list">
      <div
        v-for="alert in displayedAlerts"
        :key="alert.id"
        class="alert-card"
        :class="getSeverityClass(alert.severidad)"
      >
        <div class="alert-header">
          <div class="alert-severity">
            <span class="severity-icon">{{ getSeverityIcon(alert.severidad) }}</span>
            <span class="severity-label">{{ getSeverityLabel(alert.severidad) }}</span>
          </div>
          <span class="alert-time">{{ alert.tiempo }}</span>
        </div>

        <h4 class="alert-title">{{ alert.titulo }}</h4>
        <p class="alert-description">{{ alert.descripcion }}</p>

        <div class="alert-metrics">
          <div class="metric-item">
            <span class="metric-label">Sentimiento:</span>
            <span 
              class="metric-value"
              :class="alert.sentimiento < 0 ? 'negative' : 'positive'"
            >
              {{ alert.sentimiento > 0 ? '+' : '' }}{{ alert.sentimiento }}%
            </span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Engagement:</span>
            <span class="metric-value">{{ formatNumber(alert.engagement) }} reacciones</span>
          </div>
        </div>

        <div class="alert-actions">
          <button class="btn-sm btn-outline" @click="emit('viewDetails', alert)">
            Ver detalles
          </button>
          <button class="btn-sm btn-primary" @click="emit('createResponse', alert)">
            Crear respuesta
          </button>
          <button class="btn-sm btn-ghost" @click="emit('markViewed', alert)">
            Marcar como vista
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alerts-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-count {
  font-size: 14px;
  color: #9AA0A6;
  font-weight: 500;
}

.btn-link {
  background: none;
  border: none;
  color: #4A90E2;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.btn-link:hover {
  color: #5BA3F5;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.alert-card {
  border-left: 4px solid;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  padding: 16px;
  transition: all 0.2s;
}

.alert-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

.alert-card.severity-critical {
  border-left-color: #D32F2F;
  background: rgba(211, 47, 47, 0.05);
}

.alert-card.severity-high {
  border-left-color: #FA8C16;
  background: rgba(250, 140, 22, 0.05);
}

.alert-card.severity-medium {
  border-left-color: #52C41A;
  background: rgba(82, 196, 26, 0.05);
}

.alert-card.severity-low {
  border-left-color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

.alert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.alert-severity {
  display: flex;
  align-items: center;
  gap: 6px;
}

.severity-icon {
  font-size: 14px;
}

.severity-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #E8EAED;
}

.alert-time {
  font-size: 12px;
  color: #9AA0A6;
}

.alert-title {
  font-size: 15px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 8px 0;
}

.alert-description {
  font-size: 13px;
  color: #9AA0A6;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.alert-metrics {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.metric-label {
  color: #9AA0A6;
}

.metric-value {
  font-weight: 600;
  font-family: 'Roboto Mono', monospace;
  color: #E8EAED;
}

.metric-value.positive {
  color: #52C41A;
}

.metric-value.negative {
  color: #D32F2F;
}

.alert-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #E8EAED;
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  background: #4A90E2;
  color: white;
}

.btn-primary:hover {
  background: #5BA3F5;
}

.btn-ghost {
  background: transparent;
  color: #9AA0A6;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
}
</style>
