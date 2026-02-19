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
      <h1 class="section-title">INFORMES DE INTELIGENCIA</h1>
      <p class="section-subtitle">Generación y gestión de reportes de amenazas e inteligencia</p>
    </header>

    <div class="grid-2col">
      <!-- Report Generator -->
      <div class="card-panel">
        <div class="card-header">
          <span class="card-title">GENERAR NUEVO INFORME</span>
        </div>

        <div class="form-group">
          <label class="form-label">TIPO DE INFORME</label>
          <div class="report-types">
            <button v-for="rt in reportTypes" :key="rt" class="report-type-btn" :class="{ active: selectedType === rt }" @click="selectedType = rt">
              {{ rt }}
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">FECHA INICIO</label>
            <input v-model="dateFrom" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">FECHA FIN</label>
            <input v-model="dateTo" class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">NIVEL DE DETALLE</label>
          <div class="detail-levels">
            <button v-for="dl in detailLevels" :key="dl" class="detail-btn" :class="{ active: selectedDetail === dl }" @click="selectedDetail = dl">
              {{ dl }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">DESTINATARIOS</label>
          <input v-model="recipients" class="form-input" placeholder="Dir. Campaña, Jefe Seguridad..." />
        </div>

        <button class="btn-generate" @click="void 0">GENERAR INFORME</button>
      </div>

      <!-- Executive Summary -->
      <div class="card-panel summary-panel">
        <div class="card-header">
          <span class="card-title">RESUMEN EJECUTIVO DEL DÍA</span>
          <span class="badge badge-high">AUTO-GENERADO</span>
        </div>

        <div class="summary-section">
          <div class="summary-label">NIVEL DE AMENAZA</div>
          <div class="summary-threat">
            <span class="summary-score" :style="{ color: scoreColor }">{{ nivelAmenazaGlobal.score }}/100</span>
            <span class="badge" :class="levelBadge">{{ nivelAmenazaGlobal.nivel.toUpperCase() }}</span>
          </div>
        </div>

        <div class="summary-section">
          <div class="summary-label">EVENTOS SIGNIFICATIVOS</div>
          <ul class="summary-list">
            <li>Amenaza directa detectada contra candidato — evento Guadalajara (SEV 9)</li>
            <li>Red de 340+ cuentas fake preparando ataque coordinado en Telegram</li>
            <li>Video deepfake alcanzó 234K views en TikTok antes de reportar</li>
            <li>Filtración de datos personales del equipo de campaña en Twitter</li>
            <li>Amenaza en deep web con detalles operativos — escalada a autoridades</li>
          </ul>
        </div>

        <div class="summary-section">
          <div class="summary-label">REGIONES DE MAYOR ACTIVIDAD</div>
          <div class="region-ranks">
            <div v-for="r in topRegions" :key="r.estado" class="region-rank">
              <span class="region-rank-name">{{ r.estado }}</span>
              <span class="region-rank-score mono-text" :style="{ color: regionScoreColor(r.score_hostilidad) }">{{ r.score_hostilidad }}</span>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <div class="summary-label">RECOMENDACIONES DEL SISTEMA</div>
          <ul class="summary-list rec-list">
            <li>Reforzar seguridad para evento en Guadalajara del 15.FEB</li>
            <li>Considerar cancelar o virtualizar recorrido en Ecatepec (riesgo 82/100)</li>
            <li>Activar protocolo anti-deepfake con material original de respuesta</li>
            <li>Revisar controles internos por filtración de agenda</li>
          </ul>
        </div>

        <div class="summary-section">
          <div class="summary-label">PRÓXIMAS 24H — QUÉ VIGILAR</div>
          <ul class="summary-list watch-list">
            <li>Posible activación de red de bots detectada en Telegram</li>
            <li>Monitorear reacciones post-debate en redes sociales</li>
            <li>Vigilar canales de deep web por amenazas operativas</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Report History -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">HISTORIAL DE INFORMES</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>FECHA</th>
            <th>TIPO</th>
            <th>GENERADO POR</th>
            <th>DESTINATARIOS</th>
            <th>DESCARGAR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inf in informesHistorial" :key="inf.id">
            <td class="mono-text">{{ inf.fecha }}</td>
            <td><span class="badge badge-info">{{ inf.tipo }}</span></td>
            <td>{{ inf.generado_por }}</td>
            <td>{{ inf.destinatarios }}</td>
            <td><button class="btn-download">↓ PDF</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="view-footer">TYRAVEX BLINDAJE // INTELIGENCIA DE AMENAZAS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  informesHistorial, nivelAmenazaGlobal, hostilidadRegiones,
} from '@/data/blindajeData'

const reportTypes = ['Resumen Diario', 'Análisis Regional', 'Tendencias Semanal', 'Brief Ejecutivo', 'Informe Técnico']
const detailLevels = ['EJECUTIVO', 'OPERATIVO', 'TÉCNICO']

const selectedType = ref('Resumen Diario')
const selectedDetail = ref('EJECUTIVO')
const dateFrom = ref('10.FEB.2026')
const dateTo = ref('11.FEB.2026')
const recipients = ref('Dir. Campaña, Jefe Seguridad')

const scoreColor = computed(() => {
  const s = nivelAmenazaGlobal.score
  if (s >= 80) return '#ff4444'
  if (s >= 60) return '#ff6b35'
  if (s >= 30) return '#ffcc00'
  return '#00ffaa'
})

const levelBadge = computed(() => {
  const n = nivelAmenazaGlobal.nivel
  if (n === 'crítico') return 'badge-danger'
  if (n === 'alto') return 'badge-high'
  if (n === 'medio') return 'badge-warning'
  return 'badge-success'
})

const topRegions = computed(() =>
  [...hostilidadRegiones].sort((a, b) => b.score_hostilidad - a.score_hostilidad).slice(0, 5)
)

function regionScoreColor(s: number): string {
  if (s >= 70) return '#ff4444'
  if (s >= 50) return '#ff6b35'
  if (s >= 30) return '#ffcc00'
  return '#00ffaa'
}
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
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.mt-16 { margin-top: 16px; }
.form-group { margin-bottom: 16px; }
.form-label { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; display: block; }
.form-input { font-family: 'Roboto Mono', monospace; font-size: 12px; width: 100%; padding: 8px 12px; background: rgba(15,17,21,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #e0e0e0; outline: none; box-sizing: border-box; }
.form-input:focus { border-color: rgba(255,107,53,0.4); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.report-types { display: flex; flex-direction: column; gap: 6px; }
.report-type-btn { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; padding: 10px 14px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #a0a0a0; cursor: pointer; text-align: left; transition: all 0.15s ease; }
.report-type-btn:hover { border-color: rgba(255,255,255,0.15); color: #e0e0e0; }
.report-type-btn.active { border-color: #ff6b35; color: #ff6b35; background: rgba(255,107,53,0.06); }
.detail-levels { display: flex; gap: 8px; }
.detail-btn { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 6px 14px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #888; cursor: pointer; transition: all 0.15s ease; }
.detail-btn:hover { border-color: rgba(255,255,255,0.2); color: #e0e0e0; }
.detail-btn.active { border-color: #ff6b35; color: #ff6b35; background: rgba(255,107,53,0.08); }
.btn-generate { font-family: 'Roboto Mono', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; padding: 10px 24px; border: 1px solid rgba(255,107,53,0.5); background: rgba(255,107,53,0.1); color: #ff6b35; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; width: 100%; margin-top: 8px; }
.btn-generate:hover { background: rgba(255,107,53,0.25); }
/* Summary Panel */
.summary-panel { border-left: 3px solid #ff6b35; }
.summary-section { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.summary-section:last-child { border-bottom: none; }
.summary-label { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
.summary-threat { display: flex; align-items: center; gap: 12px; }
.summary-score { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 600; }
.summary-list { margin: 0; padding-left: 16px; list-style: none; }
.summary-list li { font-size: 12px; color: #a0a0a0; line-height: 1.8; position: relative; padding-left: 8px; }
.summary-list li::before { content: '·'; position: absolute; left: -8px; color: #ff6b35; font-weight: 700; }
.rec-list li::before { color: #ffcc00; }
.watch-list li::before { color: #4A90E2; }
.region-ranks { display: flex; flex-direction: column; gap: 4px; }
.region-rank { display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; background: rgba(15,17,21,0.3); border-radius: 2px; }
.region-rank-name { font-size: 12px; font-weight: 600; }
.region-rank-score { font-size: 14px; font-weight: 700; }
/* Table */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); text-transform: uppercase; }
.data-table td { font-size: 13px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.data-table tr:hover td { background: rgba(255,107,53,0.04); }
.btn-download { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; padding: 4px 10px; background: rgba(74,144,226,0.1); border: 1px solid rgba(74,144,226,0.3); border-radius: 2px; color: #4A90E2; cursor: pointer; transition: all 0.15s ease; }
.btn-download:hover { background: rgba(74,144,226,0.25); }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 32px; }
</style>
