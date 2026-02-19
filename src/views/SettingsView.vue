<template>
  <div class="settings-view">
    <header class="view-header">
      <div class="section-tag">SETTINGS</div>
      <h1 class="section-title">SYSTEM CONFIGURATION</h1>
      <p class="section-subtitle">Campaign parameters, alert thresholds, and platform integrations</p>
    </header>

    <div class="tabs-bar">
      <button class="tab-btn" :class="{ active: activeTab === 'campaign' }" @click="activeTab = 'campaign'">CAMPAIGN</button>
      <button class="tab-btn" :class="{ active: activeTab === 'alerts' }" @click="activeTab = 'alerts'">ALERTS</button>
      <button class="tab-btn" :class="{ active: activeTab === 'integrations' }" @click="activeTab = 'integrations'">INTEGRATIONS</button>
    </div>

    <!-- CAMPAIGN TAB -->
    <div v-if="activeTab === 'campaign'" class="card-panel">
      <div class="card-header">
        <span class="card-title">CAMPAIGN INFORMATION</span>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">CAMPAIGN NAME</label>
          <input class="form-input" v-model="campaign.name" type="text" />
        </div>
        <div class="form-group">
          <label class="form-label">CANDIDATE</label>
          <input class="form-input" v-model="campaign.candidate" type="text" />
        </div>
        <div class="form-group">
          <label class="form-label">PARTY / COALITION</label>
          <input class="form-input" v-model="campaign.party" type="text" />
        </div>
        <div class="form-group">
          <label class="form-label">STATE</label>
          <select class="form-input" v-model="campaign.state">
            <option>Nacional</option>
            <option>Nuevo Leon</option>
            <option>Jalisco</option>
            <option>CDMX</option>
            <option>Estado de Mexico</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">CAMPAIGN START</label>
          <input class="form-input" v-model="campaign.startDate" type="date" />
        </div>
        <div class="form-group">
          <label class="form-label">ELECTION DATE</label>
          <input class="form-input" v-model="campaign.electionDate" type="date" />
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-save" @click="handleSave">SAVE CHANGES</button>
      </div>
    </div>

    <!-- ALERTS TAB -->
    <div v-if="activeTab === 'alerts'" class="card-panel">
      <div class="card-header">
        <span class="card-title">ALERT CONFIGURATION</span>
      </div>
      <div class="toggle-list">
        <div class="toggle-item" v-for="alert in alertSettings" :key="alert.id">
          <div class="toggle-info">
            <div class="toggle-title">{{ alert.title }}</div>
            <div class="toggle-desc">{{ alert.description }}</div>
          </div>
          <div class="toggle-switch" :class="{ on: alert.enabled }" @click="alert.enabled = !alert.enabled">
            <div class="toggle-knob"></div>
          </div>
        </div>
      </div>
      <div class="form-section mt-16">
        <div class="form-group">
          <label class="form-label">MENTION THRESHOLD FOR ALERT</label>
          <div class="range-row">
            <input type="range" class="form-range" v-model.number="mentionThreshold" min="1" max="50" />
            <span class="range-value mono-text">{{ mentionThreshold }}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">NOTIFICATION EMAIL</label>
          <input class="form-input" v-model="notificationEmail" type="email" />
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-save" @click="handleSave">SAVE CHANGES</button>
      </div>
    </div>

    <!-- INTEGRATIONS TAB -->
    <div v-if="activeTab === 'integrations'" class="card-panel">
      <div class="card-header">
        <span class="card-title">PLATFORM INTEGRATIONS</span>
      </div>
      <div class="integrations-grid">
        <div class="integration-card" v-for="int in platformIntegrations" :key="int.name">
          <div class="integration-icon" :style="{ borderColor: int.color }">{{ int.initials }}</div>
          <div class="integration-details">
            <div class="integration-name">{{ int.name }}</div>
            <span class="badge" :class="int.connected ? 'badge-success' : 'badge-muted'">{{ int.connected ? 'CONNECTED' : 'DISCONNECTED' }}</span>
          </div>
          <button class="btn-connect" :class="{ connected: int.connected }" @click="int.connected = !int.connected">
            {{ int.connected ? 'DISCONNECT' : 'CONNECT' }}
          </button>
        </div>
      </div>
    </div>

    <!-- SYSTEM INFO -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">SYSTEM INFORMATION</span>
      </div>
      <div class="sysinfo-grid">
        <div class="sysinfo-item" v-for="info in systemInfo" :key="info.label">
          <div class="sysinfo-label">{{ info.label }}</div>
          <div class="sysinfo-value mono-text">{{ info.value }}</div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX INTELLIGENCE SYSTEM // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref('campaign')

const campaign = reactive({
  name: 'TYRAVEX Campaign 2026',
  candidate: 'Roberto Méndez Salazar',
  party: 'Alianza por México',
  state: 'Nacional',
  startDate: '2026-01-15',
  electionDate: '2026-06-18',
})

const alertSettings = reactive([
  { id: 1, title: 'Negative mention alerts', description: 'Notify when negative mentions are detected above threshold', enabled: true },
  { id: 2, title: 'Trending topic alerts', description: 'Notify when a related topic enters trending', enabled: true },
  { id: 3, title: 'Prediction updates', description: 'Notify when the ML model updates predictions', enabled: false },
  { id: 4, title: 'Crisis detection', description: 'Immediate alert on coordinated attacks or crisis events', enabled: true },
  { id: 5, title: 'Opposition activity', description: 'Alert on significant opposition campaign movements', enabled: true },
])

const mentionThreshold = ref(15)
const notificationEmail = ref('ops@tyravex.mx')

const platformIntegrations = reactive([
  { name: 'Twitter / X', initials: 'TX', color: '#4A90E2', connected: true },
  { name: 'Facebook', initials: 'FB', color: '#4267B2', connected: true },
  { name: 'Instagram', initials: 'IG', color: '#E1306C', connected: true },
  { name: 'TikTok', initials: 'TK', color: '#888', connected: false },
  { name: 'Google News', initials: 'GN', color: '#ff6b35', connected: true },
  { name: 'WhatsApp Business', initials: 'WA', color: '#25D366', connected: false },
])

const systemInfo = [
  { label: 'VERSION', value: 'TYRAVEX v3.2.1' },
  { label: 'ML ENGINE', value: 'v2.4 — 94.2% accuracy' },
  { label: 'DATABASE', value: 'PostgreSQL 16.1 — 847GB' },
  { label: 'API STATUS', value: 'All endpoints healthy' },
  { label: 'UPTIME', value: '99.94% (30d)' },
  { label: 'LAST DEPLOY', value: '10.FEB.2026 14:30 UTC' },
  { label: 'ENCRYPTION', value: 'AES-256-GCM + RSA-4096' },
  { label: 'LICENSE', value: 'Enterprise — Valid until 2027' },
]

const handleSave = () => {
  // Save simulation
}
</script>

<style scoped>
.settings-view { font-family: 'Montserrat', sans-serif; color: #e0e0e0; }
.view-header { margin-bottom: 24px; }
.section-tag { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #ff6b35; padding: 4px 12px; border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 2px; margin-bottom: 8px; text-transform: uppercase; }
.section-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.05em; margin: 0; }
.section-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.tabs-bar { display: flex; gap: 0; margin-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.tab-btn { font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; padding: 10px 20px; background: none; border: none; border-bottom: 2px solid transparent; color: #888; cursor: pointer; transition: all 0.15s ease; text-transform: uppercase; }
.tab-btn:hover { color: #e0e0e0; }
.tab-btn.active { color: #ff6b35; border-bottom-color: #ff6b35; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.mt-16 { margin-top: 16px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-muted { background: rgba(255, 255, 255, 0.06); color: #888; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; }
.form-input { font-family: 'Roboto Mono', monospace; font-size: 13px; padding: 10px 12px; background: rgba(15, 17, 21, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 2px; color: #e0e0e0; outline: none; transition: border-color 0.15s ease; }
.form-input:focus { border-color: #ff6b35; }
.form-section { display: flex; flex-direction: column; gap: 16px; }
.form-actions { margin-top: 20px; display: flex; justify-content: flex-end; }
.btn-save { font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; padding: 8px 24px; background: rgba(255, 107, 53, 0.15); border: 1px solid rgba(255, 107, 53, 0.4); color: #ff6b35; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; text-transform: uppercase; }
.btn-save:hover { background: rgba(255, 107, 53, 0.3); }
.toggle-list { display: flex; flex-direction: column; gap: 8px; }
.toggle-item { display: flex; align-items: center; justify-content: space-between; padding: 14px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.toggle-item:hover { background: rgba(255, 107, 53, 0.03); }
.toggle-info { flex: 1; }
.toggle-title { font-weight: 600; font-size: 13px; color: #e0e0e0; }
.toggle-desc { font-size: 11px; color: #888; margin-top: 2px; }
.toggle-switch { width: 40px; height: 22px; border-radius: 11px; background: rgba(255, 255, 255, 0.1); cursor: pointer; position: relative; transition: background 0.2s ease; flex-shrink: 0; }
.toggle-switch.on { background: rgba(0, 255, 170, 0.3); }
.toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: #888; position: absolute; top: 2px; left: 2px; transition: all 0.2s ease; }
.toggle-switch.on .toggle-knob { left: 20px; background: #00ffaa; }
.range-row { display: flex; align-items: center; gap: 12px; }
.form-range { flex: 1; accent-color: #ff6b35; }
.range-value { font-size: 16px; font-weight: 600; color: #ff6b35; min-width: 28px; text-align: center; }
.integrations-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.integration-card { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; transition: background 0.15s ease; }
.integration-card:hover { background: rgba(255, 107, 53, 0.03); }
.integration-icon { width: 36px; height: 36px; border: 2px solid; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700; background: rgba(255, 255, 255, 0.03); flex-shrink: 0; }
.integration-details { flex: 1; }
.integration-name { font-weight: 600; font-size: 13px; color: #e0e0e0; margin-bottom: 4px; }
.btn-connect { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; padding: 4px 12px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; border: 1px solid rgba(0, 255, 170, 0.4); background: rgba(0, 255, 170, 0.1); color: #00ffaa; }
.btn-connect:hover { background: rgba(0, 255, 170, 0.25); }
.btn-connect.connected { border-color: rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.05); color: #888; }
.btn-connect.connected:hover { border-color: rgba(255, 68, 68, 0.4); color: #ff4444; background: rgba(255, 68, 68, 0.1); }
.sysinfo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.sysinfo-item { padding: 12px; border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 4px; }
.sysinfo-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 4px; }
.sysinfo-value { font-size: 12px; color: #e0e0e0; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 32px; }
</style>
