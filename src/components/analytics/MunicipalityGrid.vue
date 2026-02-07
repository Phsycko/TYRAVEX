<script setup lang="ts">
import { computed } from 'vue'
import type { Municipality } from '@/types/analytics'

// ============================================
// PROPS
// ============================================

interface Props {
  municipalities: Municipality[]
  selectedMunicipalityId?: string | null
}

const props = defineProps<Props>()

// ============================================
// EMITS
// ============================================

const emit = defineEmits<{
  selectMunicipality: [municipality: Municipality]
}>()

// ============================================
// COLOR CODING
// ============================================

const getMunicipalityColor = (fuerza: number) => {
  if (fuerza > 60) return 'bg-tyravex-electoral-strong'
  if (fuerza >= 40) return 'bg-tyravex-electoral-medium'
  return 'bg-tyravex-electoral-weak'
}

const getMunicipalityTextColor = (fuerza: number) => {
  if (fuerza > 60) return 'text-tyravex-electoral-strong'
  if (fuerza >= 40) return 'text-tyravex-electoral-medium'
  return 'text-tyravex-electoral-weak'
}

// ============================================
// HANDLERS
// ============================================

const handleMunicipalityClick = (municipality: Municipality) => {
  if (municipality.isLocked) {
    // No hacer nada si está bloqueado
    return
  }
  emit('selectMunicipality', municipality)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div
      v-for="municipality in municipalities"
      :key="municipality.id"
      class="relative group"
    >
      <!-- Municipality Card -->
      <button
        class="w-full p-4 rounded-lg transition-all duration-200"
        :class="[
          getMunicipalityColor(municipality.fuerzaElectoral),
          municipality.isLocked
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:scale-105 hover:shadow-lg cursor-pointer',
          selectedMunicipalityId === municipality.id
            ? 'ring-2 ring-white ring-offset-2 ring-offset-tyravex-bg-primary'
            : ''
        ]"
        :disabled="municipality.isLocked"
        @click="handleMunicipalityClick(municipality)"
      >
        <!-- Lock Icon Overlay -->
        <div
          v-if="municipality.isLocked"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="bg-tyravex-bg-primary/80 backdrop-blur-sm rounded-full p-3">
            <svg
              class="w-6 h-6 text-tyravex-text-muted animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div :class="{ 'blur-sm': municipality.isLocked }">
          <h3 class="text-white font-semibold text-sm mb-2 text-center">
            {{ municipality.name }}
          </h3>
          <div class="text-white/90 text-2xl font-bold font-mono text-center">
            {{ municipality.fuerzaElectoral }}%
          </div>
        </div>
      </button>

      <!-- Tooltip (hover) -->
      <div
        v-if="!municipality.isLocked"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-tyravex-bg-secondary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
      >
        <div class="text-xs space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-tyravex-text-muted">Fuerza:</span>
            <span :class="getMunicipalityTextColor(municipality.fuerzaElectoral)" class="font-mono font-bold">
              {{ municipality.fuerzaElectoral }}%
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-tyravex-text-muted">Riesgo:</span>
            <span
              :class="{
                'text-tyravex-success': municipality.riesgoPolitico === 'bajo',
                'text-tyravex-warning': municipality.riesgoPolitico === 'medio',
                'text-tyravex-danger': municipality.riesgoPolitico === 'alto'
              }"
              class="capitalize"
            >
              {{ municipality.riesgoPolitico }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-tyravex-text-muted">Tendencia:</span>
            <svg
              v-if="municipality.tendencia === 'up'"
              class="w-4 h-4 text-tyravex-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg
              v-else-if="municipality.tendencia === 'down'"
              class="w-4 h-4 text-tyravex-danger"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span v-else class="text-tyravex-text-secondary">—</span>
          </div>
        </div>
      </div>

      <!-- Locked Tooltip -->
      <div
        v-else
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-tyravex-bg-secondary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
      >
        <div class="text-xs text-tyravex-text-muted">
          Disponible en módulo territorial avanzado
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="municipalities.length === 0"
      class="col-span-full text-center py-12 text-tyravex-text-muted"
    >
      <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
      <p>No hay municipios disponibles</p>
    </div>
  </div>
</template>
