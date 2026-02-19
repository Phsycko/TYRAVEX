// ============================================
// BLINDAJE MODULE — THREAT INTELLIGENCE DATA
// ============================================

// ── Types ────────────────────────────────────

export type ThreatLevel = 'bajo' | 'medio' | 'alto' | 'crítico'
export type ThreatType = 'discurso_odio' | 'amenaza_directa' | 'desinformacion' | 'coordinacion_hostil' | 'doxing' | 'incitacion'
export type ThreatStatus = 'nueva' | 'en_revision' | 'escalada' | 'resuelta'
export type Plataforma = 'Twitter/X' | 'Facebook' | 'TikTok' | 'Telegram' | 'Instagram' | 'YouTube' | 'WhatsApp' | 'Reddit' | 'Deep Web'
export type TrendDir = 'aumentando' | 'estable' | 'disminuyendo'

export interface Amenaza {
  id: string
  timestamp: string
  plataforma: Plataforma
  tipo: ThreatType
  contenido: string
  severidad: number // 1-10
  alcance: number
  ubicacion: string
  estado: ThreatStatus
  accion_recomendada: string
  cuenta_origen?: string
  seguidores_origen?: number
}

export interface HostilidadRegion {
  estado: string
  stateId: string
  score_hostilidad: number
  menciones_negativas: number
  tendencia: TrendDir
  keywords_frecuentes: string[]
  nivel_riesgo: ThreatLevel
}

export interface KeywordMonitor {
  keyword: string
  categoria: string
  hits_hoy: number
  hits_semana: number
  tendencia: TrendDir
  activa: boolean
}

export interface EventoRiesgo {
  id: string
  nombre_evento: string
  fecha: string
  lugar: string
  estado: string
  nivel_riesgo_zona: number
  historial_incidentes_zona: number
  recomendacion: string
  factores_riesgo: string[]
}

export interface FuenteIntel {
  nombre: string
  tipo: Plataforma | 'Noticias' | 'Deep Web Monitor'
  activa: boolean
  ultimo_scan: string
  alertas_generadas: number
  metrica_label: string
  metrica_valor: string
}

export interface AlertaHistorial {
  id: string
  timestamp: string
  tipo: ThreatType
  severidad: number
  descripcion: string
  accion_tomada: string
  resuelto: boolean
}

export interface InformeHistorial {
  id: string
  fecha: string
  tipo: string
  generado_por: string
  destinatarios: string
}

// ── Threat Level ─────────────────────────────

export const nivelAmenazaGlobal = {
  score: 72,
  tendencia: 'aumentando' as TrendDir,
  ultima_actualizacion: '11.FEB.2026 08:42:31',
  nivel: 'alto' as ThreatLevel,
}

// ── Amenazas detectadas ──────────────────────

export const amenazas: Amenaza[] = [
  { id: 'TH-001', timestamp: '11.FEB 08:38', plataforma: 'Twitter/X', tipo: 'amenaza_directa', contenido: '[REDACTED] Amenaza directa contra candidato mencionando evento en Guadalajara del 15 de febrero. Cuenta con historial de contenido extremista.', severidad: 9, alcance: 4200, ubicacion: 'Jalisco', estado: 'escalada', accion_recomendada: 'Escalar a seguridad física inmediatamente', cuenta_origen: '@user_anon_3847', seguidores_origen: 1240 },
  { id: 'TH-002', timestamp: '11.FEB 08:22', plataforma: 'Telegram', tipo: 'coordinacion_hostil', contenido: 'Canal privado coordinando campaña de desprestigio masiva. Se detectaron 340+ cuentas fake preparadas para activación simultánea.', severidad: 8, alcance: 15600, ubicacion: 'CDMX', estado: 'en_revision', accion_recomendada: 'Monitorear activación de cuentas y preparar respuesta', cuenta_origen: 'Canal: [REDACTED]', seguidores_origen: 8700 },
  { id: 'TH-003', timestamp: '11.FEB 07:55', plataforma: 'Facebook', tipo: 'desinformacion', contenido: 'Artículo fabricado con dominio clonado de medio reconocido. Afirma falsamente vínculos del candidato con grupos de interés.', severidad: 7, alcance: 89000, ubicacion: 'Nuevo León', estado: 'nueva', accion_recomendada: 'Reportar a Facebook y preparar desmentido factual', cuenta_origen: 'Página: Noticias MX Real', seguidores_origen: 24500 },
  { id: 'TH-004', timestamp: '11.FEB 07:31', plataforma: 'TikTok', tipo: 'desinformacion', contenido: 'Video deepfake de baja calidad manipulando declaraciones del candidato. Audio alterado para cambiar contexto.', severidad: 8, alcance: 234000, ubicacion: 'Nacional', estado: 'en_revision', accion_recomendada: 'Solicitar remoción urgente a TikTok y publicar video original', cuenta_origen: '@verdad_mx_2026', seguidores_origen: 45200 },
  { id: 'TH-005', timestamp: '11.FEB 06:48', plataforma: 'Twitter/X', tipo: 'doxing', contenido: 'Publicación de datos personales del equipo de campaña incluyendo direcciones y teléfonos. Información parcialmente verificada.', severidad: 9, alcance: 12800, ubicacion: 'CDMX', estado: 'escalada', accion_recomendada: 'Reportar inmediatamente. Notificar a afectados. Evaluar medidas legales.', cuenta_origen: '@filtraciones_pol', seguidores_origen: 3100 },
  { id: 'TH-006', timestamp: '11.FEB 06:15', plataforma: 'Instagram', tipo: 'discurso_odio', contenido: 'Serie de stories con contenido de odio dirigido al candidato y su familia. Incluye amenazas veladas y lenguaje violento.', severidad: 6, alcance: 18400, ubicacion: 'Sonora', estado: 'nueva', accion_recomendada: 'Reportar a Instagram. Documentar para expediente legal.', cuenta_origen: '@mx_patriota_real', seguidores_origen: 7800 },
  { id: 'TH-007', timestamp: '11.FEB 05:42', plataforma: 'YouTube', tipo: 'incitacion', contenido: 'Video largo (22 min) con narrativa de incitación a protestas violentas en eventos de campaña. Comparte rutas y horarios.', severidad: 8, alcance: 56000, ubicacion: 'Puebla', estado: 'en_revision', accion_recomendada: 'Reportar a YouTube. Alertar a equipo de logística de eventos.', cuenta_origen: 'Canal: La Verdad Sin Filtro', seguidores_origen: 12400 },
  { id: 'TH-008', timestamp: '11.FEB 04:58', plataforma: 'Reddit', tipo: 'coordinacion_hostil', contenido: 'Thread en subreddit organizado coordinando brigading masivo en encuestas online y secciones de comentarios de medios.', severidad: 5, alcance: 3200, ubicacion: 'Nacional', estado: 'nueva', accion_recomendada: 'Monitorear. Preparar contramedidas en plataformas objetivo.', cuenta_origen: 'r/[REDACTED]', seguidores_origen: 15600 },
  { id: 'TH-009', timestamp: '11.FEB 03:20', plataforma: 'Deep Web', tipo: 'amenaza_directa', contenido: 'Publicación en foro de la deep web mencionando plan específico contra equipo de campaña. Incluye detalles operativos preocupantes.', severidad: 10, alcance: 480, ubicacion: 'Desconocida', estado: 'escalada', accion_recomendada: 'ESCALAR INMEDIATAMENTE a autoridades y seguridad física.', cuenta_origen: 'Anónimo', seguidores_origen: 0 },
  { id: 'TH-010', timestamp: '11.FEB 02:45', plataforma: 'WhatsApp', tipo: 'desinformacion', contenido: 'Cadena viral con información falsa sobre posición del candidato en tema de seguridad. Incluye audio manipulado.', severidad: 6, alcance: 145000, ubicacion: 'Nacional', estado: 'en_revision', accion_recomendada: 'Preparar desmentido para difusión en misma plataforma.', cuenta_origen: 'Grupo: [REDACTED]', seguidores_origen: 0 },
  { id: 'TH-011', timestamp: '10.FEB 23:18', plataforma: 'Twitter/X', tipo: 'discurso_odio', contenido: 'Hashtag trending con contenido discriminatorio. 450+ publicaciones en 2 horas con lenguaje de odio coordinado.', severidad: 7, alcance: 320000, ubicacion: 'Nacional', estado: 'resuelta', accion_recomendada: 'Reportar hashtag. Activar contracampaña positiva.', cuenta_origen: 'Múltiples cuentas', seguidores_origen: 0 },
  { id: 'TH-012', timestamp: '10.FEB 21:05', plataforma: 'Facebook', tipo: 'incitacion', contenido: 'Evento público creado convocando a "protesta" frente a oficinas de campaña. Lenguaje ambiguo que sugiere confrontación.', severidad: 5, alcance: 8900, ubicacion: 'Chihuahua', estado: 'resuelta', accion_recomendada: 'Alertar seguridad de oficinas. Monitorear asistencia.', cuenta_origen: 'Grupo: Ciudadanos Libres CH', seguidores_origen: 2300 },
  { id: 'TH-013', timestamp: '10.FEB 19:30', plataforma: 'TikTok', tipo: 'desinformacion', contenido: 'Compilación engañosa de clips fuera de contexto presentados como "promesas incumplidas". 1.2M views en 6 horas.', severidad: 7, alcance: 1200000, ubicacion: 'Nacional', estado: 'resuelta', accion_recomendada: 'Publicar respuesta con contexto completo de cada clip.', cuenta_origen: '@politica_real_mx', seguidores_origen: 89000 },
  { id: 'TH-014', timestamp: '10.FEB 17:15', plataforma: 'Telegram', tipo: 'doxing', contenido: 'Filtración de agenda privada del candidato para la próxima semana. Incluye ubicaciones y horarios específicos.', severidad: 9, alcance: 5600, ubicacion: 'CDMX', estado: 'escalada', accion_recomendada: 'Modificar agenda inmediatamente. Investigar fuente de filtración.', cuenta_origen: 'Canal: Filtraciones Políticas', seguidores_origen: 11200 },
  { id: 'TH-015', timestamp: '10.FEB 14:42', plataforma: 'Instagram', tipo: 'coordinacion_hostil', contenido: 'Red de 200+ cuentas con creación reciente publicando contenido negativo coordinado con mismo template visual.', severidad: 6, alcance: 67000, ubicacion: 'Nacional', estado: 'en_revision', accion_recomendada: 'Documentar red. Reportar a Instagram como actividad coordinada.', cuenta_origen: 'Red coordinada', seguidores_origen: 0 },
]

// ── Hostilidad por región ────────────────────

export const hostilidadRegiones: HostilidadRegion[] = [
  { estado: 'Aguascalientes', stateId: 'MX-AGS', score_hostilidad: 22, menciones_negativas: 180, tendencia: 'estable', keywords_frecuentes: ['corrupción', 'mentira'], nivel_riesgo: 'bajo' },
  { estado: 'Baja California', stateId: 'MX-BC', score_hostilidad: 45, menciones_negativas: 890, tendencia: 'aumentando', keywords_frecuentes: ['frontera', 'inseguridad', 'narco'], nivel_riesgo: 'medio' },
  { estado: 'Baja California Sur', stateId: 'MX-BCS', score_hostilidad: 18, menciones_negativas: 95, tendencia: 'disminuyendo', keywords_frecuentes: ['turismo', 'empleo'], nivel_riesgo: 'bajo' },
  { estado: 'Campeche', stateId: 'MX-CAMP', score_hostilidad: 25, menciones_negativas: 210, tendencia: 'estable', keywords_frecuentes: ['abandono', 'pobreza'], nivel_riesgo: 'bajo' },
  { estado: 'Chiapas', stateId: 'MX-CHIS', score_hostilidad: 58, menciones_negativas: 1340, tendencia: 'aumentando', keywords_frecuentes: ['conflicto', 'indígenas', 'narco', 'violencia'], nivel_riesgo: 'alto' },
  { estado: 'Chihuahua', stateId: 'MX-CHIH', score_hostilidad: 62, menciones_negativas: 1580, tendencia: 'aumentando', keywords_frecuentes: ['narco', 'asesinato', 'frontera', 'violencia'], nivel_riesgo: 'alto' },
  { estado: 'Ciudad de México', stateId: 'MX-CDMX', score_hostilidad: 78, menciones_negativas: 8900, tendencia: 'aumentando', keywords_frecuentes: ['fraude', 'corrupción', 'protesta', 'violencia', 'descontento'], nivel_riesgo: 'crítico' },
  { estado: 'Coahuila', stateId: 'MX-COAH', score_hostilidad: 35, menciones_negativas: 620, tendencia: 'estable', keywords_frecuentes: ['empleo', 'industria'], nivel_riesgo: 'medio' },
  { estado: 'Colima', stateId: 'MX-COL', score_hostilidad: 42, menciones_negativas: 380, tendencia: 'aumentando', keywords_frecuentes: ['violencia', 'narco'], nivel_riesgo: 'medio' },
  { estado: 'Durango', stateId: 'MX-DGO', score_hostilidad: 28, menciones_negativas: 290, tendencia: 'disminuyendo', keywords_frecuentes: ['pobreza', 'abandono'], nivel_riesgo: 'bajo' },
  { estado: 'Guanajuato', stateId: 'MX-GTO', score_hostilidad: 55, menciones_negativas: 2100, tendencia: 'estable', keywords_frecuentes: ['violencia', 'narco', 'huachicoleo'], nivel_riesgo: 'alto' },
  { estado: 'Guerrero', stateId: 'MX-GRO', score_hostilidad: 71, menciones_negativas: 2800, tendencia: 'aumentando', keywords_frecuentes: ['narco', 'violencia', 'desaparecidos', 'impunidad'], nivel_riesgo: 'crítico' },
  { estado: 'Hidalgo', stateId: 'MX-HGO', score_hostilidad: 30, menciones_negativas: 410, tendencia: 'estable', keywords_frecuentes: ['corrupción', 'pobreza'], nivel_riesgo: 'bajo' },
  { estado: 'Jalisco', stateId: 'MX-JAL', score_hostilidad: 68, menciones_negativas: 3400, tendencia: 'aumentando', keywords_frecuentes: ['narco', 'CJNG', 'violencia', 'desaparecidos'], nivel_riesgo: 'alto' },
  { estado: 'México', stateId: 'MX-MEX', score_hostilidad: 65, menciones_negativas: 4200, tendencia: 'estable', keywords_frecuentes: ['inseguridad', 'transporte', 'feminicidio'], nivel_riesgo: 'alto' },
  { estado: 'Michoacán', stateId: 'MX-MICH', score_hostilidad: 74, menciones_negativas: 3100, tendencia: 'aumentando', keywords_frecuentes: ['narco', 'autodefensas', 'violencia', 'aguacate'], nivel_riesgo: 'crítico' },
  { estado: 'Morelos', stateId: 'MX-MOR', score_hostilidad: 48, menciones_negativas: 720, tendencia: 'estable', keywords_frecuentes: ['inseguridad', 'corrupción'], nivel_riesgo: 'medio' },
  { estado: 'Nayarit', stateId: 'MX-NAY', score_hostilidad: 32, menciones_negativas: 280, tendencia: 'disminuyendo', keywords_frecuentes: ['narco', 'empleo'], nivel_riesgo: 'medio' },
  { estado: 'Nuevo León', stateId: 'MX-NL', score_hostilidad: 52, menciones_negativas: 2600, tendencia: 'aumentando', keywords_frecuentes: ['independencia', 'corrupción', 'agua', 'frontera'], nivel_riesgo: 'alto' },
  { estado: 'Oaxaca', stateId: 'MX-OAX', score_hostilidad: 44, menciones_negativas: 980, tendencia: 'estable', keywords_frecuentes: ['protesta', 'maestros', 'pobreza'], nivel_riesgo: 'medio' },
  { estado: 'Puebla', stateId: 'MX-PUE', score_hostilidad: 50, menciones_negativas: 1800, tendencia: 'aumentando', keywords_frecuentes: ['huachicoleo', 'corrupción', 'inseguridad'], nivel_riesgo: 'alto' },
  { estado: 'Querétaro', stateId: 'MX-QRO', score_hostilidad: 20, menciones_negativas: 320, tendencia: 'disminuyendo', keywords_frecuentes: ['empleo', 'tecnología'], nivel_riesgo: 'bajo' },
  { estado: 'Quintana Roo', stateId: 'MX-QROO', score_hostilidad: 38, menciones_negativas: 650, tendencia: 'estable', keywords_frecuentes: ['turismo', 'narco', 'inseguridad'], nivel_riesgo: 'medio' },
  { estado: 'San Luis Potosí', stateId: 'MX-SLP', score_hostilidad: 34, menciones_negativas: 480, tendencia: 'estable', keywords_frecuentes: ['pobreza', 'minería'], nivel_riesgo: 'medio' },
  { estado: 'Sinaloa', stateId: 'MX-SIN', score_hostilidad: 66, menciones_negativas: 2400, tendencia: 'estable', keywords_frecuentes: ['narco', 'cartel', 'violencia', 'extorsión'], nivel_riesgo: 'alto' },
  { estado: 'Sonora', stateId: 'MX-SON', score_hostilidad: 54, menciones_negativas: 1600, tendencia: 'aumentando', keywords_frecuentes: ['frontera', 'narco', 'migración'], nivel_riesgo: 'alto' },
  { estado: 'Tabasco', stateId: 'MX-TAB', score_hostilidad: 40, menciones_negativas: 560, tendencia: 'disminuyendo', keywords_frecuentes: ['petróleo', 'inundaciones'], nivel_riesgo: 'medio' },
  { estado: 'Tamaulipas', stateId: 'MX-TAMPS', score_hostilidad: 70, menciones_negativas: 2900, tendencia: 'estable', keywords_frecuentes: ['narco', 'frontera', 'secuestro', 'migración'], nivel_riesgo: 'crítico' },
  { estado: 'Tlaxcala', stateId: 'MX-TLAX', score_hostilidad: 15, menciones_negativas: 120, tendencia: 'estable', keywords_frecuentes: ['trata', 'empleo'], nivel_riesgo: 'bajo' },
  { estado: 'Veracruz', stateId: 'MX-VER', score_hostilidad: 60, menciones_negativas: 2200, tendencia: 'aumentando', keywords_frecuentes: ['violencia', 'corrupción', 'periodistas', 'narco'], nivel_riesgo: 'alto' },
  { estado: 'Yucatán', stateId: 'MX-YUC', score_hostilidad: 12, menciones_negativas: 140, tendencia: 'disminuyendo', keywords_frecuentes: ['turismo', 'cultura'], nivel_riesgo: 'bajo' },
  { estado: 'Zacatecas', stateId: 'MX-ZAC', score_hostilidad: 56, menciones_negativas: 1100, tendencia: 'aumentando', keywords_frecuentes: ['narco', 'violencia', 'desplazados'], nivel_riesgo: 'alto' },
]

// ── Keywords monitoreadas ────────────────────

export const keywordsMonitoreadas: KeywordMonitor[] = [
  // Amenazas físicas
  { keyword: 'matar candidato', categoria: 'Amenazas físicas', hits_hoy: 12, hits_semana: 45, tendencia: 'aumentando', activa: true },
  { keyword: 'atentar contra', categoria: 'Amenazas físicas', hits_hoy: 8, hits_semana: 32, tendencia: 'estable', activa: true },
  { keyword: 'golpear mitin', categoria: 'Amenazas físicas', hits_hoy: 5, hits_semana: 18, tendencia: 'disminuyendo', activa: true },
  { keyword: 'arma evento', categoria: 'Amenazas físicas', hits_hoy: 3, hits_semana: 11, tendencia: 'estable', activa: true },
  // Desinformación
  { keyword: 'narco candidato', categoria: 'Desinformación', hits_hoy: 89, hits_semana: 420, tendencia: 'aumentando', activa: true },
  { keyword: 'fraude electoral', categoria: 'Desinformación', hits_hoy: 156, hits_semana: 890, tendencia: 'aumentando', activa: true },
  { keyword: 'compra de votos', categoria: 'Desinformación', hits_hoy: 67, hits_semana: 310, tendencia: 'estable', activa: true },
  { keyword: 'video falso', categoria: 'Desinformación', hits_hoy: 34, hits_semana: 178, tendencia: 'aumentando', activa: true },
  // Coordinación hostil
  { keyword: 'troll farm', categoria: 'Coordinación hostil', hits_hoy: 23, hits_semana: 112, tendencia: 'estable', activa: true },
  { keyword: 'bot network', categoria: 'Coordinación hostil', hits_hoy: 45, hits_semana: 234, tendencia: 'aumentando', activa: true },
  { keyword: 'raid coordinado', categoria: 'Coordinación hostil', hits_hoy: 11, hits_semana: 56, tendencia: 'disminuyendo', activa: true },
  // Doxing
  { keyword: 'dirección personal', categoria: 'Doxing', hits_hoy: 7, hits_semana: 28, tendencia: 'estable', activa: true },
  { keyword: 'datos familia', categoria: 'Doxing', hits_hoy: 4, hits_semana: 15, tendencia: 'disminuyendo', activa: true },
  { keyword: 'teléfono privado', categoria: 'Doxing', hits_hoy: 6, hits_semana: 22, tendencia: 'estable', activa: true },
  // Incitación
  { keyword: 'quemar oficina', categoria: 'Incitación', hits_hoy: 2, hits_semana: 9, tendencia: 'disminuyendo', activa: true },
  { keyword: 'protesta violenta', categoria: 'Incitación', hits_hoy: 18, hits_semana: 95, tendencia: 'aumentando', activa: true },
  { keyword: 'sabotear evento', categoria: 'Incitación', hits_hoy: 8, hits_semana: 41, tendencia: 'estable', activa: true },
]

// ── Eventos de riesgo ────────────────────────

export const eventosRiesgo: EventoRiesgo[] = [
  { id: 'EV-001', nombre_evento: 'Mitin Guadalajara Centro', fecha: '15.FEB.2026', lugar: 'Plaza Liberación, Guadalajara', estado: 'Jalisco', nivel_riesgo_zona: 78, historial_incidentes_zona: 12, recomendacion: 'Reforzar perímetro. Monitoreo de redes 48h antes.', factores_riesgo: ['Amenaza directa detectada (TH-001)', 'Zona de alta actividad CJNG', 'Antecedentes de enfrentamientos en zona'] },
  { id: 'EV-002', nombre_evento: 'Debate Televisa CDMX', fecha: '18.FEB.2026', lugar: 'Estudios Televisa San Ángel', estado: 'Ciudad de México', nivel_riesgo_zona: 65, historial_incidentes_zona: 8, recomendacion: 'Coordinar con seguridad de Televisa. Ruta alterna preparada.', factores_riesgo: ['Alta concentración de menciones hostiles en CDMX', 'Convocatoria a protestas cercanas', 'Filtración de agenda detectada (TH-014)'] },
  { id: 'EV-003', nombre_evento: 'Recorrido Ecatepec', fecha: '20.FEB.2026', lugar: 'Mercado San Cristóbal, Ecatepec', estado: 'México', nivel_riesgo_zona: 82, historial_incidentes_zona: 15, recomendacion: 'ALTO RIESGO. Considerar cancelar o cambiar formato a virtual.', factores_riesgo: ['Zona de alta incidencia delictiva', 'Presencia de grupos hostiles organizados', 'Dificultad de evacuación en zona'] },
  { id: 'EV-004', nombre_evento: 'Foro Universitario UNAM', fecha: '22.FEB.2026', lugar: 'Auditorio Che Guevara, UNAM', estado: 'Ciudad de México', nivel_riesgo_zona: 55, historial_incidentes_zona: 6, recomendacion: 'Monitorear grupos estudiantiles. Protocolo anti-sabotaje.', factores_riesgo: ['Grupos estudiantiles opositores activos', 'Historial de interrupciones en eventos', 'Viral de desinformación sobre postura educativa'] },
  { id: 'EV-005', nombre_evento: 'Cierre de campaña Monterrey', fecha: '01.MAR.2026', lugar: 'Macroplaza, Monterrey', estado: 'Nuevo León', nivel_riesgo_zona: 48, historial_incidentes_zona: 4, recomendacion: 'Riesgo moderado. Monitoreo estándar con refuerzo perímetro.', factores_riesgo: ['Actividad de narco en área metropolitana', 'Sentimiento separatista vocal en redes'] },
]

// ── Fuentes de inteligencia ──────────────────

export const fuentesIntel: FuenteIntel[] = [
  { nombre: 'Twitter/X API', tipo: 'Twitter/X', activa: true, ultimo_scan: '08:42:31', alertas_generadas: 14, metrica_label: 'Menciones/hora', metrica_valor: '2,847' },
  { nombre: 'Facebook Graph', tipo: 'Facebook', activa: true, ultimo_scan: '08:40:12', alertas_generadas: 6, metrica_label: 'Posts analizados hoy', metrica_valor: '12,450' },
  { nombre: 'TikTok Monitor', tipo: 'TikTok', activa: true, ultimo_scan: '08:38:55', alertas_generadas: 8, metrica_label: 'Videos monitoreados', metrica_valor: '3,210' },
  { nombre: 'Telegram OSINT', tipo: 'Telegram', activa: true, ultimo_scan: '08:41:03', alertas_generadas: 5, metrica_label: 'Canales monitoreados', metrica_valor: '487' },
  { nombre: 'News Crawler', tipo: 'Noticias', activa: true, ultimo_scan: '08:39:28', alertas_generadas: 3, metrica_label: 'Artículos analizados', metrica_valor: '1,842' },
  { nombre: 'Deep Web Scanner', tipo: 'Deep Web Monitor', activa: true, ultimo_scan: '08:35:17', alertas_generadas: 2, metrica_label: 'Señales detectadas', metrica_valor: '18' },
  { nombre: 'Instagram Tracker', tipo: 'Instagram', activa: true, ultimo_scan: '08:37:44', alertas_generadas: 4, metrica_label: 'Cuentas rastreadas', metrica_valor: '1,290' },
  { nombre: 'WhatsApp Intel', tipo: 'WhatsApp', activa: false, ultimo_scan: '07:15:00', alertas_generadas: 1, metrica_label: 'Grupos monitoreados', metrica_valor: '56' },
]

// ── Historial de alertas ─────────────────────

export const historialAlertas: AlertaHistorial[] = [
  { id: 'AL-001', timestamp: '11.FEB 08:38', tipo: 'amenaza_directa', severidad: 9, descripcion: 'Amenaza directa detectada en Twitter/X contra candidato', accion_tomada: 'Escalada a equipo de seguridad física', resuelto: false },
  { id: 'AL-002', timestamp: '11.FEB 08:22', tipo: 'coordinacion_hostil', severidad: 8, descripcion: 'Red de bots detectada en Telegram preparando ataque coordinado', accion_tomada: 'Equipo de monitoreo asignado', resuelto: false },
  { id: 'AL-003', timestamp: '11.FEB 07:55', tipo: 'desinformacion', severidad: 7, descripcion: 'Artículo fabricado con dominio clonado detectado', accion_tomada: 'Reporte enviado a Facebook', resuelto: false },
  { id: 'AL-004', timestamp: '11.FEB 07:31', tipo: 'desinformacion', severidad: 8, descripcion: 'Video deepfake en TikTok con 234K views', accion_tomada: 'Solicitud de remoción enviada', resuelto: false },
  { id: 'AL-005', timestamp: '11.FEB 06:48', tipo: 'doxing', severidad: 9, descripcion: 'Datos personales del equipo filtrados en Twitter', accion_tomada: 'Escalada + notificación a afectados', resuelto: false },
  { id: 'AL-006', timestamp: '11.FEB 06:15', tipo: 'discurso_odio', severidad: 6, descripcion: 'Stories con contenido de odio en Instagram', accion_tomada: 'Reporte enviado', resuelto: false },
  { id: 'AL-007', timestamp: '11.FEB 05:42', tipo: 'incitacion', severidad: 8, descripcion: 'Video incitando protestas violentas en YouTube', accion_tomada: 'Reporte + alerta a logística', resuelto: false },
  { id: 'AL-008', timestamp: '11.FEB 04:58', tipo: 'coordinacion_hostil', severidad: 5, descripcion: 'Thread coordinando brigading en Reddit', accion_tomada: 'Monitoreo activo', resuelto: false },
  { id: 'AL-009', timestamp: '11.FEB 03:20', tipo: 'amenaza_directa', severidad: 10, descripcion: 'Amenaza en deep web con detalles operativos', accion_tomada: 'ESCALADA A AUTORIDADES', resuelto: false },
  { id: 'AL-010', timestamp: '11.FEB 02:45', tipo: 'desinformacion', severidad: 6, descripcion: 'Cadena de WhatsApp con audio manipulado', accion_tomada: 'Desmentido preparado', resuelto: false },
  { id: 'AL-011', timestamp: '10.FEB 23:18', tipo: 'discurso_odio', severidad: 7, descripcion: 'Hashtag trending con contenido de odio coordinado', accion_tomada: 'Contracampaña activada', resuelto: true },
  { id: 'AL-012', timestamp: '10.FEB 21:05', tipo: 'incitacion', severidad: 5, descripcion: 'Evento de Facebook convocando protesta en oficinas', accion_tomada: 'Seguridad de oficinas alertada', resuelto: true },
  { id: 'AL-013', timestamp: '10.FEB 19:30', tipo: 'desinformacion', severidad: 7, descripcion: 'Compilación engañosa en TikTok con 1.2M views', accion_tomada: 'Video respuesta publicado', resuelto: true },
  { id: 'AL-014', timestamp: '10.FEB 17:15', tipo: 'doxing', severidad: 9, descripcion: 'Filtración de agenda del candidato en Telegram', accion_tomada: 'Agenda modificada + investigación interna', resuelto: true },
  { id: 'AL-015', timestamp: '10.FEB 14:42', tipo: 'coordinacion_hostil', severidad: 6, descripcion: 'Red de 200+ cuentas fake en Instagram', accion_tomada: 'Documentada y reportada', resuelto: true },
  { id: 'AL-016', timestamp: '10.FEB 12:30', tipo: 'desinformacion', severidad: 5, descripcion: 'Meme viral con información falsa sobre salud', accion_tomada: 'Desmentido difundido', resuelto: true },
  { id: 'AL-017', timestamp: '10.FEB 10:15', tipo: 'amenaza_directa', severidad: 7, descripcion: 'Amenaza anónima contra evento en Puebla', accion_tomada: 'Seguridad reforzada', resuelto: true },
  { id: 'AL-018', timestamp: '10.FEB 08:00', tipo: 'coordinacion_hostil', severidad: 6, descripcion: 'Campaña de spam detectada en comments de YouTube', accion_tomada: 'Reportada y filtrada', resuelto: true },
  { id: 'AL-019', timestamp: '09.FEB 22:45', tipo: 'discurso_odio', severidad: 8, descripcion: 'Video con discurso de odio racial con 500K views', accion_tomada: 'Remoción exitosa + denuncia', resuelto: true },
  { id: 'AL-020', timestamp: '09.FEB 19:20', tipo: 'incitacion', severidad: 4, descripcion: 'Posts incitando boicot a evento comercial del candidato', accion_tomada: 'Monitoreo. Sin acción requerida.', resuelto: true },
]

// ── Tendencia de hostilidad por hora ─────────

export const tendenciaHostilidad24h = {
  horas: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
  twitter: [120, 85, 45, 80, 62, 78, 145, 280, 420, 380, 310, 290, 340, 320, 280, 310, 350, 420, 480, 510, 440, 380, 280, 190],
  facebook: [60, 42, 28, 15, 12, 18, 45, 110, 180, 210, 190, 175, 200, 195, 170, 160, 180, 220, 250, 230, 195, 160, 120, 80],
  tiktok: [90, 78, 55, 40, 35, 30, 50, 85, 120, 140, 160, 180, 200, 190, 170, 180, 210, 280, 350, 380, 340, 290, 210, 140],
  telegram: [30, 25, 40, 55, 20, 15, 22, 45, 60, 55, 50, 48, 52, 50, 45, 42, 48, 55, 62, 58, 52, 45, 38, 32],
  umbral: 300,
}

// ── Informes historial ───────────────────────

export const informesHistorial: InformeHistorial[] = [
  { id: 'INF-001', fecha: '11.FEB.2026', tipo: 'Resumen Diario', generado_por: 'Sistema Automático', destinatarios: 'Dir. Campaña, Jefe Seguridad' },
  { id: 'INF-002', fecha: '10.FEB.2026', tipo: 'Resumen Diario', generado_por: 'Sistema Automático', destinatarios: 'Dir. Campaña, Jefe Seguridad' },
  { id: 'INF-003', fecha: '10.FEB.2026', tipo: 'Análisis Regional', generado_por: 'Analista: M. Torres', destinatarios: 'Dir. Campaña' },
  { id: 'INF-004', fecha: '09.FEB.2026', tipo: 'Brief Ejecutivo', generado_por: 'Sistema Automático', destinatarios: 'Candidato, Dir. Campaña' },
  { id: 'INF-005', fecha: '09.FEB.2026', tipo: 'Resumen Diario', generado_por: 'Sistema Automático', destinatarios: 'Dir. Campaña, Jefe Seguridad' },
  { id: 'INF-006', fecha: '08.FEB.2026', tipo: 'Tendencias Semanal', generado_por: 'Analista: R. García', destinatarios: 'Equipo Completo' },
  { id: 'INF-007', fecha: '08.FEB.2026', tipo: 'Informe Técnico', generado_por: 'Analista: M. Torres', destinatarios: 'Jefe Seguridad, TI' },
  { id: 'INF-008', fecha: '07.FEB.2026', tipo: 'Resumen Diario', generado_por: 'Sistema Automático', destinatarios: 'Dir. Campaña, Jefe Seguridad' },
]

// ── Helper: color por severidad ──────────────

export function getSeverityColor(sev: number): string {
  if (sev >= 9) return '#ff4444'
  if (sev >= 7) return '#ff6b35'
  if (sev >= 4) return '#ffcc00'
  return '#4A90E2'
}

export function getSeverityBadge(sev: number): string {
  if (sev >= 9) return 'danger'
  if (sev >= 7) return 'high'
  if (sev >= 4) return 'warning'
  return 'info'
}

export function getThreatTypeLabel(tipo: ThreatType): string {
  const map: Record<ThreatType, string> = {
    'discurso_odio': 'DISCURSO DE ODIO',
    'amenaza_directa': 'AMENAZA DIRECTA',
    'desinformacion': 'DESINFORMACIÓN',
    'coordinacion_hostil': 'COORDINACIÓN HOSTIL',
    'doxing': 'DOXING',
    'incitacion': 'INCITACIÓN',
  }
  return map[tipo]
}

export function getThreatStatusLabel(estado: ThreatStatus): string {
  const map: Record<ThreatStatus, string> = {
    'nueva': 'NUEVA',
    'en_revision': 'EN REVISIÓN',
    'escalada': 'ESCALADA',
    'resuelta': 'RESUELTA',
  }
  return map[estado]
}

export function getStatusBadge(estado: ThreatStatus): string {
  const map: Record<ThreatStatus, string> = {
    'nueva': 'warning',
    'en_revision': 'info',
    'escalada': 'danger',
    'resuelta': 'success',
  }
  return map[estado]
}

export function getNivelColor(nivel: ThreatLevel): string {
  const map: Record<ThreatLevel, string> = {
    'bajo': '#4A90E2',
    'medio': '#ffcc00',
    'alto': '#ff6b35',
    'crítico': '#ff4444',
  }
  return map[nivel]
}

// ── Stats derivadas ──────────────────────────

export function getBlindajeStats() {
  const activas = amenazas.filter(a => a.estado !== 'resuelta')
  const criticas = activas.filter(a => a.severidad >= 9)
  const altas = activas.filter(a => a.severidad >= 7 && a.severidad < 9)
  const medias = activas.filter(a => a.severidad >= 4 && a.severidad < 7)
  const alcanceTotal = amenazas.filter(a => a.estado !== 'resuelta').reduce((sum, a) => sum + a.alcance, 0)
  const fuentesActivas = fuentesIntel.filter(f => f.activa).length

  return {
    amenazasActivas: activas.length,
    criticas: criticas.length,
    altas: altas.length,
    medias: medias.length,
    alcanceHostil: alcanceTotal,
    fuentesActivas,
    fuentesTotal: fuentesIntel.length,
  }
}
