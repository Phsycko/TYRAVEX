<template>
  <div class="seguridad-view">
    <header class="view-header">
      <div class="header-top">
        <div>
          <div class="section-tag">SECURITY</div>
          <h1 class="section-title">SYSTEM SECURITY & SOVEREIGNTY</h1>
          <p class="section-subtitle">Identity management, forensic auditing, and cryptographic control</p>
        </div>
        <div class="secure-badge">
          <div class="secure-dot"></div>
          <span>TLS 1.3 / E2EE ACTIVE</span>
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

    <div class="grid-2col">
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">ACCESS ACTIVITY (24H)</span>
        </div>
        <v-chart :option="activityChart" style="height: 300px;" autoresize />
      </div>
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">API INTEGRATIONS</span>
        </div>
        <div class="integration-list">
          <div class="integration-item" v-for="api in integrations" :key="api.name">
            <div class="integration-status" :class="'istatus-' + api.level"></div>
            <div class="integration-info">
              <div class="integration-name">{{ api.name }}</div>
              <div class="integration-endpoint mono-text">{{ api.endpoint }}</div>
            </div>
            <div class="integration-metrics">
              <span class="mono-text" style="font-size: 11px; color: #a0a0a0;">{{ api.latency }}</span>
            </div>
            <span class="badge" :class="'badge-' + api.statusType">{{ api.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">USER PERMISSIONS</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>USER</th>
            <th>ROLE</th>
            <th>ACCESS LEVEL</th>
            <th>STATUS</th>
            <th>LAST LOGIN</th>
            <th>SESSIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td style="font-weight: 600;">{{ user.name }}</td>
            <td class="mono-text">{{ user.role }}</td>
            <td><span class="badge" :class="'badge-' + user.levelType">{{ user.level }}</span></td>
            <td>
              <div class="status-inline">
                <div class="status-dot-sm" :class="user.online ? 'dot-online' : 'dot-offline'"></div>
                <span>{{ user.online ? 'ONLINE' : 'OFFLINE' }}</span>
              </div>
            </td>
            <td class="mono-text">{{ user.lastLogin }}</td>
            <td class="mono-text">{{ user.sessions }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">AUDIT LOG</span>
        <span class="badge badge-info">LIVE FEED</span>
      </div>
      <div class="audit-terminal">
        <div class="terminal-header">
          <div class="terminal-dot" style="background: #ff4444;"></div>
          <div class="terminal-dot" style="background: #ffcc00;"></div>
          <div class="terminal-dot" style="background: #00ffaa;"></div>
          <span class="terminal-title mono-text">system_audit_log.log</span>
        </div>
        <div class="terminal-body">
          <div class="log-line" v-for="log in auditLogs" :key="log.id">
            <span class="log-time">[{{ log.time }}]</span>
            <span class="log-ip">{{ log.ip }}</span>
            <span class="log-user">{{ log.user }}</span>
            <span class="log-action">{{ log.action }}</span>
            <span class="log-status" :class="'lstatus-' + log.level">{{ log.status }}</span>
          </div>
          <div class="log-cursor">_</div>
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

const kpis = [
  { label: 'SYSTEM INTEGRITY', value: '100%', sub: 'All checks passed', color: '#00ffaa' },
  { label: 'THREATS BLOCKED', value: '1,247', sub: 'Last 30 days', color: '#ff6b35' },
  { label: 'ACTIVE SESSIONS', value: '8', sub: '3 admin, 5 analyst', color: '#4A90E2' },
  { label: 'LAST AUDIT', value: '2h AGO', sub: 'Next in 4h', color: '#ffcc00' },
]

const activityChart = {
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(20,22,28,0.95)', borderColor: 'rgba(255,255,255,0.08)', textStyle: { color: '#e0e0e0', fontFamily: 'Montserrat' } },
  grid: { left: 50, right: 20, top: 10, bottom: 30 },
  xAxis: { type: 'category', data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'], axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#888', fontFamily: 'Roboto Mono', fontSize: 10 } },
  series: [{ type: 'bar', data: [12, 5, 45, 89, 120, 78, 34], itemStyle: { color: (params: any) => params.data > 100 ? '#ff6b35' : params.data > 50 ? '#4A90E2' : '#00ffaa' }, barWidth: '50%' }],
}

const integrations = [
  { name: 'Twitter/X API v2', endpoint: 'api.twitter.com/2/', latency: '45ms', status: 'CONNECTED', statusType: 'success', level: 'success' },
  { name: 'Meta Graph API', endpoint: 'graph.facebook.com/v18.0/', latency: '62ms', status: 'CONNECTED', statusType: 'success', level: 'success' },
  { name: 'Google Cloud NLP', endpoint: 'language.googleapis.com/v2/', latency: '128ms', status: 'CONNECTED', statusType: 'success', level: 'success' },
  { name: 'INE Open Data', endpoint: 'datos.ine.mx/api/v1/', latency: '340ms', status: 'SLOW', statusType: 'warning', level: 'warning' },
  { name: 'TYRAVEX ML Engine', endpoint: 'ml.tyravex.internal/v2.4/', latency: '8ms', status: 'OPTIMAL', statusType: 'success', level: 'success' },
  { name: 'Backup Storage', endpoint: 's3.tyravex.vault/', latency: '22ms', status: 'CONNECTED', statusType: 'success', level: 'success' },
]

const users = [
  { id: 1, name: 'Director Operativo', role: 'ADMIN', level: 'LEVEL 5', levelType: 'danger', online: true, lastLogin: '10.FEB 23:15', sessions: 2 },
  { id: 2, name: 'Jefe de Estrategia', role: 'ADMIN', level: 'LEVEL 5', levelType: 'danger', online: true, lastLogin: '10.FEB 22:30', sessions: 1 },
  { id: 3, name: 'Analista Senior A', role: 'ANALYST', level: 'LEVEL 3', levelType: 'warning', online: true, lastLogin: '10.FEB 21:45', sessions: 1 },
  { id: 4, name: 'Analista Senior B', role: 'ANALYST', level: 'LEVEL 3', levelType: 'warning', online: false, lastLogin: '10.FEB 18:20', sessions: 0 },
  { id: 5, name: 'Operador Digital', role: 'OPERATOR', level: 'LEVEL 2', levelType: 'info', online: true, lastLogin: '10.FEB 23:38', sessions: 3 },
  { id: 6, name: 'Operador Campo', role: 'OPERATOR', level: 'LEVEL 2', levelType: 'info', online: true, lastLogin: '10.FEB 20:10', sessions: 1 },
  { id: 7, name: 'Consultor Externo', role: 'VIEWER', level: 'LEVEL 1', levelType: 'info', online: false, lastLogin: '09.FEB 14:30', sessions: 0 },
  { id: 8, name: 'Auditor Seguridad', role: 'AUDITOR', level: 'LEVEL 4', levelType: 'warning', online: true, lastLogin: '10.FEB 22:00', sessions: 1 },
]

const auditLogs = [
  { id: 1, time: '23:42:18', ip: '10.0.1.15', user: 'dir_operativo', action: 'CRISIS MODULE — Activated Protocol ALPHA', status: 'SUCCESS', level: 'success' },
  { id: 2, time: '23:38:05', ip: '10.0.1.22', user: 'operador_dig', action: 'MONITOR — Bot network alert acknowledged', status: 'SUCCESS', level: 'success' },
  { id: 3, time: '23:15:33', ip: '10.0.1.15', user: 'dir_operativo', action: 'AUTH — Session started (2FA verified)', status: 'SUCCESS', level: 'success' },
  { id: 4, time: '22:45:12', ip: '192.168.1.50', user: 'unknown', action: 'AUTH — Failed login attempt (invalid credentials)', status: 'BLOCKED', level: 'danger' },
  { id: 5, time: '22:30:48', ip: '10.0.1.18', user: 'jefe_estrat', action: 'STRATEGY — Campaign performance report exported', status: 'SUCCESS', level: 'success' },
  { id: 6, time: '22:15:22', ip: '10.0.1.25', user: 'analista_a', action: 'PREDICT — Model recalibration initiated', status: 'SUCCESS', level: 'success' },
  { id: 7, time: '21:50:09', ip: '192.168.1.88', user: 'unknown', action: 'API — Rate limit exceeded on /monitor endpoint', status: 'WARNING', level: 'warning' },
  { id: 8, time: '21:30:44', ip: '10.0.1.30', user: 'auditor_seg', action: 'SECURITY — Encryption key rotation completed', status: 'SUCCESS', level: 'success' },
  { id: 9, time: '20:42:11', ip: '10.0.1.22', user: 'operador_dig', action: 'CONTROL — Takedown request filed (Twitter deepfake)', status: 'SUCCESS', level: 'success' },
  { id: 10, time: '20:10:55', ip: '10.0.2.5', user: 'operador_campo', action: 'TERRITORY — Field report uploaded (Chihuahua D-04)', status: 'SUCCESS', level: 'success' },
]
</script>

<style scoped>
.seguridad-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.secure-badge { display: flex; align-items: center; gap: 8px; font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; color: #00ffaa; padding: 6px 14px; border: 1px solid rgba(0, 255, 170, 0.3); border-radius: 2px; background: rgba(0, 255, 170, 0.08); letter-spacing: 0.05em; }
.secure-dot { width: 8px; height: 8px; border-radius: 50%; background: #00ffaa; box-shadow: 0 0 6px rgba(0, 255, 170, 0.5); animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
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
.mono-text { font-family: 'Roboto Mono', monospace; }
.integration-list { display: flex; flex-direction: column; gap: 8px; }
.integration-item { display: flex; align-items: center; gap: 12px; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.integration-item:hover { background: rgba(255, 107, 53, 0.04); }
.integration-status { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.istatus-success { background: #00ffaa; box-shadow: 0 0 4px rgba(0, 255, 170, 0.4); }
.istatus-warning { background: #ffcc00; box-shadow: 0 0 4px rgba(255, 204, 0, 0.4); }
.istatus-danger { background: #ff4444; box-shadow: 0 0 4px rgba(255, 68, 68, 0.4); }
.integration-info { flex: 1; min-width: 0; }
.integration-name { font-weight: 600; font-size: 12px; color: #e0e0e0; }
.integration-endpoint { font-size: 10px; color: #888; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.integration-metrics { min-width: 50px; text-align: right; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.data-table tr:hover td { background: rgba(255, 107, 53, 0.04); }
.status-inline { display: flex; align-items: center; gap: 6px; font-size: 11px; font-family: 'Roboto Mono', monospace; }
.status-dot-sm { width: 6px; height: 6px; border-radius: 50%; }
.dot-online { background: #00ffaa; box-shadow: 0 0 4px rgba(0, 255, 170, 0.5); }
.dot-offline { background: #555; }
.audit-terminal { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; overflow: hidden; }
.terminal-header { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(15, 17, 21, 0.9); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
.terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.terminal-title { font-size: 11px; color: #888; margin-left: 8px; }
.terminal-body { background: rgba(10, 12, 16, 0.9); padding: 12px 16px; max-height: 320px; overflow-y: auto; }
.log-line { font-family: 'Roboto Mono', monospace; font-size: 11px; line-height: 1.8; padding: 2px 4px; border-radius: 2px; transition: background 0.1s ease; }
.log-line:hover { background: rgba(255, 255, 255, 0.03); }
.log-time { color: #555; margin-right: 8px; }
.log-ip { color: #4A90E2; margin-right: 8px; }
.log-user { color: #e0e0e0; font-weight: 700; margin-right: 8px; }
.log-action { color: #a0a0a0; margin-right: 8px; }
.lstatus-success { color: #00ffaa; }
.lstatus-warning { color: #ffcc00; }
.lstatus-danger { color: #ff4444; }
.log-cursor { color: #ff6b35; animation: blink 1s infinite; font-family: 'Roboto Mono', monospace; font-size: 14px; margin-top: 4px; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
