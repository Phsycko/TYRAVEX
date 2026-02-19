<script setup lang="ts">
import { ref } from 'vue'

interface Filters {
  periodo: string
  sentimiento: string[]
  fuentes: string[]
  alcanceMin: number
}

interface Props {
  modelValue: string
  filters: Filters
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:filters': [filters: Filters]
  export: []
  saveView: []
  configure: []
}>()

const showAdvanced = ref(false)

const periodos = [
  { value: '24h', label: 'Últimas 24h' },
  { value: '7d', label: 'Últimos 7 días' },
  { value: '30d', label: 'Últimos 30 días' },
  { value: 'custom', label: 'Personalizado' }
]

const sentimientos = [
  { value: 'positive', label: 'Positivo' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negativo' }
]

const fuentes = [
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'news', label: 'Noticias' }
]
</script>

<template>
  <div class="search-bar">
    <div class="search-main">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          placeholder="Buscar menciones, hashtags, usuarios..."
          :value="modelValue"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="quick-filters">
        <select class="filter-select">
          <option value="">📅 Período</option>
          <option v-for="periodo in periodos" :key="periodo.value" :value="periodo.value">
            {{ periodo.label }}
          </option>
        </select>

        <select class="filter-select">
          <option value="">😊 Sentimiento</option>
          <option v-for="sent in sentimientos" :key="sent.value" :value="sent.value">
            {{ sent.label }}
          </option>
        </select>

        <select class="filter-select">
          <option value="">📱 Fuente</option>
          <option v-for="fuente in fuentes" :key="fuente.value" :value="fuente.value">
            {{ fuente.label }}
          </option>
        </select>

        <select class="filter-select">
          <option value="">🔥 Alcance</option>
          <option value="1000">1K+</option>
          <option value="10000">10K+</option>
          <option value="100000">100K+</option>
        </select>
      </div>

      <div class="action-buttons">
        <button class="btn-action" @click="showAdvanced = !showAdvanced">
          + Filtros avanzados
        </button>
        <button class="btn-action" @click="emit('saveView')">
          Guardar vista
        </button>
        <button class="btn-action" @click="emit('export')">
          Exportar
        </button>
        <button class="btn-action" @click="emit('configure')">
          ⚙️ Configurar
        </button>
      </div>
    </div>

    <div v-if="showAdvanced" class="advanced-filters">
      <div class="advanced-grid">
        <div class="filter-group">
          <label class="filter-label">Rango de fechas</label>
          <div class="date-range">
            <input type="date" class="filter-input" />
            <span class="date-separator">-</span>
            <input type="date" class="filter-input" />
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">Keywords (incluir)</label>
          <input type="text" class="filter-input" placeholder="Separados por comas" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Excluir palabras</label>
          <input type="text" class="filter-input" placeholder="Separados por comas" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Usuarios específicos</label>
          <input type="text" class="filter-input" placeholder="@usuario1, @usuario2" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Hashtags</label>
          <input type="text" class="filter-input" placeholder="#hashtag1, #hashtag2" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Alcance mínimo</label>
          <input type="range" class="filter-slider" min="0" max="100000" step="1000" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Engagement mínimo</label>
          <input type="range" class="filter-slider" min="0" max="10000" step="100" />
        </div>

        <div class="filter-group">
          <label class="filter-checkbox">
            <input type="checkbox" />
            <span>Solo cuentas verificadas</span>
          </label>
        </div>
      </div>

      <div class="advanced-actions">
        <button class="btn-outline btn-sm">Limpiar filtros</button>
        <button class="btn-primary btn-sm">Aplicar filtros</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.search-main {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #141B22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px 14px;
  transition: border-color 0.2s;
}

.search-input-wrapper:focus-within {
  border-color: #4A90E2;
}

.search-icon {
  font-size: 18px;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #E8EAED;
  font-size: 14px;
}

.search-input::placeholder {
  color: #9AA0A6;
}

.quick-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 6px 12px;
  background: #141B22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: #1A2332;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-action {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.advanced-filters {
  padding: 20px;
  background: #141B22;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 500;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-input {
  padding: 8px 12px;
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 13px;
  transition: border-color 0.2s;
}

.filter-input:focus {
  outline: none;
  border-color: #4A90E2;
}

.filter-input::placeholder {
  color: #9AA0A6;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #9AA0A6;
}

.filter-slider {
  width: 100%;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #E8EAED;
  cursor: pointer;
}

.filter-checkbox input[type="checkbox"] {
  cursor: pointer;
}

.advanced-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-outline {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  padding: 8px 16px;
  background: #4A90E2;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #5BA3F5;
}

.btn-sm {
  font-size: 13px;
}
</style>
