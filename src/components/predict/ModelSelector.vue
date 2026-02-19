<template>
  <div class="model-selector">
    <div class="model-selector__header">
      <label class="header__label">Modelo Activo</label>
      <div class="header__best" v-if="modeloMejor">
        <span class="best-icon">⭐</span>
        <span class="best-text">Mejor modelo: {{ modeloMejor.nombre }}</span>
      </div>
    </div>

    <div class="model-selector__dropdown">
      <select 
        :value="modeloActivo?.id" 
        @change="cambiarModelo($event)"
        class="dropdown-select"
      >
        <option 
          v-for="modelo in modelos" 
          :key="modelo.id" 
          :value="modelo.id"
        >
          {{ modelo.nombre }} ({{ modelo.precision }}% precisión)
        </option>
      </select>
    </div>

    <div class="model-selector__cards">
      <div 
        v-for="modelo in modelos" 
        :key="modelo.id"
        class="model-card"
        :class="{ 'model-card--active': modelo.activo, 'model-card--best': modelo.mejor }"
        @click="seleccionarModelo(modelo.id)"
      >
        <div class="model-card__header">
          <h4 class="model-card__nombre">{{ modelo.nombre }}</h4>
          <span v-if="modelo.mejor" class="model-card__badge">Mejor</span>
          <span v-if="modelo.activo" class="model-card__badge model-card__badge--active">Activo</span>
        </div>

        <div class="model-card__metrics">
          <div class="metric-item">
            <span class="metric-label">Precisión</span>
            <span class="metric-value">{{ modelo.precision }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">F1-Score</span>
            <span class="metric-value">{{ modelo.f1Score }}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Tiempo</span>
            <span class="metric-value">{{ modelo.tiempoProcesamiento }}s</span>
          </div>
        </div>

        <div class="model-card__description">
          {{ modelo.descripcion }}
        </div>
      </div>
    </div>

    <div class="model-selector__actions">
      <button class="action-btn action-btn--secondary" @click="$emit('comparar-modelos')">
        <span class="btn-icon">📊</span>
        Comparar todos
      </button>
      <button class="action-btn action-btn--secondary" @click="$emit('configurar')">
        <span class="btn-icon">⚙️</span>
        Configurar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Modelo {
  id: string
  nombre: string
  precision: number
  recall: number
  f1Score: number
  mae: number
  tiempoProcesamiento: number
  activo: boolean
  descripcion: string
  mejor?: boolean
}

interface Props {
  modelos: Modelo[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'cambiar-modelo': [modeloId: string]
  'comparar-modelos': []
  'configurar': []
}>()

const modeloActivo = computed(() => props.modelos.find(m => m.activo))
const modeloMejor = computed(() => props.modelos.find(m => m.mejor))

const cambiarModelo = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('cambiar-modelo', target.value)
}

const seleccionarModelo = (modeloId: string) => {
  emit('cambiar-modelo', modeloId)
}
</script>

<style scoped>
.model-selector {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
}

/* Header */
.model-selector__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.header__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header__best {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #FA8C16;
}

.best-icon {
  font-size: 14px;
}

/* Dropdown */
.model-selector__dropdown {
  margin-bottom: 20px;
}

.dropdown-select {
  width: 100%;
  padding: 10px 14px;
  background: rgba(11, 14, 17, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-select:hover {
  border-color: #4A90E2;
}

.dropdown-select:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

/* Cards */
.model-selector__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.model-card {
  background: rgba(11, 14, 17, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.model-card:hover {
  border-color: #4A90E2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.15);
}

.model-card--active {
  border-color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

.model-card--best {
  border-color: #FA8C16;
}

.model-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 8px;
}

.model-card__nombre {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #E8EAED;
  margin: 0;
  flex: 1;
}

.model-card__badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  background: rgba(250, 140, 22, 0.15);
  color: #FA8C16;
}

.model-card__badge--active {
  background: rgba(74, 144, 226, 0.15);
  color: #4A90E2;
}

.model-card__metrics {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 11px;
  color: #9AA0A6;
}

.metric-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  color: #E8EAED;
  font-weight: 600;
}

.model-card__description {
  font-size: 11px;
  color: #9AA0A6;
  line-height: 1.4;
  padding-top: 8px;
  border-top: 1px solid #2A3F5F;
}

/* Actions */
.model-selector__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
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
  font-size: 14px;
}
</style>
