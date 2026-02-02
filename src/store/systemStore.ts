import { defineStore } from 'pinia'

// Simplified store for the electoral intelligence platform
export const useSystemStore = defineStore('system', {
    state: () => ({
        status: 'ONLINE' as 'ONLINE' | 'ALERT' | 'CRITICAL',
        currentTime: new Date(),
        lastUpdate: new Date(),
        isLive: true
    }),

    getters: {
        globalStatus: (state) => state.status,
        formattedTime: (state) => state.currentTime.toLocaleTimeString('es-MX')
    },

    actions: {
        updateSystemTime() {
            this.currentTime = new Date()
        },

        setStatus(status: 'ONLINE' | 'ALERT' | 'CRITICAL') {
            this.status = status
        },

        updateLastRefresh() {
            this.lastUpdate = new Date()
        }
    }
})
