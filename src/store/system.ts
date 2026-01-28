/**
 * TYRAVEX System Store
 * Global system state management
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type SystemStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE'

export const useSystemStore = defineStore('system', () => {
  // State
  const status = ref<SystemStatus>('ONLINE')
  const uptime = ref<number>(0) // seconds
  const lastSync = ref<Date>(new Date())
  const startTime = ref<Date>(new Date())

  // Computed
  const uptimeFormatted = computed(() => {
    const hours = Math.floor(uptime.value / 3600)
    const minutes = Math.floor((uptime.value % 3600) / 60)
    const seconds = uptime.value % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const statusColor = computed(() => {
    switch (status.value) {
      case 'ONLINE':
        return 'var(--color-status-online)'
      case 'DEGRADED':
        return 'var(--color-status-degraded)'
      case 'OFFLINE':
        return 'var(--color-status-offline)'
      default:
        return 'var(--color-text-tertiary)'
    }
  })

  // Actions
  function setStatus(newStatus: SystemStatus) {
    status.value = newStatus
  }

  function updateUptime() {
    const now = new Date()
    uptime.value = Math.floor((now.getTime() - startTime.value.getTime()) / 1000)
  }

  function updateLastSync() {
    lastSync.value = new Date()
  }

  // Initialize uptime counter
  // In a real system, this would be replaced with actual backend sync
  if (typeof window !== 'undefined') {
    setInterval(() => {
      updateUptime()
    }, 1000)
  }

  return {
    // State
    status,
    uptime,
    lastSync,
    startTime,
    
    // Computed
    uptimeFormatted,
    statusColor,
    
    // Actions
    setStatus,
    updateUptime,
    updateLastSync
  }
})
