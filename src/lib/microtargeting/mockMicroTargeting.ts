/**
 * State-Aware Micro-Targeting Segment Generator
 * 
 * TODO: Backend Integration
 * Replace this entire file with API calls when backend is ready
 * Endpoint: GET /v1/analytics/${stateId}/micro-targeting/segments?municipio=X&seccion=Y
 * Response format: MicroTargetingSegment[]
 * 
 * Permissions endpoint: GET /v1/user/permissions/segments
 * Response: { unlockedSegmentIds: string[] }
 * 
 * This generator produces deterministic segment data with geographic scoping
 * and permission-based locking to simulate backend behavior.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface MicroTargetingSegment {
    id: string
    nombre: string
    descripcion: string
    tamano: number
    potencial: 'Alto' | 'Medio' | 'Bajo'
    mensajeSugerido: string
    locked: boolean
}

// ============================================
// SEGMENT CATALOG
// ============================================

interface SegmentDefinition {
    id: string
    nombre: string
    descripcion: string
    baseSize: number
    potencial: 'Alto' | 'Medio' | 'Bajo'
    mensajeSugerido: string
    requiredModule: string | null  // null = always unlocked
}

const SEGMENT_CATALOG: SegmentDefinition[] = [
    {
        id: '1',
        nombre: 'Jóvenes Profesionistas',
        descripcion: 'Edad 25-35, NSE C+, Urbano',
        baseSize: 185000,
        potencial: 'Alto',
        mensajeSugerido: 'Enfocarse en empleo y oportunidades de crecimiento',
        requiredModule: null  // Always unlocked
    },
    {
        id: '2',
        nombre: 'Madres de Familia',
        descripcion: 'Edad 30-45, Con hijos, NSE C/D+',
        baseSize: 142000,
        potencial: 'Alto',
        mensajeSugerido: 'Seguridad, educación y servicios de salud',
        requiredModule: null  // Always unlocked
    },
    {
        id: '3',
        nombre: 'Adultos Mayores',
        descripcion: 'Edad 60+, Pensionados',
        baseSize: 98000,
        potencial: 'Medio',
        mensajeSugerido: 'Pensiones, salud y tranquilidad',
        requiredModule: 'micro_targeting'  // Requires module
    },
    {
        id: '4',
        nombre: 'Empresarios PYMES',
        descripcion: 'Dueños de negocios pequeños',
        baseSize: 45000,
        potencial: 'Medio',
        mensajeSugerido: 'Reducción de trámites y apoyo a PYMES',
        requiredModule: 'micro_targeting'  // Requires module
    },
    {
        id: '5',
        nombre: 'Estudiantes Universitarios',
        descripcion: 'Edad 18-24, Educación superior',
        baseSize: 78000,
        potencial: 'Alto',
        mensajeSugerido: 'Becas, transporte y oportunidades laborales',
        requiredModule: 'micro_targeting'  // Requires module
    },
    {
        id: '6',
        nombre: 'Trabajadores Industriales',
        descripcion: 'Empleados de manufactura y construcción',
        baseSize: 112000,
        potencial: 'Medio',
        mensajeSugerido: 'Seguridad laboral, salarios justos y prestaciones',
        requiredModule: 'micro_targeting'  // Requires module
    }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Simple hash function for deterministic calculations
 */
function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash)
}

/**
 * Calculate segment size based on geographic scope
 * State-level: 100% of base size
 * Municipio-level: 10-30% of base size
 * Sección-level: 1-5% of base size
 */
function calculateSegmentSize(
    baseSize: number,
    stateId: string,
    municipio?: string,
    seccion?: string
): number {
    let multiplier = 1.0

    // State-level: full size
    if (!municipio) {
        multiplier = 1.0
    }
    // Municipio-level: 10-30% of state
    else if (!seccion) {
        const hash = hashString(stateId + municipio)
        multiplier = 0.1 + (hash % 20) / 100
    }
    // Sección-level: 1-5% of municipio
    else {
        const hash = hashString(stateId + municipio + seccion)
        multiplier = 0.01 + (hash % 4) / 100
    }

    return Math.round(baseSize * multiplier)
}

/**
 * Determine if a segment is locked based on module access
 * 
 * TODO: Replace with backend permission check
 * const permissions = await fetch('/v1/user/permissions/segments')
 * return !permissions.unlockedSegmentIds.includes(segmentId)
 */
function isSegmentLocked(requiredModule: string | null, enabledModules: string[]): boolean {
    // If no module required, segment is always unlocked
    if (!requiredModule) {
        return false
    }

    // Check if required module is enabled
    return !enabledModules.includes(requiredModule)
}

// ============================================
// MAIN EXPORT
// ============================================

/**
 * Get segments for a specific geographic scope with permission-based locking
 * 
 * @param stateId - State identifier
 * @param municipio - Optional municipio filter
 * @param seccion - Optional sección filter
 * @param enabledModules - List of enabled module keys (for permission check)
 * @returns Array of segments with geographic sizing and locking
 * 
 * TODO: Replace with API call
 * const response = await fetch(
 *   `/v1/analytics/${stateId}/micro-targeting/segments?municipio=${municipio}&seccion=${seccion}`
 * )
 * return await response.json()
 */
export function getSegmentsForScope(
    stateId: string,
    municipio: string | undefined,
    seccion: string | undefined,
    enabledModules: string[]
): MicroTargetingSegment[] {
    return SEGMENT_CATALOG.map(segment => ({
        id: segment.id,
        nombre: segment.nombre,
        descripcion: segment.descripcion,
        tamano: calculateSegmentSize(segment.baseSize, stateId, municipio, seccion),
        potencial: segment.potencial,
        mensajeSugerido: segment.mensajeSugerido,
        locked: isSegmentLocked(segment.requiredModule, enabledModules)
    }))
}
