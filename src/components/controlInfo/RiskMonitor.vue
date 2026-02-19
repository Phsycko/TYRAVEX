<template>
  <div class="risk-monitor">
    <!-- Header -->
    <div class="monitor-header">
      <div class="header-left">
        <h1>⚠️ Risk Monitor & Alert Configuration</h1>
        <p class="subtitle">Monitoreo en tiempo real y configuración de alertas automáticas</p>
      </div>
      <div class="header-right">
        <button class="btn-primary" @click="viewDashboard">
          📊 Ver Dashboard
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="monitor-tabs">
      <button 
        :class="{ active: activeTab === 'alerts' }"
        @click="activeTab = 'alerts'"
      >
        🔔 Configurar Alertas
      </button>
      <button 
        :class="{ active: activeTab === 'matrix' }"
        @click="activeTab = 'matrix'"
      >
        📊 Matriz de Riesgo
      </button>
      <button 
        :class="{ active: activeTab === 'history' }"
        @click="activeTab = 'history'"
      >
        📜 Historial
      </button>
    </div>

    <!-- Alert Configuration Tab -->
    <div v-if="activeTab === 'alerts'" class="tab-content">
      <!-- Alert Rules List -->
      <div class="rules-list">
        <div 
          v-for="rule in alertRules" 
          :key="rule.id"
          class="rule-card"
          :class="{ active: rule.enabled }"
        >
          <div class="rule-header">
            <div class="rule-title">
              <h3>{{ rule.name }}</h3>
              <span class="rule-priority" :class="rule.priority">
                {{ rule.priority.toUpperCase() }}
              </span>
            </div>
            <div class="rule-toggle">
              <label class="toggle-switch">
                <input type="checkbox" v-model="rule.enabled" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="rule-conditions">
            <h4>Condiciones:</h4>
            <ul>
              <li v-for="(condition, index) in rule.conditions" :key="index">
                {{ condition }}
              </li>
            </ul>
          </div>

          <div class="rule-actions-config">
            <h4>Acciones:</h4>
            <div class="actions-list">
              <span v-for="(action, index) in rule.actions" :key="index" class="action-badge">
                {{ action }}
              </span>
            </div>
          </div>

          <div class="rule-stats">
            <span>Activada: {{ rule.triggered }} veces</span>
            <span>Última activación: {{ rule.lastTriggered }}</span>
          </div>

          <div class="rule-buttons">
            <button class="btn-action" @click="editRule(rule)">
              ✏️ Editar
            </button>
            <button class="btn-action" @click="testRule(rule)">
              🧪 Probar
            </button>
            <button class="btn-action btn-danger" @click="deleteRule(rule)">
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- New Rule Button -->
      <button class="btn-new-rule" @click="showNewRuleModal = true">
        + Nueva Regla
      </button>

      <!-- New Rule Modal -->
      <div v-if="showNewRuleModal" class="modal-overlay" @click="showNewRuleModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>🔔 Nueva Regla de Alerta</h2>
            <button class="modal-close" @click="showNewRuleModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nombre de la regla:</label>
              <input 
                v-model="newRule.name"
                type="text"
                placeholder="Ej: Alerta de contenido crítico"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Condiciones (TODAS deben cumplirse):</label>
              <div class="conditions-builder">
                <label class="condition-item">
                  <input type="checkbox" v-model="newRule.conditions.riskThreshold.enabled" />
                  <span>Riesgo mayor a:</span>
                  <input 
                    type="number" 
                    v-model="newRule.conditions.riskThreshold.value"
                    :disabled="!newRule.conditions.riskThreshold.enabled"
                    min="0"
                    max="100"
                    class="number-input"
                  />
                  <span>/100</span>
                </label>

                <label class="condition-item">
                  <input type="checkbox" v-model="newRule.conditions.contentType.enabled" />
                  <span>Tipo de contenido:</span>
                  <select 
                    v-model="newRule.conditions.contentType.value"
                    :disabled="!newRule.conditions.contentType.enabled"
                    class="select-input"
                  >
                    <option value="photo">Foto</option>
                    <option value="video">Video</option>
                    <option value="document">Documento</option>
                  </select>
                </label>

                <label class="condition-item">
                  <input type="checkbox" v-model="newRule.conditions.reach.enabled" />
                  <span>Alcance estimado mayor a:</span>
                  <input 
                    type="number" 
                    v-model="newRule.conditions.reach.value"
                    :disabled="!newRule.conditions.reach.enabled"
                    class="number-input"
                  />
                  <span>personas</span>
                </label>

                <label class="condition-item">
                  <input type="checkbox" v-model="newRule.conditions.unauthorized.enabled" />
                  <span>Fuente es: No autorizada</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Acción cuando se active:</label>
              <div class="actions-builder">
                <label class="action-item">
                  <input type="checkbox" v-model="newRule.actions.email" />
                  <span>📧 Enviar email a:</span>
                  <input 
                    type="email" 
                    v-model="newRule.emailTo"
                    :disabled="!newRule.actions.email"
                    placeholder="admin@company.com"
                    class="form-input"
                  />
                </label>

                <label class="action-item">
                  <input type="checkbox" v-model="newRule.actions.push" />
                  <span>📱 Notificación push</span>
                </label>

                <label class="action-item">
                  <input type="checkbox" v-model="newRule.actions.slack" />
                  <span>💬 Mensaje Slack canal:</span>
                  <input 
                    type="text" 
                    v-model="newRule.slackChannel"
                    :disabled="!newRule.actions.slack"
                    placeholder="#alertas-criticas"
                    class="form-input"
                  />
                </label>

                <label class="action-item">
                  <input type="checkbox" v-model="newRule.actions.webhook" />
                  <span>🔗 Webhook:</span>
                  <input 
                    type="url" 
                    v-model="newRule.webhookUrl"
                    :disabled="!newRule.actions.webhook"
                    placeholder="https://api.company.com/webhook"
                    class="form-input"
                  />
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Frecuencia:</label>
              <div class="frequency-options">
                <label>
                  <input type="radio" v-model="newRule.frequency" value="immediate" />
                  <span>Inmediata</span>
                </label>
                <label>
                  <input type="radio" v-model="newRule.frequency" value="daily" />
                  <span>Diaria</span>
                </label>
                <label>
                  <input type="radio" v-model="newRule.frequency" value="weekly" />
                  <span>Semanal</span>
                </label>
              </div>
            </div>

            <div class="modal-actions">
              <button class="btn-secondary" @click="showNewRuleModal = false">
                Cancelar
              </button>
              <button class="btn-secondary" @click="testNewRule">
                🧪 Probar
              </button>
              <button class="btn-primary" @click="saveRule">
                💾 Guardar regla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Matrix Tab -->
    <div v-if="activeTab === 'matrix'" class="tab-content">
      <div class="matrix-container">
        <h3>MATRIZ DE RIESGO INTERACTIVA</h3>
        <p class="matrix-subtitle">Click en punto para ver detalles | Drag para reclasificar</p>
        
        <div class="matrix-chart">
          <div class="matrix-y-axis">
            <span class="axis-label">Impacto</span>
            <div class="axis-values">
              <span>Alto</span>
              <span>Medio</span>
              <span>Bajo</span>
            </div>
          </div>
          
          <div class="matrix-grid">
            <!-- Grid Background -->
            <div class="grid-background">
              <div class="grid-cell low"></div>
              <div class="grid-cell low"></div>
              <div class="grid-cell medium"></div>
              <div class="grid-cell high"></div>
              
              <div class="grid-cell low"></div>
              <div class="grid-cell medium"></div>
              <div class="grid-cell medium"></div>
              <div class="grid-cell high"></div>
              
              <div class="grid-cell medium"></div>
              <div class="grid-cell medium"></div>
              <div class="grid-cell high"></div>
              <div class="grid-cell critical"></div>
            </div>

            <!-- Data Points -->
            <div 
              v-for="point in riskPoints" 
              :key="point.id"
              class="risk-point"
              :class="point.severity"
              :style="{ left: `${point.x}%`, bottom: `${point.y}%` }"
              @click="showPointDetails(point)"
              :title="`${point.count} ítems`"
            >
              <span class="point-label">{{ point.severity === 'critical' ? '🔴' : point.severity === 'high' ? '🟠' : point.severity === 'medium' ? '🟡' : '🟢' }}({{ point.count }})</span>
            </div>
          </div>

          <div class="matrix-x-axis">
            <span class="axis-label">Probabilidad</span>
            <div class="axis-values">
              <span>Baja</span>
              <span>Media</span>
              <span>Alta</span>
              <span>Muy Alta</span>
            </div>
          </div>
        </div>

        <div class="matrix-legend">
          <div class="legend-item">
            <span class="legend-color critical"></span>
            <span>Crítico</span>
          </div>
          <div class="legend-item">
            <span class="legend-color high"></span>
            <span>Alto</span>
          </div>
          <div class="legend-item">
            <span class="legend-color medium"></span>
            <span>Medio</span>
          </div>
          <div class="legend-item">
            <span class="legend-color low"></span>
            <span>Bajo</span>
          </div>
        </div>

        <div class="matrix-actions">
          <button class="btn-secondary" @click="viewMode = 'table'">
            📊 Vista tabla
          </button>
          <button class="btn-secondary" @click="viewMode = 'heatmap'">
            🗺️ Mapa de calor
          </button>
          <button class="btn-secondary" @click="viewMode = 'trends'">
            📈 Tendencias
          </button>
        </div>
      </div>
    </div>

    <!-- History Tab -->
    <div v-if="activeTab === 'history'" class="tab-content">
      <div class="history-panel">
        <div class="history-header">
          <h3>HISTORIAL DE ALERTAS</h3>
          <div class="history-filters">
            <select v-model="historyFilter" class="filter-select">
              <option value="all">Todas</option>
              <option value="critical">Críticas</option>
              <option value="high">Altas</option>
              <option value="medium">Medias</option>
            </select>
            <button class="btn-secondary" @click="exportLog">
              💾 Exportar log
            </button>
          </div>
        </div>

        <div class="history-table">
          <table>
            <thead>
              <tr>
                <th>Fecha/Hora</th>
                <th>Regla</th>
                <th>Severidad</th>
                <th>Acción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="alert in filteredHistory" 
                :key="alert.id"
                class="history-row"
              >
                <td>{{ alert.timestamp }}</td>
                <td>{{ alert.ruleName }}</td>
                <td>
                  <span class="severity-badge" :class="alert.severity">
                    {{ getSeverityIcon(alert.severity) }} {{ alert.severity.toUpperCase() }}
                  </span>
                </td>
                <td>{{ alert.action }}</td>
                <td>
                  <span class="status-indicator" :class="alert.status">
                    {{ alert.status === 'seen' ? '✅ Visto' : '⏳ Pendiente' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="history-footer">
          <p>Mostrando {{ filteredHistory.length }} de {{ alertHistory.length }} alertas</p>
          <button class="btn-link" @click="loadMoreHistory">
            Cargar más
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const activeTab = ref('alerts')
const showNewRuleModal = ref(false)
const viewMode = ref('matrix')
const historyFilter = ref('all')

// Alert Rules
const alertRules = ref([
  {
    id: 'rule-001',
    name: 'Contenido crítico detectado',
    priority: 'alta',
    enabled: true,
    conditions: [
      'Riesgo mayor a 80/100',
      'Tipo: Foto, Video, Documento',
      'Alcance > 10,000 personas',
      'Fuente no autorizada'
    ],
    actions: ['Email', 'Push', 'Slack', 'Webhook'],
    triggered: 47,
    lastTriggered: '2024-02-08 16:23'
  },
  {
    id: 'rule-002',
    name: 'Uso no autorizado de assets',
    priority: 'media',
    enabled: true,
    conditions: [
      'Asset oficial detectado',
      'Fuente no autorizada',
      'Sin permiso de uso'
    ],
    actions: ['Email', 'Slack'],
    triggered: 23,
    lastTriggered: '2024-02-08 14:45'
  },
  {
    id: 'rule-003',
    name: 'Riesgo aumentado',
    priority: 'baja',
    enabled: false,
    conditions: [
      'Incremento de riesgo > 20 puntos',
      'En últimas 24 horas'
    ],
    actions: ['Email'],
    triggered: 12,
    lastTriggered: '2024-02-08 11:30'
  }
])

// New Rule
const newRule = ref({
  name: '',
  conditions: {
    riskThreshold: { enabled: true, value: 80 },
    contentType: { enabled: false, value: 'photo' },
    reach: { enabled: false, value: 10000 },
    unauthorized: { enabled: true }
  },
  actions: {
    email: true,
    push: true,
    slack: false,
    webhook: false
  },
  emailTo: '',
  slackChannel: '',
  webhookUrl: '',
  frequency: 'immediate'
})

// Risk Matrix Points
const riskPoints = ref([
  { id: 1, x: 15, y: 15, count: 2664, severity: 'low' },
  { id: 2, x: 45, y: 50, count: 12, severity: 'medium' },
  { id: 3, x: 70, y: 55, count: 8, severity: 'high' },
  { id: 4, x: 65, y: 85, count: 3, severity: 'critical' },
  { id: 5, x: 85, y: 80, count: 5, severity: 'critical' }
])

// Alert History
const alertHistory = ref([
  { id: 1, timestamp: '2024-02-08 16:23', ruleName: 'Contenido crítico', severity: 'critical', action: 'Enviado', status: 'seen' },
  { id: 2, timestamp: '2024-02-08 14:45', ruleName: 'Uso no autorizado', severity: 'high', action: 'Enviado', status: 'pending' },
  { id: 3, timestamp: '2024-02-08 11:30', ruleName: 'Riesgo aumentado', severity: 'medium', action: 'Enviado', status: 'seen' },
  { id: 4, timestamp: '2024-02-08 09:15', ruleName: 'Contenido crítico', severity: 'critical', action: 'Enviado', status: 'seen' },
  { id: 5, timestamp: '2024-02-07 18:20', ruleName: 'Uso no autorizado', severity: 'high', action: 'Enviado', status: 'seen' }
])

// Computed
const filteredHistory = computed(() => {
  if (historyFilter.value === 'all') return alertHistory.value
  return alertHistory.value.filter(a => a.severity === historyFilter.value)
})

// Methods
const viewDashboard = () => {
  alert('Abriendo dashboard de riesgo...')
}

const editRule = (rule: any) => {
  alert(`Editando regla: ${rule.name}...`)
}

const testRule = (rule: any) => {
  alert(`Probando regla: ${rule.name}...\n\n✅ Regla activada correctamente\n📧 Email enviado\n📱 Push notification enviada`)
}

const deleteRule = (rule: any) => {
  if (confirm(`¿Eliminar regla "${rule.name}"?`)) {
    const index = alertRules.value.findIndex(r => r.id === rule.id)
    if (index > -1) {
      alertRules.value.splice(index, 1)
    }
  }
}

const testNewRule = () => {
  alert('Probando nueva regla...\n\n✅ Condiciones válidas\n📧 Email de prueba enviado')
}

const saveRule = () => {
  alert('Guardando nueva regla...')
  showNewRuleModal.value = false
}

const showPointDetails = (point: any) => {
  alert(`Detalles del punto:\n\n${point.count} ítems\nSeveridad: ${point.severity}\nImpacto: ${point.y}%\nProbabilidad: ${point.x}%`)
}

const exportLog = () => {
  alert('Exportando log de alertas...')
}

const loadMoreHistory = () => {
  alert('Cargando más alertas...')
}

const getSeverityIcon = (severity: string) => {
  const icons: Record<string, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  }
  return icons[severity] || '⚪'
}
</script>

<style scoped>
.risk-monitor {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-left h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 0.95rem;
  color: #9AA0A6;
  margin: 0;
}

/* Tabs */
.monitor-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.monitor-tabs button {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #9AA0A6;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.monitor-tabs button:hover {
  color: #E8EAED;
}

.monitor-tabs button.active {
  color: #722ED1;
  border-bottom-color: #722ED1;
}

/* Tab Content */
.tab-content {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

/* Rules List */
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.rule-card {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid #9AA0A6;
  border-radius: 8px;
  transition: all 0.2s;
}

.rule-card.active {
  border-left-color: #52C41A;
}

.rule-card:hover {
  background: rgba(255, 255, 255, 0.02);
}

.rule-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.rule-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rule-title h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.rule-priority {
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.rule-priority.alta {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.rule-priority.media {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.rule-priority.baja {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #52C41A;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

/* Rule Details */
.rule-conditions, .rule-actions-config {
  margin-bottom: 1rem;
}

.rule-conditions h4, .rule-actions-config h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
}

.rule-conditions ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.rule-conditions li {
  font-size: 0.85rem;
  color: #E8EAED;
  padding-left: 1.5rem;
  position: relative;
}

.rule-conditions li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #52C41A;
}

.actions-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-badge {
  padding: 0.25rem 0.6rem;
  background: rgba(74, 144, 226, 0.2);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 4px;
  font-size: 0.75rem;
  color: #4A90E2;
}

.rule-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #9AA0A6;
}

.rule-buttons {
  display: flex;
  gap: 0.5rem;
}

/* New Rule Button */
.btn-new-rule {
  width: 100%;
  padding: 1rem;
  background: rgba(114, 46, 209, 0.1);
  border: 2px dashed rgba(114, 46, 209, 0.3);
  border-radius: 8px;
  color: #722ED1;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-new-rule:hover {
  background: rgba(114, 46, 209, 0.2);
  border-color: #722ED1;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  color: #9AA0A6;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #E8EAED;
  margin-bottom: 0.75rem;
}

.form-input, .select-input, .number-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.9rem;
}

.number-input {
  width: 100px;
}

.conditions-builder, .actions-builder {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.condition-item, .action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
}

.frequency-options {
  display: flex;
  gap: 2rem;
}

.frequency-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #E8EAED;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Risk Matrix */
.matrix-container h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.matrix-subtitle {
  font-size: 0.85rem;
  color: #9AA0A6;
  margin: 0 0 2rem 0;
}

.matrix-chart {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr 60px;
  gap: 1rem;
  margin-bottom: 2rem;
}

.matrix-y-axis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.axis-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.axis-values {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-size: 0.8rem;
  color: #9AA0A6;
}

.matrix-grid {
  position: relative;
  height: 400px;
}

.grid-background {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
}

.grid-cell {
  background: rgba(0, 0, 0, 0.2);
}

.grid-cell.low {
  background: rgba(82, 196, 26, 0.1);
}

.grid-cell.medium {
  background: rgba(250, 173, 20, 0.1);
}

.grid-cell.high {
  background: rgba(250, 140, 22, 0.1);
}

.grid-cell.critical {
  background: rgba(211, 47, 47, 0.1);
}

.risk-point {
  position: absolute;
  transform: translate(-50%, 50%);
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.risk-point.low {
  border-color: #52C41A;
}

.risk-point.medium {
  border-color: #FAAD14;
}

.risk-point.high {
  border-color: #FA8C16;
}

.risk-point.critical {
  border-color: #D32F2F;
}

.risk-point:hover {
  transform: translate(-50%, 50%) scale(1.1);
  z-index: 20;
}

.point-label {
  font-size: 0.85rem;
  color: #E8EAED;
  font-weight: 600;
}

.matrix-x-axis {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.matrix-x-axis .axis-values {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.matrix-legend {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #E8EAED;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.critical {
  background: rgba(211, 47, 47, 0.5);
}

.legend-color.high {
  background: rgba(250, 140, 22, 0.5);
}

.legend-color.medium {
  background: rgba(250, 173, 20, 0.5);
}

.legend-color.low {
  background: rgba(82, 196, 26, 0.5);
}

.matrix-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* History */
.history-panel {
  padding: 1rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.history-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.history-filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.85rem;
}

.history-table {
  overflow-x: auto;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: rgba(0, 0, 0, 0.2);
}

th {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

td {
  padding: 1rem;
  font-size: 0.9rem;
  color: #E8EAED;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.history-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.severity-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.severity-badge.critical {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.severity-badge.high {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.severity-badge.medium {
  background: rgba(250, 173, 20, 0.2);
  color: #FAAD14;
}

.status-indicator.seen {
  color: #52C41A;
}

.status-indicator.pending {
  color: #FAAD14;
}

.history-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
  color: #9AA0A6;
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-danger, .btn-action, .btn-link {
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

.btn-danger {
  background: rgba(211, 47, 47, 0.2);
  border: 1px solid rgba(211, 47, 47, 0.3);
  color: #D32F2F;
}

.btn-danger:hover {
  background: rgba(211, 47, 47, 0.3);
}

.btn-action {
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action.btn-danger {
  background: rgba(211, 47, 47, 0.2);
  border-color: rgba(211, 47, 47, 0.3);
  color: #D32F2F;
}

.btn-link {
  background: transparent;
  color: #4A90E2;
  padding: 0.5rem 0;
}

.btn-link:hover {
  color: #5BA3F5;
  text-decoration: underline;
}
</style>
