<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import L from 'leaflet'
import type { FeatureCollection, Feature } from 'geojson'
import { useAnalytics } from '@/composables/useAnalytics'
import { 
  getStatesGeo, 
  getMunicipalitiesGeo, 
  STATE_ID_TO_SLUG,
  generateElectoralScore,
  isMunicipalityLocked,
  getElectoralColor
} from '@/lib/geo/mxGeo'

// ============================================
// ANALYTICS CONTEXT
// ============================================

const analytics = useAnalytics()
const selectedState = computed(() => analytics.selectedState)

// ============================================
// MAP STATE
// ============================================

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let geoJsonLayer: L.GeoJSON | null = null

const loading = ref(false)
const tooltipData = ref<{ name: string; score: number; isLocked: boolean } | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipEl = ref<HTMLElement | null>(null)

// ============================================
// INITIALIZE MAP
// ============================================

function initMap() {
  if (!mapContainer.value || map) return

  map = L.map(mapContainer.value, {
    center: [23.6345, -102.5528],
    zoom: 5,
    zoomControl: true,
    attributionControl: true
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map)
}

// ============================================
// LOAD GEO DATA
// ============================================

async function loadGeoData() {
  if (!map) return
  
  loading.value = true
  
  // Remove existing layer
  if (geoJsonLayer) {
    map.removeLayer(geoJsonLayer)
    geoJsonLayer = null
  }
  
  try {
    let geoData: FeatureCollection
    
    if (!selectedState.value) {
      // Load Mexico states
      geoData = await getStatesGeo()
      map.setView([23.6345, -102.5528], 5)
    } else {
      // Load municipalities for selected state
      const stateSlug = STATE_ID_TO_SLUG[selectedState.value.id]
      if (stateSlug) {
        geoData = await getMunicipalitiesGeo(stateSlug)
      } else {
        console.error('[Electoral Map] Unknown state slug for:', selectedState.value.id)
        loading.value = false
        return
      }
    }
    
    // Add GeoJSON layer
    geoJsonLayer = L.geoJSON(geoData, {
      style: getFeatureStyle,
      onEachFeature: onEachFeature
    }).addTo(map)
    
    // Fit bounds
    if (geoJsonLayer.getBounds().isValid()) {
      map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] })
    }
    
  } catch (error) {
    console.error('[Electoral Map] Error loading geo data:', error)
  } finally {
    loading.value = false
  }
}

// ============================================
// FEATURE STYLING
// ============================================

function getFeatureStyle(feature?: Feature): L.PathOptions {
  if (!feature) return {}
  
  const id = feature.properties?.CVEGEO || feature.properties?.CVE_MUN || feature.properties?.name || 'unknown'
  const score = generateElectoralScore(id)
  const isLocked = isMunicipalityLocked(id)
  
  if (isLocked) {
    return {
      fillColor: '#6b7280',
      fillOpacity: 0.3,
      color: '#4b5563',
      weight: 1
    }
  }
  
  return {
    fillColor: getElectoralColor(score),
    fillOpacity: 0.6,
    color: '#ffffff',
    weight: 1
  }
}

function onEachFeature(feature: Feature, layer: L.Layer) {
  layer.on({
    mouseover: (e: L.LeafletMouseEvent) => {
      const id = feature.properties?.CVEGEO || feature.properties?.CVE_MUN || feature.properties?.name || 'unknown'
      const name = feature.properties?.NAME_2 || 'Municipio sin nombre'
      const score = generateElectoralScore(id)
      const isLocked = isMunicipalityLocked(id)
      
      tooltipData.value = { name, score, isLocked }
      
      // Calculate tooltip position with boundary checking
      const mouseX = e.originalEvent.clientX
      const mouseY = e.originalEvent.clientY
      const offset = 10
      const padding = 10
      
      // Estimated tooltip dimensions (will be refined after render)
      const estimatedWidth = 150
      const estimatedHeight = 60
      
      // Get map container bounds
      const mapRect = mapContainer.value?.getBoundingClientRect()
      if (!mapRect) {
        tooltipPosition.value = { x: mouseX + offset, y: mouseY + offset }
        return
      }
      
      let x = mouseX + offset
      let y = mouseY + offset
      
      // Clamp to absolute map boundaries (not relative to cursor)
      // Right edge
      if (x + estimatedWidth > mapRect.right - padding) {
        x = mapRect.right - estimatedWidth - padding
      }
      // Left edge
      if (x < mapRect.left + padding) {
        x = mapRect.left + padding
      }
      
      // Bottom edge
      if (y + estimatedHeight > mapRect.bottom - padding) {
        y = mapRect.bottom - estimatedHeight - padding
      }
      // Top edge
      if (y < mapRect.top + padding) {
        y = mapRect.top + padding
      }
      
      tooltipPosition.value = { x, y }
      
      // Refine position after tooltip renders with actual dimensions
      nextTick(() => {
        const tooltipRect = tooltipEl.value?.getBoundingClientRect()
        if (!tooltipRect || !mapRect) return
        
        let refinedX = tooltipPosition.value.x
        let refinedY = tooltipPosition.value.y
        
        // Re-clamp with actual tooltip dimensions
        if (refinedX + tooltipRect.width > mapRect.right - padding) {
          refinedX = mapRect.right - tooltipRect.width - padding
        }
        if (refinedX < mapRect.left + padding) {
          refinedX = mapRect.left + padding
        }
        
        if (refinedY + tooltipRect.height > mapRect.bottom - padding) {
          refinedY = mapRect.bottom - tooltipRect.height - padding
        }
        if (refinedY < mapRect.top + padding) {
          refinedY = mapRect.top + padding
        }
        
        tooltipPosition.value = { x: refinedX, y: refinedY }
      })
      
      // Highlight
      if (layer instanceof L.Path) {
        layer.setStyle({
          weight: 3,
          color: '#fbbf24',
          fillOpacity: 0.8
        })
      }
    },
    mouseout: () => {
      tooltipData.value = null
      if (layer instanceof L.Path) {
        layer.setStyle(getFeatureStyle(feature))
      }
    },
    click: () => {
      handleFeatureClick(feature)
    }
  })
}

// ============================================
// FEATURE INTERACTION
// ============================================

function handleFeatureClick(feature: Feature) {
  if (!selectedState.value) {
    // Clicking on a state - not implemented yet
    return
  }
  
  const id = feature.properties?.CVEGEO || feature.properties?.CVE_MUN || feature.properties?.name || 'unknown'
  const isLocked = isMunicipalityLocked(id)
  
  if (isLocked) {
    // Show locked message
    analytics.setSelectedMunicipality({
      id,
      name: feature.properties?.NAME_2 || 'Municipio sin nombre',
      stateId: selectedState.value.id,
      type: 'municipio',
      fuerzaElectoral: 0,
      riesgoPolitico: 'alto',
      tendencia: 'stable',
      isLocked: true
    })
    return
  }
  
  const score = generateElectoralScore(id)
  const riesgo = score > 60 ? 'bajo' : score >= 40 ? 'medio' : 'alto'
  const tendencia = score % 3 === 0 ? 'up' : score % 3 === 1 ? 'down' : 'stable'
  
  analytics.setSelectedMunicipality({
    id,
    name: feature.properties?.NAME_2 || 'Municipio sin nombre',
    stateId: selectedState.value.id,
    type: 'municipio',
    fuerzaElectoral: score,
    riesgoPolitico: riesgo,
    tendencia,
    isLocked: false,
    poblacion: Math.floor(Math.random() * 500000) + 50000
  })
}

// ============================================
// WATCHERS
// ============================================

watch(selectedState, () => {
  analytics.setSelectedMunicipality(null)
  loadGeoData()
}, { immediate: false })

// ============================================
// LIFECYCLE
// ============================================

onMounted(() => {
  initMap()
  loadGeoData()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-tyravex-bg-primary/80 z-[1000]">
      <div class="text-tyravex-text-muted">Cargando mapa...</div>
    </div>

    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full min-h-[600px] rounded-lg overflow-hidden" />

    <!-- Tooltip -->
    <div
      v-if="tooltipData"
      ref="tooltipEl"
      class="fixed z-[1001] px-3 py-2 bg-tyravex-bg-secondary border border-tyravex-border rounded-lg shadow-lg pointer-events-none"
      :style="{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`
      }"
    >
      <div class="text-sm font-medium text-tyravex-text-primary">{{ tooltipData.name }}</div>
      <div v-if="tooltipData.isLocked" class="text-xs text-tyravex-text-muted mt-1 flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
        Bloqueado
      </div>
      <div v-else class="text-xs text-tyravex-text-muted mt-1">
        Fuerza: <span :style="{ color: getElectoralColor(tooltipData.score) }">{{ tooltipData.score }}%</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="absolute bottom-4 right-4 bg-tyravex-bg-secondary border border-tyravex-border rounded-lg p-3 z-[999]">
      <div class="text-xs font-medium text-tyravex-text-primary mb-2">Fuerza Electoral</div>
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded" style="background-color: #10b981"></div>
          <span class="text-xs text-tyravex-text-muted">&gt; 60%</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded" style="background-color: #f59e0b"></div>
          <span class="text-xs text-tyravex-text-muted">40-60%</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded" style="background-color: #ef4444"></div>
          <span class="text-xs text-tyravex-text-muted">&lt; 40%</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-gray-600"></div>
          <span class="text-xs text-tyravex-text-muted">Bloqueado</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure Leaflet controls match dark theme */
:deep(.leaflet-control-zoom a) {
  background-color: #1a1a1a;
  color: #e5e7eb;
  border-color: #374151;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #262626;
}

:deep(.leaflet-control-attribution) {
  background-color: rgba(26, 26, 26, 0.8);
  color: #9ca3af;
}
</style>
