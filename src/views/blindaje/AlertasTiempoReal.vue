<template>
  <div class="blindaje-view">
    <nav class="sub-nav">
      <router-link to="/blindaje" exact-active-class="active">DASHBOARD</router-link>
      <router-link to="/blindaje/amenazas" active-class="active">AMENAZAS RED</router-link>
      <router-link to="/blindaje/riesgo-geografico" active-class="active">RIESGO GEOGRÁFICO</router-link>
      <router-link to="/blindaje/alertas" active-class="active">ALERTAS</router-link>
      <router-link to="/blindaje/informes" active-class="active">INFORMES</router-link>
      <router-link to="/blindaje/espacios" active-class="active">ESPACIOS</router-link>
    </nav>

    <header class="view-header">
      <div class="section-tag">MÓDULO BLINDAJE</div>
      <h1 class="section-title">ALERTAS EN TIEMPO REAL</h1>
      <p class="section-subtitle">Centro de monitoreo y respuesta a alertas de seguridad digital</p>
    </header>

    <!-- Alert Feed + Config side by side -->
    <div class="grid-2col">
      <!-- Live Feed -->
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">ALERTAS ACTIVAS</span>
          <div class="feed-status">
            <span class="badge badge-danger">{{ pendingCount }} PENDIENTES</span>
            <span class="live-dot"></span>
          </div>
        </div>
        <div class="alert-feed">
          <div
            v-for="(alert, i) in liveAlerts"
            :key="alert.id + '-' + i"
            class="alert-item"
            :class="{ 'alert-critical': alert.severidad >= 9, 'alert-new': i === 0 && justAdded }"
          >
            <div class="alert-severity-bar" :style="{ background: getSeverityColor(alert.severidad) }"></div>
            <div class="alert-body">
              <div class="alert-top">
                <span class="alert-time mono-text">{{ alert.timestamp }}</span>
                <span class="badge" :class="'badge-' + getSeverityBadge(alert.severidad)">SEV {{ alert.severidad }}</span>
                <span class="badge" :class="alert.resuelto ? 'badge-success' : 'badge-warning'">
                  {{ alert.resuelto ? 'RESUELTO' : 'PENDIENTE' }}
                </span>
              </div>
              <div class="alert-type">{{ getThreatTypeLabel(alert.tipo) }}</div>
              <div class="alert-desc">{{ alert.descripcion }}</div>
              <div class="alert-action">{{ alert.accion_tomada }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Config -->
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">CONFIGURACIÓN DE ALERTAS</span>
        </div>
        <div class="config-list">
          <div v-for="cfg in alertConfig" :key="cfg.tipo" class="config-item">
            <div class="config-header">
              <span class="config-type">{{ cfg.label }}</span>
              <span class="config-threshold mono-text">Umbral: {{ cfg.threshold }}/10</span>
            </div>
            <div class="config-channels">
              <span v-for="ch in cfg.channels" :key="ch" class="channel-pill active">{{ ch }}</span>
            </div>
            <div class="config-escalation mono-text">
              Si no se atiende en {{ cfg.escalationMin }} min → escalar automáticamente
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">HISTORIAL DE ALERTAS — HOY</span>
      </div>
      <v-chart :option="hourlyChart" style="height: 250px;" autoresize />
    </div>

    <div class="grid-3col mt-16">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">HORAS DE MAYOR ACTIVIDAD</span>
        </div>
        <div class="stat-list">
          <div v-for="h in topHours" :key="h.hour" class="stat-item">
            <span class="stat-label mono-text">{{ h.hour }}</span>
            <span class="stat-value" style="color: #ff6b35;">{{ h.count }} alertas</span>
          </div>
        </div>
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">TIEMPO PROMEDIO DE RESPUESTA</span>
        </div>
        <div class="big-stat">
          <span class="big-stat-value" style="color: #ffcc00;">12 min</span>
          <span class="big-stat-sub mono-text">-3 min vs ayer</span>
        </div>
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">RESUELTAS VS PENDIENTES</span>
        </div>
        <div class="resolve-stats">
          <div class="resolve-item">
            <span class="resolve-value" style="color: #00ffaa;">{{ resolvedCount }}</span>
            <span class="resolve-label">RESUELTAS</span>
          </div>
          <div class="resolve-divider"></div>
          <div class="resolve-item">
            <span class="resolve-value" style="color: #ff4444;">{{ pendingCount }}</span>
            <span class="resolve-label">PENDIENTES</span>
          </div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX BLINDAJE // INTELIGENCIA DE AMENAZAS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  historialAlertas,
  getSeverityColor, getSeverityBadge, getThreatTypeLabel,
  type AlertaHistorial,
} from '@/data/blindajeData'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const liveAlerts = ref<AlertaHistorial[]>([...historialAlertas])
const justAdded = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null
let mockIdx = 0

const mockNewAlerts: AlertaHistorial[] = [
  { id: 'AL-LIVE-1', timestamp: 'AHORA', tipo: 'desinformacion', severidad: 6, descripcion: 'Nuevo artículo con información falsa detectado en portal de noticias regional', accion_tomada: 'Pendiente de revisión', resuelto: false },
  { id: 'AL-LIVE-2', timestamp: 'AHORA', tipo: 'coordinacion_hostil', severidad: 7, descripcion: 'Activación de red de bots detectada — 150 cuentas publicando simultáneamente', accion_tomada: 'Monitoreo automático activado', resuelto: false },
  { id: 'AL-LIVE-3', timestamp: 'AHORA', tipo: 'discurso_odio', severidad: 5, descripcion: 'Contenido de odio detectado en comentarios de video viral', accion_tomada: 'Reporte automático enviado', resuelto: false },
  { id: 'AL-LIVE-4', timestamp: 'AHORA', tipo: 'amenaza_directa', severidad: 8, descripcion: 'Nueva amenaza detectada en plataforma de mensajería contra equipo de avanzada', accion_tomada: 'ESCALADA AUTOMÁTICA', resuelto: false },
]

onMounted(() => {
  intervalId = setInterval(() => {
    const base = mockNewAlerts[mockIdx % mockNewAlerts.length]!
    const newAlert: AlertaHistorial = { id: `AL-LIVE-${Date.now()}`, timestamp: base.timestamp, tipo: base.tipo, severidad: base.severidad, descripcion: base.descripcion, accion_tomada: base.accion_tomada, resuelto: base.resuelto }
    liveAlerts.value = [newAlert, ...liveAlerts.value]
    justAdded.value = true
    setTimeout(() => { justAdded.value = false }, 2000)
    mockIdx++
  }, 45000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const pendingCount = computed(() => liveAlerts.value.filter(a => !a.resuelto).length)
const resolvedCount = computed(() => liveAlerts.value.filter(a => a.resuelto).length)

const alertConfig = [
  { tipo: 'amenaza_directa', label: 'AMENAZA DIRECTA', threshold: 6, channels: ['EMAIL', 'SMS', 'SLACK'], escalationMin: 5 },
  { tipo: 'coordinacion_hostil', label: 'COORDINACIÓN HOSTIL', threshold: 7, channels: ['EMAIL', 'SLACK'], escalationMin: 15 },
  { tipo: 'desinformacion', label: 'DESINFORMACIÓN', threshold: 5, channels: ['EMAIL', 'SLACK'], escalationMin: 30 },
  { tipo: 'discurso_odio', label: 'DISCURSO DE ODIO', threshold: 6, channels: ['EMAIL', 'SLACK'], escalationMin: 20 },
  { tipo: 'doxing', label: 'DOXING', threshold: 5, channels: ['EMAIL', 'SMS', 'SLACK', 'WHATSAPP'], escalationMin: 5 },
  { tipo: 'incitacion', label: 'INCITACIÓN', threshold: 7, channels: ['EMAIL', 'SLACK'], escalationMin: 15 },
]

const topHours = [
  { hour: '08:00 - 09:00', count: 5 },
  { hour: '19:00 - 20:00', count: 4 },
  { hour: '06:00 - 07:00', count: 3 },
]

const hourlyChart = computed(() => {
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
  const counts = [1, 0, 1, 1, 1, 1, 2, 2, 5, 3, 2, 1, 1, 0, 1, 0, 0, 1, 2, 4, 3, 2, 1, 1]
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
    grid: { left: 40, right: 12, top: 8, bottom: 30 },
    xAxis: { type: 'category', data: hours, axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 9, interval: 2 } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
    series: [{ type: 'bar', data: counts.map(c => ({ value: c, itemStyle: { color: c >= 4 ? '#ff4444' : c >= 2 ? '#ff6b35' : '#4A90E2' } })), barWidth: '60%' }],
  }
})
</script>

<style scoped>
.blindaje-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.sub-nav { display: flex; gap: 0; background: rgba(20, 22, 28, 0.7); border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; border-radius: 2px 2px 0 0; }
.sub-nav a { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-decoration: none; padding: 12px 20px; border-bottom: 2px solid transparent; transition: all 0.15s ease; }
.sub-nav a:hover { color: #e0e0e0; }
.sub-nav a.active { color: #ff6b35; border-bottom-color: #ff6b35; background: rgba(255,107,53,0.06); }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.mt-16 { margin-top: 16px; }
.feed-status { display: flex; align-items: center; gap: 8px; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #00ffaa; animation: pulse 2s ease-in-out infinite; }
.alert-feed { max-height: 500px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.alert-feed::-webkit-scrollbar { width: 4px; }
.alert-feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
.alert-item { display: flex; gap: 12px; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); transition: all 0.3s ease; }
.alert-item:hover { background: rgba(255,107,53,0.04); }
.alert-critical { background: rgba(255,68,68,0.04); }
.alert-new { animation: highlight 2s ease-out; }
.alert-severity-bar { width: 4px; border-radius: 2px; flex-shrink: 0; }
.alert-body { flex: 1; min-width: 0; }
.alert-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
.alert-time { font-size: 10px; color: #666; }
.alert-type { font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.08em; color: #e0e0e0; margin-bottom: 4px; }
.alert-desc { font-size: 12px; color: #a0a0a0; line-height: 1.5; }
.alert-action { font-size: 10px; color: #666; margin-top: 4px; font-style: italic; }
.config-list { display: flex; flex-direction: column; gap: 12px; }
.config-item { padding: 12px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.04); border-radius: 4px; }
.config-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.config-type { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: #e0e0e0; }
.config-threshold { font-size: 10px; color: #ff6b35; }
.config-channels { display: flex; gap: 4px; margin-bottom: 6px; }
.channel-pill { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; padding: 2px 8px; border-radius: 2px; background: rgba(0,255,170,0.1); color: #00ffaa; border: 1px solid rgba(0,255,170,0.2); }
.config-escalation { font-size: 10px; color: #888; }
.stat-list { display: flex; flex-direction: column; gap: 8px; }
.stat-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.stat-label { font-size: 12px; color: #a0a0a0; }
.stat-value { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 600; }
.big-stat { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px 0; }
.big-stat-value { font-family: 'Oswald', sans-serif; font-size: 48px; font-weight: 600; }
.big-stat-sub { font-size: 12px; color: #00ffaa; margin-top: 8px; }
.resolve-stats { display: flex; align-items: center; justify-content: center; gap: 24px; padding: 20px 0; }
.resolve-item { text-align: center; }
.resolve-value { font-family: 'Oswald', sans-serif; font-size: 36px; font-weight: 600; display: block; }
.resolve-label { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; letter-spacing: 0.1em; }
.resolve-divider { width: 1px; height: 50px; background: rgba(255,255,255,0.08); }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 32px; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes highlight { 0% { background: rgba(255,107,53,0.15); } 100% { background: transparent; } }
</style>
