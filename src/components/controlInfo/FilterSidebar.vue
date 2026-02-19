<template>
  <div class="filter-sidebar">
    <div class="sidebar-header">
      <h3>FILTROS</h3>
      <button class="btn-clear" @click="clearFilters">Limpiar</button>
    </div>

    <!-- Risk Level Filter -->
    <div class="filter-section">
      <h4>📊 NIVEL DE RIESGO</h4>
      <div class="filter-options">
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.riskCritical" />
          <span class="checkbox-label">
            Crítico (81-100)
            <span class="count">{{ counts.critical }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.riskHigh" />
          <span class="checkbox-label">
            Alto (61-80)
            <span class="count">{{ counts.high }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.riskMedium" />
          <span class="checkbox-label">
            Medio (31-60)
            <span class="count">{{ counts.medium }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.riskLow" />
          <span class="checkbox-label">
            Bajo (0-30)
            <span class="count">{{ counts.low }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Content Type Filter -->
    <div class="filter-section">
      <h4>📁 TIPO DE CONTENIDO</h4>
      <div class="filter-options">
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.typePhoto" />
          <span class="checkbox-label">
            Fotos/Imágenes
            <span class="count">{{ counts.photos }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.typeVideo" />
          <span class="checkbox-label">
            Videos
            <span class="count">{{ counts.videos }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.typeDocument" />
          <span class="checkbox-label">
            Documentos
            <span class="count">{{ counts.documents }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.typeMention" />
          <span class="checkbox-label">
            Menciones
            <span class="count">{{ counts.mentions }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.typeAudio" />
          <span class="checkbox-label">
            Audio
            <span class="count">{{ counts.audio }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Source Filter -->
    <div class="filter-section">
      <h4>🌐 FUENTE</h4>
      <div class="filter-options">
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.sourceWebsite" />
          <span class="checkbox-label">
            Sitios web
            <span class="count">{{ counts.websites }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.sourceSocial" />
          <span class="checkbox-label">
            Redes sociales
            <span class="count">{{ counts.social }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.sourcePublic" />
          <span class="checkbox-label">
            Registros públicos
            <span class="count">{{ counts.publicRecords }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.sourceMedia" />
          <span class="checkbox-label">
            Medios digitales
            <span class="count">{{ counts.media }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.sourceForum" />
          <span class="checkbox-label">
            Foros
            <span class="count">{{ counts.forums }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Period Filter -->
    <div class="filter-section">
      <h4>📅 PERÍODO</h4>
      <div class="filter-radio">
        <label>
          <input type="radio" name="period" value="week" v-model="filters.period" />
          <span>Última semana</span>
        </label>
        <label>
          <input type="radio" name="period" value="month" v-model="filters.period" />
          <span>Último mes</span>
        </label>
        <label>
          <input type="radio" name="period" value="quarter" v-model="filters.period" />
          <span>Últimos 3 meses</span>
        </label>
        <label>
          <input type="radio" name="period" value="year" v-model="filters.period" />
          <span>Último año</span>
        </label>
        <label>
          <input type="radio" name="period" value="custom" v-model="filters.period" />
          <span>Personalizado</span>
        </label>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="filter-section">
      <h4>🎯 ESTADO</h4>
      <div class="filter-options">
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.statusControlled" />
          <span class="checkbox-label">
            Controlado
            <span class="count">{{ counts.controlled }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.statusMonitored" />
          <span class="checkbox-label">
            Monitoreado
            <span class="count">{{ counts.monitored }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.statusCritical" />
          <span class="checkbox-label">
            Crítico
            <span class="count">{{ counts.criticalStatus }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="filter-section">
      <h4>🏷️ CATEGORÍA</h4>
      <div class="filter-options">
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.categoryProfessional" />
          <span class="checkbox-label">
            Profesional
            <span class="count">{{ counts.professional }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.categoryPersonal" />
          <span class="checkbox-label">
            Personal
            <span class="count">{{ counts.personal }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.categoryPolitical" />
          <span class="checkbox-label">
            Político
            <span class="count">{{ counts.political }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.categoryAcademic" />
          <span class="checkbox-label">
            Académico
            <span class="count">{{ counts.academic }}</span>
          </span>
        </label>
        <label class="filter-checkbox">
          <input type="checkbox" v-model="filters.categoryCorporate" />
          <span class="checkbox-label">
            Corporativo
            <span class="count">{{ counts.corporate }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Apply Button -->
    <div class="filter-actions">
      <button class="btn-apply" @click="applyFilters">Aplicar Filtros</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface FilterCounts {
  critical: number
  high: number
  medium: number
  low: number
  photos: number
  videos: number
  documents: number
  mentions: number
  audio: number
  websites: number
  social: number
  publicRecords: number
  media: number
  forums: number
  controlled: number
  monitored: number
  criticalStatus: number
  professional: number
  personal: number
  political: number
  academic: number
  corporate: number
}

interface Props {
  counts: FilterCounts
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'filter-change', filters: any): void
}>()

const filters = reactive({
  // Risk
  riskCritical: true,
  riskHigh: true,
  riskMedium: true,
  riskLow: false,
  
  // Type
  typePhoto: true,
  typeVideo: true,
  typeDocument: true,
  typeMention: true,
  typeAudio: false,
  
  // Source
  sourceWebsite: true,
  sourceSocial: true,
  sourcePublic: true,
  sourceMedia: true,
  sourceForum: false,
  
  // Period
  period: 'month',
  
  // Status
  statusControlled: true,
  statusMonitored: true,
  statusCritical: true,
  
  // Category
  categoryProfessional: true,
  categoryPersonal: true,
  categoryPolitical: true,
  categoryAcademic: true,
  categoryCorporate: false
})

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    if (typeof filters[key as keyof typeof filters] === 'boolean') {
      filters[key as keyof typeof filters] = false as any
    }
  })
  filters.period = 'month'
  applyFilters()
}

const applyFilters = () => {
  emit('filter-change', { ...filters })
}

// Auto-apply on change
watch(filters, () => {
  applyFilters()
}, { deep: true })
</script>

<style scoped>
.filter-sidebar {
  width: 280px;
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-header h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.btn-clear {
  background: transparent;
  border: none;
  color: #4A90E2;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.btn-clear:hover {
  color: #5BA3F5;
  text-decoration: underline;
}

.filter-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-section:last-of-type {
  border-bottom: none;
}

.filter-section h4 {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.filter-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 0.75rem;
  cursor: pointer;
  accent-color: #4A90E2;
}

.checkbox-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-size: 0.85rem;
  color: #E8EAED;
}

.count {
  font-size: 0.75rem;
  color: #9AA0A6;
  font-family: 'Courier New', monospace;
}

.filter-radio {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-radio label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.filter-radio input[type="radio"] {
  width: 16px;
  height: 16px;
  margin-right: 0.75rem;
  cursor: pointer;
  accent-color: #4A90E2;
}

.filter-radio span {
  font-size: 0.85rem;
  color: #E8EAED;
}

.filter-actions {
  margin-top: 1.5rem;
}

.btn-apply {
  width: 100%;
  padding: 0.75rem;
  background: #722ED1;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-apply:hover {
  background: #8B4AD1;
}
</style>
