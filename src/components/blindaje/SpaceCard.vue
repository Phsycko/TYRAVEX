<template>
  <div class="space-card" :class="{ 'space-emergency': espacio.estado === 'emergencia' }" @click="$emit('select', espacio)">
    <div class="space-header">
      <div class="space-status">
        <span class="status-dot" :style="{ background: statusColor }"></span>
        <span class="status-label">{{ statusLabel }}</span>
      </div>
      <span class="badge" :class="'badge-' + tipoBadge">{{ tipoLabel }}</span>
    </div>

    <div class="space-name">{{ espacio.nombre }}</div>
    <div class="space-meta mono-text">{{ espacio.ciudad }}, {{ espacio.estado_mx }}</div>

    <div class="space-stats">
      <div class="stat-item">
        <span class="stat-value">{{ espacio.zonas.length }}</span>
        <span class="stat-label">ZONAS</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ espacio.niveles }}</span>
        <span class="stat-label">NIVELES</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ espacio.capacidad_total.toLocaleString() }}</span>
        <span class="stat-label">CAPACIDAD</span>
      </div>
    </div>

    <div class="space-actions">
      <button class="btn-sm btn-primary" @click.stop="$emit('select', espacio)">VER</button>
      <button class="btn-sm btn-default" @click.stop="$emit('edit', espacio)">&#9998;</button>
      <button class="btn-sm btn-default" @click.stop="$emit('duplicate', espacio)">&#9776;</button>
      <button class="btn-sm btn-default" @click.stop="$emit('export', espacio)">&#8599;</button>
      <button class="btn-sm btn-danger" @click.stop="$emit('delete', espacio)">&#10005;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTipoEspacioLabel, type Espacio } from '@/data/espaciosData'

const props = defineProps<{ espacio: Espacio }>()
defineEmits<{
  (e: 'select', espacio: Espacio): void
  (e: 'edit', espacio: Espacio): void
  (e: 'delete', espacio: Espacio): void
  (e: 'duplicate', espacio: Espacio): void
  (e: 'export', espacio: Espacio): void
}>()

const statusColor = computed(() => {
  const map: Record<string, string> = { 'normal': '#00ffaa', 'alerta': '#ffcc00', 'emergencia': '#ff4444' }
  return map[props.espacio.estado] || '#888'
})

const statusLabel = computed(() => {
  const map: Record<string, string> = { 'normal': 'NORMAL', 'alerta': 'ALERTA', 'emergencia': 'EMERGENCIA' }
  return map[props.espacio.estado] || 'NORMAL'
})

const tipoLabel = computed(() => getTipoEspacioLabel(props.espacio.tipo))
const tipoBadge = computed(() => {
  const map: Record<string, string> = {
    'edificio': 'info', 'venue_evento': 'high', 'instalacion_publica': 'info',
    'recinto': 'warning', 'zona_urbana': 'high', 'otro': 'info',
  }
  return map[props.espacio.tipo] || 'info'
})
</script>

<style scoped>
.space-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 14px; cursor: pointer; transition: all 0.2s ease; }
.space-card:hover { border-color: rgba(255,107,53,0.3); background: rgba(20, 22, 28, 0.9); transform: translateY(-1px); }
.space-emergency { border-left: 3px solid #ff4444; animation: pulse-card 2s ease-in-out infinite; }
.space-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.space-status { display: flex; align-items: center; gap: 6px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.status-label { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: #a0a0a0; }
.space-name { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.03em; margin-bottom: 2px; line-height: 1.3; }
.space-meta { font-size: 10px; color: #888; margin-bottom: 8px; }
.space-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 8px; }
.stat-item { text-align: center; padding: 5px 0; background: rgba(15,17,21,0.5); border-radius: 2px; }
.stat-value { display: block; font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 600; color: #e0e0e0; }
.stat-label { display: block; font-family: 'Roboto Mono', monospace; font-size: 7px; color: #666; letter-spacing: 0.1em; margin-top: 1px; }
.space-actions { display: flex; gap: 4px; }
.btn-sm { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; padding: 4px 8px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; border: 1px solid rgba(255,255,255,0.1); letter-spacing: 0.05em; }
.btn-primary { background: rgba(255,107,53,0.12); border-color: rgba(255,107,53,0.3); color: #ff6b35; }
.btn-primary:hover { background: rgba(255,107,53,0.25); }
.btn-default { background: rgba(255,255,255,0.04); color: #888; }
.btn-default:hover { background: rgba(255,255,255,0.08); color: #e0e0e0; }
.btn-danger { background: rgba(255,68,68,0.08); border-color: rgba(255,68,68,0.2); color: #ff4444; }
.btn-danger:hover { background: rgba(255,68,68,0.2); }
.badge { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.mono-text { font-family: 'Roboto Mono', monospace; }
@keyframes pulse-card { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,68,68,0); } 50% { box-shadow: 0 0 8px 1px rgba(255,68,68,0.15); } }
</style>
