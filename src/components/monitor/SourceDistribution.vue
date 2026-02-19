<script setup lang="ts">
interface Source {
  fuente: string
  menciones: number
  porcentaje: number
  color: string
}

interface Props {
  sources: Source[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  sourceClick: [source: Source]
  viewBreakdown: []
  comparePeriods: []
}>()

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="source-distribution">
    <div class="distribution-header">
      <h3 class="distribution-title">Distribución por Fuente</h3>
    </div>

    <div class="distribution-list">
      <div
        v-for="source in sources"
        :key="source.fuente"
        class="source-item"
        @click="emit('sourceClick', source)"
      >
        <div class="source-label">{{ source.fuente }}</div>
        <div class="source-bar-container">
          <div 
            class="source-bar"
            :style="{ 
              width: `${source.porcentaje}%`,
              backgroundColor: source.color
            }"
          />
        </div>
        <div class="source-stats">
          <span class="source-percentage">{{ source.porcentaje }}%</span>
          <span class="source-count">({{ formatNumber(source.menciones) }})</span>
        </div>
      </div>
    </div>

    <div class="distribution-actions">
      <button class="btn-outline btn-sm" @click="emit('viewBreakdown')">
        Ver desglose completo
      </button>
      <button class="btn-outline btn-sm" @click="emit('comparePeriods')">
        Comparar períodos
      </button>
    </div>
  </div>
</template>

<style scoped>
.source-distribution {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.distribution-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.distribution-title {
  font-size: 16px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0;
}

.distribution-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.source-item {
  cursor: pointer;
  transition: all 0.2s;
  padding: 8px;
  border-radius: 4px;
}

.source-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.source-label {
  font-size: 13px;
  font-weight: 500;
  color: #E8EAED;
  margin-bottom: 8px;
}

.source-bar-container {
  width: 100%;
  height: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.source-bar {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 4px;
}

.source-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.source-percentage {
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  color: #E8EAED;
}

.source-count {
  font-family: 'Roboto Mono', monospace;
  color: #9AA0A6;
}

.distribution-actions {
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
