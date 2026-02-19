<template>
  <div class="research-view">
    <header class="view-header">
      <div class="section-tag">RESEARCH</div>
      <h1 class="section-title">OPPOSITION INTELLIGENCE</h1>
      <p class="section-subtitle">Deep analysis of opposition candidates — AI-powered profiling</p>
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
        <span class="card-title">CANDIDATE PROFILES</span>
      </div>
      <div class="profiles-grid">
        <div class="profile-card" v-for="profile in profiles" :key="profile.name" :class="{ active: selectedProfile === profile.name }" @click="selectedProfile = profile.name">
          <div class="profile-avatar" :style="{ borderColor: profile.color }">{{ profile.initials }}</div>
          <div class="profile-info">
            <div class="profile-name">{{ profile.name }}</div>
            <div class="profile-party">{{ profile.party }}</div>
          </div>
          <div class="profile-metric">
            <div class="profile-pop mono-text" :style="{ color: profile.color }">{{ profile.popularity }}%</div>
            <div class="profile-pop-label">POPULARITY</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">STRENGTHS & WEAKNESSES</span>
        </div>
        <v-chart :option="swChart" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">MEDIA COVERAGE TREND</span>
        </div>
        <v-chart :option="coverageChart" style="height: 320px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">INCONSISTENCY DETECTOR</span>
        <span class="badge badge-danger">{{ inconsistencies.length }} FOUND</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>TOPIC</th>
            <th>STATEMENT A</th>
            <th>STATEMENT B</th>
            <th>SEVERITY</th>
            <th>SOURCE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inconsistencies" :key="item.id">
            <td class="mono-text">{{ item.date }}</td>
            <td style="font-weight: 600;">{{ item.topic }}</td>
            <td style="font-size: 12px; color: #a0a0a0; max-width: 200px;">{{ item.statementA }}</td>
            <td style="font-size: 12px; color: #a0a0a0; max-width: 200px;">{{ item.statementB }}</td>
            <td><span class="badge" :class="'badge-' + item.severityType">{{ item.severity }}</span></td>
            <td class="mono-text" style="font-size: 11px;">{{ item.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const selectedProfile = ref('Juan Hernández')

const kpis = [
  { label: 'PROFILES TRACKED', value: '4', sub: '3 active candidates', color: '#ff6b35' },
  { label: 'INCONSISTENCIES', value: '18', sub: '6 high severity', color: '#ff4444' },
  { label: 'MEDIA ARTICLES', value: '1,247', sub: 'Last 30 days', color: '#4A90E2' },
  { label: 'VULNERABILITY INDEX', value: '72', sub: 'Exploitable weaknesses', color: '#ffcc00' },
]

const profiles = [
  { name: 'Juan Hernández', initials: 'JH', party: 'Partido Nacional', popularity: 35.8, color: '#4A90E2' },
  { name: 'María López', initials: 'ML', party: 'Alianza Progresista', popularity: 28.4, color: '#ff6b35' },
  { name: 'Carlos Ruiz', initials: 'CR', party: 'Movimiento Social', popularity: 15.9, color: '#00ffaa' },
  { name: 'Ana Torres', initials: 'AT', party: 'Independiente', popularity: 8.2, color: '#ffcc00' },
]

const swChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 100, right: 20, top: 40, bottom: 10 },
  xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'category', data: ['Public speaking', 'Policy depth', 'Media presence', 'Ground game', 'Fundraising', 'Youth appeal'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [
    { name: 'Strength', type: 'bar', data: [78, 45, 82, 35, 60, 40], itemStyle: { color: '#00ffaa' }, barWidth: '30%' },
    { name: 'Weakness', type: 'bar', data: [22, 55, 18, 65, 40, 60], itemStyle: { color: '#ff4444' }, barWidth: '30%' },
  ],
}

const coverageChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 50, right: 20, top: 40, bottom: 30 },
  xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Positive', type: 'line', data: [45, 42, 48, 44, 50, 47], smooth: true, lineStyle: { color: '#00ffaa', width: 2 }, itemStyle: { color: '#00ffaa' } },
    { name: 'Negative', type: 'line', data: [30, 35, 28, 38, 32, 36], smooth: true, lineStyle: { color: '#ff4444', width: 2 }, itemStyle: { color: '#ff4444' } },
    { name: 'Neutral', type: 'line', data: [25, 23, 24, 18, 18, 17], smooth: true, lineStyle: { color: '#888', width: 1.5 }, itemStyle: { color: '#888' } },
  ],
}

const inconsistencies = [
  { id: 1, date: '08.FEB.2026', topic: 'Education Reform', statementA: 'Promised free university tuition for all', statementB: 'Voted against education budget increase in 2024', severity: 'HIGH', severityType: 'danger', source: 'Senate Records' },
  { id: 2, date: '05.FEB.2026', topic: 'Security Policy', statementA: 'Advocated for military intervention', statementB: 'Previously opposed increased military spending', severity: 'HIGH', severityType: 'danger', source: 'Press Conference' },
  { id: 3, date: '02.FEB.2026', topic: 'Economic Plan', statementA: 'Promised tax cuts for middle class', statementB: 'Campaign funded by corporations seeking tax breaks', severity: 'MEDIUM', severityType: 'warning', source: 'Financial Disclosures' },
  { id: 4, date: '28.JAN.2026', topic: 'Healthcare', statementA: 'Supports universal healthcare', statementB: 'Accepted donations from private healthcare lobby', severity: 'MEDIUM', severityType: 'warning', source: 'Campaign Finance' },
  { id: 5, date: '25.JAN.2026', topic: 'Environment', statementA: 'Pledged carbon neutrality by 2035', statementB: 'Family owns stake in oil company', severity: 'HIGH', severityType: 'danger', source: 'Asset Declaration' },
]
</script>

<style scoped>
.research-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
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
.profiles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.profile-card { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; cursor: pointer; transition: all 0.15s ease; }
.profile-card:hover { background: rgba(255, 107, 53, 0.04); border-color: rgba(255, 255, 255, 0.12); }
.profile-card.active { border-color: #ff6b35; background: rgba(255, 107, 53, 0.08); }
.profile-avatar { width: 40px; height: 40px; border-radius: 4px; border: 2px solid; display: flex; align-items: center; justify-content: center; font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 600; background: rgba(255, 255, 255, 0.05); }
.profile-info { flex: 1; }
.profile-name { font-weight: 600; font-size: 13px; }
.profile-party { font-size: 11px; color: #888; }
.profile-metric { text-align: right; }
.profile-pop { font-size: 18px; font-weight: 700; }
.profile-pop-label { font-size: 9px; color: #888; letter-spacing: 0.1em; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
