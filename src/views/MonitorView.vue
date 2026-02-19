<template>
  <div class="monitor-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">MONITOR</div>
          <h1 class="section-title">REAL-TIME SURVEILLANCE</h1>
          <p class="section-subtitle">Media and social network monitoring — 24/7 coverage active</p>
        </div>
        <div class="live-badge"><span class="live-dot"></span> LIVE FEED ACTIVE</div>
      </div>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
        <div class="kpi-label">{{ kpi.label }}</div>
        <div class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="kpi-sub" :style="{ color: kpi.subColor }">{{ kpi.sub }}</div>
      </div>
    </div>

    <div class="grid-2col">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">MENTION VOLUME (LAST 7 DAYS)</span>
        </div>
        <v-chart :option="mentionChart" style="height: 300px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">SOURCE DISTRIBUTION</span>
        </div>
        <v-chart :option="sourceChart" style="height: 300px;" autoresize />
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">TRENDING TOPICS</span>
        <span class="badge badge-warning">{{ trendingTopics.length }} ACTIVE</span>
      </div>
      <div class="trending-grid">
        <div class="trending-item" v-for="topic in trendingTopics" :key="topic.tag">
          <div class="trending-rank" :style="{ color: topic.color }">#{{ topic.rank }}</div>
          <div class="trending-info">
            <div class="trending-tag">{{ topic.tag }}</div>
            <div class="trending-meta">{{ topic.mentions }} mentions &middot; {{ topic.sentiment }}</div>
          </div>
          <div class="trending-delta" :class="topic.direction">{{ topic.direction === 'up' ? '▲' : '▼' }} {{ topic.change }}</div>
        </div>
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">LIVE MENTION FEED</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>TIME</th>
            <th>SOURCE</th>
            <th>AUTHOR</th>
            <th>CONTENT</th>
            <th>SENTIMENT</th>
            <th>REACH</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mention in mentions" :key="mention.id">
            <td class="mono-text">{{ mention.time }}</td>
            <td><span class="badge badge-info">{{ mention.source }}</span></td>
            <td style="font-weight: 600;">{{ mention.author }}</td>
            <td style="max-width: 320px; font-size: 12px; color: #a0a0a0;">{{ mention.content }}</td>
            <td><span class="badge" :class="'badge-' + mention.sentimentType">{{ mention.sentiment }}</span></td>
            <td class="mono-text">{{ mention.reach }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">ACTIVE ALERTS</span>
        <span class="badge badge-danger">{{ alerts.length }} ALERTS</span>
      </div>
      <div class="alerts-list">
        <div class="alert-item" v-for="alert in alerts" :key="alert.id" :class="'alert-' + alert.severity">
          <div class="alert-severity">{{ alert.severity.toUpperCase() }}</div>
          <div class="alert-content">
            <div class="alert-title">{{ alert.title }}</div>
            <div class="alert-desc">{{ alert.description }}</div>
          </div>
          <div class="alert-time mono-text">{{ alert.time }}</div>
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
  { label: 'MENTIONS TODAY', value: '18,429', sub: '▲ +2,341 vs yesterday', color: '#ff6b35', subColor: '#00ffaa' },
  { label: 'SENTIMENT INDEX', value: '+58', sub: 'Trending positive', color: '#00ffaa', subColor: '#00ffaa' },
  { label: 'ACTIVE SOURCES', value: '2,847', sub: '6 platforms tracked', color: '#4A90E2', subColor: '#a0a0a0' },
  { label: 'CRITICAL ALERTS', value: '3', sub: '2 pending review', color: '#ff4444', subColor: '#ffcc00' },
]

const mentionChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 50, right: 20, top: 10, bottom: 30 },
  xAxis: { type: 'category', data: ['04.FEB', '05.FEB', '06.FEB', '07.FEB', '08.FEB', '09.FEB', '10.FEB'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [{ type: 'bar', data: [14200, 15800, 13900, 16400, 17200, 16800, 18429], itemStyle: { color: '#ff6b35' }, barWidth: '50%' }],
}

const sourceChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  legend: { bottom: 0, textStyle: { color: '#a0a0a0', fontFamily: 'Montserrat', fontSize: 10 } },
  series: [{
    type: 'pie', radius: ['35%', '65%'], center: ['50%', '42%'],
    label: { show: false },
    data: [
      { value: 42, name: 'Twitter/X', itemStyle: { color: '#4A90E2' } },
      { value: 24, name: 'Facebook', itemStyle: { color: '#ff6b35' } },
      { value: 18, name: 'Instagram', itemStyle: { color: '#00ffaa' } },
      { value: 10, name: 'TikTok', itemStyle: { color: '#ffcc00' } },
      { value: 6, name: 'News', itemStyle: { color: '#888' } },
    ],
  }],
}

const trendingTopics = [
  { rank: 1, tag: '#DebatePresidencial2026', mentions: '12.4K', sentiment: 'Mixed', change: '340%', direction: 'up', color: '#ff6b35' },
  { rank: 2, tag: '#ReformaEducativa', mentions: '8.2K', sentiment: 'Positive', change: '120%', direction: 'up', color: '#00ffaa' },
  { rank: 3, tag: '#Seguridad2026', mentions: '6.8K', sentiment: 'Negative', change: '85%', direction: 'up', color: '#ff4444' },
  { rank: 4, tag: '#EconomíaMX', mentions: '5.1K', sentiment: 'Neutral', change: '45%', direction: 'up', color: '#4A90E2' },
  { rank: 5, tag: '#CandidatoX', mentions: '4.3K', sentiment: 'Positive', change: '12%', direction: 'down', color: '#ffcc00' },
]

const mentions = [
  { id: 1, time: '23:42:18', source: 'TWITTER', author: '@politica_mx', content: 'El debate de esta noche mostró claras diferencias en política económica...', sentiment: 'NEUTRAL', sentimentType: 'info', reach: '45.2K' },
  { id: 2, time: '23:41:05', source: 'FACEBOOK', author: 'Noticias MX', content: 'ÚLTIMA HORA: Candidato anuncia plan de infraestructura para el norte...', sentiment: 'POSITIVE', sentimentType: 'success', reach: '128K' },
  { id: 3, time: '23:39:42', source: 'TWITTER', author: '@periodista_mz', content: 'La propuesta de reforma educativa genera polémica en redes sociales...', sentiment: 'MIXED', sentimentType: 'warning', reach: '23.1K' },
  { id: 4, time: '23:38:19', source: 'NEWS', author: 'El Universal', content: 'Encuestas muestran empate técnico en 3 estados clave del norte...', sentiment: 'NEUTRAL', sentimentType: 'info', reach: '890K' },
  { id: 5, time: '23:36:55', source: 'INSTAGRAM', author: '@juventud_mx', content: 'Video del candidato en evento universitario alcanza 500K vistas...', sentiment: 'POSITIVE', sentimentType: 'success', reach: '502K' },
  { id: 6, time: '23:35:31', source: 'TIKTOK', author: '@eleccion_viral', content: 'Clip del debate se viraliza con 2M reproducciones en 2 horas...', sentiment: 'POSITIVE', sentimentType: 'success', reach: '2.1M' },
  { id: 7, time: '23:33:12', source: 'TWITTER', author: '@oposicion_mx', content: 'Críticas al plan de seguridad propuesto en el debate nocturno...', sentiment: 'NEGATIVE', sentimentType: 'danger', reach: '67K' },
  { id: 8, time: '23:31:48', source: 'NEWS', author: 'Reforma', content: 'Análisis de expertos sobre las propuestas económicas presentadas...', sentiment: 'NEUTRAL', sentimentType: 'info', reach: '445K' },
]

const alerts = [
  { id: 1, severity: 'danger', title: 'Coordinated Bot Network Detected', description: 'Cluster of 847 accounts amplifying negative narratives about education reform', time: '23:38' },
  { id: 2, severity: 'warning', title: 'Unusual Sentiment Shift in Chihuahua', description: 'Sentiment dropped 15 points in last 2 hours — investigating root cause', time: '23:22' },
  { id: 3, severity: 'warning', title: 'Viral Misinformation Thread', description: 'False claim about candidate policy gaining traction on Twitter/X — 12K retweets', time: '22:55' },
]
</script>

<style scoped>
.monitor-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.live-badge { display: flex; align-items: center; gap: 8px; font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; background: rgba(0, 255, 170, 0.1); padding: 6px 14px; border: 1px solid rgba(0, 255, 170, 0.2); border-radius: 2px; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #00ffaa; display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; margin-top: 6px; }
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
.trending-grid { display: flex; flex-direction: column; }
.trending-item { display: flex; align-items: center; gap: 16px; padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background 0.15s ease; }
.trending-item:hover { background: rgba(255, 107, 53, 0.04); }
.trending-rank { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 600; min-width: 40px; }
.trending-info { flex: 1; }
.trending-tag { font-weight: 600; font-size: 14px; color: #e0e0e0; }
.trending-meta { font-size: 11px; color: #888; margin-top: 2px; }
.trending-delta { font-family: 'Roboto Mono', monospace; font-size: 12px; font-weight: 600; }
.trending-delta.up { color: #00ffaa; }
.trending-delta.down { color: #ff4444; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.mono-text { font-family: 'Roboto Mono', monospace; }
.alerts-list { display: flex; flex-direction: column; gap: 8px; }
.alert-item { display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.06); transition: background 0.15s ease; }
.alert-item:hover { background: rgba(255, 255, 255, 0.02); }
.alert-danger { border-left: 3px solid #ff4444; background: rgba(255, 68, 68, 0.05); }
.alert-warning { border-left: 3px solid #ffcc00; background: rgba(255, 204, 0, 0.05); }
.alert-severity { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; min-width: 60px; text-transform: uppercase; }
.alert-danger .alert-severity { color: #ff4444; }
.alert-warning .alert-severity { color: #ffcc00; }
.alert-content { flex: 1; }
.alert-title { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.alert-desc { font-size: 12px; color: #888; margin-top: 2px; }
.alert-time { font-size: 11px; color: #888; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
