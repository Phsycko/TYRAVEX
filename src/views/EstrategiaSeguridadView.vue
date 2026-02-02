<script setup lang="ts">
import { ref } from 'vue'
import { estrategiaData } from '../data/estrategiaSeguridad'

const activeTab = ref('scenarios')

const tabs = [
  { id: 'scenarios', label: 'Escenarios & Decisiones', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'risks', label: 'Riesgo Sistémico', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { id: 'resources', label: 'Recursos Críticos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
]

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'óptimo':
        case 'estable': return 'text-tyravex-success'
        case 'límite':
        case 'monitoreo': return 'text-tyravex-warning'
        case 'crítico':
        case 'inminente':
        case 'activo': return 'text-tyravex-danger'
        default: return 'text-tyravex-text-muted'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Estrategia y Seguridad</h1>
            <p class="text-tyravex-text-secondary mt-1">War Room: Análisis de escenarios y gestión de crisis multidominio.</p>
        </div>
        <div class="flex gap-4">
             <div class="text-right px-4 border-r border-tyravex-border">
                <p class="text-sm text-tyravex-text-muted">Riesgo Sistémico</p>
                <div class="text-2xl font-bold text-tyravex-danger">{{ estrategiaData.stats.systemicRisk }}/100</div>
            </div>
             <div class="text-right">
                <p class="text-sm text-tyravex-text-muted">Tiempo Crítico</p>
                <div class="text-2xl font-bold text-tyravex-warning">{{ estrategiaData.stats.timeToCritical }}</div>
            </div>
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

        <!-- SCENARIOS TAB -->
        <div v-if="activeTab === 'scenarios'" class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <!-- Active Scenarios List -->
            <div class="space-y-4">
                <h3 class="font-bold text-tyravex-text-primary mb-2">Escenarios Activos</h3>
                <div v-for="scene in estrategiaData.scenarios" :key="scene.id" 
                    class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4 transition-all hover:border-tyravex-primary/50 cursor-pointer"
                >
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <span class="text-xs font-mono text-tyravex-text-muted uppercase">{{ scene.type }}</span>
                            <h4 class="font-bold text-lg text-tyravex-text-primary">{{ scene.name }}</h4>
                        </div>
                        <span class="px-2 py-0.5 rounded text-xs border uppercase font-bold" :class="getStatusColor(scene.status)">{{ scene.status }}</span>
                    </div>
                    
                    <div class="mt-4">
                         <div class="flex justify-between text-xs mb-1">
                             <span class="text-tyravex-text-secondary">Probabilidad de Ocurrencia</span>
                             <span class="font-bold text-tyravex-text-primary">{{ scene.probability }}%</span>
                         </div>
                         <div class="w-full bg-tyravex-bg-tertiary h-1.5 rounded-full overflow-hidden">
                             <div class="bg-tyravex-primary h-full" :style="`width: ${scene.probability}%`"></div>
                         </div>
                    </div>
                </div>
            </div>

            <!-- Decisions Panel -->
            <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex flex-col">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-tyravex-text-primary">Decisiones Pendientes</h3>
                    <span class="bg-tyravex-danger px-2 py-1 rounded text-xs text-white font-bold animate-pulse">3 REQUIEREN ACCIÓN</span>
                </div>
                
                <div class="space-y-4 flex-1 overflow-y-auto pr-2">
                    <div v-for="decision in estrategiaData.decisions" :key="decision.id" class="p-4 bg-tyravex-bg-tertiary/50 rounded-lg border border-tyravex-border hover:bg-tyravex-bg-tertiary transition-colors">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-tyravex-text-primary">{{ decision.title }}</h4>
                            <span class="text-xs text-tyravex-danger font-mono">T-Minus: {{ decision.timeLimit }}</span>
                        </div>
                        <p class="text-sm text-tyravex-text-secondary mb-4">{{ decision.description }}</p>
                        <div class="flex gap-2">
                            <button class="flex-1 py-1.5 bg-tyravex-primary hover:bg-tyravex-primary-light text-white rounded text-sm font-medium transition-colors">Aprobar</button>
                            <button class="flex-1 py-1.5 bg-transparent border border-tyravex-border hover:bg-tyravex-bg-tertiary text-tyravex-text-secondary rounded text-sm transition-colors">Declinar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- RISK SYSTEMIC TAB -->
        <div v-if="activeTab === 'risks'" class="h-full flex flex-col">
            <h3 class="font-bold text-tyravex-text-primary mb-4">Mapa de Riesgos Interconectados</h3>
            <div class="flex-1 bg-tyravex-bg-card border border-tyravex-border rounded-card relative overflow-hidden flex items-center justify-center">
                 <!-- Canvas or Complex Graph Placeholder -->
                 <div class="text-center p-8">
                     <div class="inline-block p-4 rounded-full bg-tyravex-bg-tertiary mb-4 animate-pulse">
                         <svg class="w-12 h-12 text-tyravex-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold text-tyravex-text-primary">Simulación de Efecto Dominó</h3>
                     <p class="text-tyravex-text-secondary mt-2 max-w-md mx-auto">Visualización de cascada de riesgos: Protestas → Bloqueos → Desabasto → Caída Servicios.</p>
                 </div>
                 
                 <!-- Overlay List -->
                 <div class="absolute bottom-4 left-4 right-4 bg-tyravex-bg-secondary/90 backdrop-blur border border-tyravex-border p-4 rounded-lg">
                     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div v-for="risk in estrategiaData.risks" :key="risk.id" class="flex items-center gap-3">
                             <div class="w-2 h-2 rounded-full bg-tyravex-danger"></div>
                             <div class="text-sm">
                                 <span class="text-tyravex-text-primary block">{{ risk.source }}</span>
                                 <span class="text-tyravex-text-muted text-xs">Impacta: {{ risk.target }}</span>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        <!-- RESOURCES TAB -->
        <div v-if="activeTab === 'resources'" class="space-y-6">
            <h3 class="font-bold text-tyravex-text-primary">Disponibilidad de Recursos Críticos</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="res in estrategiaData.resources" :key="res.id" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-tyravex-bg-tertiary rounded-lg">
                                <svg class="w-5 h-5 text-tyravex-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            </div>
                            <h4 class="font-bold text-tyravex-text-primary">{{ res.name }}</h4>
                        </div>
                        <span class="px-2 py-0.5 rounded text-xs font-bold uppercase" 
                            :class="getStatusColor(res.status)"
                        >{{ res.status }}</span>
                    </div>
                    
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-tyravex-text-secondary">Disponible</span>
                                <span class="font-bold text-tyravex-text-primary">{{ res.available }}%</span>
                            </div>
                            <div class="w-full bg-tyravex-bg-tertiary h-2 rounded-full overflow-hidden">
                                <div class="h-full transition-all" 
                                    :class="res.available < res.required ? 'bg-tyravex-danger' : 'bg-tyravex-success'"
                                    :style="`width: ${res.available}%`"
                                ></div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center text-xs mt-2 pt-2 border-t border-tyravex-border/30">
                            <span class="text-tyravex-text-muted">Requerido Mínimo: {{ res.required }}%</span>
                            <span class="text-tyravex-text-primary" v-if="res.available < res.required">⚠️ DÉFICIT CRÍTICO</span>
                            <span class="text-tyravex-success" v-else>✓ COBERTURA OK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>
