<template>
  <div class="audit-view">
    <div class="view-header">
      <h1 class="view-title">AUDITORÍA Y TRAZABILIDAD</h1>
      <p class="view-subtitle">Registro completo de eventos del sistema</p>
    </div>

    <!-- Event Log Table -->
    <div class="section">
      <DataTable :columns="auditColumns" :rows="auditEvents" />
    </div>

    <!-- Timeline -->
    <div class="section">
      <TimelinePanel 
        title="LÍNEA TEMPORAL DE EVENTOS" 
        :events="timelineEvents"
        :width="1200"
        :height="150"
      />
    </div>

    <!-- Metrics -->
    <div class="metrics-grid">
      <MetricPanel 
        label="EVENTOS HOY" 
        :value="'2,847'" 
        subtitle="Promedio: 2,340/día"
        status="normal"
      />
      <MetricPanel 
        label="EVENTOS CRÍTICOS" 
        :value="7" 
        subtitle="Últimas 24 horas"
        status="warning"
      />
      <MetricPanel 
        label="TASA DE REGISTRO" 
        :value="'100%'" 
        subtitle="Sin pérdidas"
        status="normal"
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

const auditColumns: TableColumn[] = [
  { key: 'timestamp', label: 'TIMESTAMP', type: 'mono' },
  { key: 'tipo', label: 'TIPO' },
  { key: 'operador', label: 'OPERADOR', type: 'mono' },
  { key: 'accion', label: 'ACCIÓN' },
  { key: 'dominio', label: 'DOMINIO' },
  { key: 'resultado', label: 'RESULTADO', type: 'status' }
]

const auditEvents = ref([
  {
    timestamp: '2026-01-28 17:21:45',
    tipo: 'ACCESO',
    operador: 'OPR-7743',
    accion: 'Consulta dominio ALPHA-7',
    dominio: 'ALPHA-7',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 17:18:32',
    tipo: 'OPERACIÓN',
    operador: 'SYS-AUTO',
    accion: 'Sincronización automática',
    dominio: 'BETA-3',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 17:15:18',
    tipo: 'SISTEMA',
    operador: 'SYS-AUTO',
    accion: 'Backup incremental',
    dominio: 'SISTEMA',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 17:12:05',
    tipo: 'ADVERTENCIA',
    operador: 'SYS-MONITOR',
    accion: 'Latencia elevada detectada',
    dominio: 'BETA-3',
    resultado: 'pendiente'
  },
  {
    timestamp: '2026-01-28 17:08:41',
    tipo: 'ACCESO',
    operador: 'OPR-7743',
    accion: 'Autenticación exitosa',
    dominio: 'SISTEMA',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 17:05:27',
    tipo: 'OPERACIÓN',
    operador: 'OPR-5521',
    accion: 'Análisis de correlación iniciado',
    dominio: 'GAMMA-9',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 17:02:13',
    tipo: 'SISTEMA',
    operador: 'SYS-AUTO',
    accion: 'Verificación de integridad',
    dominio: 'SISTEMA',
    resultado: 'activo'
  },
  {
    timestamp: '2026-01-28 16:58:59',
    tipo: 'ACCESO',
    operador: 'OPR-3312',
    accion: 'Consulta registro histórico',
    dominio: 'DELTA-5',
    resultado: 'activo'
  }
])

const timelineEvents = ref([
  { label: 'ACCESO', type: 'normal' },
  { label: 'OPERACIÓN', type: 'normal' },
  { label: 'SISTEMA', type: 'normal' },
  { label: 'ADVERTENCIA', type: 'warning' },
  { label: 'ACCESO', type: 'normal' },
  { label: 'OPERACIÓN', type: 'normal' }
])
</script>

<style scoped>
.audit-view {
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

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}
</style>
