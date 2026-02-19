<script setup lang="ts">
import type { Oponente } from '@/types/research'

interface Props {
  opponent: Oponente
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'generate-briefing'): void
  (e: 'export-dossier'): void
  (e: 'configure-alerts'): void
  (e: 'refresh'): void
}>()
</script>

<template>
  <div class="bg-[#1A2332] border border-white/8 rounded-lg p-8">
    <div class="flex items-start gap-6">
      <!-- Photo -->
      <div class="w-24 h-24 rounded-xl bg-[#0B0E11] flex items-center justify-center flex-shrink-0 border border-white/8">
        <svg class="w-12 h-12 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="text-2xl font-bold text-[#E8EAED]">{{ opponent.nombre }}</h2>
              <span class="px-2.5 py-0.5 text-xs font-medium bg-[#4A90E2]/20 text-[#4A90E2] rounded-full border border-[#4A90E2]/30">
                {{ opponent.partido }}
              </span>
            </div>
            <p class="text-sm text-[#9AA0A6]">{{ opponent.cargo }}</p>
          </div>

          <button
            @click="emit('refresh')"
            class="p-2 hover:bg-[#141B22] rounded-lg transition-colors group"
            title="Actualizar datos"
          >
            <svg class="w-4 h-4 text-[#9AA0A6] group-hover:text-[#E8EAED] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <p class="text-xs text-[#9AA0A6] mt-2">
          Última actualización: <span class="text-[#E8EAED]">Hace 2 horas</span>
        </p>

        <!-- Threat & Vulnerability -->
        <div class="grid grid-cols-2 gap-4 mt-6">
          <div class="p-4 bg-[#141B22] rounded-lg border border-white/8">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-4 h-4 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-xs font-medium text-[#9AA0A6]">NIVEL DE AMENAZA</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold font-mono" :class="
                opponent.nivelAmenaza >= 7 ? 'text-[#D32F2F]' :
                opponent.nivelAmenaza >= 5 ? 'text-[#FA8C16]' : 'text-[#52C41A]'
              ">{{ opponent.nivelAmenaza }}/10</span>
              <span class="text-sm font-semibold mb-1" :class="
                opponent.nivelAmenaza >= 7 ? 'text-[#D32F2F]' :
                opponent.nivelAmenaza >= 5 ? 'text-[#FA8C16]' : 'text-[#52C41A]'
              ">
                {{ opponent.nivelAmenaza >= 7 ? 'ALTO' : opponent.nivelAmenaza >= 5 ? 'MEDIO' : 'BAJO' }}
              </span>
            </div>
            <div class="mt-2 h-1.5 bg-[#0B0E11] rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="
                  opponent.nivelAmenaza >= 7 ? 'bg-[#D32F2F]' :
                  opponent.nivelAmenaza >= 5 ? 'bg-[#FA8C16]' : 'bg-[#52C41A]'
                "
                :style="{ width: `${opponent.nivelAmenaza * 10}%` }"
              />
            </div>
          </div>

          <div class="p-4 bg-[#141B22] rounded-lg border border-white/8">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-4 h-4 text-[#FA8C16]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-xs font-medium text-[#9AA0A6]">VULNERABILIDAD</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-3xl font-bold font-mono text-[#FA8C16]">{{ opponent.scoreVulnerabilidad }}/10</span>
              <span class="text-sm font-semibold text-[#FA8C16] mb-1">
                {{ opponent.scoreVulnerabilidad >= 7 ? 'ALTA' : opponent.scoreVulnerabilidad >= 4 ? 'MEDIA' : 'BAJA' }}
              </span>
            </div>
            <div class="mt-2 h-1.5 bg-[#0B0E11] rounded-full overflow-hidden">
              <div
                class="h-full bg-[#FA8C16] rounded-full transition-all"
                :style="{ width: `${opponent.scoreVulnerabilidad * 10}%` }"
              />
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-3 mt-6">
          <button
            @click="emit('generate-briefing')"
            class="px-4 py-2 bg-[#4A90E2] hover:bg-[#5BA3F5] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generar Briefing
          </button>

          <button
            @click="emit('export-dossier')"
            class="px-4 py-2 bg-[#141B22] hover:bg-[#1A2332] text-[#E8EAED] text-sm font-medium rounded-lg transition-colors border border-white/8 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar Dossier
          </button>

          <button
            @click="emit('configure-alerts')"
            class="px-4 py-2 bg-[#141B22] hover:bg-[#1A2332] text-[#E8EAED] text-sm font-medium rounded-lg transition-colors border border-white/8 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Configurar Alertas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
