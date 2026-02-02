<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
}

interface Props {
  columns: Column[]
  data: Record<string, any>[]
  loading?: boolean
  emptyMessage?: string
  rowsPerPage?: number
  showPagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyMessage: 'No hay datos disponibles',
  rowsPerPage: 10,
  showPagination: true
})

const emit = defineEmits<{
  rowClick: [row: Record<string, any>]
}>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const sortedData = computed(() => {
  if (!sortKey.value) return props.data

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value!]
    const bVal = b[sortKey.value!]

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
    }

    const aStr = String(aVal).toLowerCase()
    const bStr = String(bVal).toLowerCase()

    if (sortOrder.value === 'asc') {
      return aStr.localeCompare(bStr)
    }
    return bStr.localeCompare(aStr)
  })
})

const paginatedData = computed(() => {
  if (!props.showPagination) return sortedData.value

  const start = (currentPage.value - 1) * props.rowsPerPage
  const end = start + props.rowsPerPage
  return sortedData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(props.data.length / props.rowsPerPage)
})

const handleSort = (column: Column) => {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortOrder.value = 'asc'
  }
}

const getAlignClass = (align?: string) => {
  switch (align) {
    case 'center': return 'text-center'
    case 'right': return 'text-right'
    default: return 'text-left'
  }
}
</script>

<template>
  <div class="table-container custom-scrollbar">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              getAlignClass(column.align),
              column.sortable ? 'sortable' : ''
            ]"
            :style="column.width ? { width: column.width } : {}"
            @click="handleSort(column)"
          >
            <div class="flex items-center gap-2" :class="column.align === 'right' ? 'justify-end' : ''">
              {{ column.label }}
              <template v-if="column.sortable">
                <svg
                  v-if="sortKey === column.key"
                  class="w-4 h-4"
                  :class="sortOrder === 'desc' ? 'rotate-180' : ''"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
                <svg v-else class="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="i in rowsPerPage" :key="i">
            <td v-for="column in columns" :key="column.key">
              <div class="skeleton h-4 w-full rounded" />
            </td>
          </tr>
        </template>

        <template v-else-if="paginatedData.length === 0">
          <tr>
            <td :colspan="columns.length" class="text-center py-8 text-tyravex-text-muted">
              {{ emptyMessage }}
            </td>
          </tr>
        </template>

        <template v-else>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            class="cursor-pointer"
            @click="emit('rowClick', row)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getAlignClass(column.align)"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div
      v-if="showPagination && totalPages > 1"
      class="flex items-center justify-between px-4 py-3 border-t border-tyravex-border bg-tyravex-bg-tertiary/50"
    >
      <div class="text-sm text-tyravex-text-muted">
        Mostrando {{ (currentPage - 1) * rowsPerPage + 1 }} - {{ Math.min(currentPage * rowsPerPage, data.length) }} de {{ data.length }}
      </div>
      <div class="flex items-center gap-2">
        <button
          class="btn-outline btn-sm"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Anterior
        </button>
        <span class="text-sm text-tyravex-text-secondary px-2">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          class="btn-outline btn-sm"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>
