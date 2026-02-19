<template>
  <div class="floor-plan-viewer">
    <!-- Controls -->
    <div class="viewer-controls">
      <div class="level-tabs" v-if="totalNiveles > 1">
        <button v-for="n in nivelesArr" :key="n" class="level-tab" :class="{ active: nivelActivo === n }" @click="nivelActivo = n">
          P{{ n }}
        </button>
      </div>
      <div class="mode-tabs">
        <button class="mode-tab" :class="{ active: viewMode === 'normal' }" @click="viewMode = 'normal'">NORMAL</button>
        <button class="mode-tab" :class="{ active: viewMode === 'evacuacion' }" @click="viewMode = 'evacuacion'">EVACUACIÓN</button>
        <button class="mode-tab mode-emergency" :class="{ active: viewMode === 'emergencia' }" @click="viewMode = 'emergencia'">EMERGENCIA</button>
      </div>
      <div class="layer-toggles">
        <label class="toggle-label"><input type="checkbox" v-model="showZones" /><span>ZONAS</span></label>
        <label class="toggle-label"><input type="checkbox" v-model="showPoints" /><span>PUNTOS</span></label>
        <label class="toggle-label"><input type="checkbox" v-model="showRoutes" /><span>RUTAS</span></label>
      </div>
      <div class="zoom-controls">
        <button class="zoom-btn" @click="zoomIn">+</button>
        <button class="zoom-btn" @click="zoomOut">-</button>
        <button class="zoom-btn" @click="zoomFit">FIT</button>
      </div>
    </div>

    <!-- SVG Canvas -->
    <div class="svg-container">
      <svg
        ref="svgEl"
        :viewBox="`${vb.x} ${vb.y} ${vb.w} ${vb.h}`"
        preserveAspectRatio="xMidYMid meet"
        class="floor-svg"
        :class="{ 'emergency-active': viewMode === 'emergencia' }"
      >
        <defs>
          <pattern id="viewer-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="800" height="600" fill="#0a0e14" />
        <rect x="0" y="0" width="800" height="600" fill="url(#viewer-grid)" />

        <!-- Background image -->
        <image v-if="planoImportado" :href="planoImportado" x="0" y="0" width="800" height="600" opacity="0.35" />

        <!-- Zones -->
        <g v-if="showZones">
          <g v-for="zona in zonasNivel" :key="zona.id"
            @click="selectZone(zona)"
            @mouseenter="hoveredZone = zona.id"
            @mouseleave="hoveredZone = null"
            class="zone-group"
          >
            <rect
              :x="zona.posicion.x" :y="zona.posicion.y"
              :width="zona.posicion.ancho" :height="zona.posicion.alto"
              :fill="zonaFill(zona)" :stroke="zonaStroke(zona)"
              stroke-width="1.5" rx="2"
              :class="{
                'zone-selected': selectedZoneId === zona.id,
                'zone-hovered': hoveredZone === zona.id,
                'zone-evacuando': zona.estado === 'evacuando',
                'zone-bloqueado': zona.estado === 'bloqueado',
                'zone-alerta': zona.estado === 'alerta',
              }"
            />
            <text
              :x="zona.posicion.x + zona.posicion.ancho / 2"
              :y="zona.posicion.y + zona.posicion.alto / 2 - 4"
              text-anchor="middle" dominant-baseline="middle"
              class="zone-label" :font-size="Math.min(zona.posicion.ancho / 8, 12)"
            >{{ zona.nombre }}</text>
            <text
              :x="zona.posicion.x + zona.posicion.ancho / 2"
              :y="zona.posicion.y + zona.posicion.alto / 2 + 8"
              text-anchor="middle" dominant-baseline="middle"
              class="zone-capacity" :font-size="Math.min(zona.posicion.ancho / 10, 9)"
            >{{ zona.personal_asignado }}/{{ zona.capacidad }}</text>
          </g>
        </g>

        <!-- Evacuation Routes -->
        <g v-if="showRoutes">
          <g v-for="ruta in rutasNivel" :key="ruta.id">
            <polyline
              :points="rutaPuntos(ruta)" fill="none"
              :stroke="rutaStrokeColor(ruta)" stroke-width="2.5"
              stroke-dasharray="8,4" stroke-linecap="round" stroke-linejoin="round"
              :class="{ 'route-blocked': ruta.estado === 'bloqueada', 'route-available': ruta.estado === 'disponible' && viewMode === 'evacuacion' }"
            />
            <circle v-if="rutaEnd(ruta)"
              :cx="rutaEnd(ruta)!.x" :cy="rutaEnd(ruta)!.y"
              r="5" :fill="rutaStrokeColor(ruta)" opacity="0.8"
            />
            <text v-if="rutaStart(ruta)"
              :x="rutaStart(ruta)!.x" :y="rutaStart(ruta)!.y - 8"
              text-anchor="middle" class="route-label" font-size="9"
            >{{ ruta.nombre }}</text>
          </g>
        </g>

        <!-- Critical Points -->
        <g v-if="showPoints">
          <g v-for="pt in puntosNivel" :key="pt.id"
            @mouseenter="hoveredPoint = pt.id"
            @mouseleave="hoveredPoint = null"
          >
            <circle
              :cx="pt.posicion.x" :cy="pt.posicion.y" r="7"
              :fill="pt.operativo ? 'rgba(20,22,28,0.9)' : 'rgba(255,68,68,0.3)'"
              :stroke="pt.operativo ? 'rgba(255,255,255,0.3)' : '#ff4444'"
              stroke-width="1.5"
              :class="{ 'point-fault': !pt.operativo }"
            />
            <text
              :x="pt.posicion.x" :y="pt.posicion.y"
              text-anchor="middle" dominant-baseline="central"
              font-size="9" class="point-icon"
            >{{ ptIcon(pt.tipo) }}</text>
            <!-- Tooltip -->
            <g v-if="hoveredPoint === pt.id">
              <rect
                :x="pt.posicion.x + 10" :y="pt.posicion.y - 20"
                width="120" height="28" rx="2"
                fill="rgba(20,22,28,0.95)" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"
              />
              <text :x="pt.posicion.x + 16" :y="pt.posicion.y - 8" font-size="8" class="tooltip-text">{{ pt.nombre }}</text>
              <text :x="pt.posicion.x + 16" :y="pt.posicion.y + 2" font-size="7"
                :class="pt.operativo ? 'tooltip-ok' : 'tooltip-fault'"
              >{{ pt.operativo ? 'OPERATIVO' : 'NO OPERATIVO' }}</text>
            </g>
          </g>
        </g>

        <!-- Emergency border -->
        <rect v-if="viewMode === 'emergencia'" x="0" y="0" width="800" height="600"
          fill="none" stroke="#ff4444" stroke-width="3" class="emergency-border"
        />
      </svg>
    </div>

    <!-- Zone Detail Panel -->
    <div v-if="selectedZone" class="zone-detail-panel">
      <div class="zone-detail-header">
        <div>
          <span class="zone-detail-name">{{ selectedZone.nombre }}</span>
          <span class="badge" :class="'badge-' + estadoBadge(selectedZone.estado)" style="margin-left: 8px;">{{ selectedZone.estado.toUpperCase() }}</span>
        </div>
        <button class="btn-close-sm" @click="selectedZoneId = null">&#10005;</button>
      </div>
      <div class="zone-detail-body">
        <div class="detail-row"><span class="detail-label">TIPO</span><span class="detail-value">{{ zonaLabel(selectedZone.tipo) }}</span></div>
        <div class="detail-row"><span class="detail-label">CAPACIDAD</span><span class="detail-value mono-text">{{ selectedZone.personal_asignado }} / {{ selectedZone.capacidad }}</span></div>
        <div class="detail-row"><span class="detail-label">SALIDAS</span><span class="detail-value mono-text">{{ selectedZone.salidas_emergencia }}</span></div>
        <div v-if="selectedZone.notas" class="detail-notes">{{ selectedZone.notas }}</div>
        <div class="estado-selector">
          <span class="detail-label">CAMBIAR ESTADO</span>
          <div class="estado-btns">
            <button v-for="est in estadosZona" :key="est" class="estado-btn" :class="{ active: selectedZone.estado === est }"
              :style="{ borderColor: estadoColor(est) + '60', color: selectedZone.estado === est ? estadoColor(est) : '#888' }"
              @click="$emit('update-zona-estado', selectedZone!.id, est)"
            >{{ est.toUpperCase() }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend-bar">
      <div class="legend-section">
        <span class="legend-title">RUTAS</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #00ffaa;"></span>DISPONIBLE</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #ffcc00;"></span>PARCIAL</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #ff4444;"></span>BLOQUEADA</span>
      </div>
      <div class="legend-section">
        <span class="legend-title">ESTADOS</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #00ffaa;"></span>NORMAL</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #ffcc00;"></span>ALERTA</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #ff6b35;"></span>EVACUANDO</span>
        <span class="legend-item"><span class="legend-swatch" style="background: #ff4444;"></span>BLOQUEADO</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import {
  getZonaColor, getZonaLabel, getPuntoCriticoIcon, getRutaColor, getEstadoZonaColor,
  type Zona, type PuntoCritico, type RutaEvacuacion, type EstadoZona, type TipoPuntoCritico,
} from '@/data/espaciosData'

const props = defineProps<{
  zonas: Zona[]
  puntosCriticos: PuntoCritico[]
  rutasEvacuacion: RutaEvacuacion[]
  totalNiveles: number
  planoImportado: string | null
  emergencyMode?: boolean
}>()

defineEmits<{
  (e: 'update-zona-estado', zonaId: string, estado: EstadoZona): void
}>()

const nivelActivo = ref(1)
const viewMode = ref<'normal' | 'evacuacion' | 'emergencia'>(props.emergencyMode ? 'emergencia' : 'normal')
const showZones = ref(true)
const showPoints = ref(true)
const showRoutes = ref(true)
const selectedZoneId = ref<string | null>(null)
const hoveredZone = ref<string | null>(null)
const hoveredPoint = ref<string | null>(null)

const vb = reactive({ x: 0, y: 0, w: 800, h: 600 })
function zoomIn() { vb.w *= 0.8; vb.h *= 0.8 }
function zoomOut() { vb.w = Math.min(vb.w * 1.25, 800); vb.h = Math.min(vb.h * 1.25, 600) }
function zoomFit() { vb.x = 0; vb.y = 0; vb.w = 800; vb.h = 600 }

const nivelesArr = computed(() => Array.from({ length: props.totalNiveles || 1 }, (_, i) => i + 1))
const zonasNivel = computed(() => props.zonas.filter(z => z.nivel === nivelActivo.value))
const puntosNivel = computed(() => props.puntosCriticos.filter(p => p.nivel === nivelActivo.value))
const rutasNivel = computed(() => props.rutasEvacuacion.filter(r => r.nivel === nivelActivo.value))

const selectedZone = computed(() => {
  if (!selectedZoneId.value) return null
  return props.zonas.find(z => z.id === selectedZoneId.value) || null
})

const estadosZona: EstadoZona[] = ['normal', 'alerta', 'evacuando', 'bloqueado']

function selectZone(z: Zona) {
  selectedZoneId.value = selectedZoneId.value === z.id ? null : z.id
}

function zonaFill(z: Zona): string {
  if (z.estado === 'bloqueado') return 'rgba(255,68,68,0.4)'
  if (z.estado === 'evacuando') return 'rgba(255,107,53,0.3)'
  if (z.estado === 'alerta') return 'rgba(255,204,0,0.2)'
  return getZonaColor(z.tipo).fill
}
function zonaStroke(z: Zona): string {
  if (z.estado === 'bloqueado') return '#ff4444'
  if (z.estado === 'evacuando') return '#ff6b35'
  if (z.estado === 'alerta') return '#ffcc00'
  return getZonaColor(z.tipo).stroke
}

function rutaPuntos(r: RutaEvacuacion): string {
  return r.puntos.map(p => `${p.x},${p.y}`).join(' ')
}
function rutaStrokeColor(r: RutaEvacuacion): string {
  return getRutaColor(r.estado)
}
function rutaStart(r: RutaEvacuacion) { return r.puntos[0] }
function rutaEnd(r: RutaEvacuacion) { return r.puntos[r.puntos.length - 1] }

function ptIcon(tipo: TipoPuntoCritico): string { return getPuntoCriticoIcon(tipo) }
function zonaLabel(tipo: Zona['tipo']): string { return getZonaLabel(tipo) }
function estadoColor(estado: EstadoZona): string { return getEstadoZonaColor(estado) }
function estadoBadge(estado: EstadoZona): string {
  const map: Record<EstadoZona, string> = { 'normal': 'success', 'alerta': 'warning', 'evacuando': 'high', 'bloqueado': 'danger' }
  return map[estado]
}
</script>

<style scoped>
.floor-plan-viewer { display: flex; flex-direction: column; gap: 10px; }

.viewer-controls { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.level-tabs, .mode-tabs { display: flex; gap: 0; }
.level-tab, .mode-tab { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; padding: 6px 12px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.08); color: #888; cursor: pointer; transition: all 0.15s ease; }
.level-tab:first-child, .mode-tab:first-child { border-radius: 2px 0 0 2px; }
.level-tab:last-child, .mode-tab:last-child { border-radius: 0 2px 2px 0; }
.level-tab.active, .mode-tab.active { background: rgba(255,107,53,0.1); border-color: rgba(255,107,53,0.3); color: #ff6b35; }
.mode-emergency.active { background: rgba(255,68,68,0.12); border-color: rgba(255,68,68,0.3); color: #ff4444; }

.layer-toggles { display: flex; gap: 10px; margin-left: auto; }
.toggle-label { display: flex; align-items: center; gap: 4px; font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; letter-spacing: 0.08em; color: #888; cursor: pointer; user-select: none; }
.toggle-label input[type="checkbox"] { appearance: none; width: 12px; height: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 2px; background: rgba(15,17,21,0.5); cursor: pointer; position: relative; }
.toggle-label input[type="checkbox"]:checked { background: rgba(255,107,53,0.3); border-color: #ff6b35; }
.toggle-label input[type="checkbox"]:checked::after { content: ''; position: absolute; top: 1px; left: 3px; width: 4px; height: 7px; border: solid #ff6b35; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }

.zoom-controls { display: flex; gap: 2px; }
.zoom-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #888; cursor: pointer; }
.zoom-btn:hover { color: #e0e0e0; background: rgba(255,255,255,0.08); }

.svg-container { width: 100%; aspect-ratio: 4/3; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; background: #0a0e14; }
.floor-svg { width: 100%; height: 100%; display: block; }
.floor-svg.emergency-active { filter: brightness(0.8) saturate(0.6); }

.zone-group { cursor: pointer; }
.zone-hovered { stroke-width: 2.5 !important; filter: brightness(1.2); }
.zone-selected { stroke-dasharray: 6,3; stroke-width: 2.5; }
.zone-evacuando { animation: pulse-orange 1s ease-in-out infinite; }
.zone-bloqueado { animation: none; }
.zone-alerta { animation: pulse-yellow 2s ease-in-out infinite; }
.zone-label { fill: #e0e0e0; font-family: 'Montserrat', sans-serif; font-weight: 600; pointer-events: none; }
.zone-capacity { fill: #888; font-family: 'Roboto Mono', monospace; pointer-events: none; }

.route-blocked { opacity: 0.4; }
.route-available { animation: dash-flow 1s linear infinite; }
.route-label { fill: #a0a0a0; font-family: 'Roboto Mono', monospace; font-weight: 600; pointer-events: none; }

.point-fault { animation: pulse-fault 1.5s ease-in-out infinite; }
.point-icon { pointer-events: none; }
.tooltip-text { fill: #e0e0e0; font-family: 'Montserrat', sans-serif; font-weight: 600; }
.tooltip-ok { fill: #00ffaa; font-family: 'Roboto Mono', monospace; }
.tooltip-fault { fill: #ff4444; font-family: 'Roboto Mono', monospace; font-weight: 700; }

.emergency-border { animation: pulse-emergency 1s ease-in-out infinite; }

.zone-detail-panel { background: rgba(20,22,28,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 14px; }
.zone-detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.zone-detail-name { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; color: #e0e0e0; }
.btn-close-sm { background: none; border: none; color: #888; font-size: 14px; cursor: pointer; padding: 2px 6px; }
.btn-close-sm:hover { color: #e0e0e0; }
.zone-detail-body { display: flex; flex-direction: column; gap: 6px; }
.detail-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
.detail-label { font-family: 'Roboto Mono', monospace; font-size: 9px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
.detail-value { font-family: 'Montserrat', sans-serif; font-size: 12px; color: #e0e0e0; font-weight: 500; }
.detail-notes { font-size: 11px; color: #666; line-height: 1.5; padding: 6px 8px; background: rgba(15,17,21,0.5); border-left: 2px solid rgba(255,107,53,0.3); border-radius: 0 2px 2px 0; margin-top: 4px; }

.estado-selector { margin-top: 8px; }
.estado-btns { display: flex; gap: 4px; margin-top: 4px; }
.estado-btn { font-family: 'Roboto Mono', monospace; font-size: 8px; font-weight: 600; letter-spacing: 0.05em; padding: 4px 8px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.estado-btn.active { background: rgba(255,255,255,0.06); font-weight: 700; }
.estado-btn:hover { background: rgba(255,255,255,0.08); }

.legend-bar { display: flex; gap: 24px; flex-wrap: wrap; padding: 8px 0; }
.legend-section { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.legend-title { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 700; color: #666; letter-spacing: 0.1em; margin-right: 4px; }
.legend-item { display: flex; align-items: center; gap: 4px; font-family: 'Roboto Mono', monospace; font-size: 8px; color: #888; letter-spacing: 0.05em; }
.legend-swatch { width: 8px; height: 8px; border-radius: 2px; }

.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0,255,170,0.15); color: #00ffaa; }
.badge-warning { background: rgba(255,204,0,0.15); color: #ffcc00; }
.badge-danger { background: rgba(255,68,68,0.15); color: #ff4444; }
.badge-high { background: rgba(255,107,53,0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }

@keyframes pulse-fault { 0%, 100% { fill: rgba(255,68,68,0.3); } 50% { fill: rgba(255,68,68,0.6); } }
@keyframes pulse-emergency { 0%, 100% { stroke-opacity: 1; stroke-width: 3; } 50% { stroke-opacity: 0.3; stroke-width: 5; } }
@keyframes pulse-orange { 0%, 100% { fill-opacity: 1; } 50% { fill-opacity: 0.4; } }
@keyframes pulse-yellow { 0%, 100% { fill-opacity: 1; } 50% { fill-opacity: 0.5; } }
@keyframes dash-flow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -12; } }
</style>
