<template>
  <div class="crisis-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">CRISIS</div>
          <h1 class="section-title">CRISIS MANAGEMENT CENTER</h1>
          <p class="section-subtitle">Real-time crisis detection, response protocols, and war room operations</p>
        </div>
        <div class="status-badge" :class="'status-' + systemStatus">{{ systemStatus.toUpperCase() }}</div>
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
        <span class="card-title">THREAT ASSESSMENT MATRIX</span>
      </div>
      <v-chart :option="threatChart" style="height: 300px;" autoresize />
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">ACTIVE INCIDENTS</span>
        <span class="badge badge-danger">{{ incidents.length }} ACTIVE</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>INCIDENT</th>
            <th>SEVERITY</th>
            <th>DETECTED</th>
            <th>STATUS</th>
            <th>RESPONSE TEAM</th>
            <th>IMPACT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inc in incidents" :key="inc.id">
            <td class="mono-text">{{ inc.id }}</td>
            <td style="font-weight: 600;">{{ inc.name }}</td>
            <td><span class="badge" :class="'badge-' + inc.severityType">{{ inc.severity }}</span></td>
            <td class="mono-text">{{ inc.detected }}</td>
            <td><span class="badge" :class="'badge-' + inc.statusType">{{ inc.status }}</span></td>
            <td>{{ inc.team }}</td>
            <td class="mono-text">{{ inc.impact }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">RESPONSE PROTOCOLS</span>
        </div>
        <div class="protocol-list">
          <div class="protocol-item" v-for="p in protocols" :key="p.name">
            <div class="protocol-status" :class="'pstatus-' + p.status">{{ p.status.toUpperCase() }}</div>
            <div class="protocol-info">
              <div class="protocol-name">{{ p.name }}</div>
              <div class="protocol-desc">{{ p.description }}</div>
            </div>
            <div class="protocol-time mono-text">{{ p.responseTime }}</div>
          </div>
        </div>
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">ESCALATION TIMELINE</span>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="event in timeline" :key="event.time">
            <div class="timeline-dot" :class="'dot-' + event.level"></div>
            <div class="timeline-content">
              <div class="timeline-time mono-text">{{ event.time }}</div>
              <div class="timeline-event">{{ event.event }}</div>
              <div class="timeline-action">{{ event.action }}</div>
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
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const systemStatus = 'ready'

const kpis = [
  { label: 'THREAT LEVEL', value: 'ELEVATED', sub: 'Level 3 of 5', color: '#ffcc00' },
  { label: 'ACTIVE INCIDENTS', value: '3', sub: '1 critical, 2 moderate', color: '#ff4444' },
  { label: 'RESPONSE TIME', value: '4.2m', sub: 'Avg last 24h', color: '#00ffaa' },
  { label: 'TEAM READINESS', value: '94%', sub: '6 teams on standby', color: '#4A90E2' },
]

const threatChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 120, right: 30, top: 10, bottom: 10 },
  xAxis: { type: 'value', max: 100, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'category', data: ['Misinformation', 'Bot Networks', 'Opposition Attacks', 'Media Crisis', 'Data Breach', 'Internal Leak'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{ type: 'bar', data: [78, 65, 52, 38, 22, 15], itemStyle: { color: (params: any) => params.data > 60 ? '#ff4444' : params.data > 40 ? '#ffcc00' : '#00ffaa' }, barWidth: '55%' }],
}

const incidents = [
  { id: 'CRI-001', name: 'Coordinated Bot Attack on Education Reform', severity: 'CRITICAL', severityType: 'danger', detected: '23:38', status: 'ACTIVE', statusType: 'danger', team: 'Digital Response', impact: 'HIGH' },
  { id: 'CRI-002', name: 'False Poll Data Circulating on WhatsApp', severity: 'MODERATE', severityType: 'warning', detected: '22:15', status: 'MONITORING', statusType: 'warning', team: 'Fact Check Unit', impact: 'MEDIUM' },
  { id: 'CRI-003', name: 'Unauthorized Campaign Photo Usage', severity: 'LOW', severityType: 'info', detected: '20:42', status: 'CONTAINED', statusType: 'success', team: 'Legal Team', impact: 'LOW' },
]

const protocols = [
  { name: 'PROTOCOL ALPHA — Mass Disinformation', status: 'armed', description: 'Automated counter-narrative deployment across all channels', responseTime: '< 5 min' },
  { name: 'PROTOCOL BRAVO — Candidate Security', status: 'standby', description: 'Physical and digital security escalation procedures', responseTime: '< 2 min' },
  { name: 'PROTOCOL CHARLIE — Data Breach', status: 'standby', description: 'System isolation, forensics initiation, public disclosure plan', responseTime: '< 10 min' },
  { name: 'PROTOCOL DELTA — Media Crisis', status: 'armed', description: 'Press response team activation with pre-approved statements', responseTime: '< 15 min' },
]

const timeline = [
  { time: '23:42', event: 'Bot network escalation detected — 847 accounts active', action: 'Counter-measures deployed', level: 'danger' },
  { time: '23:38', event: 'CRI-001 created — Coordinated attack pattern confirmed', action: 'Digital Response team alerted', level: 'danger' },
  { time: '22:15', event: 'CRI-002 created — False poll data spreading on WhatsApp', action: 'Fact check team activated', level: 'warning' },
  { time: '20:42', event: 'CRI-003 created — Unauthorized photo usage detected', action: 'Legal takedown initiated', level: 'info' },
  { time: '19:30', event: 'Daily threat assessment completed', action: 'Threat level maintained at ELEVATED', level: 'info' },
  { time: '18:00', event: 'Shift change — Night team assumed operations', action: 'All systems nominal', level: 'success' },
]
</script>

<style scoped>
.crisis-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.status-badge { font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 2px; letter-spacing: 0.1em; }
.status-ready { background: rgba(0, 255, 170, 0.15); color: #00ffaa; border: 1px solid rgba(0, 255, 170, 0.3); }
.status-active { background: rgba(255, 68, 68, 0.15); color: #ff4444; border: 1px solid rgba(255, 68, 68, 0.3); }
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
.protocol-list { display: flex; flex-direction: column; gap: 8px; }
.protocol-item { display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; }
.protocol-item:hover { background: rgba(255, 107, 53, 0.03); }
.protocol-status { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; min-width: 60px; text-align: center; padding: 3px 6px; border-radius: 2px; }
.pstatus-armed { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.pstatus-standby { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.pstatus-active { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.protocol-info { flex: 1; }
.protocol-name { font-weight: 600; font-size: 12px; color: #e0e0e0; }
.protocol-desc { font-size: 11px; color: #888; margin-top: 2px; }
.protocol-time { font-size: 11px; color: #00ffaa; }
.timeline { display: flex; flex-direction: column; gap: 2px; }
.timeline-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.timeline-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
.dot-danger { background: #ff4444; }
.dot-warning { background: #ffcc00; }
.dot-info { background: #4A90E2; }
.dot-success { background: #00ffaa; }
.timeline-content { flex: 1; }
.timeline-time { font-size: 10px; color: #888; margin-bottom: 2px; }
.timeline-event { font-size: 12px; color: #e0e0e0; }
.timeline-action { font-size: 11px; color: #a0a0a0; margin-top: 2px; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
