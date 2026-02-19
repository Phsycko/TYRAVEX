<template>
  <div class="control-view">
    <header class="view-header">
      <div class="section-tag">CONTROL INFO</div>
      <h1 class="section-title">INFORMATION CONTROL CENTER</h1>
      <p class="section-subtitle">Digital footprint management, narrative control, and exposure monitoring</p>
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
          <span class="card-title">NARRATIVE CONTROL STATUS</span>
        </div>
        <v-chart :option="narrativeChart" style="height: 300px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">EXPOSURE BY CHANNEL</span>
        </div>
        <v-chart :option="exposureChart" style="height: 300px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">DIGITAL FOOTPRINT INVENTORY</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>TYPE</th>
            <th>CONTENT</th>
            <th>SOURCE</th>
            <th>DATE</th>
            <th>RISK</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" :key="item.id">
            <td style="font-weight: 600;">{{ item.type }}</td>
            <td style="max-width: 280px; font-size: 12px; color: #a0a0a0;">{{ item.content }}</td>
            <td class="mono-text" style="font-size: 11px;">{{ item.source }}</td>
            <td class="mono-text">{{ item.date }}</td>
            <td><span class="badge" :class="'badge-' + item.riskType">{{ item.risk }}</span></td>
            <td><span class="badge" :class="'badge-' + item.statusType">{{ item.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">TAKEDOWN REQUESTS</span>
      </div>
      <div class="takedown-list">
        <div class="takedown-item" v-for="t in takedowns" :key="t.id">
          <div class="takedown-platform">{{ t.platform }}</div>
          <div class="takedown-content">
            <div class="takedown-desc">{{ t.description }}</div>
            <div class="takedown-meta">Filed {{ t.filed }} &middot; {{ t.reason }}</div>
          </div>
          <span class="badge" :class="'badge-' + t.statusType">{{ t.status }}</span>
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
  { label: 'ITEMS TRACKED', value: '2,847', sub: '+12 this week', color: '#ff6b35' },
  { label: 'RISK SCORE', value: '34/100', sub: 'Low risk', color: '#00ffaa' },
  { label: 'CRITICAL ITEMS', value: '7', sub: '3 pending action', color: '#ff4444' },
  { label: 'TAKEDOWNS', value: '23', sub: '18 successful', color: '#4A90E2' },
]

const narrativeChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 110, right: 30, top: 10, bottom: 10 },
  xAxis: { type: 'value', max: 100, axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10, formatter: '{value}%' } },
  yAxis: { type: 'category', data: ['Controlled', 'Monitored', 'Uncontrolled', 'New/Unknown'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  series: [{ type: 'bar', data: [68, 22, 7, 3], itemStyle: { color: (params: any) => ['#00ffaa', '#ffcc00', '#ff4444', '#4A90E2'][params.dataIndex] }, barWidth: '55%' }],
}

const exposureChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { bottom: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 10 } },
  series: [{
    type: 'pie', radius: ['35%', '65%'], center: ['50%', '42%'],
    label: { show: false },
    data: [
      { value: 35, name: 'Social Media', itemStyle: { color: '#4A90E2' } },
      { value: 28, name: 'News Sites', itemStyle: { color: '#ff6b35' } },
      { value: 18, name: 'Public Records', itemStyle: { color: '#00ffaa' } },
      { value: 12, name: 'Images/Video', itemStyle: { color: '#ffcc00' } },
      { value: 7, name: 'Documents', itemStyle: { color: '#888' } },
    ],
  }],
}

const inventory = [
  { id: 1, type: 'Social Post', content: 'Old tweet referencing controversial policy stance from 2019', source: 'Twitter/X', date: '10.FEB.2026', risk: 'HIGH', riskType: 'danger', status: 'MONITORED', statusType: 'warning' },
  { id: 2, type: 'News Article', content: 'Interview with opposing views on trade policy', source: 'El Universal', date: '08.FEB.2026', risk: 'MEDIUM', riskType: 'warning', status: 'CONTROLLED', statusType: 'success' },
  { id: 3, type: 'Photo', content: 'Candidate at controversial event — photo circulating on WhatsApp', source: 'WhatsApp', date: '06.FEB.2026', risk: 'HIGH', riskType: 'danger', status: 'ACTION REQ', statusType: 'danger' },
  { id: 4, type: 'Document', content: 'Financial disclosure with potential inconsistency', source: 'INE Registry', date: '04.FEB.2026', risk: 'MEDIUM', riskType: 'warning', status: 'CONTROLLED', statusType: 'success' },
  { id: 5, type: 'Video', content: 'Campaign rally footage with unscripted remarks', source: 'YouTube', date: '02.FEB.2026', risk: 'LOW', riskType: 'success', status: 'CONTROLLED', statusType: 'success' },
  { id: 6, type: 'Social Post', content: 'Facebook post from family member with political commentary', source: 'Facebook', date: '01.FEB.2026', risk: 'MEDIUM', riskType: 'warning', status: 'MONITORED', statusType: 'warning' },
]

const takedowns = [
  { id: 1, platform: 'TWITTER/X', description: 'Deepfake video of candidate — manipulated audio', filed: '09.FEB.2026', reason: 'Synthetic media violation', status: 'APPROVED', statusType: 'success' },
  { id: 2, platform: 'FACEBOOK', description: 'False poll results graphic circulating in groups', filed: '08.FEB.2026', reason: 'Misinformation', status: 'PENDING', statusType: 'warning' },
  { id: 3, platform: 'YOUTUBE', description: 'Edited interview clip taken out of context', filed: '07.FEB.2026', reason: 'Misleading content', status: 'UNDER REVIEW', statusType: 'info' },
  { id: 4, platform: 'TIKTOK', description: 'AI-generated audio impersonating candidate', filed: '05.FEB.2026', reason: 'Impersonation', status: 'APPROVED', statusType: 'success' },
]
</script>

<style scoped>
.control-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
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
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.mono-text { font-family: 'Roboto Mono', monospace; }
.takedown-list { display: flex; flex-direction: column; gap: 8px; }
.takedown-item { display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.takedown-item:hover { background: rgba(255, 107, 53, 0.04); }
.takedown-platform { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; min-width: 80px; color: #ff6b35; }
.takedown-content { flex: 1; }
.takedown-desc { font-size: 13px; color: #e0e0e0; }
.takedown-meta { font-size: 11px; color: #888; margin-top: 2px; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
