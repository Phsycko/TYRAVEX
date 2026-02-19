<template>
  <div class="master-scenario-builder">
    <!-- HEADER -->
    <div class="builder-header">
      <div class="header-left">
        <h2>
          <span class="icon">🎯</span>
          Master Scenario Builder
        </h2>
        <p>Configura escenarios estratégicos multi-dominio</p>
      </div>
      <div class="header-right">
        <button class="btn-secondary" @click="resetForm">
          <span class="icon">🔄</span> Reiniciar
        </button>
        <button class="btn-primary" @click="saveScenario" :disabled="!isValid">
          <span class="icon">💾</span> Guardar Escenario
        </button>
      </div>
    </div>

    <div class="builder-content">
      <!-- LEFT COLUMN: GENERAL CONFIG -->
      <div class="config-column">
        <!-- Template Selection -->
        <div class="config-section">
          <h3>Plantilla de Escenario</h3>
          <div class="template-selector">
            <select v-model="selectedTemplateId" @change="applyTemplate" class="form-select">
              <option value="" disabled>Seleccionar plantilla...</option>
              <option v-for="template in templates" :key="template.id" :value="template.id">
                {{ template.name }} ({{ template.category }})
              </option>
            </select>
          </div>
          <div v-if="selectedTemplate" class="template-info">
            <p>{{ selectedTemplate.description }}</p>
            <div class="tags">
              <span v-for="tag in selectedTemplate.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- Basic Info -->
        <div class="config-section">
          <h3>Información Básica</h3>
          <div class="form-group">
            <label>Nombre del Escenario</label>
            <input type="text" v-model="scenarioConfig.name" class="form-input" placeholder="Ej: Operación Reelección 2024">
          </div>
          <div class="form-group">
            <label>Objetivo Global</label>
            <textarea v-model="scenarioConfig.objective" class="form-textarea" placeholder="Describe el objetivo principal..."></textarea>
          </div>
          <div class="form-group">
            <label>Duración (días)</label>
            <input type="number" v-model="scenarioConfig.timeline" class="form-input" min="30" max="365">
          </div>
        </div>

        <!-- Resource Pool -->
        <div class="config-section">
          <h3>Recursos Disponibles</h3>
          <div class="resource-inputs">
            <div class="form-group">
              <label>Presupuesto Total ($)</label>
              <input type="number" v-model="scenarioConfig.resources.budget" class="form-input">
            </div>
            <div class="form-group">
              <label>Personal Total</label>
              <input type="number" v-model="scenarioConfig.resources.personnel" class="form-input">
            </div>
          </div>
        </div>
      </div>

      <!-- MIDDLE COLUMN: DOMAIN CONFIG -->
      <div class="domains-column">
        <h3>Configuración de Dominios</h3>
        <div class="domains-list">
          <div v-for="domain in availableDomains" :key="domain.id" class="domain-card" :class="{ active: scenarioConfig.domains[domain.id].enabled }">
            <div class="domain-header">
              <div class="domain-check">
                <input type="checkbox" v-model="scenarioConfig.domains[domain.id].enabled" :id="`check-${domain.id}`">
                <label :for="`check-${domain.id}`">
                  <span class="domain-icon">{{ domain.icon }}</span>
                  {{ domain.name }}
                </label>
              </div>
              <div class="domain-priority" v-if="scenarioConfig.domains[domain.id].enabled">
                <select v-model="scenarioConfig.domains[domain.id].priority" class="priority-select">
                  <option value="critical">Crítica</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>
            </div>

            <div v-if="scenarioConfig.domains[domain.id].enabled" class="domain-details">
              <!-- Objectives -->
              <div class="domain-objectives">
                <h4>Objetivos</h4>
                <div v-for="(obj, index) in scenarioConfig.domains[domain.id].objectives" :key="index" class="objective-item">
                  <input type="text" v-model="obj.description" placeholder="Descripción del objetivo" class="objective-input">
                  <div class="objective-metrics">
                    <div class="metric-input-group">
                      <span>Target:</span>
                      <input type="number" v-model="obj.targetValue" class="metric-input">
                      <select v-model="obj.metric" class="metric-select">
                        <option v-for="m in domain.metrics" :key="m.id" :value="m.id">{{ m.name }}</option>
                      </select>
                    </div>
                  </div>
                  <button class="btn-icon-danger" @click="removeObjective(domain.id, index)">×</button>
                </div>
                <button class="btn-text-add" @click="addObjective(domain.id)">+ Agregar objetivo</button>
              </div>

              <!-- Resources -->
              <div class="domain-resources">
                <div class="resource-slider">
                  <label>Presupuesto: {{ formatMoney(calculateDomainBudget(domain.id)) }} ({{ getBudgetPercentage(domain.id) }}%)</label>
                  <input type="range" v-model="scenarioConfig.resources.allocation[domain.id].budgetPercentage" min="0" max="100" step="1">
                </div>
                <div class="resource-slider">
                  <label>Personal: {{ calculateDomainPersonnel(domain.id) }} ({{ getPersonnelPercentage(domain.id) }}%)</label>
                  <input type="range" v-model="scenarioConfig.resources.allocation[domain.id].personnelPercentage" min="0" max="100" step="1">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: SUMMARY -->
      <div class="summary-column">
        <div class="summary-card">
          <h3>Resumen del Escenario</h3>
          <div class="summary-stats">
            <div class="stat-row">
              <span class="label">Dominios Activos:</span>
              <span class="value">{{ activeDomainsCount }} / 7</span>
            </div>
            <div class="stat-row">
              <span class="label">Objetivos Totales:</span>
              <span class="value">{{ totalObjectivesCount }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Presupuesto Asignado:</span>
              <span class="value" :class="{ 'text-danger': totalBudgetPercentage > 100 }">{{ totalBudgetPercentage }}%</span>
            </div>
            <div class="stat-row">
              <span class="label">Personal Asignado:</span>
              <span class="value" :class="{ 'text-danger': totalPersonnelPercentage > 100 }">{{ totalPersonnelPercentage }}%</span>
            </div>
          </div>

          <div class="validation-messages" v-if="validationMessages.length > 0">
            <h4>Validación</h4>
            <ul>
              <li v-for="(msg, i) in validationMessages" :key="i" class="validation-msg">{{ msg }}</li>
            </ul>
          </div>
          
          <button class="btn-large-primary" @click="startSimulation" :disabled="!isValid">
             🎮 INICIAR SIMULACIÓN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { strategicData } from '../../data/strategicData'
import type { ScenarioTemplate, DomainType, DomainObjective } from '../../types/strategic'

const emit = defineEmits<{
  (e: 'save', scenario: any): void
  (e: 'start-simulation'): void
}>()

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

const templates = ref<ScenarioTemplate[]>(strategicData.scenarioTemplates)
const selectedTemplateId = ref('')
const selectedTemplate = computed(() => templates.value.find(t => t.id === selectedTemplateId.value))

const availableDomains = [
  { id: 'analytics' as DomainType, name: 'Analytics', icon: '📊', metrics: [{id: 'voteIntention', name: 'Intención Voto'}, {id: 'sentiment', name: 'Sentimiento'}] },
  { id: 'territorio' as DomainType, name: 'Territorio', icon: '🗺️', metrics: [{id: 'districtsControlled', name: 'Distritos'}, {id: 'events', name: 'Eventos'}] },
  { id: 'predict' as DomainType, name: 'Predict', icon: '🔮', metrics: [{id: 'victoryProb', name: 'Prob. Victoria'}] },
  { id: 'monitor' as DomainType, name: 'Monitor', icon: '👁️', metrics: [{id: 'mentions', name: 'Menciones'}, {id: 'alerts', name: 'Alertas'}] },
  { id: 'crisis' as DomainType, name: 'Crisis', icon: '⚠️', metrics: [{id: 'alertLevel', name: 'Nivel Alerta'}] },
  { id: 'research' as DomainType, name: 'Research', icon: '🔍', metrics: [{id: 'inconsistencies', name: 'Inconsistencias'}] },
  { id: 'controlInfo' as DomainType, name: 'Control Info', icon: '🛡️', metrics: [{id: 'risk', name: 'Riesgo Exp.'}] }
]

const scenarioConfig = ref({
  name: '',
  objective: '',
  timeline: 120,
  resources: {
    budget: 0,
    personnel: 0,
    allocation: {
      analytics: { budgetPercentage: 0, personnelPercentage: 0 },
      territorio: { budgetPercentage: 0, personnelPercentage: 0 },
      predict: { budgetPercentage: 0, personnelPercentage: 0 },
      monitor: { budgetPercentage: 0, personnelPercentage: 0 },
      crisis: { budgetPercentage: 0, personnelPercentage: 0 },
      research: { budgetPercentage: 0, personnelPercentage: 0 },
      controlInfo: { budgetPercentage: 0, personnelPercentage: 0 }
    } as Record<DomainType, { budgetPercentage: number, personnelPercentage: number }>
  },
  domains: {
    analytics: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    territorio: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    predict: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    monitor: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    crisis: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    research: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] },
    controlInfo: { enabled: false, priority: 'medium', objectives: [] as DomainObjective[] }
  } as Record<DomainType, { enabled: boolean, priority: string, objectives: DomainObjective[] }>
})

// ─────────────────────────────────────────────────────────────────────────────
// METHODS
// ─────────────────────────────────────────────────────────────────────────────

const applyTemplate = () => {
  if (!selectedTemplate.value) return
  
  const t = selectedTemplate.value
  scenarioConfig.value.name = t.name
  scenarioConfig.value.objective = t.description
  scenarioConfig.value.timeline = t.defaultTimeline
  scenarioConfig.value.resources.budget = t.defaultBudget
  scenarioConfig.value.resources.personnel = t.defaultPersonnel
  
  // Reset domains
  const domainKeys = Object.keys(scenarioConfig.value.domains) as DomainType[]
  domainKeys.forEach((key: DomainType) => {
    scenarioConfig.value.domains[key].enabled = false
  })
  
  // Apply domain config
  t.domainConfigs.forEach(dc => {
    if (dc.domain && scenarioConfig.value.domains[dc.domain]) {
      scenarioConfig.value.domains[dc.domain].enabled = true
      scenarioConfig.value.domains[dc.domain].priority = dc.priority || 'medium'
    }
  })
}

const addObjective = (domainId: DomainType) => {
  scenarioConfig.value.domains[domainId].objectives.push({
    id: `obj-${domainId}-${Date.now()}`,
    description: '',
    metric: availableDomains.find(d => d.id === domainId)?.metrics?.[0]?.id || 'generic',
    currentValue: 0,
    targetValue: 0,
    deadline: 0,
    priority: 1,
    status: 'pending'
  })
}

const removeObjective = (domainId: DomainType, index: number) => {
  scenarioConfig.value.domains[domainId].objectives.splice(index, 1)
}

const calculateDomainBudget = (domainId: DomainType) => {
  const percentage = scenarioConfig.value.resources.allocation[domainId]?.budgetPercentage || 0
  return (scenarioConfig.value.resources.budget * percentage) / 100
}

const calculateDomainPersonnel = (domainId: DomainType) => {
  const percentage = scenarioConfig.value.resources.allocation[domainId]?.personnelPercentage || 0
  return Math.round((scenarioConfig.value.resources.personnel * percentage) / 100)
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

const getBudgetPercentage = (domainId: DomainType) => scenarioConfig.value.resources.allocation[domainId]?.budgetPercentage || 0
const getPersonnelPercentage = (domainId: DomainType) => scenarioConfig.value.resources.allocation[domainId]?.personnelPercentage || 0

const resetForm = () => {
  selectedTemplateId.value = ''
  // Reset logic...
  scenarioConfig.value.name = ''
  scenarioConfig.value.objective = ''
  scenarioConfig.value.resources.budget = 0
  scenarioConfig.value.resources.personnel = 0
  ;(Object.keys(scenarioConfig.value.domains) as DomainType[]).forEach(key => {
    scenarioConfig.value.domains[key].enabled = false
    scenarioConfig.value.domains[key].objectives = []
  })
}

const saveScenario = () => {
  console.log('Saving scenario...', scenarioConfig.value)
  emit('save', scenarioConfig.value)
}

const startSimulation = () => {
  console.log('Starting simulation...')
  emit('start-simulation')
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED
// ─────────────────────────────────────────────────────────────────────────────

const activeDomainsCount = computed(() => {
  return Object.values(scenarioConfig.value.domains).filter(d => d.enabled).length
})

const totalObjectivesCount = computed(() => {
  return Object.values(scenarioConfig.value.domains).reduce((acc, d) => acc + (d.enabled ? d.objectives.length : 0), 0)
})

const totalBudgetPercentage = computed(() => {
  return Object.values(scenarioConfig.value.resources.allocation).reduce((acc, a) => acc + a.budgetPercentage, 0)
})

const totalPersonnelPercentage = computed(() => {
  return Object.values(scenarioConfig.value.resources.allocation).reduce((acc, a) => acc + a.personnelPercentage, 0)
})

const validationMessages = computed(() => {
  const msgs = []
  if (!scenarioConfig.value.name) msgs.push('Falta nombre del escenario')
  if (totalBudgetPercentage.value > 100) msgs.push(`Presupuesto asignado excede 100% (${totalBudgetPercentage.value}%)`)
  if (totalPersonnelPercentage.value > 100) msgs.push(`Personal asignado excede 100% (${totalPersonnelPercentage.value}%)`)
  if (activeDomainsCount.value === 0) msgs.push('Debe activar al menos un dominio')
  return msgs
})

const isValid = computed(() => {
  return validationMessages.value.length === 0
})

</script>

<style scoped>
.master-scenario-builder {
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  min-height: 100vh;
  color: var(--tyravex-text);
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(var(--tyravex-primary-rgb), 0.3);
}

.header-left h2 {
  font-size: 1.8rem;
  color: var(--tyravex-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.header-left p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0.5rem 0 0 0;
}

.builder-content {
  display: grid;
  grid-template-columns: 350px 1fr 300px;
  gap: 2rem;
}

.config-section {
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.config-section h3 {
  font-size: 1.1rem;
  color: var(--tyravex-primary);
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-family: inherit;
}

.form-textarea {
  height: 80px;
  resize: vertical;
}

.domains-column h3 {
  color: var(--tyravex-primary);
  margin-top: 0;
}

.domains-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.domain-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.domain-card.active {
  border-color: var(--tyravex-primary);
  background: rgba(var(--tyravex-primary-rgb), 0.05);
}

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.domain-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.objective-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 4px;
}

.metric-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.summary-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  position: sticky;
  top: 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.stat-row .value {
  font-weight: bold;
  font-family: 'Roboto Mono', monospace;
}

.text-danger {
  color: #f44336;
}

.btn-primary, .btn-secondary, .btn-large-primary {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.btn-primary {
  background: var(--tyravex-primary);
  color: #000;
  padding: 0.5rem 1rem;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5rem 1rem;
}

.btn-large-primary {
  width: 100%;
  background: linear-gradient(135deg, var(--tyravex-primary), #00ff88);
  color: #000;
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
}

.btn-large-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
