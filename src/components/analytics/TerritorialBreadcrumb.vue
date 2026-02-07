<script setup lang="ts">
import { computed } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

// ============================================
// ANALYTICS CONTEXT
// ============================================

const analytics = useAnalytics()

// Use computed to maintain reactivity
const selectedState = computed(() => analytics.selectedState)
const selectedMunicipality = computed(() => analytics.selectedMunicipality)

// ============================================
// BREADCRUMB SEGMENTS
// ============================================

const breadcrumbs = computed(() => {
  const segments = [
    { label: 'México', level: 'country' as const, clickable: false }
  ]

  if (selectedState.value) {
    segments.push({
      label: selectedState.value.name,
      level: 'state' as const,
      clickable: !!selectedMunicipality.value // Solo clickable si hay municipio seleccionado
    })
  }

  if (selectedMunicipality.value) {
    segments.push({
      label: selectedMunicipality.value.name,
      level: 'municipality' as const,
      clickable: false
    })
  }

  return segments
})

// ============================================
// HANDLERS
// ============================================

const handleBreadcrumbClick = (level: 'country' | 'state' | 'municipality') => {
  if (level === 'state' && selectedMunicipality.value) {
    // Click en estado cuando hay municipio seleccionado → resetear municipio
    analytics.setSelectedMunicipality(null)
  }
  // Click en "México" no hace nada por ahora (futuro: vista país)
}
</script>

<template>
  <nav class="flex items-center gap-2 text-sm text-tyravex-text-muted">
    <template v-for="(segment, index) in breadcrumbs" :key="segment.level">
      <!-- Separator -->
      <svg
        v-if="index > 0"
        class="w-4 h-4 text-tyravex-text-muted/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>

      <!-- Breadcrumb segment -->
      <button
        v-if="segment.clickable"
        class="hover:text-tyravex-secondary transition-colors"
        @click="handleBreadcrumbClick(segment.level)"
      >
        {{ segment.label }}
      </button>
      <span
        v-else
        :class="{
          'text-tyravex-text-primary font-medium': index === breadcrumbs.length - 1,
          'text-tyravex-text-muted': index < breadcrumbs.length - 1
        }"
      >
        {{ segment.label }}
      </span>
    </template>
  </nav>
</template>
