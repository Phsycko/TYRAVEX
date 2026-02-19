<template>
  <div class="analytics-view">
    <header class="view-header">
      <div class="section-tag">ANALYTICS</div>
      <h1 class="section-title">ELECTORAL ANALYTICS ENGINE</h1>
      <p class="section-subtitle">Real-time data analysis across all intelligence sources</p>
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
          <span class="card-title">ENGAGEMENT BY PLATFORM</span>
        </div>
        <v-chart :option="engagementChart" style="height: 320px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">SENTIMENT OVER TIME</span>
        </div>
        <v-chart :option="sentimentChart" style="height: 320px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">TOP PERFORMING CONTENT</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>CONTENT</th>
            <th>PLATFORM</th>
            <th>REACH</th>
            <th>ENGAGEMENT</th>
            <th>SENTIMENT</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in topContent" :key="item.id">
            <td style="max-width: 300px;">{{ item.content }}</td>
            <td><span class="badge badge-info">{{ item.platform }}</span></td>
            <td class="mono-text">{{ item.reach }}</td>
            <td class="mono-text">{{ item.engagement }}</td>
            <td><span class="badge" :class="'badge-' + item.sentimentType">{{ item.sentiment }}</span></td>
            <td class="mono-text">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">ELECTORAL MAP — VOTE INTENTION BY STATE</span>
        <span class="badge badge-info">INTERACTIVE</span>
      </div>
      <div class="map-wrapper">
        <MexicoMap mode="electoral" />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">DEMOGRAPHIC BREAKDOWN</span>
      </div>
      <v-chart :option="demographicChart" style="height: 300px;" autoresize />
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
import MexicoMap from '@/components/maps/MexicoMap.vue'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const kpis = [
  { label: 'TOTAL MENTIONS', value: '284.7K', sub: '+12.3% vs last week', color: '#ff6b35' },
  { label: 'AVG ENGAGEMENT', value: '4.8%', sub: '+0.6% improvement', color: '#00ffaa' },
  { label: 'SHARE OF VOICE', value: '38.2%', sub: 'Leading by 6.4%', color: '#4A90E2' },
  { label: 'SENTIMENT SCORE', value: '+62', sub: 'Positive trending', color: '#00ffaa' },
]

const engagementChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 50, right: 20, top: 40, bottom: 30 },
  xAxis: { type: 'category', data: ['Twitter/X', 'Facebook', 'Instagram', 'TikTok', 'News', 'WhatsApp'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Mentions', type: 'bar', data: [89200, 64300, 52100, 38400, 24700, 16000], itemStyle: { color: '#ff6b35' }, barWidth: '35%' },
    { name: 'Engagement', type: 'bar', data: [4200, 3800, 6100, 8200, 1200, 2400], itemStyle: { color: '#4A90E2' }, barWidth: '35%' },
  ],
}

const sentimentChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { top: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 11 } },
  grid: { left: 50, right: 20, top: 40, bottom: 30 },
  xAxis: { type: 'category', data: ['04.FEB', '05.FEB', '06.FEB', '07.FEB', '08.FEB', '09.FEB', '10.FEB'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { name: 'Positive', type: 'line', data: [58, 60, 59, 63, 61, 64, 62], smooth: true, lineStyle: { color: '#00ffaa', width: 2 }, itemStyle: { color: '#00ffaa' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(0,255,170,0.2)' }, { offset: 1, color: 'rgba(0,255,170,0)' }] } } },
    { name: 'Negative', type: 'line', data: [18, 16, 19, 14, 17, 13, 15], smooth: true, lineStyle: { color: '#ff4444', width: 2 }, itemStyle: { color: '#ff4444' } },
    { name: 'Neutral', type: 'line', data: [24, 24, 22, 23, 22, 23, 23], smooth: true, lineStyle: { color: '#888', width: 1.5 }, itemStyle: { color: '#888' } },
  ],
}

const demographicChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 80, right: 20, top: 20, bottom: 30 },
  xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'category', data: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [
    { type: 'bar', data: [42, 58, 51, 39, 28, 18], itemStyle: { color: '#ff6b35' }, barWidth: '50%' },
  ],
}

const topContent = [
  { id: 1, content: 'Infrastructure investment plan announcement video', platform: 'TWITTER/X', reach: '1.2M', engagement: '8.4%', sentiment: 'POSITIVE', sentimentType: 'success', date: '10.FEB.2026' },
  { id: 2, content: 'Interview on national security policy on TV Azteca', platform: 'NEWS', reach: '890K', engagement: '3.2%', sentiment: 'POSITIVE', sentimentType: 'success', date: '09.FEB.2026' },
  { id: 3, content: 'Town hall meeting highlights in Guadalajara', platform: 'FACEBOOK', reach: '654K', engagement: '6.1%', sentiment: 'POSITIVE', sentimentType: 'success', date: '09.FEB.2026' },
  { id: 4, content: 'Education reform proposal reaction thread', platform: 'TWITTER/X', reach: '523K', engagement: '12.3%', sentiment: 'MIXED', sentimentType: 'warning', date: '08.FEB.2026' },
  { id: 5, content: 'Opposition attack ad response strategy', platform: 'INSTAGRAM', reach: '445K', engagement: '9.7%', sentiment: 'NEUTRAL', sentimentType: 'info', date: '08.FEB.2026' },
  { id: 6, content: 'Youth voter outreach campaign video', platform: 'TIKTOK', reach: '1.8M', engagement: '15.2%', sentiment: 'POSITIVE', sentimentType: 'success', date: '07.FEB.2026' },
]
</script>

<style scoped>
.analytics-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; margin-top: 6px; }
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
.map-wrapper { height: 500px; border-radius: 4px; overflow: hidden; }
.map-wrapper :deep(.mexico-map-root) { border: none; border-radius: 0; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
