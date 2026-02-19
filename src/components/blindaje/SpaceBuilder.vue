<template>
  <Teleport to="body">
    <div class="builder-overlay" @click.self="$emit('close')">
      <div class="builder-modal">
        <!-- Header -->
        <div class="builder-header">
          <span class="builder-title">{{ editing ? 'EDITAR ESPACIO' : 'CREAR ESPACIO' }}</span>
          <div class="step-indicators">
            <span v-for="s in 4" :key="s" class="step-dot" :class="{ active: step >= s, current: step === s }">{{ s }}</span>
          </div>
          <button class="btn-close" @click="$emit('close')">&#10005;</button>
        </div>

        <!-- Step 1: Basic Info -->
        <div v-if="step === 1" class="builder-body">
          <div class="step-title">INFORMACIÓN BÁSICA</div>
          <div class="form-grid">
            <label class="field full">
              <span>Nombre del espacio *</span>
              <input v-model="form.nombre" placeholder="Ej: Auditorio Municipal" />
            </label>
            <label class="field">
              <span>Tipo</span>
              <select v-model="form.tipo">
                <option v-for="t in tiposEspacio" :key="t.value" :value="t.value">{{ t.label }}</option>
              </select>
            </label>
            <label class="field">
              <span>Capacidad total</span>
              <input v-model.number="form.capacidad_total" type="number" min="0" />
            </label>
            <label class="field full">
              <span>Descripción</span>
              <textarea v-model="form.descripcion" rows="2" placeholder="Descripción del espacio..."></textarea>
            </label>
            <label class="field full">
              <span>Dirección</span>
              <input v-model="form.direccion" placeholder="Dirección completa" />
            </label>
            <label class="field">
              <span>Estado de México</span>
              <select v-model="form.estado_mx">
                <option value="">Seleccionar...</option>
                <option v-for="est in estadosMx" :key="est" :value="est">{{ est }}</option>
              </select>
            </label>
            <label class="field">
              <span>Ciudad</span>
              <input v-model="form.ciudad" placeholder="Ciudad" />
            </label>
            <label class="field">
              <span>Número de niveles/pisos</span>
              <input v-model.number="form.niveles" type="number" min="1" max="20" />
            </label>
            <label class="field full">
              <span>Notas generales</span>
              <textarea v-model="form.notas" rows="2" placeholder="Notas..."></textarea>
            </label>
          </div>
        </div>

        <!-- Step 2: Floor Plan -->
        <div v-if="step === 2" class="builder-body">
          <div class="step-title">PLANO DEL ESPACIO</div>
          <div class="plan-options">
            <label class="plan-option" :class="{ active: planMode === 'draw' }">
              <input type="radio" v-model="planMode" value="draw" />
              <span class="option-title">DIBUJAR PLANO</span>
              <span class="option-desc">Canvas interactivo para trazar zonas, puntos y rutas</span>
            </label>
            <label class="plan-option" :class="{ active: planMode === 'import' }">
              <input type="radio" v-model="planMode" value="import" />
              <span class="option-title">IMPORTAR IMAGEN</span>
              <span class="option-desc">Usar una imagen como fondo del plano</span>
            </label>
            <label class="plan-option" :class="{ active: planMode === 'skip' }">
              <input type="radio" v-model="planMode" value="skip" />
              <span class="option-title">SOLO INFORMACIÓN</span>
              <span class="option-desc">Sin plano visual, configurar datos manualmente</span>
            </label>
          </div>

          <!-- Image import -->
          <div v-if="planMode === 'import'" class="import-section">
            <div class="drop-zone" @dragover.prevent @drop.prevent="onImageDrop">
              <div v-if="!form.plano_importado" class="drop-content">
                <span class="drop-icon">&#128193;</span>
                <span class="drop-text">Arrastra imagen aquí o</span>
                <label class="drop-btn">
                  SELECCIONAR ARCHIVO
                  <input type="file" accept="image/*" @change="onImageSelect" style="display: none;" />
                </label>
                <span class="drop-hint">JPG, PNG, SVG</span>
              </div>
              <div v-else class="drop-preview">
                <img :src="form.plano_importado" alt="Plano" />
                <button class="btn-remove-img" @click="form.plano_importado = null">&#10005; Quitar imagen</button>
              </div>
            </div>
          </div>

          <!-- Zone Editor -->
          <div v-if="planMode === 'draw' || (planMode === 'import' && form.plano_importado)">
            <ZoneEditor
              :zonas="form.zonas"
              :puntos-criticos="form.puntos_criticos"
              :rutas-evacuacion="form.rutas_evacuacion"
              :total-niveles="form.niveles"
              :plano-importado="form.plano_importado"
              @add-zona="onAddZona"
              @add-punto="onAddPunto"
              @add-ruta="onAddRuta"
              @remove-zona="onRemoveZona"
              @remove-punto="onRemovePunto"
              @remove-ruta="onRemoveRuta"
            />
          </div>

          <!-- Summary if skip -->
          <div v-if="planMode === 'skip'" class="skip-info">
            <p>Podrás agregar zonas, puntos críticos y rutas desde las pestañas del panel principal después de guardar.</p>
          </div>
        </div>

        <!-- Step 3: Protocols -->
        <div v-if="step === 3" class="builder-body">
          <div class="step-title">PROTOCOLOS DE EMERGENCIA</div>
          <div class="protocols-list">
            <div v-for="tipo in tiposEmergencia" :key="tipo.value" class="protocol-toggle">
              <label class="protocol-check">
                <input type="checkbox" :checked="isProtocolEnabled(tipo.value)" @change="toggleProtocol(tipo.value)" />
                <span class="protocol-name" :style="{ color: tipo.color }">{{ tipo.label }}</span>
              </label>
              <div v-if="isProtocolEnabled(tipo.value)" class="protocol-config">
                <label class="field">
                  <span>Responsable</span>
                  <input :value="getProtocol(tipo.value)?.responsable" @input="updateProtocolField(tipo.value, 'responsable', ($event.target as HTMLInputElement).value)" placeholder="Nombre del responsable" />
                </label>
                <label class="field">
                  <span>Tiempo estimado (min)</span>
                  <input type="number" min="1" :value="getProtocol(tipo.value)?.tiempo_estimado_min" @input="updateProtocolField(tipo.value, 'tiempo_estimado_min', Number(($event.target as HTMLInputElement).value))" />
                </label>
                <div class="field">
                  <span>Pasos del protocolo</span>
                  <div class="steps-list">
                    <div v-for="(paso, idx) in getProtocol(tipo.value)?.pasos || []" :key="idx" class="step-row">
                      <span class="step-num">{{ idx + 1 }}.</span>
                      <input :value="paso" @input="updateProtocolStep(tipo.value, idx, ($event.target as HTMLInputElement).value)" />
                      <button class="btn-remove-step" @click="removeProtocolStep(tipo.value, idx)">&#10005;</button>
                    </div>
                    <button class="btn-add-step" @click="addProtocolStep(tipo.value)">+ Agregar paso</button>
                  </div>
                </div>
                <label class="field">
                  <span>Recursos necesarios (separados por coma)</span>
                  <input :value="(getProtocol(tipo.value)?.recursos_necesarios || []).join(', ')" @input="updateProtocolResources(tipo.value, ($event.target as HTMLInputElement).value)" placeholder="Ej: Extintores, Ambulancia, Radio" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Review -->
        <div v-if="step === 4" class="builder-body">
          <div class="step-title">REVISIÓN Y GUARDAR</div>
          <div class="review-section">
            <div class="review-block">
              <div class="review-label">INFORMACIÓN BÁSICA</div>
              <div class="review-row"><span>Nombre:</span><strong>{{ form.nombre || '(sin nombre)' }}</strong></div>
              <div class="review-row"><span>Tipo:</span><span>{{ tipoLabel }}</span></div>
              <div class="review-row"><span>Ubicación:</span><span>{{ form.ciudad }}, {{ form.estado_mx }}</span></div>
              <div class="review-row"><span>Capacidad:</span><span class="mono-text">{{ form.capacidad_total }}</span></div>
              <div class="review-row"><span>Niveles:</span><span class="mono-text">{{ form.niveles }}</span></div>
            </div>
            <div class="review-block">
              <div class="review-label">ELEMENTOS CONFIGURADOS</div>
              <div class="review-row"><span>Zonas:</span><span class="mono-text">{{ form.zonas.length }}</span></div>
              <div class="review-row"><span>Puntos críticos:</span><span class="mono-text">{{ form.puntos_criticos.length }}</span></div>
              <div class="review-row"><span>Rutas evacuación:</span><span class="mono-text">{{ form.rutas_evacuacion.length }}</span></div>
              <div class="review-row"><span>Protocolos:</span><span class="mono-text">{{ form.protocolos.length }}</span></div>
            </div>
            <div v-if="form.plano_importado" class="review-block">
              <div class="review-label">PLANO</div>
              <img :src="form.plano_importado" alt="Preview" class="review-plan-preview" />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="builder-footer">
          <button v-if="step > 1" class="btn-nav btn-prev" @click="step--">&#8592; ANTERIOR</button>
          <div class="footer-spacer"></div>
          <button v-if="step < 4" class="btn-nav btn-next" @click="step++">SIGUIENTE &#8594;</button>
          <button v-else class="btn-nav btn-save" @click="save" :disabled="!form.nombre">&#10003; GUARDAR ESPACIO</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  ESTADOS_MEXICO, TIPOS_ESPACIO, TIPOS_EMERGENCIA,
  generateId, getTipoEspacioLabel,
  type TipoEspacio, type TipoEmergencia, type Zona, type PuntoCritico,
  type RutaEvacuacion, type Protocolo, type Espacio,
} from '@/data/espaciosData'
import ZoneEditor from './ZoneEditor.vue'

const props = defineProps<{
  editingEspacio?: Espacio | null
}>()

const emit = defineEmits<{
  (e: 'save', data: Omit<Espacio, 'id' | 'fecha_creacion' | 'ultima_modificacion' | 'estado'>): void
  (e: 'update', id: string, data: Partial<Espacio>): void
  (e: 'close'): void
}>()

const editing = computed(() => !!props.editingEspacio)
const step = ref(1)
const planMode = ref<'draw' | 'import' | 'skip'>('draw')

const form = reactive({
  nombre: props.editingEspacio?.nombre ?? '',
  tipo: (props.editingEspacio?.tipo ?? 'edificio') as TipoEspacio,
  descripcion: props.editingEspacio?.descripcion ?? '',
  direccion: props.editingEspacio?.direccion ?? '',
  estado_mx: props.editingEspacio?.estado_mx ?? '',
  ciudad: props.editingEspacio?.ciudad ?? '',
  capacidad_total: props.editingEspacio?.capacidad_total ?? 500,
  niveles: props.editingEspacio?.niveles ?? 1,
  notas: props.editingEspacio?.notas ?? '',
  zonas: [...(props.editingEspacio?.zonas ?? [])] as Zona[],
  puntos_criticos: [...(props.editingEspacio?.puntos_criticos ?? [])] as PuntoCritico[],
  rutas_evacuacion: [...(props.editingEspacio?.rutas_evacuacion ?? [])] as RutaEvacuacion[],
  protocolos: [...(props.editingEspacio?.protocolos ?? [])] as Protocolo[],
  plano_importado: props.editingEspacio?.plano_importado ?? null as string | null,
})

const tiposEspacio = TIPOS_ESPACIO
const estadosMx = ESTADOS_MEXICO
const tiposEmergencia = TIPOS_EMERGENCIA
const tipoLabel = computed(() => getTipoEspacioLabel(form.tipo))

// ── Zone Editor handlers ────────────────────

function onAddZona(zona: Omit<Zona, 'id'>) {
  form.zonas.push({ ...zona, id: generateId('Z') })
}
function onAddPunto(punto: Omit<PuntoCritico, 'id'>) {
  form.puntos_criticos.push({ ...punto, id: generateId('PC') })
}
function onAddRuta(ruta: Omit<RutaEvacuacion, 'id'>) {
  form.rutas_evacuacion.push({ ...ruta, id: generateId('RE') })
}
function onRemoveZona(id: string) {
  form.zonas = form.zonas.filter(z => z.id !== id)
}
function onRemovePunto(id: string) {
  form.puntos_criticos = form.puntos_criticos.filter(p => p.id !== id)
}
function onRemoveRuta(id: string) {
  form.rutas_evacuacion = form.rutas_evacuacion.filter(r => r.id !== id)
}

// ── Image import ────────────────────────────

function onImageSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) readImage(input.files[0])
}

function onImageDrop(e: DragEvent) {
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) readImage(file)
}

function readImage(file: File) {
  const reader = new FileReader()
  reader.onload = () => { form.plano_importado = reader.result as string }
  reader.readAsDataURL(file)
}

// ── Protocol handlers ───────────────────────

function isProtocolEnabled(tipo: TipoEmergencia): boolean {
  return form.protocolos.some(p => p.tipo === tipo)
}

function getProtocol(tipo: TipoEmergencia): Protocolo | undefined {
  return form.protocolos.find(p => p.tipo === tipo)
}

function toggleProtocol(tipo: TipoEmergencia) {
  const idx = form.protocolos.findIndex(p => p.tipo === tipo)
  if (idx >= 0) {
    form.protocolos.splice(idx, 1)
  } else {
    form.protocolos.push({
      id: generateId('PR'),
      tipo,
      pasos: ['Evaluar situación', 'Notificar a responsable', 'Ejecutar medidas'],
      responsable: '',
      tiempo_estimado_min: 10,
      recursos_necesarios: [],
    })
  }
}

function updateProtocolField(tipo: TipoEmergencia, field: string, value: string | number) {
  const prot = getProtocol(tipo)
  if (prot) (prot as Record<string, unknown>)[field] = value
}

function addProtocolStep(tipo: TipoEmergencia) {
  const prot = getProtocol(tipo)
  if (prot) prot.pasos.push('')
}

function removeProtocolStep(tipo: TipoEmergencia, idx: number) {
  const prot = getProtocol(tipo)
  if (prot) prot.pasos.splice(idx, 1)
}

function updateProtocolStep(tipo: TipoEmergencia, idx: number, value: string) {
  const prot = getProtocol(tipo)
  if (prot) prot.pasos[idx] = value
}

function updateProtocolResources(tipo: TipoEmergencia, value: string) {
  const prot = getProtocol(tipo)
  if (prot) prot.recursos_necesarios = value.split(',').map(s => s.trim()).filter(Boolean)
}

// ── Save ────────────────────────────────────

function save() {
  if (!form.nombre) return
  if (editing.value && props.editingEspacio) {
    emit('update', props.editingEspacio.id, {
      nombre: form.nombre,
      tipo: form.tipo,
      descripcion: form.descripcion,
      direccion: form.direccion,
      estado_mx: form.estado_mx,
      ciudad: form.ciudad,
      capacidad_total: form.capacidad_total,
      niveles: form.niveles,
      notas: form.notas,
      zonas: form.zonas,
      puntos_criticos: form.puntos_criticos,
      rutas_evacuacion: form.rutas_evacuacion,
      protocolos: form.protocolos,
      plano_importado: form.plano_importado,
    })
  } else {
    emit('save', {
      nombre: form.nombre,
      tipo: form.tipo,
      descripcion: form.descripcion,
      direccion: form.direccion,
      estado_mx: form.estado_mx,
      ciudad: form.ciudad,
      capacidad_total: form.capacidad_total,
      niveles: form.niveles,
      notas: form.notas,
      zonas: form.zonas,
      puntos_criticos: form.puntos_criticos,
      rutas_evacuacion: form.rutas_evacuacion,
      protocolos: form.protocolos,
      plano_importado: form.plano_importado,
    })
  }
}
</script>

<style scoped>
.builder-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.builder-modal { background: #14161c; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; width: 80vw; max-width: 1000px; max-height: 85vh; display: flex; flex-direction: column; }

.builder-header { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.builder-title { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.08em; }
.step-indicators { display: flex; gap: 6px; margin-left: auto; }
.step-dot { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #666; transition: all 0.2s ease; }
.step-dot.active { background: rgba(255,107,53,0.15); border-color: rgba(255,107,53,0.3); color: #ff6b35; }
.step-dot.current { background: rgba(255,107,53,0.3); border-color: #ff6b35; color: #ff6b35; box-shadow: 0 0 8px rgba(255,107,53,0.2); }
.btn-close { background: none; border: none; color: #888; font-size: 18px; cursor: pointer; margin-left: 8px; }
.btn-close:hover { color: #e0e0e0; }

.builder-body { flex: 1; overflow-y: auto; padding: 20px; }
.step-title { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.1em; margin-bottom: 16px; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 3px; }
.field.full { grid-column: 1 / -1; }
.field span { font-family: 'Roboto Mono', monospace; font-size: 9px; font-weight: 600; color: #888; letter-spacing: 0.1em; text-transform: uppercase; }
.field input, .field select, .field textarea { font-family: 'Montserrat', sans-serif; font-size: 12px; padding: 8px 10px; background: rgba(15,17,21,0.8); border: 1px solid rgba(255,255,255,0.12); border-radius: 2px; color: #e0e0e0; outline: none; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: rgba(255,107,53,0.4); }
.field textarea { resize: vertical; }

/* Plan options */
.plan-options { display: flex; gap: 10px; margin-bottom: 16px; }
.plan-option { flex: 1; padding: 12px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; cursor: pointer; transition: all 0.15s ease; display: flex; flex-direction: column; gap: 4px; }
.plan-option:hover { border-color: rgba(255,255,255,0.2); }
.plan-option.active { border-color: rgba(255,107,53,0.4); background: rgba(255,107,53,0.05); }
.plan-option input[type="radio"] { display: none; }
.option-title { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; color: #e0e0e0; letter-spacing: 0.08em; }
.option-desc { font-size: 10px; color: #888; }

/* Image import */
.import-section { margin-bottom: 16px; }
.drop-zone { border: 2px dashed rgba(255,255,255,0.1); border-radius: 4px; padding: 24px; text-align: center; min-height: 120px; display: flex; align-items: center; justify-content: center; }
.drop-content { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.drop-icon { font-size: 32px; opacity: 0.4; }
.drop-text { font-size: 12px; color: #888; }
.drop-btn { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; padding: 6px 14px; background: rgba(255,107,53,0.12); border: 1px solid rgba(255,107,53,0.3); border-radius: 2px; color: #ff6b35; cursor: pointer; }
.drop-hint { font-family: 'Roboto Mono', monospace; font-size: 9px; color: #666; }
.drop-preview { position: relative; }
.drop-preview img { max-width: 100%; max-height: 200px; border-radius: 2px; opacity: 0.6; }
.btn-remove-img { position: absolute; top: 8px; right: 8px; font-family: 'Roboto Mono', monospace; font-size: 9px; padding: 4px 8px; background: rgba(255,68,68,0.3); border: 1px solid rgba(255,68,68,0.5); border-radius: 2px; color: #ff4444; cursor: pointer; }

.skip-info { padding: 20px; text-align: center; }
.skip-info p { font-size: 12px; color: #888; }

/* Protocols */
.protocols-list { display: flex; flex-direction: column; gap: 12px; }
.protocol-toggle { background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 12px; }
.protocol-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.protocol-check input[type="checkbox"] { appearance: none; width: 14px; height: 14px; border: 1px solid rgba(255,255,255,0.2); border-radius: 2px; background: rgba(15,17,21,0.5); cursor: pointer; position: relative; }
.protocol-check input[type="checkbox"]:checked { background: rgba(255,107,53,0.3); border-color: #ff6b35; }
.protocol-check input[type="checkbox"]:checked::after { content: ''; position: absolute; top: 1px; left: 4px; width: 4px; height: 8px; border: solid #ff6b35; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.protocol-name { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; }
.protocol-config { margin-top: 12px; display: flex; flex-direction: column; gap: 10px; padding-left: 22px; }

.steps-list { display: flex; flex-direction: column; gap: 4px; }
.step-row { display: flex; align-items: center; gap: 6px; }
.step-num { font-family: 'Roboto Mono', monospace; font-size: 10px; color: #ff6b35; font-weight: 700; min-width: 16px; }
.step-row input { flex: 1; font-family: 'Montserrat', sans-serif; font-size: 11px; padding: 5px 8px; background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px; color: #e0e0e0; outline: none; }
.step-row input:focus { border-color: rgba(255,107,53,0.3); }
.btn-remove-step { background: none; border: none; color: #ff4444; font-size: 12px; cursor: pointer; padding: 2px; opacity: 0.5; }
.btn-remove-step:hover { opacity: 1; }
.btn-add-step { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 600; color: #ff6b35; background: none; border: 1px dashed rgba(255,107,53,0.3); border-radius: 2px; padding: 4px 10px; cursor: pointer; align-self: flex-start; }
.btn-add-step:hover { background: rgba(255,107,53,0.08); }

/* Review */
.review-section { display: flex; flex-direction: column; gap: 16px; }
.review-block { background: rgba(15,17,21,0.5); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 14px; }
.review-label { font-family: 'Roboto Mono', monospace; font-size: 10px; font-weight: 700; color: #888; letter-spacing: 0.1em; margin-bottom: 8px; text-transform: uppercase; }
.review-row { display: flex; justify-content: space-between; padding: 3px 0; font-size: 12px; color: #a0a0a0; }
.review-row strong { color: #e0e0e0; }
.review-plan-preview { max-width: 100%; max-height: 200px; border-radius: 2px; opacity: 0.6; }

/* Footer */
.builder-footer { display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.08); }
.footer-spacer { flex: 1; }
.btn-nav { font-family: 'Roboto Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; padding: 8px 18px; border-radius: 2px; cursor: pointer; transition: all 0.15s ease; }
.btn-prev { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #888; }
.btn-prev:hover { color: #e0e0e0; background: rgba(255,255,255,0.08); }
.btn-next { background: rgba(255,107,53,0.12); border: 1px solid rgba(255,107,53,0.3); color: #ff6b35; }
.btn-next:hover { background: rgba(255,107,53,0.22); }
.btn-save { background: rgba(0,255,170,0.1); border: 1px solid rgba(0,255,170,0.3); color: #00ffaa; }
.btn-save:hover { background: rgba(0,255,170,0.2); }
.btn-save:disabled { opacity: 0.4; cursor: not-allowed; }

.mono-text { font-family: 'Roboto Mono', monospace; }
</style>
