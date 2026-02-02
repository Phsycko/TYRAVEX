<script setup lang="ts">
import { ref } from 'vue'
import { crisisData } from '../data/gestionCrisis'

const activeTab = ref('continuity')

const tabs = [
  { id: 'continuity', label: 'Continuidad Operativa', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'leaks', label: 'Crisis Informacional', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'prediction', label: 'Anticipación', icon: 'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
  { id: 'health', label: 'Salud & Sistemas', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
]

const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'alto':
        case 'crítico': return 'text-tyravex-danger border-tyravex-danger'
        case 'medio':
        case 'moderado': return 'text-tyravex-warning border-tyravex-warning'
        case 'bajo': return 'text-tyravex-success border-tyravex-success'
        default: return 'text-tyravex-text-muted border-tyravex-text-muted'
    }
}

const getAlertBg = (level: string) => {
    switch (level) {
        case 'Crítico': return 'bg-tyravex-danger/20 border-tyravex-danger'
        case 'Precaución': return 'bg-tyravex-warning/20 border-tyravex-warning'
        default: return 'bg-tyravex-success/20 border-tyravex-success'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Gestión de Crisis</h1>
            <p class="text-tyravex-text-secondary mt-1">Monitoreo, anticipación y respuesta a eventos críticos.</p>
        </div>
        
        <!-- Big Alert Status -->
        <div class="flex items-center gap-4 px-6 py-3 rounded-lg border" :class="getAlertBg(crisisData.globalAlertLevel)">
            <div class="flex flex-col items-end">
                <span class="text-xs uppercase font-bold tracking-wider opacity-80">Nivel de Alerta Global</span>
                <span class="text-2xl font-bold">{{ crisisData.globalAlertLevel.toUpperCase() }}</span>
            </div>
            <div class="h-10 w-10 rounded-full animate-pulse-live" 
                :class="{
                    'bg-tyravex-danger': crisisData.globalAlertLevel === 'Crítico',
                    'bg-tyravex-warning': crisisData.globalAlertLevel === 'Precaución',
                    'bg-tyravex-success': crisisData.globalAlertLevel === 'Estable'
                }"
            ></div>
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

        <!-- CONTINUITY TAB -->
        <div v-if="activeTab === 'continuity'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Stress Signals -->
            <div class="lg:col-span-2 space-y-4">
                <h3 class="font-bold text-tyravex-text-primary mb-2">Señales de Estrés Activas</h3>
                <div v-for="signal in crisisData.stressSignals" :key="signal.id" 
                    class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4 flex items-center gap-4 transition-transform hover:translate-x-1"
                >
                    <div class="p-3 rounded-full bg-tyravex-bg-tertiary">
                         <svg v-if="signal.trend === 'up'" class="w-6 h-6 text-tyravex-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                         <svg v-else-if="signal.trend === 'stable'" class="w-6 h-6 text-tyravex-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"></path></svg>
                         <svg v-else class="w-6 h-6 text-tyravex-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                            <h4 class="font-bold text-tyravex-text-primary">{{ signal.type }} - {{ signal.location }}</h4>
                            <span class="px-2 py-0.5 text-xs border rounded uppercase" :class="getSeverityColor(signal.severity)">{{ signal.severity }}</span>
                        </div>
                        <p class="text-sm text-tyravex-text-secondary">{{ signal.message }}</p>
                    </div>
                </div>
            </div>

            <!-- Timeline -->
            <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5 h-fit">
                <h3 class="font-bold text-tyravex-text-primary mb-4">Eventos Recientes</h3>
                <div class="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-tyravex-border/50">
                    <div v-for="(event, idx) in crisisData.timeline" :key="idx" class="relative pl-8">
                        <div class="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-tyravex-bg-card" 
                            :class="{
                                'bg-tyravex-danger': event.type === 'danger',
                                'bg-tyravex-warning': event.type === 'warning',
                                'bg-tyravex-success': event.type === 'success',
                                'bg-tyravex-primary': event.type === 'info',
                            }"
                        ></div>
                        <span class="text-xs font-mono text-tyravex-text-muted block mb-0.5">{{ event.time }}</span>
                        <p class="text-sm text-tyravex-text-primary">{{ event.event }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- LEAKS TAB -->
        <div v-if="activeTab === 'leaks'" class="space-y-6">
            <h3 class="font-bold text-tyravex-text-primary">Fugas de Información Detectadas</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="leak in crisisData.leaks" :key="leak.id" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-white/5 rounded-bl-full transition-opacity group-hover:opacity-50"></div>
                    <div class="flex justify-between items-start mb-3">
                        <div class="px-2 py-1 bg-tyravex-bg-tertiary rounded text-xs font-mono text-tyravex-text-muted">{{ leak.time }}</div>
                        <span class="w-3 h-3 rounded-full animate-pulse" :class="leak.severity === 'Crítico' ? 'bg-tyravex-danger' : 'bg-tyravex-warning'"></span>
                    </div>
                    <h4 class="text-lg font-bold text-tyravex-text-primary mb-1">{{ leak.type }}</h4>
                    <p class="text-sm text-tyravex-text-secondary mb-4">{{ leak.source }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-semibold uppercase" :class="getSeverityColor(leak.severity)">{{ leak.severity }}</span>
                        <div class="text-xs bg-tyravex-bg-tertiary px-2 py-1 rounded text-tyravex-text-primary">{{ leak.status }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PREDICTION TAB -->
        <div v-if="activeTab === 'prediction'" class="space-y-6">
           <h3 class="font-bold text-tyravex-text-primary flex items-center gap-2">
                <svg class="w-5 h-5 text-tyravex-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Catástrofes Anticipadas (Próximos 30 días)
           </h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="catas in crisisData.catastrophes" :key="catas.id" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex flex-col justify-between">
                   <div>
                       <div class="flex justify-between mb-4">
                           <span class="text-sm font-mono text-tyravex-text-muted">{{ catas.type }}</span>
                           <span class="text-sm font-bold text-tyravex-text-primary">ETA: {{ catas.eta }}</span>
                       </div>
                       <h2 class="text-2xl font-bold text-tyravex-text-primary mb-2">{{ catas.name }}</h2>
                       <div class="space-y-4 mt-6">
                           <div>
                               <div class="flex justify-between text-sm mb-1">
                                   <span class="text-tyravex-text-secondary">Probabilidad</span>
                                   <span class="text-tyravex-text-primary font-bold">{{ catas.probability }}%</span>
                                </div>
                               <div class="w-full bg-tyravex-bg-tertiary h-2 rounded-full overflow-hidden">
                                   <div class="bg-gradient-to-r from-tyravex-warning to-tyravex-danger h-full" :style="`width: ${catas.probability}%`"></div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <button class="mt-6 w-full py-2 bg-tyravex-bg-tertiary border border-tyravex-border hover:border-tyravex-primary text-tyravex-text-primary rounded transition-colors text-sm">
                       Ver Simulación de Escenario
                   </button>
               </div>
           </div>
        </div>

        <!-- HEALTH & SYSTEMS TAB -->
        <div v-if="activeTab === 'health'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                 <h3 class="font-bold text-tyravex-text-primary mb-6">Saturación de Sistemas</h3>
                 <div class="space-y-6">
                     <div v-for="(val, key) in crisisData.saturation" :key="key">
                         <div class="flex justify-between text-sm mb-1 capitalise">
                             <span class="text-tyravex-text-secondary capitalize">{{ key }}</span>
                             <span class="font-bold" :class="val > 80 ? 'text-tyravex-danger' : (val > 60 ? 'text-tyravex-warning' : 'text-tyravex-success')">{{ val }}%</span>
                         </div>
                         <div class="w-full bg-tyravex-bg-tertiary h-3 rounded-full overflow-hidden">
                             <div class="h-full transition-all duration-500" 
                                :class="val > 80 ? 'bg-tyravex-danger' : (val > 60 ? 'bg-tyravex-warning' : 'bg-tyravex-success')"
                                :style="`width: ${val}%`"
                             ></div>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex items-center justify-center text-center">
                 <div>
                     <div class="w-20 h-20 bg-tyravex-bg-tertiary rounded-full mx-auto flex items-center justify-center mb-4">
                        <svg class="w-10 h-10 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold text-tyravex-text-primary mb-2">Proyecciones de Colapso</h3>
                     <p class="text-tyravex-text-secondary">Selecciona un sistema para ver simulaciones de estrés y puntos de quiebre.</p>
                 </div>
             </div>
        </div>

    </div>
  </div>
</template>
