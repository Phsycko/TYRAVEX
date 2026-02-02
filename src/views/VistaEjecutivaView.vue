<script setup lang="ts">
import { ref } from 'vue'
import { ejecutivaData } from '../data/vistaEjecutiva'

const activeTab = ref('dashboard')

const tabs = [
  { id: 'dashboard', label: 'Panel Ejecutivo', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'maps', label: 'Mapas Estratégicos', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 'reports', label: 'Reportes', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'óptimo': return 'bg-tyravex-success'
        case 'atención': return 'bg-tyravex-warning'
        case 'crítico': return 'bg-tyravex-danger'
        default: return 'bg-tyravex-text-muted'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Vista Ejecutiva</h1>
            <p class="text-tyravex-text-secondary mt-1">Resumen de alto nivel para toma de decisiones rápida.</p>
        </div>
        <div class="flex items-center gap-4">
            <div class="px-4 py-2 bg-tyravex-bg-card border border-tyravex-border rounded-lg text-right">
                <p class="text-xs text-tyravex-text-muted uppercase">Eficiencia Operativa</p>
                <p class="text-xl font-bold text-tyravex-primary">{{ ejecutivaData.score }}%</p>
            </div>
            <button class="flex items-center gap-2 bg-tyravex-primary hover:bg-tyravex-primary-light text-white px-4 py-2 rounded-btn transition-colors shadow-glow-blue">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>Reporte Diario PDF</span>
            </button>
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

        <!-- DASHBOARD TAB -->
        <div v-if="activeTab === 'dashboard'" class="space-y-6">
            <!-- Top Status -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <!-- Main Status -->
                <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-tyravex-warning/10 to-transparent"></div>
                    <h3 class="font-bold text-tyravex-text-secondary uppercase text-sm mb-2 relative z-10">Estado General del Sistema</h3>
                    <div class="text-3xl font-bold text-tyravex-warning mb-2 relative z-10">{{ ejecutivaData.globalStatus.toUpperCase() }}</div>
                    <div class="w-full h-2 bg-tyravex-bg-tertiary rounded-full mt-4 overflow-hidden relative z-10">
                        <div class="h-full bg-tyravex-warning w-3/4 animate-pulse"></div>
                    </div>
                </div>

                <!-- Active Priorities -->
                <div class="lg:col-span-2 bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                    <h3 class="font-bold text-tyravex-text-primary mb-4 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-tyravex-danger animate-pulse"></span>
                        Prioridades del Día
                    </h3>
                    <div class="space-y-3">
                        <div v-for="prio in ejecutivaData.priorities" :key="prio.id" class="flex gap-4 items-center p-3 bg-tyravex-bg-tertiary rounded border border-tyravex-border/50">
                            <span class="text-2xl opacity-50 font-bold text-tyravex-text-muted">#{{ prio.id }}</span>
                            <div class="flex-1">
                                <p class="font-medium text-tyravex-text-primary">{{ prio.text }}</p>
                            </div>
                            <span class="px-2 py-1 bg-tyravex-bg-primary rounded text-xs uppercase font-bold"
                                :class="prio.type === 'Crítico' ? 'text-tyravex-danger' : (prio.type === 'Alto' ? 'text-tyravex-warning' : 'text-tyravex-success')"
                            >{{ prio.type }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modules Grid -->
            <h3 class="font-bold text-tyravex-text-primary mt-4">Estado por Módulo</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div v-for="mod in ejecutivaData.modules" :key="mod.id" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4 flex flex-col items-center hover:bg-tyravex-bg-tertiary transition-colors cursor-pointer">
                    <div class="w-3 h-3 rounded-full mb-3 shadow-[0_0_10px_currentColor]" :class="getStatusColor(mod.status)"></div>
                    <h4 class="font-bold text-tyravex-text-primary text-sm mb-1">{{ mod.name }}</h4>
                    <span class="text-xs text-tyravex-text-muted">{{ mod.status }}</span>
                    
                    <div class="mt-3 w-full h-8 flex items-end justify-center gap-1">
                        <!-- Tiny trend chart simulation -->
                        <div class="w-1 bg-tyravex-bg-tertiary/50" :class="mod.trend === 'up' ? 'h-3' : (mod.trend === 'down' ? 'h-6' : 'h-4')"></div>
                        <div class="w-1 bg-tyravex-bg-tertiary/50" :class="mod.trend === 'up' ? 'h-5' : (mod.trend === 'down' ? 'h-4' : 'h-4')"></div>
                        <div class="w-1" :class="mod.trend === 'up' ? 'h-8 bg-tyravex-success' : (mod.trend === 'down' ? 'h-2 bg-tyravex-danger' : 'h-4 bg-tyravex-warning')"></div>
                    </div>
                </div>
            </div>

            <!-- Recent Alerts -->
            <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                <h3 class="font-bold text-tyravex-text-primary mb-4">Últimas Alertas Críticas</h3>
                <div class="divide-y divide-tyravex-border/50">
                    <div v-for="alert in ejecutivaData.alerts" :key="alert.id" class="py-3 flex items-center gap-4">
                        <span class="text-xs font-mono text-tyravex-text-muted">{{ alert.time }}</span>
                        <p class="flex-1 text-sm text-tyravex-text-primary">{{ alert.message }}</p>
                        <span class="w-2 h-2 rounded-full" 
                            :class="alert.type === 'critical' ? 'bg-tyravex-danger' : (alert.type === 'warning' ? 'bg-tyravex-warning' : 'bg-tyravex-success')"
                        ></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- MAPS STRATEGIC TAB -->
        <div v-if="activeTab === 'maps'" class="h-full flex flex-col items-center justify-center bg-tyravex-bg-card border border-tyravex-border rounded-card p-8">
            <h3 class="text-2xl font-bold text-tyravex-text-primary mb-4">Mapa Estratégico Integral</h3>
            <div class="w-full max-w-3xl aspect-video bg-tyravex-bg-primary rounded-lg border border-tyravex-border relative overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <!-- Mock Map Elements -->
                <div class="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-tyravex-primary/30 rounded-full animate-ping" style="animation-duration: 3s"></div>
                <div class="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-tyravex-danger/30 rounded-full animate-ping" style="animation-duration: 2s"></div>
                
                <div class="z-10 text-center">
                    <p class="text-tyravex-text-muted mb-4">Visualización multicapa: Geografía + Tiempo + Riesgo</p>
                    <button class="px-6 py-2 border border-tyravex-primary text-tyravex-primary rounded hover:bg-tyravex-primary/10 transition-colors">
                        Explorar Mapa Interactivo Fullscreen
                    </button>
                </div>
            </div>
        </div>

        <!-- REPORTS TAB -->
        <div v-if="activeTab === 'reports'" class="space-y-6">
            <h3 class="font-bold text-tyravex-text-primary">Generación de Reportes</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 hover:border-tyravex-primary transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="p-3 bg-tyravex-bg-tertiary rounded-lg text-tyravex-primary group-hover:bg-tyravex-primary group-hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-tyravex-text-primary">Resumen Diario</h4>
                            <p class="text-xs text-tyravex-text-muted">Generado automáticamente 08:00 AM</p>
                        </div>
                    </div>
                    <button class="w-full py-2 bg-tyravex-bg-tertiary text-tyravex-text-primary text-sm rounded hover:bg-tyravex-primary hover:text-white transition-colors">Descargar PDF</button>
                </div>

                 <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 hover:border-tyravex-primary transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="p-3 bg-tyravex-bg-tertiary rounded-lg text-tyravex-warning group-hover:bg-tyravex-warning group-hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-tyravex-text-primary">Informe de Riesgos</h4>
                            <p class="text-xs text-tyravex-text-muted">Análisis semanal de amenazas</p>
                        </div>
                    </div>
                    <button class="w-full py-2 bg-tyravex-bg-tertiary text-tyravex-text-primary text-sm rounded hover:bg-tyravex-primary hover:text-white transition-colors">Descargar PDF</button>
                </div>
            </div>
            
            <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 mt-6">
                <h4 class="font-bold text-tyravex-text-primary mb-4">Historial de Descargas</h4>
                <ul class="space-y-2 text-sm">
                    <li class="flex justify-between py-2 border-b border-tyravex-border/30">
                        <span class="text-tyravex-text-secondary">Reporte_Diario_01-02-2024.pdf</span>
                        <span class="text-tyravex-text-muted">Hace 2 horas</span>
                    </li>
                    <li class="flex justify-between py-2 border-b border-tyravex-border/30">
                        <span class="text-tyravex-text-secondary">Analisis_Crisis_ZonaA.pdf</span>
                        <span class="text-tyravex-text-muted">Ayer</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>
  </div>
</template>
