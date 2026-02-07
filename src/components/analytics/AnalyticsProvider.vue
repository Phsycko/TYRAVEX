<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, provide, onMounted, toRaw } from 'vue'
import { ANALYTICS_CONTEXT_KEY } from '@/composables/useAnalytics'
import { 
  MEXICO_STATES,
  createModulePermissions,
  type State, 
  type Municipality,
  type AnalyticsContext,
  type AnalyticsModuleKey
} from '@/types/analytics'

// ============================================
// STATE MANAGEMENT
// ============================================

// Estado seleccionado actualmente
const selectedState = ref<State | null>(null)

// Municipio seleccionado actualmente
const selectedMunicipality = ref<Municipality | null>(null)

// Estados habilitados para el cliente
// CAMBIO: Ahora todos los 32 estados están disponibles
const enabledStates = ref<State[]>(MEXICO_STATES)

// Módulos habilitados (placeholder: configuración de desarrollo)
const enabledModules = ref(createModulePermissions([
  'electoral_map',
  'demographics',
  'historical',
  'micro_targeting'
]))

// ============================================
// METHODS
// ============================================

// Cambiar el estado seleccionado
const setSelectedState = (state: State | null) => {
  selectedState.value = state
  
  // IMPORTANTE: Al cambiar de estado, resetear el municipio seleccionado
  selectedMunicipality.value = null
  
  console.log('[Analytics Context] Estado seleccionado:', state?.name || 'ninguno')
  console.log('[Analytics Context] Municipio reseteado a null')
}

// Cambiar el municipio seleccionado
const setSelectedMunicipality = (municipality: Municipality | null) => {
  selectedMunicipality.value = municipality
  console.log('[Analytics Context] Municipio seleccionado:', municipality?.name || 'ninguno')
}

// Verificar si un módulo está habilitado
const isModuleEnabled = (module: AnalyticsModuleKey): boolean => {
  return enabledModules.value[module]
}

// ============================================
// BACKEND INTEGRATION POINT
// ============================================

// TODO: Cargar configuración del cliente desde el backend
// Endpoint esperado: GET /v1/analytics/client/config
// Respuesta: { clientId, enabledStates, enabledModules }
onMounted(async () => {
  // PLACEHOLDER: Configuración de desarrollo
  // En producción, descomentar y conectar con backend real
  
  // try {
  //   const response = await fetch('/v1/analytics/client/config')
  //   const config: ClientConfig = await response.json()
  //   
  //   // Actualizar estados habilitados
  //   enabledStates.value = getStatesByIds(config.enabledStates)
  //   
  //   // Actualizar módulos habilitados
  //   enabledModules.value = createModulePermissions(config.enabledModules)
  //   
  //   console.log('[Analytics Context] Configuración cargada:', config)
  // } catch (error) {
  //   console.error('[Analytics Context] Error cargando configuración:', error)
  //   // Fallback a configuración de desarrollo
  //   enabledStates.value = MEXICO_STATES
  //   enabledModules.value = createModulePermissions([
  //     'electoral_map', 'demographics', 'historical', 'micro_targeting'
  //   ])
  // }
  
  // Configuración de desarrollo (PLACEHOLDER)
  // CAMBIO: Todos los estados habilitados (32 estados)
  enabledStates.value = MEXICO_STATES
  
  // Todos los módulos habilitados para desarrollo
  enabledModules.value = createModulePermissions([
    'electoral_map',
    'demographics',
    'historical',
    'micro_targeting'
  ])
  
  console.log('[Analytics Context] Configuración de desarrollo cargada')
  console.log(`  - Estados habilitados: ${enabledStates.value.length} estados (todos)`)
  console.log('  - Módulos habilitados: todos')
})

// ============================================
// PROVIDE CONTEXT
// ============================================

const context: AnalyticsContext = {
  get selectedState() { return toRaw(selectedState.value) },
  get selectedMunicipality() { return toRaw(selectedMunicipality.value) },
  get enabledStates() { return toRaw(enabledStates.value) },
  get enabledModules() { return toRaw(enabledModules.value) },
  setSelectedState,
  setSelectedMunicipality,
  isModuleEnabled
}

provide(ANALYTICS_CONTEXT_KEY, context)
</script>
