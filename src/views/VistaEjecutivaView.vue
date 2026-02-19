<template>
  <div class="ejecutiva-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">EXECUTIVE</div>
          <h1 class="section-title">EXECUTIVE OVERVIEW</h1>
          <p class="section-subtitle">High-level operational summary for rapid decision-making</p>
        </div>
        <div class="header-metrics">
          <div class="metric-chip">
            <span class="metric-label">OPERATIONAL SCORE</span>
            <span class="metric-value" style="color: #00ffaa;">87.4%</span>
          </div>
        </div>
      </div>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="kpi-sub">{{ kpi.sub }}</div>
      </div>
    </div>

    <div class="card-panel">
      <div class="card-header">
        <span class="card-title">MODULE HEALTH MATRIX</span>
        <span class="badge badge-success">ALL SYSTEMS NOMINAL</span>
      </div>
      <div class="module-grid">
        <div class="module-card" v-for="mod in moduleHealth" :key="mod.name">
          <div class="module-status-dot" :class="'dot-' + mod.level"></div>
          <div class="module-name">{{ mod.name }}</div>
          <div class="module-score mono-text" :style="{ color: mod.scoreColor }">{{ mod.score }}%</div>
          <div class="module-status-label">{{ mod.status }}</div>
          <div class="module-trend" :class="mod.trendDir">{{ mod.trendDir === 'up' ? '+' : '' }}{{ mod.trend }}</div>
        </div>
      </div>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">CROSS-MODULE PERFORMANCE</span>
        </div>
        <v-chart :option="performanceChart" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">RESOURCE ALLOCATION</span>
        </div>
        <v-chart :option="resourceChart" style="height: 320px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">RECENT CRITICAL ALERTS</span>
        <span class="badge badge-danger">{{ alerts.length }} ALERTS</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>TIME</th>
            <th>MODULE</th>
            <th>ALERT</th>
            <th>SEVERITY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alert in alerts" :key="alert.id">
            <td class="mono-text">{{ alert.time }}</td>
            <td><span class="badge badge-info">{{ alert.module }}</span></td>
            <td>{{ alert.message }}</td>
            <td><span class="badge" :class="'badge-' + alert.severityType">{{ alert.severity }}</span></td>
            <td><span class="badge" :class="'badge-' + alert.statusType">{{ alert.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">DAILY PRIORITIES</span>
      </div>
      <div class="priorities-list">
        <div class="priority-item" v-for="(p, i) in priorities" :key="p.id">
          <div class="priority-rank mono-text">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="priority-content">
            <div class="priority-text">{{ p.text }}</div>
            <div class="priority-owner mono-text">{{ p.owner }}</div>
          </div>
          <span class="badge" :class="'badge-' + p.urgencyType">{{ p.urgency }}</span>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const kpis = [
  { label: 'GLOBAL STATUS', value: 'ELEVATED', sub: 'Level 3 of 5', color: '#ffcc00' },
  { label: 'VOTE INTENTION', value: '48.3%', sub: '+2.1% trend', color: '#00ffaa' },
  { label: 'WIN PROBABILITY', value: '72.4%', sub: 'ML Model v2.4', color: '#4A90E2' },
  { label: 'DAYS TO ELECTION', value: '127', sub: 'June 18, 2026', color: '#ff6b35' },
]

const moduleHealth = [
  { name: 'MONITOR', score: 98, scoreColor: '#00ffaa', status: 'OPTIMAL', level: 'success', trend: '1.2%', trendDir: 'up' },
  { name: 'ANALYTICS', score: 96, scoreColor: '#00ffaa', status: 'OPTIMAL', level: 'success', trend: '0.8%', trendDir: 'up' },
  { name: 'PREDICT', score: 94, scoreColor: '#00ffaa', status: 'OPTIMAL', level: 'success', trend: '2.1%', trendDir: 'up' },
  { name: 'RESEARCH', score: 92, scoreColor: '#00ffaa', status: 'GOOD', level: 'success', trend: '0.5%', trendDir: 'up' },
  { name: 'TERRITORY', score: 89, scoreColor: '#ffcc00', status: 'ATTENTION', level: 'warning', trend: '-1.2%', trendDir: 'down' },
  { name: 'CRISIS', score: 87, scoreColor: '#ffcc00', status: 'STANDBY', level: 'warning', trend: '0.0%', trendDir: 'up' },
  { name: 'CONTROL INFO', score: 94, scoreColor: '#00ffaa', status: 'OPTIMAL', level: 'success', trend: '1.8%', trendDir: 'up' },
  { name: 'STRATEGY', score: 91, scoreColor: '#00ffaa', status: 'GOOD', level: 'success', trend: '3.4%', trendDir: 'up' },
  { name: 'SECURITY', score: 100, scoreColor: '#00ffaa', status: 'PERFECT', level: 'success', trend: '0.0%', trendDir: 'up' },
]

const performanceChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 90, right: 30, top: 10, bottom: 10 },
  xAxis: { type: 'value', max: 100, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10, formatter: '{value}%' } },
  yAxis: { type: 'category', data: ['Monitor', 'Analytics', 'Predict', 'Research', 'Territory', 'Crisis', 'Control', 'Strategy', 'Security'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{ type: 'bar', data: [98, 96, 94, 92, 89, 87, 94, 91, 100], itemStyle: { color: (params: any) => params.data > 90 ? '#00ffaa' : params.data > 80 ? '#ffcc00' : '#ff4444' }, barWidth: '55%' }],
}

const resourceChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { bottom: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 10 } },
  series: [{
    type: 'pie', radius: ['35%', '65%'], center: ['50%', '42%'],
    label: { show: false },
    data: [
      { value: 35, name: 'Digital Ops', itemStyle: { color: '#4A90E2' } },
      { value: 25, name: 'Ground Ops', itemStyle: { color: '#ff6b35' } },
      { value: 18, name: 'Media Buy', itemStyle: { color: '#00ffaa' } },
      { value: 12, name: 'Research', itemStyle: { color: '#ffcc00' } },
      { value: 10, name: 'Infrastructure', itemStyle: { color: '#888' } },
    ],
  }],
}

const alerts = [
  { id: 1, time: '23:42', module: 'CRISIS', message: 'Bot network escalation detected — 847 accounts active', severity: 'CRITICAL', severityType: 'danger', status: 'ACTIVE', statusType: 'danger' },
  { id: 2, time: '22:15', module: 'MONITOR', message: 'Negative sentiment spike on WhatsApp detected', severity: 'HIGH', severityType: 'danger', status: 'MONITORING', statusType: 'warning' },
  { id: 3, time: '20:30', module: 'TERRITORY', message: 'Chihuahua D-04 support dropped below threshold', severity: 'MEDIUM', severityType: 'warning', status: 'ACKNOWLEDGED', statusType: 'info' },
  { id: 4, time: '19:15', module: 'RESEARCH', message: 'New opposition inconsistency detected — education policy', severity: 'MEDIUM', severityType: 'warning', status: 'LOGGED', statusType: 'success' },
  { id: 5, time: '18:00', module: 'PREDICT', message: 'Model recalibration complete — accuracy improved to 94.2%', severity: 'LOW', severityType: 'info', status: 'RESOLVED', statusType: 'success' },
]

const priorities = [
  { id: 1, text: 'Respond to coordinated bot attack on education reform messaging', owner: 'Digital Response Team', urgency: 'CRITICAL', urgencyType: 'danger' },
  { id: 2, text: 'Approve increased digital ad budget reallocation', owner: 'Campaign Director', urgency: 'HIGH', urgencyType: 'danger' },
  { id: 3, text: 'Schedule candidate visit to Chihuahua D-04 — declining support', owner: 'Operations Lead', urgency: 'HIGH', urgencyType: 'danger' },
  { id: 4, text: 'Prepare counter-narrative for upcoming opposition smear campaign', owner: 'Communications Team', urgency: 'MEDIUM', urgencyType: 'warning' },
  { id: 5, text: 'Review weekly intelligence briefing and sign off on predictions', owner: 'Strategy Advisor', urgency: 'MEDIUM', urgencyType: 'warning' },
]
</script>

<style scoped>
.ejecutiva-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.header-metrics { display: flex; gap: 12px; }
.metric-chip { display: flex; flex-direction: column; align-items: center; padding: 8px 16px; background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; }
.metric-label { font-size: 9px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; }
.metric-value { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 600; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #a0a0a0; margin-top: 6px; }
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
.module-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.module-card { background: rgba(15, 17, 21, 0.5); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; padding: 16px; text-align: center; transition: all 0.15s ease; cursor: default; }
.module-card:hover { border-color: rgba(255, 255, 255, 0.12); background: rgba(255, 107, 53, 0.03); }
.module-status-dot { width: 8px; height: 8px; border-radius: 50%; margin: 0 auto 8px; }
.dot-success { background: #00ffaa; box-shadow: 0 0 6px rgba(0, 255, 170, 0.4); }
.dot-warning { background: #ffcc00; box-shadow: 0 0 6px rgba(255, 204, 0, 0.4); }
.dot-danger { background: #ff4444; box-shadow: 0 0 6px rgba(255, 68, 68, 0.4); }
.module-name { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: #e0e0e0; margin-bottom: 4px; }
.module-score { font-size: 24px; font-weight: 700; line-height: 1.2; }
.module-status-label { font-size: 10px; color: #888; letter-spacing: 0.05em; margin-top: 2px; }
.module-trend { font-family: 'Roboto Mono', monospace; font-size: 11px; margin-top: 4px; }
.module-trend.up { color: #00ffaa; }
.module-trend.down { color: #ff4444; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.priorities-list { display: flex; flex-direction: column; gap: 8px; }
.priority-item { display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.priority-item:hover { background: rgba(255, 107, 53, 0.04); }
.priority-rank { font-size: 18px; font-weight: 700; color: #555; min-width: 28px; }
.priority-content { flex: 1; }
.priority-text { font-size: 13px; color: #e0e0e0; }
.priority-owner { font-size: 11px; color: #888; margin-top: 2px; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
