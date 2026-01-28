<template>
  <div class="overview-view">
    <div class="view-header">
      <h1 class="view-title">VISIÓN GENERAL DEL SISTEMA</h1>
      <p class="view-subtitle">Estado operacional y métricas clave</p>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <MetricPanel 
        label="DOMINIOS ACTIVOS" 
        :value="47" 
        subtitle="Total registrados: 52"
        status="normal"
      />
      <MetricPanel 
        label="OPERACIONES EN CURSO" 
        :value="12" 
        subtitle="3 requieren atención"
        status="warning"
      />
      <MetricPanel 
        label="EVENTOS PROCESADOS" 
        :value="'2.4M'" 
        subtitle="Últimas 24 horas"
        status="normal"
      />
      <MetricPanel 
        label="TASA DE PROCESAMIENTO" 
        :value="'98.7%'" 
        subtitle="Objetivo: 99.5%"
        status="warning"
      />
    </div>

    <!-- Status and Activity -->
    <div class="content-grid">
      <StatusPanel />
      <ActivityFeed :events="recentEvents" />
    </div>

    <!-- Graph -->
    <div class="graph-section">
      <GraphPanel title="RENDIMIENTO DEL SISTEMA (24H)" :width="1200" :height="300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MetricPanel from '@/components/panels/MetricPanel.vue'
import StatusPanel from '@/components/panels/StatusPanel.vue'
import GraphPanel from '@/components/panels/GraphPanel.vue'
import ActivityFeed from '@/components/ui/ActivityFeed.vue'
import type { ActivityEvent } from '@/components/ui/ActivityFeed.vue'

const recentEvents = ref<ActivityEvent[]>([
  {
    id: '1',
    type: 'SISTEMA',
    message: 'Sincronización completada con dominio ALPHA-7',
    timestamp: new Date(Date.now() - 120000),
    severity: 'normal'
  },
  {
    id: '2',
    type: 'ADVERTENCIA',
    message: 'Latencia elevada detectada en nodo BETA-3',
    timestamp: new Date(Date.now() - 300000),
    severity: 'warning'
  },
  {
    id: '3',
    type: 'OPERACIÓN',
    message: 'Análisis de correlación iniciado: OP-4472',
    timestamp: new Date(Date.now() - 480000),
    severity: 'normal'
  },
  {
    id: '4',
    type: 'SISTEMA',
    message: 'Backup automático ejecutado correctamente',
    timestamp: new Date(Date.now() - 720000),
    severity: 'normal'
  },
  {
    id: '5',
    type: 'ACCESO',
    message: 'Operador OPR-7743 autenticado',
    timestamp: new Date(Date.now() - 900000),
    severity: 'normal'
  }
])
</script>

<style scoped>
.overview-view {
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

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.graph-section {
  width: 100%;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
