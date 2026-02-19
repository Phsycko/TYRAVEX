// ═══════════════════════════════════════════════════════════════════════════
//                    STRATEGIC COMMAND META-CENTER - TYPES
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// CORE DOMAIN TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type DomainType =
    | 'analytics'
    | 'territorio'
    | 'predict'
    | 'monitor'
    | 'research'
    | 'crisis'
    | 'controlInfo'

export type ScenarioStatus = 'draft' | 'active' | 'completed' | 'archived'
export type SimulationStatus = 'idle' | 'running' | 'paused' | 'completed'
export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low'
export type HealthStatus = 'healthy' | 'warning' | 'danger' | 'critical'
export type TrendDirection = 'up' | 'down' | 'stable'

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO BUILDER
// ─────────────────────────────────────────────────────────────────────────────

export interface Scenario {
    id: string
    name: string
    objective: string
    timeline: number // days
    domains: DomainConfig[]
    resources: ResourcePool
    status: ScenarioStatus
    createdAt: string
    updatedAt: string
    createdBy?: string
}

export interface DomainConfig {
    domain: DomainType
    enabled: boolean
    objectives: DomainObjective[]
    currentState: DomainState
    budget: number
    personnel: number
    priority: 'critical' | 'high' | 'medium' | 'low'
}

export interface DomainObjective {
    id: string
    description: string
    metric: string
    currentValue: number
    targetValue: number
    deadline: number // day number
    priority: number
    status: 'pending' | 'in-progress' | 'achieved' | 'failed'
}

export interface DomainState {
    // Analytics
    voteIntention?: number
    sentiment?: number
    shareOfVoice?: number

    // Territorio
    districtsControlled?: number
    totalDistricts?: number
    eventsCompleted?: number

    // Predict
    victoryProbability?: number
    voteProjection?: number
    modelConfidence?: number

    // Monitor
    mentions?: number
    activeAlerts?: number
    trendingTopics?: string[]

    // Research
    inconsistenciesFound?: number
    vulnerabilitiesDetected?: number

    // Crisis
    alertLevel?: number
    activeProtocols?: number

    // Control Info
    riskExposure?: number
    assetsControlled?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// WAR ROOM SIMULATOR
// ─────────────────────────────────────────────────────────────────────────────

export interface SimulationState {
    scenarioId: string
    currentDay: number
    totalDays: number
    speed: 1 | 2 | 5 | 10
    status: SimulationStatus
    events: SimulationEvent[]
    decisions: DecisionMade[]
    kpis: KPISnapshot[]
    checkpoints: SimulationCheckpoint[]
}

export interface SimulationEvent {
    id: string
    day: number
    time: string // HH:MM
    domain: DomainType[]
    type: 'crisis' | 'opportunity' | 'milestone' | 'decision' | 'info'
    severity: 'critical' | 'high' | 'medium' | 'low'
    title: string
    description: string
    impacts: DomainImpact[]
    requiresDecision: boolean
    decisionPoint?: DecisionPoint
    resolved: boolean
}

export interface DecisionPoint {
    id: string
    eventId: string
    day: number
    domains: DomainType[]
    title: string
    description: string
    urgency: UrgencyLevel
    timeLimit: number // minutes
    options: DecisionOption[]
    aiRecommendation?: string
    aiConfidence?: number
    deadline: string // ISO timestamp
}

export interface DecisionOption {
    id: string
    name: string
    description: string
    actions: Action[]
    impacts: DomainImpact[]
    cost: number
    timeRequired: number // days
    risks: Risk[]
    benefits: string[]
    expectedValue: number
    probability: number
}

export interface Action {
    id: string
    domain: DomainType
    type: string
    description: string
    duration: number // days
    cost: number
}

export interface DomainImpact {
    domain: DomainType
    metric: string
    change: number
    timeframe: number // days
    probability: number
    description: string
}

export interface Risk {
    id: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    probability: number
    mitigation?: string
}

export interface DecisionMade {
    id: string
    decisionPointId: string
    optionId: string
    day: number
    timestamp: string
    madeBy?: string
    actualImpacts?: DomainImpact[]
    outcome?: 'success' | 'partial' | 'failure'
}

export interface KPISnapshot {
    day: number
    timestamp: string
    global: GlobalKPIs
    analytics?: AnalyticsKPIs
    territorio?: TerritorioKPIs
    predict?: PredictKPIs
    monitor?: MonitorKPIs
    crisis?: CrisisKPIs
    resources?: ResourceKPIs
}

export interface GlobalKPIs {
    victoryProbability: number
    voteIntention: number
    trend: TrendDirection
    overallHealth: HealthStatus
}

export interface AnalyticsKPIs {
    voteIntention: number
    sentiment: number
    shareOfVoice: number
    engagement: number
    target: number
    status: HealthStatus
}

export interface TerritorioKPIs {
    districtsControlled: number
    totalDistricts: number
    eventsCompleted: number
    eventsPlanned: number
    target: number
    status: HealthStatus
}

export interface PredictKPIs {
    victoryProbability: number
    voteProjection: number
    modelConfidence: number
    target: number
    status: HealthStatus
}

export interface MonitorKPIs {
    mentions: number
    activeAlerts: number
    trendingPosition: number
    narrativeControl: number
    status: HealthStatus
}

export interface CrisisKPIs {
    alertLevel: number
    activeProtocols: number
    signalsDetected: number
    responseTime: number
    status: HealthStatus
}

export interface ResourceKPIs {
    budgetRemaining: number
    budgetTotal: number
    burnRate: number
    personnelUtilization: number
    daysRemaining: number
    status: HealthStatus
}

export interface SimulationCheckpoint {
    id: string
    day: number
    name: string
    timestamp: string
    state: Partial<SimulationState>
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE PLANNER
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineState {
    scenarioId: string
    totalDays: number
    activities: TimelineActivity[]
    milestones: Milestone[]
    dependencies: Dependency[]
    conflicts: Conflict[]
}

export interface TimelineActivity {
    id: string
    domain: DomainType
    name: string
    type: string
    startDay: number
    duration: number
    endDay: number
    resources: {
        budget: number
        personnel: number
    }
    status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
    priority: 'critical' | 'high' | 'medium' | 'low'
    dependencies: string[] // activity IDs
}

export interface Milestone {
    id: string
    day: number
    name: string
    description: string
    critical: boolean
    domains: DomainType[]
    status: 'pending' | 'achieved' | 'missed'
}

export interface Dependency {
    id: string
    fromActivityId: string
    toActivityId: string
    type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish'
    lag: number // days
}

export interface Conflict {
    id: string
    type: 'resource' | 'timing' | 'dependency'
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    affectedActivities: string[]
    suggestions: string[]
    resolved: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// RESOURCE ALLOCATOR
// ─────────────────────────────────────────────────────────────────────────────

export interface ResourcePool {
    budget: number
    personnel: number
    timeline: number // days
    allocation: DomainAllocation[]
}

export interface DomainAllocation {
    domain: DomainType
    budget: number
    budgetPercentage: number
    personnel: number
    personnelPercentage: number
    priority: 'critical' | 'high' | 'medium' | 'low'
    roi: number // return on investment
    effectiveness: number // 0-100
}

export interface OptimizationResult {
    id: string
    timestamp: string
    currentAllocation: DomainAllocation[]
    optimizedAllocation: DomainAllocation[]
    changes: AllocationChange[]
    expectedImpact: {
        victoryProbabilityChange: number
        costSavings: number
        efficiencyGain: number
    }
    confidence: number
    reasoning: string
}

export interface AllocationChange {
    domain: DomainType
    budgetChange: number
    budgetChangePercentage: number
    personnelChange: number
    impact: string
    reasoning: string
}

export interface ROIAnalysis {
    domain: DomainType
    invested: number
    return: number
    roi: number
    effectiveness: number
    marginalReturn: number // return per additional $1M
}

// ─────────────────────────────────────────────────────────────────────────────
// DECISION TREE ANALYZER
// ─────────────────────────────────────────────────────────────────────────────

export interface DecisionTree {
    id: string
    decisionPointId: string
    rootNode: DecisionNode
    outcomes: OutcomeNode[]
    expectedValue: number
    bestPath: string[] // node IDs
    worstPath: string[] // node IDs
}

export interface DecisionNode {
    id: string
    type: 'decision' | 'chance' | 'outcome'
    label: string
    description: string
    children: TreeNode[]
    probability?: number
    value?: number
}

export interface TreeNode {
    id: string
    parentId: string
    type: 'decision' | 'chance' | 'outcome'
    label: string
    probability: number
    impacts: DomainImpact[]
    value: number
    children?: TreeNode[]
}

export interface OutcomeNode {
    id: string
    path: string[] // node IDs from root
    probability: number
    impacts: DomainImpact[]
    totalValue: number
    description: string
    isOptimal: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTIVE DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardState {
    scenarioId: string
    currentDay: number
    lastUpdate: string
    globalStatus: GlobalStatus
    domainStatuses: DomainStatus[]
    pendingDecisions: PendingDecision[]
    criticalEvents: CriticalEvent[]
    alerts: Alert[]
}

export interface GlobalStatus {
    objective: string
    progress: number // 0-100
    victoryProbability: number
    voteIntention: number
    trend: TrendDirection
    daysRemaining: number
    health: HealthStatus
}

export interface DomainStatus {
    domain: DomainType
    health: HealthStatus
    kpis: any // domain-specific KPIs
    trend: TrendDirection
    alerts: number
    lastUpdate: string
}

export interface PendingDecision {
    id: string
    title: string
    urgency: UrgencyLevel
    deadline: string
    domains: DomainType[]
    description: string
    timeRemaining: number // minutes
}

export interface CriticalEvent {
    id: string
    day: number
    time: string
    title: string
    domains: DomainType[]
    type: 'milestone' | 'crisis' | 'opportunity'
    status: 'upcoming' | 'in-progress' | 'completed'
}

export interface Alert {
    id: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    domain: DomainType
    title: string
    description: string
    timestamp: string
    acknowledged: boolean
    resolved: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export interface ScenarioTemplate {
    id: string
    name: string
    description: string
    category: 'electoral' | 'crisis' | 'expansion' | 'defensive' | 'custom'
    defaultTimeline: number
    defaultBudget: number
    defaultPersonnel: number
    domainConfigs: Partial<DomainConfig>[]
    objectives: DomainObjective[]
    tags: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// LEARNING & ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────

export interface LessonLearned {
    id: string
    scenarioId: string
    day: number
    category: 'success' | 'failure' | 'insight' | 'warning'
    title: string
    description: string
    domains: DomainType[]
    impact: string
    recommendation: string
    validated: boolean
}

export interface PerformanceMetrics {
    scenarioId: string
    totalDecisions: number
    successfulDecisions: number
    failedDecisions: number
    averageResponseTime: number
    resourceEfficiency: number
    objectiveAchievement: number
    overallScore: number
}
