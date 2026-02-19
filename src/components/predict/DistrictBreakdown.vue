<template>
  <div class="district-breakdown">
    <!-- Header -->
    <div class="district-breakdown__header">
      <div>
        <h3 class="header__title">Desglose por Distrito</h3>
        <p class="header__subtitle">{{ distritos.length }} distritos electorales</p>
      </div>
      <div class="header__summary">
        <div class="summary-item summary-item--seguro">
          <span class="summary-dot"></span>
          <span class="summary-label">Seguros:</span>
          <span class="summary-value">{{ resumen.seguros }}</span>
        </div>
        <div class="summary-item summary-item--competido">
          <span class="summary-dot"></span>
          <span class="summary-label">Competidos:</span>
          <span class="summary-value">{{ resumen.competidos }}</span>
        </div>
        <div class="summary-item summary-item--riesgo">
          <span class="summary-dot"></span>
          <span class="summary-label">En riesgo:</span>
          <span class="summary-value">{{ resumen.enRiesgo }}</span>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="district-breakdown__table-container">
      <table class="district-table">
        <thead>
          <tr>
            <th @click="ordenarPor('nombre')" class="th-sortable">
              Distrito
              <span class="sort-icon">{{ getSortIcon('nombre') }}</span>
            </th>
            <th @click="ordenarPor('prediccion')" class="th-sortable">
              Predicción
              <span class="sort-icon">{{ getSortIcon('prediccion') }}</span>
            </th>
            <th @click="ordenarPor('probVictoria')" class="th-sortable">
              Prob. Victoria
              <span class="sort-icon">{{ getSortIcon('probVictoria') }}</span>
            </th>
            <th @click="ordenarPor('cambio7d')" class="th-sortable">
              Cambio 7d
              <span class="sort-icon">{{ getSortIcon('cambio7d') }}</span>
            </th>
            <th @click="ordenarPor('prioridad')" class="th-sortable">
              Prioridad
              <span class="sort-icon">{{ getSortIcon('prioridad') }}</span>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="distrito in distritosOrdenados" 
            :key="distrito.id"
            class="district-row"
            :class="{ 'district-row--alerta': distrito.alerta }"
          >
            <td class="td-nombre">
              <span v-if="distrito.alerta" class="alerta-icon">⚠</span>
              {{ distrito.nombre }}
            </td>
            <td class="td-prediccion">
              <div class="prediccion-cell">
                <span class="prediccion-valor">{{ distrito.prediccion.toFixed(1) }}%</span>
                <div class="prediccion-bar">
                  <div 
                    class="prediccion-bar-fill" 
                    :style="{ width: `${distrito.prediccion}%`, backgroundColor: distrito.color }"
                  ></div>
                </div>
              </div>
            </td>
            <td class="td-prob">
              <span class="prob-valor" :style="{ color: getProbColor(distrito.probVictoria) }">
                {{ distrito.probVictoria }}%
              </span>
            </td>
            <td class="td-cambio">
              <span 
                class="cambio-valor" 
                :class="{ 
                  'cambio-positivo': distrito.cambio7d > 0, 
                  'cambio-negativo': distrito.cambio7d < 0,
                  'cambio-neutral': distrito.cambio7d === 0
                }"
              >
                {{ distrito.cambio7d > 0 ? '+' : '' }}{{ distrito.cambio7d.toFixed(1) }}%
              </span>
            </td>
            <td class="td-prioridad">
              <span class="prioridad-badge" :class="`prioridad-badge--${distrito.prioridad}`">
                {{ getPrioridadLabel(distrito.prioridad) }}
              </span>
            </td>
            <td class="td-acciones">
              <button class="action-btn" @click="$emit('ver-estrategia', distrito)">
                Ver estrategia
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="district-breakdown__footer">
      <button class="footer-btn footer-btn--secondary" @click="$emit('toggle-mapa')">
        <span class="btn-icon">🗺️</span>
        Ver mapa
      </button>
      <button class="footer-btn footer-btn--primary" @click="$emit('exportar')">
        <span class="btn-icon">📥</span>
        Exportar tabla
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Distrito {
  id: number
  nombre: string
  prediccion: number
  probVictoria: number
  cambio7d: number
  prioridad: 'seguro' | 'competido' | 'riesgo'
  color: string
  alerta?: boolean
}

interface Resumen {
  seguros: number
  competidos: number
  enRiesgo: number
}

interface Props {
  distritos: Distrito[]
  resumen: Resumen
}

const props = defineProps<Props>()

defineEmits<{
  'ver-estrategia': [distrito: Distrito]
  'toggle-mapa': []
  'exportar': []
}>()

// Sorting state
const sortKey = ref<keyof Distrito>('id')
const sortOrder = ref<'asc' | 'desc'>('asc')

const ordenarPor = (key: keyof Distrito) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'desc'
  }
}

const distritosOrdenados = computed(() => {
  const sorted = [...props.distritos].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder.value === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal)
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    return 0
  })
  
  return sorted
})

const getSortIcon = (key: keyof Distrito): string => {
  if (sortKey.value !== key) return '↕'
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

const getProbColor = (prob: number): string => {
  if (prob >= 70) return '#52C41A'
  if (prob >= 50) return '#FA8C16'
  return '#D32F2F'
}

const getPrioridadLabel = (prioridad: string): string => {
  const labels: Record<string, string> = {
    seguro: '🟢 Seguro',
    competido: '🟡 Competido',
    riesgo: '🔴 Riesgo'
  }
  return labels[prioridad] || prioridad
}
</script>

<style scoped>
.district-breakdown {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.district-breakdown__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.header__title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #E8EAED;
  margin: 0 0 4px 0;
}

.header__subtitle {
  font-size: 13px;
  color: #9AA0A6;
  margin: 0;
}

.header__summary {
  display: flex;
  gap: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.summary-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.summary-item--seguro .summary-dot {
  background: #52C41A;
}

.summary-item--competido .summary-dot {
  background: #FA8C16;
}

.summary-item--riesgo .summary-dot {
  background: #D32F2F;
}

.summary-label {
  color: #9AA0A6;
}

.summary-value {
  font-family: 'Roboto Mono', monospace;
  color: #E8EAED;
  font-weight: 600;
}

/* Table */
.district-breakdown__table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.district-table {
  width: 100%;
  border-collapse: collapse;
}

.district-table thead {
  background: #0B0E11;
}

.district-table th {
  padding: 12px 16px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #2A3F5F;
}

.th-sortable {
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
}

.th-sortable:hover {
  color: #4A90E2;
}

.sort-icon {
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.6;
}

.district-table tbody tr {
  border-bottom: 1px solid #2A3F5F;
  transition: background 0.2s ease;
}

.district-table tbody tr:hover {
  background: rgba(74, 144, 226, 0.05);
}

.district-row--alerta {
  background: rgba(250, 140, 22, 0.05);
}

.district-table td {
  padding: 14px 16px;
  font-size: 13px;
  color: #E8EAED;
}

.td-nombre {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.alerta-icon {
  color: #FA8C16;
  margin-right: 6px;
}

.prediccion-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.prediccion-valor {
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
}

.prediccion-bar {
  height: 4px;
  background: #0B0E11;
  border-radius: 2px;
  overflow: hidden;
  width: 100px;
}

.prediccion-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.prob-valor {
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
}

.cambio-valor {
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
}

.cambio-positivo {
  color: #52C41A;
}

.cambio-negativo {
  color: #D32F2F;
}

.cambio-neutral {
  color: #9AA0A6;
}

.prioridad-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.prioridad-badge--seguro {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

.prioridad-badge--competido {
  background: rgba(250, 140, 22, 0.15);
  color: #FA8C16;
}

.prioridad-badge--riesgo {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}

.action-btn {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  border-color: #6BA3E8;
}

/* Footer */
.district-breakdown__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.footer-btn--primary {
  background: #4A90E2;
  color: #FFFFFF;
}

.footer-btn--primary:hover {
  background: #6BA3E8;
}

.footer-btn--secondary {
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
}

.footer-btn--secondary:hover {
  background: rgba(74, 144, 226, 0.1);
}

.btn-icon {
  font-size: 16px;
}
</style>
