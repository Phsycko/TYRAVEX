// ============================================
// BLINDAJE MODULE — GESTIÓN DE ESPACIOS
// Types, interfaces & helper functions only.
// No mock data — all data lives in localStorage.
// ============================================

// ── Types ────────────────────────────────────

export type TipoEspacio =
  | 'edificio' | 'venue_evento' | 'instalacion_publica'
  | 'recinto' | 'zona_urbana' | 'otro'

export type TipoZona =
  | 'acceso' | 'sala' | 'pasillo' | 'salida_emergencia'
  | 'punto_reunion' | 'area_restringida' | 'estacionamiento'
  | 'oficina' | 'auditorio' | 'cocina' | 'baño' | 'otro'

export type TipoPuntoCritico =
  | 'extinguidor' | 'salida_emergencia' | 'punto_reunion'
  | 'panel_electrico' | 'llave_gas' | 'camara'
  | 'desfibrilador' | 'escalera_emergencia' | 'hidrante' | 'otro'

export type TipoEmergencia =
  | 'incendio' | 'sismo' | 'evacuacion_masiva'
  | 'amenaza_bomba' | 'emergencia_medica' | 'falla_electrica'
  | 'inundacion' | 'otro'

export type EstadoZona = 'normal' | 'alerta' | 'evacuando' | 'bloqueado'
export type EstadoEspacio = 'normal' | 'alerta' | 'emergencia'
export type EstadoRuta = 'disponible' | 'bloqueada' | 'parcial'

// ── Interfaces ───────────────────────────────

export interface Posicion {
  x: number       // 0-800 SVG coordinate
  y: number       // 0-600 SVG coordinate
  ancho: number
  alto: number
}

export interface Zona {
  id: string
  nombre: string
  tipo: TipoZona
  nivel: number
  posicion: Posicion
  capacidad: number
  salidas_emergencia: number
  estado: EstadoZona
  personal_asignado: number
  notas: string
  color_custom?: string
}

export interface PuntoCritico {
  id: string
  tipo: TipoPuntoCritico
  nombre: string
  zona_id: string | null
  nivel: number
  posicion: Posicion
  operativo: boolean
  ultima_revision: string | null
  notas: string
}

export interface RutaEvacuacion {
  id: string
  nombre: string
  nivel: number
  puntos: { x: number; y: number }[]
  estado: EstadoRuta
  capacidad_personas: number
  tiempo_estimado_seg: number
  notas: string
}

export interface Protocolo {
  id: string
  tipo: TipoEmergencia
  pasos: string[]
  responsable: string
  tiempo_estimado_min: number
  recursos_necesarios: string[]
}

export interface Espacio {
  id: string
  nombre: string
  tipo: TipoEspacio
  descripcion: string
  direccion: string
  estado_mx: string
  ciudad: string
  capacidad_total: number
  niveles: number
  estado: EstadoEspacio
  zonas: Zona[]
  puntos_criticos: PuntoCritico[]
  rutas_evacuacion: RutaEvacuacion[]
  protocolos: Protocolo[]
  plano_importado: string | null
  ultima_modificacion: string
  fecha_creacion: string
  notas: string
}

export interface Emergencia {
  id: string
  espacio_id: string
  tipo: TipoEmergencia
  inicio: string
  nivel: 1 | 2 | 3 | 4 | 5
  zonas_afectadas: string[]
  rutas_bloqueadas: string[]
  pasos_completados: number[]
  estado: 'activa' | 'controlada' | 'resuelta'
  acciones_tomadas: string[]
  notas: string
  fin?: string
}

// ── Constants ────────────────────────────────

export const ESTADOS_MEXICO: string[] = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
  'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas',
]

export const TIPOS_ESPACIO: { value: TipoEspacio; label: string }[] = [
  { value: 'edificio', label: 'Edificio' },
  { value: 'venue_evento', label: 'Venue / Evento' },
  { value: 'instalacion_publica', label: 'Instalación Pública' },
  { value: 'recinto', label: 'Recinto' },
  { value: 'zona_urbana', label: 'Zona Urbana' },
  { value: 'otro', label: 'Otro' },
]

export const TIPOS_ZONA: { value: TipoZona; label: string }[] = [
  { value: 'acceso', label: 'Acceso' },
  { value: 'sala', label: 'Sala' },
  { value: 'pasillo', label: 'Pasillo' },
  { value: 'salida_emergencia', label: 'Salida de Emergencia' },
  { value: 'punto_reunion', label: 'Punto de Reunión' },
  { value: 'area_restringida', label: 'Área Restringida' },
  { value: 'estacionamiento', label: 'Estacionamiento' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'auditorio', label: 'Auditorio' },
  { value: 'cocina', label: 'Cocina' },
  { value: 'baño', label: 'Baño' },
  { value: 'otro', label: 'Otro' },
]

export const TIPOS_PUNTO_CRITICO: { value: TipoPuntoCritico; label: string; icon: string }[] = [
  { value: 'extinguidor', label: 'Extinguidor', icon: '🧯' },
  { value: 'salida_emergencia', label: 'Salida de Emergencia', icon: '🚪' },
  { value: 'punto_reunion', label: 'Punto de Reunión', icon: '📍' },
  { value: 'panel_electrico', label: 'Panel Eléctrico', icon: '⚡' },
  { value: 'llave_gas', label: 'Llave de Gas', icon: '🔧' },
  { value: 'camara', label: 'Cámara', icon: '📹' },
  { value: 'desfibrilador', label: 'Desfibrilador', icon: '💓' },
  { value: 'escalera_emergencia', label: 'Escalera de Emergencia', icon: '🪜' },
  { value: 'hidrante', label: 'Hidrante', icon: '🔴' },
  { value: 'otro', label: 'Otro', icon: '⬤' },
]

export const TIPOS_EMERGENCIA: { value: TipoEmergencia; label: string; color: string }[] = [
  { value: 'incendio', label: 'Incendio', color: '#ff4444' },
  { value: 'sismo', label: 'Sismo', color: '#ff6b35' },
  { value: 'evacuacion_masiva', label: 'Evacuación Masiva', color: '#ff6b35' },
  { value: 'amenaza_bomba', label: 'Amenaza de Bomba', color: '#ff4444' },
  { value: 'emergencia_medica', label: 'Emergencia Médica', color: '#4A90E2' },
  { value: 'falla_electrica', label: 'Falla Eléctrica', color: '#ffcc00' },
  { value: 'inundacion', label: 'Inundación', color: '#4A90E2' },
  { value: 'otro', label: 'Otro', color: '#888' },
]

// ── Helper functions ─────────────────────────

export function getZonaColor(tipo: TipoZona): { fill: string; stroke: string } {
  const map: Record<TipoZona, { fill: string; stroke: string }> = {
    'acceso':            { fill: 'rgba(74,144,226,0.25)',   stroke: '#4A90E2' },
    'sala':              { fill: 'rgba(255,107,53,0.15)',   stroke: '#ff6b35' },
    'pasillo':           { fill: 'rgba(255,255,255,0.04)',  stroke: 'rgba(255,255,255,0.2)' },
    'salida_emergencia': { fill: 'rgba(0,255,170,0.25)',    stroke: '#00ffaa' },
    'punto_reunion':     { fill: 'rgba(0,255,170,0.15)',    stroke: '#00ffaa' },
    'area_restringida':  { fill: 'rgba(255,68,68,0.2)',     stroke: '#ff4444' },
    'estacionamiento':   { fill: 'rgba(255,204,0,0.1)',     stroke: '#ffcc00' },
    'oficina':           { fill: 'rgba(139,92,246,0.15)',   stroke: '#8B5CF6' },
    'auditorio':         { fill: 'rgba(255,107,53,0.2)',    stroke: '#ff6b35' },
    'cocina':            { fill: 'rgba(255,204,0,0.15)',    stroke: '#ffcc00' },
    'baño':              { fill: 'rgba(139,92,246,0.1)',     stroke: '#8B5CF6' },
    'otro':              { fill: 'rgba(255,255,255,0.06)',  stroke: 'rgba(255,255,255,0.3)' },
  }
  return map[tipo]
}

export function getZonaLabel(tipo: TipoZona): string {
  return TIPOS_ZONA.find(t => t.value === tipo)?.label ?? tipo
}

export function getPuntoCriticoIcon(tipo: TipoPuntoCritico): string {
  return TIPOS_PUNTO_CRITICO.find(t => t.value === tipo)?.icon ?? '⬤'
}

export function getPuntoCriticoLabel(tipo: TipoPuntoCritico): string {
  return TIPOS_PUNTO_CRITICO.find(t => t.value === tipo)?.label ?? tipo
}

export function getEmergenciaLabel(tipo: TipoEmergencia): string {
  return TIPOS_EMERGENCIA.find(t => t.value === tipo)?.label ?? tipo
}

export function getEmergenciaColor(tipo: TipoEmergencia): string {
  return TIPOS_EMERGENCIA.find(t => t.value === tipo)?.color ?? '#888'
}

export function getRutaColor(estado: EstadoRuta): string {
  const map: Record<EstadoRuta, string> = {
    'disponible': '#00ffaa',
    'parcial': '#ffcc00',
    'bloqueada': '#ff4444',
  }
  return map[estado]
}

export function getEstadoZonaColor(estado: EstadoZona): string {
  const map: Record<EstadoZona, string> = {
    'normal': '#00ffaa',
    'alerta': '#ffcc00',
    'evacuando': '#ff6b35',
    'bloqueado': '#ff4444',
  }
  return map[estado]
}

export function getTipoEspacioLabel(tipo: TipoEspacio): string {
  return TIPOS_ESPACIO.find(t => t.value === tipo)?.label ?? tipo
}

export function generateId(prefix: string = 'ID'): string {
  return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
}
