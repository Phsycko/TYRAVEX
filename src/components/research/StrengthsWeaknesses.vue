<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Fortaleza, Debilidad } from '@/types/research'

interface Props {
  fortalezas: Fortaleza[]
  debilidades: Debilidad[]
}

const props = defineProps<Props>()

const impactoTotalFortalezas = computed(() =>
  props.fortalezas.reduce((sum, f) => sum + f.impactoElectoral, 0)
)

const impactoTotalDebilidades = computed(() =>
  props.debilidades.reduce((sum, d) => sum + d.impactoElectoral, 0)
)

const balanceNeto = computed(() =>
  impactoTotalFortalezas.value + impactoTotalDebilidades.value
)

const expandedFortaleza = ref<string | null>(null)
const expandedDebilidad = ref<string | null>(null)
</script>

<template>
  <div class="bg-[#1A2332] border border-white/8 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-[#E8EAED] mb-6">Análisis de Fortalezas y Debilidades</h3>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- FORTALEZAS -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-[#52C41A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <h4 class="text-sm font-semibold text-[#52C41A]">FORTALEZAS</h4>
          <span class="ml-auto text-xs text-[#9AA0A6]">{{ fortalezas.length }} identificadas</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(fortaleza, index) in fortalezas"
            :key="index"
            class="bg-[#141B22] border border-[#52C41A]/20 rounded-lg overflow-hidden"
          >
            <button
              @click="expandedFortaleza = expandedFortaleza === fortaleza.titulo ? null : fortaleza.titulo"
              class="w-full p-4 text-left hover:bg-[#1A2332] transition-colors"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#52C41A]" />
                    <h5 class="text-sm font-medium text-[#E8EAED]">{{ fortaleza.titulo }}</h5>
                  </div>
                  <p class="text-xs text-[#9AA0A6]">{{ fortaleza.descripcion }}</p>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="text-lg font-bold font-mono text-[#52C41A]">{{ fortaleza.score }}/10</span>
                  <span class="text-xs font-medium text-[#52C41A]">+{{ fortaleza.impactoElectoral.toFixed(1) }}%</span>
                </div>
              </div>
            </button>

            <div
              v-if="expandedFortaleza === fortaleza.titulo"
              class="px-4 pb-4 space-y-3 border-t border-white/8"
            >
              <div class="pt-3">
                <p class="text-xs font-medium text-[#9AA0A6] mb-1">Evidencia:</p>
                <ul class="list-disc list-inside text-xs text-[#E8EAED] space-y-1">
                  <li v-for="(ev, idx) in fortaleza.evidencia" :key="idx">{{ ev }}</li>
                </ul>
              </div>
              <div>
                <p class="text-xs font-medium text-[#9AA0A6] mb-1">Estrategia de mitigación:</p>
                <p class="text-xs text-[#E8EAED]">{{ fortaleza.estrategiaMitigacion }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 p-3 bg-[#52C41A]/10 border border-[#52C41A]/30 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-[#52C41A]">IMPACTO TOTAL</span>
            <span class="text-lg font-bold font-mono text-[#52C41A]">+{{ impactoTotalFortalezas.toFixed(1) }}%</span>
          </div>
        </div>
      </div>

      <!-- DEBILIDADES -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <h4 class="text-sm font-semibold text-[#D32F2F]">DEBILIDADES</h4>
          <span class="ml-auto text-xs text-[#9AA0A6]">{{ debilidades.length }} identificadas</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(debilidad, index) in debilidades"
            :key="index"
            class="bg-[#141B22] border border-[#D32F2F]/20 rounded-lg overflow-hidden"
          >
            <button
              @click="expandedDebilidad = expandedDebilidad === debilidad.titulo ? null : debilidad.titulo"
              class="w-full p-4 text-left hover:bg-[#1A2332] transition-colors"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                    <h5 class="text-sm font-medium text-[#E8EAED]">{{ debilidad.titulo }}</h5>
                  </div>
                  <p class="text-xs text-[#9AA0A6]">{{ debilidad.descripcion }}</p>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="text-lg font-bold font-mono text-[#D32F2F]">{{ debilidad.score }}/10</span>
                  <span class="text-xs font-medium text-[#D32F2F]">{{ debilidad.impactoElectoral.toFixed(1) }}%</span>
                </div>
              </div>
            </button>

            <div
              v-if="expandedDebilidad === debilidad.titulo"
              class="px-4 pb-4 space-y-3 border-t border-white/8"
            >
              <div class="pt-3">
                <p class="text-xs font-medium text-[#9AA0A6] mb-1">Evidencia:</p>
                <ul class="list-disc list-inside text-xs text-[#E8EAED] space-y-1">
                  <li v-for="(ev, idx) in debilidad.evidencia" :key="idx">{{ ev }}</li>
                </ul>
              </div>
              <div>
                <p class="text-xs font-medium text-[#9AA0A6] mb-1">Estrategia de explotación:</p>
                <p class="text-xs text-[#E8EAED]">{{ debilidad.estrategiaExplotacion }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 p-3 bg-[#D32F2F]/10 border border-[#D32F2F]/30 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-[#D32F2F]">IMPACTO TOTAL</span>
            <span class="text-lg font-bold font-mono text-[#D32F2F]">{{ impactoTotalDebilidades.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Balance neto -->
    <div class="mt-6 p-4 bg-[#141B22] border border-white/8 rounded-lg">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-[#9AA0A6] mb-1">Balance neto:</p>
          <p class="text-sm text-[#E8EAED]">
            <span :class="balanceNeto > 0 ? 'text-[#52C41A]' : 'text-[#D32F2F]'">
              {{ balanceNeto > 0 ? '+' : '' }}{{ balanceNeto.toFixed(1) }}%
            </span>
            {{ balanceNeto > 0 ? 'ventaja del oponente' : 'desventaja del oponente' }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-xs text-[#9AA0A6] mb-1">Recomendación:</p>
          <p class="text-sm text-[#4A90E2]">
            {{ balanceNeto > 0 ? 'Atacar debilidades clave' : 'Capitalizar ventaja' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
