<template>
  <div class="domains-view">
    <div class="view-header">
      <h1 class="view-title">DOMINIOS DE INFORMACIÓN</h1>
      <p class="view-subtitle">Gestión y control de dominios soberanos</p>
    </div>

    <DataTable :columns="columns" :rows="domains" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/ui/DataTable.vue'
import type { TableColumn } from '@/components/ui/DataTable.vue'

const columns: TableColumn[] = [
  { key: 'id', label: 'ID', type: 'mono' },
  { key: 'nombre', label: 'NOMBRE' },
  { key: 'tipo', label: 'TIPO' },
  { key: 'registros', label: 'REGISTROS', type: 'mono' },
  { key: 'estado', label: 'ESTADO', type: 'status' },
  { key: 'ultimaActualizacion', label: 'ÚLTIMA ACTUALIZACIÓN', type: 'mono' }
]

const domains = ref([
  {
    id: 'DOM-001',
    nombre: 'ALPHA-7',
    tipo: 'Financiero',
    registros: '847,392',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:15:42'
  },
  {
    id: 'DOM-002',
    nombre: 'BETA-3',
    tipo: 'Operacional',
    registros: '1,245,678',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:18:12'
  },
  {
    id: 'DOM-003',
    nombre: 'GAMMA-9',
    tipo: 'Inteligencia',
    registros: '523,441',
    estado: 'pendiente',
    ultimaActualizacion: '2026-01-28 16:42:03'
  },
  {
    id: 'DOM-004',
    nombre: 'DELTA-5',
    tipo: 'Logística',
    registros: '392,847',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:20:55'
  },
  {
    id: 'DOM-005',
    nombre: 'EPSILON-2',
    tipo: 'Seguridad',
    registros: '156,293',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:19:31'
  },
  {
    id: 'DOM-006',
    nombre: 'ZETA-8',
    tipo: 'Comunicaciones',
    registros: '2,847,192',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:21:08'
  },
  {
    id: 'DOM-007',
    nombre: 'ETA-4',
    tipo: 'Recursos Humanos',
    registros: '94,582',
    estado: 'inactivo',
    ultimaActualizacion: '2026-01-27 22:15:42'
  },
  {
    id: 'DOM-008',
    nombre: 'THETA-1',
    tipo: 'Investigación',
    registros: '673,921',
    estado: 'activo',
    ultimaActualizacion: '2026-01-28 17:17:29'
  }
])
</script>

<style scoped>
.domains-view {
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
</style>
