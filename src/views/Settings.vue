<template>
  <div class="settings-view">
    <div class="view-header">
      <h1 class="view-title">CONFIGURACIÓN DEL SISTEMA</h1>
      <p class="view-subtitle">Parámetros y preferencias operacionales</p>
    </div>

    <!-- System Configuration -->
    <div class="config-section">
      <div class="section-header">
        <h2 class="section-title">CONFIGURACIÓN GENERAL</h2>
      </div>
      <div class="config-grid">
        <div class="config-item">
          <span class="config-label">MODO OPERACIONAL</span>
          <span class="config-value">PRODUCCIÓN</span>
        </div>
        <div class="config-item">
          <span class="config-label">NIVEL DE LOG</span>
          <span class="config-value">INFO</span>
        </div>
        <div class="config-item">
          <span class="config-label">INTERVALO DE SYNC</span>
          <span class="config-value text-mono">300s</span>
        </div>
        <div class="config-item">
          <span class="config-label">RETENCIÓN DE DATOS</span>
          <span class="config-value text-mono">90 días</span>
        </div>
      </div>
    </div>

    <!-- Operator Preferences -->
    <div class="config-section">
      <div class="section-header">
        <h2 class="section-title">PREFERENCIAS DEL OPERADOR</h2>
      </div>
      <div class="config-grid">
        <div class="config-item">
          <span class="config-label">OPERADOR</span>
          <span class="config-value text-mono">{{ operatorStore.operator.id }}</span>
        </div>
        <div class="config-item">
          <span class="config-label">ROL</span>
          <span class="config-value">{{ operatorStore.operator.role }}</span>
        </div>
        <div class="config-item">
          <span class="config-label">NIVEL DE ACCESO</span>
          <span class="config-value" :style="{ color: operatorStore.clearanceColor }">
            {{ operatorStore.clearanceLevel }}
          </span>
        </div>
        <div class="config-item">
          <span class="config-label">ZONA HORARIA</span>
          <span class="config-value">UTC-06:00</span>
        </div>
      </div>
    </div>

    <!-- System Parameters -->
    <div class="config-section">
      <div class="section-header">
        <h2 class="section-title">PARÁMETROS DEL SISTEMA</h2>
      </div>
      <DataTable :columns="parametersColumns" :rows="systemParameters" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOperatorStore } from '@/store/operator'
import DataTable from '@/components/ui/DataTable.vue'
import type { TableColumn } from '@/components/ui/DataTable.vue'

const operatorStore = useOperatorStore()

const parametersColumns: TableColumn[] = [
  { key: 'parametro', label: 'PARÁMETRO' },
  { key: 'valor', label: 'VALOR', type: 'mono' },
  { key: 'unidad', label: 'UNIDAD' },
  { key: 'descripcion', label: 'DESCRIPCIÓN' }
]

const systemParameters = ref([
  {
    parametro: 'MAX_CONCURRENT_OPERATIONS',
    valor: '50',
    unidad: 'operaciones',
    descripcion: 'Máximo de operaciones simultáneas'
  },
  {
    parametro: 'QUERY_TIMEOUT',
    valor: '30',
    unidad: 'segundos',
    descripcion: 'Tiempo máximo de consulta'
  },
  {
    parametro: 'CACHE_SIZE',
    valor: '2048',
    unidad: 'MB',
    descripcion: 'Tamaño de caché en memoria'
  },
  {
    parametro: 'BACKUP_INTERVAL',
    valor: '3600',
    unidad: 'segundos',
    descripcion: 'Intervalo de backup automático'
  },
  {
    parametro: 'MAX_LOG_SIZE',
    valor: '1024',
    unidad: 'MB',
    descripcion: 'Tamaño máximo de archivo de log'
  },
  {
    parametro: 'SESSION_TIMEOUT',
    valor: '7200',
    unidad: 'segundos',
    descripcion: 'Tiempo de expiración de sesión'
  }
])
</script>

<style scoped>
.settings-view {
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

.config-section {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.section-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-default);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.config-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.config-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style>
