<template>
  <div class="blindaje-view">
    <nav class="sub-nav">
      <router-link to="/blindaje" exact-active-class="active">DASHBOARD</router-link>
      <router-link to="/blindaje/amenazas" active-class="active">AMENAZAS RED</router-link>
      <router-link to="/blindaje/riesgo-geografico" active-class="active">RIESGO GEOGRÁFICO</router-link>
      <router-link to="/blindaje/alertas" active-class="active">ALERTAS</router-link>
      <router-link to="/blindaje/informes" active-class="active">INFORMES</router-link>
      <router-link to="/blindaje/espacios" active-class="active">ESPACIOS</router-link>
    </nav>

    <header class="view-header">
      <div class="section-tag">MÓDULO BLINDAJE</div>
      <h1 class="section-title">RIESGO GEOGRÁFICO</h1>
      <p class="section-subtitle">Análisis de hostilidad digital por región y evaluación de riesgo en eventos</p>
    </header>

    <div class="grid-map-panel">
      <!-- Map -->
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">MAPA DE HOSTILIDAD DIGITAL</span>
          <span class="badge badge-info">INTERACTIVO</span>
        </div>
        <div class="map-wrapper">
          <MexicoMap mode="security" @state-select="handleStateSelect" />
        </div>
      </div>

      <!-- Side Panel -->
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">ANÁLISIS DE REGIÓN</span>
        </div>
        <div v-if="!selectedRegion" class="empty-panel">
          <div class="empty-icon">🗺</div>
          <p class="empty-text">Selecciona un estado en el mapa para ver el análisis de hostilidad digital</p>
        </div>
        <div v-else class="region-detail">
          <div class="region-name">{{ selectedRegion.estado }}</div>
          <span class="badge" :class="'badge-' + riskBadge(selectedRegion.nivel_riesgo)">
            {{ selectedRegion.nivel_riesgo.toUpperCase() }}
          </span>

          <div class="detail-stat mt-16">
            <span class="detail-label">SCORE HOSTILIDAD</span>
            <span class="detail-value" :style="{ color: scoreColor(selectedRegion.score_hostilidad) }">
              {{ selectedRegion.score_hostilidad }}/100
            </span>
          </div>
          <div class="score-bar">
            <div class="score-fill" :style="{ width: selectedRegion.score_hostilidad + '%', background: scoreColor(selectedRegion.score_hostilidad) }"></div>
          </div>

          <div class="detail-stat">
            <span class="detail-label">MENCIONES NEGATIVAS</span>
            <span class="detail-value mono-text">{{ formatNumber(selectedRegion.menciones_negativas) }}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-label">TENDENCIA</span>
            <span class="detail-value" :style="{ color: trendColor(selectedRegion.tendencia) }">
              {{ trendArrow(selectedRegion.tendencia) }} {{ selectedRegion.tendencia.toUpperCase() }}
            </span>
          </div>

          <div class="detail-section">
            <div class="detail-label">KEYWORDS FRECUENTES</div>
            <div class="keyword-badges">
              <span v-for="kw in selectedRegion.keywords_frecuentes" :key="kw" class="badge badge-high">{{ kw }}</span>
            </div>
          </div>

          <div class="detail-section" v-if="regionThreats.length > 0">
            <div class="detail-label">AMENAZAS EN ESTA REGIÓN</div>
            <div v-for="t in regionThreats" :key="t.id" class="region-threat">
              <span class="badge" :class="'badge-' + getSeverityBadge(t.severidad)">{{ t.severidad }}</span>
              <div>
                <div class="threat-type-sm">{{ getThreatTypeLabel(t.tipo) }}</div>
                <div class="threat-snippet">{{ t.contenido.slice(0, 80) }}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Events -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">EVENTOS PRÓXIMOS — EVALUACIÓN DE RIESGO</span>
      </div>
      <div class="events-grid">
        <div v-for="ev in eventosRiesgo" :key="ev.id" class="event-card">
          <div class="event-header">
            <div class="event-name">{{ ev.nombre_evento }}</div>
            <span class="badge" :class="riskScoreBadge(ev.nivel_riesgo_zona)">{{ ev.nivel_riesgo_zona }}/100</span>
          </div>
          <div class="event-meta mono-text">{{ ev.fecha }} · {{ ev.lugar }}</div>
          <div class="event-risk-bar">
            <div class="event-risk-fill" :style="{ width: ev.nivel_riesgo_zona + '%', background: scoreColor(ev.nivel_riesgo_zona) }"></div>
          </div>
          <div class="event-rec">{{ ev.recomendacion }}</div>
          <div class="event-factors">
            <span v-for="(f, i) in ev.factores_riesgo" :key="i" class="factor-badge">{{ f }}</span>
          </div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX BLINDAJE // INTELIGENCIA DE AMENAZAS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  hostilidadRegiones, amenazas, eventosRiesgo,
  getSeverityBadge, getThreatTypeLabel, type HostilidadRegion, type TrendDir,
} from '@/data/blindajeData'
import MexicoMap from '@/components/maps/MexicoMap.vue'
import type { StateMetrics } from '@/data/mapData'

const selectedRegion = ref<HostilidadRegion | null>(null)

function handleStateSelect(state: StateMetrics) {
  const match = hostilidadRegiones.find(r =>
    r.estado.toLowerCase() === state.name.toLowerCase() ||
    r.stateId === state.id
  )
  selectedRegion.value = match || null
}

const regionThreats = computed(() => {
  if (!selectedRegion.value) return []
  return amenazas.filter(a => a.ubicacion === selectedRegion.value!.estado && a.estado !== 'resuelta').slice(0, 5)
})

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}
function scoreColor(s: number): string {
  if (s >= 70) return '#ff4444'
  if (s >= 50) return '#ff6b35'
  if (s >= 30) return '#ffcc00'
  return '#00ffaa'
}
function riskBadge(nivel: string): string {
  if (nivel === 'crítico') return 'danger'
  if (nivel === 'alto') return 'high'
  if (nivel === 'medio') return 'warning'
  return 'success'
}
function riskScoreBadge(n: number): string {
  if (n > 80) return 'badge-danger'
  if (n > 60) return 'badge-high'
  if (n > 40) return 'badge-warning'
  return 'badge-success'
}
function trendArrow(t: TrendDir): string { return t === 'aumentando' ? '▲' : t === 'disminuyendo' ? '▼' : '◆' }
function trendColor(t: TrendDir): string { return t === 'aumentando' ? '#ff4444' : t === 'disminuyendo' ? '#00ffaa' : '#ffcc00' }
</script>

<style scoped>
.blindaje-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.sub-nav { display: flex; gap: 0; background: rgba(20, 22, 28, 0.7); border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; border-radius: 2px 2px 0 0; }
.sub-nav a { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-decoration: none; padding: 12px 20px; border-bottom: 2px solid transparent; transition: all 0.15s ease; }
.sub-nav a:hover { color: #e0e0e0; }
.sub-nav a.active { color: #ff6b35; border-bottom-color: #ff6b35; background: rgba(255,107,53,0.06); }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.grid-map-panel { display: grid; grid-template-columns: 7fr 3fr; gap: 16px; min-height: 560px; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.mt-16 { margin-top: 16px; }
.map-wrapper { height: 480px; border-radius: 4px; overflow: hidden; }
.map-wrapper :deep(.mexico-map-root) { border: none; border-radius: 0; }
.empty-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; }
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
.empty-text { font-size: 13px; color: #666; line-height: 1.6; }
.region-detail { }
.region-name { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 600; color: #e0e0e0; margin-bottom: 8px; }
.detail-stat { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.detail-label { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
.detail-value { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; }
.score-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin: 8px 0 12px; }
.score-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.detail-section { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.keyword-badges { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.region-threat { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; }
.threat-type-sm { font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.08em; color: #e0e0e0; }
.threat-snippet { font-size: 11px; color: #888; line-height: 1.4; margin-top: 2px; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.event-card { background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 16px; }
.event-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.event-name { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.event-meta { font-size: 10px; color: #888; margin-bottom: 8px; }
.event-risk-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 10px; }
.event-risk-fill { height: 100%; border-radius: 2px; }
.event-rec { font-size: 11px; color: #a0a0a0; line-height: 1.5; margin-bottom: 8px; padding-left: 8px; border-left: 2px solid rgba(255,107,53,0.3); }
.event-factors { display: flex; flex-wrap: wrap; gap: 4px; }
.factor-badge { font-family: 'Roboto Mono', monospace; font-size: 9px; padding: 2px 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #888; }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 32px; }
</style>
