// Message types
export interface Message {
    id: string
    type: 'system' | 'user'
    content: string
    timestamp: Date
    sender: 'TYRAVEX' | 'USER'
}

// System status
export type SystemStatus = 'ONLINE' | 'ALERT' | 'CRITICAL'

// Quick command
export interface QuickCommand {
    id: string
    label: string
    action: string
    context?: string
}

// Metric with interpretation
export interface Metric {
    id: string
    name: string
    value: string | number
    interpretation: string
    trend?: 'up' | 'down' | 'stable'
    status?: 'normal' | 'warning' | 'critical'
}

// Event
export interface Event {
    id: string
    type: 'info' | 'warning' | 'critical'
    description: string
    timestamp: Date
    node?: string
}

// Operation
export interface Operation {
    id: string
    name: string
    status: 'running' | 'pending' | 'completed' | 'failed'
    progress?: number
}

// Domain
export interface Domain {
    id: string
    name: string
    status: SystemStatus
    description: string
}

// Risk level
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

// Conversation context
export interface ConversationContext {
    currentTopic?: string
    relevantMetrics: string[]
    relevantEvents: string[]
    showIntelPanel: boolean
}
