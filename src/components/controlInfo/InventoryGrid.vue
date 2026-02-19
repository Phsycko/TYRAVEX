<template>
  <div class="inventory-grid">
    <!-- Header with controls -->
    <div class="inventory-header">
      <div class="header-left">
        <h2>Inventario de Huella Digital</h2>
        <div class="item-count">{{ filteredItems.length.toLocaleString() }} ítems</div>
      </div>
      <div class="header-right">
        <button class="btn-icon" title="Scan completo">
          <span>🔄</span> Scan
        </button>
        <button class="btn-icon" title="Exportar">
          <span>📤</span> Exportar
        </button>
      </div>
    </div>

    <!-- Filters and search -->
    <div class="inventory-controls">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Búsqueda avanzada..."
          class="search-input"
        />
      </div>

      <div class="control-row">
        <div class="filter-dropdowns">
          <select v-model="sortBy" class="dropdown">
            <option value="risk-desc">Riesgo desc</option>
            <option value="risk-asc">Riesgo asc</option>
            <option value="date-desc">Más recientes</option>
            <option value="date-asc">Más antiguos</option>
            <option value="views-desc">Más vistas</option>
          </select>
        </div>

        <div class="view-modes">
          <span class="view-label">Vista:</span>
          <button 
            class="view-btn" 
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            ○ Lista
          </button>
          <button 
            class="view-btn" 
            :class="{ active: viewMode === 'gallery' }"
            @click="viewMode = 'gallery'"
          >
            ● Galería
          </button>
          <button 
            class="view-btn" 
            :class="{ active: viewMode === 'timeline' }"
            @click="viewMode = 'timeline'"
          >
            ○ Timeline
          </button>
        </div>
      </div>
    </div>

    <!-- Critical Items Section -->
    <div v-if="criticalItems.length > 0" class="items-section">
      <div class="section-header critical">
        <h3>🔴 ÍTEMS CRÍTICOS (Acción Requerida)</h3>
        <span class="section-count">{{ criticalItems.length }} ítems</span>
      </div>

      <div class="items-list">
        <div v-for="item in criticalItems" :key="item.id" class="item-card critical">
          <div class="item-header">
            <div class="item-badge critical">🔴 CRÍTICO</div>
            <div class="item-risk">Riesgo: {{ item.riskScore }}/100</div>
          </div>

          <div class="item-body">
            <div class="item-main">
              <div class="item-type-icon">{{ getTypeIcon(item.type) }}</div>
              <div class="item-info">
                <h4 class="item-title">{{ item.title }}</h4>
                <p class="item-description">{{ item.description }}</p>
                
                <div class="item-meta">
                  <span class="meta-item">
                    <strong>Tipo:</strong> {{ getTypeLabel(item.type) }}
                  </span>
                  <span class="meta-item">
                    <strong>Fuente:</strong> {{ item.source }}
                  </span>
                  <span class="meta-item">
                    <strong>Fecha:</strong> {{ formatDate(item.dateDiscovered) }}
                  </span>
                </div>

                <div v-if="item.thumbnailUrl" class="item-thumbnail">
                  <div class="thumbnail-placeholder">[Thumbnail de {{ item.type }}]</div>
                </div>

                <div class="item-problem">
                  <strong>Problema:</strong> {{ item.notes || item.description }}
                </div>

                <div class="item-exposure">
                  <span><strong>Exposición:</strong> {{ getExposureLevel(item.estimatedViews) }} ({{ formatNumber(item.estimatedViews) }}+ views estimados)</span>
                  <span><strong>Locaciones:</strong> {{ item.locationsDetected }} sitios detectados</span>
                </div>

                <div class="item-status">
                  <span class="status-badge" :class="item.status">
                    {{ getStatusIcon(item.status) }} {{ getStatusLabel(item.status) }}
                  </span>
                  <span class="status-action">Última acción: {{ item.notes?.split('-')[1] || 'Pendiente' }}</span>
                </div>
              </div>
            </div>

            <div class="item-actions">
              <button class="btn-action primary">Ver detalles</button>
              <button class="btn-action danger">Solicitar eliminación</button>
              <button class="btn-action">Actualizar versión oficial</button>
              <button class="btn-action">Historial de uso</button>
              <button class="btn-action">Reportar infracción</button>
              <button class="btn-action success">Marcar como resuelta</button>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-view-all">Ver todos los ítems críticos ({{ criticalItems.length }})</button>
    </div>

    <!-- Monitored Items Section -->
    <div v-if="monitoredItems.length > 0" class="items-section">
      <div class="section-header monitored">
        <h3>🟡 ÍTEMS MONITOREADOS</h3>
        <span class="section-count">{{ monitoredItems.length }} ítems</span>
      </div>

      <div class="items-list compact">
        <div v-for="item in monitoredItems.slice(0, 3)" :key="item.id" class="item-card monitored">
          <div class="item-header">
            <div class="item-badge monitored">🟡 MONITOREADO</div>
            <div class="item-risk">Riesgo: {{ item.riskScore }}/100</div>
          </div>

          <div class="item-body compact">
            <div class="item-info">
              <h4 class="item-title">{{ item.title }}</h4>
              <div class="item-meta">
                <span>Tipo: {{ getTypeLabel(item.type) }}</span>
                <span>Fuente: {{ item.source }}</span>
                <span>Fecha: {{ formatDate(item.dateDiscovered) }}</span>
              </div>

              <div class="item-metrics">
                <span>Alcance: {{ formatNumber(item.estimatedViews) }} views</span>
                <span v-if="item.type === 'mention'">Sentimiento: 🔴 Negativo</span>
              </div>

              <div class="item-status">
                <span class="status-badge monitored">🟡 Monitoreado</span>
                <span>Acción: Respuesta preparada</span>
              </div>
            </div>

            <div class="item-actions compact">
              <button class="btn-action">Ver</button>
              <button class="btn-action">Analizar</button>
              <button class="btn-action">Preparar respuesta</button>
              <button class="btn-action">Monitorear</button>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-view-all">Ver todos monitoreados ({{ monitoredItems.length }})</button>
    </div>

    <!-- Controlled Items Section -->
    <div v-if="controlledItems.length > 0" class="items-section">
      <div class="section-header controlled">
        <h3>🟢 ÍTEMS CONTROLADOS</h3>
        <span class="section-count">{{ controlledItems.length.toLocaleString() }} ítems</span>
      </div>

      <!-- Table view for controlled items -->
      <div class="items-table">
        <div class="table-header">
          <div class="col-type">Tipo</div>
          <div class="col-content">Contenido</div>
          <div class="col-source">Fuente</div>
          <div class="col-date">Fecha</div>
          <div class="col-risk">Riesgo</div>
          <div class="col-status">Estado</div>
        </div>

        <div class="table-body">
          <div v-for="item in controlledItems.slice(0, 10)" :key="item.id" class="table-row">
            <div class="col-type">{{ getTypeIcon(item.type) }} {{ getTypeLabel(item.type) }}</div>
            <div class="col-content">{{ item.title }}</div>
            <div class="col-source">{{ item.source }}</div>
            <div class="col-date">{{ formatDate(item.dateDiscovered) }}</div>
            <div class="col-risk">
              <span class="risk-badge low">🟢 {{ item.riskScore }}</span>
            </div>
            <div class="col-status">
              <span class="status-badge controlled">Controlado</span>
            </div>
          </div>
        </div>
      </div>

      <div class="table-actions">
        <button class="btn-secondary">Cargar más</button>
        <button class="btn-secondary">Exportar lista</button>
        <button class="btn-primary">Análisis masivo</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DigitalItem } from '@/types/controlInfo'

interface Props {
  items: DigitalItem[]
}

const props = defineProps<Props>()

const searchQuery = ref('')
const sortBy = ref('risk-desc')
const viewMode = ref<'list' | 'gallery' | 'timeline'>('list')

const filteredItems = computed(() => {
  let filtered = props.items

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'risk-desc':
        return b.riskScore - a.riskScore
      case 'risk-asc':
        return a.riskScore - b.riskScore
      case 'date-desc':
        return new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime()
      case 'date-asc':
        return new Date(a.dateDiscovered).getTime() - new Date(b.dateDiscovered).getTime()
      case 'views-desc':
        return b.estimatedViews - a.estimatedViews
      default:
        return 0
    }
  })

  return filtered
})

const criticalItems = computed(() => 
  filteredItems.value.filter(item => item.status === 'critical')
)

const monitoredItems = computed(() => 
  filteredItems.value.filter(item => item.status === 'monitored')
)

const controlledItems = computed(() => 
  filteredItems.value.filter(item => item.status === 'controlled')
)

const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    photo: '🖼️',
    video: '🎥',
    document: '📄',
    mention: '💬',
    audio: '🎵'
  }
  return icons[type] || '📄'
}

const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    photo: 'Foto',
    video: 'Video',
    document: 'Documento',
    mention: 'Mención',
    audio: 'Audio'
  }
  return labels[type] || type
}

const getStatusIcon = (status: string): string => {
  const icons: Record<string, string> = {
    critical: '🔴',
    monitored: '🟡',
    controlled: '🟢'
  }
  return icons[status] || '⚪'
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    critical: 'Crítico',
    monitored: 'Monitoreado',
    controlled: 'Controlado'
  }
  return labels[status] || status
}

const getExposureLevel = (views: number): string => {
  if (views >= 500000) return 'Muy Alto'
  if (views >= 100000) return 'Alto'
  if (views >= 50000) return 'Medio'
  return 'Bajo'
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>

<style scoped>
.inventory-grid {
  flex: 1;
}

/* Header */
.inventory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.header-left h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.item-count {
  font-size: 0.9rem;
  color: #9AA0A6;
}

.header-right {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* Controls */
.inventory-controls {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.search-icon {
  font-size: 1.1rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #E8EAED;
  font-size: 0.9rem;
  outline: none;
}

.search-input::placeholder {
  color: #9AA0A6;
}

.control-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.85rem;
  cursor: pointer;
}

.view-modes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-label {
  font-size: 0.85rem;
  color: #9AA0A6;
  margin-right: 0.5rem;
}

.view-btn {
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #9AA0A6;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn.active {
  background: #4A90E2;
  border-color: #4A90E2;
  color: #fff;
}

/* Sections */
.items-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
}

.section-header.critical {
  background: rgba(211, 47, 47, 0.1);
  border: 1px solid rgba(211, 47, 47, 0.3);
  border-bottom: none;
}

.section-header.monitored {
  background: rgba(250, 140, 22, 0.1);
  border: 1px solid rgba(250, 140, 22, 0.3);
  border-bottom: none;
}

.section-header.controlled {
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid rgba(82, 196, 26, 0.3);
  border-bottom: none;
}

.section-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.section-count {
  font-size: 0.85rem;
  color: #9AA0A6;
  font-weight: 600;
}

/* Item Cards */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0 0 8px 8px;
  padding: 1.5rem;
}

.item-card.critical {
  border-color: rgba(211, 47, 47, 0.3);
  border-top: none;
}

.item-card.monitored {
  border-color: rgba(250, 140, 22, 0.3);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-badge.critical {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.item-badge.monitored {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.item-risk {
  font-size: 0.9rem;
  font-weight: 700;
  color: #E8EAED;
  font-family: 'Courier New', monospace;
}

.item-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item-main {
  display: flex;
  gap: 1rem;
}

.item-type-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.item-description {
  font-size: 0.9rem;
  color: #9AA0A6;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.item-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #9AA0A6;
}

.meta-item strong {
  color: #E8EAED;
}

.thumbnail-placeholder {
  padding: 3rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  text-align: center;
  color: #9AA0A6;
  font-size: 0.85rem;
  margin: 1rem 0;
}

.item-problem {
  padding: 1rem;
  background: rgba(211, 47, 47, 0.1);
  border-left: 3px solid #D32F2F;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 1rem 0;
}

.item-exposure {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 0.85rem;
  color: #E8EAED;
}

.item-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
}

.status-badge {
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.critical {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.status-badge.monitored {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.status-badge.controlled {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.status-action {
  color: #9AA0A6;
}

.item-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-action {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action.primary {
  background: #4A90E2;
  border-color: #4A90E2;
  color: #fff;
}

.btn-action.danger {
  background: #D32F2F;
  border-color: #D32F2F;
  color: #fff;
}

.btn-action.success {
  background: #52C41A;
  border-color: #52C41A;
  color: #fff;
}

/* Table */
.items-table {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0 0 8px 8px;
  border-top: none;
  overflow: hidden;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
}

.table-header {
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.75rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
  color: #E8EAED;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.risk-badge.low {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.table-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.btn-view-all {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 8px 8px;
  color: #4A90E2;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view-all:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-secondary, .btn-primary {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-primary {
  background: #722ED1;
  color: #fff;
}

.btn-primary:hover {
  background: #8B4AD1;
}
</style>
