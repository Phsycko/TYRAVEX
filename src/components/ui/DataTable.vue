<template>
  <div class="data-table">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" class="table-header">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="table-row">
            <td v-for="column in columns" :key="column.key" class="table-cell">
              <span v-if="column.type === 'status'" 
                    class="status-badge" 
                    :class="`status-${row[column.key]}`">
                {{ row[column.key] }}
              </span>
              <span v-else-if="column.type === 'mono'" class="text-mono">
                {{ row[column.key] }}
              </span>
              <span v-else>
                {{ row[column.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
  type?: 'text' | 'status' | 'mono'
}

interface Props {
  columns: TableColumn[]
  rows: Record<string, any>[]
}

defineProps<Props>()
</script>

<style scoped>
.data-table {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  padding: var(--space-4) var(--space-6);
  text-align: left;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-default);
}

.table-row {
  transition: background-color var(--transition-fast);
}

.table-row:hover {
  background-color: var(--color-bg-tertiary);
}

.table-row:not(:last-child) {
  border-bottom: 1px solid var(--color-border-subtle);
}

.table-cell {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.status-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
}

.status-online,
.status-activo,
.status-active {
  color: var(--color-status-online);
  border-color: var(--color-status-online);
}

.status-degraded,
.status-pendiente,
.status-pending {
  color: var(--color-status-warning);
  border-color: var(--color-status-warning);
}

.status-offline,
.status-inactivo,
.status-inactive {
  color: var(--color-status-offline);
  border-color: var(--color-status-offline);
}
</style>
