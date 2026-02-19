<template>
  <div class="digital-scanner">
    <!-- Header -->
    <div class="scanner-header">
      <div class="header-left">
        <h1>🔍 Digital Footprint Scanner</h1>
        <p class="subtitle">Escaneo profundo multi-fuente de tu huella digital</p>
      </div>
      <div class="header-right">
        <button v-if="!isScanning" class="btn-primary" @click="startNewScan">
          <span>✨</span> Nueva Búsqueda
        </button>
        <button v-if="isScanning" class="btn-danger" @click="stopScan">
          <span>⏹</span> Detener Scan
        </button>
      </div>
    </div>

    <!-- Configuration Panel (shown when not scanning) -->
    <div v-if="!isScanning && !scanCompleted" class="config-panel">
      <div class="config-section">
        <h3>CONFIGURAR SCAN:</h3>
        
        <!-- Profile Selection -->
        <div class="form-group">
          <label>Perfil objetivo:</label>
          <div class="profile-selector">
            <select v-model="config.profileId" class="select-input">
              <option value="profile-001">José María González</option>
              <option value="profile-002">Otro perfil</option>
            </select>
            <button class="btn-secondary">+ Crear nuevo perfil</button>
          </div>
        </div>

        <!-- Search Terms -->
        <div class="form-group">
          <label>Términos de búsqueda:</label>
          <div class="terms-container">
            <div 
              v-for="(term, index) in config.searchTerms" 
              :key="index"
              class="term-chip"
            >
              <span>{{ term }}</span>
              <button @click="removeTerm(index)" class="remove-btn">×</button>
            </div>
            <input 
              v-model="newTerm"
              @keyup.enter="addTerm"
              placeholder="Agregar término..."
              class="term-input"
            />
          </div>
        </div>

        <!-- Sources Selection -->
        <div class="form-group">
          <label>Fuentes a escanear:</label>
          <div class="sources-grid">
            <label 
              v-for="source in availableSources" 
              :key="source.id"
              class="source-checkbox"
              :class="{ disabled: source.disabled }"
            >
              <input 
                type="checkbox" 
                v-model="config.selectedSources"
                :value="source.id"
                :disabled="source.disabled"
              />
              <span class="source-icon" :class="source.status">{{ source.icon }}</span>
              <span class="source-name">{{ source.name }}</span>
            </label>
          </div>
        </div>

        <!-- Scan Depth -->
        <div class="form-group">
          <label>Profundidad del scan:</label>
          <div class="depth-options">
            <label class="radio-option">
              <input type="radio" v-model="config.depth" value="quick" />
              <span class="option-label">
                <strong>Rápida</strong>
                <small>~5 minutos</small>
              </span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="config.depth" value="standard" />
              <span class="option-label">
                <strong>Estándar</strong>
                <small>~15 minutos</small>
              </span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="config.depth" value="deep" />
              <span class="option-label">
                <strong>Profunda</strong>
                <small>~1 hora</small>
              </span>
            </label>
          </div>
        </div>

        <!-- Start Button -->
        <div class="form-actions">
          <button 
            class="btn-launch" 
            @click="startScan"
            :disabled="!canStartScan"
          >
            <span class="rocket">🚀</span>
            <span>INICIAR SCAN COMPLETO</span>
          </button>
          <button class="btn-link">⚙️ Opciones avanzadas</button>
        </div>
      </div>
    </div>

    <!-- Scanning Progress (shown during scan) -->
    <div v-if="isScanning" class="scanning-panel">
      <div class="scan-header">
        <div class="scan-status">
          <span class="status-icon pulse">🟢</span>
          <span class="status-text">Escaneando...</span>
        </div>
        <div class="scan-timer">
          <span>Tiempo: {{ formatTime(scanElapsedTime) }}</span>
        </div>
        <div class="scan-controls">
          <button class="btn-icon" @click="pauseScan" v-if="!isPaused">
            <span>⏸</span> Pausar
          </button>
          <button class="btn-icon" @click="resumeScan" v-if="isPaused">
            <span>▶️</span> Reanudar
          </button>
          <button class="btn-icon btn-danger" @click="stopScan">
            <span>⏹</span> Detener
          </button>
        </div>
      </div>

      <!-- Overall Progress -->
      <div class="overall-progress">
        <div class="progress-label">
          <span>Progreso general:</span>
          <span class="progress-percent">{{ Math.round(overallProgress) }}%</span>
        </div>
        <div class="progress-bar-container">
          <div 
            class="progress-bar-fill" 
            :style="{ width: `${overallProgress}%` }"
          ></div>
        </div>
      </div>

      <!-- Sources Progress -->
      <div class="sources-progress">
        <h4>Fuentes completadas:</h4>
        <div class="source-progress-list">
          <div 
            v-for="source in scanProgress" 
            :key="source.id"
            class="source-progress-item"
          >
            <div class="source-info">
              <span class="source-status-icon">{{ getStatusIcon(source.status) }}</span>
              <span class="source-label">{{ source.name }}</span>
            </div>
            <div class="source-progress-bar">
              <div 
                class="source-progress-fill"
                :class="source.status"
                :style="{ width: `${source.progress}%` }"
              ></div>
            </div>
            <div class="source-stats">
              <span class="progress-value">{{ source.progress }}%</span>
              <span class="results-count">({{ source.resultsFound }} encontrados)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Results Feed -->
      <div class="live-feed">
        <div class="feed-header">
          <h4>Resultados en tiempo real:</h4>
          <div class="feed-controls">
            <button 
              class="btn-small" 
              @click="pauseFeed = !pauseFeed"
            >
              {{ pauseFeed ? '▶️ Reanudar feed' : '⏸ Pausar feed' }}
            </button>
            <select v-model="feedFilter" class="filter-select">
              <option value="all">Todos</option>
              <option value="critical">Solo críticos</option>
              <option value="high">Alto riesgo+</option>
            </select>
          </div>
        </div>

        <div class="feed-items" ref="feedContainer">
          <TransitionGroup name="feed">
            <div 
              v-for="item in filteredFeedItems" 
              :key="item.id"
              class="feed-item"
              :class="item.riskLevel"
            >
              <div class="feed-item-header">
                <span class="feed-badge">🆕</span>
                <span class="feed-source">{{ item.source }}</span>
                <span class="feed-time">Hace {{ item.timeAgo }}</span>
              </div>
              <div class="feed-item-content">
                <p class="feed-title">{{ item.title }}</p>
                <p class="feed-description">{{ item.description }}</p>
                <div class="feed-metrics">
                  <span>Alcance: {{ formatNumber(item.reach) }}</span>
                  <span class="risk-badge" :class="item.riskLevel">
                    {{ getRiskIcon(item.riskScore) }} Riesgo: {{ item.riskLevel }} ({{ item.riskScore }}/100)
                  </span>
                </div>
              </div>
              <div class="feed-item-actions">
                <button class="btn-action">👁️ Ver</button>
                <button class="btn-action">⬇️ Descargar</button>
                <button class="btn-action" v-if="item.riskScore >= 70">⚠️ Marcar crítico</button>
                <button class="btn-action btn-danger" v-if="item.riskScore >= 80">🚫 Takedown</button>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div class="feed-footer">
          <button class="btn-link" @click="showAllResults">
            Ver todos los resultados ({{ totalResults }})
          </button>
        </div>
      </div>
    </div>

    <!-- Scan Completed (shown after completion) -->
    <div v-if="scanCompleted" class="completion-panel">
      <div class="completion-header">
        <div class="completion-icon">✅</div>
        <h2>SCAN COMPLETADO</h2>
        <p class="completion-time">Duración: {{ formatTime(scanElapsedTime) }}</p>
      </div>

      <div class="completion-summary">
        <h3>RESUMEN:</h3>
        <div class="summary-stats">
          <div class="stat-card">
            <div class="stat-value">{{ scanResults.newItems }}</div>
            <div class="stat-label">Nuevos ítems encontrados</div>
          </div>
          <div class="stat-card critical">
            <div class="stat-value">{{ scanResults.criticalItems }}</div>
            <div class="stat-label">Ítems críticos detectados</div>
          </div>
          <div class="stat-card warning">
            <div class="stat-value">{{ scanResults.monitoredItems }}</div>
            <div class="stat-label">Ítems monitoreados</div>
          </div>
          <div class="stat-card success">
            <div class="stat-value">{{ scanResults.controlledItems }}</div>
            <div class="stat-label">Ítems controlados</div>
          </div>
        </div>
      </div>

      <div class="completion-actions">
        <button class="btn-primary" @click="viewFullReport">
          📊 Ver reporte completo
        </button>
        <button class="btn-warning" @click="reviewCritical">
          ⚠️ Revisar críticos ({{ scanResults.criticalItems }})
        </button>
        <button class="btn-secondary" @click="exportResults">
          💾 Exportar resultados
        </button>
        <button class="btn-secondary" @click="startNewScan">
          🔄 Nuevo scan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Configuration
const config = ref({
  profileId: 'profile-001',
  searchTerms: ['José María González', 'JM González', '@jmgonzalez', 'TechCorp CEO'],
  selectedSources: ['google', 'twitter', 'linkedin', 'facebook', 'instagram'],
  depth: 'standard'
})

const newTerm = ref('')

const availableSources = ref([
  { id: 'google', name: 'Google', icon: '🔍', status: 'active', disabled: false },
  { id: 'bing', name: 'Bing', icon: '🔍', status: 'active', disabled: false },
  { id: 'duckduckgo', name: 'DuckDuckGo', icon: '🦆', status: 'active', disabled: false },
  { id: 'twitter', name: 'Twitter', icon: '🐦', status: 'active', disabled: false },
  { id: 'facebook', name: 'Facebook', icon: '👥', status: 'active', disabled: false },
  { id: 'instagram', name: 'Instagram', icon: '📷', status: 'active', disabled: false },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', status: 'active', disabled: false },
  { id: 'youtube', name: 'YouTube', icon: '📺', status: 'active', disabled: false },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', status: 'active', disabled: false },
  { id: 'reddit', name: 'Reddit', icon: '🤖', status: 'warning', disabled: false },
  { id: '4chan', name: '4chan', icon: '🍀', status: 'danger', disabled: false },
  { id: 'news', name: 'News Sites', icon: '📰', status: 'active', disabled: false },
  { id: 'forums', name: 'Forums', icon: '💬', status: 'warning', disabled: false },
  { id: 'blogs', name: 'Blogs', icon: '📝', status: 'warning', disabled: false },
  { id: 'darkweb', name: 'Dark Web', icon: '🕵️', status: 'danger', disabled: false }
])

// Scanning state
const isScanning = ref(false)
const isPaused = ref(false)
const scanCompleted = ref(false)
const scanElapsedTime = ref(0)
const overallProgress = ref(0)

const scanProgress = ref<any[]>([])
const liveResults = ref<any[]>([])
const feedFilter = ref('all')
const pauseFeed = ref(false)

let scanInterval: any = null
let timerInterval: any = null
let resultsInterval: any = null

const scanResults = ref({
  newItems: 0,
  criticalItems: 0,
  monitoredItems: 0,
  controlledItems: 0
})

// Computed
const canStartScan = computed(() => {
  return config.value.selectedSources.length > 0 && config.value.searchTerms.length > 0
})

const filteredFeedItems = computed(() => {
  let items = liveResults.value
  if (feedFilter.value === 'critical') {
    items = items.filter(item => item.riskScore >= 80)
  } else if (feedFilter.value === 'high') {
    items = items.filter(item => item.riskScore >= 60)
  }
  return items.slice(0, 10) // Show last 10
})

const totalResults = computed(() => liveResults.value.length)

// Methods
const addTerm = () => {
  if (newTerm.value.trim()) {
    config.value.searchTerms.push(newTerm.value.trim())
    newTerm.value = ''
  }
}

const removeTerm = (index: number) => {
  config.value.searchTerms.splice(index, 1)
}

const startScan = () => {
  isScanning.value = true
  scanCompleted.value = false
  scanElapsedTime.value = 0
  overallProgress.value = 0
  liveResults.value = []
  
  // Initialize progress for selected sources
  scanProgress.value = config.value.selectedSources.map(sourceId => {
    const source = availableSources.value.find(s => s.id === sourceId)
    return {
      id: sourceId,
      name: source?.name || sourceId,
      status: 'pending',
      progress: 0,
      resultsFound: 0
    }
  })

  // Start timers
  startTimers()
  simulateScan()
}

const startTimers = () => {
  timerInterval = setInterval(() => {
    if (!isPaused.value) {
      scanElapsedTime.value++
    }
  }, 1000)
}

const simulateScan = () => {
  let currentSourceIndex = 0
  
  scanInterval = setInterval(() => {
    if (isPaused.value) return
    
    // Update current source progress
    if (currentSourceIndex < scanProgress.value.length) {
      const currentSource = scanProgress.value[currentSourceIndex]
      
      if (currentSource.status === 'pending') {
        currentSource.status = 'scanning'
      }
      
      if (currentSource.progress < 100) {
        // Increment progress (faster for some sources)
        const increment = Math.random() * 15 + 5
        currentSource.progress = Math.min(100, currentSource.progress + increment)
        
        // Add results randomly
        if (Math.random() > 0.7) {
          currentSource.resultsFound += Math.floor(Math.random() * 5) + 1
        }
      } else {
        currentSource.status = 'completed'
        currentSourceIndex++
      }
    }
    
    // Calculate overall progress
    const totalProgress = scanProgress.value.reduce((sum, s) => sum + s.progress, 0)
    overallProgress.value = totalProgress / scanProgress.value.length
    
    // Check if scan is complete
    if (overallProgress.value >= 100) {
      completeScan()
    }
  }, 500)

  // Simulate live results
  resultsInterval = setInterval(() => {
    if (isPaused.value || pauseFeed.value) return
    
    addLiveResult()
  }, 2000)
}

const addLiveResult = () => {
  const sources = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Google', 'YouTube']
  const riskScore = Math.floor(Math.random() * 100)
  const riskLevel = riskScore >= 80 ? 'critical' : riskScore >= 60 ? 'high' : riskScore >= 40 ? 'medium' : 'low'
  
  const newResult = {
    id: `result-${Date.now()}-${Math.random()}`,
    source: sources[Math.floor(Math.random() * sources.length)],
    timeAgo: '2s',
    title: generateRandomTitle(),
    description: generateRandomDescription(),
    reach: Math.floor(Math.random() * 100000) + 1000,
    riskScore,
    riskLevel
  }
  
  liveResults.value.unshift(newResult)
  
  // Keep only last 50 results
  if (liveResults.value.length > 50) {
    liveResults.value = liveResults.value.slice(0, 50)
  }
}

const generateRandomTitle = () => {
  const titles = [
    'Foto de perfil encontrada en página no autorizada',
    'Mención en artículo de noticias',
    'Video de conferencia compartido',
    'Documento PDF detectado',
    'Story con mención en Instagram',
    'Tweet con foto antigua',
    'Post en grupo de Facebook',
    'Perfil duplicado detectado'
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

const generateRandomDescription = () => {
  const descriptions = [
    'Uso no autorizado detectado en sitio de terceros',
    'Contenido compartido sin atribución',
    'Mención en contexto político',
    'Imagen usada en artículo de opinión',
    'Perfil falso usando información personal',
    'Contenido viral con alcance significativo'
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const pauseScan = () => {
  isPaused.value = true
}

const resumeScan = () => {
  isPaused.value = false
}

const stopScan = () => {
  clearIntervals()
  isScanning.value = false
  scanCompleted.value = false
}

const completeScan = () => {
  clearIntervals()
  isScanning.value = false
  scanCompleted.value = true
  
  // Calculate final results
  scanResults.value = {
    newItems: liveResults.value.length,
    criticalItems: liveResults.value.filter(r => r.riskScore >= 80).length,
    monitoredItems: liveResults.value.filter(r => r.riskScore >= 60 && r.riskScore < 80).length,
    controlledItems: liveResults.value.filter(r => r.riskScore < 60).length
  }
}

const clearIntervals = () => {
  if (scanInterval) clearInterval(scanInterval)
  if (timerInterval) clearInterval(timerInterval)
  if (resultsInterval) clearInterval(resultsInterval)
}

const startNewScan = () => {
  scanCompleted.value = false
  isScanning.value = false
}

const viewFullReport = () => {
  alert('Abriendo reporte completo...')
}

const reviewCritical = () => {
  alert('Mostrando ítems críticos...')
}

const exportResults = () => {
  alert('Exportando resultados...')
}

const showAllResults = () => {
  alert('Mostrando todos los resultados...')
}

// Utility functions
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    pending: '⏳',
    scanning: '🔄',
    completed: '✅',
    error: '❌'
  }
  return icons[status] || '⏳'
}

const getRiskIcon = (score: number) => {
  if (score >= 80) return '🔴'
  if (score >= 60) return '🟠'
  if (score >= 40) return '🟡'
  return '🟢'
}

// Lifecycle
onUnmounted(() => {
  clearIntervals()
})
</script>

<style scoped>
.digital-scanner {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.scanner-header {
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

/* Configuration Panel */
.config-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.config-section h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem 0;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #E8EAED;
  margin-bottom: 0.75rem;
}

.profile-selector {
  display: flex;
  gap: 1rem;
}

.select-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.9rem;
}

/* Terms */
.terms-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  min-height: 60px;
}

.term-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: #4A90E2;
  border-radius: 16px;
  color: #fff;
  font-size: 0.85rem;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.term-input {
  flex: 1;
  min-width: 150px;
  background: transparent;
  border: none;
  color: #E8EAED;
  font-size: 0.9rem;
  outline: none;
}

/* Sources Grid */
.sources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
}

.source-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.source-checkbox:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: #4A90E2;
}

.source-checkbox.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.source-icon {
  font-size: 1.2rem;
}

.source-icon.danger {
  filter: grayscale(0.5);
}

.source-name {
  font-size: 0.85rem;
  color: #E8EAED;
}

/* Depth Options */
.depth-options {
  display: flex;
  gap: 1rem;
}

.radio-option {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #4A90E2;
}

.option-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option-label strong {
  color: #E8EAED;
  font-size: 0.9rem;
}

.option-label small {
  color: #9AA0A6;
  font-size: 0.75rem;
}

/* Launch Button */
.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
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

.rocket {
  font-size: 1.5rem;
  animation: rocket-shake 2s infinite;
}

@keyframes rocket-shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

/* Scanning Panel */
.scanning-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.scan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.scan-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-icon.pulse {
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #E8EAED;
}

.scan-timer {
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  color: #9AA0A6;
}

.scan-controls {
  display: flex;
  gap: 0.5rem;
}

/* Progress */
.overall-progress {
  margin-bottom: 2rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #E8EAED;
}

.progress-percent {
  font-weight: 700;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
}

.progress-bar-container {
  height: 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #722ED1 0%, #8B4AD1 100%);
  transition: width 0.5s ease;
}

/* Sources Progress */
.sources-progress h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.source-progress-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.source-progress-item {
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  gap: 1rem;
  align-items: center;
}

.source-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.source-label {
  font-size: 0.9rem;
  color: #E8EAED;
}

.source-progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.source-progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.source-progress-fill.pending {
  background: #9AA0A6;
  width: 0;
}

.source-progress-fill.scanning {
  background: #4A90E2;
}

.source-progress-fill.completed {
  background: #52C41A;
}

.source-stats {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.progress-value {
  color: #E8EAED;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.results-count {
  color: #9AA0A6;
}

/* Live Feed */
.live-feed {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.feed-header h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.feed-controls {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.4rem 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 0.8rem;
}

.feed-items {
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.feed-item {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid #4A90E2;
  border-radius: 6px;
  transition: all 0.2s;
}

.feed-item.critical {
  border-left-color: #D32F2F;
  background: rgba(211, 47, 47, 0.05);
}

.feed-item.high {
  border-left-color: #FA8C16;
  background: rgba(250, 140, 22, 0.05);
}

.feed-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.feed-item-header {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: #9AA0A6;
}

.feed-badge {
  padding: 0.2rem 0.5rem;
  background: #4A90E2;
  border-radius: 4px;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
}

.feed-item-content {
  margin-bottom: 1rem;
}

.feed-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.feed-description {
  font-size: 0.85rem;
  color: #9AA0A6;
  margin: 0 0 0.75rem 0;
}

.feed-metrics {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #9AA0A6;
}

.risk-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
}

.risk-badge.critical {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.risk-badge.high {
  background: rgba(250, 140, 22, 0.2);
  color: #FA8C16;
}

.risk-badge.medium {
  background: rgba(250, 173, 20, 0.2);
  color: #FAAD14;
}

.risk-badge.low {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.feed-item-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Feed Transitions */
.feed-enter-active,
.feed-leave-active {
  transition: all 0.3s ease;
}

.feed-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.feed-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Completion Panel */
.completion-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
}

.completion-header {
  margin-bottom: 2rem;
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.completion-panel h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.completion-time {
  font-size: 1rem;
  color: #9AA0A6;
  font-family: 'Courier New', monospace;
}

.completion-summary h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem 0;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.stat-card.critical {
  border-color: rgba(211, 47, 47, 0.3);
  background: rgba(211, 47, 47, 0.05);
}

.stat-card.warning {
  border-color: rgba(250, 140, 22, 0.3);
  background: rgba(250, 140, 22, 0.05);
}

.stat-card.success {
  border-color: rgba(82, 196, 26, 0.3);
  background: rgba(82, 196, 26, 0.05);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #E8EAED;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #9AA0A6;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-warning, .btn-danger, .btn-icon, .btn-action, .btn-link, .btn-small {
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

.btn-primary:hover {
  background: #8B4AD1;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-warning {
  background: #FA8C16;
  color: #fff;
}

.btn-warning:hover {
  background: #FFA940;
}

.btn-danger {
  background: #D32F2F;
  color: #fff;
}

.btn-danger:hover {
  background: #F44336;
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

.btn-link {
  background: transparent;
  color: #4A90E2;
  padding: 0.5rem 0;
}

.btn-link:hover {
  color: #5BA3F5;
  text-decoration: underline;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-small:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>
