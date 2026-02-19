// ═══════════════════════════════════════════════════════════════════════════
//                    TACTICAL COMMAND CENTER - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// CORE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Coordinates {
    lat: number
    lng: number
    elevation?: number // meters above sea level
}

export interface TimeRange {
    start: Date | string
    end: Date | string
}

// ─────────────────────────────────────────────────────────────────────────────
// TACTICAL UNITS
// ─────────────────────────────────────────────────────────────────────────────

export type UnitType =
    | 'infantry'
    | 'vehicle'
    | 'air'
    | 'command'
    | 'support'
    | 'special'

export type UnitStatus =
    | 'operational'
    | 'engaged'
    | 'moving'
    | 'standby'
    | 'damaged'
    | 'offline'

export type UnitSpecialty =
    | 'urban'
    | 'rural'
    | 'reconnaissance'
    | 'assault'
    | 'defense'
    | 'support'

export interface UnitEquipment {
    vehicles?: string[]
    weapons?: string[]
    communication?: string[]
    special?: string[]
}

export interface UnitCapabilities {
    actionRadius: number // km
    autonomy: number // hours
    speed: number // km/h
    personnel: number
    specialty: UnitSpecialty[]
}

export interface TacticalUnit {
    id: string
    name: string
    callSign: string
    type: UnitType
    status: UnitStatus
    position: Coordinates
    commander: string
    capabilities: UnitCapabilities
    equipment: UnitEquipment
    currentMission?: string
    lastUpdate: Date | string
    morale: number // 0-100
    readiness: number // 0-100
    history?: UnitActivity[]
}

export interface UnitActivity {
    timestamp: Date | string
    type: 'movement' | 'engagement' | 'status_change' | 'mission_assigned'
    description: string
    location?: Coordinates
}

// ─────────────────────────────────────────────────────────────────────────────
// TACTICAL OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

export type OperationType =
    | 'assault'
    | 'infiltration'
    | 'reconnaissance'
    | 'ambush'
    | 'extraction'
    | 'combined'

export type OperationPhase =
    | 'planning'
    | 'preparation'
    | 'execution'
    | 'completed'
    | 'aborted'

export interface OperationObjective {
    id: string
    type: 'primary' | 'secondary'
    description: string
    location: Coordinates
    priority: number
    status: 'pending' | 'in_progress' | 'completed' | 'failed'
}

export interface OperationRoute {
    id: string
    name: string
    waypoints: Coordinates[]
    assignedUnit?: string
    distance: number // meters
    estimatedTime: number // minutes
    difficulty: 'easy' | 'moderate' | 'difficult' | 'extreme'
    cover: number // percentage 0-100
    exposure: number // percentage 0-100
}

export interface OperationZone {
    id: string
    name: string
    type: 'objective' | 'danger' | 'safe' | 'extraction' | 'rally'
    polygon: Coordinates[]
    description: string
}

export interface UnitAssignment {
    unitId: string
    role: string
    route?: string
    position?: Coordinates
    tasks: string[]
}

export interface OperationTimeline {
    hMinus: number // minutes before H-hour
    event: string
    units?: string[]
    critical: boolean
}

export interface OperationRisk {
    id: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    probability: number // 0-100
    impact: string
    mitigation?: string
    location?: Coordinates
}

export interface OperationContingency {
    id: string
    trigger: string
    plan: string
    resources: string[]
}

export interface TacticalOperation {
    id: string
    name: string
    type: OperationType
    phase: OperationPhase
    objectives: OperationObjective[]
    routes: OperationRoute[]
    zones: OperationZone[]
    unitAssignments: UnitAssignment[]
    timeline: OperationTimeline[]
    hHour: Date | string
    risks: OperationRisk[]
    contingencies: OperationContingency[]
    successProbability: number // 0-100
    createdAt: Date | string
    updatedAt: Date | string
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATION
// ─────────────────────────────────────────────────────────────────────────────

export type SimulationMode = 'automatic' | 'manual' | 'realtime'

export type EventType =
    | 'movement'
    | 'contact'
    | 'decision'
    | 'status'
    | 'alert'
    | 'completion'

export type EventSeverity = 'info' | 'warning' | 'alert' | 'critical'

export interface SimulationEvent {
    id: string
    timestamp: number // simulation time in seconds
    type: EventType
    severity: EventSeverity
    unitId?: string
    location?: Coordinates
    description: string
    requiresDecision: boolean
    decisionId?: string
}

export interface DecisionOption {
    id: string
    label: string
    description: string
    probability: number // success probability 0-100
    consequences: {
        positive?: string[]
        negative?: string[]
    }
    impact: {
        time: number // minutes delay/advance
        resources?: string[]
        risk: number // risk increase/decrease -100 to 100
    }
    aiRecommendation?: boolean
}

export interface DecisionPoint {
    id: string
    timestamp: number
    situation: string
    options: DecisionOption[]
    timeLimit: number // seconds to decide
    unitId?: string
    location?: Coordinates
}

export interface SimulationMetrics {
    planIntegrity: number // 0-100
    synchronization: number // 0-100
    surpriseElement: number // 0-100
    morale: number // 0-100
    successProbability: number // 0-100
}

export interface SimulationResult {
    operationId: string
    duration: number // minutes
    outcome: 'success' | 'partial_success' | 'failure'
    objectivesCompleted: number
    objectivesTotal: number
    casualties: {
        friendly: number
        enemy: number
    }
    decisionsCorrect: number
    decisionsTotal: number
    finalMetrics: SimulationMetrics
    lessonsLearned: string[]
    keyMoments: {
        timestamp: number
        description: string
        impact: 'positive' | 'negative' | 'neutral'
    }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// TERRAIN ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

export interface ElevationData {
    minElevation: number
    maxElevation: number
    averageSlope: number // percentage
    maxSlope: number // percentage
    contours: {
        elevation: number
        path: Coordinates[]
    }[]
}

export interface StrategicPoint {
    id: string
    type: 'elevated' | 'chokepoint' | 'cover' | 'danger' | 'observation'
    location: Coordinates
    description: string
    tacticalValue: number // 0-100
    accessibility: 'easy' | 'moderate' | 'difficult' | 'extreme'
}

export interface LineOfSight {
    fromPoint: Coordinates
    visibleArea: number // km²
    hiddenArea: number // km²
    maxRange: number // km
    blindSpots: {
        id: string
        polygon: Coordinates[]
        area: number // m²
        reason: string
    }[]
}

export interface AccessibilityRoute {
    id: string
    type: 'vehicle' | '4x4' | 'foot' | 'technical'
    path: Coordinates[]
    difficulty: 'easy' | 'moderate' | 'difficult' | 'extreme'
    distance: number // meters
    estimatedTime: number // minutes
    cover: number // percentage
    description: string
}

export interface CoverAnalysis {
    buildings: number
    vegetation: number // km²
    exposedArea: number // km²
    coverPercentage: number // 0-100
    tacticalPositions: {
        location: Coordinates
        type: 'hard_cover' | 'soft_cover' | 'concealment'
        description: string
        score: number // 0-100
    }[]
}

export interface TerrainAnalysis {
    areaId: string
    bounds: Coordinates[]
    area: number // km²
    elevation: ElevationData
    strategicPoints: StrategicPoint[]
    accessibility: AccessibilityRoute[]
    cover: CoverAnalysis
    vulnerabilities: {
        severity: 'low' | 'medium' | 'high' | 'critical'
        description: string
        location?: Coordinates
    }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// ATTACK VECTORS
// ─────────────────────────────────────────────────────────────────────────────

export interface AttackVector {
    id: string
    name: string
    direction: string // e.g., "North-East"
    path: Coordinates[]
    distance: number // meters
    cover: number // percentage 0-100
    slope: number // percentage
    exposure: number // percentage 0-100
    exposurePoints: {
        location: Coordinates
        distance: number // meters of exposure
        severity: 'low' | 'medium' | 'high'
    }[]
    estimatedTime: number // minutes
    score: number // 0-100
    rating: 'optimal' | 'good' | 'acceptable' | 'risky' | 'dangerous'
}

export interface InfiltrationPoint {
    id: string
    location: Coordinates
    type: 'wall' | 'window' | 'door' | 'roof' | 'underground' | 'natural'
    accessibility: 'easy' | 'moderate' | 'difficult' | 'extreme'
    visibility: 'hidden' | 'low' | 'medium' | 'high'
    proximity: number // meters to objective
    requirements: string[]
    score: number // 0-100
    rating: 'excellent' | 'good' | 'acceptable' | 'risky'
}

export interface AmbushZone {
    id: string
    name: string
    location: Coordinates
    polygon: Coordinates[]
    type: 'chokepoint' | 'natural' | 'urban' | 'elevated'
    cover: 'excellent' | 'good' | 'moderate' | 'poor'
    fireLines: {
        position: Coordinates
        coverage: number // degrees
        range: number // meters
    }[]
    escapeRoutes: Coordinates[][]
    capacity: number // max personnel
    effectiveness: number // 0-100
}

export interface VectorAnalysis {
    targetId: string
    targetLocation: Coordinates
    radius: number // meters
    approachVectors: AttackVector[]
    infiltrationPoints: InfiltrationPoint[]
    ambushZones: AmbushZone[]
    firePositions: {
        location: Coordinates
        elevation: number
        range: number // meters
        coverage: number // degrees
        score: number // 0-100
    }[]
    optimalVector: string // id of best approach vector
    optimalInfiltration: string // id of best infiltration point
}

// ─────────────────────────────────────────────────────────────────────────────
// TERRITORY CONTROL
// ─────────────────────────────────────────────────────────────────────────────

export type ControlStatus = 'full' | 'disputed' | 'none' | 'hostile'

export interface ControlZone {
    id: string
    name: string
    polygon: Coordinates[]
    status: ControlStatus
    controlPercentage: number // 0-100
    population?: number
    strategicValue: number // 0-100
    lastChange: Date | string
    trend: 'improving' | 'stable' | 'declining'
    unitsPresent: string[]
    threats: {
        type: string
        severity: 'low' | 'medium' | 'high' | 'critical'
        description: string
    }[]
}

export interface TerritoryControl {
    timestamp: Date | string
    zones: ControlZone[]
    summary: {
        fullControl: number // percentage
        disputed: number // percentage
        noControl: number // percentage
        totalArea: number // km²
    }
    recentChanges: {
        zoneId: string
        timestamp: Date | string
        from: ControlStatus
        to: ControlStatus
        reason: string
    }[]
    alerts: {
        id: string
        zoneId: string
        severity: 'low' | 'medium' | 'high' | 'critical'
        message: string
        timestamp: Date | string
    }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// MAP LAYERS
// ─────────────────────────────────────────────────────────────────────────────

export type MapBaseLayer = 'satellite' | 'topographic' | 'street' | 'military'

export interface MapOverlay {
    id: string
    name: string
    type: 'units' | 'objectives' | 'routes' | 'zones' | 'coverage' | 'elevation' | 'traffic' | 'weather' | 'intel'
    enabled: boolean
    opacity: number // 0-100
}

export interface MapDrawing {
    id: string
    type: 'marker' | 'line' | 'polygon' | 'circle'
    coordinates: Coordinates | Coordinates[]
    properties: {
        name?: string
        description?: string
        color?: string
        icon?: string
        radius?: number // for circles
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// WEATHER & INTEL
// ─────────────────────────────────────────────────────────────────────────────

export interface WeatherConditions {
    timestamp: Date | string
    temperature: number // celsius
    conditions: 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog' | 'snow'
    visibility: number // km
    windSpeed: number // km/h
    windDirection: number // degrees
    precipitation: number // mm
    impact: {
        visibility: 'none' | 'low' | 'medium' | 'high'
        movement: 'none' | 'low' | 'medium' | 'high'
        operations: 'none' | 'low' | 'medium' | 'high'
    }
}

export interface IntelReport {
    id: string
    timestamp: Date | string
    type: 'movement' | 'position' | 'activity' | 'threat' | 'opportunity'
    reliability: 'confirmed' | 'probable' | 'possible' | 'unconfirmed'
    location: Coordinates
    description: string
    source: string
    expiresAt?: Date | string
}
