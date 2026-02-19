<template>
  <Teleport to="body">
    <div v-if="emergencia" class="emergency-overlay">
      <div class="emergency-banner">
        <div class="banner-pulse"></div>
        <span class="banner-icon">&#9888;</span>
        <span class="banner-text">EMERGENCIA ACTIVA</span>
        <span class="banner-type">{{ emergenciaLabel }}</span>
        <span class="banner-level">N{{ emergencia.nivel }}</span>
        <span class="banner-timer mono-text">{{ formattedElapsed }}</span>
        <button class="btn-deactivate" @click="$emit('close')">CERRAR</button>
      </div>

      <div class="emergency-panel">
        <div class="panel-header">
          <span class="panel-title">PROTOCOLO EN PROGRESO</span>
          <span class="badge badge-danger">{{ emergencia.estado.toUpperCase() }}</span>
        </div>

        <div class="panel-body">
          <!-- Affected zones -->
          <div class="section">
            <div class="section-label">ZONAS AFECTADAS ({{ emergencia.zonas_afectadas.length }})</div>
            <div v-for="zId in emergencia.zonas_afectadas" :key="zId" class="affected-item">
              <span class="affected-dot" style="background: #ff6b35;"></span>
              <span class="affected-name">{{ getZonaNombre(zId) }}</span>
            </div>
            <div v-if="emergencia.zonas_afectadas.length === 0" class="empty-text">Sin zonas afectadas</div>
          </div>

          <!-- Protocol steps -->
          <div v-if="protocolo" class="section">
            <div class="section-label">PASOS DEL PROTOCOLO ({{ completedCount }}/{{ protocolo.pasos.length }})</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPct + '%', background: progressPct >= 100 ? '#00ffaa' : '#ff6b35' }"></div>
            </div>
            <div v-for="(paso, idx) in protocolo.pasos" :key="idx" class="step-item" :class="{ 'step-done': emergencia.pasos_completados.includes(idx) }">
              <button class="step-check" @click="$emit('complete-step', idx)">
                <span v-if="emergencia.pasos_completados.includes(idx)">&#10003;</span>
              </button>
              <span class="step-text">{{ paso }}</span>
            </div>
          </div>

          <!-- Actions taken -->
          <div class="section">
            <div class="section-label">ACCIONES TOMADAS</div>
            <div v-for="(accion, i) in emergencia.acciones_tomadas" :key="i" class="action-log">{{ accion }}</div>
            <div v-if="emergencia.acciones_tomadas.length === 0" class="empty-text">Sin acciones registradas</div>
            <div class="add-action">
              <input v-model="nuevaAccion" placeholder="Agregar acción..." @keydown.enter="addAction" />
              <button @click="addAction">+</button>
            </div>
          </div>

          <!-- Notes -->
          <div class="section">
            <div class="section-label">NOTAS</div>
            <textarea v-model="notasEditable" rows="2" class="notes-area" placeholder="Notas de la emergencia..."></textarea>
          </div>

          <!-- Timer -->
          <div class="response-section">
            <div class="section-label">TIEMPO TRANSCURRIDO</div>
            <div class="response-time">
              <span class="response-value mono-text" :style="{ color: elapsed > 300 ? '#ff4444' : '#00ffaa' }">{{ formattedElapsed }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="control-btns">
            <button v-if="emergencia.estado === 'activa'" class="btn-control btn-controlled" @click="$emit('mark-controlled')">MARCAR CONTROLADA</button>
            <button class="btn-control btn-close-em" @click="$emit('close')">CERRAR EMERGENCIA</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { getEmergenciaLabel, type Emergencia, type Protocolo, type Zona } from '@/data/espaciosData'

const props = defineProps<{
  emergencia: Emergencia | null
  protocolo: Protocolo | null
  zonas: Zona[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'complete-step', stepIndex: number): void
  (e: 'add-action', action: string): void
  (e: 'mark-controlled'): void
  (e: 'update-notes', notes: string): void
}>()

const nuevaAccion = ref('')
const notasEditable = ref('')
const elapsed = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const emergenciaLabel = computed(() =>
  props.emergencia ? getEmergenciaLabel(props.emergencia.tipo) : ''
)

const completedCount = computed(() => props.emergencia?.pasos_completados.length ?? 0)
const progressPct = computed(() => {
  if (!props.protocolo) return 0
  const total = props.protocolo.pasos.length
  if (total === 0) return 100
  return Math.round((completedCount.value / total) * 100)
})

const formattedElapsed = computed(() => {
  const m = Math.floor(elapsed.value / 60)
  const s = elapsed.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function getZonaNombre(zId: string): string {
  return props.zonas.find(z => z.id === zId)?.nombre ?? zId
}

function addAction() {
  if (nuevaAccion.value.trim()) {
    emit('add-action', nuevaAccion.value.trim())
    nuevaAccion.value = ''
  }
}

watch(() => props.emergencia, (em) => {
  if (em) {
    notasEditable.value = em.notas
    const start = new Date(em.inicio).getTime()
    elapsed.value = Math.floor((Date.now() - start) / 1000)
    if (timer) clearInterval(timer)
    timer = setInterval(() => { elapsed.value++ }, 1000)
  } else {
    if (timer) { clearInterval(timer); timer = null }
    elapsed.value = 0
  }
}, { immediate: true })

watch(notasEditable, (v) => {
  if (props.emergencia) emit('update-notes', v)
})

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.emergency-overlay { position: fixed; top: 60px; right: 0; bottom: 0; width: 400px; z-index: 9990; display: flex; flex-direction: column; background: rgba(15,17,21,0.98); border-left: 2px solid #ff4444; overflow-y: auto; animation: slideIn 0.3s ease; }

.emergency-banner { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(255,68,68,0.12); border-bottom: 1px solid rgba(255,68,68,0.3); flex-wrap: wrap; position: relative; }
.banner-pulse { position: absolute; inset: 0; background: rgba(255,68,68,0.05); animation: banner-flash 2s ease-in-out infinite; pointer-events: none; }
.banner-icon { font-size: 18px; color: #ff4444; }
.banner-text { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; color: #ff4444; letter-spacing: 0.1em; }
.banner-type { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; color: #ff6b35; background: rgba(255,107,53,0.15); padding: 2px 8px; border-radius: 2px; }
.banner-level { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; color: #ff4444; }
.banner-timer { font-size: 14px; font-weight: 700; color: #ff4444; margin-left: auto; }
.btn-deactivate { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; padding: 4px 10px; background: rgba(255,68,68,0.15); border: 1px solid rgba(255,68,68,0.4); border-radius: 2px; color: #ff4444; cursor: pointer; }
.btn-deactivate:hover { background: rgba(255,68,68,0.3); }

.emergency-panel { flex: 1; }
.panel-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.panel-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.08em; }
.panel-body { padding: 16px; display: flex; flex-direction: column; gap: 16px; }

.section-label { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }

.affected-item { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.affected-dot { width: 6px; height: 6px; border-radius: 50%; }
.affected-name { font-size: 11px; color: #e0e0e0; }

.progress-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 8px; }
.progress-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }

.step-item { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03); transition: opacity 0.2s ease; }
.step-done { opacity: 0.5; }
.step-done .step-text { text-decoration: line-through; }
.step-check { width: 18px; height: 18px; min-width: 18px; border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; background: rgba(15,17,21,0.5); color: #00ffaa; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; }
.step-done .step-check { background: rgba(0,255,170,0.15); border-color: rgba(0,255,170,0.3); }
.step-text { font-size: 11px; color: #a0a0a0; line-height: 1.5; }

.action-log { font-size: 11px; color: #a0a0a0; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
.empty-text { font-size: 11px; color: #555; font-style: italic; }

.add-action { display: flex; gap: 4px; margin-top: 6px; }
.add-action input { flex: 1; font-family: 'Montserrat', sans-serif; font-size: 11px; padding: 5px 8px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #e0e0e0; outline: none; }
.add-action input:focus { border-color: rgba(255,107,53,0.3); }
.add-action button { font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; padding: 0 8px; background: rgba(255,107,53,0.12); border: 1px solid rgba(255,107,53,0.3); border-radius: 2px; color: #ff6b35; cursor: pointer; }

.notes-area { width: 100%; font-family: 'Montserrat', sans-serif; font-size: 11px; padding: 8px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; color: #e0e0e0; outline: none; resize: vertical; box-sizing: border-box; }
.notes-area:focus { border-color: rgba(255,107,53,0.3); }

.response-section { text-align: center; padding: 12px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.04); border-radius: 2px; }
.response-time { display: flex; align-items: baseline; justify-content: center; }
.response-value { font-size: 28px; font-weight: 700; }

.control-btns { display: flex; gap: 8px; }
.btn-control { flex: 1; font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 10px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-controlled { background: rgba(255,204,0,0.1); border: 1px solid rgba(255,204,0,0.3); color: #ffcc00; }
.btn-controlled:hover { background: rgba(255,204,0,0.2); }
.btn-close-em { background: rgba(0,255,170,0.08); border: 1px solid rgba(0,255,170,0.3); color: #00ffaa; }
.btn-close-em:hover { background: rgba(0,255,170,0.18); }

.badge { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-danger { background: rgba(255,68,68,0.15); color: #ff4444; }
.mono-text { font-family: 'Roboto Mono', monospace; }

@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes banner-flash { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
</style>
