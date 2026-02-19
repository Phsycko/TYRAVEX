<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Inconsistencia } from '@/types/research'

interface Props {
  inconsistencies: Inconsistencia[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'detect-new'): void
  (e: 'configure'): void
  (e: 'export-all'): void
  (e: 'generate-materials', id: string): void
}>()

const selectedSeverity = ref<string>('all')

const filteredInconsistencies = computed(() => {
  if (selectedSeverity.value === 'all') return props.inconsistencies
  return props.inconsistencies.filter(i => i.severidad === selectedSeverity.value)
})

const criticalCount = computed(() =>
  props.inconsistencies.filter(i => i.severidad === 'critical').length
)

const highCount = computed(() =>
  props.inconsistencies.filter(i => i.severidad === 'high').length
)

const mediumCount = computed(() =>
  props.inconsistencies.filter(i => i.severidad === 'medium').length
)

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return { bg: 'bg-[#D32F2F]/10', border: 'border-[#D32F2F]/30', text: 'text-[#D32F2F]', badge: 'bg-[#D32F2F]' }
    case 'high': return { bg: 'bg-[#FF6B35]/10', border: 'border-[#FF6B35]/30', text: 'text-[#FF6B35]', badge: 'bg-[#FF6B35]' }
    case 'medium': return { bg: 'bg-[#FA8C16]/10', border: 'border-[#FA8C16]/30', text: 'text-[#FA8C16]', badge: 'bg-[#FA8C16]' }
    default: return { bg: 'bg-[#9AA0A6]/10', border: 'border-[#9AA0A6]/30', text: 'text-[#9AA0A6]', badge: 'bg-[#9AA0A6]' }
  }
}

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case 'critical': return 'CRÍTICA'
    case 'high': return 'ALTA'
    case 'medium': return 'MEDIA'
    case 'low': return 'BAJA'
    default: return severity.toUpperCase()
  }
}

const expandedId = ref<string | null>(null)
</script>

<template>
  <div class="space-y-6">
    <!-- Header Dashboard -->
    <div class="bg-[#1A2332] border border-white/8 rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-[#E8EAED]">Inconsistencias Detectadas por IA</h2>
            <div class="flex items-center gap-1.5 px-2 py-1 bg-[#722ED1]/20 border border-[#722ED1]/30 rounded-full">
              <svg class="w-3.5 h-3.5 text-[#722ED1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span class="text-xs font-medium text-[#722ED1]">Última análisis: Hoy</span>
            </div>
          </div>
          <p class="text-sm text-[#9AA0A6] mt-1">
            Total: {{ inconsistencies.length }} inconsistencias | 
            <span class="text-[#D32F2F]">{{ criticalCount }} críticas</span> | 
            <span class="text-[#FF6B35]">{{ highCount }} altas</span> | 
            <span class="text-[#FA8C16]">{{ mediumCount }} medias</span>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="emit('detect-new')"
            class="px-4 py-2 bg-[#722ED1] hover:bg-[#8B3FE8] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Detectar nuevas
          </button>
          <button
            @click="emit('configure')"
            class="p-2 hover:bg-[#141B22] rounded-lg transition-colors"
            title="Configurar análisis"
          >
            <svg class="w-5 h-5 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button
            @click="emit('export-all')"
            class="p-2 hover:bg-[#141B22] rounded-lg transition-colors"
            title="Exportar todas"
          >
            <svg class="w-5 h-5 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Filter -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-[#9AA0A6]">Filtrar por severidad:</span>
        <button
          @click="selectedSeverity = 'all'"
          class="px-3 py-1 text-xs font-medium rounded-lg transition-colors"
          :class="selectedSeverity === 'all' ? 'bg-[#4A90E2] text-white' : 'bg-[#141B22] text-[#9AA0A6] hover:bg-[#1A2332]'"
        >
          Todas ({{ inconsistencies.length }})
        </button>
        <button
          @click="selectedSeverity = 'critical'"
          class="px-3 py-1 text-xs font-medium rounded-lg transition-colors"
          :class="selectedSeverity === 'critical' ? 'bg-[#D32F2F] text-white' : 'bg-[#141B22] text-[#9AA0A6] hover:bg-[#1A2332]'"
        >
          Críticas ({{ criticalCount }})
        </button>
        <button
          @click="selectedSeverity = 'high'"
          class="px-3 py-1 text-xs font-medium rounded-lg transition-colors"
          :class="selectedSeverity === 'high' ? 'bg-[#FF6B35] text-white' : 'bg-[#141B22] text-[#9AA0A6] hover:bg-[#1A2332]'"
        >
          Altas ({{ highCount }})
        </button>
        <button
          @click="selectedSeverity = 'medium'"
          class="px-3 py-1 text-xs font-medium rounded-lg transition-colors"
          :class="selectedSeverity === 'medium' ? 'bg-[#FA8C16] text-white' : 'bg-[#141B22] text-[#9AA0A6] hover:bg-[#1A2332]'"
        >
          Medias ({{ mediumCount }})
        </button>
      </div>
    </div>

    <!-- Inconsistency Cards -->
    <div class="space-y-4">
      <div
        v-for="inconsistency in filteredInconsistencies"
        :key="inconsistency.id"
        class="bg-[#1A2332] border rounded-lg overflow-hidden"
        :class="[getSeverityColor(inconsistency.severidad).border, getSeverityColor(inconsistency.severidad).bg]"
      >
        <div class="p-6">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" :class="getSeverityColor(inconsistency.severidad).bg">
              <svg class="w-6 h-6" :class="getSeverityColor(inconsistency.severidad).text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div class="flex-1">
              <!-- Header -->
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-lg font-semibold text-[#E8EAED]">{{ inconsistency.tema }}</h3>
                    <span class="px-2 py-0.5 text-xs font-bold rounded-full" :class="[getSeverityColor(inconsistency.severidad).badge, 'text-white']">
                      {{ getSeverityLabel(inconsistency.severidad) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-4 text-xs text-[#9AA0A6]">
                    <span>Confianza IA: <span class="font-mono font-semibold text-[#722ED1]">{{ inconsistency.confianzaIA }}%</span></span>
                    <span>Impacto electoral: <span class="font-mono font-semibold" :class="getSeverityColor(inconsistency.severidad).text">{{ inconsistency.impactoElectoral.toFixed(1) }}</span></span>
                  </div>
                </div>
              </div>

              <!-- Positions comparison -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="p-4 bg-[#141B22] rounded-lg border border-white/8">
                  <p class="text-xs text-[#9AA0A6] mb-2">📅 {{ inconsistency.fecha1 }} | {{ inconsistency.fuente1 }}</p>
                  <p class="text-sm text-[#E8EAED] font-medium mb-2">{{ inconsistency.posicion1 }}</p>
                  <p class="text-xs text-[#9AA0A6]">{{ inconsistency.evidencia1.contexto }}</p>
                  <p v-if="inconsistency.evidencia1.cita" class="text-xs text-[#4A90E2] mt-2 italic">"{{ inconsistency.evidencia1.cita }}"</p>
                </div>
                <div class="p-4 bg-[#141B22] rounded-lg border border-white/8">
                  <p class="text-xs text-[#9AA0A6] mb-2">📅 {{ inconsistency.fecha2 }} | {{ inconsistency.fuente2 }}</p>
                  <p class="text-sm text-[#E8EAED] font-medium mb-2">{{ inconsistency.posicion2 }}</p>
                  <p class="text-xs text-[#9AA0A6]">{{ inconsistency.evidencia2.contexto }}</p>
                  <p v-if="inconsistency.evidencia2.cita" class="text-xs text-[#4A90E2] mt-2 italic">"{{ inconsistency.evidencia2.cita }}"</p>
                </div>
              </div>

              <!-- AI Analysis (expandable) -->
              <button
                @click="expandedId = expandedId === inconsistency.id ? null : inconsistency.id"
                class="w-full p-3 bg-[#722ED1]/10 border border-[#722ED1]/30 rounded-lg hover:bg-[#722ED1]/20 transition-colors text-left"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-[#722ED1]">🤖 Análisis de IA</span>
                  <svg
                    class="w-4 h-4 text-[#722ED1] transition-transform"
                    :class="{ 'rotate-180': expandedId === inconsistency.id }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div v-if="expandedId === inconsistency.id" class="mt-3 p-4 bg-[#141B22] rounded-lg border border-white/8 space-y-3">
                <div>
                  <p class="text-xs font-medium text-[#9AA0A6] mb-1">Patrón detectado:</p>
                  <p class="text-sm text-[#E8EAED]">{{ inconsistency.analisisIA.patron }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#9AA0A6] mb-1">Contexto adicional:</p>
                  <ul class="space-y-1">
                    <li v-for="(contexto, idx) in inconsistency.analisisIA.contextoAdicional" :key="idx" class="text-xs text-[#E8EAED] flex items-start gap-2">
                      <span class="text-[#722ED1]">•</span>
                      <span>{{ contexto }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#9AA0A6] mb-2">Factores influyentes:</p>
                  <div class="space-y-1.5">
                    <div v-for="factor in inconsistency.analisisIA.factoresInfluyentes" :key="factor.factor" class="flex items-center gap-2">
                      <span class="text-xs text-[#E8EAED] flex-1">{{ factor.factor }}</span>
                      <div class="flex-1 h-1.5 bg-[#0B0E11] rounded-full overflow-hidden">
                        <div class="h-full bg-[#722ED1] rounded-full" :style="{ width: `${factor.peso * 100}%` }" />
                      </div>
                      <span class="text-xs font-mono text-[#722ED1]">{{ (factor.peso * 100).toFixed(0) }}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Strategic recommendations -->
              <div class="mt-4 p-4 bg-[#4A90E2]/10 border border-[#4A90E2]/30 rounded-lg">
                <p class="text-xs font-semibold text-[#4A90E2] mb-2">ESTRATEGIA SUGERIDA (Prioridad: {{ inconsistency.estrategiaSugerida.prioridad.toUpperCase() }})</p>
                <ul class="space-y-1 mb-3">
                  <li v-for="(accion, idx) in inconsistency.estrategiaSugerida.acciones" :key="idx" class="text-xs text-[#E8EAED] flex items-start gap-2">
                    <span class="text-[#52C41A]">✓</span>
                    <span>{{ accion }}</span>
                  </li>
                </ul>
                <p class="text-xs text-[#9AA0A6]">Timing óptimo: <span class="text-[#E8EAED]">{{ inconsistency.estrategiaSugerida.momentoOptimo }}</span></p>
              </div>

              <!-- Action buttons -->
              <div class="flex items-center gap-2 mt-4">
                <button
                  @click="emit('generate-materials', inconsistency.id)"
                  class="px-4 py-2 bg-[#4A90E2] hover:bg-[#5BA3F5] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Generar materiales
                </button>
                <button class="px-4 py-2 bg-[#141B22] hover:bg-[#1A2332] text-[#E8EAED] text-sm font-medium rounded-lg transition-colors border border-white/8">
                  Compartir con equipo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
