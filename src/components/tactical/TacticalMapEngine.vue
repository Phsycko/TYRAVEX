<template>
  <div class="tactical-map-engine">
    <!-- Map Container -->
    <div id="tactical-map" class="map-container"></div>

    <!-- Layer Controls Panel -->
    <div class="layer-controls">
      <div class="controls-header">
        <h3>🗺️ CAPAS</h3>
        <button @click="toggleControls" class="toggle-btn">
          {{ controlsExpanded ? '◀' : '▶' }}
        </button>
      </div>

      <div v-if="controlsExpanded" class="controls-content">
        <!-- Base Layer Selection -->
        <div class="control-section">
          <h4>Base:</h4>
          <label v-for="layer in baseLayers" :key="layer.id" class="layer-option">
            <input
              type="radio"
              :value="layer.id"
              v-model="activeBaseLayer"
              @change="changeBaseLayer"
            />
            <span>{{ layer.name }}</span>
          </label>
        </div>

        <!-- Overlays -->
        <div class="control-section">
          <h4>Overlays:</h4>
          <label v-for="overlay in overlays" :key="overlay.id" class="layer-option">
            <input
              type="checkbox"
              v-model="overlay.enabled"
              @change="toggleOverlay(overlay)"
            />
            <span>{{ overlay.name }}</span>
          </label>
        </div>

        <!-- Analysis Layers -->
        <div class="control-section">
          <h4>Análisis:</h4>
          <label v-for="analysis in analysisLayers" :key="analysis.id" class="layer-option">
            <input
              type="checkbox"
              v-model="analysis.enabled"
              @change="toggleAnalysis(analysis)"
            />
            <span>{{ analysis.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Map Tools -->
    <div class="map-tools">
      <button @click="activateTool('measure')" :class="{ active: activeTool === 'measure' }" title="Medir distancia">
        📏
      </button>
      <button @click="activateTool('area')" :class="{ active: activeTool === 'area' }" title="Medir área">
        📐
      </button>
      <button @click="activateTool('marker')" :class="{ active: activeTool === 'marker' }" title="Marcar punto">
        📍
      </button>
      <button @click="activateTool('draw')" :class="{ active: activeTool === 'draw' }" title="Dibujar">
        ✏️
      </button>
      <button @click="centerMap" title="Centrar mapa">
        🎯
      </button>
    </div>

    <!-- Legend -->
    <div class="map-legend">
      <h4>LEYENDA</h4>
      <div class="legend-item">
        <span class="legend-marker friendly">🔵</span>
        <span>Unidades propias ({{ friendlyUnits.length }})</span>
      </div>
      <div class="legend-item">
        <span class="legend-marker hostile">🔴</span>
        <span>Unidades hostiles (0)</span>
      </div>
      <div class="legend-item">
        <span class="legend-marker objective">🎯</span>
        <span>Objetivos ({{ objectives.length }})</span>
      </div>
      <div class="legend-item">
        <span class="legend-marker safe">🟢</span>
        <span>Puntos seguros (0)</span>
      </div>
    </div>

    <!-- Coordinates Display -->
    <div class="coordinates-display">
      <div v-if="cursorCoords">
        <strong>Cursor:</strong> {{ cursorCoords.lat.toFixed(4) }}°N, {{ cursorCoords.lng.toFixed(4) }}°W
        <span v-if="cursorCoords.elevation"> | {{ cursorCoords.elevation }}m</span>
      </div>
    </div>

    <!-- Unit Detail Popup (when unit is selected) -->
    <div v-if="selectedUnit" class="unit-detail-panel">
      <div class="panel-header">
        <h3>{{ selectedUnit.callSign }} - {{ selectedUnit.name }}</h3>
        <button @click="selectedUnit = null" class="close-btn">✕</button>
      </div>
      <div class="panel-content">
        <div class="detail-row">
          <strong>Tipo:</strong> {{ getUnitTypeLabel(selectedUnit.type) }}
        </div>
        <div class="detail-row">
          <strong>Personal:</strong> {{ selectedUnit.capabilities.personnel }} elementos
        </div>
        <div class="detail-row">
          <strong>Comandante:</strong> {{ selectedUnit.commander }}
        </div>
        <div class="detail-row">
          <strong>Estado:</strong>
          <span :class="`status-badge status-${selectedUnit.status}`">
            {{ getStatusLabel(selectedUnit.status) }}
          </span>
        </div>

        <div class="detail-section">
          <strong>Ubicación:</strong>
          <div>{{ selectedUnit.position.lat.toFixed(4) }}°N, {{ selectedUnit.position.lng.toFixed(4) }}°W</div>
          <div v-if="selectedUnit.position.elevation">Elevación: {{ selectedUnit.position.elevation }}m</div>
        </div>

        <div class="detail-section">
          <strong>Capacidades:</strong>
          <ul>
            <li>Radio de acción: {{ selectedUnit.capabilities.actionRadius }} km</li>
            <li>Autonomía: {{ selectedUnit.capabilities.autonomy }} horas</li>
            <li>Velocidad: {{ selectedUnit.capabilities.speed }} km/h</li>
          </ul>
        </div>

        <div class="detail-section" v-if="selectedUnit.equipment">
          <strong>Equipamiento:</strong>
          <ul>
            <li v-for="(items, category) in selectedUnit.equipment" :key="category">
              <strong>{{ category }}:</strong> {{ Array.isArray(items) ? items.join(', ') : items }}
            </li>
          </ul>
        </div>

        <div class="detail-section" v-if="selectedUnit.currentMission">
          <strong>Misión actual:</strong> {{ selectedUnit.currentMission }}
        </div>

        <div class="detail-actions">
          <button @click="centerOnUnit(selectedUnit)" class="action-btn">📍 Centrar en mapa</button>
          <button class="action-btn">🎯 Asignar misión</button>
          <button class="action-btn">📞 Contactar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { TacticalUnit } from '../../types/tactical'
import { tacticalData } from '../../data/tacticalData'

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

const map = ref<L.Map | null>(null)
const controlsExpanded = ref(true)
const activeBaseLayer = ref('satellite')
const activeTool = ref<string | null>(null)
const cursorCoords = ref<{ lat: number; lng: number; elevation?: number } | null>(null)
const selectedUnit = ref<TacticalUnit | null>(null)

const friendlyUnits = ref<TacticalUnit[]>(tacticalData.units)
const objectives = ref(tacticalData.operations.flatMap(op => op.objectives))

// Layer groups
const unitMarkers = ref<L.LayerGroup>(L.layerGroup())
const objectiveMarkers = ref<L.LayerGroup>(L.layerGroup())
const routeLines = ref<L.LayerGroup>(L.layerGroup())
const zonePolygons = ref<L.LayerGroup>(L.layerGroup())

// ─────────────────────────────────────────────────────────────────────────────
// LAYER DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const baseLayers = [
  { id: 'satellite', name: 'Satelital', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
  { id: 'topographic', name: 'Topográfico', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' },
  { id: 'street', name: 'Callejero', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }
]

const overlays = ref([
  { id: 'units', name: 'Unidades', enabled: true },
  { id: 'objectives', name: 'Objetivos', enabled: true },
  { id: 'routes', name: 'Rutas', enabled: false },
  { id: 'zones', name: 'Zonas', enabled: false }
])

const analysisLayers = ref([
  { id: 'los', name: 'Líneas de visión', enabled: false },
  { id: 'control', name: 'Zonas de control', enabled: false },
  { id: 'heat', name: 'Calor', enabled: false }
])

// ─────────────────────────────────────────────────────────────────────────────
// MAP INITIALIZATION
// ─────────────────────────────────────────────────────────────────────────────

onMounted(() => {
  initializeMap()
  addUnitsToMap()
  addObjectivesToMap()
  addRoutesToMap()
})

onUnmounted(() => {
  if (map.value) {
    // @ts-ignore
    if (zones.features) {
    map.value.remove()
  }
  }
})

function initializeMap() {
  // Initialize map centered on Mexico City
  map.value = L.map('tactical-map', {
    center: [19.4326, -99.1332],
    zoom: 14,
    zoomControl: false
  })

  // Add zoom control to top right
  L.control.zoom({ position: 'topright' }).addTo(map.value)
  // @ts-ignore
  L.control.layers(baseLayers, overlays).addTo(map.value)

  // Add base layer
  L.tileLayer(baseLayers[0].url, {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value)

  // Add layer groups to map
  unitMarkers.value.addTo(map.value)
  objectiveMarkers.value.addTo(map.value)
  routeLines.value.addTo(map.value)
  // @ts-ignore
  const zones = zonePolygons.value.toGeoJSON()

  // Track cursor position
  map.value.on('mousemove', (e: L.LeafletMouseEvent) => {
    cursorCoords.value = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      elevation: 2240 // Mock elevation
    }
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD UNITS TO MAP
// ─────────────────────────────────────────────────────────────────────────────

function addUnitsToMap() {
  friendlyUnits.value.forEach(unit => {
    // @ts-ignore
    const resources = resourceMarkers.value.toGeoJSON()
    const marker = createUnitMarker(unit)
    unitMarkers.value.addLayer(marker)
  })
}

function createUnitMarker(unit: TacticalUnit) {
  const icon = L.divIcon({
    className: 'unit-marker',
    html: `
      <div class="unit-marker-content unit-${unit.type} status-${unit.status}">
        <div class="unit-icon">${getUnitIcon(unit.type)}</div>
        <div class="unit-label">${unit.callSign}</div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 30]
  })

  const marker = L.marker([unit.position.lat, unit.position.lng], { icon })

  marker.on('click', () => {
    selectedUnit.value = unit
  })

  marker.bindTooltip(`
    <strong>${unit.callSign}</strong><br>
    ${unit.name}<br>
    Estado: ${getStatusLabel(unit.status)}
  `, {
    direction: 'top',
    offset: [0, -20]
  })

  return marker
}

function getUnitIcon(type: string): string {
  const icons: Record<string, string> = {
    infantry: '🪖',
    vehicle: '🚙',
    air: '🚁',
    command: '⭐',
    support: '🏥',
    special: '⚡'
  }
  return icons[type] || '🔵'
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD OBJECTIVES TO MAP
// ─────────────────────────────────────────────────────────────────────────────

function addObjectivesToMap() {
  objectives.value.forEach(objective => {
    const icon = L.divIcon({
      className: 'objective-marker',
      html: `
        <div class="objective-marker-content objective-${objective.type}">
          <div class="objective-icon">🎯</div>
          <div class="objective-label">${objective.type === 'primary' ? 'OBJ-P' : 'OBJ-S'}</div>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    })

    const marker = L.marker([objective.location.lat, objective.location.lng], { icon })

    marker.bindTooltip(`
      <strong>${objective.type === 'primary' ? 'Objetivo Principal' : 'Objetivo Secundario'}</strong><br>
      ${objective.description}
    `, {
      direction: 'top'
    })

    objectiveMarkers.value.addLayer(marker)
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD ROUTES TO MAP
// ─────────────────────────────────────────────────────────────────────────────

function addRoutesToMap() {
  tacticalData.operations.forEach(operation => {
    operation.routes.forEach(route => {
      const latLngs = route.waypoints.map(wp => [wp.lat, wp.lng] as [number, number])
      
      const polyline = L.polyline(latLngs, {
        color: getRouteColor(route.difficulty),
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 5'
      })

      polyline.bindTooltip(`
        <strong>${route.name}</strong><br>
        Distancia: ${route.distance}m<br>
        Tiempo estimado: ${route.estimatedTime} min<br>
        Cobertura: ${route.cover}%
      `)

      routeLines.value.addLayer(polyline)
    })
  })
}

function getRouteColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: '#00ff00',
    moderate: '#ffff00',
    difficult: '#ff9900',
    extreme: '#ff0000'
  }
  return colors[difficulty] || '#ffffff'
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYER CONTROLS
// ─────────────────────────────────────────────────────────────────────────────

function toggleControls() {
  controlsExpanded.value = !controlsExpanded.value
}

function changeBaseLayer() {
  // In a real implementation, would switch tile layers
  console.log('Changing base layer to:', activeBaseLayer.value)
}

function toggleOverlay(overlay: any) {
  if (!map.value) return

  switch (overlay.id) {
    case 'units':
      if (overlay.enabled) {
        map.value.addLayer(unitMarkers.value)
      } else {
        map.value.removeLayer(unitMarkers.value)
      }
      break
    case 'objectives':
      if (overlay.enabled) {
        map.value.addLayer(objectiveMarkers.value)
      } else {
        map.value.removeLayer(objectiveMarkers.value)
      }
      break
    case 'routes':
      if (overlay.enabled) {
        map.value.addLayer(routeLines.value)
      } else {
        map.value.removeLayer(routeLines.value)
      }
      break
    case 'zones':
      if (overlay.enabled) {
        ;(map.value as any).addLayer(zonePolygons.value)
      } else {
        ;(map.value as any).removeLayer(zonePolygons.value)
      }
      break
  }
}

function toggleAnalysis(analysis: any) {
  console.log('Toggle analysis:', analysis.id, analysis.enabled)
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLS
// ─────────────────────────────────────────────────────────────────────────────

function activateTool(tool: string) {
  activeTool.value = activeTool.value === tool ? null : tool
  console.log('Activated tool:', tool)
}

function centerMap() {
  if (map.value) {
    map.value.setView([19.4326, -99.1332], 14)
  }
}

function centerOnUnit(unit: TacticalUnit) {
  if (map.value) {
    map.value.setView([unit.position.lat, unit.position.lng], 16)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getUnitTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    infantry: 'Infantería',
    vehicle: 'Vehículo',
    air: 'Aéreo',
    command: 'Comando',
    support: 'Apoyo',
    special: 'Especial'
  }
  return labels[type] || type
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    operational: 'Operativo',
    engaged: 'En combate',
    moving: 'En movimiento',
    standby: 'En espera',
    damaged: 'Dañado',
    offline: 'Fuera de línea'
  }
  return labels[status] || status
}
</script>

<style scoped>
.tactical-map-engine {
  position: relative;
  width: 100%;
  height: calc(100vh - 200px);
  background: #0a0e1a;
}

.map-container {
  width: 100%;
  height: 100%;
  background: #000;
}

/* Layer Controls */
.layer-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(10, 14, 26, 0.95);
  border: 1px solid var(--tyravex-primary);
  border-radius: 8px;
  padding: 15px;
  min-width: 200px;
  max-width: 250px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.controls-header h3 {
  margin: 0;
  font-size: 14px;
  color: var(--tyravex-primary);
  font-weight: 600;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--tyravex-primary);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.controls-content {
  animation: slideIn 0.3s ease;
}

.control-section {
  margin-bottom: 15px;
}

.control-section h4 {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layer-option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #ccc;
}

.layer-option input {
  cursor: pointer;
}

.layer-option:hover {
  color: var(--tyravex-primary);
}

/* Map Tools */
.map-tools {
  position: absolute;
  top: 20px;
  right: 80px;
  display: flex;
  gap: 8px;
  z-index: 1000;
}

.map-tools button {
  width: 40px;
  height: 40px;
  background: rgba(10, 14, 26, 0.95);
  border: 1px solid var(--tyravex-primary);
  border-radius: 6px;
  color: var(--tyravex-primary);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-tools button:hover {
  background: var(--tyravex-primary);
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
}

.map-tools button.active {
  background: var(--tyravex-primary);
  color: #000;
}

/* Legend */
.map-legend {
  position: absolute;
  bottom: 80px;
  left: 20px;
  background: rgba(10, 14, 26, 0.95);
  border: 1px solid var(--tyravex-primary);
  border-radius: 8px;
  padding: 15px;
  z-index: 1000;
  min-width: 220px;
}

.map-legend h4 {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: var(--tyravex-primary);
  font-weight: 600;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #ccc;
}

.legend-marker {
  font-size: 16px;
}

/* Coordinates Display */
.coordinates-display {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(10, 14, 26, 0.95);
  border: 1px solid var(--tyravex-primary);
  border-radius: 6px;
  padding: 10px 15px;
  z-index: 1000;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--tyravex-primary);
}

/* Unit Detail Panel */
.unit-detail-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: calc(100vh - 250px);
  background: rgba(10, 14, 26, 0.98);
  border: 2px solid var(--tyravex-primary);
  border-radius: 12px;
  z-index: 1001;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 200, 255, 0.1));
  border-bottom: 1px solid var(--tyravex-primary);
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: var(--tyravex-primary);
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: var(--tyravex-primary);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4444;
}

.panel-content {
  padding: 20px;
  max-height: calc(100vh - 320px);
  overflow-y: auto;
}

.detail-row {
  margin-bottom: 12px;
  font-size: 14px;
  color: #ccc;
}

.detail-row strong {
  color: var(--tyravex-primary);
  margin-right: 8px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-operational {
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
}

.status-moving {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
}

.status-standby {
  background: rgba(0, 200, 255, 0.2);
  color: #00c8ff;
}

.detail-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 255, 136, 0.2);
}

.detail-section strong {
  display: block;
  color: var(--tyravex-primary);
  margin-bottom: 8px;
  font-size: 13px;
}

.detail-section ul {
  margin: 8px 0;
  padding-left: 20px;
  color: #ccc;
  font-size: 13px;
}

.detail-section li {
  margin-bottom: 6px;
}

.detail-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  padding: 10px 15px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--tyravex-primary);
  border-radius: 6px;
  color: var(--tyravex-primary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-btn:hover {
  background: var(--tyravex-primary);
  color: #000;
  transform: translateX(4px);
}

/* Custom Marker Styles */
:deep(.unit-marker-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

:deep(.unit-icon) {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
}

:deep(.unit-label) {
  font-size: 10px;
  font-weight: 600;
  color: var(--tyravex-primary);
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
}

:deep(.objective-marker-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

:deep(.objective-icon) {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
}

:deep(.objective-label) {
  font-size: 10px;
  font-weight: 600;
  color: #ff9900;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 6px;
  border-radius: 3px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
