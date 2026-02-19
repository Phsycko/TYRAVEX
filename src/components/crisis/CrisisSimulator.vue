<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CrisisScenario, CrisisEvent, CrisisDecision, DecisionOption, SimulationResult } from '../../types/crisis'
import { crisisData } from '../../data/crisisData'

// State
const view = ref<'config' | 'simulation' | 'results'>('config')
const selectedScenario = ref<CrisisScenario | null>(null)
const crisisType = ref<'natural' | 'health' | 'infrastructure' | 'social' | 'informational' | 'combined'>('natural')
const magnitude = ref(72)
const populationAffected = ref(2.5)
const timing = ref(50)
const duration = ref(45)

// Simulation state
const isSimulating = ref(false)
const isPaused = ref(false)
const simulationTime = ref(0) // minutes elapsed
const crisisScore = ref(87)
const currentEvents = ref<CrisisEvent[]>([])
const currentDecision = ref<CrisisDecision | null>(null)
const decisionTimeLeft = ref(0)
const decisionsMade = ref<{ decisionId: string; optionId: string; timestamp: number }[]>([])

// Resources
const resources = ref({
  ambulances: { available: 23, total: 45 },
  firetrucks: { available: 12, total: 18 },
  police: { available: 34, total: 50 },
  helicopters: { available: 2, total: 3 },
  medicalStaff: { available: 234, total: 400 }
})

// Results
const simulationResults = ref<SimulationResult | null>(null)

// Computed
const scenariosByType = computed(() => {
  return crisisData.scenarios.filter(s => s.type === crisisType.value)
})

const magnitudeLabel = computed(() => {
  if (crisisType.value === 'natural') return `${magnitude.value / 10} Richter`
  if (crisisType.value === 'health') return `${magnitude.value}% transmisibilidad`
  return `Nivel ${magnitude.value}/100`
})

const populationLabel = computed(() => {
  return `${populationAffected.value}M personas`
})

const timingLabel = computed(() => {
  const hours = Math.floor((timing.value / 100) * 24)
  return `${hours.toString().padStart(2, '0')}:${((timing.value % 100) * 0.6).toFixed(0).padStart(2, '0')}`
})

const durationLabel = computed(() => {
  if (duration.value < 60) return `${duration.value} segundos`
  if (duration.value < 1440) return `${Math.floor(duration.value / 60)} horas`
  return `${Math.floor(duration.value / 1440)} días`
})

const timeElapsedFormatted = computed(() => {
  const hours = Math.floor(simulationTime.value / 60)
  const minutes = simulationTime.value % 60
  const seconds = Math.floor((simulationTime.value % 1) * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const crisisLevel = computed(() => {
  if (crisisScore.value >= 80) return { label: 'CRÍTICO', color: 'text-tyravex-danger', bg: 'bg-tyravex-danger/20' }
  if (crisisScore.value >= 60) return { label: 'ALTO', color: 'text-tyravex-warning', bg: 'bg-tyravex-warning/20' }
  if (crisisScore.value >= 40) return { label: 'MEDIO', color: 'text-tyravex-data-blue', bg: 'bg-tyravex-data-blue/20' }
  return { label: 'BAJO', color: 'text-tyravex-success', bg: 'bg-tyravex-success/20' }
})

// Methods
const startSimulation = () => {
  view.value = 'simulation'
  isSimulating.value = true
  simulationTime.value = 0
  currentEvents.value = []
  decisionsMade.value = []
  
  // Generate initial events
  generateInitialEvents()
  
  // Start simulation loop
  runSimulation()
}

const generateInitialEvents = () => {
  currentEvents.value = [
    {
      id: 'evt-001',
      timestamp: 5,
      category: 'health',
      severity: 'critical',
      title: '4 hospitales reportan daños estructurales',
      description: 'Capacidad reducida al 40% (850 camas disponibles)',
      impact: ['1,240 heridos confirmados (+89 críticos)', 'Sistema TRIAGE saturando en 15 minutos']
    },
    {
      id: 'evt-002',
      timestamp: 5,
      category: 'infrastructure',
      severity: 'high',
      title: '15 colonias sin electricidad',
      description: '450K personas afectadas',
      impact: ['3 puentes con daño estructural (cerrados)', '2 subestaciones eléctricas en fallo']
    },
    {
      id: 'evt-003',
      timestamp: 5,
      category: 'communications',
      severity: 'medium',
      title: 'Red telefónica saturada al 60%',
      description: '2,340 llamadas 911 en cola',
      impact: ['Tiempo de espera: 8 minutos', 'Internet móvil degradado 40%']
    },
    {
      id: 'evt-004',
      timestamp: 5,
      category: 'population',
      severity: 'high',
      title: '50K personas atrapadas en estadio',
      description: 'Pánico controlado, evacuación en curso',
      impact: ['12 edificios colapsados (rescates en curso)', '8 edificios en riesgo (15K personas)']
    }
  ]
  
  // Generate first decision after 3 minutes
  setTimeout(() => {
    if (isSimulating.value && !isPaused.value) {
      generateDecision()
    }
  }, 3000)
}

const generateDecision = () => {
  currentDecision.value = {
    id: 'dec-001',
    timestamp: simulationTime.value,
    title: 'Hospital Central - Evacuación Urgente',
    situation: '280 pacientes, grieta estructural crítica detectada',
    timeLimit: 225, // 3:45
    options: [
      {
        id: 'opt-a',
        label: 'A) Evacuar todos los pacientes',
        description: '2-3 horas, alto riesgo durante traslado',
        resources: [
          { type: 'Ambulancias', quantity: 15, duration: 3 },
          { type: 'Hospitales receptores', quantity: 3, duration: 3 },
          { type: 'Paramédicos', quantity: 45, duration: 3 }
        ],
        consequences: [
          { type: 'positive', description: 'Todos los pacientes a salvo', impact: 30 },
          { type: 'negative', description: 'Alto riesgo durante traslado (posibles complicaciones)', impact: -15 },
          { type: 'negative', description: 'Recursos no disponibles para otras emergencias', impact: -20 }
        ],
        score: 75
      },
      {
        id: 'opt-b',
        label: 'B) Evacuar solo pacientes críticos',
        description: '30 minutos, 180 pacientes expuestos',
        resources: [
          { type: 'Ambulancias', quantity: 6, duration: 0.5 },
          { type: 'Hospitales receptores', quantity: 1, duration: 0.5 },
          { type: 'Paramédicos', quantity: 18, duration: 0.5 }
        ],
        consequences: [
          { type: 'positive', description: 'Pacientes críticos a salvo rápidamente', impact: 20 },
          { type: 'positive', description: 'Recursos disponibles para otras emergencias', impact: 15 },
          { type: 'negative', description: '180 pacientes expuestos a riesgo de colapso', impact: -40 }
        ],
        score: 60
      },
      {
        id: 'opt-c',
        label: 'C) Reforzar estructura y monitorear',
        description: 'Rápido, riesgo de colapso',
        resources: [
          { type: 'Ingenieros estructurales', quantity: 2, duration: 1 },
          { type: 'Equipo de refuerzo', quantity: 1, duration: 1 }
        ],
        consequences: [
          { type: 'positive', description: 'Todos los pacientes permanecen en atención', impact: 25 },
          { type: 'positive', description: 'Recursos médicos disponibles', impact: 20 },
          { type: 'negative', description: 'Alto riesgo de colapso estructural', impact: -50 }
        ],
        score: 45
      }
    ]
  }
  
  decisionTimeLeft.value = 225
  startDecisionTimer()
}

const startDecisionTimer = () => {
  const timer = setInterval(() => {
    if (!isSimulating.value || isPaused.value) {
      clearInterval(timer)
      return
    }
    
    decisionTimeLeft.value--
    
    if (decisionTimeLeft.value <= 0) {
      clearInterval(timer)
      // Auto-select middle option if time runs out
      if (currentDecision.value) {
        makeDecision(currentDecision.value.options[1].id)
      }
    }
  }, 1000)
}

const makeDecision = (optionId: string) => {
  if (!currentDecision.value) return
  
  decisionsMade.value.push({
    decisionId: currentDecision.value.id,
    optionId,
    timestamp: simulationTime.value
  })
  
  // Apply consequences
  const option = currentDecision.value.options.find(o => o.id === optionId)
  if (option) {
    // Adjust crisis score based on decision
    crisisScore.value = Math.max(0, Math.min(100, crisisScore.value + (option.score - 60)))
    
    // Update resources
    option.resources.forEach(req => {
      if (req.type === 'Ambulancias') {
        resources.value.ambulances.available = Math.max(0, resources.value.ambulances.available - req.quantity)
      }
    })
  }
  
  currentDecision.value = null
  decisionTimeLeft.value = 0
  
  // Continue simulation
  setTimeout(() => {
    if (isSimulating.value && simulationTime.value < 360) {
      generateNextEvent()
    } else {
      endSimulation()
    }
  }, 2000)
}

const generateNextEvent = () => {
  const newEvent: CrisisEvent = {
    id: `evt-${Date.now()}`,
    timestamp: simulationTime.value,
    category: 'alert',
    severity: 'warning',
    title: 'Réplica 5.8 detectada',
    description: 'Réplica prevista en próximos 20 minutos',
    impact: ['Posibles daños adicionales a estructuras comprometidas']
  }
  
  currentEvents.value.unshift(newEvent)
}

const runSimulation = () => {
  const interval = setInterval(() => {
    if (!isSimulating.value) {
      clearInterval(interval)
      return
    }
    
    if (!isPaused.value) {
      simulationTime.value += 0.1 // 6 seconds real time = 1 minute simulated
      
      // End simulation after 6 hours simulated
      if (simulationTime.value >= 360) {
        clearInterval(interval)
        endSimulation()
      }
    }
  }, 100)
}

const endSimulation = () => {
  isSimulating.value = false
  
  // Calculate results
  simulationResults.value = {
    scenarioId: selectedScenario.value?.id || 'scenario-001',
    duration: simulationTime.value / 60, // hours
    realTime: 18, // minutes
    score: {
      overall: 76,
      effectiveness: 72,
      responseTime: 85,
      coordination: 68
    },
    outcomes: {
      fatalities: 12,
      injured: 1180,
      served: 1180,
      resourceEfficiency: 78
    },
    decisions: decisionsMade.value.map(d => ({
      decisionId: d.decisionId,
      optionChosen: d.optionId,
      outcome: 'success' as const,
      impact: 'Evacuación exitosa sin fatalidades'
    })),
    lessonsLearned: [
      'Priorizar evaluación estructural de hospitales',
      'Mantener reserva de ambulancias (no usar 100%)',
      'Activar backup de agua para hospitales antes',
      'Mejorar comunicación inter-agencias'
    ]
  }
  
  view.value = 'results'
}

const pauseSimulation = () => {
  isPaused.value = !isPaused.value
}

const resetSimulation = () => {
  view.value = 'config'
  isSimulating.value = false
  isPaused.value = false
  simulationTime.value = 0
  currentEvents.value = []
  currentDecision.value = null
  simulationResults.value = null
  decisionsMade.value = []
  
  // Reset resources
  resources.value = {
    ambulances: { available: 23, total: 45 },
    firetrucks: { available: 12, total: 18 },
    police: { available: 34, total: 50 },
    helicopters: { available: 2, total: 3 },
    medicalStaff: { available: 234, total: 400 }
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="crisis-simulator">
    <!-- CONFIGURATION VIEW -->
    <div v-if="view === 'config'" class="config-view">
      <div class="header">
        <h2 class="title">🎮 Crisis Simulator - War Game Training</h2>
        <button class="btn-primary">Nueva simulación</button>
      </div>

      <div class="config-content">
        <h3 class="section-title">CREAR SIMULACIÓN DE CRISIS:</h3>

        <!-- Crisis Type Selection -->
        <div class="form-group">
          <label class="form-label">Tipo de crisis:</label>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="natural" />
              <span>● Desastre natural (Terremoto, huracán, inundación)</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="health" />
              <span>○ Crisis de salud pública (Pandemia, brote epidémico)</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="infrastructure" />
              <span>○ Crisis de infraestructura (Apagón, colapso de red)</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="social" />
              <span>○ Crisis social (Disturbios, protestas masivas)</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="informational" />
              <span>○ Crisis informacional (Desinformación viral, hack masivo)</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="crisisType" value="combined" />
              <span>○ Combinación múltiple (Cascada de crisis)</span>
            </label>
          </div>
        </div>

        <!-- Scenario Selection -->
        <div class="form-group">
          <label class="form-label">Escenario:</label>
          <select v-model="selectedScenario" class="select-input">
            <option :value="null">Personalizado</option>
            <option v-for="scenario in scenariosByType" :key="scenario.id" :value="scenario">
              {{ scenario.name }}
            </option>
          </select>
        </div>

        <!-- Parameters -->
        <div class="form-group">
          <label class="form-label">Parámetros:</label>
          
          <div class="slider-group">
            <label class="slider-label">Magnitud:</label>
            <input type="range" v-model="magnitude" min="0" max="100" class="slider" />
            <span class="slider-value">{{ magnitudeLabel }}</span>
          </div>

          <div class="slider-group">
            <label class="slider-label">Población afectada:</label>
            <input type="range" v-model="populationAffected" min="0.1" max="5" step="0.1" class="slider" />
            <span class="slider-value">{{ populationLabel }}</span>
          </div>

          <div class="slider-group">
            <label class="slider-label">Hora del evento:</label>
            <input type="range" v-model="timing" min="0" max="100" class="slider" />
            <span class="slider-value">{{ timingLabel }}</span>
          </div>

          <div class="slider-group">
            <label class="slider-label">Duración:</label>
            <input type="range" v-model="duration" min="10" max="10080" class="slider" />
            <span class="slider-value">{{ durationLabel }}</span>
          </div>
        </div>

        <!-- Initial Conditions -->
        <div class="form-group">
          <label class="form-label">Condiciones iniciales:</label>
          <div class="checkbox-group">
            <label class="checkbox-option">
              <input type="checkbox" checked />
              <span>☑ Hospitales al 75% capacidad</span>
            </label>
            <label class="checkbox-option">
              <input type="checkbox" checked />
              <span>☑ Temporada de lluvias (riesgo deslaves)</span>
            </label>
            <label class="checkbox-option">
              <input type="checkbox" checked />
              <span>☑ Evento masivo en estadio (50K personas)</span>
            </label>
            <label class="checkbox-option">
              <input type="checkbox" />
              <span>☐ Red eléctrica parcialmente degradada</span>
            </label>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="startSimulation" class="btn-start">🎯 INICIAR SIMULACIÓN</button>
          <button class="btn-secondary">📋 Cargar escenario guardado</button>
        </div>
      </div>
    </div>

    <!-- SIMULATION VIEW -->
    <div v-if="view === 'simulation'" class="simulation-view">
      <div class="sim-header">
        <h2 class="title">SIMULACIÓN EN CURSO</h2>
        <div class="sim-controls">
          <button @click="pauseSimulation" class="btn-control">{{ isPaused ? '▶️ Reanudar' : '⏸️ Pausar' }}</button>
          <button class="btn-control">⏭️ Avanzar rápido</button>
          <button @click="resetSimulation" class="btn-control">🔄 Reiniciar</button>
          <button class="btn-control">💾 Guardar progreso</button>
        </div>
      </div>

      <div class="sim-status">
        <div class="status-item">
          <span class="status-label">⏱️ Tiempo transcurrido:</span>
          <span class="status-value">T+{{ timeElapsedFormatted }}</span>
        </div>
        <div class="status-item">
          <span class="status-label">🌡️ Nivel de crisis:</span>
          <span class="status-value" :class="crisisLevel.color">
            🔴 {{ crisisLevel.label }} (Score: {{ crisisScore }}/100)
          </span>
        </div>
      </div>

      <!-- Current Situation -->
      <div class="situation-panel">
        <h3 class="panel-title">SITUACIÓN ACTUAL (actualización en tiempo real)</h3>
        
        <div class="events-grid">
          <div v-for="event in currentEvents" :key="event.id" class="event-card">
            <div class="event-header">
              <span class="event-icon">
                {{ event.category === 'health' ? '🏥' : event.category === 'infrastructure' ? '⚡' : event.category === 'communications' ? '📞' : event.category === 'population' ? '👥' : '⚠️' }}
              </span>
              <span class="event-category">{{ event.category.toUpperCase() }}:</span>
            </div>
            <div class="event-content">
              <div class="event-title">• {{ event.title }}</div>
              <div class="event-description">• {{ event.description }}</div>
              <div v-for="(impact, idx) in event.impact" :key="idx" class="event-impact">
                • {{ impact }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decision Required -->
      <div v-if="currentDecision" class="decision-panel">
        <h3 class="panel-title">DECISIÓN REQUERIDA:</h3>
        
        <div class="decision-card">
          <div class="decision-header">
            <h4 class="decision-title">🚨 DECISIÓN: {{ currentDecision.title }}</h4>
            <div class="decision-timer">
              <span>Tiempo para decidir: ⏱️ {{ formatTime(decisionTimeLeft) }}</span>
            </div>
          </div>

          <div class="decision-situation">
            <strong>Situación:</strong> {{ currentDecision.situation }}
          </div>

          <div class="decision-options">
            <h5>Opciones:</h5>
            <div v-for="option in currentDecision.options" :key="option.id" class="option-card">
              <div class="option-label">{{ option.label }}</div>
              <div class="option-description">{{ option.description }}</div>
              
              <div class="option-resources">
                <strong>Recursos necesarios:</strong>
                <div v-for="(resource, idx) in option.resources" :key="idx" class="resource-item">
                  {{ resource.quantity }} {{ resource.type }}
                </div>
              </div>

              <button @click="makeDecision(option.id)" class="btn-option">
                Seleccionar opción {{ option.id.split('-')[1].toUpperCase() }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources Available -->
      <div class="resources-panel">
        <h4 class="panel-subtitle">RECURSOS DISPONIBLES:</h4>
        <div class="resources-grid">
          <div class="resource-stat">
            Ambulancias: {{ resources.ambulances.available }}/{{ resources.ambulances.total }} disponibles
          </div>
          <div class="resource-stat">
            Bomberos: {{ resources.firetrucks.available }}/{{ resources.firetrucks.total }} unidades
          </div>
          <div class="resource-stat">
            Policía: {{ resources.police.available }}/{{ resources.police.total }} patrullas
          </div>
          <div class="resource-stat">
            Helicópteros: {{ resources.helicopters.available }}/{{ resources.helicopters.total }}
          </div>
          <div class="resource-stat">
            Personal médico: {{ resources.medicalStaff.available }}/{{ resources.medicalStaff.total }} en servicio
          </div>
        </div>
      </div>
    </div>

    <!-- RESULTS VIEW -->
    <div v-if="view === 'results' && simulationResults" class="results-view">
      <div class="results-header">
        <h2 class="title">📊 RESULTADOS DE SIMULACIÓN</h2>
      </div>

      <div class="results-summary">
        <div class="summary-item">
          <span>Duración simulada:</span>
          <span>{{ simulationResults.duration.toFixed(1) }} horas</span>
        </div>
        <div class="summary-item">
          <span>Tiempo real:</span>
          <span>{{ simulationResults.realTime }} minutos</span>
        </div>
      </div>

      <div class="metrics-panel">
        <h3 class="panel-title">MÉTRICAS FINALES:</h3>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Víctimas fatales:</div>
            <div class="metric-value success">{{ simulationResults.outcomes.fatalities }} (objetivo: &lt;20) ✅</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Heridos atendidos:</div>
            <div class="metric-value success">{{ simulationResults.outcomes.served }}/1,240 (95%) ✅</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Recursos optimizados:</div>
            <div class="metric-value warning">{{ simulationResults.outcomes.resourceEfficiency }}% eficiencia ⚠️</div>
          </div>
        </div>
      </div>

      <div class="score-panel">
        <h3 class="panel-title">SCORE GLOBAL:</h3>
        <div class="score-display">
          <div class="score-number">{{ simulationResults.score.overall }}/100</div>
          <div class="score-label">ACEPTABLE</div>
        </div>
        <div class="score-breakdown">
          <div class="score-item">
            <span>Efectividad:</span>
            <span>{{ simulationResults.score.effectiveness }}/100</span>
          </div>
          <div class="score-item">
            <span>Tiempo respuesta:</span>
            <span>{{ simulationResults.score.responseTime }}/100</span>
          </div>
          <div class="score-item">
            <span>Coordinación:</span>
            <span>{{ simulationResults.score.coordination }}/100</span>
          </div>
        </div>
      </div>

      <div class="lessons-panel">
        <h3 class="panel-title">LECCIONES APRENDIDAS:</h3>
        <ol class="lessons-list">
          <li v-for="(lesson, idx) in simulationResults.lessonsLearned" :key="idx">
            {{ lesson }}
          </li>
        </ol>
      </div>

      <div class="results-actions">
        <button class="btn-primary">📄 Ver reporte completo</button>
        <button @click="resetSimulation" class="btn-secondary">🎯 Intentar de nuevo</button>
        <button class="btn-secondary">💾 Guardar para training</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crisis-simulator {
  padding: 1.5rem;
  color: var(--tyravex-text-primary);
}

/* Configuration View */
.config-view {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--tyravex-text-primary);
}

.btn-primary {
  background: var(--tyravex-primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--tyravex-primary-light);
  transform: translateY(-1px);
}

.config-content {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--tyravex-text-primary);
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--tyravex-text-secondary);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.radio-option:hover {
  background: var(--tyravex-bg-tertiary);
}

.radio-option input[type="radio"] {
  cursor: pointer;
}

.select-input {
  width: 100%;
  background: var(--tyravex-bg-tertiary);
  border: 1px solid var(--tyravex-border);
  border-radius: 6px;
  padding: 0.75rem;
  color: var(--tyravex-text-primary);
  font-size: 0.95rem;
}

.slider-group {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.slider-label {
  color: var(--tyravex-text-secondary);
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--tyravex-bg-tertiary);
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--tyravex-primary);
  cursor: pointer;
}

.slider-value {
  min-width: 150px;
  text-align: right;
  font-weight: 500;
  color: var(--tyravex-text-primary);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--tyravex-border);
}

.btn-start {
  background: var(--tyravex-danger);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-start:hover {
  background: #c92a2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-secondary {
  background: var(--tyravex-bg-tertiary);
  color: var(--tyravex-text-primary);
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--tyravex-border);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: var(--tyravex-bg-secondary);
}

/* Simulation View */
.simulation-view {
  max-width: 1400px;
  margin: 0 auto;
}

.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--tyravex-border);
}

.sim-controls {
  display: flex;
  gap: 0.5rem;
}

.btn-control {
  background: var(--tyravex-bg-tertiary);
  color: var(--tyravex-text-primary);
  padding: 0.5rem 1rem;
  border: 1px solid var(--tyravex-border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-control:hover {
  background: var(--tyravex-bg-secondary);
}

.sim-status {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.status-label {
  font-size: 0.9rem;
  color: var(--tyravex-text-muted);
}

.status-value {
  font-size: 1.2rem;
  font-weight: 600;
}

.situation-panel {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--tyravex-text-primary);
}

.events-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-card {
  background: var(--tyravex-bg-tertiary);
  border-left: 4px solid var(--tyravex-primary);
  padding: 1rem;
  border-radius: 6px;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--tyravex-text-primary);
}

.event-icon {
  font-size: 1.2rem;
}

.event-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--tyravex-text-secondary);
  font-size: 0.95rem;
}

.event-title {
  font-weight: 500;
  color: var(--tyravex-text-primary);
}

.decision-panel {
  background: var(--tyravex-bg-card);
  border: 2px solid var(--tyravex-danger);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { border-color: var(--tyravex-danger); }
  50% { border-color: var(--tyravex-warning); }
}

.decision-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.decision-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.decision-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--tyravex-danger);
}

.decision-timer {
  font-size: 1rem;
  font-weight: 600;
  color: var(--tyravex-warning);
}

.decision-situation {
  padding: 1rem;
  background: var(--tyravex-bg-tertiary);
  border-radius: 6px;
  color: var(--tyravex-text-secondary);
}

.decision-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-card {
  background: var(--tyravex-bg-tertiary);
  border: 1px solid var(--tyravex-border);
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s;
}

.option-card:hover {
  border-color: var(--tyravex-primary);
  transform: translateX(4px);
}

.option-label {
  font-weight: 600;
  color: var(--tyravex-text-primary);
  margin-bottom: 0.5rem;
}

.option-description {
  color: var(--tyravex-text-secondary);
  margin-bottom: 1rem;
}

.option-resources {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--tyravex-bg-secondary);
  border-radius: 4px;
  font-size: 0.9rem;
}

.resource-item {
  color: var(--tyravex-text-secondary);
  margin-top: 0.25rem;
}

.btn-option {
  background: var(--tyravex-primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-option:hover {
  background: var(--tyravex-primary-light);
}

.resources-panel {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 1.5rem;
}

.panel-subtitle {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--tyravex-text-primary);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.resource-stat {
  color: var(--tyravex-text-secondary);
  font-size: 0.95rem;
}

/* Results View */
.results-view {
  max-width: 1200px;
  margin: 0 auto;
}

.results-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--tyravex-border);
}

.results-summary {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item span:first-child {
  font-size: 0.9rem;
  color: var(--tyravex-text-muted);
}

.summary-item span:last-child {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--tyravex-text-primary);
}

.metrics-panel {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: var(--tyravex-bg-tertiary);
  padding: 1rem;
  border-radius: 6px;
}

.metric-label {
  font-size: 0.9rem;
  color: var(--tyravex-text-muted);
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.metric-value.success {
  color: var(--tyravex-success);
}

.metric-value.warning {
  color: var(--tyravex-warning);
}

.score-panel {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 2rem;
  background: var(--tyravex-bg-tertiary);
  border-radius: 8px;
}

.score-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--tyravex-primary);
}

.score-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--tyravex-text-secondary);
}

.score-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.score-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--tyravex-bg-tertiary);
  border-radius: 6px;
}

.lessons-panel {
  background: var(--tyravex-bg-card);
  border: 1px solid var(--tyravex-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.lessons-list {
  padding-left: 1.5rem;
  color: var(--tyravex-text-secondary);
}

.lessons-list li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
