<template>
  <div class="dashboard-view">
    <header class="view-header">
      <div class="section-tag">COMMAND CENTER</div>
      <h1 class="section-title">ELECTORAL INTELLIGENCE HQ</h1>
      <p class="section-subtitle">Real-time electoral intelligence overview — all modules reporting</p>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="kpi-delta" :class="kpi.deltaType">
          {{ kpi.deltaType === 'up' ? '▲' : '▼' }} {{ kpi.delta }}
        </div>
      </div>
    </div>

    <div class="grid-2col">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">VOTE INTENTION TREND</span>
          <span class="live-dot"></span>
        </div>
        <v-chart :option="trendChartOption" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">SENTIMENT DISTRIBUTION</span>
        </div>
        <v-chart :option="sentimentChartOption" style="height: 320px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">MODULE STATUS</span>
        <span class="badge badge-success">ALL SYSTEMS OPERATIONAL</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>MODULE</th>
            <th>STATUS</th>
            <th>HEALTH</th>
            <th>ALERTS</th>
            <th>LAST UPDATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mod in modules" :key="mod.name">
            <td style="font-weight: 600;">{{ mod.name }}</td>
            <td><span class="badge" :class="'badge-' + mod.statusType">{{ mod.status }}</span></td>
            <td>
              <div class="health-bar">
                <div class="health-fill" :style="{ width: mod.health + '%', background: mod.health > 80 ? '#00ffaa' : mod.health > 50 ? '#ffcc00' : '#ff4444' }"></div>
              </div>
              <span class="mono-text" style="font-size: 11px;">{{ mod.health }}%</span>
            </td>
            <td><span class="mono-text">{{ mod.alerts }}</span></td>
            <td><span class="mono-text">{{ mod.lastUpdate }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">RECENT INTELLIGENCE FEED</span>
      </div>
      <div class="feed-list">
        <div class="feed-item" v-for="(item, i) in feedItems" :key="i">
          <span class="feed-time mono-text">{{ item.time }}</span>
          <span class="feed-source" :style="{ color: item.color }">{{ item.source }}</span>
          <span class="feed-msg">{{ item.message }}</span>
          <span class="badge" :class="'badge-' + item.severity">{{ item.severity.toUpperCase() }}</span>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const kpis = [
  { label: 'VOTE INTENTION', value: '48.3%', delta: '+2.1%', deltaType: 'up', color: '#ff6b35' },
  { label: 'SENTIMENT SCORE', value: '62%', delta: '+5.4%', deltaType: 'up', color: '#00ffaa' },
  { label: 'THREAT LEVEL', value: 'MEDIUM', delta: '3 active', deltaType: 'down', color: '#ffcc00' },
  { label: 'ACTIVE OPERATIONS', value: '12', delta: '+2', deltaType: 'up', color: '#4A90E2' },
  { label: 'SYSTEM HEALTH', value: '99.94%', delta: '0.02%', deltaType: 'up', color: '#00ffaa' },
]

const trendChartOption = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 50, right: 20, top: 20, bottom: 30 },
  xAxis: { type: 'category', data: ['01.FEB', '02.FEB', '03.FEB', '04.FEB', '05.FEB', '06.FEB', '07.FEB', '08.FEB', '09.FEB', '10.FEB'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', min: 30, max: 60, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Candidate A', type: 'line', data: [44.2, 44.8, 45.1, 45.9, 46.3, 47.0, 47.2, 47.8, 48.0, 48.3], smooth: true, lineStyle: { color: '#ff6b35', width: 2 }, itemStyle: { color: '#ff6b35' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(255,107,53,0.25)' }, { offset: 1, color: 'rgba(255,107,53,0)' }] } } },
    { name: 'Candidate B', type: 'line', data: [38.1, 37.9, 38.4, 37.8, 37.2, 36.9, 37.1, 36.5, 36.2, 35.8], smooth: true, lineStyle: { color: '#4A90E2', width: 2 }, itemStyle: { color: '#4A90E2' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(74,144,226,0.15)' }, { offset: 1, color: 'rgba(74,144,226,0)' }] } } },
    { name: 'Candidate C', type: 'line', data: [17.7, 17.3, 16.5, 16.3, 16.5, 16.1, 15.7, 15.7, 15.8, 15.9], smooth: true, lineStyle: { color: '#888', width: 1.5 }, itemStyle: { color: '#888' } },
  ],
}

const sentimentChartOption = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { bottom: 10, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{
    type: 'pie', radius: ['40%', '70%'], center: ['50%', '45%'], avoidLabelOverlap: false,
    label: { show: false },
    data: [
      { value: 62, name: 'Positive', itemStyle: { color: '#00ffaa' } },
      { value: 23, name: 'Neutral', itemStyle: { color: '#4A90E2' } },
      { value: 15, name: 'Negative', itemStyle: { color: '#ff4444' } },
    ],
  }],
}

const modules = [
  { name: 'Analytics', status: 'ACTIVE', statusType: 'success', health: 98, alerts: 0, lastUpdate: '10.FEB.2026 23:41' },
  { name: 'Monitor', status: 'ACTIVE', statusType: 'success', health: 95, alerts: 2, lastUpdate: '10.FEB.2026 23:40' },
  { name: 'Predict', status: 'ACTIVE', statusType: 'success', health: 92, alerts: 1, lastUpdate: '10.FEB.2026 23:38' },
  { name: 'Research', status: 'ACTIVE', statusType: 'success', health: 97, alerts: 0, lastUpdate: '10.FEB.2026 23:42' },
  { name: 'Territorio', status: 'ACTIVE', statusType: 'success', health: 89, alerts: 3, lastUpdate: '10.FEB.2026 23:35' },
  { name: 'Crisis', status: 'READY', statusType: 'warning', health: 100, alerts: 0, lastUpdate: '10.FEB.2026 23:30' },
  { name: 'Control Info', status: 'ACTIVE', statusType: 'success', health: 94, alerts: 1, lastUpdate: '10.FEB.2026 23:39' },
  { name: 'Estrategia', status: 'ACTIVE', statusType: 'success', health: 91, alerts: 0, lastUpdate: '10.FEB.2026 23:37' },
  { name: 'Seguridad', status: 'ACTIVE', statusType: 'success', health: 99, alerts: 0, lastUpdate: '10.FEB.2026 23:42' },
]

const feedItems = [
  { time: '23:42:18', source: 'MONITOR', color: '#4A90E2', message: 'Trending topic detected: #DebatePresidencial2026 — 12.4K mentions in last hour', severity: 'warning' },
  { time: '23:38:05', source: 'PREDICT', color: '#ff6b35', message: 'Vote intention model updated — confidence interval narrowed to ±1.8%', severity: 'info' },
  { time: '23:35:42', source: 'TERRITORIO', color: '#00ffaa', message: 'Chihuahua district 04 flagged — anomalous sentiment shift detected', severity: 'warning' },
  { time: '23:31:19', source: 'CRISIS', color: '#ff4444', message: 'Negative narrative cluster identified — coordinated bot activity suspected', severity: 'danger' },
  { time: '23:28:07', source: 'RESEARCH', color: '#ffcc00', message: 'Opposition candidate policy document analyzed — 3 contradiction points found', severity: 'info' },
  { time: '23:22:55', source: 'SEGURIDAD', color: '#00ffaa', message: 'All API endpoints passed health check — 99.94% uptime maintained', severity: 'success' },
]
</script>

<style scoped>
.dashboard-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-delta { font-family: 'Roboto Mono', monospace; font-size: 11px; margin-top: 6px; }
.kpi-delta.up { color: #00ffaa; }
.kpi-delta.down { color: #ff4444; }
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
.health-bar { width: 60px; height: 4px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; display: inline-block; vertical-align: middle; margin-right: 8px; }
.health-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #00ffaa; display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.feed-list { display: flex; flex-direction: column; }
.feed-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background 0.15s ease; }
.feed-item:hover { background: rgba(255, 107, 53, 0.04); }
.feed-time { font-size: 11px; color: #888; min-width: 65px; }
.feed-source { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; min-width: 90px; }
.feed-msg { font-size: 12px; color: #a0a0a0; flex: 1; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
