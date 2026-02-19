<template>
  <div class="sensitivity-analysis">
    <!-- Header -->
    <div class="sensitivity-analysis__header">
      <div>
        <h3 class="header__title">Análisis de Sensibilidad</h3>
        <p class="header__subtitle">Impacto de cada variable en el resultado</p>
      </div>
      <button class="export-btn" @click="$emit('exportar')">
        <span class="btn-icon">📥</span>
        Exportar
      </button>
    </div>

    <!-- Chart -->
    <div class="sensitivity-analysis__chart">
      <div 
        v-for="variable in variables" 
        :key="variable.variable"
        class="sensitivity-bar"
      >
        <div class="sensitivity-bar__header">
          <span class="bar-label">{{ variable.variable }}</span>
          <div class="bar-metrics">
            <span class="bar-elasticidad" :class="`elasticidad--${variable.elasticidad.toLowerCase().replace('-', '')}`">
              {{ variable.elasticidad }}
            </span>
            <span class="bar-impacto">±{{ variable.impacto }}%</span>
          </div>
        </div>
        <div class="sensitivity-bar__container">
          <div 
            class="sensitivity-bar__fill" 
            :style="{ width: `${(variable.nivel / 16) * 100}%`, backgroundColor: getBarColor(variable.nivel) }"
          >
            <span class="bar-fill-label">{{ variable.nivel }}/16</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <div class="sensitivity-analysis__recommendations">
      <div class="recommendations-header">
        <span class="recommendations-icon">💡</span>
        <span class="recommendations-title">Recomendaciones basadas en sensibilidad</span>
      </div>
      <ul class="recommendations-list">
        <li v-for="(rec, index) in recomendaciones" :key="index" class="recommendation-item">
          {{ rec }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Variable {
  variable: string
  impacto: number
  elasticidad: string
  nivel: number
}

interface Props {
  variables: Variable[]
}

const props = defineProps<Props>()

defineEmits<{
  'exportar': []
}>()

const recomendaciones = computed(() => {
  const topVariables = [...props.variables]
    .sort((a, b) => b.impacto - a.impacto)
    .slice(0, 3)
  
  return topVariables.map(v => 
    `Priorizar ${v.variable.toLowerCase()} (impacto potencial: ±${v.impacto}%)`
  )
})

const getBarColor = (nivel: number): string => {
  if (nivel >= 12) return '#D32F2F'
  if (nivel >= 8) return '#FA8C16'
  if (nivel >= 5) return '#4A90E2'
  return '#52C41A'
}
</script>

<style scoped>
.sensitivity-analysis {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.sensitivity-analysis__header {
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
}

.btn-icon {
  font-size: 14px;
}

/* Chart */
.sensitivity-analysis__chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.sensitivity-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sensitivity-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bar-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #E8EAED;
}

.bar-metrics {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-elasticidad {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.elasticidad--alto {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}

.elasticidad--medio {
  background: rgba(250, 140, 22, 0.15);
  color: #FA8C16;
}

.elasticidad--mediobajo {
  background: rgba(74, 144, 226, 0.15);
  color: #4A90E2;
}

.elasticidad--bajo {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

.bar-impacto {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #4A90E2;
}

.sensitivity-bar__container {
  height: 32px;
  background: rgba(11, 14, 17, 0.6);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.sensitivity-bar__fill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  transition: width 0.6s ease;
  border-radius: 6px;
}

.bar-fill-label {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Recommendations */
.sensitivity-analysis__recommendations {
  padding: 16px;
  background: rgba(74, 144, 226, 0.05);
  border-left: 3px solid #4A90E2;
  border-radius: 6px;
}

.recommendations-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.recommendations-icon {
  font-size: 18px;
}

.recommendations-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #E8EAED;
}

.recommendations-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.recommendation-item {
  font-size: 13px;
  color: #E8EAED;
  padding-left: 20px;
  position: relative;
}

.recommendation-item::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #4A90E2;
  font-weight: 700;
}
</style>
