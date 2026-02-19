<template>
  <div class="timeline-projection">
    <!-- Header -->
    <div class="timeline-projection__header">
      <div>
        <h3 class="header__title">Proyección Temporal</h3>
        <p class="header__subtitle">Evolución hasta el día de la elección</p>
      </div>
      <div class="header__controls">
        <button 
          v-for="periodo in periodos" 
          :key="periodo.value"
          class="control-btn"
          :class="{ 'control-btn--active': periodoActivo === periodo.value }"
          @click="periodoActivo = periodo.value"
        >
          {{ periodo.label }}
        </button>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="timeline-projection__chart">
      <svg class="chart-svg" viewBox="0 0 800 300">
        <!-- Grid Lines -->
        <g class="grid">
          <line v-for="i in 5" :key="`h-${i}`" 
            :x1="60" :y1="40 + (i - 1) * 50" 
            :x2="760" :y2="40 + (i - 1) * 50" 
            stroke="#2A3F5F" stroke-width="1" stroke-dasharray="4,4" />
        </g>

        <!-- Y-Axis Labels -->
        <g class="y-axis">
          <text v-for="(val, i) in [55, 52.5, 50, 47.5, 45]" :key="`y-${i}`"
            :x="50" :y="45 + i * 50" 
            fill="#9AA0A6" font-size="11" text-anchor="end" font-family="Roboto Mono">
            {{ val }}%
          </text>
        </g>

        <!-- Threshold Line (50%) -->
        <line x1="60" y1="140" x2="760" y2="140" stroke="#FA8C16" stroke-width="2" stroke-dasharray="8,4" />
        <text x="765" y="143" fill="#FA8C16" font-size="10" font-family="Roboto Mono">50%</text>

        <!-- Confidence Band -->
        <path 
          :d="getConfidenceBandPath()" 
          fill="rgba(82, 196, 26, 0.1)" 
          stroke="none" 
        />

        <!-- Oponente Line -->
        <polyline 
          :points="getLinePoints(proyeccion, 'oponente')" 
          fill="none" 
          stroke="#D32F2F" 
          stroke-width="2" 
        />

        <!-- Tu Candidato Line -->
        <polyline 
          :points="getLinePoints(proyeccion, 'tuCandidato')" 
          fill="none" 
          stroke="#52C41A" 
          stroke-width="3" 
        />

        <!-- Data Points -->
        <g v-for="(punto, index) in proyeccion" :key="`point-${index}`">
          <circle 
            :cx="getX(index)" 
            :cy="getY(punto.tuCandidato)" 
            r="4" 
            fill="#52C41A" 
            class="data-point"
            @mouseenter="mostrarTooltip(punto, index)"
            @mouseleave="ocultarTooltip"
          />
        </g>

        <!-- Event Markers -->
        <g v-for="evento in eventos" :key="`evento-${evento.dia}`">
          <line 
            :x1="getXByDia(evento.dia)" 
            :y1="40" 
            :x2="getXByDia(evento.dia)" 
            :y2="240" 
            stroke="#4A90E2" 
            stroke-width="2" 
            stroke-dasharray="4,4" 
            opacity="0.5"
          />
          <text 
            :x="getXByDia(evento.dia)" 
            y="30" 
            fill="#4A90E2" 
            font-size="10" 
            text-anchor="middle"
            font-family="Inter">
            {{ evento.nombre }}
          </text>
        </g>

        <!-- X-Axis Labels -->
        <g class="x-axis">
          <text v-for="(punto, index) in proyeccion" :key="`x-${index}`"
            :x="getX(index)" 
            y="260" 
            fill="#9AA0A6" 
            font-size="11" 
            text-anchor="middle"
            font-family="Roboto Mono">
            {{ punto.label }}
          </text>
        </g>
      </svg>

      <!-- Tooltip -->
      <div v-if="tooltipVisible" class="chart-tooltip" :style="{ left: `${tooltipX}px`, top: `${tooltipY}px` }">
        <div class="tooltip-title">{{ tooltipData?.label }}</div>
        <div class="tooltip-row">
          <span class="tooltip-label" style="color: #52C41A;">Tu candidato:</span>
          <span class="tooltip-value">{{ tooltipData?.tuCandidato }}%</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label" style="color: #D32F2F;">Oponente:</span>
          <span class="tooltip-value">{{ tooltipData?.oponente }}%</span>
        </div>
        <div class="tooltip-row tooltip-row--range">
          <span class="tooltip-label">Rango:</span>
          <span class="tooltip-value">{{ tooltipData?.min }}% - {{ tooltipData?.max }}%</span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="timeline-projection__legend">
      <div class="legend-item">
        <div class="legend-color" style="background: #52C41A;"></div>
        <span>Tu Candidato</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #D32F2F;"></div>
        <span>Oponente Principal</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: rgba(82, 196, 26, 0.2);"></div>
        <span>Banda de confianza</span>
      </div>
      <div class="legend-item">
        <div class="legend-line"></div>
        <span>Umbral de victoria (50%)</span>
      </div>
    </div>

    <!-- Export Button -->
    <div class="timeline-projection__footer">
      <button class="export-btn" @click="$emit('exportar')">
        <span class="btn-icon">📥</span>
        Exportar proyección
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PuntoProyeccion {
  dia: number
  label: string
  tuCandidato: number
  oponente: number
  min: number
  max: number
}

interface Evento {
  dia: number
  nombre: string
  impactoEstimado: number
  tipo: string
}

interface Props {
  proyeccion: PuntoProyeccion[]
  eventos: Evento[]
}

const props = defineProps<Props>()

defineEmits<{
  'exportar': []
}>()

const periodos = [
  { label: '30D', value: 30 },
  { label: '60D', value: 60 },
  { label: '90D', value: 90 },
  { label: 'Todo', value: 0 }
]

const periodoActivo = ref(0)

// Tooltip state
const tooltipVisible = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipData = ref<PuntoProyeccion | null>(null)

// Chart helpers
const getX = (index: number): number => {
  return 60 + (index * (700 / 6))
}

const getXByDia = (dia: number): number => {
  const maxDia = 45
  return 60 + ((dia / maxDia) * 700)
}

const getY = (value: number): number => {
  const minVal = 40
  const maxVal = 55
  const range = maxVal - minVal
  const normalized = (value - minVal) / range
  return 240 - (normalized * 200)
}

const getLinePoints = (data: PuntoProyeccion[], key: 'tuCandidato' | 'oponente'): string => {
  return data.map((punto, index) => {
    const x = getX(index)
    const y = getY(punto[key])
    return `${x},${y}`
  }).join(' ')
}

const getConfidenceBandPath = (): string => {
  const topPath = props.proyeccion.map((punto, index) => {
    const x = getX(index)
    const y = getY(punto.max)
    return `${x},${y}`
  }).join(' L ')
  
  const bottomPath = props.proyeccion.slice().reverse().map((punto, index) => {
    const x = getX(props.proyeccion.length - 1 - index)
    const y = getY(punto.min)
    return `${x},${y}`
  }).join(' L ')
  
  return `M ${topPath} L ${bottomPath} Z`
}

const mostrarTooltip = (punto: PuntoProyeccion, index: number) => {
  tooltipData.value = punto
  tooltipX.value = getX(index) + 20
  tooltipY.value = getY(punto.tuCandidato) - 60
  tooltipVisible.value = true
}

const ocultarTooltip = () => {
  tooltipVisible.value = false
}
</script>

<style scoped>
.timeline-projection {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.timeline-projection__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
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

.header__controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 6px 12px;
  border: 1px solid #2A3F5F;
  background: transparent;
  color: #9AA0A6;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  border-color: #4A90E2;
  color: #4A90E2;
}

.control-btn--active {
  background: #4A90E2;
  border-color: #4A90E2;
  color: #FFFFFF;
}

/* Chart */
.timeline-projection__chart {
  position: relative;
  margin-bottom: 20px;
}

.chart-svg {
  width: 100%;
  height: auto;
}

.data-point {
  cursor: pointer;
  transition: r 0.2s ease;
}

.data-point:hover {
  r: 6;
}

/* Tooltip */
.chart-tooltip {
  position: absolute;
  background: #0B0E11;
  border: 1px solid #4A90E2;
  border-radius: 6px;
  padding: 12px;
  pointer-events: none;
  z-index: 10;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.tooltip-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #E8EAED;
  margin-bottom: 8px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.tooltip-row--range {
  padding-top: 4px;
  border-top: 1px solid #2A3F5F;
  margin-top: 4px;
}

.tooltip-label {
  font-size: 12px;
  color: #9AA0A6;
}

.tooltip-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  color: #E8EAED;
  font-weight: 600;
}

/* Legend */
.timeline-projection__legend {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #9AA0A6;
}

.legend-color {
  width: 20px;
  height: 3px;
  border-radius: 2px;
}

.legend-line {
  width: 20px;
  height: 2px;
  background: #FA8C16;
  border-radius: 1px;
  position: relative;
}

.legend-line::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, transparent 40%, #FA8C16 40%, #FA8C16 60%, transparent 60%, transparent 100%);
}

/* Footer */
.timeline-projection__footer {
  display: flex;
  justify-content: flex-end;
}

.export-btn {
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

.export-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  border-color: #6BA3E8;
}

.btn-icon {
  font-size: 16px;
}
</style>
