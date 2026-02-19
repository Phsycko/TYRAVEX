<template>
  <div class="threat-card" :class="'severity-' + severityClass" @click="$emit('click')">
    <div class="threat-header">
      <span class="badge" :class="'badge-' + severityClass">SEV {{ amenaza.severidad }}/10</span>
      <span class="threat-platform">{{ amenaza.plataforma }}</span>
      <span class="threat-time mono-text">{{ amenaza.timestamp }}</span>
    </div>
    <div class="threat-type">{{ typeLabel }}</div>
    <p class="threat-content">{{ amenaza.contenido }}</p>
    <div class="threat-meta">
      <span class="meta-item">
        <span class="meta-label">ALCANCE</span>
        <span class="meta-value mono-text">{{ formatNumber(amenaza.alcance) }}</span>
      </span>
      <span class="meta-item" v-if="amenaza.ubicacion">
        <span class="meta-label">UBICACIÓN</span>
        <span class="meta-value">{{ amenaza.ubicacion }}</span>
      </span>
      <span class="badge" :class="'badge-' + statusBadge">{{ statusLabel }}</span>
    </div>
    <div class="threat-actions" v-if="showActions">
      <button class="btn-action btn-review" @click.stop="$emit('review')">REVISAR</button>
      <button class="btn-action btn-escalate" @click.stop="$emit('escalate')">ESCALAR</button>
      <button class="btn-action btn-resolve" @click.stop="$emit('resolve')">RESOLVER</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Amenaza, getThreatTypeLabel, getThreatStatusLabel, getStatusBadge, getSeverityBadge } from '@/data/blindajeData'

const props = defineProps<{
  amenaza: Amenaza
  showActions?: boolean
}>()

defineEmits<{
  click: []
  review: []
  escalate: []
  resolve: []
}>()

const severityClass = computed(() => getSeverityBadge(props.amenaza.severidad))
const typeLabel = computed(() => getThreatTypeLabel(props.amenaza.tipo))
const statusLabel = computed(() => getThreatStatusLabel(props.amenaza.estado))
const statusBadge = computed(() => getStatusBadge(props.amenaza.estado))

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}
</script>

<style scoped>
.threat-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 14px; cursor: pointer; transition: all 0.15s ease; border-left: 3px solid transparent; }
.threat-card:hover { background: rgba(20, 22, 28, 0.9); }
.threat-card.severity-danger { border-left-color: #ff4444; }
.threat-card.severity-high { border-left-color: #ff6b35; }
.threat-card.severity-warning { border-left-color: #ffcc00; }
.threat-card.severity-info { border-left-color: #4A90E2; }
.threat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.threat-platform { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; color: #a0a0a0; letter-spacing: 0.05em; }
.threat-time { font-size: 10px; color: #666; margin-left: auto; }
.threat-type { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #e0e0e0; margin-bottom: 6px; }
.threat-content { font-size: 12px; color: #a0a0a0; line-height: 1.5; margin: 0 0 10px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.threat-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.meta-item { display: flex; flex-direction: column; gap: 2px; }
.meta-label { font-family: 'Roboto Mono', monospace; font-size: 9px; color: #666; letter-spacing: 0.1em; }
.meta-value { font-size: 12px; color: #e0e0e0; font-weight: 600; }
.threat-actions { display: flex; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
.btn-action { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-review { border: 1px solid rgba(74, 144, 226, 0.4); background: rgba(74, 144, 226, 0.1); color: #4A90E2; }
.btn-review:hover { background: rgba(74, 144, 226, 0.25); }
.btn-escalate { border: 1px solid rgba(255, 107, 53, 0.4); background: rgba(255, 107, 53, 0.1); color: #ff6b35; }
.btn-escalate:hover { background: rgba(255, 107, 53, 0.25); }
.btn-resolve { border: 1px solid rgba(0, 255, 170, 0.4); background: rgba(0, 255, 170, 0.1); color: #00ffaa; }
.btn-resolve:hover { background: rgba(0, 255, 170, 0.25); }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.mono-text { font-family: 'Roboto Mono', monospace; }
</style>
