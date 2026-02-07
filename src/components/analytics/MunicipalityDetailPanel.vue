<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import type { Municipality } from '@/types/analytics'

// ============================================
// PROPS
// ============================================

interface Props {
  municipality: Municipality | null
}

const props = defineProps<Props>()

// ============================================
// COMPUTED
// ============================================

const riesgoVariant = computed(() => {
  if (!props.municipality) return 'default'
  switch (props.municipality.riesgoPolitico) {
    case 'bajo': return 'success'
    case 'medio': return 'warning'
    case 'alto': return 'danger'
    default: return 'default'
  }
})

const fuerzaVariant = computed(() => {
  if (!props.municipality) return 'default'
  const fuerza = props.municipality.fuerzaElectoral
  if (fuerza > 60) return 'success'
  if (fuerza >= 40) return 'warning'
  return 'danger'
})

const formatNumber = (num: number | undefined): string => {
  if (!num) return 'N/A'
  return num.toLocaleString('es-MX')
}
</script>

<template>
  <!-- Empty State -->
  <Card v-if="!municipality" title="Selecciona un municipio">
    <div class="text-center py-12 text-tyravex-text-muted">
      <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
      <p class="text-sm">Haz clic en un municipio para ver detalles</p>
    </div>
  </Card>

  <!-- Municipality Details -->
  <Card v-else :title="municipality.name">
    <template #actions>
      <Badge variant="default" class="capitalize">
        {{ municipality.type }}
      </Badge>
    </template>

    <div class="space-y-6">
      <!-- Fuerza Electoral -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-tyravex-text-muted">Fuerza Electoral</span>
          <span class="text-2xl font-bold font-mono text-tyravex-text-primary">
            {{ municipality.fuerzaElectoral }}%
          </span>
        </div>
        <ProgressBar
          :value="municipality.fuerzaElectoral"
          :variant="fuerzaVariant"
          size="lg"
        />
        <p class="text-xs text-tyravex-text-muted mt-1">
          <template v-if="municipality.fuerzaElectoral > 60">
            Territorio con fuerza electoral alta
          </template>
          <template v-else-if="municipality.fuerzaElectoral >= 40">
            Territorio competido
          </template>
          <template v-else>
            Territorio con fuerza electoral baja
          </template>
        </p>
      </div>

      <!-- Riesgo Político -->
      <div class="p-4 rounded-lg bg-tyravex-bg-tertiary">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-tyravex-text-muted">Riesgo Político</span>
          <Badge :variant="riesgoVariant" class="capitalize">
            {{ municipality.riesgoPolitico }}
          </Badge>
        </div>
        <p class="text-xs text-tyravex-text-muted">
          Nivel de riesgo basado en análisis territorial
        </p>
      </div>

      <!-- Tendencia -->
      <div class="flex items-center justify-between p-4 rounded-lg bg-tyravex-bg-tertiary">
        <span class="text-sm text-tyravex-text-muted">Tendencia Electoral</span>
        <div class="flex items-center gap-2">
          <svg
            v-if="municipality.tendencia === 'up'"
            class="w-5 h-5 text-tyravex-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <svg
            v-else-if="municipality.tendencia === 'down'"
            class="w-5 h-5 text-tyravex-danger"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-tyravex-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
          <span class="text-sm text-tyravex-text-primary capitalize">
            {{ municipality.tendencia === 'up' ? 'Ascendente' : municipality.tendencia === 'down' ? 'Descendente' : 'Estable' }}
          </span>
        </div>
      </div>

      <!-- Población (si está disponible) -->
      <div v-if="municipality.poblacion" class="flex items-center justify-between text-sm">
        <span class="text-tyravex-text-muted">Población</span>
        <span class="text-tyravex-text-primary font-mono">{{ formatNumber(municipality.poblacion) }}</span>
      </div>

      <!-- Divider -->
      <div class="border-t border-tyravex-border pt-6">
        <p class="text-xs text-tyravex-text-muted mb-4">Acciones disponibles</p>
        
        <!-- Action Buttons (disabled for now) -->
        <div class="space-y-2">
          <button class="btn-outline w-full" disabled>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ver Demografía
          </button>
          <button class="btn-outline w-full" disabled>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ver Histórico
          </button>
          <button class="btn-outline w-full" disabled>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Crear Estrategia
          </button>
        </div>
        
        <p class="text-xs text-tyravex-text-muted mt-3 text-center">
          Próximamente disponible
        </p>
      </div>
    </div>
  </Card>
</template>
