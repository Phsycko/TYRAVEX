// Crisis Management Types

export interface CrisisScenario {
    id: string
    name: string
    type: 'natural' | 'health' | 'infrastructure' | 'social' | 'informational' | 'combined'
    description: string
    parameters: {
        magnitude: number // 0-100
        populationAffected: number
        timing: string
        duration: number // minutes
    }
    initialConditions: string[]
    events: CrisisEvent[]
    decisions: CrisisDecision[]
}

export interface CrisisEvent {
    id: string
    timestamp: number // minutes from start
    category: 'health' | 'infrastructure' | 'communications' | 'population' | 'alert'
    severity: 'low' | 'medium' | 'high' | 'critical'
    title: string
    description: string
    impact: string[]
}

export interface CrisisDecision {
    id: string
    timestamp: number
    title: string
    situation: string
    timeLimit: number // seconds
    options: DecisionOption[]
}

export interface DecisionOption {
    id: string
    label: string
    description: string
    resources: ResourceRequirement[]
    consequences: Consequence[]
    score: number
}

export interface ResourceRequirement {
    type: string
    quantity: number
    duration: number // hours
}

export interface Consequence {
    type: 'positive' | 'negative' | 'neutral'
    description: string
    impact: number // -100 to 100
}

export interface AlertSignal {
    id: string
    title: string
    category: string
    severity: 'critical' | 'warning' | 'monitoring' | 'normal'
    score: number // 0-100
    location: {
        lat: number
        lng: number
        name: string
    }
    indicators: Indicator[]
    causes: string[]
    projection: Projection
    suggestedActions: string[]
    trend: 'accelerating' | 'stable' | 'declining'
    detectedAt: string
}

export interface Indicator {
    name: string
    value: number
    unit: string
    change: number // percentage
    threshold: number
    status: 'normal' | 'warning' | 'critical'
}

export interface Projection {
    timeToImpact: number // days
    impactLevel: 'low' | 'medium' | 'high' | 'critical'
    affectedPopulation: number
    probability: number // 0-100
    description: string
}

export interface Sensor {
    id: string
    name: string
    category: string
    dataSource: string
    metric: string
    thresholds: {
        critical: number
        warning: number
    }
    conditions: string[]
    frequency: 'realtime' | 'hourly' | 'daily'
    active: boolean
}

export interface Protocol {
    id: string
    code: string
    name: string
    type: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    steps: ProtocolStep[]
    resources: ResourceRequirement[]
    estimatedDuration: number // hours
    lastActivated: string | null
    activationCount: number
}

export interface ProtocolStep {
    id: string
    number: number
    title: string
    description: string
    estimatedDuration: number // minutes
    responsible: string
    status: 'pending' | 'in-progress' | 'completed' | 'blocked'
    dependencies: string[]
    completedAt?: string
    notes?: string
}

export interface ProtocolExecution {
    id: string
    protocolId: string
    activatedAt: string
    activatedBy: string
    status: 'active' | 'paused' | 'completed' | 'cancelled'
    progress: number // 0-100
    currentStep: number
    steps: ProtocolStep[]
    metrics: ExecutionMetrics
    alerts: string[]
}

export interface ExecutionMetrics {
    peopleServed: number
    peopleTarget: number
    resourcesDeployed: number
    resourcesTarget: number
    centersOperational: number
    centersPlanned: number
    volunteersActive: number
    volunteersNeeded: number
}

export interface Resource {
    id: string
    type: 'ambulance' | 'firetruck' | 'police' | 'helicopter' | 'hospital' | 'warehouse'
    name: string
    status: 'available' | 'in-service' | 'maintenance' | 'offline'
    location: {
        lat: number
        lng: number
        address: string
    }
    assignment: string
    crew?: {
        count: number
        roles: string[]
    }
    equipment?: string[]
    capacity?: {
        current: number
        max: number
        unit: string
    }
    fuel?: number // percentage
    lastMaintenance?: string
    stats?: {
        servicesCompleted: number
        kmTraveled: number
        hoursInService: number
    }
}

export interface ResourceReassignment {
    resourceId: string
    from: string
    to: string
    reason: string
    priority: 'low' | 'medium' | 'high'
    impact: ReassignmentImpact
}

export interface ReassignmentImpact {
    sourceCapacity: number
    targetCapacity: number
    transferTime: number // minutes
    sourceCoverage: 'critical' | 'limited' | 'acceptable' | 'good'
    warnings: string[]
}

export interface OptimizationRecommendation {
    id: string
    type: string
    title: string
    reason: string
    impact: string
    actions: string[]
    priority: 'low' | 'medium' | 'high'
}

export interface Message {
    id: string
    type: 'alert' | 'update' | 'instructions' | 'all-clear'
    title: string
    content: string
    audience: {
        general: boolean
        specificZone?: string
        responders: boolean
        media: boolean
    }
    channels: {
        sms: boolean
        speakers: boolean
        social: boolean
        app: boolean
        radio: boolean
        sirens: boolean
    }
    status: 'draft' | 'scheduled' | 'sent'
    scheduledFor?: string
    sentAt?: string
    reach?: number
    engagement?: {
        delivered: number
        read: number
        actions: number
    }
}

export interface CapacitySystem {
    id: string
    name: string
    category: string
    metrics: CapacityMetric[]
    projection: CapacityProjection
    alerts: CapacityAlert[]
    recommendations: string[]
}

export interface CapacityMetric {
    name: string
    current: number
    max: number
    unit: string
    percentage: number
    status: 'normal' | 'warning' | 'critical'
    trend: 'increasing' | 'stable' | 'decreasing'
}

export interface CapacityProjection {
    hours: number[]
    values: number[]
    thresholds: {
        warning: number
        critical: number
    }
    alerts: ProjectionAlert[]
}

export interface ProjectionAlert {
    time: number // hours from now
    level: number // percentage
    status: 'warning' | 'critical' | 'collapse'
    description: string
}

export interface CapacityAlert {
    severity: 'info' | 'warning' | 'critical'
    message: string
    timeToImpact?: number // hours
}

export interface SimulationResult {
    scenarioId: string
    duration: number // simulated hours
    realTime: number // actual minutes
    score: {
        overall: number
        effectiveness: number
        responseTime: number
        coordination: number
    }
    outcomes: {
        fatalities: number
        injured: number
        served: number
        resourceEfficiency: number
    }
    decisions: DecisionResult[]
    lessonsLearned: string[]
}

export interface DecisionResult {
    decisionId: string
    optionChosen: string
    outcome: 'success' | 'acceptable' | 'failure'
    impact: string
}
