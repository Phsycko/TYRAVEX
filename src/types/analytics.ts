/**
 * Analytics Module Types
 * Tipos para el módulo de Analytics - Inteligencia Geográfica
 * 
 * Sistema tipo Palantir: acceso controlado por cliente y módulos contratados
 */

// ============================================
// CORE TYPES
// ============================================

// Estado de México con ID normalizado (INEGI-style)
export interface State {
    id: string          // Clave INEGI o identificador único (ej: "NL", "JAL", "CDMX")
    name: string        // Nombre completo del estado
    code?: string       // Código postal o abreviatura opcional
}

// Opción para el dropdown de estados
export interface StateOption {
    value: string       // ID del estado (usado como value en el select)
    label: string       // Nombre mostrado en el dropdown
}

// Nivel territorial para navegación breadcrumb
export type TerritorialLevel = 'country' | 'state' | 'municipality'

// Tipo de municipio (México tiene municipios y alcaldías)
export type MunicipalityType = 'municipio' | 'alcaldia'

// Nivel de riesgo político
export type PoliticalRisk = 'bajo' | 'medio' | 'alto'

// Tendencia electoral
export type ElectoralTrend = 'up' | 'down' | 'stable'

// Municipio con métricas electorales
export interface Municipality {
    id: string                      // ID único del municipio
    name: string                    // Nombre del municipio
    stateId: string                 // ID del estado al que pertenece
    type: MunicipalityType          // Tipo: municipio o alcaldía
    fuerzaElectoral: number         // Fuerza electoral (0-100)
    riesgoPolitico: PoliticalRisk   // Nivel de riesgo político
    tendencia: ElectoralTrend       // Tendencia electoral
    isLocked: boolean               // Control de acceso simulado (premium)
    poblacion?: number              // Población (opcional)
    lat?: number                    // Latitud (opcional, para mapas futuros)
    lng?: number                    // Longitud (opcional, para mapas futuros)
}

// ============================================
// MODULE PERMISSIONS & ACCESS CONTROL
// ============================================

// Identificadores de módulos de Analytics
export type AnalyticsModuleKey =
    | 'electoral_map'      // Mapa Electoral
    | 'demographics'       // Demografía
    | 'historical'         // Histórico
    | 'micro_targeting'    // Micro-Targeting

// Configuración de permisos por módulo
export type ModulePermissions = Record<AnalyticsModuleKey, boolean>

// Configuración del cliente (recibida del backend)
export interface ClientConfig {
    clientId: string                    // ID único del cliente
    enabledStates: string[]             // IDs de estados habilitados
    enabledModules: AnalyticsModuleKey[] // Módulos contratados
}

// ============================================
// ANALYTICS CONTEXT
// ============================================

// Contexto global de Analytics (provide/inject)
export interface AnalyticsContext {
    selectedState: State | null                          // Estado actualmente seleccionado
    selectedMunicipality: Municipality | null            // Municipio actualmente seleccionado
    enabledStates: State[]                               // Estados disponibles para el cliente
    enabledModules: ModulePermissions                    // Mapa de módulos habilitados
    setSelectedState: (state: State | null) => void      // Cambiar estado seleccionado
    setSelectedMunicipality: (municipality: Municipality | null) => void // Cambiar municipio seleccionado
    isModuleEnabled: (module: AnalyticsModuleKey) => boolean // Verificar si módulo está habilitado
}

// ============================================
// ESTADOS DE MÉXICO (32 ESTADOS)
// ============================================

export const MEXICO_STATES: State[] = [
    { id: 'AGS', name: 'Aguascalientes' },
    { id: 'BC', name: 'Baja California' },
    { id: 'BCS', name: 'Baja California Sur' },
    { id: 'CAM', name: 'Campeche' },
    { id: 'CHIS', name: 'Chiapas' },
    { id: 'CHIH', name: 'Chihuahua' },
    { id: 'CDMX', name: 'Ciudad de México' },
    { id: 'COAH', name: 'Coahuila' },
    { id: 'COL', name: 'Colima' },
    { id: 'DGO', name: 'Durango' },
    { id: 'GTO', name: 'Guanajuato' },
    { id: 'GRO', name: 'Guerrero' },
    { id: 'HGO', name: 'Hidalgo' },
    { id: 'JAL', name: 'Jalisco' },
    { id: 'MEX', name: 'México' },
    { id: 'MICH', name: 'Michoacán' },
    { id: 'MOR', name: 'Morelos' },
    { id: 'NAY', name: 'Nayarit' },
    { id: 'NL', name: 'Nuevo León' },
    { id: 'OAX', name: 'Oaxaca' },
    { id: 'PUE', name: 'Puebla' },
    { id: 'QRO', name: 'Querétaro' },
    { id: 'QROO', name: 'Quintana Roo' },
    { id: 'SLP', name: 'San Luis Potosí' },
    { id: 'SIN', name: 'Sinaloa' },
    { id: 'SON', name: 'Sonora' },
    { id: 'TAB', name: 'Tabasco' },
    { id: 'TAM', name: 'Tamaulipas' },
    { id: 'TLAX', name: 'Tlaxcala' },
    { id: 'VER', name: 'Veracruz' },
    { id: 'YUC', name: 'Yucatán' },
    { id: 'ZAC', name: 'Zacatecas' }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Convertir lista de IDs a objetos State
export function getStatesByIds(ids: string[]): State[] {
    return MEXICO_STATES.filter(state => ids.includes(state.id))
}

// Convertir lista de módulos a mapa de permisos
export function createModulePermissions(enabledModules: AnalyticsModuleKey[]): ModulePermissions {
    return {
        electoral_map: enabledModules.includes('electoral_map'),
        demographics: enabledModules.includes('demographics'),
        historical: enabledModules.includes('historical'),
        micro_targeting: enabledModules.includes('micro_targeting')
    }
}
