<template>
  <div class="historical-performance">
    <!-- Header -->
    <div class="historical-performance__header">
      <div>
        <h3 class="header__title">Historial de Predicciones</h3>
        <p class="header__subtitle">Track record del modelo en elecciones pasadas</p>
      </div>
      <div class="header__stats">
        <div class="stat-item">
          <span class="stat-label">Precisión promedio</span>
          <span class="stat-value stat-value--success">{{ estadisticas.precisionPromedio }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Tasa de acierto</span>
          <span class="stat-value stat-value--success">{{ estadisticas.tasaAcierto }}%</span>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="historical-performance__table">
      <table class="performance-table">
        <thead>
          <tr>
            <th>Elección</th>
            <th>Predicción</th>
            <th>Real</th>
            <th>Error</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="eleccion in historico" 
            :key="eleccion.id"
            class="table-row"
          >
            <td class="td-eleccion">
              <div class="eleccion-nombre">{{ eleccion.eleccion }}</div>
              <div class="eleccion-año">{{ eleccion.año }}</div>
            </td>
            <td class="td-prediccion">
              <span class="valor-prediccion">{{ eleccion.prediccion.toFixed(1) }}%</span>
            </td>
            <td class="td-real">
              <span class="valor-real">{{ eleccion.real.toFixed(1) }}%</span>
            </td>
            <td class="td-error">
              <span 
                class="valor-error" 
                :class="{ 
                  'error-positivo': eleccion.error > 0, 
                  'error-negativo': eleccion.error < 0,
                  'error-perfecto': Math.abs(eleccion.error) < 0.5
                }"
              >
                {{ eleccion.error > 0 ? '+' : '' }}{{ eleccion.error.toFixed(1) }}%
              </span>
              <div class="error-bar">
                <div 
                  class="error-bar-fill" 
                  :style="{ 
                    width: `${Math.min(100, Math.abs(eleccion.error) * 20)}%`,
                    backgroundColor: getErrorColor(eleccion.error)
                  }"
                ></div>
              </div>
            </td>
            <td class="td-resultado">
              <span 
                class="resultado-badge" 
                :class="{ 
                  'resultado-badge--gano': eleccion.resultado === 'ganó', 
                  'resultado-badge--perdio': eleccion.resultado === 'perdió' 
                }"
              >
                {{ eleccion.resultado === 'ganó' ? '✓ Ganó' : '✗ Perdió' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary Stats -->
    <div class="historical-performance__summary">
      <div class="summary-card">
        <div class="summary-label">Total elecciones</div>
        <div class="summary-value">{{ estadisticas.totalElecciones }}</div>
      </div>
      <div class="summary-card summary-card--success">
        <div class="summary-label">Ganadas</div>
        <div class="summary-value">{{ estadisticas.ganadas }}</div>
      </div>
      <div class="summary-card summary-card--error">
        <div class="summary-label">Perdidas</div>
        <div class="summary-value">{{ estadisticas.perdidas }}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Error absoluto promedio</div>
        <div class="summary-value">±{{ estadisticas.errorAbsolutoPromedio }}%</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="historical-performance__footer">
      <button class="footer-btn" @click="$emit('ver-analisis-errores')">
        <span class="btn-icon">🔍</span>
        Ver análisis de errores
      </button>
      <button class="footer-btn footer-btn--primary" @click="$emit('exportar')">
        <span class="btn-icon">📥</span>
        Exportar historial
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Eleccion {
  id: number
  eleccion: string
  prediccion: number
  real: number
  error: number
  resultado: string
  año: number
}

interface Estadisticas {
  precisionPromedio: number
  errorAbsolutoPromedio: number
  tasaAcierto: number
  totalElecciones: number
  ganadas: number
  perdidas: number
}

interface Props {
  historico: Eleccion[]
  estadisticas: Estadisticas
}

defineProps<Props>()

defineEmits<{
  'ver-analisis-errores': []
  'exportar': []
}>()

const getErrorColor = (error: number): string => {
  const absError = Math.abs(error)
  if (absError < 0.5) return '#52C41A'
  if (absError < 1.0) return '#4A90E2'
  if (absError < 2.0) return '#FA8C16'
  return '#D32F2F'
}
</script>

<style scoped>
.historical-performance {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.historical-performance__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 20px;
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

.header__stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #E8EAED;
}

.stat-value--success {
  color: #52C41A;
}

/* Table */
.historical-performance__table {
  overflow-x: auto;
  margin-bottom: 24px;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table thead {
  background: rgba(11, 14, 17, 0.6);
}

.performance-table th {
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

.performance-table tbody tr {
  border-bottom: 1px solid #2A3F5F;
  transition: background 0.2s ease;
}

.performance-table tbody tr:hover {
  background: rgba(74, 144, 226, 0.05);
}

.performance-table td {
  padding: 14px 16px;
  font-size: 13px;
  color: #E8EAED;
}

.td-eleccion {
  min-width: 200px;
}

.eleccion-nombre {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin-bottom: 2px;
}

.eleccion-año {
  font-size: 11px;
  color: #9AA0A6;
}

.valor-prediccion,
.valor-real {
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
}

.td-error {
  min-width: 120px;
}

.valor-error {
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.error-positivo {
  color: #FA8C16;
}

.error-negativo {
  color: #4A90E2;
}

.error-perfecto {
  color: #52C41A;
}

.error-bar {
  height: 4px;
  background: #0B0E11;
  border-radius: 2px;
  overflow: hidden;
}

.error-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.resultado-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.resultado-badge--gano {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

.resultado-badge--perdio {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}

/* Summary */
.historical-performance__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: rgba(11, 14, 17, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.summary-card--success {
  border-color: #52C41A;
  background: rgba(82, 196, 26, 0.05);
}

.summary-card--error {
  border-color: #D32F2F;
  background: rgba(211, 47, 47, 0.05);
}

.summary-label {
  font-size: 11px;
  color: #9AA0A6;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 24px;
  font-weight: 700;
  color: #E8EAED;
}

.summary-card--success .summary-value {
  color: #52C41A;
}

.summary-card--error .summary-value {
  color: #D32F2F;
}

/* Footer */
.historical-performance__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-btn:hover {
  background: rgba(74, 144, 226, 0.1);
}

.footer-btn--primary {
  background: #4A90E2;
  color: #FFFFFF;
}

.footer-btn--primary:hover {
  background: #6BA3E8;
}

.btn-icon {
  font-size: 14px;
}
</style>
