// Control de Información - TypeScript Interfaces
// Enterprise-grade digital footprint management types

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'
export type ItemType = 'photo' | 'video' | 'document' | 'mention' | 'audio'
export type ItemStatus = 'controlled' | 'monitored' | 'critical'
export type ItemCategory = 'professional' | 'personal' | 'political' | 'academic' | 'corporate'
export type SourceType = 'website' | 'social_media' | 'public_record' | 'media' | 'repository' | 'forum' | 'dark_web'
export type TakedownStatus = 'pending' | 'in_progress' | 'escalated' | 'completed' | 'rejected'
export type RequestType = 'dmca' | 'privacy' | 'defamation' | 'unauthorized_use'

// Main digital item interface
export interface DigitalItem {
    id: string
    type: ItemType
    title: string
    description: string
    content: string
    source: string
    sourceType: SourceType
    url?: string
    thumbnailUrl?: string
    dateDiscovered: string
    datePublished?: string

    // Risk assessment
    riskScore: number // 0-100
    riskLevel: RiskLevel
    status: ItemStatus
    category: ItemCategory

    // Exposure metrics
    estimatedViews: number
    estimatedReach: number
    locationsDetected: number

    // Flags
    isAuthorized: boolean
    isOfficial: boolean
    isDeprecated: boolean
    hasInconsistency: boolean

    // Metadata
    tags: string[]
    notes?: string
    lastUpdated: string
}

// Risk assessment details
export interface RiskAssessment {
    itemId: string
    overallScore: number
    riskLevel: RiskLevel

    // Risk factors
    exposureRisk: number // 0-100
    contentRisk: number // 0-100
    contextRisk: number // 0-100
    reputationRisk: number // 0-100

    // Analysis
    threats: string[]
    vulnerabilities: string[]
    recommendations: string[]

    // Impact
    estimatedImpact: 'low' | 'medium' | 'high' | 'critical'
    impactDescription: string

    // Trend
    trendDirection: 'increasing' | 'stable' | 'decreasing'
    trendChange: number // percentage

    lastAssessed: string
}

// Source platform/website
export interface Source {
    id: string
    name: string
    type: SourceType
    url: string

    // Metrics
    itemCount: number
    averageRisk: number

    // Status
    isMonitored: boolean
    lastScanned: string
    scanFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly'

    // Actions
    canTakedown: boolean
    takedownMethod?: 'dmca' | 'api' | 'manual' | 'legal'
    contactInfo?: string
}

// Version control for assets
export interface AssetVersion {
    id: string
    assetId: string
    version: string
    dateCreated: string
    changes: string

    // File info
    fileUrl: string
    fileHash: string
    fileSize: number

    // Usage
    usageCount: number
    isActive: boolean
    isDeprecated: boolean
    isObsolete: boolean

    // Metadata
    createdBy: string
    notes?: string
}

// Track where/how assets are used
export interface UsageRecord {
    id: string
    assetId: string
    versionId: string

    // Location
    platform: string
    url: string
    context: string

    // Authorization
    isAuthorized: boolean
    authorizationDate?: string
    authorizedBy?: string

    // Metrics
    dateDetected: string
    estimatedViews: number
    sentiment?: 'positive' | 'neutral' | 'negative'

    // Actions taken
    actionsTaken: string[]
    status: 'approved' | 'pending' | 'flagged' | 'removed'
}

// Usage request/permission
export interface UsageRequest {
    id: string
    assetId: string

    // Requester
    requesterName: string
    requesterOrg: string
    requesterEmail: string

    // Request details
    intendedUse: string
    context: string
    duration?: string
    dateRequested: string

    // Status
    status: 'pending' | 'approved' | 'rejected' | 'more_info_needed'
    reviewedBy?: string
    reviewedDate?: string
    reviewNotes?: string

    // Terms
    terms?: string[]
    restrictions?: string[]
}

// Takedown request
export interface TakedownRequest {
    id: string
    itemId: string

    // Target
    platform: string
    url: string
    type: RequestType

    // Request details
    reason: string
    evidence: string[]
    legalBasis: string

    // Status
    status: TakedownStatus
    dateSubmitted: string
    lastUpdated: string
    estimatedCompletion?: string

    // Tracking
    responseReceived: boolean
    responseDate?: string
    responseText?: string

    // Escalation
    isEscalated: boolean
    escalatedTo?: string
    escalationDate?: string

    // Result
    isSuccessful?: boolean
    completionDate?: string
    notes?: string
}

// Audit log event
export interface AuditEvent {
    id: string
    timestamp: string

    // Event details
    eventType: 'item_detected' | 'risk_assessed' | 'takedown_requested' | 'version_updated' |
    'usage_approved' | 'usage_rejected' | 'scan_completed' | 'alert_generated' |
    'profile_updated' | 'action_taken'

    // Actor
    userId: string
    userName: string

    // Target
    targetType: 'item' | 'asset' | 'request' | 'profile' | 'system'
    targetId?: string

    // Details
    action: string
    description: string
    metadata?: Record<string, any>

    // Result
    success: boolean
    errorMessage?: string
}

// Sovereign identity profile
export interface SovereignProfile {
    id: string

    // Basic info
    fullName: string
    currentTitle: string
    organization: string

    // Version control
    version: string
    lastUpdated: string
    verificationHash: string

    // Bios
    bioShort: string // 100 words
    bioLong: string // 300 words

    // Professional info
    expertise: string[]
    education: Education[]
    experience: Experience[]

    // Official assets
    officialPhotos: OfficialAsset[]
    officialVideos: OfficialAsset[]
    officialDocuments: OfficialAsset[]

    // Usage policy
    usagePolicy: UsagePolicy

    // Metadata
    createdDate: string
    createdBy: string
}

export interface Education {
    degree: string
    institution: string
    year: string
}

export interface Experience {
    title: string
    organization: string
    period: string
    description?: string
}

export interface OfficialAsset {
    id: string
    type: 'photo' | 'video' | 'document'
    title: string
    description: string
    fileUrl: string
    thumbnailUrl?: string

    // Usage
    approvedContexts: string[]
    usageCount: number

    // Metadata
    dateAdded: string
    isActive: boolean
}

export interface UsagePolicy {
    authorizedUses: string[]
    unauthorizedUses: string[]
    requiresPermission: boolean
    attributionRequired: boolean
    commercialUseAllowed: boolean
    modificationsAllowed: boolean

    // Contact
    contactEmail: string
    contactPhone?: string

    // Legal
    termsUrl?: string
    licenseType?: string
}

// Dashboard metrics
export interface DashboardMetrics {
    // Totals
    totalItems: number
    totalPhotos: number
    totalVideos: number
    totalDocuments: number
    totalMentions: number

    // New items
    newItemsThisWeek: number
    newItemsThisMonth: number

    // Risk
    globalRiskScore: number
    riskTrend: 'increasing' | 'stable' | 'decreasing'
    riskChange: number

    // Status breakdown
    criticalItems: number
    monitoredItems: number
    controlledItems: number

    // Category breakdown
    professionalItems: number
    personalItems: number
    politicalItems: number
    academicItems: number
    corporateItems: number

    // Exposure
    totalEstimatedViews: number
    totalEstimatedReach: number

    // Actions
    activeTakedowns: number
    pendingRequests: number
    activeAlerts: number

    // Trends
    exposureTrend: number // percentage change
    lastUpdated: string
}

// Search query and results
export interface SearchQuery {
    id: string
    query: string
    sources: SourceType[]
    depth: 'superficial' | 'standard' | 'deep' | 'exhaustive'
    dateRange?: {
        start: string
        end: string
    }
    language: string[]

    // Status
    status: 'pending' | 'running' | 'completed' | 'failed'
    progress: number // 0-100

    // Results
    itemsFound: number
    criticalFound: number

    // Timing
    startedAt: string
    completedAt?: string
    duration?: number // seconds
}

// Alert configuration
export interface AlertConfig {
    id: string
    name: string
    enabled: boolean

    // Trigger conditions
    triggerOn: 'new_critical' | 'unauthorized_use' | 'takedown_complete' |
    'usage_request' | 'risk_threshold' | 'new_version_detected'

    // Thresholds
    riskThreshold?: number

    // Channels
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    slackEnabled: boolean
    webhookEnabled: boolean

    // Recipients
    recipients: string[]
    webhookUrl?: string

    // Metadata
    createdDate: string
    lastTriggered?: string
}
