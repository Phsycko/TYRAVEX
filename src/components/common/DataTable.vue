<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

const props = defineProps<{
  columns: Column[]
  data: any[]
  loading?: boolean
  selectable?: boolean
  pagination?: {
    page: number
    perPage: number
    total: number
  }
}>()

const emit = defineEmits(['sort', 'page-change', 'selection-change', 'row-click'])

const selectedRows = ref<Set<any>>(new Set())
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const allSelected = computed(() => {
  return props.data.length > 0 && selectedRows.value.size === props.data.length
})

const indeterminate = computed(() => {
  return selectedRows.value.size > 0 && selectedRows.value.size < props.data.length
})

function toggleAll() {
  if (allSelected.value) {
    selectedRows.value.clear()
  } else {
    props.data.forEach(row => selectedRows.value.add(row))
  }
  emit('selection-change', Array.from(selectedRows.value))
}

function toggleRow(row: any) {
  if (selectedRows.value.has(row)) {
    selectedRows.value.delete(row)
  } else {
    selectedRows.value.add(row)
  }
  emit('selection-change', Array.from(selectedRows.value))
}

function handleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto rounded-lg border border-border-medium bg-bg-secondary">
      <table class="min-w-full divide-y divide-border-medium">
        <thead class="bg-bg-tertiary">
          <tr>
            <th v-if="selectable" scope="col" class="px-4 py-3 w-10">
              <input 
                type="checkbox" 
                class="rounded border-border-medium bg-bg-primary text-accent focus:ring-accent"
                :checked="allSelected"
                :indeterminate="indeterminate"
                @change="toggleAll"
              >
            </th>
            <th 
              v-for="col in columns" 
              :key="col.key"
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap"
              :class="[
                col.sortable ? 'cursor-pointer hover:text-text-primary hover:bg-bg-tertiary/80' : '',
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              ]"
              :style="{ width: col.width }"
              @click="col.sortable && handleSort(col.key)"
            >
              <div class="flex items-center gap-1" :class="{ 'justify-center': col.align === 'center', 'justify-end': col.align === 'right' }">
                {{ col.label }}
                <span v-if="col.sortable" class="flex flex-col">
                  <ChevronUpIcon class="w-3 h-3 -mb-1" :class="sortKey === col.key && sortOrder === 'asc' ? 'text-accent' : 'text-text-tertiary/30'" />
                  <ChevronDownIcon class="w-3 h-3" :class="sortKey === col.key && sortOrder === 'desc' ? 'text-accent' : 'text-text-tertiary/30'" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-medium bg-bg-secondary/50">
          <tr v-if="loading" class="animate-pulse">
            <td :colspan="selectable ? columns.length + 1 : columns.length" class="px-4 py-8 text-center text-text-tertiary">
              Loading data...
            </td>
          </tr>
          <tr v-else-if="data.length === 0">
            <td :colspan="selectable ? columns.length + 1 : columns.length" class="px-4 py-8 text-center text-text-tertiary">
              No data available
            </td>
          </tr>
          <tr 
            v-for="(row, idx) in data" 
            :key="idx" 
            class="hover:bg-bg-tertiary/50 transition-colors group cursor-default"
            :class="{ 'bg-bg-tertiary/30': selectedRows.has(row) }"
            @click="emit('row-click', row)"
          >
            <td v-if="selectable" class="px-4 py-4 whitespace-nowrap">
              <input 
                type="checkbox" 
                class="rounded border-border-medium bg-bg-primary text-accent focus:ring-accent"
                :checked="selectedRows.has(row)"
                @change.stop="toggleRow(row)"
                @click.stop
              >
            </td>
            <td 
              v-for="col in columns" 
              :key="col.key"
              class="px-4 py-4 whitespace-nowrap text-sm text-text-secondary group-hover:text-text-primary transition-colors"
              :class="[
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              ]"
            >
              <slot :name="col.key" :value="row[col.key]" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="flex items-center justify-between px-4 py-3 border-t border-border-subtle">
      <div class="flex flex-1 justify-between sm:hidden">
        <button 
          @click="emit('page-change', pagination.page - 1)" 
          :disabled="pagination.page === 1"
          class="relative inline-flex items-center rounded-md border border-border-medium bg-bg-secondary px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg-tertiary"
        >
          Previous
        </button>
        <button 
          @click="emit('page-change', pagination.page + 1)"
          :disabled="pagination.page * pagination.perPage >= pagination.total"
          class="relative ml-3 inline-flex items-center rounded-md border border-border-medium bg-bg-secondary px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg-tertiary"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-text-tertiary">
            Showing
            <span class="font-medium text-text-primary">{{ (pagination.page - 1) * pagination.perPage + 1 }}</span>
            to
            <span class="font-medium text-text-primary">{{ Math.min(pagination.page * pagination.perPage, pagination.total) }}</span>
            of
            <span class="font-medium text-text-primary">{{ pagination.total }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button 
              @click="emit('page-change', pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-tertiary ring-1 ring-inset ring-border-medium hover:bg-bg-tertiary focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </button>
            <button 
              @click="emit('page-change', pagination.page + 1)"
              :disabled="pagination.page * pagination.perPage >= pagination.total"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-tertiary ring-1 ring-inset ring-border-medium hover:bg-bg-tertiary focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
