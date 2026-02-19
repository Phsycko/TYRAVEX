<template>
  <div class="executive-dashboard">
    <!-- HEADER -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">
          <span class="icon">📊</span>
          Executive Command Dashboard
        </h1>
        <div class="scenario-info">
          <span class="scenario-name">{{ currentScenario?.name || 'No scenario active' }}</span>
          <span class="scenario-day">DÍA {{ currentDay }}/{{ totalDays }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="live-indicator">
          <span class="pulse"></span>
          <span class="text">ACTUALIZACIÓN EN TIEMPO REAL</span>
        </div>
        <div class="last-update">
          Última actualización: {{ lastUpdateTime }}
        </div>
      </div>
    </div>

    <!-- GLOBAL OBJECTIVE -->
    <div class="global-objective-card">
      <div class="objective-header">
        <h2>OBJETIVO GLOBAL</h2>
        <div class="status-badge" :class="`status-${globalStatus.health}`">
          {{ getHealthLabel(globalStatus.health) }}
        </div>
      </div>
      <div class="objective-content">
        <div class="objective-text">{{ currentScenario?.objective || 'Sin objetivo definido' }}</div>
        <div class="objective-metrics">
          <div class="metric-item">
            <div class="metric-label">INTENCIÓN DE VOTO</div>
            <div class="metric-value-large">
              {{ globalStatus.voteIntention.toFixed(1) }}%
              <span class="trend-indicator" :class="`trend-${globalStatus.trend}`">
                {{ getTrendIcon(globalStatus.trend) }}
              </span>
            </div>
            <div class="metric-target">Target: 52.0%</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">PROBABILIDAD DE VICTORIA</div>
            <div class="metric-value-large">
              {{ globalStatus.victoryProbability.toFixed(1) }}%
              <span class="trend-indicator" :class="`trend-${globalStatus.trend}`">
                {{ getTrendIcon(globalStatus.trend) }}
              </span>
            </div>
            <div class="metric-target">Target: 80.0%</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">PROGRESO</div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: `${globalStatus.progress}%` }"></div>
            </div>
            <div class="progress-text">{{ globalStatus.progress }}% hacia meta</div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI CARDS BY DOMAIN -->
    <div class="kpi-grid">
      <!-- Analytics KPI -->
      <div class="kpi-card" :class="`health-${analyticsKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">📊</div>
          <div class="kpi-title">ANALYTICS</div>
          <div class="kpi-status-badge" :class="`status-${analyticsKPI.status}`">
            {{ getHealthIcon(analyticsKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Intención voto:</span>
            <span class="value">{{ analyticsKPI.voteIntention.toFixed(1) }}%</span>
            <span class="target">(Target: {{ analyticsKPI.target }}%)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Sentimiento:</span>
            <span class="value">+{{ analyticsKPI.sentiment }}%</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Share of voice:</span>
            <span class="value">{{ analyticsKPI.shareOfVoice }}%</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Próxima encuesta:</span>
            <span class="value">En 3 días</span>
          </div>
        </div>
        <button class="kpi-action-btn" @click="navigateToDomain('analytics')">
          Ver detalles →
        </button>
      </div>

      <!-- Territorio KPI -->
      <div class="kpi-card" :class="`health-${territorioKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">🗺️</div>
          <div class="kpi-title">TERRITORIO</div>
          <div class="kpi-status-badge" :class="`status-${territorioKPI.status}`">
            {{ getHealthIcon(territorioKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Distritos controlados:</span>
            <span class="value">{{ territorioKPI.districtsControlled }}/{{ territorioKPI.totalDistricts }}</span>
            <span class="target">(Target: {{ territorioKPI.target }})</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Eventos completados:</span>
            <span class="value">{{ territorioKPI.eventsCompleted }}/{{ territorioKPI.eventsPlanned }}</span>
          </div>
          <div class="kpi-metric warning">
            <span class="label">⚠️ Alerta:</span>
            <span class="value">Distrito 08 perdiendo momentum (-0.5%)</span>
          </div>
        </div>
        <div class="kpi-actions">
          <button class="kpi-action-btn" @click="navigateToDomain('territorio')">
            Ver mapa →
          </button>
          <button class="kpi-action-btn secondary" @click="adjustStrategy">
            Ajustar estrategia
          </button>
        </div>
      </div>

      <!-- Predict KPI -->
      <div class="kpi-card" :class="`health-${predictKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">🔮</div>
          <div class="kpi-title">PREDICT</div>
          <div class="kpi-status-badge" :class="`status-${predictKPI.status}`">
            {{ getHealthIcon(predictKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Prob. victoria:</span>
            <span class="value">{{ predictKPI.victoryProbability.toFixed(1) }}%</span>
            <span class="trend">↑ +1.9% vs D+28</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Proyección votos:</span>
            <span class="value">{{ predictKPI.voteProjection.toFixed(1) }}%</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Confianza modelo:</span>
            <span class="value">{{ predictKPI.modelConfidence.toFixed(1) }}%</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Próxima actualización:</span>
            <span class="value">Automática tras encuesta</span>
          </div>
        </div>
        <button class="kpi-action-btn" @click="navigateToDomain('predict')">
          Ver proyecciones →
        </button>
      </div>

      <!-- Monitor KPI -->
      <div class="kpi-card" :class="`health-${monitorKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">👁️</div>
          <div class="kpi-title">MONITOR</div>
          <div class="kpi-status-badge" :class="`status-${monitorKPI.status}`">
            {{ getHealthIcon(monitorKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Menciones:</span>
            <span class="value">{{ formatNumber(monitorKPI.mentions) }}</span>
            <span class="trend">↑ +15% esta semana</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Alertas activas:</span>
            <span class="value">{{ monitorKPI.activeAlerts }} (1 media, 1 baja)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Trending:</span>
            <span class="value">#PropuestaEconomica (pos. #{{ monitorKPI.trendingPosition }})</span>
          </div>
          <div class="kpi-metric warning">
            <span class="label">⚠️ Narrativa negativa:</span>
            <span class="value">"Promesas vacías" (+40%)</span>
          </div>
        </div>
        <div class="kpi-actions">
          <button class="kpi-action-btn" @click="navigateToDomain('monitor')">
            Ver dashboard →
          </button>
          <button class="kpi-action-btn secondary" @click="activateCountermeasures">
            Activar contramedidas
          </button>
        </div>
      </div>

      <!-- Crisis KPI -->
      <div class="kpi-card" :class="`health-${crisisKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">⚠️</div>
          <div class="kpi-title">CRISIS</div>
          <div class="kpi-status-badge" :class="`status-${crisisKPI.status}`">
            {{ getHealthIcon(crisisKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Nivel de alerta:</span>
            <span class="value">{{ crisisKPI.alertLevel }}/100 (Precaución)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Señales activas:</span>
            <span class="value">{{ crisisKPI.signalsDetected }} (1 crítica, 2 medias)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Protocolos activos:</span>
            <span class="value">{{ crisisKPI.activeProtocols }}</span>
          </div>
          <div class="kpi-metric critical">
            <span class="label">🔴 Crítico:</span>
            <span class="value">Sobrecarga comedores Zona Norte (saturación en 4 días)</span>
          </div>
        </div>
        <div class="kpi-actions">
          <button class="kpi-action-btn" @click="navigateToDomain('crisis')">
            Ver señales →
          </button>
          <button class="kpi-action-btn secondary critical" @click="activateProtocol">
            Activar protocolo
          </button>
        </div>
      </div>

      <!-- Resources KPI -->
      <div class="kpi-card" :class="`health-${resourcesKPI.status}`">
        <div class="kpi-header">
          <div class="kpi-icon">💰</div>
          <div class="kpi-title">RECURSOS</div>
          <div class="kpi-status-badge" :class="`status-${resourcesKPI.status}`">
            {{ getHealthIcon(resourcesKPI.status) }}
          </div>
        </div>
        <div class="kpi-metrics">
          <div class="kpi-metric">
            <span class="label">Presupuesto restante:</span>
            <span class="value">${{ formatMoney(resourcesKPI.budgetRemaining) }} de ${{ formatMoney(resourcesKPI.budgetTotal) }}</span>
            <span class="percentage">({{ ((resourcesKPI.budgetRemaining / resourcesKPI.budgetTotal) * 100).toFixed(0) }}%)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Burn rate:</span>
            <span class="value">${{ formatMoney(resourcesKPI.burnRate) }}/día (óptimo)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Días de runway:</span>
            <span class="value">{{ resourcesKPI.daysRemaining }} días (suficiente)</span>
          </div>
          <div class="kpi-metric">
            <span class="label">Personal utilización:</span>
            <span class="value">{{ resourcesKPI.personnelUtilization }}% (eficiente)</span>
          </div>
        </div>
        <div class="kpi-actions">
          <button class="kpi-action-btn" @click="viewResourceDetails">
            Ver detalles →
          </button>
          <button class="kpi-action-btn secondary" @click="optimizeResources">
            Optimizar
          </button>
        </div>
      </div>
    </div>

    <!-- PENDING DECISIONS -->
    <div class="pending-decisions-section" v-if="pendingDecisions.length > 0">
      <h2 class="section-title">
        <span class="icon">⚡</span>
        DECISIONES PENDIENTES ({{ pendingDecisions.length }})
      </h2>
      <div class="decisions-list">
        <div 
          v-for="decision in pendingDecisions" 
          :key="decision.id"
          class="decision-card"
          :class="`urgency-${decision.urgency}`"
        >
          <div class="decision-urgency-badge">
            {{ getUrgencyIcon(decision.urgency) }} {{ getUrgencyLabel(decision.urgency) }}
          </div>
          <div class="decision-title">{{ decision.title }}</div>
          <div class="decision-time">
            <span class="icon">⏱️</span>
            {{ decision.timeRemaining > 60 ? `T-${Math.floor(decision.timeRemaining / 60)}h` : `T-${decision.timeRemaining}m` }}
          </div>
          <div class="decision-domains">
            <span v-for="domain in decision.domains" :key="domain" class="domain-tag">
              {{ domain }}
            </span>
          </div>
          <button class="decision-action-btn" @click="viewDecision(decision.id)">
            Tomar acción
          </button>
        </div>
      </div>
      <div class="decisions-actions">
        <button class="btn-secondary" @click="viewAllDecisions">Ver todas las decisiones</button>
        <button class="btn-secondary" @click="delegateDecisions">Delegar</button>
      </div>
    </div>

    <!-- CRITICAL EVENTS -->
    <div class="critical-events-section">
      <h2 class="section-title">
        <span class="icon">📅</span>
        PRÓXIMOS EVENTOS CRÍTICOS
      </h2>
      <div class="events-timeline">
        <div 
          v-for="event in upcomingCriticalEvents" 
          :key="event.id"
          class="event-item"
        >
          <div class="event-day">D+{{ event.day }}</div>
          <div class="event-info">
            <div class="event-title">{{ event.title }}</div>
            <div class="event-meta">
              <span class="event-time">{{ event.time || 'Todo el día' }}</span>
              <span class="event-domains">
                <span v-for="domain in event.domains" :key="domain" class="domain-tag-small">
                  {{ domain }}
                </span>
              </span>
            </div>
          </div>
          <div class="event-countdown">
            {{ event.day - currentDay }} días
          </div>
        </div>
      </div>
      <button class="btn-secondary" @click="viewFullCalendar">Ver calendario completo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { strategicData } from '../../data/strategicData'
import type { 
  Scenario, 
  GlobalStatus,
  AnalyticsKPIs,
  TerritorioKPIs,
  PredictKPIs,
  MonitorKPIs,
  CrisisKPIs,
  ResourceKPIs,
  PendingDecision,
  CriticalEvent,
  HealthStatus,
  TrendDirection,
  UrgencyLevel
} from '../../types/strategic'

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

const currentScenario = ref<Scenario | null>(strategicData.scenarios[0] || null)
const currentDay = ref(34)
const totalDays = computed(() => currentScenario.value?.timeline || 120)
const lastUpdateTime = ref(new Date().toLocaleTimeString())

// Global status
const globalStatus = ref<GlobalStatus>({
  victoryProbability: 78.3,
  voteIntention: 49.2,
  trend: 'up',
  health: 'warning',
  progress: 35,
  objective: 'Ganar elección con 52%+ de votos',
  daysRemaining: 86
})

// Domain KPIs
const analyticsKPI = ref<AnalyticsKPIs>({
  voteIntention: 49.2,
  sentiment: 68,
  shareOfVoice: 51,
  engagement: 28,
  target: 52,
  status: 'healthy'
})

const territorioKPI = ref<TerritorioKPIs>({
  districtsControlled: 16,
  totalDistricts: 35,
  eventsCompleted: 34,
  eventsPlanned: 45,
  target: 20,
  status: 'warning'
})

const predictKPI = ref<PredictKPIs>({
  victoryProbability: 78.3,
  voteProjection: 49.8,
  modelConfidence: 94.2,
  target: 80,
  status: 'healthy'
})

const monitorKPI = ref<MonitorKPIs>({
  mentions: 1800000,
  activeAlerts: 2,
  trendingPosition: 3,
  narrativeControl: 68,
  status: 'warning'
})

const crisisKPI = ref<CrisisKPIs>({
  alertLevel: 68,
  activeProtocols: 0,
  signalsDetected: 3,
  responseTime: 15,
  status: 'warning'
})

const resourcesKPI = ref<ResourceKPIs>({
  budgetRemaining: 24200000,
  budgetTotal: 38000000,
  burnRate: 467000,
  personnelUtilization: 89,
  daysRemaining: 52,
  status: 'healthy'
})

// Pending decisions
const pendingDecisions = ref<PendingDecision[]>([
  {
    id: 'decision-pending-001',
    title: 'Activar Protocolo Omega (Crisis comedores)',
    urgency: 'critical',
    deadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    domains: ['crisis', 'territorio'],
    description: 'Sobrecarga de comedores en Zona Norte requiere activación de protocolo de emergencia',
    timeRemaining: 240 // minutes
  },
  {
    id: 'decision-pending-002',
    title: 'Comunicado oficial (Desmentir rumor viral)',
    urgency: 'high',
    deadline: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    domains: ['monitor', 'analytics'],
    description: 'Rumor viral sobre candidato requiere respuesta oficial',
    timeRemaining: 60
  },
  {
    id: 'decision-pending-003',
    title: 'Reasignar recursos hídricos',
    urgency: 'medium',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    domains: ['territorio', 'crisis'],
    description: 'Optimización de distribución de recursos en distritos críticos',
    timeRemaining: 1440
  }
])

// Critical events
const upcomingCriticalEvents = ref<CriticalEvent[]>([
  {
    id: 'event-critical-001',
    day: 36,
    time: '18:00',
    title: 'Evento masivo Distrito 04 (5K asistentes esperados)',
    domains: ['territorio', 'monitor'],
    type: 'milestone',
    status: 'upcoming'
  },
  {
    id: 'event-critical-002',
    day: 45,
    time: '20:00',
    title: 'Primer debate presidencial (CRÍTICO)',
    domains: ['monitor', 'analytics', 'research'],
    type: 'milestone',
    status: 'upcoming'
  },
  {
    id: 'event-critical-003',
    day: 48,
    time: '10:00',
    title: 'Lanzamiento propuestas económicas',
    domains: ['analytics', 'monitor'],
    type: 'milestone',
    status: 'upcoming'
  }
])

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// METHODS
// ─────────────────────────────────────────────────────────────────────────────

const getHealthLabel = (health: HealthStatus): string => {
  const labels = {
    healthy: 'SALUDABLE',
    warning: 'ATENCIÓN',
    danger: 'PELIGRO',
    critical: 'CRÍTICO'
  }
  return labels[health] || 'DESCONOCIDO'
}

const getHealthIcon = (health: HealthStatus): string => {
  const icons = {
    healthy: '🟢',
    warning: '🟡',
    danger: '🟠',
    critical: '🔴'
  }
  return icons[health] || '⚪'
}

const getTrendIcon = (trend: TrendDirection): string => {
  const icons = {
    up: '↑',
    down: '↓',
    stable: '→'
  }
  return icons[trend] || '→'
}

const getUrgencyIcon = (urgency: UrgencyLevel): string => {
  const icons = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  }
  return icons[urgency] || '⚪'
}

const getUrgencyLabel = (urgency: UrgencyLevel): string => {
  const labels = {
    critical: 'URGENTE',
    high: 'ALTA',
    medium: 'MEDIA',
    low: 'BAJA'
  }
  return labels[urgency] || 'DESCONOCIDA'
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

const formatMoney = (amount: number): string => {
  return `${(amount / 1000000).toFixed(1)}M`
}

const navigateToDomain = (domain: string) => {
  console.log(`Navigate to ${domain}`)
  // TODO: Implement navigation
}

const adjustStrategy = () => {
  console.log('Adjust strategy')
  // TODO: Implement
}

const activateCountermeasures = () => {
  console.log('Activate countermeasures')
  // TODO: Implement
}

const activateProtocol = () => {
  console.log('Activate protocol')
  // TODO: Implement
}

const viewResourceDetails = () => {
  console.log('View resource details')
  // TODO: Implement
}

const optimizeResources = () => {
  console.log('Optimize resources')
  // TODO: Implement
}

const viewDecision = (id: string) => {
  console.log(`View decision ${id}`)
  // TODO: Implement
}

const viewAllDecisions = () => {
  console.log('View all decisions')
  // TODO: Implement
}

const delegateDecisions = () => {
  console.log('Delegate decisions')
  // TODO: Implement
}

const viewFullCalendar = () => {
  console.log('View full calendar')
  // TODO: Implement
}

// Auto-refresh
let refreshInterval: number | null = null

const startAutoRefresh = () => {
  refreshInterval = window.setInterval(() => {
    lastUpdateTime.value = new Date().toLocaleTimeString()
    // TODO: Fetch real-time data
  }, 30000) // 30 seconds
}

const stopAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LIFECYCLE
// ─────────────────────────────────────────────────────────────────────────────

onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped>
.executive-dashboard {
  padding: 2rem;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  min-height: 100vh;
  color: var(--tyravex-text);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* HEADER */
/* ─────────────────────────────────────────────────────────────────────────── */

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(var(--tyravex-primary-rgb), 0.3);
}

.header-left {
  flex: 1;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--tyravex-primary);
}

.dashboard-title .icon {
  font-size: 2.5rem;
}

.scenario-info {
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.scenario-name {
  font-weight: 600;
  color: var(--tyravex-primary);
}

.scenario-day {
  font-family: 'Roboto Mono', monospace;
  color: rgba(255, 255, 255, 0.9);
}

.header-right {
  text-align: right;
}

.live-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #00ff88;
  font-weight: 600;
  font-size: 0.85rem;
}

.pulse {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.last-update {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Roboto Mono', monospace;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* GLOBAL OBJECTIVE */
/* ─────────────────────────────────────────────────────────────────────────── */

.global-objective-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--tyravex-primary-rgb), 0.3);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.objective-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.objective-header h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  color: var(--tyravex-primary);
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-badge.status-healthy {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border: 1px solid #00ff88;
}

.status-badge.status-warning {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid #ffc107;
}

.status-badge.status-danger {
  background: rgba(255, 87, 34, 0.2);
  color: #ff5722;
  border: 1px solid #ff5722;
}

.status-badge.status-critical {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid #f44336;
}

.objective-text {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.objective-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.metric-item {
  text-align: center;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.metric-value-large {
  font-size: 3rem;
  font-weight: 700;
  color: var(--tyravex-primary);
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.trend-indicator {
  font-size: 2rem;
}

.trend-indicator.trend-up {
  color: #00ff88;
}

.trend-indicator.trend-down {
  color: #ff5722;
}

.trend-indicator.trend-stable {
  color: #ffc107;
}

.metric-target {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

.progress-bar-container {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--tyravex-primary), #00ff88);
  border-radius: 6px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Roboto Mono', monospace;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* KPI GRID */
/* ─────────────────────────────────────────────────────────────────────────── */

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(var(--tyravex-primary-rgb), 0.5);
}

.kpi-card.health-healthy {
  border-left: 4px solid #00ff88;
}

.kpi-card.health-warning {
  border-left: 4px solid #ffc107;
}

.kpi-card.health-danger {
  border-left: 4px solid #ff5722;
}

.kpi-card.health-critical {
  border-left: 4px solid #f44336;
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.kpi-icon {
  font-size: 1.8rem;
}

.kpi-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--tyravex-primary);
}

.kpi-status-badge {
  font-size: 1.2rem;
}

.kpi-metrics {
  margin-bottom: 1.5rem;
}

.kpi-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
}

.kpi-metric:last-child {
  border-bottom: none;
}

.kpi-metric .label {
  color: rgba(255, 255, 255, 0.7);
}

.kpi-metric .value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Roboto Mono', monospace;
}

.kpi-metric .target {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 0.5rem;
}

.kpi-metric .trend {
  font-size: 0.85rem;
  color: #00ff88;
  margin-left: 0.5rem;
}

.kpi-metric.warning {
  background: rgba(255, 193, 7, 0.1);
  padding: 0.75rem;
  border-radius: 6px;
  margin: 0.5rem 0;
}

.kpi-metric.critical {
  background: rgba(244, 67, 54, 0.1);
  padding: 0.75rem;
  border-radius: 6px;
  margin: 0.5rem 0;
}

.kpi-action-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(var(--tyravex-primary-rgb), 0.2);
  border: 1px solid var(--tyravex-primary);
  border-radius: 8px;
  color: var(--tyravex-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.kpi-action-btn:hover {
  background: var(--tyravex-primary);
  color: #0a0e27;
}

.kpi-action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
}

.kpi-action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.kpi-action-btn.secondary.critical {
  border-color: #f44336;
  color: #f44336;
}

.kpi-action-btn.secondary.critical:hover {
  background: rgba(244, 67, 54, 0.2);
}

.kpi-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* PENDING DECISIONS */
/* ─────────────────────────────────────────────────────────────────────────── */

.pending-decisions-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--tyravex-primary);
}

.section-title .icon {
  font-size: 1.8rem;
}

.decisions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.decision-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
}

.decision-card.urgency-critical {
  border-left: 4px solid #f44336;
  background: rgba(244, 67, 54, 0.05);
}

.decision-card.urgency-high {
  border-left: 4px solid #ff5722;
  background: rgba(255, 87, 34, 0.05);
}

.decision-card.urgency-medium {
  border-left: 4px solid #ffc107;
  background: rgba(255, 193, 7, 0.05);
}

.decision-urgency-badge {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.decision-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.decision-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-family: 'Roboto Mono', monospace;
}

.decision-domains {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.domain-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(var(--tyravex-primary-rgb), 0.2);
  border: 1px solid rgba(var(--tyravex-primary-rgb), 0.5);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--tyravex-primary);
  font-weight: 600;
}

.decision-action-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--tyravex-primary);
  border: none;
  border-radius: 8px;
  color: #0a0e27;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.decision-action-btn:hover {
  background: #00ff88;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--tyravex-primary-rgb), 0.4);
}

.decisions-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-secondary {
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--tyravex-primary);
  color: var(--tyravex-primary);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* CRITICAL EVENTS */
/* ─────────────────────────────────────────────────────────────────────────── */

.critical-events-section {
  margin-bottom: 2rem;
}

.events-timeline {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.event-item:last-child {
  border-bottom: none;
}

.event-day {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--tyravex-primary);
  font-family: 'Roboto Mono', monospace;
  min-width: 60px;
}

.event-info {
  flex: 1;
}

.event-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
}

.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.event-domains {
  display: flex;
  gap: 0.5rem;
}

.domain-tag-small {
  padding: 0.15rem 0.5rem;
  background: rgba(var(--tyravex-primary-rgb), 0.15);
  border-radius: 8px;
  font-size: 0.7rem;
  color: var(--tyravex-primary);
}

.event-countdown {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Roboto Mono', monospace;
  min-width: 80px;
  text-align: right;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* RESPONSIVE */
/* ─────────────────────────────────────────────────────────────────────────── */

@media (max-width: 1200px) {
  .objective-metrics {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-right {
    text-align: left;
  }
  
  .live-indicator {
    justify-content: flex-start;
  }
  
  .decisions-list {
    grid-template-columns: 1fr;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .event-countdown {
    text-align: left;
  }
}
</style>
