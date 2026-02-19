<template>
  <div class="recommendations-list">
    <!-- Header -->
    <div class="recommendations-list__header">
      <div>
        <h3 class="header__title">Recomendaciones IA</h3>
        <p class="header__subtitle">{{ recomendaciones.length }} acciones sugeridas</p>
      </div>
      <div class="header__filters">
        <button 
          v-for="filtro in filtros" 
          :key="filtro"
          class="filter-btn"
          :class="{ 'filter-btn--active': filtroActivo === filtro }"
          @click="filtroActivo = filtro"
        >
          {{ filtro }}
        </button>
      </div>
    </div>

    <!-- Recommendations -->
    <div class="recommendations-list__items">
      <div 
        v-for="rec in recomendacionesFiltradas" 
        :key="rec.id"
        class="recommendation-card"
        :class="`recommendation-card--${rec.severidad}`"
      >
        <!-- Header -->
        <div class="recommendation-card__header">
          <div class="header-left">
            <span class="severity-badge" :class="`severity-badge--${rec.severidad}`">
              {{ getSeverityIcon(rec.severidad) }}
            </span>
            <div>
              <h4 class="recommendation-title">{{ rec.titulo }}</h4>
              <p class="recommendation-desc">{{ rec.descripcion }}</p>
            </div>
          </div>
          <div class="header-right">
            <div class="priority-badge" :class="`priority-badge--${rec.prioridad.toLowerCase()}`">
              {{ rec.prioridad }}
            </div>
          </div>
        </div>

        <!-- Situation -->
        <div class="recommendation-card__situation">
          <div class="situation-label">Situación</div>
          <div class="situation-text">{{ rec.situacion }}</div>
        </div>

        <!-- Metrics -->
        <div class="recommendation-card__metrics">
          <div class="metric-box">
            <div class="metric-label">Impacto potencial</div>
            <div class="metric-value metric-value--impact">{{ rec.impactoPotencial }}</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Confianza</div>
            <div class="metric-value">{{ rec.confianza }}%</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Costo estimado</div>
            <div class="metric-value">${{ formatNumber(rec.costoEstimado) }}</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">Tiempo</div>
            <div class="metric-value">{{ rec.tiempo }}</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">ROI</div>
            <div class="metric-value metric-value--roi">{{ rec.roi }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="recommendation-card__actions-list">
          <div class="actions-list-header">Plan de acción</div>
          <div class="actions-list-items">
            <div 
              v-for="(accion, index) in rec.acciones" 
              :key="index"
              class="action-item"
            >
              <input type="checkbox" :id="`action-${rec.id}-${index}`" class="action-checkbox" />
              <label :for="`action-${rec.id}-${index}`" class="action-label">
                {{ accion }}
              </label>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="recommendation-card__footer">
          <button class="footer-btn footer-btn--secondary" @click="$emit('ver-detalle', rec)">
            Ver análisis completo
          </button>
          <button class="footer-btn footer-btn--primary" @click="$emit('asignar', rec)">
            <span class="btn-icon">👤</span>
            Asignar a equipo
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="recomendacionesFiltradas.length === 0" class="recommendations-list__empty">
      <div class="empty-icon">🎯</div>
      <div class="empty-text">No hay recomendaciones para este filtro</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Recomendacion {
  id: string
  severidad: 'critical' | 'high' | 'medium' | 'low'
  prioridad: string
  titulo: string
  descripcion: string
  situacion: string
  impactoPotencial: string
  confianza: number
  acciones: string[]
  costoEstimado: number
  tiempo: string
  roi: string
}

interface Props {
  recomendaciones: Recomendacion[]
}

const props = defineProps<Props>()

defineEmits<{
  'ver-detalle': [rec: Recomendacion]
  'asignar': [rec: Recomendacion]
}>()

const filtros = ['Todas', 'Alta', 'Media', 'Baja']
const filtroActivo = ref('Todas')

const recomendacionesFiltradas = computed(() => {
  if (filtroActivo.value === 'Todas') return props.recomendaciones
  return props.recomendaciones.filter(r => r.prioridad === filtroActivo.value)
})

const getSeverityIcon = (severity: string): string => {
  const icons: Record<string, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢'
  }
  return icons[severity] || '⚪'
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-MX').format(num)
}
</script>

<style scoped>
.recommendations-list {
  background: rgba(26, 35, 50, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
}

/* Header */
.recommendations-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
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

.header__filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 14px;
  background: transparent;
  border: 1px solid #2A3F5F;
  color: #9AA0A6;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #4A90E2;
  color: #4A90E2;
}

.filter-btn--active {
  background: #4A90E2;
  border-color: #4A90E2;
  color: #FFFFFF;
}

/* Items */
.recommendations-list__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Recommendation Card */
.recommendation-card {
  background: rgba(11, 14, 17, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
}

.recommendation-card--critical {
  border-left-color: #D32F2F;
}

.recommendation-card--high {
  border-left-color: #FA8C16;
}

.recommendation-card--medium {
  border-left-color: #FA8C16;
}

.recommendation-card--low {
  border-left-color: #52C41A;
}

.recommendation-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.header-left {
  display: flex;
  gap: 12px;
  flex: 1;
}

.severity-badge {
  font-size: 20px;
  flex-shrink: 0;
}

.recommendation-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #E8EAED;
  margin: 0 0 6px 0;
}

.recommendation-desc {
  font-size: 13px;
  color: #9AA0A6;
  margin: 0;
}

.priority-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-badge--alta {
  background: rgba(211, 47, 47, 0.15);
  color: #D32F2F;
}

.priority-badge--media {
  background: rgba(250, 140, 22, 0.15);
  color: #FA8C16;
}

.priority-badge--baja {
  background: rgba(82, 196, 26, 0.15);
  color: #52C41A;
}

/* Situation */
.recommendation-card__situation {
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(74, 144, 226, 0.05);
  border-left: 2px solid #4A90E2;
  border-radius: 4px;
}

.situation-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  color: #4A90E2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.situation-text {
  font-size: 13px;
  color: #E8EAED;
}

/* Metrics */
.recommendation-card__metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.metric-box {
  background: #1A2332;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #2A3F5F;
}

.metric-label {
  font-size: 11px;
  color: #9AA0A6;
  margin-bottom: 4px;
}

.metric-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #E8EAED;
}

.metric-value--impact {
  color: #52C41A;
}

.metric-value--roi {
  color: #4A90E2;
}

/* Actions List */
.recommendation-card__actions-list {
  margin-bottom: 16px;
}

.actions-list-header {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.actions-list-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.action-checkbox {
  margin-top: 2px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.action-label {
  font-size: 13px;
  color: #E8EAED;
  cursor: pointer;
  line-height: 1.4;
}

/* Footer */
.recommendation-card__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #2A3F5F;
}

.footer-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
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
  font-size: 14px;
}

/* Empty State */
.recommendations-list__empty {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #9AA0A6;
}
</style>
