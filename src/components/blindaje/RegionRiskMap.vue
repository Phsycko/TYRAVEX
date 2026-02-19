<template>
  <div class="region-risk-map">
    <div class="map-container">
      <MexicoMap mode="security" :readonly="false" @state-select="handleStateSelect" />
    </div>
    <div class="risk-legend">
      <span class="legend-label mono-text">RIESGO</span>
      <div class="legend-scale">
        <div class="legend-bar"></div>
        <div class="legend-labels">
          <span>BAJO</span>
          <span>MEDIO</span>
          <span>ALTO</span>
          <span>CRÍTICO</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MexicoMap from '@/components/maps/MexicoMap.vue'
import type { StateMetrics } from '@/data/mapData'

const emit = defineEmits<{
  'state-select': [state: StateMetrics]
}>()

function handleStateSelect(state: StateMetrics) {
  emit('state-select', state)
}
</script>

<style scoped>
.region-risk-map { position: relative; }
.map-container { height: 100%; min-height: 400px; border-radius: 4px; overflow: hidden; }
.map-container :deep(.mexico-map-root) { border: none; border-radius: 0; }
.risk-legend { position: absolute; bottom: 16px; left: 16px; background: rgba(20, 22, 28, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; padding: 10px 14px; z-index: 10; }
.legend-label { font-size: 10px; color: #888; letter-spacing: 0.1em; display: block; margin-bottom: 6px; }
.legend-scale { width: 160px; }
.legend-bar { height: 6px; border-radius: 3px; background: linear-gradient(to right, #4A90E2, #00ffaa, #ffcc00, #ff6b35, #ff4444); margin-bottom: 4px; }
.legend-labels { display: flex; justify-content: space-between; font-family: 'Roboto Mono', monospace; font-size: 8px; color: #666; letter-spacing: 0.05em; }
.mono-text { font-family: 'Roboto Mono', monospace; }
</style>
