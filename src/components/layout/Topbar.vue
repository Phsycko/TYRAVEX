<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import LiveIndicator from '../common/LiveIndicator.vue'

const route = useRoute()

const showNotifications = ref(false)

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success'
  title: string
  message: string
  time: string
  read: boolean
}

const notifications = ref<Notification[]>([
  {
    id: '1',
    type: 'alert',
    title: 'Alerta de menciones',
    message: 'Se detectaron 15 menciones negativas en la ultima hora',
    time: 'Hace 5 min',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Nuevo trending topic',
    message: '#PropuestaEducacion esta en tendencia',
    time: 'Hace 15 min',
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Prediccion actualizada',
    message: 'El modelo se ha actualizado con nuevos datos',
    time: 'Hace 1 hora',
    read: true
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': 'Centro de Comando',
    '/analytics': 'Analytics - Inteligencia Geografica',
    '/monitor': 'Monitor - Vigilancia en Tiempo Real',
    '/predict': 'Predict - Modelado Predictivo',
    '/research': 'Research - Inteligencia de Oposicion',
    '/settings': 'Configuracion'
  }
  return titles[route.path] || 'TYRAVEX'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'alert':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    case 'success':
      return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'alert': return 'text-tyravex-danger'
    case 'success': return 'text-tyravex-success'
    default: return 'text-tyravex-primary-light'
  }
}
</script>

<template>
  <header class="fixed top-0 left-64 right-0 h-16 bg-tyravex-bg-secondary/95 backdrop-blur-sm border-b border-tyravex-border z-20">
    <div class="h-full px-6 flex items-center justify-between">
      <!-- Left: Page Title -->
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-lg font-semibold text-tyravex-text-primary">{{ pageTitle }}</h1>
          <p class="text-xs text-tyravex-text-muted capitalize">{{ currentDate }}</p>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-4">
        <!-- Live Indicator -->
        <LiveIndicator size="sm" />

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            placeholder="Buscar..."
            class="input input-sm w-48 pl-9"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Notifications -->
        <div class="relative">
          <button
            class="relative p-2 rounded-lg text-tyravex-text-muted hover:text-tyravex-text-primary hover:bg-tyravex-bg-tertiary transition-colors"
            @click="showNotifications = !showNotifications"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-tyravex-danger text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-tyravex-bg-secondary border border-tyravex-border rounded-card shadow-lg overflow-hidden"
            >
              <div class="flex items-center justify-between px-4 py-3 border-b border-tyravex-border">
                <span class="font-medium text-tyravex-text-primary">Notificaciones</span>
                <button
                  class="text-xs text-tyravex-secondary hover:underline"
                  @click="markAllAsRead"
                >
                  Marcar todas como leidas
                </button>
              </div>
              <div class="max-h-80 overflow-y-auto custom-scrollbar">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="px-4 py-3 hover:bg-tyravex-bg-tertiary/50 cursor-pointer border-b border-tyravex-border last:border-0 transition-colors"
                  :class="{ 'bg-tyravex-bg-tertiary/30': !notification.read }"
                >
                  <div class="flex gap-3">
                    <svg
                      class="w-5 h-5 flex-shrink-0 mt-0.5"
                      :class="getNotificationColor(notification.type)"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getNotificationIcon(notification.type)" />
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-tyravex-text-primary">{{ notification.title }}</p>
                      <p class="text-xs text-tyravex-text-muted mt-0.5 line-clamp-2">{{ notification.message }}</p>
                      <p class="text-xs text-tyravex-text-muted mt-1">{{ notification.time }}</p>
                    </div>
                    <div
                      v-if="!notification.read"
                      class="w-2 h-2 rounded-full bg-tyravex-secondary flex-shrink-0 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 border-t border-tyravex-border text-center">
                <button class="text-sm text-tyravex-secondary hover:underline">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Export Button -->
        <button class="btn-outline btn-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
