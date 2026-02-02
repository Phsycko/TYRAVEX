<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Badge from '../common/Badge.vue'

const route = useRoute()
const router = useRouter()

interface NavItem {
  name: string
  path: string
  icon: string
  label: string
  badge?: number
}

const navItems: NavItem[] = [
  // ELECTORAL
  {
    name: 'dashboard',
    path: '/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    label: 'Dashboard'
  },
  {
    name: 'analytics',
    path: '/analytics',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    label: 'Analytics'
  },
  {
    name: 'monitor',
    path: '/monitor',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    label: 'Monitor',
    badge: 3
  },
  {
    name: 'predict',
    path: '/predict',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    label: 'Predict'
  },
  {
    name: 'research',
    path: '/research',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    label: 'Research'
  },
]

const controlItems: NavItem[] = [
  // CONTROL & SEGURIDAD
  {
    name: 'control-informacion',
    path: '/control-informacion',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    label: 'Control Info'
  },
  {
    name: 'gestion-crisis',
    path: '/gestion-crisis',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    label: 'Gestión Crisis'
  },
  {
    name: 'analisis-territorial',
    path: '/analisis-territorial',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Territorio'
  },
  {
    name: 'estrategia-seguridad',
    path: '/estrategia-seguridad',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Fallback map icon or shield
    label: 'Estrategia'
  }
]

const executiveItems: NavItem[] = [
  // EJECUTIVO
  {
    name: 'vista-ejecutiva',
    path: '/vista-ejecutiva',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    label: 'Ejecutivo'
  },
  {
    name: 'seguridad',
    path: '/seguridad',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    label: 'Seguridad'
  },
]

const bottomNavItems: NavItem[] = [
  {
    name: 'settings',
    path: '/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Configuración'
  }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-tyravex-bg-secondary border-r border-tyravex-border flex flex-col z-30">
    <!-- Logo -->
    <div class="h-16 px-6 flex items-center border-b border-tyravex-border">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-tyravex-secondary to-tyravex-secondary-light flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <span class="text-lg font-bold text-tyravex-text-primary">TYRAVEX</span>
          <span class="text-xs block text-tyravex-text-muted -mt-0.5">Electoral Intelligence</span>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
      <div class="space-y-1 mb-6">
        <button
          v-for="item in navItems"
          :key="item.name"
          class="nav-item w-full"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <svg class="nav-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          <span class="flex-1 text-left">{{ item.label }}</span>
          <Badge v-if="item.badge" variant="danger" dot pulse>
            {{ item.badge }}
          </Badge>
        </button>
      </div>

      <!-- SEPARATOR -->
      <div class="px-2 mb-3">
        <div class="h-px bg-tyravex-border"></div>
        <span class="text-xs font-semibold text-tyravex-text-muted mt-2 block px-2 uppercase tracking-wider">Control & Seguridad</span>
      </div>

      <div class="space-y-1 mb-6">
        <button
          v-for="item in controlItems"
          :key="item.name"
          class="nav-item w-full"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <svg class="nav-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          <span class="flex-1 text-left">{{ item.label }}</span>
        </button>
      </div>

      <!-- SEPARATOR -->
      <div class="px-2 mb-3">
        <div class="h-px bg-tyravex-border"></div>
        <span class="text-xs font-semibold text-tyravex-text-muted mt-2 block px-2 uppercase tracking-wider">Ejecutivo</span>
      </div>

      <div class="space-y-1">
        <button
          v-for="item in executiveItems"
          :key="item.name"
          class="nav-item w-full"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          <svg class="nav-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          <span class="flex-1 text-left">{{ item.label }}</span>
        </button>
      </div>
    </nav>

    <!-- Bottom Navigation -->
    <div class="px-3 py-4 border-t border-tyravex-border">
      <button
        v-for="item in bottomNavItems"
        :key="item.name"
        class="nav-item w-full"
        :class="{ active: isActive(item.path) }"
        @click="navigate(item.path)"
      >
        <svg class="nav-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
        </svg>
        <span class="flex-1 text-left">{{ item.label }}</span>
      </button>
    </div>

    <!-- User Info -->
    <div class="px-4 py-3 border-t border-tyravex-border">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-tyravex-primary flex items-center justify-center">
          <span class="text-sm font-medium text-white">CA</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-tyravex-text-primary truncate">Consultor Admin</p>
          <p class="text-xs text-tyravex-text-muted truncate">consultor@tyravex.mx</p>
        </div>
      </div>
    </div>
  </aside>
</template>
