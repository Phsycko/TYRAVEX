/**
 * State-Aware Historical Election Data Generator
 * 
 * TODO: Backend Integration
 * Replace this entire file with API calls when backend is ready
 * Endpoint: GET /v1/analytics/${stateId}/historical
 * Response format: HistoricalRow[]
 * 
 * This generator produces deterministic historical election data based on state ID
 * to simulate backend behavior during frontend development.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HistoricalRow {
    seccion: string
    municipio: string
    ano2018: number
    ano2021: number
    ano2024: number
    tendencia: 'up' | 'down'
}

// ============================================
// MUNICIPALITY MAPPINGS BY STATE
// ============================================

const STATE_MUNICIPALITIES: Record<string, string[]> = {
    // Jalisco
    JAL: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Tlajomulco', 'Puerto Vallarta', 'Lagos de Moreno', 'Tepatitlán'],

    // Nuevo León
    NL: ['Monterrey', 'San Pedro Garza García', 'Guadalupe', 'Apodaca', 'San Nicolás', 'Escobedo', 'Santa Catarina', 'García'],

    // Ciudad de México (Alcaldías)
    CDMX: ['Cuauhtémoc', 'Miguel Hidalgo', 'Benito Juárez', 'Coyoacán', 'Iztapalapa', 'Tlalpan', 'Álvaro Obregón', 'Gustavo A. Madero'],

    // Chihuahua
    CHIH: ['Chihuahua', 'Juárez', 'Cuauhtémoc', 'Delicias', 'Parral', 'Nuevo Casas Grandes', 'Camargo', 'Jiménez'],

    // Estado de México
    MEX: ['Ecatepec', 'Nezahualcóyotl', 'Naucalpan', 'Tlalnepantla', 'Toluca', 'Chimalhuacán', 'Atizapán', 'Cuautitlán Izcalli'],

    // Veracruz
    VER: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Poza Rica', 'Córdoba', 'Boca del Río', 'Minatitlán', 'Orizaba'],

    // Puebla
    PUE: ['Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco', 'Cholula', 'Teziutlán', 'Cuautlancingo', 'Amozoc'],

    // Guanajuato
    GTO: ['León', 'Irapuato', 'Celaya', 'Salamanca', 'Guanajuato', 'San Miguel de Allende', 'Silao', 'Pénjamo'],

    // Tamaulipas
    TAM: ['Reynosa', 'Matamoros', 'Nuevo Laredo', 'Tampico', 'Victoria', 'Altamira', 'Madero', 'Mante'],

    // Sonora
    SON: ['Hermosillo', 'Cajeme', 'Nogales', 'San Luis Río Colorado', 'Navojoa', 'Guaymas', 'Agua Prieta', 'Caborca']
}

// Default municipalities for states not in the mapping
const DEFAULT_MUNICIPALITIES = [
    'Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Urbano', 'Rural', 'Periférico'
]

// ============================================
// DETERMINISTIC HASH FUNCTION
// ============================================

/**
 * Simple hash function to generate deterministic seed from state ID
 */
function hashStateId(stateId: string): number {
    let hash = 0
    for (let i = 0; i < stateId.length; i++) {
        const char = stateId.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash)
}

/**
 * Seeded pseudo-random number generator
 */
function seededRandom(seed: number): () => number {
    let current = seed
    return () => {
        current = (current * 9301 + 49297) % 233280
        return current / 233280
    }
}

// ============================================
// DATA GENERATORS
// ============================================

/**
 * Get municipalities for a given state
 */
function getMunicipalitiesForState(stateId: string): string[] {
    return STATE_MUNICIPALITIES[stateId] || DEFAULT_MUNICIPALITIES
}

/**
 * Generate a single historical row
 */
function generateRow(
    seccion: string,
    municipio: string,
    random: () => number
): HistoricalRow {
    // Base percentage for 2018 (25-65%)
    const base2018 = 25 + random() * 40

    // 2021: variation ±8% from 2018
    const variation2021 = (random() - 0.5) * 16
    const ano2021 = Math.max(20, Math.min(70, base2018 + variation2021))

    // 2024: variation ±8% from 2021
    const variation2024 = (random() - 0.5) * 16
    const ano2024 = Math.max(20, Math.min(70, ano2021 + variation2024))

    // Determine trend
    const tendencia = ano2024 > base2018 ? 'up' : 'down'

    return {
        seccion,
        municipio,
        ano2018: Number(base2018.toFixed(1)),
        ano2021: Number(ano2021.toFixed(1)),
        ano2024: Number(ano2024.toFixed(1)),
        tendencia
    }
}

/**
 * Generate all historical rows for a state
 */
function generateRows(
    municipalities: string[],
    seed: number,
    rowCount: number
): HistoricalRow[] {
    const random = seededRandom(seed)
    const rows: HistoricalRow[] = []

    let seccionCounter = 1

    // Distribute rows across municipalities
    for (let i = 0; i < rowCount; i++) {
        const municipio = municipalities[i % municipalities.length] || 'Desconocido'
        const seccion = String(seccionCounter).padStart(4, '0')

        rows.push(generateRow(seccion, municipio, random))
        seccionCounter++
    }

    return rows
}

// ============================================
// MAIN EXPORT
// ============================================

/**
 * Generate complete historical election data for a state
 * 
 * @param stateId - State identifier (e.g., 'JAL', 'NL', 'CDMX')
 * @returns Array of historical election results by section
 * 
 * TODO: Replace with API call
 * const response = await fetch(`/v1/analytics/${stateId}/historical`)
 * return await response.json()
 */
export function generateHistoricalForState(stateId: string): HistoricalRow[] {
    const seed = hashStateId(stateId)

    // Generate 15-25 rows per state (varies by state)
    const rowCount = 15 + (seed % 11)

    // Get municipalities for this state
    const municipalities = getMunicipalitiesForState(stateId)

    return generateRows(municipalities, seed, rowCount)
}

// ============================================
// HIERARCHICAL FILTER HELPERS
// ============================================

/**
 * Get unique municipalities for a state (for dropdown population)
 * Returns ALL municipalities for the state, not just those with data
 * 
 * TODO: Replace with API call
 * GET /v1/analytics/${stateId}/historical/municipios
 * Response: string[]
 */
export function getMunicipalitiesForDropdown(stateId: string): string[] {
    // Return ALL municipalities for the state from the mapping
    // This ensures the dropdown shows all available options
    return STATE_MUNICIPALITIES[stateId] || DEFAULT_MUNICIPALITIES
}

/**
 * Get unique secciones for a specific municipality (for dropdown population)
 * 
 * TODO: Replace with API call
 * GET /v1/analytics/${stateId}/historical/${municipio}/secciones
 * Response: string[]
 */
export function getSeccionesForMunicipio(stateId: string, municipio: string): string[] {
    const allRows = generateHistoricalForState(stateId)
    const secciones = allRows
        .filter(row => row.municipio === municipio)
        .map(row => row.seccion)

    // Return unique secciones, sorted
    return Array.from(new Set(secciones)).sort()
}

/**
 * Get filtered historical data based on hierarchical selections
 * 
 * TODO: Replace with API call
 * GET /v1/analytics/${stateId}/historical/results?municipio=X&seccion=Y
 * Response: HistoricalRow[]
 */
export function getFilteredHistoricalData(
    stateId: string,
    municipio?: string,
    seccion?: string
): HistoricalRow[] {
    let rows = generateHistoricalForState(stateId)

    // Filter by municipio if selected
    if (municipio) {
        rows = rows.filter(row => row.municipio === municipio)
    }

    // Filter by seccion if selected
    if (seccion) {
        rows = rows.filter(row => row.seccion === seccion)
    }

    return rows
}
