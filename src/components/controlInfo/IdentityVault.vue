<template>
  <div class="identity-vault">
    <!-- Header -->
    <div class="vault-header">
      <div class="header-left">
        <h1>🔐 Identity Vault - Asset Manager</h1>
        <p class="subtitle">Gestión centralizada de tus assets oficiales y control de uso</p>
      </div>
      <div class="header-right">
        <button class="btn-primary" @click="showUploadModal = true">
          <span>+</span> Nuevo Asset
        </button>
      </div>
    </div>

    <!-- Assets Grid -->
    <div class="assets-grid">
      <div 
        v-for="asset in assets" 
        :key="asset.id"
        class="asset-card"
      >
        <!-- Asset Preview -->
        <div class="asset-preview">
          <img v-if="asset.type === 'image'" :src="asset.thumbnail" alt="Preview" />
          <div v-else class="asset-icon">
            {{ getAssetIcon(asset.type) }}
          </div>
          <div class="asset-overlay">
            <button class="overlay-btn" @click="viewAsset(asset)">
              👁️ Ver
            </button>
            <button class="overlay-btn" @click="downloadAsset(asset)">
              ⬇️ Descargar
            </button>
          </div>
        </div>

        <!-- Asset Info -->
        <div class="asset-info">
          <h3 class="asset-title">{{ asset.name }}</h3>
          <div class="asset-meta">
            <span class="meta-item">
              <strong>Versión:</strong> {{ asset.version }}
            </span>
            <span class="meta-item">
              <strong>Actualizado:</strong> {{ asset.lastUpdated }}
            </span>
          </div>
          <div class="asset-stats">
            <div class="stat">
              <span class="stat-value">{{ asset.authorizedUses }}</span>
              <span class="stat-label">Usos autorizados</span>
            </div>
            <div class="stat">
              <span class="stat-value unauthorized">{{ asset.unauthorizedUses }}</span>
              <span class="stat-label">No autorizados</span>
            </div>
          </div>
          <div class="asset-hash">
            <small>Hash: {{ asset.hash }}</small>
          </div>
        </div>

        <!-- Asset Actions -->
        <div class="asset-actions">
          <button class="btn-action" @click="editMetadata(asset)">
            ✏️ Editar metadata
          </button>
          <button class="btn-action" @click="newVersion(asset)">
            🔄 Nueva versión
          </button>
          <button class="btn-action" @click="viewUsage(asset)">
            👁️ Ver usos
          </button>
          <button class="btn-action" @click="showStats(asset)">
            📊 Stats
          </button>
        </div>

        <!-- Version History -->
        <div class="version-history">
          <div class="versions-header">
            <span>VERSIONES ANTERIORES:</span>
            <button class="btn-link-small" @click="showAllVersions(asset)">
              Ver todas ({{ asset.totalVersions }})
            </button>
          </div>
          <div class="versions-thumbnails">
            <div 
              v-for="version in asset.previousVersions.slice(0, 4)" 
              :key="version.id"
              class="version-thumb"
              :title="`v${version.number}`"
            >
              <img v-if="asset.type === 'image'" :src="version.thumbnail" alt="Version" />
              <span class="version-label">v{{ version.number }}</span>
            </div>
          </div>
        </div>

        <!-- Usage Policy -->
        <div class="usage-policy">
          <div class="policy-header">
            <span>POLÍTICA DE USO:</span>
            <button class="btn-link-small" @click="editPolicy(asset)">
              ⚙️ Configurar
            </button>
          </div>
          <div class="policy-items">
            <div class="policy-item" :class="asset.policy.media ? 'allowed' : 'denied'">
              <span class="policy-icon">{{ asset.policy.media ? '✅' : '❌' }}</span>
              <span>Medios {{ asset.policy.media ? '(con atribución)' : '' }}</span>
            </div>
            <div class="policy-item" :class="asset.policy.commercial ? 'allowed' : 'denied'">
              <span class="policy-icon">{{ asset.policy.commercial ? '✅' : '❌' }}</span>
              <span>Comercial {{ asset.policy.commercial ? '' : '(requiere aprobación)' }}</span>
            </div>
            <div class="policy-item" :class="asset.policy.modification ? 'allowed' : 'denied'">
              <span class="policy-icon">{{ asset.policy.modification ? '✅' : '❌' }}</span>
              <span>Modificación {{ asset.policy.modification ? '' : '(prohibido)' }}</span>
            </div>
          </div>
          <button class="btn-link-small" @click="generateTerms(asset)">
            📄 Generar términos
          </button>
        </div>

        <!-- Pending Requests -->
        <div v-if="asset.pendingRequests > 0" class="pending-requests">
          <div class="requests-header">
            <span class="requests-badge">{{ asset.pendingRequests }}</span>
            <span>SOLICITUDES PENDIENTES</span>
          </div>
          <div class="request-item" v-for="request in asset.requests.slice(0, 2)" :key="request.id">
            <p class="request-from">{{ request.from }}</p>
            <p class="request-purpose">{{ request.purpose }}</p>
            <div class="request-actions">
              <button class="btn-mini btn-success" @click="approveRequest(request)">
                ✅ Aprobar
              </button>
              <button class="btn-mini btn-danger" @click="rejectRequest(request)">
                ❌ Rechazar
              </button>
              <button class="btn-mini" @click="negotiateRequest(request)">
                💬 Negociar
              </button>
            </div>
          </div>
          <button v-if="asset.pendingRequests > 2" class="btn-link-small" @click="viewAllRequests(asset)">
            Ver todas ({{ asset.pendingRequests }})
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay" @click="showUploadModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>📦 Subir Nuevo Asset</h2>
          <button class="modal-close" @click="showUploadModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="upload-zone" 
               :class="{ 'drag-over': isDragging }"
               @drop.prevent="handleDrop"
               @dragover.prevent="isDragging = true"
               @dragleave.prevent="isDragging = false"
               @click="triggerFileInput">
            <input 
              ref="fileInput"
              type="file"
              accept="image/*,.pdf,.doc,.docx,.mp4,.mp3"
              @change="handleFileSelect"
              style="display: none"
            />
            <div class="upload-placeholder">
              <div class="upload-icon">📤</div>
              <p>Arrastra archivo o click para seleccionar</p>
              <p class="upload-formats">Tipos soportados: JPG, PNG, PDF, DOC, MP4, MP3</p>
            </div>
          </div>
          <div class="upload-actions">
            <button class="btn-primary" @click="uploadAsset" :disabled="!selectedFile">
              📦 Upload
            </button>
            <button class="btn-secondary" @click="showAdvancedConfig = !showAdvancedConfig">
              ⚙️ Configuración avanzada
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const showUploadModal = ref(false)
const isDragging = ref(false)
const selectedFile = ref<File | null>(null)
const showAdvancedConfig = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Mock Assets Data
const assets = ref([
  {
    id: 'asset-001',
    name: 'Foto Oficial de Perfil',
    type: 'image',
    version: '3.2',
    lastUpdated: '2024-01-15',
    thumbnail: '',
    authorizedUses: 47,
    unauthorizedUses: 8,
    hash: 'a8f3d9c2e1b4...',
    totalVersions: 8,
    previousVersions: [
      { id: 'v31', number: '3.1', thumbnail: '' },
      { id: 'v30', number: '3.0', thumbnail: '' },
      { id: 'v25', number: '2.5', thumbnail: '' },
      { id: 'v20', number: '2.0', thumbnail: '' }
    ],
    policy: {
      media: true,
      commercial: false,
      modification: false
    },
    pendingRequests: 3,
    requests: [
      {
        id: 'req-001',
        from: 'Revista Expansión',
        purpose: 'Portada Febrero',
        date: '2024-02-05'
      },
      {
        id: 'req-002',
        from: 'Universidad ITAM',
        purpose: 'Evento keynote',
        date: '2024-02-04'
      }
    ]
  },
  {
    id: 'asset-002',
    name: 'Bio Oficial',
    type: 'document',
    version: '2.1',
    lastUpdated: '2024-01-10',
    thumbnail: '',
    authorizedUses: 89,
    unauthorizedUses: 2,
    hash: 'b9g4e0d3f2c5...',
    totalVersions: 5,
    previousVersions: [
      { id: 'v20', number: '2.0', thumbnail: '' },
      { id: 'v19', number: '1.9', thumbnail: '' }
    ],
    policy: {
      media: true,
      commercial: true,
      modification: false
    },
    pendingRequests: 1,
    requests: [
      {
        id: 'req-003',
        from: 'Conferencia Tech 2024',
        purpose: 'Material promocional',
        date: '2024-02-06'
      }
    ]
  },
  {
    id: 'asset-003',
    name: 'Video Keynote 2023',
    type: 'video',
    version: '1.0',
    lastUpdated: '2023-11-20',
    thumbnail: '/api/placeholder/300/200',
    authorizedUses: 23,
    unauthorizedUses: 5,
    hash: 'c0h5f1e4g3d6...',
    totalVersions: 1,
    previousVersions: [],
    policy: {
      media: true,
      commercial: false,
      modification: false
    },
    pendingRequests: 0,
    requests: []
  }
])

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    selectedFile.value = file
  }
}

const uploadAsset = () => {
  if (selectedFile.value) {
    alert(`Subiendo ${selectedFile.value.name}...`)
    showUploadModal.value = false
    selectedFile.value = null
  }
}

const viewAsset = (asset: any) => {
  alert(`Abriendo ${asset.name}...`)
}

const downloadAsset = (asset: any) => {
  alert(`Descargando ${asset.name} v${asset.version}...`)
}

const editMetadata = (asset: any) => {
  alert(`Editando metadata de ${asset.name}...`)
}

const newVersion = (asset: any) => {
  alert(`Creando nueva versión de ${asset.name}...`)
}

const viewUsage = (asset: any) => {
  alert(`Mostrando ${asset.authorizedUses + asset.unauthorizedUses} usos de ${asset.name}...`)
}

const showStats = (asset: any) => {
  alert(`Mostrando estadísticas de ${asset.name}...`)
}

const showAllVersions = (asset: any) => {
  alert(`Mostrando ${asset.totalVersions} versiones de ${asset.name}...`)
}

const editPolicy = (asset: any) => {
  alert(`Editando política de uso de ${asset.name}...`)
}

const generateTerms = (asset: any) => {
  alert(`Generando términos de uso para ${asset.name}...`)
}

const approveRequest = (request: any) => {
  alert(`Aprobando solicitud de ${request.from}...`)
}

const rejectRequest = (request: any) => {
  alert(`Rechazando solicitud de ${request.from}...`)
}

const negotiateRequest = (request: any) => {
  alert(`Iniciando negociación con ${request.from}...`)
}

const viewAllRequests = (asset: any) => {
  alert(`Mostrando ${asset.pendingRequests} solicitudes pendientes...`)
}

const getAssetIcon = (type: string) => {
  const icons: Record<string, string> = {
    image: '🖼️',
    document: '📄',
    video: '🎥',
    audio: '🎵'
  }
  return icons[type] || '📦'
}
</script>

<style scoped>
.identity-vault {
  padding: 2rem;
  background: #0B0E11;
  min-height: 100vh;
}

/* Header */
.vault-header {
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

/* Assets Grid */
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.asset-card {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.asset-card:hover {
  border-color: rgba(114, 46, 209, 0.3);
  box-shadow: 0 4px 12px rgba(114, 46, 209, 0.2);
}

/* Asset Preview */
.asset-preview {
  position: relative;
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.asset-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asset-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 4rem;
}

.asset-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.asset-preview:hover .asset-overlay {
  opacity: 1;
}

.overlay-btn {
  padding: 0.75rem 1.5rem;
  background: #722ED1;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.overlay-btn:hover {
  background: #8B4AD1;
  transform: translateY(-2px);
}

/* Asset Info */
.asset-info {
  padding: 1.5rem;
}

.asset-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 0.75rem 0;
}

.asset-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #9AA0A6;
}

.meta-item strong {
  color: #E8EAED;
}

.asset-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #52C41A;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.25rem;
}

.stat-value.unauthorized {
  color: #D32F2F;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #9AA0A6;
}

.asset-hash {
  font-size: 0.75rem;
  color: #9AA0A6;
  font-family: 'Courier New', monospace;
}

/* Asset Actions */
.asset-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
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
  border-color: #4A90E2;
}

/* Version History */
.version-history {
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.versions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.versions-thumbnails {
  display: flex;
  gap: 0.5rem;
}

.version-thumb {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.version-thumb:hover {
  border-color: #4A90E2;
  transform: scale(1.05);
}

.version-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.version-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
}

/* Usage Policy */
.usage-policy {
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.policy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.policy-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.policy-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #E8EAED;
}

.policy-icon {
  font-size: 1rem;
}

/* Pending Requests */
.pending-requests {
  padding: 1rem 1.5rem 1.5rem;
  background: rgba(74, 144, 226, 0.05);
  border-top: 1px solid rgba(74, 144, 226, 0.2);
}

.requests-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #4A90E2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.requests-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #4A90E2;
  border-radius: 50%;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

.request-item {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.request-from {
  font-size: 0.9rem;
  font-weight: 600;
  color: #E8EAED;
  margin: 0 0 0.25rem 0;
}

.request-purpose {
  font-size: 0.8rem;
  color: #9AA0A6;
  margin: 0 0 0.75rem 0;
}

.request-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-mini {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #E8EAED;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-mini:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-mini.btn-success {
  background: rgba(82, 196, 26, 0.2);
  border-color: rgba(82, 196, 26, 0.3);
  color: #52C41A;
}

.btn-mini.btn-success:hover {
  background: rgba(82, 196, 26, 0.3);
}

.btn-mini.btn-danger {
  background: rgba(211, 47, 47, 0.2);
  border-color: rgba(211, 47, 47, 0.3);
  color: #D32F2F;
}

.btn-mini.btn-danger:hover {
  background: rgba(211, 47, 47, 0.3);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  color: #9AA0A6;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #E8EAED;
}

.modal-body {
  padding: 1.5rem;
}

.upload-zone {
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1.5rem;
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
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-placeholder p {
  color: #E8EAED;
  margin: 0 0 0.5rem 0;
}

.upload-formats {
  font-size: 0.8rem;
  color: #9AA0A6;
}

.upload-actions {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
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

.btn-link-small {
  background: transparent;
  border: none;
  color: #4A90E2;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
}

.btn-link-small:hover {
  color: #5BA3F5;
  text-decoration: underline;
}
</style>
