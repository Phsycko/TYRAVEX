<template>
  <div class="intelligence-view">
    <div class="view-header">
      <h1 class="view-title">INTELIGENCIA Y CORRELACIONES</h1>
      <p class="view-subtitle">Análisis de relaciones y patrones</p>
    </div>

    <!-- Node Map -->
    <div class="map-section">
      <div class="section-header">
        <h2 class="section-title">MAPA DE RELACIONES</h2>
      </div>
      <NodeMap :width="1200" :height="600" />
    </div>

    <!-- Metrics -->
    <div class="metrics-grid">
      <MetricPanel 
        label="CORRELACIONES DETECTADAS" 
        :value="347" 
        subtitle="Últimas 24 horas"
        status="normal"
      />
      <MetricPanel 
        label="PATRONES IDENTIFICADOS" 
        :value="23" 
        subtitle="8 nuevos"
        status="normal"
      />
      <MetricPanel 
        label="ANOMALÍAS" 
        :value="5" 
        subtitle="Requieren análisis"
        status="warning"
      />
    </div>

    <!-- Graph -->
    <div class="graph-section">
      <GraphPanel title="TENDENCIAS DE CORRELACIÓN" :width="1200" :height="300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NodeMap from '@/components/ui/NodeMap.vue'
import MetricPanel from '@/components/panels/MetricPanel.vue'
import GraphPanel from '@/components/panels/GraphPanel.vue'
</script>

<style scoped>
.intelligence-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.view-header {
  margin-bottom: var(--space-4);
}

.view-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.view-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.map-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.section-header {
  padding: var(--space-4) 0;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.graph-section {
  width: 100%;
}
</style>
