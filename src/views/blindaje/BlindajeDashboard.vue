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
      <div class="header-top">
        <div>
          <div class="section-tag">MÓDULO BLINDAJE</div>
          <h1 class="section-title">INTELIGENCIA DE AMENAZAS</h1>
          <p class="section-subtitle">Monitoreo de amenazas digitales y protección de candidatos</p>
        </div>
        <div class="header-actions">
          <div v-if="stats.criticas > 0" class="threat-badge">
            <span class="threat-dot"></span>
            <span class="threat-badge-text">AMENAZAS ACTIVAS</span>
          </div>
          <span class="timestamp mono-text">Última actualización: {{ nivelAmenazaGlobal.ultima_actualizacion }}</span>
          <button class="btn-generate" @click="void 0">GENERAR INFORME</button>
        </div>
      </div>
    </header>

    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">NIVEL DE AMENAZA GLOBAL</div>
        <div class="kpi-gauge-wrapper">
          <RiskGauge :score="nivelAmenazaGlobal.score" />
        </div>
        <div class="kpi-sub" :style="{ color: trendColor }">
          {{ trendArrow }} {{ nivelAmenazaGlobal.tendencia.toUpperCase() }}
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AMENAZAS ACTIVAS</div>
        <div class="kpi-value" style="color: #ff6b35;">{{ stats.amenazasActivas }}</div>
        <div class="kpi-sub" style="color: #a0a0a0;">
          {{ stats.criticas }} críticas / {{ stats.altas }} altas / {{ stats.medias }} medias
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ALCANCE HOSTIL</div>
        <div class="kpi-value" style="color: #ff4444;">{{ formattedAlcance }}</div>
        <div class="kpi-sub" style="color: #ffcc00;">+21.9% vs ayer</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">FUENTES MONITOREADAS</div>
        <div class="kpi-value" style="color: #4A90E2;">{{ stats.fuentesActivas }} de {{ stats.fuentesTotal }}</div>
        <div class="kpi-sub">
          <span class="fuente-indicators">
            <span v-for="f in fuentesIntel" :key="f.nombre" class="fuente-dot"
              :style="{ background: f.activa ? '#00ffaa' : '#ff4444' }" :title="f.nombre"></span>
          </span>
        </div>
      </div>
    </div>

    <div class="grid-main">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">MAPA DE CALOR DE RIESGO POR REGIÓN</span>
          <span class="badge badge-danger">{{ criticalRegions }} REGIONES CRÍTICAS</span>
        </div>
        <div class="map-wrapper">
          <MexicoMap mode="security" :readonly="true" />
        </div>
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">FEED DE AMENAZAS EN TIEMPO REAL</span>
          <span class="badge badge-high">{{ stats.amenazasActivas }} ACTIVAS</span>
        </div>
        <ThreatFeed :amenazas="amenazas" />
      </div>
    </div>

    <div class="grid-3col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">TENDENCIA DE HOSTILIDAD 24H</span>
        </div>
        <v-chart :option="hostilityChart" style="height: 300px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">TOP KEYWORDS HOSTILES</span>
        </div>
        <v-chart :option="keywordsChart" style="height: 300px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">PRÓXIMOS EVENTOS EN AGENDA</span>
        </div>
        <div class="eventos-list">
          <div v-for="ev in eventosRiesgo" :key="ev.id" class="evento-item">
            <div class="evento-top">
              <div class="evento-name">{{ ev.nombre_evento }}</div>
              <span class="badge" :class="riskBadge(ev.nivel_riesgo_zona)">RIESGO {{ ev.nivel_riesgo_zona }}</span>
            </div>
            <div class="evento-meta mono-text">{{ ev.fecha }} · {{ ev.lugar }}</div>
            <div class="evento-rec">{{ ev.recomendacion }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX BLINDAJE // INTELIGENCIA DE AMENAZAS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  nivelAmenazaGlobal, amenazas, hostilidadRegiones, keywordsMonitoreadas,
  eventosRiesgo, fuentesIntel, tendenciaHostilidad24h, getBlindajeStats,
} from '@/data/blindajeData'
import ThreatFeed from '@/components/blindaje/ThreatFeed.vue'
import RiskGauge from '@/components/blindaje/RiskGauge.vue'
import MexicoMap from '@/components/maps/MexicoMap.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const stats = computed(() => getBlindajeStats())
const criticalRegions = computed(() => hostilidadRegiones.filter(r => r.nivel_riesgo === 'crítico').length)

const formattedAlcance = computed(() => {
  const v = stats.value.alcanceHostil
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M'
  if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K'
  return String(v)
})

const trendArrow = computed(() => nivelAmenazaGlobal.tendencia === 'aumentando' ? '▲' : nivelAmenazaGlobal.tendencia === 'disminuyendo' ? '▼' : '◆')
const trendColor = computed(() => nivelAmenazaGlobal.tendencia === 'aumentando' ? '#ff4444' : nivelAmenazaGlobal.tendencia === 'disminuyendo' ? '#00ffaa' : '#ffcc00')

function riskBadge(n: number): string {
  if (n > 80) return 'badge-danger'
  if (n > 60) return 'badge-high'
  if (n > 40) return 'badge-warning'
  return 'badge-success'
}

const hostilityChart = computed(() => {
  const d = tendenciaHostilidad24h
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
    legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Roboto Mono', fontSize: 10 } },
    grid: { left: 45, right: 12, top: 36, bottom: 28 },
    xAxis: { type: 'category', data: d.horas, axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 9, interval: 3 } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
    series: [
      { name: 'Twitter/X', type: 'line', data: d.twitter, smooth: true, lineStyle: { color: '#4A90E2', width: 2 }, itemStyle: { color: '#4A90E2' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(74,144,226,0.15)' }, { offset: 1, color: 'rgba(74,144,226,0)' }] } }, showSymbol: false },
      { name: 'Facebook', type: 'line', data: d.facebook, smooth: true, lineStyle: { color: '#1877f2', width: 2 }, itemStyle: { color: '#1877f2' }, showSymbol: false },
      { name: 'TikTok', type: 'line', data: d.tiktok, smooth: true, lineStyle: { color: '#ff0050', width: 2 }, itemStyle: { color: '#ff0050' }, showSymbol: false },
      { name: 'Telegram', type: 'line', data: d.telegram, smooth: true, lineStyle: { color: '#0088cc', width: 2 }, itemStyle: { color: '#0088cc' }, showSymbol: false },
      { name: 'Umbral', type: 'line', data: d.horas.map(() => d.umbral), lineStyle: { color: 'rgba(255,68,68,0.5)', width: 1, type: 'dashed' }, itemStyle: { color: '#ff4444' }, showSymbol: false, silent: true },
    ],
  }
})

const keywordsChart = computed(() => {
  const sorted = [...keywordsMonitoreadas].sort((a, b) => b.hits_hoy - a.hits_hoy).slice(0, 10)
  const catColor: Record<string, string> = { 'Amenazas físicas': '#ff4444', 'Desinformación': '#ff6b35', 'Coordinación hostil': '#ffcc00', 'Doxing': '#4A90E2', 'Incitación': '#ff0050' }
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
    grid: { left: 120, right: 20, top: 8, bottom: 8 },
    xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
    yAxis: { type: 'category', data: sorted.map(k => k.keyword).reverse(), axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Roboto Mono', fontSize: 10 } },
    series: [{ type: 'bar', data: sorted.map(k => ({ value: k.hits_hoy, itemStyle: { color: catColor[k.categoria] || '#888' } })).reverse(), barWidth: '60%' }],
  }
})
</script>

<style scoped>
.blindaje-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.sub-nav { display: flex; gap: 0; background: rgba(20, 22, 28, 0.7); border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; border-radius: 2px 2px 0 0; }
.sub-nav a { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-decoration: none; padding: 12px 20px; border-bottom: 2px solid transparent; transition: all 0.15s ease; }
.sub-nav a:hover { color: #e0e0e0; background: rgba(255,255,255,0.03); }
.sub-nav a.active { color: #ff6b35; border-bottom-color: #ff6b35; background: rgba(255,107,53,0.06); }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.header-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.threat-badge { display: flex; align-items: center; gap: 8px; font-family: 'Roboto Mono', monospace; font-size: 11px; color: #ff4444; background: rgba(255,68,68,0.1); padding: 6px 14px; border: 1px solid rgba(255,68,68,0.3); border-radius: 2px; }
.threat-dot { width: 8px; height: 8px; border-radius: 50%; background: #ff4444; animation: pulse-red 1.5s ease-in-out infinite; }
.threat-badge-text { font-weight: 700; letter-spacing: 0.1em; }
.timestamp { font-size: 10px; color: #666; letter-spacing: 0.05em; }
.btn-generate { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 8px 18px; background: transparent; border: 1px solid rgba(255,107,53,0.4); border-radius: 2px; color: #ff6b35; cursor: pointer; transition: all 0.15s ease; }
.btn-generate:hover { background: rgba(255,107,53,0.12); border-color: #ff6b35; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; margin-top: 6px; }
.kpi-gauge-wrapper { display: flex; justify-content: center; padding: 4px 0; }
.fuente-indicators { display: inline-flex; gap: 4px; align-items: center; }
.fuente-dot { width: 6px; height: 6px; border-radius: 50%; }
.grid-main { display: grid; grid-template-columns: 65fr 35fr; gap: 16px; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.map-wrapper { min-height: 480px; border-radius: 4px; overflow: hidden; }
.map-wrapper :deep(.mexico-map-root) { border: none; border-radius: 0; }
.grid-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.mt-16 { margin-top: 16px; }
.eventos-list { display: flex; flex-direction: column; gap: 4px; }
.evento-item { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s ease; }
.evento-item:hover { background: rgba(255,107,53,0.04); }
.evento-item:last-child { border-bottom: none; }
.evento-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.evento-name { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.evento-meta { font-size: 11px; color: #888; margin-bottom: 6px; }
.evento-rec { font-size: 11px; color: #666; line-height: 1.4; padding-left: 8px; border-left: 2px solid rgba(255,107,53,0.3); }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
@keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; box-shadow: 0 0 8px 2px rgba(255,68,68,0.3); } }
</style>
