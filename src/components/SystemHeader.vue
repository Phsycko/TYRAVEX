<template>
  <header class="system-header border-b border-tyravex-border bg-tyravex-bg-secondary px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-br from-tyravex-accent-cyan to-tyravex-accent-blue rounded flex items-center justify-center">
          <span class="text-tyravex-bg-primary font-bold text-sm">T</span>
        </div>
        <h1 class="text-xl font-bold text-gradient-blue tracking-wide">TYRAVEX</h1>
      </div>

      <!-- Status & Time -->
      <div class="flex items-center space-x-6">
        <!-- System Status -->
        <div class="flex items-center space-x-2">
          <div 
            class="w-3 h-3 rounded-full"
            :class="statusClasses"
          ></div>
          <span 
            class="text-sm font-medium font-mono"
            :class="statusTextClasses"
          >
            {{ status }}
          </span>
        </div>

        <!-- System Time -->
        <div class="text-tyravex-text-secondary font-mono text-sm">
          {{ formattedTime }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSystemStore } from '@/store/systemStore'
import type { SystemStatus } from '@/types/types'

const systemStore = useSystemStore()
const currentTime = ref(new Date())
let timeInterval: number | null = null

const status = computed<SystemStatus>(() => systemStore.globalStatus)

const statusClasses = computed(() => {
  switch (status.value) {
    case 'ONLINE':
      return 'bg-tyravex-status-online animate-pulse-slow'
    case 'ALERT':
      return 'bg-tyravex-status-alert animate-pulse'
    case 'CRITICAL':
      return 'bg-tyravex-status-critical animate-pulse'
    default:
      return 'bg-tyravex-text-muted'
  }
})

const statusTextClasses = computed(() => {
  switch (status.value) {
    case 'ONLINE':
      return 'text-tyravex-status-online glow-green'
    case 'ALERT':
      return 'text-tyravex-status-alert glow-yellow'
    case 'CRITICAL':
      return 'text-tyravex-status-critical glow-red'
    default:
      return 'text-tyravex-text-muted'
  }
})

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
})

onMounted(() => {
  timeInterval = window.setInterval(() => {
    currentTime.value = new Date()
    systemStore.updateSystemTime()
  }, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>
