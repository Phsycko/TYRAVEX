<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation: { name: string; path: string; id: string; badge?: boolean }[] = [
  { name: 'COMMAND CENTER', path: '/dashboard', id: 'dashboard' },
  { name: 'ANALYTICS', path: '/analytics', id: 'analytics' },
  { name: 'MONITOR', path: '/monitor', id: 'monitor' },
  { name: 'PREDICT', path: '/predict', id: 'predict' },
  { name: 'RESEARCH', path: '/research', id: 'research' },
  { name: 'TERRITORIO', path: '/territorio', id: 'territorio' },
  { name: 'CRISIS', path: '/gestion-crisis', id: 'gestion-crisis' },
  { name: 'CONTROL INFO', path: '/control-info', id: 'control-info' },
  { name: 'ESTRATEGIA', path: '/estrategia', id: 'estrategia' },
  { name: 'VISTA EJECUTIVA', path: '/vista-ejecutiva', id: 'vista-ejecutiva' },
  { name: 'SEGURIDAD', path: '/seguridad', id: 'seguridad' },
  { name: 'BLINDAJE', path: '/blindaje', id: 'blindaje', badge: true },
]

const isActive = (path: string) => route.path === path || (path !== '/' && route.path.startsWith(path))
</script>

<template>
  <aside class="fixed top-[60px] left-0 w-[240px] h-[calc(100vh-60px)] flex flex-col z-40 overflow-hidden"
    style="background: #14161c; border-right: 1px solid rgba(255,255,255,0.08);">
    <div class="p-4" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
      <div style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">OPERATION MODE</div>
      <div class="flex items-center gap-2 px-3 py-2" style="background: rgba(26,29,36,1); border: 1px solid rgba(255,255,255,0.05); border-radius: 2px;">
        <span class="live-dot"></span>
        <span style="font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; color: #00ffaa; letter-spacing: 0.05em;">SYSTEM ACTIVE</span>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto py-3">
      <ul class="px-2 space-y-0.5">
        <li v-for="item in navigation" :key="item.id">
          <router-link
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 transition-all"
            :style="{
              fontFamily: '\'Montserrat\', sans-serif',
              fontSize: '12px',
              fontWeight: isActive(item.path) ? '600' : '500',
              letterSpacing: '0.06em',
              color: isActive(item.path) ? '#ff6b35' : '#a0a0a0',
              background: isActive(item.path) ? 'rgba(255,107,53,0.08)' : 'transparent',
              borderLeft: isActive(item.path) ? '3px solid #ff6b35' : '3px solid transparent',
              borderRadius: '2px',
            }"
            @mouseenter="($event.target as HTMLElement).style.background = isActive(item.path) ? 'rgba(255,107,53,0.08)' : 'rgba(255,255,255,0.03)'"
            @mouseleave="($event.target as HTMLElement).style.background = isActive(item.path) ? 'rgba(255,107,53,0.08)' : 'transparent'"
          >
            {{ item.name }}
            <span v-if="item.badge" class="nav-badge">10</span>
          </router-link>
        </li>
      </ul>

      <div class="mt-6 px-4">
        <div style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">SYSTEM</div>
        <ul class="space-y-0.5">
          <li>
            <router-link to="/settings" class="flex items-center gap-3 px-3 py-2 transition-colors"
              :style="{
                fontFamily: '\'Montserrat\', sans-serif',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.06em',
                color: isActive('/settings') ? '#ff6b35' : '#a0a0a0',
                borderRadius: '2px',
              }">
              SETTINGS
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="p-4" style="border-top: 1px solid rgba(255,255,255,0.05); background: rgba(20,22,28,0.5);">
      <div class="flex items-center justify-between mb-1">
        <span style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; text-transform: uppercase;">Enterprise Plan</span>
        <span style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #ffcc00;">v2.4.0</span>
      </div>
      <div style="font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: #e0e0e0;">TYRAVEX INFINITY</div>
      <div style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; margin-top: 2px;">Authorized for Level 5</div>
    </div>
  </aside>
</template>

<style scoped>
.nav-badge {
  margin-left: auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 2px;
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  letter-spacing: 0.05em;
}
</style>
