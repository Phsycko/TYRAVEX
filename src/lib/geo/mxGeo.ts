// ============================================
// GEO DATA LOADER FOR MEXICO
// ============================================

import type { FeatureCollection, Feature } from 'geojson'

// Cache for loaded GeoJSON data
const geoCache = new Map<string, FeatureCollection>()

/**
 * Load Mexico states GeoJSON
 */
export async function getStatesGeo(): Promise<FeatureCollection> {
    const cacheKey = 'states'

    if (geoCache.has(cacheKey)) {
        return geoCache.get(cacheKey)!
    }

    const response = await fetch('/data/geo/mx/states.geojson')
    const data = await response.json()
    geoCache.set(cacheKey, data)

    return data
}

/**
 * Normalize state name to slug format
 */
function normalizeStateName(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-')
}

/**
 * Normalize feature geometry to ensure consistent Leaflet hover behavior
 * CRITICAL FIX: GeometryCollection causes hover to fail in Leaflet
 * This converts GeometryCollection to MultiPolygon by extracting all Polygon geometries
 */
function normalizeFeatureGeometry(feature: Feature): Feature {
    if (!feature.geometry) return feature

    // If it's already a simple Polygon or MultiPolygon, return as-is
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
        return feature
    }

    // Handle GeometryCollection by extracting all Polygon geometries
    if (feature.geometry.type === 'GeometryCollection') {
        const geometries = (feature.geometry as any).geometries || []
        const polygons = geometries.filter((g: any) => g.type === 'Polygon' || g.type === 'MultiPolygon')

        if (polygons.length === 0) {
            console.warn('[mxGeo] GeometryCollection has no Polygon geometries:', feature.properties?.NAME_2)
            return feature
        }

        // If only one polygon, use it directly
        if (polygons.length === 1 && polygons[0].type === 'Polygon') {
            return {
                ...feature,
                geometry: polygons[0]
            }
        }

        // Multiple polygons or MultiPolygons: combine into MultiPolygon
        const allCoordinates: any[] = []
        polygons.forEach((poly: any) => {
            if (poly.type === 'Polygon') {
                allCoordinates.push(poly.coordinates)
            } else if (poly.type === 'MultiPolygon') {
                allCoordinates.push(...poly.coordinates)
            }
        })

        return {
            ...feature,
            geometry: {
                type: 'MultiPolygon',
                coordinates: allCoordinates
            }
        }
    }

    // For any other geometry type, return as-is
    return feature
}

/**
 * Load municipalities GeoJSON for a specific state
 * @param stateSlug - State slug (e.g., 'nuevo-leon', 'jalisco')
 */
export async function getMunicipalitiesGeo(stateSlug: string): Promise<FeatureCollection> {
    const cacheKey = `municipalities-${stateSlug}`

    if (geoCache.has(cacheKey)) {
        return geoCache.get(cacheKey)!
    }

    // Load all municipalities and filter by state
    const allMunicipalities = await getAllMunicipalities()

    // Filter features for this state
    // GeoJSON uses NAME_1 for state name (e.g., "Jalisco", "Chihuahua")
    const stateFeatures = allMunicipalities.features.filter((feature: Feature) => {
        const stateName = feature.properties?.NAME_1 || ''
        return stateName && normalizeStateName(stateName) === stateSlug
    })

    console.log(`[mxGeo] Filtered ${stateFeatures.length} municipalities for ${stateSlug}`)

    // CRITICAL FIX: Normalize geometries to ensure consistent hover behavior
    // GeometryCollection causes hover to fail in Leaflet
    const normalizedFeatures = stateFeatures.map(normalizeFeatureGeometry)

    const stateGeoJSON: FeatureCollection = {
        type: 'FeatureCollection',
        features: normalizedFeatures
    }

    geoCache.set(cacheKey, stateGeoJSON)
    return stateGeoJSON
}

/**
 * Load all municipalities (cached)
 */
async function getAllMunicipalities(): Promise<FeatureCollection> {
    const cacheKey = 'all-municipalities'

    if (geoCache.has(cacheKey)) {
        return geoCache.get(cacheKey)!
    }

    const response = await fetch('/data/geo/mx/all_municipalities.geojson')
    const data = await response.json()
    geoCache.set(cacheKey, data)

    return data
}

/**
 * Clear geo cache (useful for testing)
 */
export function clearGeoCache(): void {
    geoCache.clear()
}

/**
 * Map state IDs to slugs for file loading
 */
export const STATE_ID_TO_SLUG: Record<string, string> = {
    'AGS': 'aguascalientes',
    'BC': 'baja-california',
    'BCS': 'baja-california-sur',
    'CAMP': 'campeche',
    'CHIS': 'chiapas',
    'CHIH': 'chihuahua',
    'CDMX': 'ciudad-de-mexico',
    'COAH': 'coahuila',
    'COL': 'colima',
    'DGO': 'durango',
    'GTO': 'guanajuato',
    'GRO': 'guerrero',
    'HGO': 'hidalgo',
    'JAL': 'jalisco',
    'MEX': 'mexico',
    'MICH': 'michoacan',
    'MOR': 'morelos',
    'NAY': 'nayarit',
    'NL': 'nuevo-leon',
    'OAX': 'oaxaca',
    'PUE': 'puebla',
    'QRO': 'queretaro',
    'QROO': 'quintana-roo',
    'SLP': 'san-luis-potosi',
    'SIN': 'sinaloa',
    'SON': 'sonora',
    'TAB': 'tabasco',
    'TAMPS': 'tamaulipas',
    'TLAX': 'tlaxcala',
    'VER': 'veracruz',
    'YUC': 'yucatan',
    'ZAC': 'zacatecas'
}

/**
 * Generate deterministic electoral score from municipality ID
 * @param id - Municipality ID
 * @returns Electoral score 0-100
 */
export function generateElectoralScore(id: string): number {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
        const char = id.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash % 101)
}

/**
 * Determine if municipality is locked (10% should be locked)
 * @param id - Municipality ID
 * @returns true if locked
 */
export function isMunicipalityLocked(id: string): boolean {
    const hash = generateElectoralScore(id)
    return hash % 10 === 0 // 10% locked
}

/**
 * Get color based on electoral score
 */
export function getElectoralColor(score: number): string {
    if (score > 60) return '#10b981' // green
    if (score >= 40) return '#f59e0b' // orange
    return '#ef4444' // red
}
