/**
 * Municipality Mock Data Generator
 * Genera datos mock de municipios para cada estado de México
 * 
 * NOTA: Este es un generador de datos MOCK para desarrollo.
 * En producción, estos datos vendrán del backend.
 */

import type { Municipality, PoliticalRisk, ElectoralTrend } from '@/types/analytics'

// ============================================
// REAL MUNICIPALITY NAMES BY STATE
// ============================================

// Municipios reales para estados principales
const REAL_MUNICIPALITIES: Record<string, string[]> = {
    'NL': [
        'Monterrey', 'San Pedro Garza García', 'Guadalupe', 'Apodaca',
        'San Nicolás de los Garza', 'General Escobedo', 'Santa Catarina',
        'Juárez', 'García', 'Cadereyta Jiménez', 'Santiago', 'Salinas Victoria'
    ],
    'CDMX': [
        'Benito Juárez', 'Miguel Hidalgo', 'Cuauhtémoc', 'Coyoacán',
        'Álvaro Obregón', 'Tlalpan', 'Iztapalapa', 'Gustavo A. Madero',
        'Azcapotzalco', 'Venustiano Carranza', 'Iztacalco', 'Magdalena Contreras',
        'Cuajimalpa', 'Tláhuac', 'Xochimilco', 'Milpa Alta'
    ],
    'JAL': [
        'Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá',
        'Tlajomulco de Zúñiga', 'El Salto', 'Puerto Vallarta', 'Lagos de Moreno',
        'Tepatitlán', 'Chapala', 'Arandas', 'Tequila'
    ],
    'MEX': [
        'Toluca', 'Ecatepec', 'Naucalpan', 'Nezahualcóyotl',
        'Tlalnepantla', 'Atizapán de Zaragoza', 'Cuautitlán Izcalli', 'Chimalhuacán',
        'Metepec', 'Texcoco', 'Ixtapaluca', 'Valle de Chalco'
    ],
    'GTO': [
        'León', 'Irapuato', 'Celaya', 'Salamanca',
        'Guanajuato', 'San Miguel de Allende', 'Silao', 'Pénjamo',
        'San Francisco del Rincón', 'Dolores Hidalgo', 'Cortazar', 'Acámbaro'
    ],
    'PUE': [
        'Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco',
        'San Pedro Cholula', 'Teziutlán', 'Cuautlancingo', 'Amozoc',
        'Huauchinango', 'Zacatlán', 'San Andrés Cholula', 'Izúcar de Matamoros'
    ],
    'VER': [
        'Veracruz', 'Xalapa', 'Coatzacoalcos', 'Córdoba',
        'Poza Rica', 'Boca del Río', 'Minatitlán', 'Orizaba',
        'Tuxpan', 'Papantla', 'Martínez de la Torre', 'San Andrés Tuxtla'
    ],
    'CHIH': [
        'Chihuahua', 'Ciudad Juárez', 'Cuauhtémoc', 'Delicias',
        'Parral', 'Nuevo Casas Grandes', 'Camargo', 'Jiménez',
        'Meoqui', 'Ojinaga', 'Bocoyna', 'Guachochi'
    ]
}

// Nombres genéricos para estados sin lista específica
const GENERIC_MUNICIPALITY_NAMES = [
    'Centro', 'Norte', 'Sur', 'Este', 'Oeste',
    'San Juan', 'San Pedro', 'Santa María', 'Villa de',
    'Ciudad de', 'Municipio A', 'Municipio B', 'Municipio C'
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generar número aleatorio en rango
function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generar fuerza electoral (0-100)
function generateFuerzaElectoral(): number {
    // Distribución más realista: mayoría entre 35-65%
    const base = randomInRange(35, 65)
    const variance = randomInRange(-10, 10)
    return Math.max(20, Math.min(85, base + variance))
}

// Determinar riesgo político basado en fuerza electoral
function calculateRiesgoPolitico(fuerza: number): PoliticalRisk {
    if (fuerza > 60) return 'bajo'
    if (fuerza > 40) return 'medio'
    return 'alto'
}

// Determinar tendencia electoral
function generateTendencia(): ElectoralTrend {
    const rand = Math.random()
    if (rand < 0.4) return 'stable'
    if (rand < 0.7) return 'up'
    return 'down'
}

// Determinar si el municipio está bloqueado (50% de probabilidad)
function isLocked(): boolean {
    return Math.random() < 0.5
}

// Generar población realista
function generatePoblacion(): number {
    // Rango: 10,000 - 500,000 habitantes
    return randomInRange(10000, 500000)
}

// ============================================
// MAIN GENERATOR FUNCTION
// ============================================

/**
 * Obtiene la lista de municipios para un estado específico
 * @param stateId - ID del estado (ej: "NL", "CDMX", "JAL")
 * @returns Array de municipios con datos mock
 */
export function getMunicipalitiesByState(stateId: string): Municipality[] {
    // Obtener nombres de municipios (reales o genéricos)
    const municipalityNames = REAL_MUNICIPALITIES[stateId] ||
        GENERIC_MUNICIPALITY_NAMES.slice(0, randomInRange(8, 12))

    // Determinar tipo de municipio (CDMX tiene alcaldías, otros tienen municipios)
    const municipalityType = stateId === 'CDMX' ? 'alcaldia' : 'municipio'

    // Generar municipios
    return municipalityNames.map((name, index) => {
        const fuerza = generateFuerzaElectoral()

        return {
            id: `${stateId}-MUN-${String(index + 1).padStart(3, '0')}`,
            name,
            stateId,
            type: municipalityType,
            fuerzaElectoral: fuerza,
            riesgoPolitico: calculateRiesgoPolitico(fuerza),
            tendencia: generateTendencia(),
            isLocked: isLocked(),
            poblacion: generatePoblacion(),
            // Coordenadas mock (no se usan por ahora, pero preparadas para mapas futuros)
            lat: 19 + Math.random() * 12, // Rango aproximado de México
            lng: -90 - Math.random() * 25
        }
    })
}

/**
 * Obtiene todos los municipios de México (todos los estados)
 * @returns Record con municipios agrupados por estado
 */
export function getAllMunicipalities(): Record<string, Municipality[]> {
    const allStates = [
        'AGS', 'BC', 'BCS', 'CAM', 'CHIS', 'CHIH', 'CDMX', 'COAH', 'COL', 'DGO',
        'GTO', 'GRO', 'HGO', 'JAL', 'MEX', 'MICH', 'MOR', 'NAY', 'NL', 'OAX',
        'PUE', 'QRO', 'QROO', 'SLP', 'SIN', 'SON', 'TAB', 'TAM', 'TLAX', 'VER',
        'YUC', 'ZAC'
    ]

    const result: Record<string, Municipality[]> = {}

    allStates.forEach(stateId => {
        result[stateId] = getMunicipalitiesByState(stateId)
    })

    return result
}

/**
 * Busca un municipio por ID
 * @param municipalityId - ID del municipio
 * @returns Municipio encontrado o null
 */
export function getMunicipalityById(municipalityId: string): Municipality | null {
    const [stateId] = municipalityId.split('-')
    const municipalities = getMunicipalitiesByState(stateId)
    return municipalities.find(m => m.id === municipalityId) || null
}

// ============================================
// BACKEND INTEGRATION POINTS
// ============================================

/**
 * TODO: Backend integration
 * 
 * Cuando se conecte al backend, reemplazar estas funciones con llamadas API:
 * 
 * 1. GET /v1/analytics/states/{stateId}/municipalities
 *    - Retorna: Municipality[]
 *    - Reemplaza: getMunicipalitiesByState()
 * 
 * 2. GET /v1/analytics/municipalities/{municipalityId}
 *    - Retorna: Municipality
 *    - Reemplaza: getMunicipalityById()
 * 
 * 3. GET /v1/analytics/municipalities
 *    - Retorna: Record<string, Municipality[]>
 *    - Reemplaza: getAllMunicipalities()
 * 
 * El campo `isLocked` debe venir del backend basado en:
 * - Permisos del cliente
 * - Módulos contratados
 * - Nivel de acceso territorial
 */
