<script setup lang="ts">
import { ref } from 'vue'
import { seguridadData } from '../data/seguridad'

const activeTab = ref('access')

const tabs = [
  { id: 'access', label: 'Control de Accesos', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'audit', label: 'Auditoría & Logs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id: 'encryption', label: 'Cifrado y Llaves', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
]

const getLogColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'success': return 'text-tyravex-success'
        case 'warning': return 'text-tyravex-warning'
        case 'error': 
        case 'failed': return 'text-tyravex-danger'
        default: return 'text-tyravex-text-muted'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Seguridad del Sistema</h1>
            <p class="text-tyravex-text-secondary mt-1">Gestión de identidades, auditoría forense y control criptográfico.</p>
        </div>
        <div class="flex gap-6">
             <div class="flex items-center gap-3 bg-tyravex-bg-card border border-tyravex-border px-4 py-2 rounded-lg">
                 <div class="w-3 h-3 rounded-full bg-tyravex-success animate-pulse"></div>
                 <div>
                     <p class="text-xs text-tyravex-text-muted uppercase">Conexión Segura</p>
                     <p class="text-sm font-bold text-tyravex-text-primary">TLS 1.3 / E2EE Activo</p>
                 </div>
             </div>
        </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-tyravex-bg-card border border-tyravex-border p-4 rounded-lg">
            <p class="text-tyravex-text-muted text-xs uppercase mb-1">Integridad</p>
            <p class="text-2xl font-bold text-tyravex-success">{{ seguridadData.status.systemIntegrity }}%</p>
        </div>
        <div class="bg-tyravex-bg-card border border-tyravex-border p-4 rounded-lg">
            <p class="text-tyravex-text-muted text-xs uppercase mb-1">Amenazas Bloqueadas</p>
            <p class="text-2xl font-bold text-tyravex-primary">{{ seguridadData.status.threatsBlocked }}</p>
        </div>
        <div class="bg-tyravex-bg-card border border-tyravex-border p-4 rounded-lg">
            <p class="text-tyravex-text-muted text-xs uppercase mb-1">Sesiones Activas</p>
            <p class="text-2xl font-bold text-tyravex-warning">{{ seguridadData.status.activeSessions }}</p>
        </div>
         <div class="bg-tyravex-bg-card border border-tyravex-border p-4 rounded-lg">
            <p class="text-tyravex-text-muted text-xs uppercase mb-1">Última Auditoría</p>
            <p class="text-lg font-bold text-tyravex-text-primary">{{ seguridadData.status.lastAudit }}</p>
        </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-tyravex-border mb-6 overflow-x-auto">
        <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap"
            :class="activeTab === tab.id ? 'border-tyravex-primary text-tyravex-primary' : 'border-transparent text-tyravex-text-muted hover:text-tyravex-text-primary'"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
            </svg>
            {{ tab.label }}
        </button>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto custom-scrollbar">

        <!-- ACCESS TAB -->
        <div v-if="activeTab === 'access'" class="space-y-6">
            <div class="overflow-x-auto rounded-lg border border-tyravex-border">
                <table class="w-full text-left">
                    <thead class="bg-tyravex-bg-tertiary text-tyravex-text-secondary text-xs uppercase font-semibold">
                        <tr>
                            <th class="px-6 py-3">Usuario</th>
                            <th class="px-6 py-3">Rol</th>
                            <th class="px-6 py-3">Nivel Acceso</th>
                            <th class="px-6 py-3">Status</th>
                            <th class="px-6 py-3">Último Acceso</th>
                            <th class="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-tyravex-border bg-tyravex-bg-card">
                        <tr v-for="user in seguridadData.users" :key="user.id" class="hover:bg-tyravex-bg-tertiary/50 transition-colors">
                            <td class="px-6 py-4 font-medium text-tyravex-text-primary">{{ user.name }}</td>
                            <td class="px-6 py-4 text-tyravex-text-secondary">{{ user.role }}</td>
                             <td class="px-6 py-4">
                                <span class="px-2 py-1 rounded bg-tyravex-bg-primary text-xs border border-tyravex-border">{{ user.accessLevel }}</span>
                             </td>
                            <td class="px-6 py-4">
                                <span class="flex items-center gap-2 text-sm">
                                    <span class="w-2 h-2 rounded-full" :class="user.status === 'Activo' ? 'bg-tyravex-success' : 'bg-tyravex-text-muted'"></span>
                                    {{ user.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-tyravex-text-muted text-sm">{{ user.lastLogin }}</td>
                            <td class="px-6 py-4 text-right">
                                <button class="text-tyravex-primary hover:text-white transition-colors text-sm">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end">
                <button class="px-4 py-2 bg-tyravex-primary hover:bg-tyravex-primary-light text-white rounded transition-colors shadow-glow-blue">
                    + Nuevo Usuario
                </button>
            </div>
        </div>

        <!-- AUDIT TAB -->
        <div v-if="activeTab === 'audit'" class="h-full flex flex-col">
            <div class="bg-[#0F1419] border border-tyravex-border rounded-t-lg p-2 flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-tyravex-danger"></div>
                <div class="w-3 h-3 rounded-full bg-tyravex-warning"></div>
                <div class="w-3 h-3 rounded-full bg-tyravex-success"></div>
                <span class="ml-2 text-xs font-mono text-tyravex-text-muted">system_audit_log.log</span>
            </div>
            <div class="flex-1 bg-tyravex-bg-primary border-x border-b border-tyravex-border rounded-b-lg p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                <div v-for="log in seguridadData.logs" :key="log.id" class="mb-1 hover:bg-white/5 p-1 rounded">
                    <span class="text-tyravex-text-muted">[{{ log.time }}]</span>
                    <span class="text-tyravex-primary mx-2">{{ log.ip }}</span>
                    <span class="text-white font-bold mx-2">{{ log.user }}</span>
                    <span class="text-tyravex-text-secondary mx-2">{{ log.action }}</span>
                    <span :class="getLogColor(log.status)">{{ log.status }}</span>
                </div>
                <div class="mt-2 animate-pulse text-tyravex-primary">_</div>
            </div>
        </div>

        <!-- ENCRYPTION TAB -->
        <div v-if="activeTab === 'encryption'" class="space-y-6">
            <h3 class="font-bold text-tyravex-text-primary">Estado Criptográfico</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="p-3 bg-tyravex-success/20 rounded-full text-tyravex-success">
                             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-tyravex-text-primary text-xl">{{ seguridadData.encryption.algorithm }}</h4>
                            <p class="text-tyravex-text-secondary">Protocolo de cifrado activo</p>
                        </div>
                    </div>
                    <div class="space-y-3 border-t border-tyravex-border pt-4">
                        <div class="flex justify-between">
                            <span class="text-tyravex-text-secondary">Rotación de Llaves</span>
                            <span class="text-tyravex-primary">{{ seguridadData.encryption.keysStatus }}</span>
                        </div>
                         <div class="flex justify-between">
                            <span class="text-tyravex-text-secondary">Expiración Certificado</span>
                            <span class="text-tyravex-success">{{ seguridadData.encryption.certificateExpiry }}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex flex-col justify-center items-center text-center">
                    <button class="px-6 py-3 bg-tyravex-bg-tertiary hover:bg-tyravex-danger hover:text-white text-tyravex-text-primary border border-tyravex-border rounded transition-all mb-2 w-full">
                        Forzar Rotación de Llaves
                    </button>
                    <p class="text-xs text-tyravex-text-muted">Solo para emergencias de seguridad declaradas.</p>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>
