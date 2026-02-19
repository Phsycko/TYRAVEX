<script setup lang="ts">
import { computed } from 'vue'
import type { Oponente } from '@/types/research'

interface Props {
  opponents: Oponente[]
  selectedId: string
}

interface Emits {
  (e: 'select', id: string): void
  (e: 'add-new'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedOpponent = computed(() => 
  props.opponents.find(o => o.id === props.selectedId)
)
</script>

<template>
  <div class="bg-[#1A2332] border border-white/8 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-[#9AA0A6]">Seleccionar oponente:</h3>
      <button
        @click="emit('add-new')"
        class="px-3 py-1.5 text-xs font-medium text-[#4A90E2] hover:text-[#5BA3F5] border border-[#4A90E2]/30 hover:border-[#4A90E2]/50 rounded-lg transition-all"
      >
        + Agregar nuevo
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="opponent in opponents"
        :key="opponent.id"
        @click="emit('select', opponent.id)"
        class="group relative p-4 rounded-lg border transition-all text-left"
        :class="opponent.id === selectedId
          ? 'bg-[#4A90E2]/10 border-[#4A90E2] shadow-lg shadow-[#4A90E2]/20'
          : 'bg-[#141B22] border-white/8 hover:border-white/20 hover:bg-[#1A2332]'"
      >
        <!-- Photo placeholder -->
        <div class="flex items-start gap-3 mb-3">
          <div class="w-12 h-12 rounded-lg bg-[#0B0E11] flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-[#9AA0A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-[#E8EAED] truncate">{{ opponent.nombre }}</h4>
            <p class="text-xs text-[#9AA0A6]">{{ opponent.partido }}</p>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-xs text-[#9AA0A6]">Amenaza</p>
            <p class="text-sm font-mono font-semibold" :class="
              opponent.nivelAmenaza >= 7 ? 'text-[#D32F2F]' :
              opponent.nivelAmenaza >= 5 ? 'text-[#FA8C16]' : 'text-[#52C41A]'
            ">{{ opponent.nivelAmenaza }}/10</p>
          </div>
          <div>
            <p class="text-xs text-[#9AA0A6]">Popular</p>
            <p class="text-sm font-mono font-semibold text-[#E8EAED]">{{ opponent.popularidad }}%</p>
          </div>
          <div>
            <p class="text-xs text-[#9AA0A6]">Sentim.</p>
            <p class="text-sm font-mono font-semibold text-[#FA8C16]">+{{ opponent.sentimiento }}%</p>
          </div>
        </div>

        <!-- Selected indicator -->
        <div
          v-if="opponent.id === selectedId"
          class="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4A90E2] animate-pulse"
        />
      </button>
    </div>
  </div>
</template>
