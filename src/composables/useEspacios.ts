import { ref, watch, computed } from 'vue'
import {
  generateId,
  type Espacio, type Emergencia, type Zona, type PuntoCritico,
  type RutaEvacuacion, type Protocolo, type TipoEmergencia, type EstadoEspacio,
} from '@/data/espaciosData'

const STORAGE_KEY = 'tyravex_espacios'
const EMERGENCIAS_KEY = 'tyravex_emergencias'

// ── Singleton reactive state ─────────────────

const espacios = ref<Espacio[]>([])
const emergencias = ref<Emergencia[]>([])
let initialized = false

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) espacios.value = JSON.parse(raw)
  } catch { espacios.value = [] }
  try {
    const raw = localStorage.getItem(EMERGENCIAS_KEY)
    if (raw) emergencias.value = JSON.parse(raw)
  } catch { emergencias.value = [] }
}

function persistEspacios() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(espacios.value))
}

function persistEmergencias() {
  localStorage.setItem(EMERGENCIAS_KEY, JSON.stringify(emergencias.value))
}

function init() {
  if (initialized) return
  initialized = true
  loadFromStorage()
  watch(espacios, persistEspacios, { deep: true })
  watch(emergencias, persistEmergencias, { deep: true })
}

// ── Composable ───────────────────────────────

export function useEspacios() {
  init()

  // ── Computed ─────────────────────────────

  const emergenciasActivas = computed(() =>
    emergencias.value.filter(e => e.estado === 'activa' || e.estado === 'controlada')
  )

  const emergenciasHistorial = computed(() =>
    emergencias.value.filter(e => e.estado === 'resuelta')
  )

  // ── CRUD Espacios ────────────────────────

  function crearEspacio(data: Omit<Espacio, 'id' | 'fecha_creacion' | 'ultima_modificacion' | 'estado'>): Espacio {
    const espacio: Espacio = {
      ...data,
      id: generateId('ESP'),
      estado: 'normal',
      fecha_creacion: new Date().toISOString(),
      ultima_modificacion: new Date().toISOString(),
    }
    espacios.value.push(espacio)
    return espacio
  }

  function actualizarEspacio(id: string, data: Partial<Omit<Espacio, 'id' | 'fecha_creacion'>>) {
    const idx = espacios.value.findIndex(e => e.id === id)
    if (idx < 0) return
    Object.assign(espacios.value[idx], data, { ultima_modificacion: new Date().toISOString() })
  }

  function eliminarEspacio(id: string) {
    const idx = espacios.value.findIndex(e => e.id === id)
    if (idx >= 0) espacios.value.splice(idx, 1)
    // Remove associated emergencies
    emergencias.value = emergencias.value.filter(e => e.espacio_id !== id)
  }

  function duplicarEspacio(id: string): Espacio | null {
    const orig = espacios.value.find(e => e.id === id)
    if (!orig) return null
    const copy: Espacio = JSON.parse(JSON.stringify(orig))
    copy.id = generateId('ESP')
    copy.nombre = `Copia de ${orig.nombre}`
    copy.fecha_creacion = new Date().toISOString()
    copy.ultima_modificacion = new Date().toISOString()
    // Re-generate IDs for sub-entities
    copy.zonas.forEach(z => { z.id = generateId('Z') })
    copy.puntos_criticos.forEach(p => { p.id = generateId('PC') })
    copy.rutas_evacuacion.forEach(r => { r.id = generateId('RE') })
    copy.protocolos.forEach(p => { p.id = generateId('PR') })
    espacios.value.push(copy)
    return copy
  }

  function getEspacio(id: string): Espacio | undefined {
    return espacios.value.find(e => e.id === id)
  }

  // ── Zonas ────────────────────────────────

  function agregarZona(espacioId: string, zona: Omit<Zona, 'id'>): Zona | null {
    const esp = getEspacio(espacioId)
    if (!esp) return null
    const newZona: Zona = { ...zona, id: generateId('Z') }
    esp.zonas.push(newZona)
    esp.ultima_modificacion = new Date().toISOString()
    return newZona
  }

  function actualizarZona(espacioId: string, zonaId: string, data: Partial<Omit<Zona, 'id'>>) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    const zona = esp.zonas.find(z => z.id === zonaId)
    if (zona) {
      Object.assign(zona, data)
      esp.ultima_modificacion = new Date().toISOString()
    }
  }

  function eliminarZona(espacioId: string, zonaId: string) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    esp.zonas = esp.zonas.filter(z => z.id !== zonaId)
    // Unlink points referencing this zone
    esp.puntos_criticos.forEach(p => { if (p.zona_id === zonaId) p.zona_id = null })
    esp.ultima_modificacion = new Date().toISOString()
  }

  // ── Puntos Críticos ──────────────────────

  function agregarPuntoCritico(espacioId: string, punto: Omit<PuntoCritico, 'id'>): PuntoCritico | null {
    const esp = getEspacio(espacioId)
    if (!esp) return null
    const newPunto: PuntoCritico = { ...punto, id: generateId('PC') }
    esp.puntos_criticos.push(newPunto)
    esp.ultima_modificacion = new Date().toISOString()
    return newPunto
  }

  function actualizarPuntoCritico(espacioId: string, puntoId: string, data: Partial<Omit<PuntoCritico, 'id'>>) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    const punto = esp.puntos_criticos.find(p => p.id === puntoId)
    if (punto) {
      Object.assign(punto, data)
      esp.ultima_modificacion = new Date().toISOString()
    }
  }

  function eliminarPuntoCritico(espacioId: string, puntoId: string) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    esp.puntos_criticos = esp.puntos_criticos.filter(p => p.id !== puntoId)
    esp.ultima_modificacion = new Date().toISOString()
  }

  // ── Rutas ────────────────────────────────

  function agregarRuta(espacioId: string, ruta: Omit<RutaEvacuacion, 'id'>): RutaEvacuacion | null {
    const esp = getEspacio(espacioId)
    if (!esp) return null
    const newRuta: RutaEvacuacion = { ...ruta, id: generateId('RE') }
    esp.rutas_evacuacion.push(newRuta)
    esp.ultima_modificacion = new Date().toISOString()
    return newRuta
  }

  function actualizarRuta(espacioId: string, rutaId: string, data: Partial<Omit<RutaEvacuacion, 'id'>>) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    const ruta = esp.rutas_evacuacion.find(r => r.id === rutaId)
    if (ruta) {
      Object.assign(ruta, data)
      esp.ultima_modificacion = new Date().toISOString()
    }
  }

  function eliminarRuta(espacioId: string, rutaId: string) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    esp.rutas_evacuacion = esp.rutas_evacuacion.filter(r => r.id !== rutaId)
    esp.ultima_modificacion = new Date().toISOString()
  }

  // ── Protocolos ───────────────────────────

  function agregarProtocolo(espacioId: string, protocolo: Omit<Protocolo, 'id'>): Protocolo | null {
    const esp = getEspacio(espacioId)
    if (!esp) return null
    const newProt: Protocolo = { ...protocolo, id: generateId('PR') }
    esp.protocolos.push(newProt)
    esp.ultima_modificacion = new Date().toISOString()
    return newProt
  }

  function actualizarProtocolo(espacioId: string, protocoloId: string, data: Partial<Omit<Protocolo, 'id'>>) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    const prot = esp.protocolos.find(p => p.id === protocoloId)
    if (prot) {
      Object.assign(prot, data)
      esp.ultima_modificacion = new Date().toISOString()
    }
  }

  function eliminarProtocolo(espacioId: string, protocoloId: string) {
    const esp = getEspacio(espacioId)
    if (!esp) return
    esp.protocolos = esp.protocolos.filter(p => p.id !== protocoloId)
    esp.ultima_modificacion = new Date().toISOString()
  }

  // ── Emergencias ──────────────────────────

  function activarEmergencia(
    espacioId: string,
    tipo: TipoEmergencia,
    nivel: 1 | 2 | 3 | 4 | 5,
    zonasAfectadas: string[],
    rutasBloqueadas: string[],
    notas: string,
  ): Emergencia {
    const emergencia: Emergencia = {
      id: generateId('EM'),
      espacio_id: espacioId,
      tipo,
      inicio: new Date().toISOString(),
      nivel,
      zonas_afectadas: zonasAfectadas,
      rutas_bloqueadas: rutasBloqueadas,
      pasos_completados: [],
      estado: 'activa',
      acciones_tomadas: [],
      notas,
    }
    emergencias.value.push(emergencia)
    // Update space state
    const esp = getEspacio(espacioId)
    if (esp) {
      esp.estado = 'emergencia'
      // Update affected zones and routes
      zonasAfectadas.forEach(zId => {
        const z = esp.zonas.find(zz => zz.id === zId)
        if (z) z.estado = 'evacuando'
      })
      rutasBloqueadas.forEach(rId => {
        const r = esp.rutas_evacuacion.find(rr => rr.id === rId)
        if (r) r.estado = 'bloqueada'
      })
    }
    return emergencia
  }

  function completarPasoEmergencia(emergenciaId: string, pasoIndex: number) {
    const em = emergencias.value.find(e => e.id === emergenciaId)
    if (!em) return
    if (!em.pasos_completados.includes(pasoIndex)) {
      em.pasos_completados.push(pasoIndex)
    }
  }

  function agregarAccionEmergencia(emergenciaId: string, accion: string) {
    const em = emergencias.value.find(e => e.id === emergenciaId)
    if (em) em.acciones_tomadas.push(accion)
  }

  function actualizarEmergencia(emergenciaId: string, data: Partial<Omit<Emergencia, 'id' | 'espacio_id' | 'inicio'>>) {
    const em = emergencias.value.find(e => e.id === emergenciaId)
    if (em) Object.assign(em, data)
  }

  function cerrarEmergencia(emergenciaId: string, notas: string) {
    const em = emergencias.value.find(e => e.id === emergenciaId)
    if (!em) return
    em.estado = 'resuelta'
    em.fin = new Date().toISOString()
    em.notas = notas || em.notas
    // Reset space state
    const esp = getEspacio(em.espacio_id)
    if (esp) {
      const hasOtherActive = emergencias.value.some(
        e => e.espacio_id === em.espacio_id && e.id !== emergenciaId && (e.estado === 'activa' || e.estado === 'controlada')
      )
      if (!hasOtherActive) {
        esp.estado = 'normal' as EstadoEspacio
        esp.zonas.forEach(z => { z.estado = 'normal' })
        esp.rutas_evacuacion.forEach(r => { r.estado = 'disponible' })
      }
    }
  }

  function getEmergenciasEspacio(espacioId: string) {
    return emergencias.value.filter(e => e.espacio_id === espacioId)
  }

  // ── Import / Export ──────────────────────

  function exportarEspacios(): string {
    return JSON.stringify({
      version: 1,
      exportDate: new Date().toISOString(),
      espacios: espacios.value,
      emergencias: emergencias.value,
    }, null, 2)
  }

  function exportarEspacio(id: string): string | null {
    const esp = getEspacio(id)
    if (!esp) return null
    const emgs = emergencias.value.filter(e => e.espacio_id === id)
    return JSON.stringify({
      version: 1,
      exportDate: new Date().toISOString(),
      espacios: [esp],
      emergencias: emgs,
    }, null, 2)
  }

  function importarEspacios(jsonStr: string, overwrite: boolean = false): { imported: number; skipped: number } {
    let result = { imported: 0, skipped: 0 }
    try {
      const data = JSON.parse(jsonStr)
      const importedEspacios: Espacio[] = data.espacios || []
      const importedEmergencias: Emergencia[] = data.emergencias || []

      for (const esp of importedEspacios) {
        const existingIdx = espacios.value.findIndex(e => e.id === esp.id)
        if (existingIdx >= 0) {
          if (overwrite) {
            espacios.value[existingIdx] = esp
            result.imported++
          } else {
            // Duplicate with new ID
            const copy = { ...esp, id: generateId('ESP'), nombre: `${esp.nombre} (importado)` }
            espacios.value.push(copy)
            result.imported++
          }
        } else {
          espacios.value.push(esp)
          result.imported++
        }
      }

      for (const em of importedEmergencias) {
        if (!emergencias.value.some(e => e.id === em.id)) {
          emergencias.value.push(em)
        }
      }
    } catch {
      // Invalid JSON
    }
    return result
  }

  function descargarJSON(content: string, filename: string) {
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    espacios,
    emergencias,
    emergenciasActivas,
    emergenciasHistorial,
    // CRUD Espacios
    crearEspacio,
    actualizarEspacio,
    eliminarEspacio,
    duplicarEspacio,
    getEspacio,
    // Zonas
    agregarZona,
    actualizarZona,
    eliminarZona,
    // Puntos Críticos
    agregarPuntoCritico,
    actualizarPuntoCritico,
    eliminarPuntoCritico,
    // Rutas
    agregarRuta,
    actualizarRuta,
    eliminarRuta,
    // Protocolos
    agregarProtocolo,
    actualizarProtocolo,
    eliminarProtocolo,
    // Emergencias
    activarEmergencia,
    completarPasoEmergencia,
    agregarAccionEmergencia,
    actualizarEmergencia,
    cerrarEmergencia,
    getEmergenciasEspacio,
    // Import/Export
    exportarEspacios,
    exportarEspacio,
    importarEspacios,
    descargarJSON,
  }
}
