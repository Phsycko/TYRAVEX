<template>
  <div class="scenario-simulator">
    <!-- Header -->
    <div class="scenario-simulator__header">
      <div>
        <h3 class="header__title">Simulador de Escenarios</h3>
        <p class="header__subtitle">Ajusta variables y observa el impacto en tiempo real</p>
      </div>
      <div class="header__actions">
        <button class="header-btn" @click="resetearSimulacion">
          <span class="btn-icon">🔄</span>
          Resetear
        </button>
        <button class="header-btn header-btn--primary" @click="guardarEscenario">
          <span class="btn-icon">💾</span>
          Guardar escenario
        </button>
      </div>
    </div>

    <!-- Comparison Panel -->
    <div class="scenario-simulator__comparison">
      <div class="comparison-card comparison-card--base">
        <div class="comparison-header">
          <span class="comparison-label">Escenario Base</span>
        </div>
        <div class="comparison-value">{{ escenarioBase.toFixed(1) }}%</div>
        <div class="comparison-prob">Prob. victoria: {{ probabilidadBase }}%</div>
      </div>

      <div class="comparison-arrow">→</div>

      <div class="comparison-card comparison-card--simulado">
        <div class="comparison-header">
          <span class="comparison-label">Escenario Simulado</span>
          <span 
            class="comparison-diff" 
            :class="{ 
              'comparison-diff--positivo': diferencia > 0, 
              'comparison-diff--negativo': diferencia < 0 
            }"
          >
            {{ diferencia > 0 ? '+' : '' }}{{ diferencia.toFixed(1) }}%
          </span>
        </div>
        <div class="comparison-value">{{ escenarioSimulado.toFixed(1) }}%</div>
        <div class="comparison-prob">Prob. victoria: {{ probabilidadSimulada }}%</div>
      </div>
    </div>

    <!-- Variables Section -->
    <div class="scenario-simulator__variables">
      <h4 class="variables-title">Variables ajustables</h4>

      <!-- Media Investment -->
      <div class="variable-section">
        <div class="section-header">
          <span class="section-title">💰 Inversión en Medios</span>
          <span class="section-total">${{ formatNumber(inversionTotal) }}</span>
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">TV Tradicional</label>
            <span class="variable-value">${{ formatNumber(variables.inversionTV) }}</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.inversionTV" 
            min="0" 
            max="10000000" 
            step="100000"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Digital y Redes</label>
            <span class="variable-value">${{ formatNumber(variables.inversionDigital) }}</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.inversionDigital" 
            min="0" 
            max="8000000" 
            step="100000"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Radio</label>
            <span class="variable-value">${{ formatNumber(variables.inversionRadio) }}</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.inversionRadio" 
            min="0" 
            max="3000000" 
            step="50000"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Exterior (Espectaculares)</label>
            <span class="variable-value">${{ formatNumber(variables.inversionExterior) }}</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.inversionExterior" 
            min="0" 
            max="2000000" 
            step="50000"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>
      </div>

      <!-- Geographic Focus -->
      <div class="variable-section">
        <div class="section-header">
          <span class="section-title">📍 Enfoque Geográfico</span>
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Zona Metropolitana</label>
            <span class="variable-value">{{ variables.zonaMetro }}%</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.zonaMetro" 
            min="0" 
            max="100" 
            step="5"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Zona Norte</label>
            <span class="variable-value">{{ variables.zonaNorte }}%</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.zonaNorte" 
            min="0" 
            max="100" 
            step="5"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>

        <div class="variable-item">
          <div class="variable-header">
            <label class="variable-label">Zona Sur</label>
            <span class="variable-value">{{ variables.zonaSur }}%</span>
          </div>
          <input 
            type="range" 
            v-model.number="variables.zonaSur" 
            min="0" 
            max="100" 
            step="5"
            class="variable-slider"
            @input="calcularImpacto"
          />
        </div>
      </div>

      <!-- Events -->
      <div class="variable-section">
        <div class="section-header">
          <span class="section-title">📅 Eventos de Campaña</span>
        </div>

        <div class="variable-toggle">
          <input 
            type="checkbox" 
            id="debate-positivo" 
            v-model="variables.debatePositivo"
            @change="calcularImpacto"
          />
          <label for="debate-positivo">Debate va bien (+1.5%)</label>
        </div>

        <div class="variable-toggle">
          <input 
            type="checkbox" 
            id="endorsement" 
            v-model="variables.endorsement"
            @change="calcularImpacto"
          />
          <label for="endorsement">Endorsement importante (+0.8%)</label>
        </div>

        <div class="variable-toggle">
          <input 
            type="checkbox" 
            id="evento-masivo" 
            v-model="variables.eventoMasivo"
            @change="calcularImpacto"
          />
          <label for="evento-masivo">Evento masivo (+0.5%)</label>
        </div>

        <div class="variable-toggle">
          <input 
            type="checkbox" 
            id="campana-negativa" 
            v-model="variables.campanaNegativa"
            @change="calcularImpacto"
          />
          <label for="campana-negativa">Campaña negativa vs oponente (+0.6%)</label>
        </div>
      </div>
    </div>

    <!-- Impact Summary -->
    <div class="scenario-simulator__summary">
      <div class="summary-header">Resumen de impacto</div>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Inversión total</div>
          <div class="summary-value">${{ formatNumber(inversionTotal) }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Cambio proyectado</div>
          <div class="summary-value" :class="{ 'summary-value--positivo': diferencia > 0 }">
            {{ diferencia > 0 ? '+' : '' }}{{ diferencia.toFixed(2) }}%
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-label">ROI estimado</div>
          <div class="summary-value summary-value--roi">{{ roiEstimado }}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Nivel de riesgo</div>
          <div class="summary-value">
            <span class="risk-badge" :class="`risk-badge--${nivelRiesgo.toLowerCase()}`">
              {{ nivelRiesgo }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  escenarioBase: number
  probabilidadBase: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'guardar-escenario': [variables: any, resultado: number]
}>()

// Variables state
const variables = ref({
  inversionTV: 3000000,
  inversionDigital: 2000000,
  inversionRadio: 800000,
  inversionExterior: 500000,
  zonaMetro: 40,
  zonaNorte: 30,
  zonaSur: 30,
  debatePositivo: false,
  endorsement: false,
  eventoMasivo: false,
  campanaNegativa: false
})

const escenarioSimulado = ref(props.escenarioBase)

// Computed values
const inversionTotal = computed(() => {
  return variables.value.inversionTV + 
         variables.value.inversionDigital + 
         variables.value.inversionRadio + 
         variables.value.inversionExterior
})

const diferencia = computed(() => escenarioSimulado.value - props.escenarioBase)

const probabilidadSimulada = computed(() => {
  const base = props.probabilidadBase
  const cambio = diferencia.value * 3 // Simplified conversion
  return Math.min(99, Math.max(1, base + cambio))
})

const roiEstimado = computed(() => {
  if (inversionTotal.value === 0) return 'N/A'
  const impacto = diferencia.value
  if (impacto <= 0) return 'Negativo'
  if (impacto > 2) return 'Alto'
  if (impacto > 1) return 'Medio'
  return 'Bajo'
})

const nivelRiesgo = computed(() => {
  if (inversionTotal.value > 8000000) return 'Alto'
  if (inversionTotal.value > 5000000) return 'Medio'
  return 'Bajo'
})

// Methods
const calcularImpacto = () => {
  let impacto = 0
  
  // Media impact (simplified formula)
  impacto += (variables.value.inversionTV / 1000000) * 0.15
  impacto += (variables.value.inversionDigital / 1000000) * 0.25
  impacto += (variables.value.inversionRadio / 1000000) * 0.10
  impacto += (variables.value.inversionExterior / 1000000) * 0.08
  
  // Geographic impact
  impacto += (variables.value.zonaMetro / 100) * 0.5
  impacto += (variables.value.zonaNorte / 100) * 0.3
  
  // Events impact
  if (variables.value.debatePositivo) impacto += 1.5
  if (variables.value.endorsement) impacto += 0.8
  if (variables.value.eventoMasivo) impacto += 0.5
  if (variables.value.campanaNegativa) impacto += 0.6
  
  escenarioSimulado.value = Math.min(55, props.escenarioBase + impacto)
}

const resetearSimulacion = () => {
  variables.value = {
    inversionTV: 3000000,
    inversionDigital: 2000000,
    inversionRadio: 800000,
    inversionExterior: 500000,
    zonaMetro: 40,
    zonaNorte: 30,
    zonaSur: 30,
    debatePositivo: false,
    endorsement: false,
    eventoMasivo: false,
    campanaNegativa: false
  }
  calcularImpacto()
}

const guardarEscenario = () => {
  emit('guardar-escenario', { ...variables.value }, escenarioSimulado.value)
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-MX').format(num)
}

// Initial calculation
calcularImpacto()
</script>

<style scoped>
.scenario-simulator {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.scenario-simulator__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header__title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #E8EAED;
  margin: 0 0 4px 0;
}

.header__subtitle {
  font-size: 13px;
  color: #9AA0A6;
  margin: 0;
}

.header__actions {
  display: flex;
  gap: 12px;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: rgba(74, 144, 226, 0.1);
}

.header-btn--primary {
  background: #4A90E2;
  color: #FFFFFF;
}

.header-btn--primary:hover {
  background: #6BA3E8;
}

.btn-icon {
  font-size: 14px;
}

/* Comparison */
.scenario-simulator__comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(11, 14, 17, 0.6);
  border-radius: 8px;
}

.comparison-card {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
}

.comparison-card--base {
  border-color: #2A3F5F;
}

.comparison-card--simulado {
  border-color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

.comparison-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.comparison-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.comparison-diff {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.comparison-diff--positivo {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

.comparison-diff--negativo {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}

.comparison-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #E8EAED;
  margin-bottom: 8px;
}

.comparison-prob {
  font-size: 13px;
  color: #9AA0A6;
}

.comparison-arrow {
  font-size: 32px;
  color: #4A90E2;
}

/* Variables */
.scenario-simulator__variables {
  margin-bottom: 24px;
}

.variables-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #E8EAED;
  margin: 0 0 20px 0;
}

.variable-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(11, 14, 17, 0.6);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #E8EAED;
}

.section-total {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #4A90E2;
}

.variable-item {
  margin-bottom: 16px;
}

.variable-item:last-child {
  margin-bottom: 0;
}

.variable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.variable-label {
  font-size: 13px;
  color: #E8EAED;
}

.variable-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #4A90E2;
}

.variable-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #2A3F5F;
  outline: none;
  -webkit-appearance: none;
}

.variable-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4A90E2;
  cursor: pointer;
  transition: all 0.2s ease;
}

.variable-slider::-webkit-slider-thumb:hover {
  background: #6BA3E8;
  transform: scale(1.2);
}

.variable-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4A90E2;
  cursor: pointer;
  border: none;
}

.variable-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: background 0.2s ease;
}

.variable-toggle:hover {
  background: rgba(74, 144, 226, 0.05);
}

.variable-toggle input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.variable-toggle label {
  font-size: 13px;
  color: #E8EAED;
  cursor: pointer;
}

/* Summary */
.scenario-simulator__summary {
  padding: 20px;
  background: rgba(11, 14, 17, 0.6);
  border: 1px solid #4A90E2;
  border-radius: 8px;
}

.summary-header {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #E8EAED;
  margin-bottom: 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.summary-item {
  text-align: center;
}

.summary-label {
  font-size: 12px;
  color: #9AA0A6;
  margin-bottom: 6px;
}

.summary-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: #E8EAED;
}

.summary-value--positivo {
  color: #52C41A;
}

.summary-value--roi {
  color: #4A90E2;
}

.risk-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
}

.risk-badge--bajo {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

.risk-badge--medio {
  background: rgba(250, 140, 22, 0.15);
  color: #FA8C16;
}

.risk-badge--alto {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}
</style>
