<template>
  <div class="takedown-station">
    <!-- Header -->
    <div class="station-header">
      <div class="header-left">
        <h1>🚫 Takedown Automation Station</h1>
        <p class="subtitle">Generación y envío automatizado de solicitudes DMCA</p>
      </div>
      <div class="header-right">
        <button class="btn-primary" @click="startNewRequest">
          <span>+</span> Nueva Solicitud
        </button>
      </div>
    </div>

    <!-- Create Request Wizard (shown when creating new) -->
    <div v-if="showWizard" class="wizard-panel">
      <div class="wizard-steps">
        <div 
          v-for="(step, index) in wizardSteps" 
          :key="index"
          class="wizard-step"
          :class="{ active: currentStep === index, completed: currentStep > index }"
        >
          <div class="step-number">{{ currentStep > index ? '✓' : index + 1 }}</div>
          <div class="step-label">{{ step }}</div>
        </div>
      </div>

      <!-- Step 1: Select Infringing Content -->
      <div v-if="currentStep === 0" class="wizard-content">
        <h3>Paso 1: Seleccionar contenido infractor</h3>
        <div class="form-group">
          <label>URL del contenido:</label>
          <div class="url-input-group">
            <input 
              v-model="newRequest.url"
              type="text"
              placeholder="https://ejemplo.com/contenido-infractor"
              class="url-input"
            />
            <button class="btn-secondary" @click="validateUrl" :disabled="!newRequest.url">
              Validar
            </button>
          </div>
          <div v-if="urlValidated" class="validation-success">
            ✅ URL válida | Contenido detectado: {{ newRequest.contentType }}
          </div>
        </div>

        <div v-if="urlValidated" class="content-preview">
          <h4>Preview del contenido infractor:</h4>
          <div class="preview-box">
            <div class="preview-label">Vista previa del contenido</div>
            <div style="width: 200px; height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">Preview</div>
            <div class="preview-meta">
              <div>Tipo: Imagen</div>
              <div>Tamaño: 1920x1080</div>
              <div>Fuente: Facebook</div>
            </div>
          </div>
          <div class="preview-info">
            <p><strong>Dominio:</strong> {{ newRequest.domain }}</p>
            <p><strong>Tipo:</strong> {{ newRequest.contentType }}</p>
            <p><strong>Detectado:</strong> {{ newRequest.detectedDate }}</p>
            <p><strong>Alcance:</strong> {{ newRequest.reach }} views</p>
          </div>
        </div>

        <div class="wizard-actions">
          <button class="btn-secondary" @click="cancelWizard">Cancelar</button>
          <button class="btn-primary" @click="nextStep" :disabled="!urlValidated">
            Siguiente →
          </button>
        </div>
      </div>

      <!-- Step 2: Select Original Asset -->
      <div v-if="currentStep === 1" class="wizard-content">
        <h3>Paso 2: Seleccionar asset original (tu versión oficial)</h3>
        <div class="assets-selection">
          <label 
            v-for="asset in officialAssets" 
            :key="asset.id"
            class="asset-option"
            :class="{ selected: newRequest.originalAssetId === asset.id }"
          >
            <input 
              type="radio" 
              v-model="newRequest.originalAssetId"
              :value="asset.id"
            />
            <div class="asset-preview-small">
              <img :src="asset.thumbnail" alt="Asset" />
            </div>
            <span class="asset-name">{{ asset.name }}</span>
          </label>
        </div>

        <div class="wizard-actions">
          <button class="btn-secondary" @click="previousStep">← Anterior</button>
          <button class="btn-primary" @click="nextStep" :disabled="!newRequest.originalAssetId">
            Siguiente →
          </button>
        </div>
      </div>

      <!-- Step 3: Type of Infringement -->
      <div v-if="currentStep === 2" class="wizard-content">
        <h3>Paso 3: Tipo de infracción</h3>
        <div class="infringement-types">
          <label class="type-option">
            <input type="radio" v-model="newRequest.infractionType" value="dmca" />
            <div class="type-content">
              <strong>DMCA Copyright</strong>
              <small>Uso no autorizado de contenido protegido</small>
            </div>
          </label>
          <label class="type-option">
            <input type="radio" v-model="newRequest.infractionType" value="privacy" />
            <div class="type-content">
              <strong>Violación de privacidad</strong>
              <small>Uso de información personal sin consentimiento</small>
            </div>
          </label>
          <label class="type-option">
            <input type="radio" v-model="newRequest.infractionType" value="defamation" />
            <div class="type-content">
              <strong>Difamación / contenido falso</strong>
              <small>Contenido falso o difamatorio</small>
            </div>
          </label>
          <label class="type-option">
            <input type="radio" v-model="newRequest.infractionType" value="commercial" />
            <div class="type-content">
              <strong>Uso comercial no autorizado</strong>
              <small>Uso comercial sin licencia</small>
            </div>
          </label>
        </div>

        <div class="wizard-actions">
          <button class="btn-secondary" @click="previousStep">← Anterior</button>
          <button class="btn-primary" @click="nextStep" :disabled="!newRequest.infractionType">
            Siguiente →
          </button>
        </div>
      </div>

      <!-- Step 4: Generate Letter -->
      <div v-if="currentStep === 3" class="wizard-content">
        <h3>Paso 4: Generar carta de takedown</h3>
        <div class="generation-options">
          <button class="btn-primary" @click="generateLetter">
            🤖 Generar automáticamente
          </button>
          <button class="btn-secondary" @click="writeManually">
            ✏️ Escribir manualmente
          </button>
        </div>

        <div v-if="letterGenerated" class="letter-preview">
          <h4>CARTA GENERADA:</h4>
          <div class="letter-content">
            <div class="letter-header">
              <p><strong>To:</strong> DMCA Agent - {{ newRequest.domain }}</p>
              <p><strong>Date:</strong> {{ new Date().toLocaleDateString() }}</p>
              <p><strong>RE:</strong> DMCA Takedown Notice - Copyright Infringement</p>
            </div>
            <div class="letter-body">
              <p>Dear DMCA Agent,</p>
              <p>I am writing to notify you of copyright infringement occurring on your website. I am the copyright owner (or authorized agent) of the copyrighted work described below:</p>
              
              <p><strong>Original Work:</strong> Professional photograph of José María González</p>
              <p><strong>Copyright Registration:</strong> [Auto-filled]</p>
              <p><strong>First Published:</strong> January 15, 2024</p>
              
              <p><strong>Infringing Material:</strong></p>
              <p><strong>URL:</strong> {{ newRequest.url }}</p>
              <p><strong>Description:</strong> Unauthorized use of copyrighted photograph in meme</p>
              
              <p>I have a good faith belief that the use of the copyrighted material described above is not authorized by the copyright owner, its agent, or the law...</p>
              
              <p class="letter-more">[Ver documento completo]</p>
            </div>
          </div>

          <div class="letter-actions">
            <button class="btn-secondary" @click="editLetter">
              ✏️ Editar
            </button>
            <button class="btn-secondary" @click="previewLetter">
              👁️ Preview
            </button>
            <button class="btn-secondary" @click="saveTemplate">
              💾 Guardar template
            </button>
          </div>
        </div>

        <div class="wizard-actions">
          <button class="btn-secondary" @click="previousStep">← Anterior</button>
          <button class="btn-primary" @click="nextStep" :disabled="!letterGenerated">
            Siguiente →
          </button>
        </div>
      </div>

      <!-- Step 5: Send -->
      <div v-if="currentStep === 4" class="wizard-content">
        <h3>Paso 5: Envío</h3>
        <div class="send-options">
          <label class="send-option">
            <input type="radio" v-model="newRequest.sendMethod" value="direct" />
            <div class="option-content">
              <strong>Enviar directamente a plataforma</strong>
              <small>Si la plataforma tiene integración automática</small>
            </div>
          </label>
          <label class="send-option">
            <input type="radio" v-model="newRequest.sendMethod" value="email" />
            <div class="option-content">
              <strong>Enviar por email</strong>
              <small>Al DMCA agent del sitio</small>
            </div>
          </label>
          <label class="send-option">
            <input type="radio" v-model="newRequest.sendMethod" value="download" />
            <div class="option-content">
              <strong>Descargar PDF</strong>
              <small>Para envío manual</small>
            </div>
          </label>
        </div>

        <div class="wizard-actions">
          <button class="btn-secondary" @click="previousStep">← Anterior</button>
          <button class="btn-success" @click="sendRequest" :disabled="!newRequest.sendMethod">
            📧 ENVIAR SOLICITUD
          </button>
          <button class="btn-secondary" @click="downloadPDF">
            📄 Descargar PDF
          </button>
          <button class="btn-secondary" @click="cancelWizard">
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Active Requests Table -->
    <div v-if="!showWizard" class="requests-panel">
      <div class="panel-header">
        <h2>SOLICITUDES ACTIVAS ({{ activeRequests.length }})</h2>
        <div class="panel-actions">
          <select v-model="requestsFilter" class="filter-select">
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="sent">Enviadas</option>
            <option value="rejected">Rechazadas</option>
            <option value="completed">Completadas</option>
          </select>
        </div>
      </div>

      <div class="requests-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Sitio</th>
              <th>Contenido</th>
              <th>Estado</th>
              <th>Tiempo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="request in filteredRequests" 
              :key="request.id"
              class="request-row"
            >
              <td>{{ request.id }}</td>
              <td>{{ request.site }}</td>
              <td>{{ request.contentType }}</td>
              <td>
                <span class="status-badge" :class="request.status">
                  {{ getStatusIcon(request.status) }} {{ getStatusLabel(request.status) }}
                </span>
              </td>
              <td>{{ request.timeElapsed }}</td>
              <td>
                <div class="row-actions">
                  <button 
                    v-if="request.status === 'pending'" 
                    class="btn-mini"
                    @click="followUp(request)"
                  >
                    Seguimiento
                  </button>
                  <button 
                    v-if="request.status === 'sent'" 
                    class="btn-mini"
                    @click="checkStatus(request)"
                  >
                    Ver status
                  </button>
                  <button 
                    v-if="request.status === 'rejected'" 
                    class="btn-mini btn-warning"
                    @click="appeal(request)"
                  >
                    Apelar
                  </button>
                  <button 
                    v-if="request.status === 'completed'" 
                    class="btn-mini btn-success"
                    @click="closeRequest(request)"
                  >
                    Cerrar
                  </button>
                  <button class="btn-mini" @click="viewDetails(request)">
                    Ver detalles
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <button class="btn-link" @click="showAllRequests">
          Ver todas ({{ activeRequests.length }})
        </button>
        <button class="btn-secondary" @click="bulkActions">
          Acciones masivas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Wizard state
const showWizard = ref(false)
const currentStep = ref(0)
const urlValidated = ref(false)
const letterGenerated = ref(false)

const wizardSteps = [
  'Contenido infractor',
  'Asset original',
  'Tipo de infracción',
  'Generar carta',
  'Envío'
]

const newRequest = ref({
  url: '',
  domain: '',
  contentType: '',
  detectedDate: '',
  reach: 0,
  originalAssetId: '',
  infractionType: '',
  sendMethod: ''
})

// Official assets (mock)
const officialAssets = ref([
  { id: 'asset-001', name: 'Foto oficial perfil v3.2', thumbnail: '' },
  { id: 'asset-002', name: 'Foto evento corporativo', thumbnail: '' },
  { id: 'asset-003', name: 'Foto keynote 2023', thumbnail: '' }
])

// Active requests (mock)
const activeRequests = ref([
  { id: 1, site: 'facebook.com', contentType: 'Foto', status: 'pending', timeElapsed: '48h' },
  { id: 2, site: 'memespoliticos.mx', contentType: 'Foto', status: 'sent', timeElapsed: '12h' },
  { id: 3, site: 'twitter.com', contentType: 'Video', status: 'rejected', timeElapsed: '96h' },
  { id: 4, site: 'instagram.com', contentType: 'Foto', status: 'completed', timeElapsed: '-' },
  { id: 5, site: 'youtube.com', contentType: 'Video', status: 'sent', timeElapsed: '24h' },
  { id: 6, site: 'reddit.com', contentType: 'Imagen', status: 'pending', timeElapsed: '36h' }
])

const requestsFilter = ref('all')

// Computed
const filteredRequests = computed(() => {
  if (requestsFilter.value === 'all') return activeRequests.value
  return activeRequests.value.filter(r => r.status === requestsFilter.value)
})

// Methods
const startNewRequest = () => {
  showWizard.value = true
  currentStep.value = 0
  urlValidated.value = false
  letterGenerated.value = false
  newRequest.value = {
    url: '',
    domain: '',
    contentType: '',
    detectedDate: '',
    reach: 0,
    originalAssetId: '',
    infractionType: '',
    sendMethod: ''
  }
}

const validateUrl = () => {
  if (newRequest.value.url) {
    urlValidated.value = true
    newRequest.value.domain = 'memespoliticos.mx'
    newRequest.value.contentType = 'Imagen'
    newRequest.value.detectedDate = '2024-02-05'
    newRequest.value.reach = 125000
  }
}

const nextStep = () => {
  if (currentStep.value < wizardSteps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const cancelWizard = () => {
  showWizard.value = false
}

const generateLetter = () => {
  letterGenerated.value = true
}

const writeManually = () => {
  alert('Abriendo editor manual...')
}

const editLetter = () => {
  alert('Editando carta...')
}

const previewLetter = () => {
  alert('Mostrando preview completo...')
}

const saveTemplate = () => {
  alert('Guardando como template...')
}

const sendRequest = () => {
  alert('Enviando solicitud DMCA...')
  showWizard.value = false
  // Add to active requests
  activeRequests.value.unshift({
    id: activeRequests.value.length + 1,
    site: newRequest.value.domain,
    contentType: newRequest.value.contentType,
    status: 'sent',
    timeElapsed: '0h'
  })
}

const downloadPDF = () => {
  alert('Descargando PDF...')
}

const followUp = (request: any) => {
  alert(`Enviando seguimiento a ${request.site}...`)
}

const checkStatus = (request: any) => {
  alert(`Verificando status en ${request.site}...`)
}

const appeal = (request: any) => {
  alert(`Iniciando apelación para ${request.site}...`)
}

const closeRequest = (request: any) => {
  alert(`Cerrando solicitud #${request.id}...`)
}

const viewDetails = (request: any) => {
  alert(`Mostrando detalles de solicitud #${request.id}...`)
}

const showAllRequests = () => {
  alert('Mostrando todas las solicitudes...')
}

const bulkActions = () => {
  alert('Abriendo acciones masivas...')
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    pending: '🟡',
    sent: '🟢',
    rejected: '🔴',
    completed: '✅'
  }
  return icons[status] || '⏳'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    sent: 'Enviado',
    rejected: 'Rechazado',
    completed: 'Removido'
  }
  return labels[status] || status
}
</script>

<style scoped>
.takedown-station {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.station-header {
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

/* Wizard */
.wizard-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.wizard-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
}

.wizard-steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 40px;
  right: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

.wizard-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #9AA0A6;
  transition: all 0.3s;
}

.wizard-step.active .step-number {
  background: #722ED1;
  border-color: #722ED1;
  color: #fff;
}

.wizard-step.completed .step-number {
  background: #52C41A;
  border-color: #52C41A;
  color: #fff;
}

.step-label {
  font-size: 0.85rem;
  color: #9AA0A6;
  text-align: center;
}

.wizard-step.active .step-label {
  color: #E8EAED;
  font-weight: 600;
}

/* Wizard Content */
.wizard-content {
  margin-bottom: 2rem;
}

.wizard-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 1.5rem 0;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #E8EAED;
  margin-bottom: 0.75rem;
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

.validation-success {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid rgba(82, 196, 26, 0.3);
  border-radius: 6px;
  color: #52C41A;
  font-size: 0.9rem;
}

/* Content Preview */
.content-preview {
  margin-top: 2rem;
}

.content-preview h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 1rem 0;
}

.preview-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.preview-thumbnail img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
}

.preview-info p {
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

/* Assets Selection */
.assets-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.asset-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.asset-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #4A90E2;
}

.asset-option.selected {
  border-color: #722ED1;
  background: rgba(114, 46, 209, 0.1);
}

.asset-preview-small img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

.asset-name {
  font-size: 0.85rem;
  color: #E8EAED;
  text-align: center;
}

/* Infringement Types */
.infringement-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.type-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.type-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #4A90E2;
}

.type-option input:checked ~ .type-content {
  color: #722ED1;
}

.type-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.type-content strong {
  font-size: 1rem;
  color: #E8EAED;
}

.type-content small {
  font-size: 0.85rem;
  color: #9AA0A6;
}

/* Letter Preview */
.generation-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.letter-preview {
  margin-top: 2rem;
}

.letter-preview h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8EAED;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.letter-content {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.letter-header p {
  font-size: 0.9rem;
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.letter-body {
  margin-top: 1.5rem;
}

.letter-body p {
  font-size: 0.9rem;
  color: #E8EAED;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.letter-more {
  color: #4A90E2;
  cursor: pointer;
}

.letter-more:hover {
  text-decoration: underline;
}

.letter-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

/* Send Options */
.send-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.send-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #4A90E2;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option-content strong {
  font-size: 1rem;
  color: #E8EAED;
}

.option-content small {
  font-size: 0.85rem;
  color: #9AA0A6;
}

/* Wizard Actions */
.wizard-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Requests Panel */
.requests-panel {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 2rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #E8EAED;
  font-size: 0.85rem;
}

/* Requests Table */
.requests-table {
  overflow-x: auto;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: rgba(0, 0, 0, 0.2);
}

th {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

td {
  padding: 1rem;
  font-size: 0.9rem;
  color: #E8EAED;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.request-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.pending {
  background: rgba(250, 173, 20, 0.2);
  color: #FAAD14;
}

.status-badge.sent {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.status-badge.rejected {
  background: rgba(211, 47, 47, 0.2);
  color: #D32F2F;
}

.status-badge.completed {
  background: rgba(82, 196, 26, 0.2);
  color: #52C41A;
}

.row-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-success, .btn-warning, .btn-mini, .btn-link {
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

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success {
  background: #52C41A;
  color: #fff;
}

.btn-success:hover {
  background: #73D13D;
}

.btn-warning {
  background: #FA8C16;
  color: #fff;
}

.btn-warning:hover {
  background: #FFA940;
}

.btn-mini {
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-mini:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-mini.btn-warning {
  background: rgba(250, 140, 22, 0.2);
  border-color: rgba(250, 140, 22, 0.3);
  color: #FA8C16;
}

.btn-mini.btn-success {
  background: rgba(82, 196, 26, 0.2);
  border-color: rgba(82, 196, 26, 0.3);
  color: #52C41A;
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
