<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import TerritorialBreadcrumb from '@/components/analytics/TerritorialBreadcrumb.vue'
import ElectoralMap from '@/components/analytics/ElectoralMap.vue'
import MunicipalityDetailPanel from '@/components/analytics/MunicipalityDetailPanel.vue'
import ModuleLockedPlaceholder from '@/components/analytics/ModuleLockedPlaceholder.vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import DataTable from '@/components/common/DataTable.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { useAnalytics } from '@/composables/useAnalytics'
import { analyticsData } from '@/data/mockData'
import type { State } from '@/types/analytics'
import { generateDemographicsForState, type DemographicData } from '@/lib/demographics/mockDemographics'
import { 
  getMunicipalitiesForDropdown,
  getSeccionesForMunicipio,
  getFilteredHistoricalData,
  type HistoricalRow 
} from '@/lib/historical/mockHistorical'
import { getSegmentsForScope, type MicroTargetingSegment } from '@/lib/microtargeting/mockMicroTargeting'

// ============================================
// ANALYTICS CONTEXT
// ============================================

const analytics = useAnalytics()

// Destructure for easier access
const selectedState = computed(() => analytics.selectedState)
const selectedMunicipality = computed(() => analytics.selectedMunicipality)
const enabledStates = computed(() => analytics.enabledStates)
const isModuleEnabled = analytics.isModuleEnabled
const setSelectedState = analytics.setSelectedState

// ============================================
// UI STATE
// ============================================

const activeTab = ref('mapa')
const systemMessage = ref<string | null>(null)

const tabs = [
  { id: 'mapa', label: 'Mapa Electoral', moduleKey: 'electoral_map' as const },
  { id: 'demografia', label: 'Demografia', moduleKey: 'demographics' as const },
  { id: 'historico', label: 'Historico', moduleKey: 'historical' as const },
  { id: 'targeting', label: 'Micro-Targeting', moduleKey: 'micro_targeting' as const }
]

// ============================================
// SYSTEM MESSAGES
// ============================================

let messageTimeout: ReturnType<typeof setTimeout> | null = null

const showSystemMessage = (message: string) => {
  systemMessage.value = message
  if (messageTimeout) clearTimeout(messageTimeout)
}

const hideSystemMessage = () => {
  messageTimeout = setTimeout(() => {
    systemMessage.value = null
  }, 2000)
}

// ============================================
// STATE-DRIVEN DATA LOADING
// ============================================

// Los watchers se ejecutan cuando cambia el estado seleccionado
onMounted(() => {

  // Watcher para Demografía
  watch(selectedState, async (newState: State | null) => {
    if (!newState || !isModuleEnabled('demographics')) {
      demografiaData.value = null
      return
    }
    
    showSystemMessage('Normalizando datos demográficos...')
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // TODO: Backend connection point
    // const response = await fetch(`/v1/analytics/${newState.id}/demographics`)
    // demografiaData.value = await response.json()
    
    // Mock data (state-aware, deterministic)
    demografiaData.value = generateDemographicsForState(newState.id)
    
    hideSystemMessage()
    console.log(`[Demographics] Datos cargados para: ${newState.name}`)
  })

  // Watcher para Histórico
  watch(selectedState, async (newState: State | null) => {
    if (!newState || !isModuleEnabled('historical')) {
      historicoData.value = []
      selectedMunicipio.value = null
      selectedSeccion.value = null
      return
    }
    
    showSystemMessage('Cargando datos históricos...')
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // TODO: Backend connection point
    // const response = await fetch(`/v1/analytics/${newState.id}/historical/results`)
    // historicoData.value = await response.json()
    
    // Mock data (state-aware, deterministic, filtered)
    historicoData.value = getFilteredHistoricalData(
      newState.id,
      selectedMunicipio.value || undefined,
      selectedSeccion.value || undefined
    )
    
    hideSystemMessage()
    console.log(`[Historical] Datos cargados para: ${newState.name}`)
  })

  // Watcher for filter changes (municipio, seccion)
  watch([selectedMunicipio, selectedSeccion], () => {
    if (!selectedState.value || !isModuleEnabled('historical')) return
    
    // Update table with filtered data
    historicoData.value = getFilteredHistoricalData(
      selectedState.value.id,
      selectedMunicipio.value || undefined,
      selectedSeccion.value || undefined
    )
  })

  // Reset dependent filters when parent changes
  watch(selectedMunicipio, () => {
    selectedSeccion.value = null
  })

  // Watcher para Micro-Targeting
  watch(selectedState, async (newState: State | null) => {
    if (!newState || !isModuleEnabled('micro_targeting')) {
      segmentosData.value = []
      selectedMunicipioMT.value = null
      selectedSeccionMT.value = null
      return
    }
    
    showSystemMessage('Analizando segmentos electorales...')
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // TODO: Backend connection point
    // const response = await fetch(`/v1/analytics/${newState.id}/micro-targeting/segments`)
    // segmentosData.value = await response.json()
    
    // Mock data (state-aware, permission-based, geographically scoped)
    // TODO: Get enabled modules from user permissions/subscription
    const enabledModules = ['electoral_map', 'demographics', 'historical', 'micro_targeting']
    segmentosData.value = getSegmentsForScope(
      newState.id,
      selectedMunicipioMT.value || undefined,
      selectedSeccionMT.value || undefined,
      enabledModules
    )
    
    hideSystemMessage()
    console.log(`[Micro-Targeting] Segmentos cargados para: ${newState.name}`)
  })

  // Watcher for MT filter changes (municipio, seccion)
  watch([selectedMunicipioMT, selectedSeccionMT], () => {
    if (!selectedState.value || !isModuleEnabled('micro_targeting')) return
    
    // Update segments with new geographic scope
    // TODO: Get enabled modules from user permissions/subscription
    const enabledModules = ['electoral_map', 'demographics', 'historical', 'micro_targeting']
    segmentosData.value = getSegmentsForScope(
      selectedState.value.id,
      selectedMunicipioMT.value || undefined,
      selectedSeccionMT.value || undefined,
      enabledModules
    )
  })

  // Reset dependent MT filters when parent changes
  watch(selectedMunicipioMT, () => {
    selectedSeccionMT.value = null
  })
})

// ============================================
// DROPDOWN HELPERS
// ============================================

// Opciones para el dropdown (todos los estados)
const stateOptions = computed(() => 
  enabledStates.value.map((state: State) => ({
    value: state.id,
    label: state.name
  }))
)

// Manejar cambio de estado en el dropdown
const handleStateChange = (stateId: string | null) => {
  if (!stateId) {
    setSelectedState(null)
    return
  }
  
  const state = enabledStates.value.find((s: State) => s.id === stateId)
  if (state) {
    setSelectedState(state)
  }
}



// ============================================
// EXPORT HANDLER
// ============================================

const handleExport = () => {
  // TODO: Implementar exportación real
  const exportData = {
    state: selectedState.value?.name || 'Todos',
    municipality: selectedMunicipality.value?.name || 'Todos',
    module: activeTab.value,
    timestamp: new Date().toISOString()
  }
  
  console.log('[Export] Exportando datos:', exportData)
  showSystemMessage('Preparando exportación...')
  
  setTimeout(() => {
    console.log('[Export] Datos que se exportarían:', exportData)
    hideSystemMessage()
  }, 1000)
}

// ============================================
// DEMOGRAPHIC DATA (STATE-AWARE)
// ============================================

// Reactive demographic data that updates when state changes
const demografiaData = ref<DemographicData | null>(null)

const demografiaEdad = computed(() => demografiaData.value?.edad || [])
const demografiaNSE = computed(() => demografiaData.value?.nse || [])
const demografiaGenero = computed(() => demografiaData.value?.genero || [])

// ============================================
// HISTORICAL DATA (STATE-AWARE)
// ============================================

// Reactive historical data that updates when state changes
const historicoData = ref<HistoricalRow[]>([])
const historico = computed(() => historicoData.value)

// Hierarchical filter state
const selectedMunicipio = ref<string | null>(null)
const selectedSeccion = ref<string | null>(null)

// Available options for dropdowns (computed based on state and selections)
const availableMunicipios = computed(() => {
  if (!selectedState.value) return []
  return getMunicipalitiesForDropdown(selectedState.value.id)
})

const availableSecciones = computed(() => {
  if (!selectedState.value || !selectedMunicipio.value) return []
  return getSeccionesForMunicipio(selectedState.value.id, selectedMunicipio.value)
})

// ============================================
// MICRO-TARGETING DATA (STATE-AWARE)
// ============================================

// Reactive segment data that updates when state/filters change
const segmentosData = ref<MicroTargetingSegment[]>([])

// Hierarchical filter state for micro-targeting
const selectedMunicipioMT = ref<string | null>(null)
const selectedSeccionMT = ref<string | null>(null)

// Available options for MT dropdowns
const availableMunicipiosMT = computed(() => {
  if (!selectedState.value) return []
  return getMunicipalitiesForDropdown(selectedState.value.id)
})

const availableSeccionesMT = computed(() => {
  if (!selectedState.value || !selectedMunicipioMT.value) return []
  return getSeccionesForMunicipio(selectedState.value.id, selectedMunicipioMT.value)
})

const segmentos = computed(() => segmentosData.value)

const historicoColumns = [
  { key: 'seccion', label: 'Seccion', sortable: true },
  { key: 'municipio', label: 'Municipio', sortable: true },
  { key: 'ano2018', label: '2018', sortable: true, align: 'right' as const },
  { key: 'ano2021', label: '2021', sortable: true, align: 'right' as const },
  { key: 'ano2024', label: '2024', sortable: true, align: 'right' as const },
  { key: 'tendencia', label: 'Tendencia', align: 'center' as const }
]

const formatNumber = (num: number): string => {
  return num.toLocaleString('es-MX')
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- System Message Toast -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="systemMessage"
        class="fixed top-4 right-4 z-50 px-4 py-3 bg-tyravex-secondary/20 border border-tyravex-secondary/30 rounded-lg backdrop-blur-sm"
      >
        <div class="flex items-center gap-3">
          <div class="animate-spin">
            <svg class="w-4 h-4 text-tyravex-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <span class="text-sm text-tyravex-secondary">{{ systemMessage }}</span>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Analytics</h1>
        <p class="text-tyravex-text-muted mt-1">
          Inteligencia geografica y demografica
        </p>
      </div>
      <div class="flex items-center gap-3">
        <select 
          :value="selectedState?.id || ''"
          @change="(e) => handleStateChange((e.target as HTMLSelectElement).value)"
          class="select w-48"
        >
          <option value="" disabled>Selecciona un estado</option>
          <option 
            v-for="option in stateOptions" 
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <button class="btn-primary" @click="handleExport">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <TerritorialBreadcrumb />

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
        <!-- Lock indicator for disabled modules -->
        <svg 
          v-if="!isModuleEnabled(tab.moduleKey)"
          class="w-3 h-3 ml-1 inline-block opacity-50" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </button>
    </div>

    <!-- Tab Content: Mapa Electoral -->
    <div v-if="activeTab === 'mapa'">
      <ModuleLockedPlaceholder 
        v-if="!isModuleEnabled('electoral_map')"
        module-name="Mapa Electoral"
      />
      <div v-else-if="!selectedState" class="text-center py-16">
        <svg class="w-20 h-20 mx-auto mb-4 text-tyravex-text-muted opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p class="text-tyravex-text-muted">Selecciona un estado para ver el mapa electoral</p>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Electoral Map -->
        <div class="lg:col-span-2">
          <Card title="Mapa Electoral" :no-padding="true">
            <div class="h-[600px]">
              <ElectoralMap />
            </div>
          </Card>
        </div>

        <!-- Municipality Detail Panel -->
        <div class="lg:col-span-1">
          <MunicipalityDetailPanel :municipality="selectedMunicipality" />
        </div>
      </div>
    </div>

    <!-- Tab Content: Demografia -->
    <div v-if="activeTab === 'demografia'">
      <ModuleLockedPlaceholder 
        v-if="!isModuleEnabled('demographics')"
        module-name="Demografía"
      />
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Distribucion por edad -->
        <Card title="Distribucion por Edad">
          <div class="space-y-4">
            <div
              v-for="grupo in demografiaEdad"
              :key="grupo.grupo"
              class="flex items-center gap-4"
            >
              <div class="w-16 text-sm text-tyravex-text-secondary">{{ grupo.grupo }}</div>
              <div class="flex-1">
                <ProgressBar :value="grupo.porcentaje" variant="primary" />
              </div>
              <div class="w-20 text-right">
                <span class="text-sm font-mono text-tyravex-text-primary">{{ grupo.porcentaje }}%</span>
                <span class="text-xs text-tyravex-text-muted block">{{ formatNumber(grupo.total) }}</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Distribucion por NSE -->
        <Card title="Nivel Socioeconomico">
          <div class="space-y-4">
            <div
              v-for="nivel in demografiaNSE"
              :key="nivel.nivel"
              class="flex items-center gap-4"
            >
              <div class="w-28 text-sm text-tyravex-text-secondary">{{ nivel.nivel }}</div>
              <div class="flex-1">
                <div class="h-2 bg-tyravex-bg-tertiary rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :style="{ width: `${nivel.porcentaje}%`, backgroundColor: nivel.color }"
                  />
                </div>
              </div>
              <div class="w-12 text-right text-sm font-mono text-tyravex-text-primary">{{ nivel.porcentaje }}%</div>
            </div>
          </div>

          <!-- Grafico de dona visual -->
          <div class="mt-6 flex items-center justify-center">
            <div class="relative w-40 h-40">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  v-for="(nivel, index) in demografiaNSE"
                  :key="nivel.nivel"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  :stroke="nivel.color"
                  stroke-width="20"
                  :stroke-dasharray="`${nivel.porcentaje * 2.51} 251`"
                  :stroke-dashoffset="-demografiaNSE.slice(0, index).reduce((acc, n) => acc + n.porcentaje * 2.51, 0)"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <span class="text-2xl font-bold text-tyravex-text-primary">765K</span>
                  <span class="text-xs text-tyravex-text-muted block">Votantes</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <!-- Distribucion por genero -->
        <Card title="Distribucion por Genero" class="lg:col-span-2">
          <div class="flex items-center justify-center gap-8">
            <div
              v-for="genero in demografiaGenero"
              :key="genero.genero"
              class="text-center"
            >
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center mb-3"
                :class="genero.genero === 'Hombres' ? 'bg-blue-500/20' : 'bg-pink-500/20'"
              >
                <span class="text-3xl font-bold font-mono" :class="genero.genero === 'Hombres' ? 'text-blue-400' : 'text-pink-400'">
                  {{ genero.porcentaje }}%
                </span>
              </div>
              <p class="text-sm text-tyravex-text-secondary">{{ genero.genero }}</p>
              <p class="text-xs text-tyravex-text-muted mt-1">{{ formatNumber(genero.total) }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Tab Content: Historico -->
    <div v-if="activeTab === 'historico'">
      <ModuleLockedPlaceholder 
        v-if="!isModuleEnabled('historical')"
        module-name="Histórico"
      />
      <Card v-else title="Resultados Historicos por Seccion">
        <template #actions>
          <div class="flex items-center gap-2">
            <!-- Municipio Dropdown (first filter) -->
            <select 
              v-model="selectedMunicipio"
              class="select input-sm w-48"
              :disabled="!selectedState"
            >
              <option :value="null">Todos los municipios</option>
              <option v-for="mun in availableMunicipios" :key="mun" :value="mun">
                {{ mun }}
              </option>
            </select>

            <!-- Sección Dropdown (dependent on municipio) -->
            <select 
              v-model="selectedSeccion"
              class="select input-sm w-36"
              :disabled="!selectedMunicipio"
            >
              <option :value="null">Todas las secciones</option>
              <option v-for="sec in availableSecciones" :key="sec" :value="sec">
                {{ sec }}
              </option>
            </select>
          </div>
        </template>

        <DataTable
          :columns="historicoColumns"
          :data="historico"
          :rows-per-page="10"
        >
          <template #cell-ano2018="{ value }">
            <span class="font-mono">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-ano2021="{ value }">
            <span class="font-mono">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-ano2024="{ value }">
            <span class="font-mono font-medium">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-tendencia="{ value }">
            <div class="flex items-center justify-center">
              <svg
                v-if="value === 'up'"
                class="w-5 h-5 text-tyravex-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-tyravex-danger"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </template>
        </DataTable>
      </Card>
    </div>

    <!-- Tab Content: Micro-Targeting -->
    <div v-if="activeTab === 'targeting'">
      <ModuleLockedPlaceholder 
        v-if="!isModuleEnabled('micro_targeting')"
        module-name="Micro-Targeting"
      />
      <div v-else>
        <!-- Hierarchical Filters -->
        <div class="mb-6 flex items-center gap-3">
          <!-- Municipio Dropdown -->
          <select 
            v-model="selectedMunicipioMT"
            class="select input-sm w-48"
            :disabled="!selectedState"
          >
            <option :value="null">Todos los municipios</option>
            <option v-for="mun in availableMunicipiosMT" :key="mun" :value="mun">
              {{ mun }}
            </option>
          </select>

          <!-- Sección Dropdown -->
          <select 
            v-model="selectedSeccionMT"
            class="select input-sm w-36"
            :disabled="!selectedMunicipioMT"
          >
            <option :value="null">Todas las secciones</option>
            <option v-for="sec in availableSeccionesMT" :key="sec" :value="sec">
              {{ sec }}
            </option>
          </select>
        </div>

        <!-- Segment Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          v-for="segmento in segmentos"
          :key="segmento.id"
          :title="segmento.nombre"
          :class="{ 'opacity-75': segmento.locked }"
        >
          <template #actions>
            <span 
              v-if="segmento.locked"
              class="text-xs px-2 py-1 rounded bg-tyravex-danger/20 text-tyravex-danger font-medium"
            >
              🔒 Bloqueado
            </span>
            <Badge 
              v-else
              :variant="segmento.potencial === 'Alto' ? 'success' : 'warning'"
            >
              Potencial {{ segmento.potencial }}
            </Badge>
          </template>

          <div class="space-y-4">
            <p class="text-sm text-tyravex-text-muted">{{ segmento.descripcion }}</p>

            <div class="flex items-center justify-between p-3 rounded-lg bg-tyravex-bg-tertiary">
              <span class="text-sm text-tyravex-text-muted">Tamaño del segmento</span>
              <span 
                class="text-lg font-bold font-mono text-tyravex-text-primary"
                :class="{ 'blur-sm select-none': segmento.locked }"
              >
                {{ segmento.locked ? '█████' : formatNumber(segmento.tamano) }}
              </span>
            </div>

            <div class="p-3 rounded-lg border border-tyravex-secondary/30 bg-tyravex-secondary/5">
              <p class="text-xs text-tyravex-secondary font-medium mb-1">Mensaje sugerido</p>
              <p 
                class="text-sm text-tyravex-text-secondary"
                :class="{ 'blur-sm select-none': segmento.locked }"
              >
                {{ segmento.locked ? 'Contenido bloqueado. Actualiza tu plan para acceder.' : segmento.mensajeSugerido }}
              </p>
            </div>

            <button 
              class="btn-outline w-full"
              :disabled="segmento.locked"
              :class="{ 'opacity-50 cursor-not-allowed': segmento.locked }"
            >
              {{ segmento.locked ? '🔒 Desbloquear segmento' : 'Ver análisis detallado' }}
            </button>
          </div>
        </Card>
      </div>
      </div>
    </div>
  </div>
</template>
