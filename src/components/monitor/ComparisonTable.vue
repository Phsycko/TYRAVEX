<script setup lang="ts">
interface ComparisonData {
  candidatos: string[]
  metricas: {
    menciones: number[]
    sentimiento: number[]
    alcance: number[]
    engagement: number[]
    shareOfVoice: number[]
    crecimiento24h: number[]
  }
}

interface Props {
  data: ComparisonData
}

const props = defineProps<Props>()

const emit = defineEmits<{
  export: []
  viewAnalysis: []
  addCandidate: []
}>()

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const getValueClass = (values: number[], index: number, isHigherBetter: boolean = true) => {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const value = values[index]
  
  if (isHigherBetter) {
    if (value === max) return 'value-best'
    if (value === min) return 'value-worst'
  } else {
    if (value === min) return 'value-best'
    if (value === max) return 'value-worst'
  }
  return ''
}

const getChangeIcon = (change: number) => {
  if (change > 0) return '↑'
  if (change < 0) return '↓'
  return '→'
}

const getChangeClass = (change: number) => {
  if (change > 0) return 'change-positive'
  if (change < 0) return 'change-negative'
  return 'change-neutral'
}
</script>

<template>
  <div class="comparison-table">
    <div class="table-header">
      <h3 class="table-title">Comparación Multi-Candidato</h3>
      <button class="btn-add" @click="emit('addCandidate')">
        + Agregar candidato
      </button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-metric">Métrica</th>
            <th v-for="(candidato, index) in data.candidatos" :key="index" class="col-candidate">
              {{ candidato }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="metric-label">Menciones</td>
            <td 
              v-for="(value, index) in data.metricas.menciones" 
              :key="index"
              :class="getValueClass(data.metricas.menciones, index)"
            >
              {{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="metric-label">Sentimiento</td>
            <td 
              v-for="(value, index) in data.metricas.sentimiento" 
              :key="index"
              :class="getValueClass(data.metricas.sentimiento, index)"
            >
              {{ value > 0 ? '+' : '' }}{{ value }}%
            </td>
          </tr>
          <tr>
            <td class="metric-label">Alcance</td>
            <td 
              v-for="(value, index) in data.metricas.alcance" 
              :key="index"
              :class="getValueClass(data.metricas.alcance, index)"
            >
              {{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="metric-label">Engagement</td>
            <td 
              v-for="(value, index) in data.metricas.engagement" 
              :key="index"
              :class="getValueClass(data.metricas.engagement, index)"
            >
              {{ formatNumber(value) }}
            </td>
          </tr>
          <tr>
            <td class="metric-label">Share of Voice</td>
            <td 
              v-for="(value, index) in data.metricas.shareOfVoice" 
              :key="index"
              :class="getValueClass(data.metricas.shareOfVoice, index)"
            >
              {{ value }}%
            </td>
          </tr>
          <tr>
            <td class="metric-label">Crecimiento (24h)</td>
            <td 
              v-for="(value, index) in data.metricas.crecimiento24h" 
              :key="index"
              :class="getChangeClass(value)"
            >
              <span class="change-icon">{{ getChangeIcon(value) }}</span>
              {{ value > 0 ? '+' : '' }}{{ value }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-actions">
      <button class="btn-outline btn-sm" @click="emit('export')">
        Exportar comparación
      </button>
      <button class="btn-outline btn-sm" @click="emit('viewAnalysis')">
        Análisis detallado
      </button>
    </div>
  </div>
</template>

<style scoped>
.comparison-table {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0;
}

.btn-add {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  background: #4A90E2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add:hover {
  background: #5BA3F5;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #141B22;
}

th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.col-metric {
  width: 180px;
}

.col-candidate {
  text-align: center;
}

tbody tr {
  transition: background 0.2s;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.02);
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #E8EAED;
}

.metric-label {
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #9AA0A6;
}

.value-best {
  color: #52C41A;
  background: rgba(82, 196, 26, 0.1);
}

.value-worst {
  color: #D32F2F;
  background: rgba(211, 47, 47, 0.1);
}

.change-positive {
  color: #52C41A;
}

.change-negative {
  color: #D32F2F;
}

.change-neutral {
  color: #9AA0A6;
}

.change-icon {
  margin-right: 4px;
}

.table-actions {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 12px;
}

.btn-outline {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #E8EAED;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.btn-sm {
  font-size: 12px;
}
</style>
