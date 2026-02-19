<template>
  <div class="risk-dashboard">
    <!-- Header with live status -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="title">Control de Información</h1>
        <p class="subtitle">Gestión integral de huella digital y exposición de información</p>
      </div>
      <div class="header-right">
        <div class="live-indicator">
          <span class="pulse-dot"></span>
          <span class="live-text">EN VIVO</span>
        </div>
        <div class="risk-summary">
          <div class="risk-label">Riesgo Global</div>
          <div class="risk-value" :class="`risk-${getRiskLevel(metrics.globalRiskScore)}`">
            {{ metrics.globalRiskScore }}/100
          </div>
        </div>
        <div class="critical-count">
          <div class="count-label">Ítems Críticos</div>
          <div class="count-value">{{ metrics.criticalItems }}</div>
        </div>
      </div>
    </div>

    <!-- Main metrics cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">📊</span>
          <span class="metric-label">Total Ítems</span>
        </div>
        <div class="metric-value">{{ metrics.totalItems.toLocaleString() }}</div>
        <div class="metric-change positive">
          <span class="arrow">↑</span>
          <span>{{ metrics.newItemsThisWeek }} nuevos esta semana</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">🖼️</span>
          <span class="metric-label">Fotos/Videos</span>
        </div>
        <div class="metric-value">{{ (metrics.totalPhotos + metrics.totalVideos).toLocaleString() }}</div>
        <div class="metric-progress">
          <div class="progress-bar" :style="{ width: `${(metrics.totalPhotos + metrics.totalVideos) / metrics.totalItems * 100}%` }"></div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">📄</span>
          <span class="metric-label">Documentos</span>
        </div>
        <div class="metric-value">{{ metrics.totalDocuments.toLocaleString() }}</div>
        <div class="metric-progress">
          <div class="progress-bar" :style="{ width: `${metrics.totalDocuments / metrics.totalItems * 100}%` }"></div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-icon">💬</span>
          <span class="metric-label">Menciones</span>
        </div>
        <div class="metric-value">{{ metrics.totalMentions.toLocaleString() }}</div>
        <div class="metric-progress">
          <div class="progress-bar" :style="{ width: `${metrics.totalMentions / metrics.totalItems * 100}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Global risk panel -->
    <div class="risk-panel">
      <div class="panel-header">
        <h2>RIESGO GLOBAL Y ALERTAS</h2>
      </div>
      
      <div class="risk-gauge-container">
        <div class="gauge-label">Riesgo Global: {{ metrics.globalRiskScore }}/100</div>
        <div class="gauge-status" :class="`status-${getRiskLevel(metrics.globalRiskScore)}`">
          {{ getRiskLevelText(metrics.globalRiskScore) }}
        </div>
        
        <div class="gauge-bar">
          <div 
            class="gauge-fill" 
            :class="`fill-${getRiskLevel(metrics.globalRiskScore)}`"
            :style="{ width: `${metrics.globalRiskScore}%` }"
          ></div>
        </div>

        <div class="risk-breakdown">
          <div class="breakdown-item">
            <span class="label">Ítems Críticos:</span>
            <span class="value critical">{{ metrics.criticalItems }}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Ítems Monitoreados:</span>
            <span class="value monitored">{{ metrics.monitoredItems }}</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Ítems Controlados:</span>
            <span class="value controlled">{{ metrics.controlledItems.toLocaleString() }}</span>
          </div>
        </div>

        <div class="risk-trend">
          <span class="trend-icon" :class="metrics.riskTrend">
            {{ metrics.riskTrend === 'increasing' ? '📈' : metrics.riskTrend === 'decreasing' ? '📉' : '➡️' }}
          </span>
          <span class="trend-text">
            Tendencia: {{ getTrendText(metrics.riskTrend) }} 
            ({{ metrics.riskChange > 0 ? '+' : '' }}{{ metrics.riskChange }} puntos última semana)
          </span>
        </div>

        <div class="last-updated">
          Última actualización: {{ formatTimeAgo(metrics.lastUpdated) }}
        </div>
      </div>

      <!-- Active alerts -->
      <div class="alerts-section">
        <h3>ALERTAS ACTIVAS:</h3>
        <div class="alerts-list">
          <div class="alert-item critical">
            <span class="alert-icon">🔴</span>
            <span class="alert-text">Foto comprometedora en sitio no autorizado (hace 2 horas)</span>
          </div>
          <div class="alert-item critical">
            <span class="alert-icon">🔴</span>
            <span class="alert-text">Documento confidencial detectado en foro público (hace 4 horas)</span>
          </div>
          <div class="alert-item warning">
            <span class="alert-icon">🟠</span>
            <span class="alert-text">Mención negativa en artículo de alto alcance (hace 1 día)</span>
          </div>
        </div>

        <div class="alerts-actions">
          <button class="btn-secondary">Ver todas las alertas ({{ metrics.activeAlerts }})</button>
          <button class="btn-secondary">Configurar notificaciones</button>
        </div>
      </div>
    </div>

    <!-- Control status and category distribution -->
    <div class="status-grid">
      <div class="status-card">
        <h3>Estado de Control</h3>
        
        <div class="status-item">
          <div class="status-label">Controlado</div>
          <div class="status-bar">
            <div class="status-fill controlled" :style="{ width: `${(metrics.controlledItems / metrics.totalItems * 100)}%` }"></div>
          </div>
          <div class="status-percentage">{{ Math.round(metrics.controlledItems / metrics.totalItems * 100) }}%</div>
        </div>

        <div class="status-item">
          <div class="status-label">Monitoreado</div>
          <div class="status-bar">
            <div class="status-fill monitored" :style="{ width: `${(metrics.monitoredItems / metrics.totalItems * 100)}%` }"></div>
          </div>
          <div class="status-percentage">{{ Math.round(metrics.monitoredItems / metrics.totalItems * 100) }}%</div>
        </div>

        <div class="status-item">
          <div class="status-label">Crítico</div>
          <div class="status-bar">
            <div class="status-fill critical" :style="{ width: `${(metrics.criticalItems / metrics.totalItems * 100)}%` }"></div>
          </div>
          <div class="status-percentage">{{ Math.round(metrics.criticalItems / metrics.totalItems * 100) }}%</div>
        </div>
      </div>

      <div class="category-card">
        <h3>Distribución por Categoría</h3>
        
        <div class="category-list">
          <div class="category-item">
            <span class="category-label">Profesional</span>
            <div class="category-bar">
              <div class="category-fill" :style="{ width: `${(metrics.professionalItems / metrics.totalItems * 100)}%` }"></div>
            </div>
            <span class="category-percentage">{{ Math.round(metrics.professionalItems / metrics.totalItems * 100) }}%</span>
          </div>

          <div class="category-item">
            <span class="category-label">Personal</span>
            <div class="category-bar">
              <div class="category-fill" :style="{ width: `${(metrics.personalItems / metrics.totalItems * 100)}%` }"></div>
            </div>
            <span class="category-percentage">{{ Math.round(metrics.personalItems / metrics.totalItems * 100) }}%</span>
          </div>

          <div class="category-item">
            <span class="category-label">Político</span>
            <div class="category-bar">
              <div class="category-fill" :style="{ width: `${(metrics.politicalItems / metrics.totalItems * 100)}%` }"></div>
            </div>
            <span class="category-percentage">{{ Math.round(metrics.politicalItems / metrics.totalItems * 100) }}%</span>
          </div>

          <div class="category-item">
            <span class="category-label">Académico</span>
            <div class="category-bar">
              <div class="category-fill" :style="{ width: `${(metrics.academicItems / metrics.totalItems * 100)}%` }"></div>
            </div>
            <span class="category-percentage">{{ Math.round(metrics.academicItems / metrics.totalItems * 100) }}%</span>
          </div>

          <div class="category-item">
            <span class="category-label">Corporativo</span>
            <div class="category-bar">
              <div class="category-fill" :style="{ width: `${(metrics.corporateItems / metrics.totalItems * 100)}%` }"></div>
            </div>
            <span class="category-percentage">{{ Math.round(metrics.corporateItems / metrics.totalItems * 100) }}%</span>
          </div>
        </div>

        <button class="btn-link">Ver desglose completo</button>
      </div>
    </div>

    <!-- Sources table -->
    <div class="sources-panel">
      <h2>Fuentes Principales de Información</h2>
      
      <div class="sources-table">
        <div class="table-header">
          <div class="col-source">Fuente</div>
          <div class="col-items">Ítems</div>
          <div class="col-risk">Riesgo Prom.</div>
          <div class="col-updated">Última Act.</div>
          <div class="col-actions">Acciones</div>
        </div>

        <div class="table-body">
          <div v-for="source in sources" :key="source.id" class="table-row">
            <div class="col-source">{{ source.name }}</div>
            <div class="col-items">{{ source.itemCount }}</div>
            <div class="col-risk">
              <span class="risk-badge" :class="`risk-${getRiskLevel(source.averageRisk)}`">
                {{ getRiskIcon(source.averageRisk) }} {{ source.averageRisk }}/100
              </span>
            </div>
            <div class="col-updated">{{ formatTimeAgo(source.lastScanned) }}</div>
            <div class="col-actions">
              <button class="btn-action">{{ getSourceAction(source.averageRisk) }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="sources-actions">
        <button class="btn-secondary">Ver todas las fuentes (23)</button>
        <button class="btn-secondary">Agregar fuente</button>
        <button class="btn-primary">Análisis profundo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardMetrics, Source } from '@/types/controlInfo'

interface Props {
  metrics: DashboardMetrics
  sources: Source[]
}

const props = defineProps<Props>()

const getRiskLevel = (score: number): string => {
  if (score >= 81) return 'critical'
  if (score >= 61) return 'high'
  if (score >= 31) return 'medium'
  return 'low'
}

const getRiskLevelText = (score: number): string => {
  if (score >= 81) return '🔴 CRÍTICO'
  if (score >= 61) return '🟠 ADVERTENCIA'
  if (score >= 31) return '🟡 MONITOREADO'
  return '🟢 CONTROLADO'
}

const getRiskIcon = (score: number): string => {
  if (score >= 81) return '🔴'
  if (score >= 61) return '🟠'
  if (score >= 31) return '🟡'
  return '🟢'
}

const getTrendText = (trend: string): string => {
  if (trend === 'increasing') return 'Aumentando'
  if (trend === 'decreasing') return 'Disminuyendo'
  return 'Estable'
}

const getSourceAction = (risk: number): string => {
  if (risk >= 61) return 'Urgente'
  if (risk >= 31) return 'Revisar'
  return 'Ver'
}

const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `Hace ${minutes} min`
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${days} días`
}
</script>

<style scoped>
.risk-dashboard {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-left .title {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.header-left .subtitle {
  font-size: 0.95rem;
  color: #9AA0A6;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(211, 47, 47, 0.1);
  border: 1px solid rgba(211, 47, 47, 0.3);
  border-radius: 6px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #D32F2F;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.live-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: #D32F2F;
  letter-spacing: 0.5px;
}

.risk-summary, .critical-count {
  text-align: right;
}

.risk-label, .count-label {
  font-size: 0.75rem;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.risk-value, .count-value {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.risk-value.risk-critical {
  color: #D32F2F;
}

.risk-value.risk-high {
  color: #FA8C16;
}

.count-value {
  color: #D32F2F;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-label {
  font-size: 0.85rem;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.75rem;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.metric-change.positive {
  color: #52C41A;
}

.metric-progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #4A90E2;
  transition: width 0.3s ease;
}

/* Risk Panel */
.risk-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.panel-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem 0;
}

.risk-gauge-container {
  margin-bottom: 2rem;
}

.gauge-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #E8EAED;
  margin-bottom: 0.5rem;
}

.gauge-status {
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.gauge-status.status-critical {
  color: #D32F2F;
}

.gauge-status.status-high {
  color: #FA8C16;
}

.gauge-bar {
  height: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.gauge-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.gauge-fill.fill-critical {
  background: linear-gradient(90deg, #D32F2F 0%, #F44336 100%);
}

.gauge-fill.fill-high {
  background: linear-gradient(90deg, #FA8C16 0%, #FFA940 100%);
}

.risk-breakdown {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.breakdown-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.breakdown-item .label {
  font-size: 0.85rem;
  color: #9AA0A6;
}

.breakdown-item .value {
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.breakdown-item .value.critical {
  color: #D32F2F;
}

.breakdown-item .value.monitored {
  color: #FA8C16;
}

.breakdown-item .value.controlled {
  color: #52C41A;
}

.risk-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #E8EAED;
}

.last-updated {
  font-size: 0.8rem;
  color: #9AA0A6;
}

/* Alerts */
.alerts-section h3 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 6px;
}

.alert-item.critical {
  background: rgba(211, 47, 47, 0.1);
  border: 1px solid rgba(211, 47, 47, 0.3);
}

.alert-item.warning {
  background: rgba(250, 140, 22, 0.1);
  border: 1px solid rgba(250, 140, 22, 0.3);
}

.alert-text {
  font-size: 0.9rem;
  color: #E8EAED;
  line-height: 1.5;
}

.alerts-actions {
  display: flex;
  gap: 1rem;
}

/* Status Grid */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.status-card, .category-card {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
}

.status-card h3, .category-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 1.5rem 0;
}

.status-item, .category-item {
  margin-bottom: 1.5rem;
}

.status-label, .category-label {
  font-size: 0.85rem;
  color: #9AA0A6;
  margin-bottom: 0.5rem;
  display: block;
}

.status-bar, .category-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.status-fill, .category-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.status-fill.controlled, .category-fill {
  background: #52C41A;
}

.status-fill.monitored {
  background: #FA8C16;
}

.status-fill.critical {
  background: #D32F2F;
}

.status-percentage, .category-percentage {
  font-size: 0.85rem;
  color: #E8EAED;
  font-weight: 600;
}

.category-item {
  display: grid;
  grid-template-columns: 120px 1fr 60px;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Sources Panel */
.sources-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.sources-panel h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem 0;
}

.sources-table {
  margin-bottom: 1.5rem;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
}

.table-header {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  color: #E8EAED;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.risk-badge.risk-critical {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.risk-badge.risk-high {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.risk-badge.risk-medium {
  background: rgba(250, 173, 20, 0.2);
  color: #FAAD14;
}

.risk-badge.risk-low {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.sources-actions {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-action, .btn-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: #722ED1;
  color: #fff;
}

.btn-primary:hover {
  background: #8B4AD1;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action {
  background: #4A90E2;
  color: #fff;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-action:hover {
  background: #5BA3F5;
}

.btn-link {
  background: transparent;
  color: #4A90E2;
  padding: 0.5rem 0;
  text-align: left;
}

.btn-link:hover {
  color: #5BA3F5;
  text-decoration: underline;
}
</style>
