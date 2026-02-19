<template>
  <div class="victory-probability">
    <!-- Header -->
    <div class="victory-probability__header">
      <h3 class="header__title">Probabilidad de Victoria</h3>
      <div class="header__updated">Actualizado hace 15 min</div>
    </div>

    <!-- Gauge Principal -->
    <div class="victory-probability__gauge">
      <svg class="gauge-svg" viewBox="0 0 200 120">
        <!-- Background Arc -->
        <path
          class="gauge-bg"
          :d="getArcPath(0, 180)"
          fill="none"
          stroke="#2A3F5F"
          stroke-width="20"
        />
        <!-- Progress Arc -->
        <path
          class="gauge-progress"
          :d="getArcPath(0, (probabilidad.probabilidad / 100) * 180)"
          fill="none"
          :stroke="getColorByProbability(probabilidad.probabilidad)"
          stroke-width="20"
          stroke-linecap="round"
        />
        <!-- Percentage Text -->
        <text x="100" y="85" class="gauge-text">{{ probabilidad.probabilidad.toFixed(1) }}%</text>
        <text x="100" y="105" class="gauge-label">Probabilidad</text>
      </svg>
    </div>

    <!-- Escenarios -->
    <div class="victory-probability__escenarios">
      <div 
        v-for="escenario in probabilidad.escenarios" 
        :key="escenario.tipo"
        class="escenario-item"
      >
        <div class="escenario-item__header">
          <span class="escenario-tipo">{{ escenario.tipo }}</span>
          <span class="escenario-prob">{{ escenario.probabilidad }}%</span>
        </div>
        <div class="escenario-item__bar">
          <div 
            class="escenario-bar-fill" 
            :style="{ width: `${escenario.probabilidad}%`, backgroundColor: getColorByProbability(escenario.probabilidad) }"
          ></div>
        </div>
        <div class="escenario-votos">{{ escenario.votos }}% de votos</div>
      </div>
    </div>

    <!-- Factores -->
    <div class="victory-probability__factores">
      <div class="factores__titulo">Factores de impacto</div>
      <div class="factores__lista">
        <div 
          v-for="(factor, index) in probabilidad.factoresVictoria" 
          :key="index"
          class="factor-item"
          :class="{ 'factor-item--positivo': factor.positivo, 'factor-item--negativo': !factor.positivo }"
        >
          <span class="factor-icono">{{ factor.positivo ? '✓' : '⚠' }}</span>
          <span class="factor-nombre">{{ factor.factor }}</span>
          <span class="factor-valor">{{ factor.valor }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="victory-probability__actions">
      <button class="action-btn action-btn--primary" @click="$emit('abrir-simulador')">
        <span class="btn-icon">🎯</span>
        Simular escenarios
      </button>
      <button class="action-btn action-btn--secondary" @click="$emit('ver-estrategia')">
        <span class="btn-icon">📊</span>
        Ver estrategia
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Escenario {
  tipo: string
  probabilidad: number
  votos: number
}

interface Factor {
  factor: string
  valor: string
  positivo: boolean
}

interface ProbabilidadVictoria {
  probabilidad: number
  factoresVictoria: Factor[]
  escenarios: Escenario[]
}

interface Props {
  probabilidad: ProbabilidadVictoria
}

defineProps<Props>()

defineEmits<{
  'abrir-simulador': []
  'ver-estrategia': []
}>()

// Helper para generar el path del arco SVG
const getArcPath = (startAngle: number, endAngle: number): string => {
  const centerX = 100
  const centerY = 100
  const radius = 70
  
  const startRad = (startAngle - 90) * (Math.PI / 180)
  const endRad = (endAngle - 90) * (Math.PI / 180)
  
  const x1 = centerX + radius * Math.cos(startRad)
  const y1 = centerY + radius * Math.sin(startRad)
  const x2 = centerX + radius * Math.cos(endRad)
  const y2 = centerY + radius * Math.sin(endRad)
  
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
}

// Helper para color según probabilidad
const getColorByProbability = (prob: number): string => {
  if (prob >= 70) return '#52C41A'
  if (prob >= 50) return '#FA8C16'
  return '#D32F2F'
}
</script>

<style scoped>
.victory-probability {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.victory-probability__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header__title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #E8EAED;
  margin: 0;
}

.header__updated {
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #9AA0A6;
}

/* Gauge */
.victory-probability__gauge {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.gauge-svg {
  width: 200px;
  height: 120px;
}

.gauge-progress {
  transition: stroke-dashoffset 1s ease;
}

.gauge-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  fill: #E8EAED;
  text-anchor: middle;
}

.gauge-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  fill: #9AA0A6;
  text-anchor: middle;
}

/* Escenarios */
.victory-probability__escenarios {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #2A3F5F;
}

.escenario-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.escenario-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.escenario-tipo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #E8EAED;
}

.escenario-prob {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  color: #4A90E2;
}

.escenario-item__bar {
  height: 6px;
  background: #0B0E11;
  border-radius: 3px;
  overflow: hidden;
}

.escenario-bar-fill {
  height: 100%;
  transition: width 0.6s ease;
  border-radius: 3px;
}

.escenario-votos {
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #9AA0A6;
}

/* Factores */
.victory-probability__factores {
  margin-bottom: 24px;
}

.factores__titulo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.factores__lista {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.factor-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.factor-item:hover {
  background: rgba(74, 144, 226, 0.05);
}

.factor-item--positivo .factor-icono {
  color: #52C41A;
}

.factor-item--negativo .factor-icono {
  color: #FA8C16;
}

.factor-icono {
  font-size: 14px;
}

.factor-nombre {
  flex: 1;
  font-size: 13px;
  color: #E8EAED;
}

.factor-valor {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  color: #4A90E2;
}

/* Actions */
.victory-probability__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.action-btn--primary {
  background: #4A90E2;
  color: #FFFFFF;
}

.action-btn--primary:hover {
  background: #6BA3E8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
}

.action-btn--secondary {
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
}

.action-btn--secondary:hover {
  background: rgba(74, 144, 226, 0.1);
  border-color: #6BA3E8;
}

.btn-icon {
  font-size: 16px;
}
</style>
