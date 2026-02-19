/**
 * Map Data for MexicoMap component
 * Deterministic mock metrics for all 32 Mexican states across 4 visualization modes
 */

export type MapMode = 'electoral' | 'security' | 'tactical' | 'social'

export interface StateMetrics {
  name: string
  id: string
  slug: string
  population: number
  electoral: {
    voteIntention: number      // 0-100 favorable %
    historicVote: number       // last election %
    districtsWon: number
    districtsLost: number
    districtsDisputed: number
    trend: number              // +/- change
    turnoutEstimate: number
  }
  security: {
    crimeIndex: number         // 0-100 (higher = more crime)
    incidentsPer100k: number
    hotspots: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    trend: number
  }
  tactical: {
    controlLevel: number       // 0-100 operational coverage %
    operativeCoverage: number
    strategicPoints: number
    activeUnits: number
    resourceDeployment: number // %
  }
  social: {
    marginationIndex: number   // 0-100 (higher = more marginalized)
    healthAccess: number       // 0-100
    educationAccess: number    // 0-100
    servicesAccess: number     // 0-100
    socialLag: number          // 0-100
  }
}

export interface MunicipalityMetrics {
  name: string
  stateName: string
  population: number
  electoral: { voteIntention: number; trend: number }
  security: { crimeIndex: number; incidentsPer100k: number }
  tactical: { controlLevel: number; operativeCoverage: number }
  social: { marginationIndex: number; socialLag: number }
}

// Deterministic hash for consistent data
function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i)
    h = h & h
  }
  return Math.abs(h)
}

function seeded(id: string, min: number, max: number, salt = 0): number {
  const h = hash(id + salt.toString())
  return min + (h % (max - min + 1))
}

function seededFloat(id: string, min: number, max: number, salt = 0): number {
  return parseFloat((min + (hash(id + salt.toString()) % 1000) / 1000 * (max - min)).toFixed(1))
}

// All 32 states with their GeoJSON property names and IDs
const STATE_DEFS: Array<{ name: string; id: string; slug: string; pop: number }> = [
  { name: 'Aguascalientes', id: 'MX-AGS', slug: 'aguascalientes', pop: 1425607 },
  { name: 'Baja California', id: 'MX-BC', slug: 'baja-california', pop: 3769020 },
  { name: 'Baja California Sur', id: 'MX-BCS', slug: 'baja-california-sur', pop: 798447 },
  { name: 'Campeche', id: 'MX-CAM', slug: 'campeche', pop: 928363 },
  { name: 'Chiapas', id: 'MX-CHIS', slug: 'chiapas', pop: 5543828 },
  { name: 'Chihuahua', id: 'MX-CHIH', slug: 'chihuahua', pop: 3741869 },
  { name: 'Ciudad de México', id: 'MX-CDMX', slug: 'ciudad-de-mexico', pop: 9209944 },
  { name: 'Coahuila', id: 'MX-COAH', slug: 'coahuila', pop: 3146771 },
  { name: 'Colima', id: 'MX-COL', slug: 'colima', pop: 731391 },
  { name: 'Durango', id: 'MX-DGO', slug: 'durango', pop: 1832650 },
  { name: 'Guanajuato', id: 'MX-GTO', slug: 'guanajuato', pop: 6166934 },
  { name: 'Guerrero', id: 'MX-GRO', slug: 'guerrero', pop: 3540685 },
  { name: 'Hidalgo', id: 'MX-HGO', slug: 'hidalgo', pop: 3082841 },
  { name: 'Jalisco', id: 'MX-JAL', slug: 'jalisco', pop: 8348151 },
  { name: 'México', id: 'MX-MEX', slug: 'mexico', pop: 16992418 },
  { name: 'Michoacán', id: 'MX-MICH', slug: 'michoacan', pop: 4748846 },
  { name: 'Morelos', id: 'MX-MOR', slug: 'morelos', pop: 1971520 },
  { name: 'Nayarit', id: 'MX-NAY', slug: 'nayarit', pop: 1235456 },
  { name: 'Nuevo León', id: 'MX-NL', slug: 'nuevo-leon', pop: 5784442 },
  { name: 'Oaxaca', id: 'MX-OAX', slug: 'oaxaca', pop: 4132148 },
  { name: 'Puebla', id: 'MX-PUE', slug: 'puebla', pop: 6583278 },
  { name: 'Querétaro', id: 'MX-QRO', slug: 'queretaro', pop: 2368467 },
  { name: 'Quintana Roo', id: 'MX-QROO', slug: 'quintana-roo', pop: 1857985 },
  { name: 'San Luis Potosí', id: 'MX-SLP', slug: 'san-luis-potosi', pop: 2822255 },
  { name: 'Sinaloa', id: 'MX-SIN', slug: 'sinaloa', pop: 3026943 },
  { name: 'Sonora', id: 'MX-SON', slug: 'sonora', pop: 2944840 },
  { name: 'Tabasco', id: 'MX-TAB', slug: 'tabasco', pop: 2402598 },
  { name: 'Tamaulipas', id: 'MX-TAMPS', slug: 'tamaulipas', pop: 3527735 },
  { name: 'Tlaxcala', id: 'MX-TLAX', slug: 'tlaxcala', pop: 1342977 },
  { name: 'Veracruz', id: 'MX-VER', slug: 'veracruz', pop: 8062579 },
  { name: 'Yucatán', id: 'MX-YUC', slug: 'yucatan', pop: 2320898 },
  { name: 'Zacatecas', id: 'MX-ZAC', slug: 'zacatecas', pop: 1622138 },
]

export function getStateMetrics(): StateMetrics[] {
  return STATE_DEFS.map(s => ({
    name: s.name,
    id: s.id,
    slug: s.slug,
    population: s.pop,
    electoral: {
      voteIntention: seededFloat(s.id, 28, 62, 1),
      historicVote: seededFloat(s.id, 25, 58, 2),
      districtsWon: seeded(s.id, 2, 20, 3),
      districtsLost: seeded(s.id, 1, 15, 4),
      districtsDisputed: seeded(s.id, 0, 8, 5),
      trend: seededFloat(s.id, -4, 5, 6),
      turnoutEstimate: seededFloat(s.id, 42, 72, 7),
    },
    security: {
      crimeIndex: seededFloat(s.id, 10, 85, 10),
      incidentsPer100k: seeded(s.id, 120, 2800, 11),
      hotspots: seeded(s.id, 0, 12, 12),
      riskLevel: (['low', 'medium', 'high', 'critical'] as const)[seeded(s.id, 0, 3, 13)] ?? 'medium',
      trend: seededFloat(s.id, -8, 6, 14),
    },
    tactical: {
      controlLevel: seededFloat(s.id, 40, 98, 20),
      operativeCoverage: seededFloat(s.id, 35, 95, 21),
      strategicPoints: seeded(s.id, 3, 25, 22),
      activeUnits: seeded(s.id, 2, 18, 23),
      resourceDeployment: seededFloat(s.id, 30, 90, 24),
    },
    social: {
      marginationIndex: seededFloat(s.id, 8, 78, 30),
      healthAccess: seededFloat(s.id, 35, 95, 31),
      educationAccess: seededFloat(s.id, 40, 95, 32),
      servicesAccess: seededFloat(s.id, 30, 92, 33),
      socialLag: seededFloat(s.id, 5, 72, 34),
    },
  }))
}

// Generate municipality metrics from GeoJSON properties
export function getMunicipalityMetrics(munName: string, stateName: string): MunicipalityMetrics {
  const id = `${stateName}-${munName}`
  return {
    name: munName,
    stateName,
    population: seeded(id, 5000, 800000, 0),
    electoral: {
      voteIntention: seededFloat(id, 25, 68, 1),
      trend: seededFloat(id, -5, 6, 2),
    },
    security: {
      crimeIndex: seededFloat(id, 5, 90, 10),
      incidentsPer100k: seeded(id, 50, 3200, 11),
    },
    tactical: {
      controlLevel: seededFloat(id, 30, 100, 20),
      operativeCoverage: seededFloat(id, 25, 98, 21),
    },
    social: {
      marginationIndex: seededFloat(id, 3, 85, 30),
      socialLag: seededFloat(id, 2, 78, 31),
    },
  }
}

// Get the primary metric value for a state/municipality by mode
export function getMetricValue(mode: MapMode, data: StateMetrics | MunicipalityMetrics): number {
  switch (mode) {
    case 'electoral': return data.electoral.voteIntention
    case 'security': return 'security' in data && 'crimeIndex' in data.security ? data.security.crimeIndex : 50
    case 'tactical': return data.tactical.controlLevel
    case 'social': return 'social' in data && 'marginationIndex' in data.social ? data.social.marginationIndex : 50
  }
}

// Get choropleth color based on mode and value
export function getChoroplethColor(mode: MapMode, value: number): string {
  const t = value / 100 // normalize to 0-1
  switch (mode) {
    case 'electoral': {
      // green (favorable) → yellow (swing) → red (unfavorable)
      if (t > 0.55) return lerpColor('#1a5a3a', '#00ffaa', (t - 0.55) / 0.45)
      if (t > 0.40) return lerpColor('#5a5a1a', '#ffcc00', (t - 0.40) / 0.15)
      return lerpColor('#5a1a1a', '#ff4444', t / 0.40)
    }
    case 'security': {
      // low crime (green) → high crime (red)
      if (t < 0.3) return lerpColor('#1a3a2a', '#00ffaa', t / 0.3)
      if (t < 0.6) return lerpColor('#3a3a1a', '#ffcc00', (t - 0.3) / 0.3)
      return lerpColor('#3a1a1a', '#ff4444', (t - 0.6) / 0.4)
    }
    case 'tactical': {
      // high coverage (green) → low coverage (red)
      if (t > 0.7) return lerpColor('#1a3a2a', '#00ffaa', (t - 0.7) / 0.3)
      if (t > 0.4) return lerpColor('#1a1a3a', '#4A90E2', (t - 0.4) / 0.3)
      return lerpColor('#3a1a1a', '#ff6b35', t / 0.4)
    }
    case 'social': {
      // low marginalization (blue) → high marginalization (red)
      if (t < 0.3) return lerpColor('#1a2a3a', '#4A90E2', t / 0.3)
      if (t < 0.6) return lerpColor('#3a3a1a', '#ffcc00', (t - 0.3) / 0.3)
      return lerpColor('#3a1a1a', '#ff4444', (t - 0.6) / 0.4)
    }
  }
}

function lerpColor(dark: string, bright: string, t: number): string {
  t = Math.max(0, Math.min(1, t))
  const d = hexToRgb(dark)
  const b = hexToRgb(bright)
  const r = Math.round(d.r + (b.r - d.r) * t)
  const g = Math.round(d.g + (b.g - d.g) * t)
  const bl = Math.round(d.b + (b.b - d.b) * t)
  return `rgb(${r},${g},${bl})`
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

// Mode configuration
export const MODE_CONFIG: Record<MapMode, { label: string; metricLabel: string; unit: string; description: string }> = {
  electoral: { label: 'ELECTORAL', metricLabel: 'VOTE INTENTION', unit: '%', description: 'Intención de voto favorable' },
  security: { label: 'SEGURIDAD', metricLabel: 'CRIME INDEX', unit: '', description: 'Índice de incidencia delictiva' },
  tactical: { label: 'TÁCTICO', metricLabel: 'CONTROL LEVEL', unit: '%', description: 'Cobertura operativa' },
  social: { label: 'SOCIAL', metricLabel: 'MARGINATION', unit: '', description: 'Índice de marginación' },
}

// State name lookup by GeoJSON property name
const stateMetricsCache: StateMetrics[] | null = null
export function findStateMetrics(geoName: string): StateMetrics | undefined {
  const metrics = stateMetricsCache || getStateMetrics()
  // Normalize for matching (remove accents, lowercase)
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return metrics.find(m => norm(m.name) === norm(geoName))
}
