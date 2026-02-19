<template>
  <div class="estrategia-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">ESTRATEGIA</div>
          <h1 class="section-title">STRATEGIC COMMAND CENTER</h1>
          <p class="section-subtitle">Campaign orchestration, scenario planning, and operational coordination</p>
        </div>
        <div class="status-badge status-active">OPERATIONS ACTIVE</div>
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
        <span class="card-title">MODULE INTEGRATION STATUS</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>MODULE</th>
            <th>STATUS</th>
            <th>PERFORMANCE</th>
            <th>LAST SYNC</th>
            <th>DATA POINTS</th>
            <th>HEALTH</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mod in modules" :key="mod.name">
            <td style="font-weight: 600;">{{ mod.name }}</td>
            <td><span class="badge" :class="'badge-' + mod.statusType">{{ mod.status }}</span></td>
            <td class="mono-text">{{ mod.performance }}</td>
            <td class="mono-text">{{ mod.lastSync }}</td>
            <td class="mono-text">{{ mod.dataPoints }}</td>
            <td>
              <div class="health-bar">
                <div class="health-fill" :style="{ width: mod.health + '%', background: mod.health > 80 ? '#00ffaa' : mod.health > 50 ? '#ffcc00' : '#ff4444' }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">CAMPAIGN PERFORMANCE</span>
        </div>
        <v-chart :option="performanceChart" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">ACTIVE CAMPAIGNS</span>
          <span class="badge badge-info">{{ campaigns.length }} RUNNING</span>
        </div>
        <div class="campaign-list">
          <div class="campaign-item" v-for="c in campaigns" :key="c.name">
            <div class="campaign-info">
              <div class="campaign-name">{{ c.name }}</div>
              <div class="campaign-meta">{{ c.channel }} &middot; {{ c.duration }}</div>
            </div>
            <div class="campaign-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: c.progress + '%' }"></div>
              </div>
              <span class="progress-label mono-text">{{ c.progress }}%</span>
            </div>
            <span class="badge" :class="'badge-' + c.statusType">{{ c.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">NATIONAL OPERATIONS MAP</span>
        <span class="badge badge-info">READ ONLY</span>
      </div>
      <div class="map-wrapper">
        <MexicoMap mode="tactical" :readonly="true" />
      </div>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">CRITICAL TIMELINE</span>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="event in timeline" :key="event.date">
            <div class="timeline-dot" :class="'dot-' + event.level"></div>
            <div class="timeline-content">
              <div class="timeline-date mono-text">{{ event.date }}</div>
              <div class="timeline-event">{{ event.event }}</div>
              <div class="timeline-detail">{{ event.detail }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">PENDING DECISIONS</span>
          <span class="badge badge-warning">{{ decisions.length }} PENDING</span>
        </div>
        <div class="decision-list">
          <div class="decision-item" v-for="d in decisions" :key="d.id">
            <div class="decision-info">
              <div class="decision-title">{{ d.title }}</div>
              <div class="decision-desc">{{ d.description }}</div>
              <div class="decision-meta mono-text">Deadline: {{ d.deadline }} &middot; Impact: {{ d.impact }}</div>
            </div>
            <div class="decision-actions">
              <button class="btn-approve">APPROVE</button>
              <button class="btn-reject">REJECT</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import MexicoMap from '@/components/maps/MexicoMap.vue'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const kpis = [
  { label: 'ACTIVE CAMPAIGNS', value: '8', sub: '3 high priority', color: '#ff6b35' },
  { label: 'OVERALL PROGRESS', value: '67%', sub: '+4.2% this week', color: '#00ffaa' },
  { label: 'BUDGET UTILIZED', value: '54.3M', sub: '68% of allocation', color: '#4A90E2' },
  { label: 'PENDING DECISIONS', value: '5', sub: '2 critical', color: '#ffcc00' },
]

const modules = [
  { name: 'MONITOR', status: 'ONLINE', statusType: 'success', performance: '98.4%', lastSync: '2m ago', dataPoints: '18,429', health: 98 },
  { name: 'ANALYTICS', status: 'ONLINE', statusType: 'success', performance: '96.1%', lastSync: '5m ago', dataPoints: '284,700', health: 96 },
  { name: 'PREDICT', status: 'ONLINE', statusType: 'success', performance: '94.2%', lastSync: '8m ago', dataPoints: '12,847', health: 94 },
  { name: 'RESEARCH', status: 'ONLINE', statusType: 'success', performance: '91.8%', lastSync: '12m ago', dataPoints: '1,247', health: 92 },
  { name: 'TERRITORY', status: 'ONLINE', statusType: 'success', performance: '89.5%', lastSync: '15m ago', dataPoints: '9,632', health: 90 },
  { name: 'CRISIS', status: 'STANDBY', statusType: 'warning', performance: '87.3%', lastSync: '20m ago', dataPoints: '847', health: 87 },
  { name: 'CONTROL INFO', status: 'ONLINE', statusType: 'success', performance: '93.7%', lastSync: '3m ago', dataPoints: '2,847', health: 94 },
  { name: 'SECURITY', status: 'ONLINE', statusType: 'success', performance: '99.9%', lastSync: '1m ago', dataPoints: '45,210', health: 100 },
]

const performanceChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 50, right: 20, top: 40, bottom: 30 },
  xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Digital', type: 'bar', data: [82, 85, 88, 84, 90, 92, 89, 94], itemStyle: { color: '#4A90E2' }, barWidth: '25%' },
    { name: 'Ground', type: 'bar', data: [70, 72, 68, 75, 78, 74, 80, 82], itemStyle: { color: '#ff6b35' }, barWidth: '25%' },
    { name: 'Media', type: 'bar', data: [60, 65, 62, 70, 68, 72, 75, 78], itemStyle: { color: '#00ffaa' }, barWidth: '25%' },
  ],
}

const campaigns = [
  { name: 'Digital Outreach — Youth Voter', channel: 'Social Media', duration: '6 weeks', progress: 78, status: 'ON TRACK', statusType: 'success' },
  { name: 'Infrastructure Messaging', channel: 'TV + Radio', duration: '4 weeks', progress: 52, status: 'ON TRACK', statusType: 'success' },
  { name: 'Security Policy Push', channel: 'News Media', duration: '3 weeks', progress: 35, status: 'DELAYED', statusType: 'warning' },
  { name: 'Rural Community Events', channel: 'Ground Ops', duration: '8 weeks', progress: 64, status: 'ON TRACK', statusType: 'success' },
  { name: 'Opposition Response Ads', channel: 'Digital', duration: '2 weeks', progress: 90, status: 'COMPLETING', statusType: 'info' },
]

const timeline = [
  { date: '15.FEB.2026', event: 'National TV Debate', detail: 'Preparation and briefing scheduled', level: 'danger' },
  { date: '20.FEB.2026', event: 'Rally — Guadalajara', detail: '50,000 capacity venue confirmed', level: 'warning' },
  { date: '28.FEB.2026', event: 'Policy Launch — Education', detail: 'Full media campaign activation', level: 'info' },
  { date: '05.MAR.2026', event: 'Finance Disclosure Deadline', detail: 'All documents prepared', level: 'warning' },
  { date: '15.MAR.2026', event: 'Opposition Ad Blitz Expected', detail: 'Counter-strategy ready', level: 'danger' },
]

const decisions = [
  { id: 1, title: 'Increase Digital Ad Budget by 20%', description: 'Reallocate from TV to social media based on ROI analysis', deadline: '12.FEB.2026', impact: 'HIGH' },
  { id: 2, title: 'Respond to Opposition Smear Campaign', description: 'Three response strategies prepared — awaiting selection', deadline: '11.FEB.2026', impact: 'CRITICAL' },
  { id: 3, title: 'Schedule Candidate Visit to Chihuahua', description: 'District D-04 showing declining support, visit may recover 3.2%', deadline: '14.FEB.2026', impact: 'MEDIUM' },
  { id: 4, title: 'Activate Protocol ALPHA', description: 'Disinformation campaign detected — counter-narrative deployment pending', deadline: '11.FEB.2026', impact: 'CRITICAL' },
  { id: 5, title: 'Partner with Youth Organizations', description: 'MOU with 3 university student groups for voter registration', deadline: '18.FEB.2026', impact: 'MEDIUM' },
]
</script>

<style scoped>
.estrategia-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.status-badge { font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 2px; letter-spacing: 0.1em; }
.status-active { background: rgba(0, 255, 170, 0.15); color: #00ffaa; border: 1px solid rgba(0, 255, 170, 0.3); }
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
.health-bar { width: 80px; height: 6px; background: rgba(255, 255, 255, 0.08); border-radius: 3px; overflow: hidden; }
.health-fill { height: 100%; border-radius: 3px; transition: width 0.3s ease; }
.campaign-list { display: flex; flex-direction: column; gap: 10px; }
.campaign-item { display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.campaign-item:hover { background: rgba(255, 107, 53, 0.04); }
.campaign-info { flex: 1; min-width: 0; }
.campaign-name { font-weight: 600; font-size: 13px; color: #e0e0e0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.campaign-meta { font-size: 11px; color: #888; margin-top: 2px; }
.campaign-progress { display: flex; align-items: center; gap: 8px; min-width: 120px; }
.progress-bar { flex: 1; height: 4px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: #ff6b35; border-radius: 2px; }
.progress-label { font-size: 11px; color: #a0a0a0; min-width: 32px; text-align: right; }
.timeline { display: flex; flex-direction: column; gap: 2px; }
.timeline-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.timeline-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
.dot-danger { background: #ff4444; }
.dot-warning { background: #ffcc00; }
.dot-info { background: #4A90E2; }
.dot-success { background: #00ffaa; }
.timeline-content { flex: 1; }
.timeline-date { font-size: 10px; color: #888; margin-bottom: 2px; }
.timeline-event { font-size: 12px; color: #e0e0e0; font-weight: 600; }
.timeline-detail { font-size: 11px; color: #a0a0a0; margin-top: 2px; }
.decision-list { display: flex; flex-direction: column; gap: 10px; }
.decision-item { padding: 12px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.decision-item:hover { background: rgba(255, 107, 53, 0.04); }
.decision-info { margin-bottom: 10px; }
.decision-title { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.decision-desc { font-size: 12px; color: #a0a0a0; margin-top: 4px; }
.decision-meta { font-size: 10px; color: #888; margin-top: 4px; }
.decision-actions { display: flex; gap: 8px; }
.btn-approve { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 12px; border: 1px solid rgba(0, 255, 170, 0.4); background: rgba(0, 255, 170, 0.1); color: #00ffaa; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-approve:hover { background: rgba(0, 255, 170, 0.25); }
.btn-reject { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 12px; border: 1px solid rgba(255, 68, 68, 0.4); background: rgba(255, 68, 68, 0.1); color: #ff4444; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-reject:hover { background: rgba(255, 68, 68, 0.25); }
.map-wrapper { height: 450px; border-radius: 4px; overflow: hidden; }
.map-wrapper :deep(.mexico-map-root) { border: none; border-radius: 0; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
