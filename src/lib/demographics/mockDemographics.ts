/**
 * State-Aware Demographic Mock Data Generator
 * 
 * TODO: Backend Integration
 * Replace this entire file with API calls when backend is ready
 * Endpoint: GET /v1/analytics/${stateId}/demographics
 * Response format: DemographicData
 * 
 * This generator produces deterministic demographic data based on state ID
 * to simulate backend behavior during frontend development.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface DemographicAge {
    grupo: string
    porcentaje: number
    total: number
}

export interface DemographicNSE {
    nivel: string
    porcentaje: number
    color: string
}

export interface DemographicGender {
    genero: string
    porcentaje: number
    total: number
}

export interface DemographicData {
    edad: DemographicAge[]
    nse: DemographicNSE[]
    genero: DemographicGender[]
}

// ============================================
// DETERMINISTIC HASH FUNCTION
// ============================================

/**
 * Simple hash function to generate deterministic seed from state ID
 * Same state ID always produces same seed
 */
function hashStateId(stateId: string): number {
    let hash = 0
    for (let i = 0; i < stateId.length; i++) {
        const char = stateId.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
}

/**
 * Seeded pseudo-random number generator
 * Returns number between 0 and 1
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
 * Generate age distribution for a state
 * Produces realistic age brackets with deterministic variation
 */
function generateAgeDistribution(seed: number): DemographicAge[] {
    const random = seededRandom(seed)

    // Base population (varies by state)
    const basePopulation = 2000000 + (seed % 3000000)

    // Generate percentages that sum to 100
    const raw = [
        15 + random() * 10,  // 18-24
        20 + random() * 8,   // 25-34
        18 + random() * 8,   // 35-44
        16 + random() * 6,   // 45-54
        12 + random() * 6,   // 55-64
        10 + random() * 5    // 65+
    ]

    const sum = raw.reduce((a, b) => a + b, 0)
    const percentages = raw.map(v => Math.round((v / sum) * 100))

    // Adjust to ensure sum is exactly 100
    const diff = 100 - percentages.reduce((a, b) => a + b, 0)
    percentages[0] += diff

    const groups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']

    return groups.map((grupo, i) => ({
        grupo,
        porcentaje: percentages[i],
        total: Math.round((percentages[i] / 100) * basePopulation)
    }))
}

/**
 * Generate socioeconomic level distribution
 * NSE levels with colors matching UI design
 */
function generateNSEDistribution(seed: number): DemographicNSE[] {
    const random = seededRandom(seed + 1000)

    // Generate percentages that sum to 100
    const raw = [
        8 + random() * 8,    // A/B (Alto)
        15 + random() * 10,  // C+ (Medio Alto)
        22 + random() * 10,  // C (Medio)
        25 + random() * 8,   // D+ (Medio Bajo)
        15 + random() * 8    // D/E (Bajo)
    ]

    const sum = raw.reduce((a, b) => a + b, 0)
    const percentages = raw.map(v => Math.round((v / sum) * 100))

    // Adjust to ensure sum is exactly 100
    const diff = 100 - percentages.reduce((a, b) => a + b, 0)
    percentages[2] += diff

    return [
        { nivel: 'A/B (Alto)', porcentaje: percentages[0], color: '#10b981' },
        { nivel: 'C+ (Medio Alto)', porcentaje: percentages[1], color: '#3b82f6' },
        { nivel: 'C (Medio)', porcentaje: percentages[2], color: '#6366f1' },
        { nivel: 'D+ (Medio Bajo)', porcentaje: percentages[3], color: '#f59e0b' },
        { nivel: 'D/E (Bajo)', porcentaje: percentages[4], color: '#ef4444' }
    ]
}

/**
 * Generate gender distribution
 * Realistic split with slight variation per state
 */
function generateGenderDistribution(seed: number): DemographicGender[] {
    const random = seededRandom(seed + 2000)

    // Base population
    const basePopulation = 2000000 + (seed % 3000000)

    // Women typically 50-52%, men 48-50%
    const womenPercent = Math.round(50 + random() * 2)
    const menPercent = 100 - womenPercent

    return [
        {
            genero: 'Mujeres',
            porcentaje: womenPercent,
            total: Math.round((womenPercent / 100) * basePopulation)
        },
        {
            genero: 'Hombres',
            porcentaje: menPercent,
            total: Math.round((menPercent / 100) * basePopulation)
        }
    ]
}

// ============================================
// MAIN EXPORT
// ============================================

/**
 * Generate complete demographic data for a state
 * 
 * @param stateId - State identifier (e.g., 'JAL', 'NL', 'CDMX')
 * @returns Complete demographic dataset
 * 
 * TODO: Replace with API call
 * const response = await fetch(`/v1/analytics/${stateId}/demographics`)
 * return await response.json()
 */
export function generateDemographicsForState(stateId: string): DemographicData {
    const seed = hashStateId(stateId)

    return {
        edad: generateAgeDistribution(seed),
        nse: generateNSEDistribution(seed),
        genero: generateGenderDistribution(seed)
    }
}
