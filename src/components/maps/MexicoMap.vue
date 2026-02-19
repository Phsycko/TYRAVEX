<!-- @ts-nocheck -->
<template>
  <div class="mexico-map-root" ref="rootEl">
    <!-- MODE SELECTOR -->
    <div v-if="!readonly" class="mode-selector">
      <button
        v-for="m in modes"
        :key="m.key"
        class="mode-btn"
        :class="{ active: currentMode === m.key }"
        @click="currentMode = m.key"
      >
        <span class="mode-icon">{{ m.icon }}</span>
        <span class="mode-label">{{ m.label }}</span>
      </button>
    </div>

    <!-- BACK BUTTON -->
    <Transition name="fade">
      <button v-if="drillState" class="back-btn" @click="handleBack">
        <span class="back-arrow">&larr;</span> BACK TO STATES
      </button>
    </Transition>

    <!-- MAP CONTAINER -->
    <div class="map-container" ref="mapContainer"></div>

    <!-- HOVER TOOLTIP -->
    <Transition name="fade">
      <div v-if="tooltip.visible" class="map-tooltip" :style="tooltipStyle">
        <div class="tooltip-title">{{ tooltip.title }}</div>
        <div class="tooltip-metric">
          <span class="tooltip-label">{{ modeConfig[currentMode].metricLabel }}</span>
          <span class="tooltip-value">{{ tooltip.value }}{{ modeConfig[currentMode].unit }}</span>
        </div>
        <div v-if="tooltip.extra" class="tooltip-extra">{{ tooltip.extra }}</div>
      </div>
    </Transition>

    <!-- LEGEND -->
    <div class="map-legend">
      <div class="legend-title">{{ modeConfig[currentMode].label }}</div>
      <div class="legend-bar" :style="{ background: legendGradient }"></div>
      <div class="legend-labels">
        <span>{{ legendMin }}</span>
        <span>{{ legendMax }}</span>
      </div>
      <div class="legend-desc">{{ modeConfig[currentMode].description }}</div>
    </div>

    <!-- INFO PANEL -->
    <Transition name="slide">
      <div v-if="selectedInfo" class="info-panel">
        <div class="info-header">
          <div class="info-title">{{ selectedInfo.name }}</div>
          <button class="info-close" @click="selectedInfo = null">&times;</button>
        </div>
        <div class="info-divider"></div>

        <!-- State details -->
        <template v-if="selectedInfo.type === 'state'">
          <div class="info-population">
            <span class="info-label">POPULATION</span>
            <span class="info-val mono">{{ formatNumber(selectedInfo.data.population) }}</span>
          </div>
          <div class="info-divider"></div>

          <template v-if="currentMode === 'electoral'">
            <div class="info-row"><span class="info-label">VOTE INTENTION</span><span class="info-val accent mono">{{ selectedInfo.data.electoral.voteIntention }}%</span></div>
            <div class="info-row"><span class="info-label">HISTORIC VOTE</span><span class="info-val mono">{{ selectedInfo.data.electoral.historicVote }}%</span></div>
            <div class="info-row"><span class="info-label">DISTRICTS WON</span><span class="info-val success mono">{{ selectedInfo.data.electoral.districtsWon }}</span></div>
            <div class="info-row"><span class="info-label">DISTRICTS LOST</span><span class="info-val danger mono">{{ selectedInfo.data.electoral.districtsLost }}</span></div>
            <div class="info-row"><span class="info-label">DISPUTED</span><span class="info-val warn mono">{{ selectedInfo.data.electoral.districtsDisputed }}</span></div>
            <div class="info-row"><span class="info-label">TREND</span><span class="info-val mono" :class="selectedInfo.data.electoral.trend >= 0 ? 'success' : 'danger'">{{ selectedInfo.data.electoral.trend > 0 ? '+' : '' }}{{ selectedInfo.data.electoral.trend }}%</span></div>
            <div class="info-row"><span class="info-label">TURNOUT EST.</span><span class="info-val mono">{{ selectedInfo.data.electoral.turnoutEstimate }}%</span></div>
          </template>

          <template v-if="currentMode === 'security'">
            <div class="info-row"><span class="info-label">CRIME INDEX</span><span class="info-val accent mono">{{ selectedInfo.data.security.crimeIndex }}</span></div>
            <div class="info-row"><span class="info-label">INCIDENTS / 100K</span><span class="info-val mono">{{ formatNumber(selectedInfo.data.security.incidentsPer100k) }}</span></div>
            <div class="info-row"><span class="info-label">HOTSPOTS</span><span class="info-val danger mono">{{ selectedInfo.data.security.hotspots }}</span></div>
            <div class="info-row"><span class="info-label">RISK LEVEL</span><span class="info-val mono" :class="riskClass(selectedInfo.data.security.riskLevel)">{{ selectedInfo.data.security.riskLevel.toUpperCase() }}</span></div>
            <div class="info-row"><span class="info-label">TREND</span><span class="info-val mono" :class="selectedInfo.data.security.trend <= 0 ? 'success' : 'danger'">{{ selectedInfo.data.security.trend > 0 ? '+' : '' }}{{ selectedInfo.data.security.trend }}</span></div>
          </template>

          <template v-if="currentMode === 'tactical'">
            <div class="info-row"><span class="info-label">CONTROL LEVEL</span><span class="info-val accent mono">{{ selectedInfo.data.tactical.controlLevel }}%</span></div>
            <div class="info-row"><span class="info-label">OPERATIVE COV.</span><span class="info-val mono">{{ selectedInfo.data.tactical.operativeCoverage }}%</span></div>
            <div class="info-row"><span class="info-label">STRATEGIC PTS</span><span class="info-val mono">{{ selectedInfo.data.tactical.strategicPoints }}</span></div>
            <div class="info-row"><span class="info-label">ACTIVE UNITS</span><span class="info-val success mono">{{ selectedInfo.data.tactical.activeUnits }}</span></div>
            <div class="info-row"><span class="info-label">DEPLOYMENT</span><span class="info-val mono">{{ selectedInfo.data.tactical.resourceDeployment }}%</span></div>
          </template>

          <template v-if="currentMode === 'social'">
            <div class="info-row"><span class="info-label">MARGINATION IDX</span><span class="info-val accent mono">{{ selectedInfo.data.social.marginationIndex }}</span></div>
            <div class="info-row"><span class="info-label">HEALTH ACCESS</span><span class="info-val mono">{{ selectedInfo.data.social.healthAccess }}%</span></div>
            <div class="info-row"><span class="info-label">EDUCATION ACC.</span><span class="info-val mono">{{ selectedInfo.data.social.educationAccess }}%</span></div>
            <div class="info-row"><span class="info-label">SERVICES ACC.</span><span class="info-val mono">{{ selectedInfo.data.social.servicesAccess }}%</span></div>
            <div class="info-row"><span class="info-label">SOCIAL LAG</span><span class="info-val mono" :class="selectedInfo.data.social.socialLag > 50 ? 'danger' : 'success'">{{ selectedInfo.data.social.socialLag }}</span></div>
          </template>

          <div class="info-action" v-if="!readonly && !drillState">
            <button class="btn-drill" @click="drillInto(selectedInfo.slug)">VIEW MUNICIPALITIES &rarr;</button>
          </div>
        </template>

        <!-- Municipality details -->
        <template v-if="selectedInfo.type === 'municipality'">
          <div class="info-row"><span class="info-label">STATE</span><span class="info-val mono">{{ selectedInfo.data.stateName }}</span></div>
          <div class="info-row"><span class="info-label">POPULATION</span><span class="info-val mono">{{ formatNumber(selectedInfo.data.population) }}</span></div>
          <div class="info-divider"></div>
          <template v-if="currentMode === 'electoral'">
            <div class="info-row"><span class="info-label">VOTE INTENTION</span><span class="info-val accent mono">{{ selectedInfo.data.electoral.voteIntention }}%</span></div>
            <div class="info-row"><span class="info-label">TREND</span><span class="info-val mono" :class="selectedInfo.data.electoral.trend >= 0 ? 'success' : 'danger'">{{ selectedInfo.data.electoral.trend > 0 ? '+' : '' }}{{ selectedInfo.data.electoral.trend }}%</span></div>
          </template>
          <template v-if="currentMode === 'security'">
            <div class="info-row"><span class="info-label">CRIME INDEX</span><span class="info-val accent mono">{{ selectedInfo.data.security.crimeIndex }}</span></div>
            <div class="info-row"><span class="info-label">INCIDENTS / 100K</span><span class="info-val mono">{{ formatNumber(selectedInfo.data.security.incidentsPer100k) }}</span></div>
          </template>
          <template v-if="currentMode === 'tactical'">
            <div class="info-row"><span class="info-label">CONTROL LEVEL</span><span class="info-val accent mono">{{ selectedInfo.data.tactical.controlLevel }}%</span></div>
            <div class="info-row"><span class="info-label">OPERATIVE COV.</span><span class="info-val mono">{{ selectedInfo.data.tactical.operativeCoverage }}%</span></div>
          </template>
          <template v-if="currentMode === 'social'">
            <div class="info-row"><span class="info-label">MARGINATION</span><span class="info-val accent mono">{{ selectedInfo.data.social.marginationIndex }}</span></div>
            <div class="info-row"><span class="info-label">SOCIAL LAG</span><span class="info-val mono">{{ selectedInfo.data.social.socialLag }}</span></div>
          </template>
        </template>
      </div>
    </Transition>

    <!-- LOADING OVERLAY -->
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">LOADING GEO DATA...</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getStatesGeo, getMunicipalitiesGeo } from '@/lib/geo/mxGeo'
import {
  type MapMode,
  type StateMetrics,
  type MunicipalityMetrics,
  getStateMetrics,
  getMunicipalityMetrics,
  getMetricValue,
  getChoroplethColor,
  findStateMetrics,
  MODE_CONFIG,
} from '@/data/mapData'

const props = withDefaults(defineProps<{
  mode?: MapMode
  readonly?: boolean
}>(), {
  mode: 'electoral',
  readonly: false,
})

const emit = defineEmits<{
  (e: 'state-select', state: StateMetrics): void
  (e: 'municipality-select', mun: MunicipalityMetrics): void
  (e: 'mode-change', mode: MapMode): void
}>()

// ─── STATE ────────────────────────────────────────────
const rootEl = ref<HTMLElement | null>(null)
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let statesLayer: L.GeoJSON | null = null
let municipalitiesLayer: L.GeoJSON | null = null

const currentMode = ref<MapMode>(props.mode)
const drillState = ref<string | null>(null) // slug of drilled state
const drillStateName = ref<string>('')
const loading = ref(false)
const stateMetrics = getStateMetrics()

const tooltip = ref({
  visible: false,
  title: '',
  value: '',
  extra: '',
  x: 0,
  y: 0,
})

const selectedInfo = ref<{
  type: 'state' | 'municipality'
  name: string
  slug: string
  data: any
} | null>(null)

// ─── MODE CONFIG ──────────────────────────────────────
const modeConfig = MODE_CONFIG

const modes = [
  { key: 'electoral' as MapMode, label: 'ELECTORAL', icon: '🗳' },
  { key: 'security' as MapMode, label: 'SEGURIDAD', icon: '🛡' },
  { key: 'tactical' as MapMode, label: 'TÁCTICO', icon: '⚔' },
  { key: 'social' as MapMode, label: 'SOCIAL', icon: '👥' },
]

// ─── COMPUTED ─────────────────────────────────────────
const tooltipStyle = computed(() => ({
  left: tooltip.value.x + 16 + 'px',
  top: tooltip.value.y - 10 + 'px',
}))

const legendGradient = computed(() => {
  const m = currentMode.value
  const colors: string[] = []
  for (let i = 0; i <= 100; i += 10) {
    colors.push(getChoroplethColor(m, i))
  }
  return `linear-gradient(to right, ${colors.join(', ')})`
})

const legendMin = computed(() => {
  switch (currentMode.value) {
    case 'electoral': return '0% (unfav)'
    case 'security': return '0 (safe)'
    case 'tactical': return '0% (low)'
    case 'social': return '0 (low)'
  }
})

const legendMax = computed(() => {
  switch (currentMode.value) {
    case 'electoral': return '100% (fav)'
    case 'security': return '100 (high)'
    case 'tactical': return '100% (full)'
    case 'social': return '100 (high)'
  }
})

// ─── HELPERS ──────────────────────────────────────────
function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

function riskClass(level: string): string {
  switch (level) {
    case 'low': return 'success'
    case 'medium': return 'warn'
    case 'high': return 'danger'
    case 'critical': return 'danger'
    default: return ''
  }
}

function normalizeForSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}

// ─── MAP INITIALIZATION ──────────────────────────────
onMounted(async () => {
  await nextTick()
  if (!mapContainer.value) return

  // Create map with dark theme
  map = L.map(mapContainer.value, {
    center: [23.6345, -102.5528],
    zoom: 5,
    minZoom: 4,
    maxZoom: 12,
    zoomControl: false,
    attributionControl: false,
    preferCanvas: true,
  })

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  }).addTo(map)

  // Custom zoom control position
  L.control.zoom({ position: 'topright' }).addTo(map)

  // Load states
  await loadStatesLayer()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})

// ─── STATES LAYER ─────────────────────────────────────
async function loadStatesLayer() {
  if (!map) return
  loading.value = true

  try {
    const geojson = await getStatesGeo()

    if (statesLayer) {
      map.removeLayer(statesLayer)
    }

    statesLayer = L.geoJSON(geojson as any, {
      style: (feature) => stateStyle(feature),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => handleStateHover(e, feature),
          mouseout: handleMouseOut,
          mousemove: handleMouseMove,
          click: (e) => handleStateClick(e, feature),
        })
      },
    }).addTo(map)

    // Fit to Mexico bounds
    const bounds = statesLayer.getBounds()
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  } catch (err) {
    console.error('[MexicoMap] Error loading states:', err)
  } finally {
    loading.value = false
  }
}

function stateStyle(feature: any): L.PathOptions {
  const geoName = feature?.properties?.name || ''
  const metrics = findStateMetrics(geoName)
  const value = metrics ? getMetricValue(currentMode.value, metrics) : 50
  const color = getChoroplethColor(currentMode.value, value)

  return {
    fillColor: color,
    fillOpacity: 0.7,
    color: 'rgba(255, 255, 255, 0.15)',
    weight: 1,
    opacity: 1,
  }
}

function handleStateHover(e: L.LeafletMouseEvent, feature: any) {
  const layer = e.target
  layer.setStyle({
    weight: 2,
    color: '#ff6b35',
    fillOpacity: 0.85,
  })
  layer.bringToFront()

  const geoName = feature?.properties?.name || 'Unknown'
  const metrics = findStateMetrics(geoName)
  const value = metrics ? getMetricValue(currentMode.value, metrics) : 0

  const rect = rootEl.value?.getBoundingClientRect()
  const x = e.originalEvent.clientX - (rect?.left || 0)
  const y = e.originalEvent.clientY - (rect?.top || 0)

  tooltip.value = {
    visible: true,
    title: geoName,
    value: String(value),
    extra: metrics ? `Pop: ${formatNumber(metrics.population)}` : '',
    x,
    y,
  }
}

function handleMouseOut(e: L.LeafletMouseEvent) {
  if (statesLayer) statesLayer.resetStyle(e.target)
  if (municipalitiesLayer) municipalitiesLayer.resetStyle(e.target)
  tooltip.value.visible = false
}

function handleMouseMove(e: L.LeafletMouseEvent) {
  if (!tooltip.value.visible) return
  const rect = rootEl.value?.getBoundingClientRect()
  tooltip.value.x = e.originalEvent.clientX - (rect?.left || 0)
  tooltip.value.y = e.originalEvent.clientY - (rect?.top || 0)
}

function handleStateClick(_e: L.LeafletMouseEvent, feature: any) {
  const geoName = feature?.properties?.name || ''
  const metrics = findStateMetrics(geoName)
  if (!metrics) return

  selectedInfo.value = {
    type: 'state',
    name: metrics.name,
    slug: metrics.slug,
    data: metrics,
  }

  emit('state-select', metrics)

  if (!props.readonly) {
    // Drill into municipalities on click
    drillInto(metrics.slug)
  }
}

// ─── MUNICIPALITY DRILL-DOWN ──────────────────────────
async function drillInto(stateSlug: string) {
  if (!map) return
  loading.value = true
  tooltip.value.visible = false

  try {
    const geojson = await getMunicipalitiesGeo(stateSlug)

    if (geojson.features.length === 0) {
      console.warn('[MexicoMap] No municipalities found for', stateSlug)
      loading.value = false
      return
    }

    drillState.value = stateSlug

    // Find the state name from the first municipality's NAME_1
    drillStateName.value = geojson.features[0]?.properties?.NAME_1 || stateSlug

    // Hide states layer
    if (statesLayer && map) {
      map.removeLayer(statesLayer)
    }

    // Remove old municipalities layer
    if (municipalitiesLayer && map) {
      map.removeLayer(municipalitiesLayer)
    }

    municipalitiesLayer = L.geoJSON(geojson as any, {
      style: (feature) => municipalityStyle(feature),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => handleMunHover(e, feature),
          mouseout: handleMouseOut,
          mousemove: handleMouseMove,
          click: (e) => handleMunClick(e, feature),
        })
      },
    }).addTo(map)

    const bounds = municipalitiesLayer.getBounds()
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20], animate: true })
    }
  } catch (err) {
    console.error('[MexicoMap] Error loading municipalities:', err)
  } finally {
    loading.value = false
  }
}

function municipalityStyle(feature: any): L.PathOptions {
  const munName = feature?.properties?.NAME_2 || ''
  const stateName = feature?.properties?.NAME_1 || ''
  const metrics = getMunicipalityMetrics(munName, stateName)
  const value = getMetricValue(currentMode.value, metrics)
  const color = getChoroplethColor(currentMode.value, value)

  return {
    fillColor: color,
    fillOpacity: 0.7,
    color: 'rgba(255, 255, 255, 0.1)',
    weight: 0.5,
    opacity: 1,
  }
}

function handleMunHover(e: L.LeafletMouseEvent, feature: any) {
  const layer = e.target
  layer.setStyle({
    weight: 2,
    color: '#ff6b35',
    fillOpacity: 0.85,
  })
  layer.bringToFront()

  const munName = feature?.properties?.NAME_2 || 'Unknown'
  const stateName = feature?.properties?.NAME_1 || ''
  const metrics = getMunicipalityMetrics(munName, stateName)
  const value = getMetricValue(currentMode.value, metrics)

  const rect = rootEl.value?.getBoundingClientRect()
  const x = e.originalEvent.clientX - (rect?.left || 0)
  const y = e.originalEvent.clientY - (rect?.top || 0)

  tooltip.value = {
    visible: true,
    title: munName,
    value: String(value),
    extra: `${stateName} · Pop: ${formatNumber(metrics.population)}`,
    x,
    y,
  }
}

function handleMunClick(_e: L.LeafletMouseEvent, feature: any) {
  const munName = feature?.properties?.NAME_2 || ''
  const stateName = feature?.properties?.NAME_1 || ''
  const metrics = getMunicipalityMetrics(munName, stateName)

  selectedInfo.value = {
    type: 'municipality',
    name: munName,
    slug: normalizeForSlug(munName),
    data: metrics,
  }

  emit('municipality-select', metrics)
}

// ─── BACK TO STATES ───────────────────────────────────
async function handleBack() {
  if (!map) return
  tooltip.value.visible = false
  selectedInfo.value = null
  drillState.value = null
  drillStateName.value = ''

  // Remove municipalities
  if (municipalitiesLayer) {
    map.removeLayer(municipalitiesLayer)
    municipalitiesLayer = null
  }

  // Re-add states
  await loadStatesLayer()
}

// ─── WATCHERS ─────────────────────────────────────────
watch(() => props.mode, (newMode) => {
  currentMode.value = newMode
})

watch(currentMode, () => {
  emit('mode-change', currentMode.value)
  refreshStyles()
})

function refreshStyles() {
  if (statesLayer) {
    statesLayer.eachLayer((layer: any) => {
      if (layer.feature) {
        layer.setStyle(stateStyle(layer.feature))
      }
    })
  }
  if (municipalitiesLayer) {
    municipalitiesLayer.eachLayer((layer: any) => {
      if (layer.feature) {
        layer.setStyle(municipalityStyle(layer.feature))
      }
    })
  }
  // Update info panel if open
  if (selectedInfo.value) {
    const info = selectedInfo.value
    if (info.type === 'state') {
      const fresh = findStateMetrics(info.name)
      if (fresh) info.data = fresh
    }
  }
}
</script>

<style scoped>
.mexico-map-root {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: #0f1115;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  z-index: 1;
}

/* ─── MODE SELECTOR ─────────────────────────────── */
.mode-selector {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1000;
  display: flex;
  gap: 4px;
  background: rgba(15, 17, 21, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 4px;
  backdrop-filter: blur(8px);
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  color: #888;
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
  white-space: nowrap;
}

.mode-btn:hover {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.05);
}

.mode-btn.active {
  color: #ff6b35;
  background: rgba(255, 107, 53, 0.12);
  border-color: rgba(255, 107, 53, 0.3);
}

.mode-icon {
  font-size: 12px;
}

.mode-label {
  font-size: 10px;
}

/* ─── BACK BUTTON ───────────────────────────────── */
.back-btn {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(15, 17, 21, 0.92);
  border: 1px solid rgba(255, 107, 53, 0.4);
  border-radius: 2px;
  color: #ff6b35;
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.15s ease;
}

.back-btn:hover {
  background: rgba(255, 107, 53, 0.15);
}

.back-arrow {
  font-size: 14px;
}

/* ─── TOOLTIP ───────────────────────────────────── */
.map-tooltip {
  position: absolute;
  z-index: 1001;
  pointer-events: none;
  background: rgba(15, 17, 21, 0.95);
  border: 1px solid rgba(255, 107, 53, 0.4);
  border-radius: 4px;
  padding: 10px 14px;
  min-width: 160px;
  backdrop-filter: blur(8px);
}

.tooltip-title {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.03em;
  margin-bottom: 6px;
}

.tooltip-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tooltip-label {
  font-family: 'Roboto Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
}

.tooltip-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #ff6b35;
}

.tooltip-extra {
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  color: #666;
  margin-top: 4px;
}

/* ─── LEGEND ────────────────────────────────────── */
.map-legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 1000;
  background: rgba(15, 17, 21, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 12px 16px;
  min-width: 200px;
  backdrop-filter: blur(8px);
}

.legend-title {
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #ff6b35;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.legend-bar {
  width: 100%;
  height: 8px;
  border-radius: 2px;
  margin-bottom: 4px;
}

.legend-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto Mono', monospace;
  font-size: 9px;
  color: #888;
  letter-spacing: 0.03em;
}

.legend-desc {
  font-size: 10px;
  color: #666;
  margin-top: 6px;
}

/* ─── INFO PANEL ────────────────────────────────── */
.info-panel {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  width: 280px;
  height: 100%;
  background: rgba(15, 17, 21, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px 16px;
  overflow-y: auto;
  backdrop-filter: blur(12px);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.info-title {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.03em;
  flex: 1;
}

.info-close {
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.15s ease;
}

.info-close:hover {
  color: #ff6b35;
}

.info-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 0;
}

.info-population {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.info-label {
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
}

.info-val {
  font-size: 13px;
  color: #e0e0e0;
  font-weight: 600;
}

.info-val.accent { color: #ff6b35; }
.info-val.success { color: #00ffaa; }
.info-val.danger { color: #ff4444; }
.info-val.warn { color: #ffcc00; }

.mono {
  font-family: 'Roboto Mono', monospace;
}

.info-action {
  margin-top: 16px;
}

.btn-drill {
  width: 100%;
  padding: 10px;
  background: rgba(255, 107, 53, 0.12);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 2px;
  color: #ff6b35;
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
}

.btn-drill:hover {
  background: rgba(255, 107, 53, 0.25);
}

/* ─── LOADING OVERLAY ───────────────────────────── */
.loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(15, 17, 21, 0.85);
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 107, 53, 0.2);
  border-top-color: #ff6b35;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #ff6b35;
  margin-top: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── TRANSITIONS ───────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.25s ease-out, opacity 0.2s ease;
}

.slide-leave-active {
  transition: transform 0.2s ease-in, opacity 0.15s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ─── LEAFLET OVERRIDES ─────────────────────────── */
:deep(.leaflet-control-zoom) {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px !important;
  overflow: hidden;
}

:deep(.leaflet-control-zoom a) {
  background: rgba(15, 17, 21, 0.9) !important;
  color: #e0e0e0 !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  font-family: 'Roboto Mono', monospace !important;
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
  font-size: 16px !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background: rgba(255, 107, 53, 0.2) !important;
  color: #ff6b35 !important;
}

:deep(.leaflet-container) {
  background: #0f1115 !important;
}
</style>
