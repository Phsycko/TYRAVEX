<template>
  <div class="predict-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">PREDICT</div>
          <h1 class="section-title">PREDICTIVE INTELLIGENCE ENGINE</h1>
          <p class="section-subtitle">ML-powered electoral forecasting — model confidence 94.2%</p>
        </div>
        <div class="model-badge"><span class="live-dot"></span> TYRAVEX-ML v2.4 ACTIVE</div>
      </div>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="kpi-sub">{{ kpi.sub }}</div>
      </div>
    </div>

    <div class="grid-2col">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">VOTE PREDICTION MODEL</span>
        </div>
        <v-chart :option="predictionChart" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">VICTORY PROBABILITY</span>
        </div>
        <v-chart :option="probabilityChart" style="height: 320px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">SCENARIO ANALYSIS</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>SCENARIO</th>
            <th>PROBABILITY</th>
            <th>VOTE SHARE</th>
            <th>CONFIDENCE</th>
            <th>IMPACT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scenario in scenarios" :key="scenario.name">
            <td style="font-weight: 600;">{{ scenario.name }}</td>
            <td class="mono-text">{{ scenario.probability }}</td>
            <td class="mono-text">{{ scenario.voteShare }}</td>
            <td class="mono-text">{{ scenario.confidence }}</td>
            <td><span class="badge" :class="'badge-' + scenario.impactType">{{ scenario.impact }}</span></td>
            <td><span class="badge" :class="'badge-' + scenario.statusType">{{ scenario.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">MODEL FEATURE IMPORTANCE</span>
      </div>
      <v-chart :option="featureChart" style="height: 280px;" autoresize />
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">AI RECOMMENDATIONS</span>
      </div>
      <div class="rec-list">
        <div class="rec-item" v-for="rec in recommendations" :key="rec.id">
          <div class="rec-priority" :class="'priority-' + rec.priority">{{ rec.priority.toUpperCase() }}</div>
          <div class="rec-content">
            <div class="rec-title">{{ rec.title }}</div>
            <div class="rec-desc">{{ rec.description }}</div>
          </div>
          <div class="rec-impact mono-text" :style="{ color: rec.impactColor }">{{ rec.impact }}</div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const kpis = [
  { label: 'PREDICTED VOTE', value: '48.3%', sub: '±1.8% margin', color: '#ff6b35' },
  { label: 'WIN PROBABILITY', value: '72.4%', sub: '▲ +3.1% this week', color: '#00ffaa' },
  { label: 'MODEL ACCURACY', value: '94.2%', sub: 'F1-Score: 0.93', color: '#4A90E2' },
  { label: 'DAYS TO ELECTION', value: '127', sub: '15.JUN.2026', color: '#ffcc00' },
]

const predictionChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 50, right: 20, top: 40, bottom: 30 },
  xAxis: { type: 'category', data: ['JAN', 'FEB W1', 'FEB W2', 'MAR', 'APR', 'MAY', 'JUN'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', min: 25, max: 55, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Our Candidate', type: 'line', data: [42.1, 44.8, 48.3, null, null, null, null], smooth: true, lineStyle: { color: '#ff6b35', width: 2 }, itemStyle: { color: '#ff6b35' } },
    { name: 'Projected', type: 'line', data: [null, null, 48.3, 49.5, 50.2, 51.0, 51.8], smooth: true, lineStyle: { color: '#ff6b35', width: 2, type: 'dashed' }, itemStyle: { color: '#ff6b35' } },
    { name: 'Opponent A', type: 'line', data: [39.2, 37.5, 35.8, 34.5, 33.8, 33.2, 32.5], smooth: true, lineStyle: { color: '#4A90E2', width: 2 }, itemStyle: { color: '#4A90E2' } },
    { name: 'Opponent B', type: 'line', data: [18.7, 17.7, 15.9, 16.0, 16.0, 15.8, 15.7], smooth: true, lineStyle: { color: '#888', width: 1.5 }, itemStyle: { color: '#888' } },
  ],
}

const probabilityChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 50, right: 20, top: 10, bottom: 30 },
  xAxis: { type: 'category', data: ['W-8', 'W-7', 'W-6', 'W-5', 'W-4', 'W-3', 'W-2', 'W-1', 'NOW'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', min: 40, max: 80, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10, formatter: '{value}%' } },
  series: [{ type: 'line', data: [58, 60, 62, 64, 66, 68, 70, 71, 72.4], smooth: true, lineStyle: { color: '#00ffaa', width: 2 }, itemStyle: { color: '#00ffaa' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(0,255,170,0.2)' }, { offset: 1, color: 'rgba(0,255,170,0)' }] } } }],
}

const featureChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 140, right: 40, top: 10, bottom: 10 },
  xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'category', data: ['Historical polls', 'Social sentiment', 'Economic indicators', 'Media coverage', 'Ground operations', 'Demographics', 'Opposition weakness'].reverse(), axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{ type: 'bar', data: [0.28, 0.22, 0.16, 0.13, 0.10, 0.07, 0.04].reverse(), itemStyle: { color: '#ff6b35' }, barWidth: '60%' }],
}

const scenarios = [
  { name: 'Base Case (Current Trend)', probability: '45%', voteShare: '48.3%', confidence: '±1.8%', impact: 'STABLE', impactType: 'success', status: 'ACTIVE', statusType: 'success' },
  { name: 'Debate Victory Scenario', probability: '25%', voteShare: '51.2%', confidence: '±2.4%', impact: 'HIGH', impactType: 'warning', status: 'MODELED', statusType: 'info' },
  { name: 'Opposition Scandal', probability: '15%', voteShare: '53.8%', confidence: '±3.1%', impact: 'VERY HIGH', impactType: 'danger', status: 'MODELED', statusType: 'info' },
  { name: 'Economic Downturn', probability: '10%', voteShare: '44.1%', confidence: '±2.9%', impact: 'NEGATIVE', impactType: 'danger', status: 'RISK', statusType: 'warning' },
  { name: 'Turnout Surge (Youth)', probability: '5%', voteShare: '50.6%', confidence: '±3.5%', impact: 'HIGH', impactType: 'warning', status: 'MODELED', statusType: 'info' },
]

const recommendations = [
  { id: 1, priority: 'high', title: 'Intensify ground operations in Chihuahua District 04', description: 'Model detects 3.2% swing opportunity with targeted voter outreach in this district', impact: '+1.8%', impactColor: '#00ffaa' },
  { id: 2, priority: 'high', title: 'Prepare debate counter-strategy for education reform', description: 'Opposition is expected to attack on education — prepare data-backed responses', impact: '+0.9%', impactColor: '#00ffaa' },
  { id: 3, priority: 'medium', title: 'Increase social media presence on TikTok', description: '18-24 demographic shows strongest growth potential — current penetration at 34%', impact: '+0.6%', impactColor: '#4A90E2' },
  { id: 4, priority: 'medium', title: 'Launch economic messaging campaign in northern states', description: 'Economic concerns are the #1 issue in Nuevo Leon, Sonora, and Tamaulipas', impact: '+0.4%', impactColor: '#4A90E2' },
]
</script>

<style scoped>
.predict-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.model-badge { display: flex; align-items: center; gap: 8px; font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; background: rgba(0, 255, 170, 0.1); padding: 6px 14px; border: 1px solid rgba(0, 255, 170, 0.2); border-radius: 2px; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #00ffaa; display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
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
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.mono-text { font-family: 'Roboto Mono', monospace; }
.rec-list { display: flex; flex-direction: column; gap: 8px; }
.rec-item { display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.06); transition: background 0.15s ease; }
.rec-item:hover { background: rgba(255, 107, 53, 0.04); }
.rec-priority { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; min-width: 55px; }
.priority-high { color: #ff6b35; }
.priority-medium { color: #4A90E2; }
.rec-content { flex: 1; }
.rec-title { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.rec-desc { font-size: 12px; color: #888; margin-top: 2px; }
.rec-impact { font-size: 14px; font-weight: 700; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
