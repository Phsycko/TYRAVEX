<template>
  <div class="threat-feed">
    <div class="feed-filters">
      <button v-for="f in filters" :key="f.value" class="filter-btn" :class="{ active: activeFilter === f.value }" @click="activeFilter = f.value">
        {{ f.label }}
        <span v-if="f.count" class="filter-count">{{ f.count }}</span>
      </button>
    </div>
    <div class="feed-list" ref="feedRef">
      <ThreatCard
        v-for="a in filteredAmenazas"
        :key="a.id"
        :amenaza="a"
        :show-actions="true"
        @click="$emit('select', a)"
        @review="$emit('review', a)"
        @escalate="$emit('escalate', a)"
        @resolve="$emit('resolve', a)"
      />
      <div v-if="filteredAmenazas.length === 0" class="no-threats">
        <span class="mono-text">SIN AMENAZAS EN ESTA CATEGORÍA</span>
      </div>
    </div>
    <div class="feed-footer mono-text">
      <span class="pulse-dot"></span>
      AUTO-ACTUALIZACIÓN CADA 30s
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Amenaza } from '@/data/blindajeData'
import ThreatCard from './ThreatCard.vue'

const props = defineProps<{
  amenazas: Amenaza[]
}>()

defineEmits<{
  select: [amenaza: Amenaza]
  review: [amenaza: Amenaza]
  escalate: [amenaza: Amenaza]
  resolve: [amenaza: Amenaza]
}>()

const activeFilter = ref<'todas' | 'criticas' | 'nuevas'>('todas')

const filters = computed(() => {
  const criticas = props.amenazas.filter(a => a.severidad >= 8 && a.estado !== 'resuelta').length
  const nuevas = props.amenazas.filter(a => a.estado === 'nueva').length
  return [
    { label: 'TODAS', value: 'todas' as const, count: props.amenazas.filter(a => a.estado !== 'resuelta').length },
    { label: 'CRÍTICAS', value: 'criticas' as const, count: criticas },
    { label: 'NUEVAS', value: 'nuevas' as const, count: nuevas },
  ]
})

const filteredAmenazas = computed(() => {
  let list = props.amenazas.filter(a => a.estado !== 'resuelta')
  if (activeFilter.value === 'criticas') {
    list = list.filter(a => a.severidad >= 8)
  } else if (activeFilter.value === 'nuevas') {
    list = list.filter(a => a.estado === 'nueva')
  }
  return list
})
</script>

<style scoped>
.threat-feed { display: flex; flex-direction: column; height: 100%; }
.feed-filters { display: flex; gap: 6px; margin-bottom: 12px; }
.filter-btn { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 5px 10px; border: 1px solid rgba(255, 255, 255, 0.1); background: transparent; color: #888; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; display: flex; align-items: center; gap: 6px; }
.filter-btn:hover { border-color: rgba(255, 255, 255, 0.2); color: #e0e0e0; }
.filter-btn.active { border-color: #ff6b35; color: #ff6b35; background: rgba(255, 107, 53, 0.08); }
.filter-count { background: rgba(255, 255, 255, 0.1); padding: 1px 5px; border-radius: 2px; font-size: 9px; }
.filter-btn.active .filter-count { background: rgba(255, 107, 53, 0.2); }
.feed-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; min-height: 0; max-height: 600px; padding-right: 4px; }
.feed-list::-webkit-scrollbar { width: 4px; }
.feed-list::-webkit-scrollbar-track { background: transparent; }
.feed-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
.no-threats { padding: 40px 20px; text-align: center; color: #555; }
.feed-footer { display: flex; align-items: center; gap: 8px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 10px; color: #555; letter-spacing: 0.1em; }
.pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ffaa; animation: pulse 2s ease-in-out infinite; }
.mono-text { font-family: 'Roboto Mono', monospace; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
</style>
