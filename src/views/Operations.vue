<template>
  <div class="operations-view">
    <div class="view-header">
      <h1 class="view-title">OPERACIONES</h1>
      <p class="view-subtitle">Ejecución y seguimiento de operaciones activas</p>
    </div>

    <!-- Active Operations Table -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">OPERACIONES ACTIVAS</h2>
      </div>
      <DataTable :columns="operationsColumns" :rows="activeOperations" />
    </div>

    <!-- Timeline -->
    <div class="section">
      <TimelinePanel 
        title="HISTORIAL DE OPERACIONES" 
        :events="timelineEvents"
        :width="1200"
        :height="150"
      />
    </div>

    <!-- Metrics -->
    <div class="metrics-grid">
      <MetricPanel 
        label="OPERACIONES COMPLETADAS HOY" 
        :value="34" 
        subtitle="Tasa de éxito: 97%"
        status="normal"
      />
      <MetricPanel 
        label="EN PROGRESO" 
        :value="12" 
        subtitle="Tiempo promedio: 2.4h"
        status="normal"
      />
      <MetricPanel 
        label="REQUIEREN ATENCIÓN" 
        :value="3" 
        subtitle="Prioridad alta"
        status="warning"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/ui/DataTable.vue'
import TimelinePanel from '@/components/panels/TimelinePanel.vue'
import MetricPanel from '@/components/panels/MetricPanel.vue'
import type { TableColumn } from '@/components/ui/DataTable.vue'

const operationsColumns: TableColumn[] = [
  { key: 'id', label: 'ID', type: 'mono' },
  { key: 'nombre', label: 'OPERACIÓN' },
  { key: 'tipo', label: 'TIPO' },
  { key: 'progreso', label: 'PROGRESO' },
  { key: 'estado', label: 'ESTADO', type: 'status' },
  { key: 'inicio', label: 'INICIO', type: 'mono' }
]

const activeOperations = ref([
  {
    id: 'OP-4472',
    nombre: 'Análisis de correlación ALPHA-7',
    tipo: 'Inteligencia',
    progreso: '67%',
    estado: 'activo',
    inicio: '2026-01-28 15:30:00'
  },
  {
    id: 'OP-4473',
    nombre: 'Sincronización dominio BETA-3',
    tipo: 'Operacional',
    progreso: '89%',
    estado: 'activo',
    inicio: '2026-01-28 16:15:00'
  },
  {
    id: 'OP-4474',
    nombre: 'Auditoría de seguridad EPSILON-2',
    tipo: 'Seguridad',
    progreso: '23%',
    estado: 'pendiente',
    inicio: '2026-01-28 17:00:00'
  },
  {
    id: 'OP-4475',
    nombre: 'Backup incremental sistema',
    tipo: 'Mantenimiento',
    progreso: '45%',
    estado: 'activo',
    inicio: '2026-01-28 16:45:00'
  }
])

const timelineEvents = ref([
  { label: 'OP-4470', type: 'normal' },
  { label: 'OP-4471', type: 'normal' },
  { label: 'OP-4472', type: 'warning' },
  { label: 'OP-4473', type: 'normal' },
  { label: 'OP-4474', type: 'warning' }
])
</script>

<style scoped>
.operations-view {
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

.section {
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
</style>
