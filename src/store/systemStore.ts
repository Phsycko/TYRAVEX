import { defineStore } from 'pinia'
import type { SystemStatus, RiskLevel, Domain, Operation, Metric, Event } from '@/types/types'
import { mockDomains, mockOperations, mockMetrics, mockEvents, currentSystemState } from '@/data/mockData'

export const useSystemStore = defineStore('system', {
    state: () => ({
        status: currentSystemState.status as SystemStatus,
        activeDomain: currentSystemState.activeDomain as Domain,
        riskLevel: currentSystemState.riskLevel as RiskLevel,
        uptime: currentSystemState.uptime,
        domains: mockDomains as Domain[],
        operations: mockOperations as Operation[],
        metrics: mockMetrics as Metric[],
        events: mockEvents as Event[],
        currentTime: new Date()
    }),

    getters: {
        globalStatus: (state) => state.status,
        currentDomain: (state) => state.activeDomain,
        currentRisk: (state) => state.riskLevel,
        activeOperations: (state) => state.operations.filter(op => op.status === 'running' || op.status === 'pending'),
        recentEvents: (state) => state.events.slice(0, 5),
        relevantMetrics: (state) => (metricIds: string[]) => {
            return state.metrics.filter(m => metricIds.includes(m.id))
        },
        relevantEvents: (state) => (eventIds: string[]) => {
            return state.events.filter(e => eventIds.includes(e.id))
        }
    },

    actions: {
        updateSystemTime() {
            this.currentTime = new Date()
        },

        setActiveDomain(domainId: string) {
            const domain = this.domains.find(d => d.id === domainId)
            if (domain) {
                this.activeDomain = domain
            }
        },

        updateSystemStatus(status: SystemStatus) {
            this.status = status
        },

        updateRiskLevel(level: RiskLevel) {
            this.riskLevel = level
        },

        addEvent(event: Event) {
            this.events.unshift(event)
        },

        updateOperationProgress(operationId: string, progress: number) {
            const operation = this.operations.find(op => op.id === operationId)
            if (operation) {
                operation.progress = progress
                if (progress >= 100) {
                    operation.status = 'completed'
                }
            }
        }
    }
})
