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
      <h1 class="section-title">AMENAZAS EN RED</h1>
      <p class="section-subtitle">Detección y gestión de amenazas digitales en todas las plataformas</p>
    </header>

    <div class="kpi-row">
      <div class="kpi-card" v-for="k in platformKpis" :key="k.label">
        <div class="kpi-label">{{ k.label }}</div>
        <div class="kpi-value" :style="{ color: k.color }">{{ k.value }}</div>
        <div class="kpi-sub">{{ k.sub }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card-panel">
      <div class="filter-bar">
        <select v-model="filterPlataforma" class="form-select">
          <option value="">TODAS LAS PLATAFORMAS</option>
          <option v-for="p in plataformas" :key="p" :value="p">{{ p }}</option>
        </select>
        <select v-model="filterTipo" class="form-select">
          <option value="">TODOS LOS TIPOS</option>
          <option v-for="t in tipos" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
        <select v-model="filterEstado" class="form-select">
          <option value="">TODOS LOS ESTADOS</option>
          <option value="nueva">NUEVA</option>
          <option value="en_revision">EN REVISIÓN</option>
          <option value="escalada">ESCALADA</option>
          <option value="resuelta">RESUELTA</option>
        </select>
        <input v-model="searchText" class="form-input" placeholder="Buscar amenazas..." />
      </div>
    </div>

    <!-- Table -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">AMENAZAS DETECTADAS</span>
        <span class="badge badge-high">{{ filtered.length }} RESULTADOS</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th @click="sortBy('timestamp')">TIMESTAMP {{ sortIcon('timestamp') }}</th>
            <th @click="sortBy('plataforma')">PLATAFORMA {{ sortIcon('plataforma') }}</th>
            <th @click="sortBy('tipo')">TIPO {{ sortIcon('tipo') }}</th>
            <th @click="sortBy('severidad')">SEVERIDAD {{ sortIcon('severidad') }}</th>
            <th @click="sortBy('alcance')">ALCANCE {{ sortIcon('alcance') }}</th>
            <th>UBICACIÓN</th>
            <th @click="sortBy('estado')">ESTADO {{ sortIcon('estado') }}</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filtered" :key="a.id" :class="{ 'row-critical': a.severidad >= 9 }">
            <td class="mono-text">{{ a.timestamp }}</td>
            <td><span class="badge badge-info">{{ a.plataforma }}</span></td>
            <td class="type-cell">{{ getThreatTypeLabel(a.tipo) }}</td>
            <td><span class="badge" :class="'badge-' + getSeverityBadge(a.severidad)">{{ a.severidad }}/10</span></td>
            <td class="mono-text">{{ formatNumber(a.alcance) }}</td>
            <td>{{ a.ubicacion }}</td>
            <td><span class="badge" :class="'badge-' + getStatusBadge(a.estado)">{{ getThreatStatusLabel(a.estado) }}</span></td>
            <td class="actions-cell">
              <button class="btn-sm btn-view" @click="openDetail(a)">VER</button>
              <button class="btn-sm btn-escalate">ESCALAR</button>
              <button class="btn-sm btn-resolve">RESOLVER</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div v-if="selectedAmenaza" class="modal-overlay" @click.self="selectedAmenaza = null">
        <div class="modal-content">
          <div class="modal-header">
            <span class="card-title">DETALLE DE AMENAZA — {{ selectedAmenaza.id }}</span>
            <button class="btn-close" @click="selectedAmenaza = null">✕</button>
          </div>
          <div class="modal-body">
            <div class="detail-row">
              <span class="detail-label">PLATAFORMA</span>
              <span class="badge badge-info">{{ selectedAmenaza.plataforma }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">TIPO</span>
              <span class="badge" :class="'badge-' + getSeverityBadge(selectedAmenaza.severidad)">{{ getThreatTypeLabel(selectedAmenaza.tipo) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">SEVERIDAD</span>
              <span :style="{ color: getSeverityColor(selectedAmenaza.severidad), fontFamily: 'Oswald', fontSize: '24px', fontWeight: 600 }">{{ selectedAmenaza.severidad }}/10</span>
            </div>
            <div class="detail-section">
              <div class="detail-label">CONTENIDO</div>
              <p class="detail-text">{{ selectedAmenaza.contenido }}</p>
            </div>
            <div class="detail-row">
              <span class="detail-label">CUENTA ORIGEN</span>
              <span class="mono-text">{{ selectedAmenaza.cuenta_origen || 'Desconocida' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">SEGUIDORES</span>
              <span class="mono-text">{{ formatNumber(selectedAmenaza.seguidores_origen || 0) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">ALCANCE</span>
              <span class="mono-text">{{ formatNumber(selectedAmenaza.alcance) }}</span>
            </div>
            <div class="detail-section">
              <div class="detail-label">ANÁLISIS DE IA</div>
              <p class="detail-text">Amenaza clasificada como {{ getThreatTypeLabel(selectedAmenaza.tipo) }} con credibilidad {{ selectedAmenaza.severidad >= 8 ? 'ALTA' : selectedAmenaza.severidad >= 5 ? 'MEDIA' : 'BAJA' }}. Urgencia: {{ selectedAmenaza.severidad >= 8 ? 'INMEDIATA' : 'ESTÁNDAR' }}.</p>
            </div>
            <div class="detail-section">
              <div class="detail-label">ACCIÓN RECOMENDADA</div>
              <p class="detail-text" style="color: #ff6b35;">{{ selectedAmenaza.accion_recomendada }}</p>
            </div>
            <div class="detail-section">
              <div class="detail-label">AMENAZAS RELACIONADAS</div>
              <div v-for="r in relatedThreats" :key="r.id" class="related-item">
                <span class="badge" :class="'badge-' + getSeverityBadge(r.severidad)">{{ r.severidad }}</span>
                <span>{{ r.id }} — {{ getThreatTypeLabel(r.tipo) }}</span>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn-sm btn-escalate">ESCALAR A SEGURIDAD</button>
              <button class="btn-sm btn-view">REPORTAR PLATAFORMA</button>
              <button class="btn-sm btn-resolve">MARCAR RESUELTA</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Keywords Config -->
    <div class="card-panel mt-16">
      <div class="card-header">
        <span class="card-title">CONFIGURACIÓN DE KEYWORDS MONITOREADAS</span>
      </div>
      <div class="keywords-grid">
        <div v-for="cat in keywordCategories" :key="cat" class="keyword-group">
          <div class="keyword-cat-label">{{ cat }}</div>
          <div class="keyword-list">
            <div v-for="kw in keywordsByCategory(cat)" :key="kw.keyword" class="keyword-item">
              <span class="keyword-name">{{ kw.keyword }}</span>
              <span class="keyword-hits mono-text">{{ kw.hits_hoy }} hoy</span>
              <span class="keyword-trend" :style="{ color: kw.tendencia === 'aumentando' ? '#ff4444' : kw.tendencia === 'disminuyendo' ? '#00ffaa' : '#ffcc00' }">
                {{ kw.tendencia === 'aumentando' ? '▲' : kw.tendencia === 'disminuyendo' ? '▼' : '◆' }}
              </span>
              <span class="keyword-toggle" :class="{ active: kw.activa }">{{ kw.activa ? 'ON' : 'OFF' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="view-footer">TYRAVEX BLINDAJE // INTELIGENCIA DE AMENAZAS // CONFIDENTIAL // 2026</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  amenazas, keywordsMonitoreadas,
  getSeverityColor, getSeverityBadge, getThreatTypeLabel, getThreatStatusLabel, getStatusBadge,
  type Amenaza, type ThreatType,
} from '@/data/blindajeData'

const filterPlataforma = ref('')
const filterTipo = ref('')
const filterEstado = ref('')
const searchText = ref('')
const sortKey = ref<string>('severidad')
const sortDir = ref<'asc' | 'desc'>('desc')
const selectedAmenaza = ref<Amenaza | null>(null)

const plataformas = ['Twitter/X', 'Facebook', 'TikTok', 'Telegram', 'Instagram', 'YouTube', 'WhatsApp', 'Reddit', 'Deep Web']
const tipos: { value: ThreatType; label: string }[] = [
  { value: 'amenaza_directa', label: 'AMENAZA DIRECTA' },
  { value: 'coordinacion_hostil', label: 'COORDINACIÓN HOSTIL' },
  { value: 'desinformacion', label: 'DESINFORMACIÓN' },
  { value: 'discurso_odio', label: 'DISCURSO DE ODIO' },
  { value: 'doxing', label: 'DOXING' },
  { value: 'incitacion', label: 'INCITACIÓN' },
]

const platformKpis = computed(() => {
  const active = amenazas.filter(a => a.estado !== 'resuelta')
  return [
    { label: 'TOTAL AMENAZAS', value: String(amenazas.length), sub: `${active.length} activas`, color: '#ff6b35' },
    { label: 'SEVERIDAD PROMEDIO', value: (amenazas.reduce((s, a) => s + a.severidad, 0) / amenazas.length).toFixed(1), sub: 'Escala 1-10', color: '#ff4444' },
    { label: 'PLATAFORMAS AFECTADAS', value: String(new Set(amenazas.map(a => a.plataforma)).size), sub: 'De 9 monitoreadas', color: '#4A90E2' },
    { label: 'KEYWORDS ACTIVAS', value: String(keywordsMonitoreadas.filter(k => k.activa).length), sub: `${keywordsMonitoreadas.reduce((s, k) => s + k.hits_hoy, 0)} hits hoy`, color: '#ffcc00' },
  ]
})

const filtered = computed(() => {
  let list = [...amenazas]
  if (filterPlataforma.value) list = list.filter(a => a.plataforma === filterPlataforma.value)
  if (filterTipo.value) list = list.filter(a => a.tipo === filterTipo.value)
  if (filterEstado.value) list = list.filter(a => a.estado === filterEstado.value)
  if (searchText.value) {
    const q = searchText.value.toLowerCase()
    list = list.filter(a => a.contenido.toLowerCase().includes(q) || a.ubicacion.toLowerCase().includes(q) || a.id.toLowerCase().includes(q))
  }
  const key = sortKey.value as keyof Amenaza
  list.sort((a, b) => {
    const va = a[key] ?? ''
    const vb = b[key] ?? ''
    const cmp = va < vb ? -1 : va > vb ? 1 : 0
    return sortDir.value === 'desc' ? -cmp : cmp
  })
  return list
})

function sortBy(key: string) {
  if (sortKey.value === key) { sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc' }
  else { sortKey.value = key; sortDir.value = 'desc' }
}
function sortIcon(key: string): string {
  if (sortKey.value !== key) return ''
  return sortDir.value === 'desc' ? '▼' : '▲'
}
function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}
function openDetail(a: Amenaza) { selectedAmenaza.value = a }

const relatedThreats = computed(() => {
  if (!selectedAmenaza.value) return []
  const sel = selectedAmenaza.value
  return amenazas.filter(a => a.id !== sel.id && (a.tipo === sel.tipo || a.ubicacion === sel.ubicacion)).slice(0, 4)
})

const keywordCategories = computed(() => [...new Set(keywordsMonitoreadas.map(k => k.categoria))])
function keywordsByCategory(cat: string) { return keywordsMonitoreadas.filter(k => k.categoria === cat) }
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
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.kpi-card { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 16px; text-align: center; }
.kpi-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.kpi-value { font-family: 'Oswald', sans-serif; font-size: 32px; font-weight: 600; line-height: 1; }
.kpi-sub { font-family: 'Roboto Mono', monospace; font-size: 11px; color: #00ffaa; margin-top: 6px; }
.card-panel { background: rgba(20, 22, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; color: #a0a0a0; text-transform: uppercase; }
.mt-16 { margin-top: 16px; }
.filter-bar { display: flex; gap: 10px; flex-wrap: wrap; }
.form-select, .form-input { font-family: 'Roboto Mono', monospace; font-size: 11px; padding: 8px 12px; background: rgba(15,17,21,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #e0e0e0; outline: none; }
.form-select:focus, .form-input:focus { border-color: rgba(255,107,53,0.4); }
.form-input { flex: 1; min-width: 200px; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #888; text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); text-transform: uppercase; cursor: pointer; user-select: none; }
.data-table th:hover { color: #e0e0e0; }
.data-table td { font-size: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.data-table tr:hover td { background: rgba(255,107,53,0.04); }
.row-critical td { background: rgba(255,68,68,0.04); }
.type-cell { font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.08em; color: #e0e0e0; }
.actions-cell { display: flex; gap: 4px; }
.btn-sm { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; padding: 3px 8px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-view { border: 1px solid rgba(74,144,226,0.4); background: rgba(74,144,226,0.1); color: #4A90E2; }
.btn-view:hover { background: rgba(74,144,226,0.25); }
.btn-escalate { border: 1px solid rgba(255,107,53,0.4); background: rgba(255,107,53,0.1); color: #ff6b35; }
.btn-escalate:hover { background: rgba(255,107,53,0.25); }
.btn-resolve { border: 1px solid rgba(0,255,170,0.4); background: rgba(0,255,170,0.1); color: #00ffaa; }
.btn-resolve:hover { background: rgba(0,255,170,0.25); }
/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-content { background: #14161c; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; width: 600px; max-height: 80vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.btn-close { background: none; border: none; color: #888; font-size: 18px; cursor: pointer; }
.btn-close:hover { color: #e0e0e0; }
.modal-body { padding: 20px; }
.detail-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.detail-label { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
.detail-section { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.detail-text { font-size: 13px; color: #a0a0a0; line-height: 1.6; margin-top: 6px; }
.related-item { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 12px; color: #a0a0a0; }
.modal-actions { display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); }
/* Keywords */
.keywords-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.keyword-group { }
.keyword-cat-label { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: #ff6b35; margin-bottom: 8px; text-transform: uppercase; }
.keyword-list { display: flex; flex-direction: column; gap: 4px; }
.keyword-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.04); border-radius: 2px; }
.keyword-name { font-size: 12px; color: #e0e0e0; flex: 1; }
.keyword-hits { font-size: 10px; color: #888; }
.keyword-trend { font-size: 10px; }
.keyword-toggle { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 2px; background: rgba(255,68,68,0.15); color: #ff4444; }
.keyword-toggle.active { background: rgba(0,255,170,0.15); color: #00ffaa; }
.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-success { background: rgba(0, 255, 170, 0.15); color: #00ffaa; }
.badge-warning { background: rgba(255, 204, 0, 0.15); color: #ffcc00; }
.badge-danger { background: rgba(255, 68, 68, 0.15); color: #ff4444; }
.badge-info { background: rgba(74, 144, 226, 0.15); color: #4A90E2; }
.badge-high { background: rgba(255, 107, 53, 0.15); color: #ff6b35; }
.mono-text { font-family: 'Roboto Mono', monospace; }
.view-footer { text-align: center; font-family: 'Roboto Mono', monospace; font-size: 10px; color: #555; letter-spacing: 0.15em; padding: 32px 0 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 32px; }
</style>
