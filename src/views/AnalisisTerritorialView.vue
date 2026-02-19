<template>
  <div class="territorio-view">
    <header class="view-header">
      <div class="section-tag">TERRITORIO</div>
      <h1 class="section-title">TERRITORIAL ANALYSIS</h1>
      <p class="section-subtitle">Geographic intelligence — district-level electoral mapping</p>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="kpi-sub">{{ kpi.sub }}</div>
      </div>
    </div>

    <!-- MAP + DETAIL PANEL (70/30) -->
    <div class="map-section">
      <div class="map-area">
        <MexicoMap
          :mode="mapMode"
          @state-select="onStateSelect"
          @municipality-select="onMunSelect"
          @mode-change="onModeChange"
        />
      </div>
      <div class="detail-panel">
        <div class="panel-header">
          <span class="card-title">STATE OVERVIEW</span>
          <span class="badge badge-info">{{ mapModeLabel }}</span>
        </div>
        <div class="panel-divider"></div>
        <div class="selected-state-info" v-if="selectedState">
          <div class="state-name">{{ selectedState.name }}</div>
          <div class="state-pop mono-text">Pop: {{ formatNumber(selectedState.population) }}</div>
          <div class="panel-divider"></div>
          <div class="state-row"><span class="state-label">VOTE INTENTION</span><span class="state-val accent mono-text">{{ selectedState.electoral.voteIntention }}%</span></div>
          <div class="state-row"><span class="state-label">CRIME INDEX</span><span class="state-val mono-text">{{ selectedState.security.crimeIndex }}</span></div>
          <div class="state-row"><span class="state-label">CONTROL LEVEL</span><span class="state-val mono-text">{{ selectedState.tactical.controlLevel }}%</span></div>
          <div class="state-row"><span class="state-label">MARGINATION</span><span class="state-val mono-text">{{ selectedState.social.marginationIndex }}</span></div>
        </div>
        <div v-else class="no-selection">
          <div class="no-sel-icon">🗺</div>
          <div class="no-sel-text">Select a state on the map to view details</div>
        </div>
        <div class="panel-divider"></div>
        <div class="panel-header mt-12">
          <span class="card-title">QUICK STATS</span>
        </div>
        <div class="quick-stats">
          <div class="qs-item"><span class="qs-label">STATES TRACKED</span><span class="qs-val accent mono-text">32</span></div>
          <div class="qs-item"><span class="qs-label">FAVORABLE</span><span class="qs-val success mono-text">18</span></div>
          <div class="qs-item"><span class="qs-label">SWING STATES</span><span class="qs-val warn mono-text">7</span></div>
          <div class="qs-item"><span class="qs-label">AVG SUPPORT</span><span class="qs-val mono-text">48.3%</span></div>
        </div>
      </div>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">SUPPORT BY STATE</span>
        </div>
        <v-chart :option="stateChart" style="height: 340px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">DISTRICT PERFORMANCE</span>
        </div>
        <v-chart :option="districtChart" style="height: 340px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">STATE-LEVEL BREAKDOWN</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>STATE</th>
            <th>DISTRICTS</th>
            <th>SUPPORT</th>
            <th>TREND</th>
            <th>OPERATIONS</th>
            <th>RISK LEVEL</th>
            <th>PRIORITY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="state in states" :key="state.name">
            <td style="font-weight: 600;">{{ state.name }}</td>
            <td class="mono-text">{{ state.districts }}</td>
            <td class="mono-text">{{ state.support }}</td>
            <td><span class="trend-indicator" :class="state.trendDir">{{ state.trendDir === 'up' ? '▲' : '▼' }} {{ state.trend }}</span></td>
            <td class="mono-text">{{ state.operations }}</td>
            <td><span class="badge" :class="'badge-' + state.riskType">{{ state.risk }}</span></td>
            <td><span class="badge" :class="'badge-' + state.priorityType">{{ state.priority }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">CRITICAL DISTRICTS</span>
        <span class="badge badge-warning">{{ criticalDistricts.length }} FLAGGED</span>
      </div>
      <div class="districts-grid">
        <div class="district-card" v-for="d in criticalDistricts" :key="d.id">
          <div class="district-header">
            <span class="district-name">{{ d.name }}</span>
            <span class="badge" :class="'badge-' + d.statusType">{{ d.status }}</span>
          </div>
          <div class="district-stats">
            <div><span class="stat-label">SUPPORT:</span> <span class="mono-text">{{ d.support }}</span></div>
            <div><span class="stat-label">MARGIN:</span> <span class="mono-text" :style="{ color: d.marginColor }">{{ d.margin }}</span></div>
            <div><span class="stat-label">TURNOUT EST:</span> <span class="mono-text">{{ d.turnout }}</span></div>
          </div>
          <div class="district-action">{{ d.recommendation }}</div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import MexicoMap from '@/components/maps/MexicoMap.vue'
import type { MapMode, StateMetrics, MunicipalityMetrics } from '@/data/mapData'
import { MODE_CONFIG } from '@/data/mapData'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const mapMode = ref<MapMode>('electoral')
const selectedState = ref<StateMetrics | null>(null)

const mapModeLabel = computed(() => MODE_CONFIG[mapMode.value].label)

function onStateSelect(state: StateMetrics) {
  selectedState.value = state
}

function onMunSelect(_mun: MunicipalityMetrics) {
  // municipality selected — info shown in map's own panel
}

function onModeChange(mode: MapMode) {
  mapMode.value = mode
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

const kpis = [
  { label: 'STATES TRACKED', value: '32', sub: '300 districts', color: '#ff6b35' },
  { label: 'FAVORABLE STATES', value: '18', sub: '56.3% coverage', color: '#00ffaa' },
  { label: 'SWING STATES', value: '7', sub: 'Critical focus', color: '#ffcc00' },
  { label: 'AVG SUPPORT', value: '48.3%', sub: '+2.1% nationally', color: '#4A90E2' },
]

const stateChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 100, right: 30, top: 10, bottom: 10 },
  xAxis: { type: 'value', max: 60, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10, formatter: '{value}%' } },
  yAxis: { type: 'category', data: ['CDMX', 'Jalisco', 'Nuevo León', 'Chihuahua', 'Estado de México', 'Puebla', 'Sonora', 'Veracruz'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{ type: 'bar', data: [52.1, 49.3, 47.8, 46.5, 45.2, 44.8, 43.1, 41.9], itemStyle: { color: (params: any) => params.data > 48 ? '#00ffaa' : params.data > 44 ? '#ffcc00' : '#ff4444' }, barWidth: '55%' }],
}

const districtChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 50, right: 20, top: 10, bottom: 30 },
  xAxis: { type: 'category', data: ['D-01', 'D-02', 'D-03', 'D-04', 'D-05', 'D-06', 'D-07', 'D-08', 'D-09', 'D-10'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', min: 30, max: 60, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10, formatter: '{value}%' } },
  series: [{ type: 'bar', data: [55.2, 52.1, 50.8, 48.3, 47.1, 46.5, 44.2, 42.8, 40.1, 38.5], itemStyle: { color: (params: any) => params.data > 48 ? '#00ffaa' : params.data > 44 ? '#ffcc00' : '#ff4444' }, barWidth: '60%' }],
}

const states = [
  { name: 'CDMX', districts: 24, support: '52.1%', trend: '+1.8%', trendDir: 'up', operations: 12, risk: 'LOW', riskType: 'success', priority: 'HIGH', priorityType: 'danger' },
  { name: 'Jalisco', districts: 20, support: '49.3%', trend: '+2.3%', trendDir: 'up', operations: 8, risk: 'MEDIUM', riskType: 'warning', priority: 'HIGH', priorityType: 'danger' },
  { name: 'Nuevo León', districts: 14, support: '47.8%', trend: '+0.9%', trendDir: 'up', operations: 6, risk: 'MEDIUM', riskType: 'warning', priority: 'HIGH', priorityType: 'danger' },
  { name: 'Chihuahua', districts: 9, support: '46.5%', trend: '-1.2%', trendDir: 'down', operations: 4, risk: 'HIGH', riskType: 'danger', priority: 'CRITICAL', priorityType: 'danger' },
  { name: 'Estado de México', districts: 40, support: '45.2%', trend: '+0.4%', trendDir: 'up', operations: 15, risk: 'MEDIUM', riskType: 'warning', priority: 'HIGH', priorityType: 'danger' },
  { name: 'Puebla', districts: 16, support: '44.8%', trend: '+1.5%', trendDir: 'up', operations: 5, risk: 'MEDIUM', riskType: 'warning', priority: 'MEDIUM', priorityType: 'warning' },
  { name: 'Sonora', districts: 7, support: '43.1%', trend: '-0.8%', trendDir: 'down', operations: 3, risk: 'HIGH', riskType: 'danger', priority: 'MEDIUM', priorityType: 'warning' },
  { name: 'Veracruz', districts: 21, support: '41.9%', trend: '+0.2%', trendDir: 'up', operations: 7, risk: 'HIGH', riskType: 'danger', priority: 'HIGH', priorityType: 'danger' },
]

const criticalDistricts = [
  { id: 1, name: 'Chihuahua D-04', status: 'AT RISK', statusType: 'danger', support: '43.2%', margin: '-2.8%', marginColor: '#ff4444', turnout: '58%', recommendation: 'Deploy ground team — swing potential +3.2%' },
  { id: 2, name: 'Sonora D-02', status: 'CONTESTED', statusType: 'warning', support: '45.1%', margin: '-1.1%', marginColor: '#ffcc00', turnout: '52%', recommendation: 'Increase media spend — digital ads underperforming' },
  { id: 3, name: 'Veracruz D-11', status: 'AT RISK', statusType: 'danger', support: '41.8%', margin: '-4.2%', marginColor: '#ff4444', turnout: '48%', recommendation: 'Schedule candidate visit — low name recognition' },
  { id: 4, name: 'Estado de México D-28', status: 'CONTESTED', statusType: 'warning', support: '44.9%', margin: '-0.5%', marginColor: '#ffcc00', turnout: '61%', recommendation: 'Focus on economic messaging — top voter concern' },
]
</script>

<style scoped>
.territorio-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #a0a0a0; margin-top: 6px; }

/* MAP SECTION - 70/30 layout */
.map-section { display: grid; grid-template-columns: 7fr 3fr; gap: 0; margin-bottom: 16px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; overflow: hidden; min-height: 560px; }
.map-area { min-height: 560px; }
.map-area :deep(.mexico-map-root) { border: none; border-radius: 0; height: 100%; min-height: 560px; }
.detail-panel { background: rgba(20, 22, 28, 0.7); padding: 20px 16px; border-left: 1px solid rgba(255, 255, 255, 0.08); overflow-y: auto; }
.panel-header { display: flex; justify-content: space-between; align-items: center; }
.panel-divider { height: 1px; background: rgba(255, 255, 255, 0.08); margin: 12px 0; }
.mt-12 { margin-top: 12px; }
.selected-state-info { }
.state-name { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; color: #e0e0e0; margin-bottom: 4px; }
.state-pop { font-size: 12px; color: #888; }
.state-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; }
.state-label { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: #888; text-transform: uppercase; }
.state-val { font-size: 13px; font-weight: 600; color: #e0e0e0; }
.state-val.accent { color: #ff6b35; }
.state-val.success { color: #00ffaa; }
.state-val.warn { color: #ffcc00; }
.no-selection { text-align: center; padding: 40px 16px; }
.no-sel-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.5; }
.no-sel-text { font-size: 12px; color: #888; }
.quick-stats { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
.qs-item { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
.qs-label { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: #888; text-transform: uppercase; }
.qs-val { font-size: 13px; font-weight: 600; color: #e0e0e0; }
.qs-val.accent { color: #ff6b35; }
.qs-val.success { color: #00ffaa; }
.qs-val.warn { color: #ffcc00; }

.grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.mt-16 { margin-top: 16px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.mono-text { font-family: 'Roboto Mono', monospace; }
.trend-indicator { font-family: 'Roboto Mono', monospace; font-size: 12px; font-weight: 600; }
.trend-indicator.up { color: #00ffaa; }
.trend-indicator.down { color: #ff4444; }
.districts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.district-card { padding: 16px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; }
.district-card:hover { border-color: rgba(255, 255, 255, 0.12); background: rgba(255, 107, 53, 0.02); }
.district-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.district-name { font-weight: 600; font-size: 14px; }
.district-stats { display: flex; gap: 20px; margin-bottom: 10px; font-size: 12px; }
.stat-label { color: #888; font-size: 10px; letter-spacing: 0.05em; }
.district-action { font-size: 11px; color: #ff6b35; padding: 6px 10px; background: rgba(255, 107, 53, 0.08); border-radius: 2px; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
