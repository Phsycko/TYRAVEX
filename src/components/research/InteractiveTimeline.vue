<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TimelineEvent } from '@/types/research'

interface Props {
  events: TimelineEvent[]
}

const props = defineProps<Props>()

const selectedType = ref<string>('all')
const searchQuery = ref('')

const filteredEvents = computed(() => {
  let filtered = props.events

  if (selectedType.value !== 'all') {
    filtered = filtered.filter(e => e.tipo === selectedType.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(e =>
      e.titulo.toLowerCase().includes(query) ||
      e.descripcion.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getTypeIcon = (tipo: string) => {
  switch (tipo) {
    case 'declaracion': return 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    case 'voto': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    case 'evento': return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    case 'escandalo': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    case 'proyecto': return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    case 'iniciativa': return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const getTypeColor = (tipo: string) => {
  switch (tipo) {
    case 'declaracion': return { bg: 'bg-[#4A90E2]/10', border: 'border-[#4A90E2]/30', text: 'text-[#4A90E2]' }
    case 'voto': return { bg: 'bg-[#52C41A]/10', border: 'border-[#52C41A]/30', text: 'text-[#52C41A]' }
    case 'evento': return { bg: 'bg-[#722ED1]/10', border: 'border-[#722ED1]/30', text: 'text-[#722ED1]' }
    case 'escandalo': return { bg: 'bg-[#D32F2F]/10', border: 'border-[#D32F2F]/30', text: 'text-[#D32F2F]' }
    case 'proyecto': return { bg: 'bg-[#FA8C16]/10', border: 'border-[#FA8C16]/30', text: 'text-[#FA8C16]' }
    case 'iniciativa': return { bg: 'bg-[#4A90E2]/10', border: 'border-[#4A90E2]/30', text: 'text-[#4A90E2]' }
    default: return { bg: 'bg-[#9AA0A6]/10', border: 'border-[#9AA0A6]/30', text: 'text-[#9AA0A6]' }
  }
}

const getTypeLabel = (tipo: string) => {
  switch (tipo) {
    case 'declaracion': return 'Declaración'
    case 'voto': return 'Votación'
    case 'evento': return 'Evento'
    case 'escandalo': return 'Escándalo'
    case 'proyecto': return 'Proyecto'
    case 'iniciativa': return 'Iniciativa'
    default: return tipo
  }
}
</script>

<template>
  <div class="bg-[#1A2332] border border-white/8 rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-[#E8EAED]">Timeline de Posiciones</h3>
      <span class="text-xs text-[#9AA0A6]">{{ filteredEvents.length }} eventos</span>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex-1 relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar en timeline..."
          class="w-full pl-10 pr-4 py-2 bg-[#141B22] border border-white/8 rounded-lg text-sm text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#4A90E2]/50"
        />
      </div>

      <select
        v-model="selectedType"
        class="px-3 py-2 bg-[#141B22] border border-white/8 rounded-lg text-sm text-[#E8EAED] focus:outline-none focus:border-[#4A90E2]/50"
      >
        <option value="all">Todos los tipos</option>
        <option value="declaracion">Declaraciones</option>
        <option value="voto">Votaciones</option>
        <option value="evento">Eventos</option>
        <option value="escandalo">Escándalos</option>
        <option value="proyecto">Proyectos</option>
        <option value="iniciativa">Iniciativas</option>
      </select>
    </div>

    <!-- Timeline -->
    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-white/8" />

      <div class="space-y-6">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="relative flex items-start gap-4 pl-14"
        >
          <!-- Icon -->
          <div
            class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border"
            :class="[getTypeColor(event.tipo).bg, getTypeColor(event.tipo).border]"
          >
            <svg class="w-5 h-5" :class="getTypeColor(event.tipo).text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTypeIcon(event.tipo)" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1 p-4 rounded-lg bg-[#141B22] border border-white/8 hover:border-white/20 transition-colors">
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 text-xs font-medium rounded-full" :class="[getTypeColor(event.tipo).bg, getTypeColor(event.tipo).text]">
                  {{ getTypeLabel(event.tipo) }}
                </span>
                <span v-if="event.inconsistenciaFlag" class="px-2 py-0.5 text-xs font-medium bg-[#D32F2F]/20 text-[#D32F2F] rounded-full border border-[#D32F2F]/30">
                  ⚠️ Inconsistente
                </span>
              </div>
              <span class="text-xs text-[#9AA0A6]">{{ event.fecha }}</span>
            </div>

            <h4 class="font-medium text-[#E8EAED] mb-2">{{ event.titulo }}</h4>
            <p class="text-sm text-[#9AA0A6] mb-3">{{ event.descripcion }}</p>

            <div v-if="event.cita" class="p-3 bg-[#4A90E2]/10 border-l-2 border-[#4A90E2] rounded mb-3">
              <p class="text-xs text-[#E8EAED] italic">"{{ event.cita }}"</p>
            </div>

            <div class="flex items-center justify-between">
              <p class="text-xs text-[#9AA0A6]">Fuente: <span class="text-[#E8EAED]">{{ event.fuente }}</span></p>
              <div class="flex items-center gap-2">
                <button v-if="event.url" class="text-xs text-[#4A90E2] hover:text-[#5BA3F5] transition-colors">
                  Ver fuente →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredEvents.length === 0" class="text-center py-12">
      <svg class="w-12 h-12 text-[#9AA0A6] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm text-[#9AA0A6]">No se encontraron eventos</p>
    </div>
  </div>
</template>
