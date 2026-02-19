<template>
  <div class="zone-editor">
    <!-- Toolbar -->
    <div class="editor-toolbar">
      <div class="tool-group">
        <button class="tool-btn" :class="{ active: tool === 'select' }" @click="tool = 'select'" title="Seleccionar">&#9654;</button>
        <button class="tool-btn" :class="{ active: tool === 'zone' }" @click="tool = 'zone'" title="Dibujar Zona">&#9634;</button>
        <button class="tool-btn" :class="{ active: tool === 'point' }" @click="tool = 'point'" title="Punto Crítico">&#9679;</button>
        <button class="tool-btn" :class="{ active: tool === 'route' }" @click="startRouteTool" title="Trazar Ruta">&#10230;</button>
        <button class="tool-btn" :class="{ active: tool === 'erase' }" @click="tool = 'erase'" title="Borrar">&#10005;</button>
      </div>
      <div class="tool-group">
        <span class="level-label">NIVEL:</span>
        <button v-for="n in niveles" :key="n" class="level-btn" :class="{ active: nivelActivo === n }" @click="nivelActivo = n">
          P{{ n }}
        </button>
      </div>
      <div class="tool-group">
        <button class="tool-btn-sm" @click="zoomIn" title="Zoom +">+</button>
        <button class="tool-btn-sm" @click="zoomOut" title="Zoom -">-</button>
        <button class="tool-btn-sm" @click="zoomFit" title="Ajustar">FIT</button>
      </div>
    </div>

    <!-- SVG Canvas -->
    <div class="canvas-wrapper">
      <svg
        ref="svgEl"
        :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`"
        preserveAspectRatio="xMidYMid meet"
        class="editor-svg"
        :class="{ 'cursor-crosshair': tool === 'zone' || tool === 'point' || tool === 'route', 'cursor-pointer': tool === 'erase' }"
        @mousedown="onSvgMouseDown"
        @mousemove="onSvgMouseMove"
        @mouseup="onSvgMouseUp"
        @click.prevent="onSvgClick"
        @dblclick.prevent="onSvgDblClick"
      >
        <!-- Background -->
        <defs>
          <pattern id="editor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="800" height="600" fill="#0a0e14" />
        <rect x="0" y="0" width="800" height="600" fill="url(#editor-grid)" />

        <!-- Background image if imported -->
        <image v-if="planoImportado" :href="planoImportado" x="0" y="0" width="800" height="600" opacity="0.4" />

        <!-- Zones -->
        <g v-for="zona in zonasNivel" :key="zona.id"
          @click.stop="onZoneClick(zona)"
        >
          <rect
            :x="zona.posicion.x" :y="zona.posicion.y"
            :width="zona.posicion.ancho" :height="zona.posicion.alto"
            :fill="zonaFill(zona)" :stroke="zonaStroke(zona)"
            stroke-width="1.5"
            rx="2"
            :class="{ 'zone-selected': selectedId === zona.id }"
          />
          <text
            :x="zona.posicion.x + zona.posicion.ancho / 2"
            :y="zona.posicion.y + zona.posicion.alto / 2"
            text-anchor="middle" dominant-baseline="middle"
            class="zone-text" font-size="11"
          >{{ zona.nombre }}</text>
        </g>

        <!-- Routes -->
        <g v-for="ruta in rutasNivel" :key="ruta.id"
          @click.stop="onRouteClick(ruta)"
        >
          <polyline
            :points="rutaPuntos(ruta)"
            fill="none" :stroke="rutaColor(ruta)" stroke-width="2"
            stroke-dasharray="6,3" stroke-linecap="round"
          />
          <circle v-if="rutaEnd(ruta)"
            :cx="rutaEnd(ruta)!.x"
            :cy="rutaEnd(ruta)!.y"
            r="4" :fill="rutaColor(ruta)" opacity="0.8"
          />
          <text v-if="rutaStart(ruta)"
            :x="rutaStart(ruta)!.x" :y="rutaStart(ruta)!.y - 6"
            text-anchor="middle" class="route-text" font-size="9"
          >{{ ruta.nombre }}</text>
        </g>

        <!-- Points -->
        <g v-for="pt in puntosNivel" :key="pt.id"
          @click.stop="onPointClick(pt)"
        >
          <circle
            :cx="pt.posicion.x" :cy="pt.posicion.y" r="6"
            :fill="pt.operativo ? 'rgba(0,255,170,0.2)' : 'rgba(255,68,68,0.3)'"
            :stroke="pt.operativo ? '#00ffaa' : '#ff4444'"
            stroke-width="1.5"
          />
          <text
            :x="pt.posicion.x" :y="pt.posicion.y"
            text-anchor="middle" dominant-baseline="central"
            font-size="8" class="point-icon-text"
          >{{ ptIcon(pt.tipo) }}</text>
        </g>

        <!-- Drawing preview: zone rectangle -->
        <rect v-if="drawing && tool === 'zone'"
          :x="Math.min(drawStart.x, drawCurrent.x)"
          :y="Math.min(drawStart.y, drawCurrent.y)"
          :width="Math.abs(drawCurrent.x - drawStart.x)"
          :height="Math.abs(drawCurrent.y - drawStart.y)"
          fill="rgba(255,107,53,0.15)" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="4,2" rx="2"
        />

        <!-- Drawing preview: route polyline -->
        <g v-if="tool === 'route' && routePoints.length > 0">
          <polyline
            :points="routePreviewStr"
            fill="none" stroke="#00ffaa" stroke-width="2" stroke-dasharray="6,3" opacity="0.7"
          />
          <circle v-for="(rp, i) in routePoints" :key="i" :cx="rp.x" :cy="rp.y" r="3" fill="#00ffaa" opacity="0.8" />
        </g>
      </svg>
    </div>

    <!-- Mini-modal for zone config -->
    <div v-if="showZoneConfig" class="mini-modal">
      <div class="mini-header">CONFIGURAR ZONA</div>
      <div class="mini-body">
        <label class="field">
          <span>Nombre</span>
          <input v-model="newZone.nombre" placeholder="Nombre de la zona" />
        </label>
        <label class="field">
          <span>Tipo</span>
          <select v-model="newZone.tipo">
            <option v-for="t in tiposZona" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </label>
        <label class="field">
          <span>Capacidad</span>
          <input v-model.number="newZone.capacidad" type="number" min="0" />
        </label>
        <label class="field">
          <span>Notas</span>
          <input v-model="newZone.notas" placeholder="Notas opcionales" />
        </label>
      </div>
      <div class="mini-footer">
        <button class="btn-cancel" @click="showZoneConfig = false">CANCELAR</button>
        <button class="btn-confirm" @click="confirmZoneConfig">AGREGAR</button>
      </div>
    </div>

    <!-- Mini-modal for point config -->
    <div v-if="showPointConfig" class="mini-modal">
      <div class="mini-header">CONFIGURAR PUNTO CRÍTICO</div>
      <div class="mini-body">
        <label class="field">
          <span>Tipo</span>
          <select v-model="newPoint.tipo">
            <option v-for="t in tiposPunto" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </label>
        <label class="field">
          <span>Nombre</span>
          <input v-model="newPoint.nombre" placeholder="Nombre" />
        </label>
        <label class="field">
          <span>Operativo</span>
          <select v-model="newPoint.operativo">
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
        </label>
        <label class="field">
          <span>Notas</span>
          <input v-model="newPoint.notas" placeholder="Notas opcionales" />
        </label>
      </div>
      <div class="mini-footer">
        <button class="btn-cancel" @click="showPointConfig = false">CANCELAR</button>
        <button class="btn-confirm" @click="confirmPointConfig">AGREGAR</button>
      </div>
    </div>

    <!-- Mini-modal for route config -->
    <div v-if="showRouteConfig" class="mini-modal">
      <div class="mini-header">CONFIGURAR RUTA DE EVACUACIÓN</div>
      <div class="mini-body">
        <label class="field">
          <span>Nombre</span>
          <input v-model="newRoute.nombre" placeholder="Nombre de la ruta" />
        </label>
        <label class="field">
          <span>Capacidad (personas)</span>
          <input v-model.number="newRoute.capacidad_personas" type="number" min="0" />
        </label>
        <label class="field">
          <span>Tiempo estimado (seg)</span>
          <input v-model.number="newRoute.tiempo_estimado_seg" type="number" min="0" />
        </label>
      </div>
      <div class="mini-footer">
        <button class="btn-cancel" @click="cancelRouteConfig">CANCELAR</button>
        <button class="btn-confirm" @click="confirmRouteConfig">AGREGAR</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import {
  getZonaColor, getPuntoCriticoIcon, getRutaColor,
  TIPOS_ZONA, TIPOS_PUNTO_CRITICO,
  type Zona, type PuntoCritico, type RutaEvacuacion, type TipoZona, type TipoPuntoCritico,
} from '@/data/espaciosData'

const props = defineProps<{
  zonas: Zona[]
  puntosCriticos: PuntoCritico[]
  rutasEvacuacion: RutaEvacuacion[]
  totalNiveles: number
  planoImportado: string | null
}>()

const emit = defineEmits<{
  (e: 'add-zona', zona: Omit<Zona, 'id'>): void
  (e: 'add-punto', punto: Omit<PuntoCritico, 'id'>): void
  (e: 'add-ruta', ruta: Omit<RutaEvacuacion, 'id'>): void
  (e: 'remove-zona', zonaId: string): void
  (e: 'remove-punto', puntoId: string): void
  (e: 'remove-ruta', rutaId: string): void
}>()

type ToolType = 'select' | 'zone' | 'point' | 'route' | 'erase'
const tool = ref<ToolType>('select')
const nivelActivo = ref(1)
const selectedId = ref<string | null>(null)

const niveles = computed(() => {
  const n = props.totalNiveles || 1
  return Array.from({ length: n }, (_, i) => i + 1)
})

// Zoom / pan
const viewBox = reactive({ x: 0, y: 0, w: 800, h: 600 })
function zoomIn() { viewBox.w *= 0.8; viewBox.h *= 0.8 }
function zoomOut() { viewBox.w = Math.min(viewBox.w * 1.25, 800); viewBox.h = Math.min(viewBox.h * 1.25, 600) }
function zoomFit() { viewBox.x = 0; viewBox.y = 0; viewBox.w = 800; viewBox.h = 600 }

// Filtered by level
const zonasNivel = computed(() => props.zonas.filter(z => z.nivel === nivelActivo.value))
const puntosNivel = computed(() => props.puntosCriticos.filter(p => p.nivel === nivelActivo.value))
const rutasNivel = computed(() => props.rutasEvacuacion.filter(r => r.nivel === nivelActivo.value))

const tiposZona = TIPOS_ZONA
const tiposPunto = TIPOS_PUNTO_CRITICO

// ── SVG coordinate conversion ──────────────

const svgEl = ref<SVGSVGElement | null>(null)

function svgCoords(e: MouseEvent): { x: number; y: number } {
  if (!svgEl.value) return { x: 0, y: 0 }
  const rect = svgEl.value.getBoundingClientRect()
  const scaleX = viewBox.w / rect.width
  const scaleY = viewBox.h / rect.height
  return {
    x: Math.round((e.clientX - rect.left) * scaleX + viewBox.x),
    y: Math.round((e.clientY - rect.top) * scaleY + viewBox.y),
  }
}

// ── Drawing state ──────────────────────────

const drawing = ref(false)
const drawStart = reactive({ x: 0, y: 0 })
const drawCurrent = reactive({ x: 0, y: 0 })

// ── Zone config modal ──────────────────────

const showZoneConfig = ref(false)
const newZone = reactive({
  nombre: '', tipo: 'sala' as TipoZona, capacidad: 100, notas: '',
  posX: 0, posY: 0, posW: 0, posH: 0,
})

function confirmZoneConfig() {
  emit('add-zona', {
    nombre: newZone.nombre || 'Zona sin nombre',
    tipo: newZone.tipo,
    nivel: nivelActivo.value,
    posicion: { x: newZone.posX, y: newZone.posY, ancho: newZone.posW, alto: newZone.posH },
    capacidad: newZone.capacidad,
    salidas_emergencia: 0,
    estado: 'normal',
    personal_asignado: 0,
    notas: newZone.notas,
  })
  showZoneConfig.value = false
}

// ── Point config modal ─────────────────────

const showPointConfig = ref(false)
const newPoint = reactive({
  tipo: 'extinguidor' as TipoPuntoCritico, nombre: '', operativo: true, notas: '',
  px: 0, py: 0,
})

function confirmPointConfig() {
  emit('add-punto', {
    tipo: newPoint.tipo,
    nombre: newPoint.nombre || 'Punto',
    zona_id: null,
    nivel: nivelActivo.value,
    posicion: { x: newPoint.px, y: newPoint.py, ancho: 12, alto: 12 },
    operativo: newPoint.operativo,
    ultima_revision: null,
    notas: newPoint.notas,
  })
  showPointConfig.value = false
}

// ── Route tracing ──────────────────────────

const routePoints = ref<{ x: number; y: number }[]>([])
const showRouteConfig = ref(false)
const newRoute = reactive({ nombre: '', capacidad_personas: 200, tiempo_estimado_seg: 120 })

const routePreviewStr = computed(() =>
  routePoints.value.map(p => `${p.x},${p.y}`).join(' ')
)

function startRouteTool() {
  tool.value = 'route'
  routePoints.value = []
}

function confirmRouteConfig() {
  emit('add-ruta', {
    nombre: newRoute.nombre || 'Ruta',
    nivel: nivelActivo.value,
    puntos: [...routePoints.value],
    estado: 'disponible',
    capacidad_personas: newRoute.capacidad_personas,
    tiempo_estimado_seg: newRoute.tiempo_estimado_seg,
    notas: '',
  })
  routePoints.value = []
  showRouteConfig.value = false
}

function cancelRouteConfig() {
  routePoints.value = []
  showRouteConfig.value = false
}

// ── SVG Event Handlers ─────────────────────

function onSvgMouseDown(e: MouseEvent) {
  if (tool.value === 'zone') {
    const c = svgCoords(e)
    drawStart.x = c.x; drawStart.y = c.y
    drawCurrent.x = c.x; drawCurrent.y = c.y
    drawing.value = true
  }
}

function onSvgMouseMove(e: MouseEvent) {
  if (drawing.value && tool.value === 'zone') {
    const c = svgCoords(e)
    drawCurrent.x = c.x; drawCurrent.y = c.y
  }
}

function onSvgMouseUp() {
  if (drawing.value && tool.value === 'zone') {
    drawing.value = false
    const x = Math.min(drawStart.x, drawCurrent.x)
    const y = Math.min(drawStart.y, drawCurrent.y)
    const w = Math.abs(drawCurrent.x - drawStart.x)
    const h = Math.abs(drawCurrent.y - drawStart.y)
    if (w > 10 && h > 10) {
      newZone.posX = x; newZone.posY = y; newZone.posW = w; newZone.posH = h
      newZone.nombre = ''; newZone.tipo = 'sala'; newZone.capacidad = 100; newZone.notas = ''
      showZoneConfig.value = true
    }
  }
}

function onSvgClick(e: MouseEvent) {
  if (tool.value === 'point') {
    const c = svgCoords(e)
    newPoint.px = c.x; newPoint.py = c.y
    newPoint.nombre = ''; newPoint.tipo = 'extinguidor'; newPoint.operativo = true; newPoint.notas = ''
    showPointConfig.value = true
  } else if (tool.value === 'route') {
    const c = svgCoords(e)
    routePoints.value.push({ x: c.x, y: c.y })
  }
}

function onSvgDblClick() {
  if (tool.value === 'route' && routePoints.value.length >= 2) {
    newRoute.nombre = ''; newRoute.capacidad_personas = 200; newRoute.tiempo_estimado_seg = 120
    showRouteConfig.value = true
  }
}

// ── Element click handlers ─────────────────

function onZoneClick(zona: Zona) {
  if (tool.value === 'erase') {
    emit('remove-zona', zona.id)
  } else if (tool.value === 'select') {
    selectedId.value = selectedId.value === zona.id ? null : zona.id
  }
}

function onPointClick(pt: PuntoCritico) {
  if (tool.value === 'erase') emit('remove-punto', pt.id)
}

function onRouteClick(ruta: RutaEvacuacion) {
  if (tool.value === 'erase') emit('remove-ruta', ruta.id)
}

// ── Render helpers ─────────────────────────

function zonaFill(z: Zona): string {
  return z.color_custom ? z.color_custom + '40' : getZonaColor(z.tipo).fill
}
function zonaStroke(z: Zona): string {
  return z.color_custom || getZonaColor(z.tipo).stroke
}
function ptIcon(tipo: TipoPuntoCritico): string {
  return getPuntoCriticoIcon(tipo)
}
function rutaPuntos(r: RutaEvacuacion): string {
  return r.puntos.map(p => `${p.x},${p.y}`).join(' ')
}
function rutaColor(r: RutaEvacuacion): string {
  return getRutaColor(r.estado)
}
function rutaStart(r: RutaEvacuacion): { x: number; y: number } | undefined {
  return r.puntos[0]
}
function rutaEnd(r: RutaEvacuacion): { x: number; y: number } | undefined {
  return r.puntos[r.puntos.length - 1]
}
</script>

<style scoped>
.zone-editor { position: relative; display: flex; flex-direction: column; gap: 8px; }

.editor-toolbar { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 8px 12px; background: rgba(15,17,21,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; }
.tool-group { display: flex; align-items: center; gap: 4px; }
.tool-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #888; cursor: pointer; transition: all 0.15s ease; }
.tool-btn:hover { background: rgba(255,255,255,0.08); color: #e0e0e0; }
.tool-btn.active { background: rgba(255,107,53,0.15); border-color: rgba(255,107,53,0.4); color: #ff6b35; }
.tool-btn-sm { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #888; cursor: pointer; }
.tool-btn-sm:hover { color: #e0e0e0; background: rgba(255,255,255,0.08); }
.level-label { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; color: #666; letter-spacing: 0.1em; margin-right: 4px; }
.level-btn { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 4px 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #888; cursor: pointer; }
.level-btn.active { background: rgba(255,107,53,0.12); border-color: rgba(255,107,53,0.3); color: #ff6b35; }

.canvas-wrapper { width: 100%; aspect-ratio: 4/3; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; background: #0a0e14; }
.editor-svg { width: 100%; height: 100%; display: block; user-select: none; }
.cursor-crosshair { cursor: crosshair; }
.cursor-pointer { cursor: pointer; }

.zone-text { fill: #e0e0e0; font-family: 'Montserrat', sans-serif; font-weight: 600; pointer-events: none; }
.zone-selected { stroke-dasharray: 4,2; stroke-width: 2.5; }
.route-text { fill: #a0a0a0; font-family: 'Roboto Mono', monospace; pointer-events: none; }
.point-icon-text { pointer-events: none; }

/* Mini-modals */
.mini-modal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #14161c; border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; width: 320px; z-index: 100; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
.mini-header { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: #e0e0e0; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.mini-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
.mini-footer { display: flex; justify-content: flex-end; gap: 8px; padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.06); }

.field { display: flex; flex-direction: column; gap: 3px; }
.field span { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
.field input, .field select { font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 6px 10px; background: rgba(15,17,21,0.8); border: 1px solid rgba(255,255,255,0.12); border-radius: 2px; color: #e0e0e0; outline: none; }
.field input:focus, .field select:focus { border-color: rgba(255,107,53,0.4); }

.btn-cancel { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 6px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #888; cursor: pointer; }
.btn-confirm { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 6px 12px; background: rgba(255,107,53,0.15); border: 1px solid rgba(255,107,53,0.3); border-radius: 2px; color: #ff6b35; cursor: pointer; }
.btn-cancel:hover { color: #e0e0e0; background: rgba(255,255,255,0.08); }
.btn-confirm:hover { background: rgba(255,107,53,0.25); }
</style>
