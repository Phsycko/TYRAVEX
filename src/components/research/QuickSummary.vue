<script setup lang="ts">
import type { Oponente } from '@/types/research'

interface Props {
  opponent: Oponente
  activeAlerts: number
  upcomingEvents: Array<{ date: string; title: string }>
}

defineProps<Props>()
</script>

<template>
  <div class="bg-[#1A2332] border border-white/8 rounded-lg p-5 sticky top-6">
    <h3 class="text-xs font-semibold text-[#9AA0A6] uppercase tracking-wide mb-4">Vista Rápida</h3>

    <!-- Photo & Name -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-14 h-14 rounded-lg bg-[#0B0E11] flex items-center justify-center flex-shrink-0 border border-white/8">
        <svg class="w-7 h-7 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-[#E8EAED] text-sm truncate">{{ opponent.nombre }}</h4>
        <p class="text-xs text-[#9AA0A6]">{{ opponent.partido }} | {{ opponent.edad }} años</p>
      </div>
    </div>

    <!-- Threat Level -->
    <div class="mb-4 pb-4 border-b border-white/8">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-[#9AA0A6]">⚡ NIVEL DE AMENAZA</span>
        <span class="text-xs font-mono font-semibold" :class="
          opponent.nivelAmenaza >= 7 ? 'text-[#D32F2F]' :
          opponent.nivelAmenaza >= 5 ? 'text-[#FA8C16]' : 'text-[#52C41A]'
        ">{{ opponent.nivelAmenaza }}/10</span>
      </div>
      <div class="h-2 bg-[#0B0E11] rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all"
          :class="
            opponent.nivelAmenaza >= 7 ? 'bg-[#D32F2F]' :
            opponent.nivelAmenaza >= 5 ? 'bg-[#FA8C16]' : 'bg-[#52C41A]'
          "
          :style="{ width: `${opponent.nivelAmenaza * 10}%` }"
        />
      </div>
      <p class="text-xs font-semibold mt-1" :class="
        opponent.nivelAmenaza >= 7 ? 'text-[#D32F2F]' :
        opponent.nivelAmenaza >= 5 ? 'text-[#FA8C16]' : 'text-[#52C41A]'
      ">
        {{ opponent.nivelAmenaza >= 7 ? 'ALTO' : opponent.nivelAmenaza >= 5 ? 'MEDIO' : 'BAJO' }}
      </p>
    </div>

    <!-- Vulnerability -->
    <div class="mb-4 pb-4 border-b border-white/8">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-[#9AA0A6]">🎯 VULNERABILIDAD</span>
        <span class="text-xs font-mono font-semibold text-[#FA8C16]">{{ opponent.scoreVulnerabilidad }}/10</span>
      </div>
      <div class="h-2 bg-[#0B0E11] rounded-full overflow-hidden">
        <div
          class="h-full bg-[#FA8C16] rounded-full transition-all"
          :style="{ width: `${opponent.scoreVulnerabilidad * 10}%` }"
        />
      </div>
      <p class="text-xs font-semibold text-[#FA8C16] mt-1">
        {{ opponent.scoreVulnerabilidad >= 7 ? 'ALTA' : opponent.scoreVulnerabilidad >= 4 ? 'MEDIA' : 'BAJA' }}
      </p>
    </div>

    <!-- Key Metrics -->
    <div class="mb-4 pb-4 border-b border-white/8">
      <h4 class="text-xs font-semibold text-[#9AA0A6] uppercase tracking-wide mb-3">📊 Métricas Clave</h4>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#9AA0A6]">Popularidad:</span>
          <div class="flex items-center gap-1">
            <span class="text-xs font-mono font-semibold text-[#E8EAED]">{{ opponent.popularidad }}%</span>
            <svg class="w-3 h-3 text-[#D32F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#9AA0A6]">Sentimiento:</span>
          <span class="text-xs font-mono font-semibold text-[#FA8C16]">+{{ opponent.sentimiento }}%</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#9AA0A6]">Momentum:</span>
          <span class="text-xs font-mono font-semibold text-[#9AA0A6]">4.2/10</span>
        </div>
      </div>
    </div>

    <!-- Active Alerts -->
    <div class="mb-4 pb-4 border-b border-white/8">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-xs font-semibold text-[#9AA0A6] uppercase tracking-wide">⚠️ Alertas Activas</h4>
        <span class="px-2 py-0.5 bg-[#D32F2F] text-white text-xs font-bold rounded-full">{{ activeAlerts }}</span>
      </div>
      <ul class="space-y-1.5">
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#D32F2F]">•</span>
          <span>8 inconsistencias detectadas</span>
        </li>
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#FA8C16]">•</span>
          <span>Cobertura negativa ↑ 15%</span>
        </li>
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#FA8C16]">•</span>
          <span>Financiamiento cuestionable</span>
        </li>
      </ul>
    </div>

    <!-- Top Vulnerabilities -->
    <div class="mb-4 pb-4 border-b border-white/8">
      <h4 class="text-xs font-semibold text-[#9AA0A6] uppercase tracking-wide mb-2">🎯 Top 3 Vulnerabilidades</h4>
      <ol class="space-y-1.5">
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#D32F2F] font-semibold">1.</span>
          <span>Inconsistencias fiscales</span>
        </li>
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#D32F2F] font-semibold">2.</span>
          <span>Escándalos pasados</span>
        </li>
        <li class="text-xs text-[#E8EAED] flex items-start gap-1.5">
          <span class="text-[#D32F2F] font-semibold">3.</span>
          <span>Pérdida de momentum</span>
        </li>
      </ol>
    </div>

    <!-- Upcoming Events -->
    <div>
      <h4 class="text-xs font-semibold text-[#9AA0A6] uppercase tracking-wide mb-2">📅 Próximos Eventos</h4>
      <div class="space-y-2">
        <div v-for="(event, idx) in upcomingEvents" :key="idx" class="text-xs">
          <p class="text-[#4A90E2] font-medium">{{ event.date }}</p>
          <p class="text-[#E8EAED]">{{ event.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
