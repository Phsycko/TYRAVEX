<template>
  <div class="blindaje-view">
    <nav class="sub-nav">
      <router-link to="/blindaje" exact-active-class="active">DASHBOARD</router-link>
      <router-link to="/blindaje/amenazas" active-class="active">AMENAZAS RED</router-link>
      <router-link to="/blindaje/riesgo-geografico" active-class="active">RIESGO GEOGRÁFICO</router-link>
      <router-link to="/blindaje/alertas" active-class="active">ALERTAS</router-link>
      <router-link to="/blindaje/informes" active-class="active">INFORMES</router-link>
      <router-link to="/blindaje/espacios" active-class="active">ESPACIOS</router-link>
    </nav>

    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">MÓDULO BLINDAJE</div>
          <h1 class="section-title">GESTIÓN DE ESPACIOS</h1>
          <p class="section-subtitle">Visualización y gestión de espacios físicos, planos interactivos y protocolos de emergencia</p>
        </div>
        <div class="header-actions">
          <button v-if="!emergencyActive" class="btn-emergency" @click="showEmergencySelector = true">
            <span class="emergency-icon">&#9888;</span> ACTIVAR EMERGENCIA
          </button>
          <button v-else class="btn-emergency btn-emergency-active" @click="deactivateEmergency">
            <span class="emergency-icon pulse-icon">&#9888;</span> EMERGENCIA ACTIVA — DESACTIVAR
          </button>
        </div>
      </div>
    </header>

    <!-- KPIs -->
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">ESPACIOS REGISTRADOS</div>
        <div class="kpi-value" style="color: #4A90E2;">{{ stats.total }}</div>
        <div class="kpi-sub">{{ stats.criticos }} críticos / {{ stats.altos }} altos</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">SCORE PROMEDIO SEGURIDAD</div>
        <div class="kpi-value" :style="{ color: avgScoreColor }">{{ stats.avgScore }}</div>
        <div class="kpi-sub">Escala 0-100</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">CAPACIDAD TOTAL</div>
        <div class="kpi-value" style="color: #ff6b35;">{{ formatNumber(stats.totalCapacity) }}</div>
        <div class="kpi-sub">Personas en todos los espacios</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">RECURSOS DESPLEGADOS</div>
        <div class="kpi-value" style="color: #00ffaa;">{{ stats.totalRecursos }}</div>
        <div class="kpi-sub">{{ stats.protocolosActivos }} protocolos · {{ stats.camarasFalla }} cámaras en falla</div>
      </div>
    </div>

    <!-- Main Layout: Space List + Floor Plan -->
    <div class="grid-main">
      <!-- Space List -->
      <div class="spaces-panel">
        <div class="card-header">
          <span class="card-title">ESPACIOS</span>
          <span class="badge badge-info">{{ espacios.length }}</span>
        </div>
        <div class="spaces-list">
          <SpaceCard
            v-for="esp in espacios"
            :key="esp.id"
            :espacio="esp"
            :class="{ 'selected-space': selectedEspacio?.id === esp.id }"
            @select="selectEspacio"
          />
        </div>
      </div>

      <!-- Floor Plan Viewer -->
      <div class="viewer-panel">
        <div v-if="!selectedEspacio" class="empty-viewer">
          <div class="empty-icon">&#128506;</div>
          <p class="empty-text">Selecciona un espacio de la lista para ver su plano interactivo</p>
        </div>
        <template v-else>
          <div class="viewer-header">
            <div>
              <div class="viewer-space-name">{{ selectedEspacio.nombre }}</div>
              <div class="viewer-space-meta mono-text">{{ selectedEspacio.direccion }} · {{ selectedEspacio.fecha_evento }} {{ selectedEspacio.hora_evento }}</div>
            </div>
            <span class="badge" :class="'badge-' + riskBadge(selectedEspacio.nivel_riesgo)">RIESGO {{ selectedEspacio.nivel_riesgo.toUpperCase() }}</span>
          </div>

          <FloorPlanViewer
            :floors="selectedEspacio.floors"
            :emergencyMode="emergencyActive"
          />

          <!-- Resources Table -->
          <div class="resources-section mt-16">
            <div class="card-header">
              <span class="card-title">RECURSOS DE SEGURIDAD</span>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>RECURSO</th>
                  <th>CANTIDAD</th>
                  <th>DISPONIBLES</th>
                  <th>UBICACIÓN</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in selectedEspacio.recursos" :key="r.tipo">
                  <td>{{ r.tipo }}</td>
                  <td class="mono-text">{{ r.cantidad }}</td>
                  <td class="mono-text" :style="{ color: r.disponibles / r.cantidad > 0.8 ? '#00ffaa' : r.disponibles / r.cantidad > 0.5 ? '#ffcc00' : '#ff4444' }">{{ r.disponibles }}</td>
                  <td class="text-muted">{{ r.ubicacion }}</td>
                  <td>
                    <span class="badge" :class="r.disponibles === r.cantidad ? 'badge-success' : r.disponibles > 0 ? 'badge-warning' : 'badge-danger'">
                      {{ r.disponibles === r.cantidad ? 'COMPLETO' : r.disponibles > 0 ? 'PARCIAL' : 'AGOTADO' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Active Protocols -->
          <div class="protocols-section mt-16">
            <div class="card-header">
              <span class="card-title">PROTOCOLOS ACTIVOS</span>
              <span class="badge badge-high">{{ activeProtocols.length }} ACTIVOS</span>
            </div>
            <div class="protocols-grid">
              <div v-for="prot in activeProtocols" :key="prot.id" class="protocol-card">
                <div class="protocol-header">
                  <span class="protocol-name">{{ prot.nombre }}</span>
                  <span class="badge badge-danger">P{{ prot.prioridad }}</span>
                </div>
                <p class="protocol-desc">{{ prot.descripcion }}</p>
                <div class="protocol-meta">
                  <span class="mono-text" style="color: #ff6b35;">Objetivo: {{ formatSeconds(prot.tiempo_respuesta_objetivo) }}</span>
                  <span class="mono-text" style="color: #888;">{{ prot.acciones.length }} acciones</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Emergency Type Selector Modal -->
    <Teleport to="body">
      <div v-if="showEmergencySelector" class="modal-overlay" @click.self="showEmergencySelector = false">
        <div class="modal-content">
          <div class="modal-header">
            <span class="card-title">ACTIVAR PROTOCOLO DE EMERGENCIA</span>
            <button class="btn-close" @click="showEmergencySelector = false">&#10005;</button>
          </div>
          <div class="modal-body">
            <p class="modal-warning">Selecciona el tipo de emergencia para activar el protocolo correspondiente.</p>
            <div class="emergency-types-grid">
              <button
                v-for="et in emergencyTypes"
                :key="et.tipo"
                class="emergency-type-btn"
                :style="{ borderColor: et.color + '60' }"
                @click="activateEmergency(et.tipo)"
              >
                <span class="et-icon" :style="{ color: et.color }">&#9888;</span>
                <span class="et-label">{{ et.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Emergency Overlay Panel -->
    <EmergencyOverlayComponent
      :active="emergencyActive"
      :emergencyType="emergencyType"
      :recursos="selectedEspacio?.recursos"
      @deactivate="deactivateEmergency"
    />

    <footer class="view-footer">TYRAVEX BLINDAJE // GESTIÓN DE ESPACIOS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  espacios, emergencyProtocols, getEspaciosStats, getEmergencyTypeLabel, getEmergencyColor,
  type Espacio, type EmergencyType,
} from '@/data/espaciosData'
import SpaceCard from '@/components/blindaje/SpaceCard.vue'
import FloorPlanViewer from '@/components/blindaje/FloorPlanViewer.vue'
import EmergencyOverlayComponent from '@/components/blindaje/EmergencyOverlay.vue'

const selectedEspacio = ref<Espacio | null>(null)
const emergencyActive = ref(false)
const emergencyType = ref<EmergencyType | null>(null)
const showEmergencySelector = ref(false)

const stats = computed(() => getEspaciosStats())

const avgScoreColor = computed(() => {
  const s = stats.value.avgScore
  if (s >= 75) return '#00ffaa'
  if (s >= 55) return '#ffcc00'
  if (s >= 35) return '#ff6b35'
  return '#ff4444'
})

const activeProtocols = computed(() => {
  if (!selectedEspacio.value) return []
  return emergencyProtocols.filter(p => selectedEspacio.value!.protocolos_activos.includes(p.id))
})

const emergencyTypes = computed(() => {
  const types: EmergencyType[] = ['incendio', 'evacuacion', 'amenaza_bomba', 'intruso', 'disturbio', 'sismo', 'emergencia_medica']
  return types.map(t => ({ tipo: t, label: getEmergencyTypeLabel(t), color: getEmergencyColor(t) }))
})

function selectEspacio(espacio: Espacio) {
  selectedEspacio.value = espacio
}

function activateEmergency(tipo: EmergencyType) {
  emergencyType.value = tipo
  emergencyActive.value = true
  showEmergencySelector.value = false
}

function deactivateEmergency() {
  emergencyActive.value = false
  emergencyType.value = null
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}m ${sec}s`
}

function riskBadge(risk: string): string {
  const map: Record<string, string> = { 'bajo': 'success', 'medio': 'warning', 'alto': 'high', 'crítico': 'danger' }
  return map[risk] || 'info'
}
</script>

<style scoped>
.blindaje-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.sub-nav { display: flex; gap: 0; background: rgba(20, 22, 28, 0.7); border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; border-radius: 2px 2px 0 0; }
.sub-nav a { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-decoration: none; padding: 12px 20px; border-bottom: 2px solid transparent; transition: all 0.15s ease; }
.sub-nav a:hover { color: #e0e0e0; }
.sub-nav a.active { color: #ff6b35; border-bottom-color: #ff6b35; background: rgba(255,107,53,0.06); }

.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.header-actions { display: flex; align-items: center; gap: 8px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }

.btn-emergency { display: flex; align-items: center; gap: 6px; font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; padding: 10px 18px; background: rgba(255,68,68,0.08); border: 1px solid rgba(255,68,68,0.3); border-radius: 2px; color: #ff4444; cursor: pointer; transition: all 0.15s ease; }
.btn-emergency:hover { background: rgba(255,68,68,0.18); border-color: #ff4444; }
.btn-emergency-active { background: rgba(255,68,68,0.2); border-color: #ff4444; animation: pulse-btn 2s ease-in-out infinite; }
.emergency-icon { font-size: 14px; }
.pulse-icon { animation: pulse-icon 1s ease-in-out infinite; }

.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; margin-top: 6px; }

.grid-main { display: grid; grid-template-columns: 320px 1fr; gap: 16px; min-height: 600px; }

.spaces-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; overflow-y: auto; max-height: calc(100vh - 320px); }
.spaces-list { display: flex; flex-direction: column; gap: 10px; }
.selected-space { border-color: rgba(255,107,53,0.4) !important; background: rgba(255,107,53,0.05) !important; }

.viewer-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.viewer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.viewer-space-name { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; color: #e0e0e0; }
.viewer-space-meta { font-size: 11px; color: #888; margin-top: 2px; }

.empty-viewer { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; text-align: center; }
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
.empty-text { font-size: 13px; color: #666; line-height: 1.6; }

.mt-16 { margin-top: 16px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); text-transform: uppercase; }
.data-table td { font-size: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.data-table tr:hover td { background: rgba(255,107,53,0.04); }
.text-muted { color: #888; }

.protocols-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.protocol-card { background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 14px; }
.protocol-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.protocol-name { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; }
.protocol-desc { font-size: 11px; color: #888; line-height: 1.5; margin-bottom: 8px; }
.protocol-meta { display: flex; justify-content: space-between; font-size: 10px; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-content { background: #14161c; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; width: 520px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.btn-close { background: none; border: none; color: #888; font-size: 18px; cursor: pointer; }
.btn-close:hover { color: #e0e0e0; }
.modal-body { padding: 20px; }
.modal-warning { font-size: 12px; color: #ff6b35; margin-bottom: 16px; padding: 8px 12px; border-left: 3px solid #ff6b35; background: rgba(255,107,53,0.06); border-radius: 0 2px 2px 0; }

.emergency-types-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.emergency-type-btn { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: rgba(15,17,21,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; cursor: pointer; transition: all 0.15s ease; }
.emergency-type-btn:hover { background: rgba(255,68,68,0.08); border-color: rgba(255,68,68,0.3); }
.et-icon { font-size: 20px; }
.et-label { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; }

.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 32px; }

@keyframes pulse-btn { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,68,68,0); } 50% { box-shadow: 0 0 12px 2px rgba(255,68,68,0.2); } }
@keyframes pulse-icon { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
</style>
