import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ModuleStatus {
    id: string
    name: string
    status: 'active' | 'ready' | 'idle' | 'warning' | 'error' | 'offline'
    alerts: number
    lastUpdate: Date | null
}

export const useModulesStore = defineStore('modules', () => {
    const modules = ref<Record<string, ModuleStatus>>({
        dashboard: { id: 'dashboard', name: 'Command Center', status: 'active', alerts: 0, lastUpdate: new Date() },
        analytics: { id: 'analytics', name: 'Analytics', status: 'ready', alerts: 0, lastUpdate: null },
        monitor: { id: 'monitor', name: 'Monitor', status: 'active', alerts: 2, lastUpdate: new Date() },
        predict: { id: 'predict', name: 'Predict', status: 'idle', alerts: 0, lastUpdate: null },
        research: { id: 'research', name: 'Research', status: 'ready', alerts: 0, lastUpdate: null },
        territorio: { id: 'territorio', name: 'Territorio', status: 'ready', alerts: 0, lastUpdate: null },
        crisis: { id: 'crisis', name: 'Crisis', status: 'idle', alerts: 0, lastUpdate: null },
        'control-info': { id: 'control-info', name: 'Control Info', status: 'ready', alerts: 0, lastUpdate: null },
        estrategia: { id: 'estrategia', name: 'Estrategia', status: 'ready', alerts: 0, lastUpdate: null },
        seguridad: { id: 'seguridad', name: 'Seguridad', status: 'active', alerts: 1, lastUpdate: new Date() },
    })

    const totalAlerts = computed(() => {
        return Object.values(modules.value).reduce((sum, m) => sum + m.alerts, 0)
    })

    function updateStatus(moduleId: string, status: ModuleStatus['status']) {
        if (modules.value[moduleId]) {
            modules.value[moduleId].status = status
            modules.value[moduleId].lastUpdate = new Date()
        }
    }

    return { modules, totalAlerts, updateStatus }
})
