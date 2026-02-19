<template>
  <div class="reverse-image-search">
    <!-- Header -->
    <div class="search-header">
      <div class="header-left">
        <h1>🖼️ Reverse Image Search Engine</h1>
        <p class="subtitle">Encuentra dónde se está usando tu imagen en toda la web</p>
      </div>
      <div class="header-right">
        <button class="btn-secondary" @click="showHistory">
          📜 Historial búsquedas
        </button>
      </div>
    </div>

    <!-- Upload Section -->
    <div v-if="!isSearching && !searchCompleted" class="upload-section">
      <div class="upload-zone" 
           :class="{ 'drag-over': isDragging }"
           @drop.prevent="handleDrop"
           @dragover.prevent="isDragging = true"
           @dragleave.prevent="isDragging = false"
           @click="triggerFileInput">
        <input 
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          style="display: none"
        />
        <div v-if="!selectedImage" class="upload-placeholder">
          <div class="upload-icon">📤</div>
          <p class="upload-title">Arrastra tu imagen aquí</p>
          <p class="upload-subtitle">o haz click para seleccionar archivo</p>
          <p class="upload-formats">Formatos: JPG, PNG, WEBP, GIF | Max: 10MB</p>
        </div>
        <div v-else class="image-preview">
          <img :src="selectedImage.url" alt="Preview" />
          <div class="image-info">
            <p class="image-name">{{ selectedImage.name }}</p>
            <p class="image-meta">{{ selectedImage.size }} | {{ selectedImage.dimensions }}</p>
            <p class="image-uploaded">Subida: {{ selectedImage.uploadedAt }}</p>
          </div>
          <button class="btn-remove" @click.stop="removeImage">
            ✕ Cambiar imagen
          </button>
        </div>
      </div>

      <div class="url-option">
        <p>O pega URL de imagen:</p>
        <div class="url-input-group">
          <input 
            v-model="imageUrl"
            type="text"
            placeholder="https://ejemplo.com/imagen.jpg"
            class="url-input"
          />
          <button class="btn-primary" @click="searchByUrl" :disabled="!imageUrl">
            Buscar
          </button>
        </div>
      </div>

      <div class="engines-selection">
        <p>Motores a usar:</p>
        <div class="engines-grid">
          <label v-for="engine in searchEngines" :key="engine.id" class="engine-checkbox">
            <input type="checkbox" v-model="selectedEngines" :value="engine.id" />
            <span>{{ engine.name }}</span>
          </label>
        </div>
      </div>

      <div class="search-actions">
        <button 
          class="btn-launch"
          @click="startSearch"
          :disabled="!canSearch"
        >
          🔍 BUSCAR EN TODA LA WEB
        </button>
        <button class="btn-link">⚙️ Opciones avanzadas</button>
      </div>
    </div>

    <!-- Searching Progress -->
    <div v-if="isSearching" class="searching-panel">
      <div class="search-progress">
        <h3>BUSCANDO...</h3>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: `${searchProgress}%` }"></div>
        </div>
        <p class="progress-text">{{ searchProgress }}%</p>
      </div>
      <div class="search-status">
        <p>✅ Búsqueda completada en {{ searchTime }} segundos</p>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchCompleted" class="results-panel">
      <div class="results-header">
        <h2>RESULTADOS: {{ totalResults }} coincidencias encontradas</h2>
        <button class="btn-secondary" @click="startNewSearch">
          🔄 Nueva búsqueda
        </button>
      </div>

      <!-- Usage Map -->
      <div class="usage-map">
        <div class="map-header">
          <h3>MAPA DE USOS</h3>
          <button class="btn-icon">🗺️ Vista mapa</button>
        </div>
        <div class="map-container">
          <div class="map-placeholder">
            <p>🌍 Distribución geográfica de usos:</p>
            <div class="geo-stats">
              <div class="geo-stat">
                <span class="geo-region">América</span>
                <div class="geo-bar">
                  <div class="geo-bar-fill" style="width: 51%"></div>
                </div>
                <span class="geo-count">45 usos (51%)</span>
              </div>
              <div class="geo-stat">
                <span class="geo-region">Europa</span>
                <div class="geo-bar">
                  <div class="geo-bar-fill" style="width: 31%"></div>
                </div>
                <span class="geo-count">28 usos (31%)</span>
              </div>
              <div class="geo-stat">
                <span class="geo-region">Asia</span>
                <div class="geo-bar">
                  <div class="geo-bar-fill" style="width: 13%"></div>
                </div>
                <span class="geo-count">12 usos (13%)</span>
              </div>
              <div class="geo-stat">
                <span class="geo-region">Otros</span>
                <div class="geo-bar">
                  <div class="geo-bar-fill" style="width: 5%"></div>
                </div>
                <span class="geo-count">4 usos (5%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Filters -->
      <div class="results-filters">
        <div class="filter-group">
          <label>Filtrar:</label>
          <select v-model="resultsFilter" class="filter-select">
            <option value="all">Todos</option>
            <option value="unauthorized">No autorizados</option>
            <option value="authorized">Autorizados</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Por riesgo:</label>
          <select v-model="riskFilter" class="filter-select">
            <option value="all">Todos</option>
            <option value="critical">Crítico (80+)</option>
            <option value="high">Alto (60+)</option>
            <option value="medium">Medio (40+)</option>
            <option value="low">Bajo (0-40)</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Por fecha:</label>
          <select v-model="dateFilter" class="filter-select">
            <option value="all">Todas</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
          </select>
        </div>
        <div class="view-toggle">
          <label>Vista:</label>
          <div class="toggle-buttons">
            <button 
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              📋 Lista
            </button>
            <button 
              :class="{ active: viewMode === 'gallery' }"
              @click="viewMode = 'gallery'"
            >
              🖼️ Galería
            </button>
            <button 
              :class="{ active: viewMode === 'timeline' }"
              @click="viewMode = 'timeline'"
            >
              📅 Timeline
            </button>
          </div>
        </div>
      </div>

      <!-- Results List -->
      <div class="results-list">
        <div 
          v-for="result in filteredResults" 
          :key="result.id"
          class="result-item"
          :class="result.authorized ? 'authorized' : 'unauthorized'"
        >
          <div class="result-risk-indicator" :class="getRiskClass(result.riskScore)">
            {{ getRiskIcon(result.riskScore) }}
          </div>
          
          <div class="result-thumbnail">
            <img :src="result.thumbnail" alt="Thumbnail" />
          </div>

          <div class="result-content">
            <div class="result-header">
              <span class="result-status-badge" :class="result.authorized ? 'authorized' : 'unauthorized'">
                {{ result.authorized ? '✅ USO AUTORIZADO' : '🔴 USO NO AUTORIZADO' }}
              </span>
              <span class="result-risk">
                Riesgo: {{ result.riskScore }}/100
              </span>
            </div>

            <div class="result-details">
              <p class="result-site">
                <strong>Sitio:</strong> 
                <a :href="result.url" target="_blank">{{ result.domain }}</a>
              </p>
              <p class="result-context">
                <strong>Contexto:</strong> {{ result.context }}
              </p>
              <div class="result-metrics">
                <span>📊 Alcance: {{ formatNumber(result.reach) }} views</span>
                <span v-if="result.shares">🔄 {{ formatNumber(result.shares) }} shares</span>
                <span>📅 Detectado: {{ result.detected }}</span>
                <span>🎯 Similitud: {{ result.similarity }}%</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="btn-action" @click="viewPage(result)">
                👁️ Ver página
              </button>
              <button class="btn-action" @click="captureScreenshot(result)">
                📸 Captura
              </button>
              <button v-if="!result.authorized" class="btn-action btn-danger" @click="initiateTakedown(result)">
                🚫 DMCA Takedown
              </button>
              <button v-if="!result.authorized" class="btn-action btn-warning" @click="reportContent(result)">
                ⚠️ Reportar
              </button>
              <button v-if="result.authorized" class="btn-action btn-success">
                ✓ Verificado
              </button>
              <button class="btn-action" @click="viewMetrics(result)">
                📊 Métricas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div v-if="selectedResults.length > 0" class="bulk-actions-bar">
        <div class="bulk-info">
          <span>{{ selectedResults.length }} ítems seleccionados</span>
        </div>
        <div class="bulk-buttons">
          <button class="btn-danger" @click="bulkTakedown">
            🚫 Takedown de seleccionados
          </button>
          <button class="btn-secondary" @click="bulkApprove">
            ✅ Aprobar seleccionados
          </button>
          <button class="btn-secondary" @click="bulkExport">
            💾 Exportar seleccionados
          </button>
          <button class="btn-link" @click="clearSelection">
            Limpiar selección
          </button>
        </div>
      </div>

      <!-- Quick Actions Summary -->
      <div class="quick-actions-summary">
        <h3>ACCIONES RÁPIDAS:</h3>
        <div class="quick-actions-grid">
          <button class="quick-action-btn btn-danger" @click="takedownUnauthorized">
            🚫 Takedown de no autorizados ({{ unauthorizedCount }})
          </button>
          <button class="quick-action-btn btn-success" @click="approveAuthorized">
            ✅ Aprobar autorizados ({{ authorizedCount }})
          </button>
          <button class="quick-action-btn btn-secondary" @click="contactSites">
            📧 Contactar sitios ({{ contactableCount }})
          </button>
          <button class="quick-action-btn btn-secondary" @click="exportReport">
            💾 Exportar reporte completo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const isDragging = ref(false)
const selectedImage = ref<any>(null)
const imageUrl = ref('')
const selectedEngines = ref(['google', 'tineye', 'yandex', 'bing'])
const isSearching = ref(false)
const searchCompleted = ref(false)
const searchProgress = ref(0)
const searchTime = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

const searchEngines = [
  { id: 'google', name: 'Google Images' },
  { id: 'tineye', name: 'TinEye' },
  { id: 'yandex', name: 'Yandex' },
  { id: 'bing', name: 'Bing Images' }
]

// Results
const searchResults = ref<any[]>([])
const selectedResults = ref<any[]>([])
const resultsFilter = ref('all')
const riskFilter = ref('all')
const dateFilter = ref('all')
const viewMode = ref('list')

// Computed
const canSearch = computed(() => {
  return (selectedImage.value || imageUrl.value) && selectedEngines.value.length > 0
})

const filteredResults = computed(() => {
  let results = searchResults.value

  if (resultsFilter.value === 'unauthorized') {
    results = results.filter(r => !r.authorized)
  } else if (resultsFilter.value === 'authorized') {
    results = results.filter(r => r.authorized)
  }

  if (riskFilter.value !== 'all') {
    const riskThresholds: Record<string, number> = {
      critical: 80,
      high: 60,
      medium: 40,
      low: 0
    }
    const threshold = riskThresholds[riskFilter.value]
    results = results.filter(r => r.riskScore >= threshold)
  }

  return results
})

const totalResults = computed(() => searchResults.value.length)
const unauthorizedCount = computed(() => searchResults.value.filter(r => !r.authorized).length)
const authorizedCount = computed(() => searchResults.value.filter(r => r.authorized).length)
const contactableCount = computed(() => 8) // Mock

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

const processFile = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImage.value = {
      url: e.target?.result,
      name: file.name,
      size: formatFileSize(file.size),
      dimensions: '1920x1080', // Mock
      uploadedAt: new Date().toLocaleString()
    }
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  selectedImage.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const searchByUrl = () => {
  if (imageUrl.value) {
    selectedImage.value = {
      url: imageUrl.value,
      name: 'Imagen desde URL',
      size: 'Desconocido',
      dimensions: 'Desconocido',
      uploadedAt: new Date().toLocaleString()
    }
    startSearch()
  }
}

const startSearch = () => {
  isSearching.value = true
  searchProgress.value = 0
  
  // Simulate search progress
  const interval = setInterval(() => {
    searchProgress.value += 10
    if (searchProgress.value >= 100) {
      clearInterval(interval)
      completeSearch()
    }
  }, 300)
}

const completeSearch = () => {
  searchTime.value = 12.4
  isSearching.value = false
  searchCompleted.value = true
  
  // Generate mock results
  searchResults.value = generateMockResults()
}

const generateMockResults = () => {
  const results = []
  const domains = [
    'memespoliticos.mx',
    'linkedin.com',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'noticias.com',
    'blog-personal.com',
    'revista-tech.com'
  ]
  
  for (let i = 0; i < 15; i++) {
    const authorized = Math.random() > 0.6
    const riskScore = authorized ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 40) + 60
    
    results.push({
      id: `result-${i}`,
      domain: domains[Math.floor(Math.random() * domains.length)],
      url: `https://${domains[Math.floor(Math.random() * domains.length)]}/post/${i}`,
      thumbnail: selectedImage.value?.url || '/placeholder.jpg',
      context: authorized ? 'Perfil profesional oficial' : 'Uso no autorizado en meme',
      reach: Math.floor(Math.random() * 200000) + 1000,
      shares: Math.floor(Math.random() * 5000),
      detected: `Hace ${Math.floor(Math.random() * 30) + 1} días`,
      similarity: Math.floor(Math.random() * 20) + 80,
      authorized,
      riskScore
    })
  }
  
  return results
}

const startNewSearch = () => {
  searchCompleted.value = false
  selectedImage.value = null
  imageUrl.value = ''
  searchResults.value = []
}

const showHistory = () => {
  alert('Mostrando historial de búsquedas...')
}

const viewPage = (result: any) => {
  window.open(result.url, '_blank')
}

const captureScreenshot = (result: any) => {
  alert(`Capturando screenshot de ${result.domain}...`)
}

const initiateTakedown = (result: any) => {
  alert(`Iniciando proceso DMCA para ${result.domain}...`)
}

const reportContent = (result: any) => {
  alert(`Reportando contenido en ${result.domain}...`)
}

const viewMetrics = (result: any) => {
  alert(`Mostrando métricas detalladas de ${result.domain}...`)
}

const bulkTakedown = () => {
  alert(`Iniciando takedown masivo de ${selectedResults.value.length} ítems...`)
}

const bulkApprove = () => {
  alert(`Aprobando ${selectedResults.value.length} ítems...`)
}

const bulkExport = () => {
  alert(`Exportando ${selectedResults.value.length} ítems...`)
}

const clearSelection = () => {
  selectedResults.value = []
}

const takedownUnauthorized = () => {
  alert(`Iniciando takedown de ${unauthorizedCount.value} usos no autorizados...`)
}

const approveAuthorized = () => {
  alert(`Aprobando ${authorizedCount.value} usos autorizados...`)
}

const contactSites = () => {
  alert('Contactando sitios...')
}

const exportReport = () => {
  alert('Exportando reporte completo...')
}

// Utilities
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

const getRiskClass = (score: number) => {
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

const getRiskIcon = (score: number) => {
  if (score >= 80) return '🔴'
  if (score >= 60) return '🟠'
  if (score >= 40) return '🟡'
  return '🟢'
}
</script>

<style scoped>
.reverse-image-search {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-left h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 0.95rem;
  color: #9AA0A6;
  margin: 0;
}

/* Upload Section */
.upload-section {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.upload-zone {
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 2rem;
}

.upload-zone.drag-over {
  border-color: #4A90E2;
  background: rgba(74, 144, 226, 0.05);
}

.upload-zone:hover {
  border-color: #4A90E2;
  background: rgba(255, 255, 255, 0.02);
}

.upload-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.upload-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.upload-subtitle {
  font-size: 0.9rem;
  color: #9AA0A6;
  margin: 0 0 1rem 0;
}

.upload-formats {
  font-size: 0.8rem;
  color: #9AA0A6;
  margin: 0;
}

.image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.image-preview img {
  max-width: 300px;
  max-height: 300px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.image-info {
  text-align: center;
}

.image-name {
  font-size: 1rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 0.25rem 0;
}

.image-meta, .image-uploaded {
  font-size: 0.85rem;
  color: #9AA0A6;
  margin: 0;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background: rgba(211, 47, 47, 0.2);
  border: 1px solid rgba(211, 47, 47, 0.3);
  border-radius: 6px;
  color: #D32F2F;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: rgba(211, 47, 47, 0.3);
}

/* URL Option */
.url-option {
  margin-bottom: 2rem;
}

.url-option p {
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 0 0 0.75rem 0;
}

.url-input-group {
  display: flex;
  gap: 1rem;
}

.url-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.9rem;
}

/* Engines */
.engines-selection {
  margin-bottom: 2rem;
}

.engines-selection p {
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 0 0 0.75rem 0;
}

.engines-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.engine-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.engine-checkbox:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Search Actions */
.search-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-launch {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #722ED1 0%, #8B4AD1 100%);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(114, 46, 209, 0.3);
}

.btn-launch:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(114, 46, 209, 0.4);
}

.btn-launch:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Searching Panel */
.searching-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
}

.search-progress h3 {
  font-size: 1.5rem;
  color: #E8EAED;
  margin: 0 0 1.5rem 0;
}

.progress-bar-container {
  height: 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #722ED1 0%, #8B4AD1 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #E8EAED;
  font-family: 'Courier New', monospace;
}

.search-status {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Results Panel */
.results-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.results-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

/* Usage Map */
.usage-map {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.map-header h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.map-placeholder {
  padding: 2rem;
  text-align: center;
}

.map-placeholder p {
  font-size: 1.1rem;
  color: #E8EAED;
  margin: 0 0 1.5rem 0;
}

.geo-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.geo-stat {
  display: grid;
  grid-template-columns: 100px 1fr 150px;
  gap: 1rem;
  align-items: center;
}

.geo-region {
  font-size: 0.9rem;
  color: #E8EAED;
  font-weight: 600;
}

.geo-bar {
  height: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.geo-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4A90E2 0%, #5BA3F5 100%);
  transition: width 0.5s ease;
}

.geo-count {
  font-size: 0.85rem;
  color: #9AA0A6;
  text-align: right;
}

/* Results Filters */
.results-filters {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.85rem;
  color: #9AA0A6;
}

.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 0.85rem;
}

.view-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.toggle-buttons {
  display: flex;
  gap: 0.25rem;
}

.toggle-buttons button {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #9AA0A6;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-buttons button.active {
  background: #4A90E2;
  color: #fff;
  border-color: #4A90E2;
}

/* Results List */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.result-item {
  display: grid;
  grid-template-columns: 40px 150px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: all 0.2s;
}

.result-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.result-item.unauthorized {
  border-left: 3px solid #D32F2F;
}

.result-item.authorized {
  border-left: 3px solid #52C41A;
}

.result-risk-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.result-thumbnail img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-status-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.result-status-badge.unauthorized {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.result-status-badge.authorized {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.result-risk {
  font-size: 0.85rem;
  color: #9AA0A6;
  font-weight: 600;
}

.result-details p {
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.result-details a {
  color: #4A90E2;
  text-decoration: none;
}

.result-details a:hover {
  text-decoration: underline;
}

.result-metrics {
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;
  color: #9AA0A6;
  flex-wrap: wrap;
}

.result-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Quick Actions */
.quick-actions-summary {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.quick-actions-summary h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.quick-action-btn {
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

/* Bulk Actions Bar */
.bulk-actions-bar {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.bulk-info {
  font-size: 0.9rem;
  font-weight: 600;
  color: #E8EAED;
}

.bulk-buttons {
  display: flex;
  gap: 0.5rem;
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-danger, .btn-warning, .btn-success, .btn-icon, .btn-action, .btn-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: #722ED1;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #8B4AD1;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-danger {
  background: #D32F2F;
  color: #fff;
}

.btn-danger:hover {
  background: #F44336;
}

.btn-warning {
  background: #FA8C16;
  color: #fff;
}

.btn-warning:hover {
  background: #FFA940;
}

.btn-success {
  background: #52C41A;
  color: #fff;
}

.btn-success:hover {
  background: #73D13D;
}

.btn-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action.btn-danger {
  background: rgba(211, 47, 47, 0.2);
  border-color: rgba(211, 47, 47, 0.3);
  color: #D32F2F;
}

.btn-action.btn-danger:hover {
  background: rgba(211, 47, 47, 0.3);
}

.btn-action.btn-warning {
  background: rgba(250, 140, 22, 0.2);
  border-color: rgba(250, 140, 22, 0.3);
  color: #FA8C16;
}

.btn-action.btn-warning:hover {
  background: rgba(250, 140, 22, 0.3);
}

.btn-action.btn-success {
  background: rgba(82, 196, 26, 0.2);
  border-color: rgba(82, 196, 26, 0.3);
  color: #52C41A;
}

.btn-action.btn-success:hover {
  background: rgba(82, 196, 26, 0.3);
}

.btn-link {
  background: transparent;
  color: #4A90E2;
  padding: 0.5rem 0;
}

.btn-link:hover {
  color: #5BA3F5;
  text-decoration: underline;
}
</style>
