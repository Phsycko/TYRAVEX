<script setup lang="ts">
import { ref, computed } from 'vue'
import { territorialData } from '../data/analisisTerritorial'

const activeTab = ref('map')
const projectionYear = ref(2025)

const tabs = [
  { id: 'map', label: 'Mapa Territorial', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'planning', label: 'Planeación Largo Plazo', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'dependencies', label: 'Dependencias & SPOF', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const currentProjection = computed(() => {
    // Find closest projection without going over, or default to first
    return territorialData.projections.find(p => p.year >= projectionYear.value) || territorialData.projections[territorialData.projections.length - 1] || { density: 0, resources: 0, risk: 0 }
})

const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
        case 'alto': return 'text-tyravex-danger'
        case 'medio': return 'text-tyravex-warning'
        case 'bajo': return 'text-tyravex-success'
        default: return 'text-tyravex-text-muted'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Análisis Territorial</h1>
            <p class="text-tyravex-text-secondary mt-1">Inteligencia geográfica para la toma de decisiones estratégicas.</p>
        </div>
        <div class="flex gap-6 text-right">
             <div>
                <p class="text-sm text-tyravex-text-muted">Resiliencia</p>
                <div class="text-2xl font-bold text-tyravex-primary">{{ territorialData.stats.resilienceScore }}/100</div>
            </div>
             <div>
                <p class="text-sm text-tyravex-text-muted">Zonas Críticas</p>
                <div class="text-2xl font-bold text-tyravex-danger">{{ territorialData.stats.criticalZones }}</div>
            </div>
             <div>
                <p class="text-sm text-tyravex-text-muted">Cuellos de Botella</p>
                <div class="text-2xl font-bold text-tyravex-warning">{{ territorialData.stats.bottlenecks }}</div>
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
    <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        
        <!-- MAP TAB -->
        <div v-if="activeTab === 'map'" class="flex-1 flex flex-col">
            <div class="flex-1 bg-tyravex-bg-card border border-tyravex-border rounded-card relative overflow-hidden group">
                <!-- Placeholder Map Background -->
                <div class="absolute inset-0 bg-[#0F1419] opacity-50">
                    <div class="w-full h-full opacity-20" style="background-image: radial-gradient(#34495E 1px, transparent 1px); background-size: 20px 20px;"></div>
                </div>
                
                <!-- Map Overlay UI -->
                <div class="absolute top-4 right-4 bg-tyravex-bg-secondary/90 backdrop-blur-md p-4 rounded-lg border border-tyravex-border shadow-lg w-64">
                    <h3 class="font-bold text-tyravex-text-primary mb-3 text-sm uppercase tracking-wider">Capas</h3>
                    <div class="space-y-2">
                        <label class="flex items-center justify-between text-sm text-tyravex-text-secondary cursor-pointer hover:text-tyravex-text-primary">
                            <span>Riesgo</span> <input type="checkbox" checked class="accent-tyravex-danger">
                        </label>
                        <label class="flex items-center justify-between text-sm text-tyravex-text-secondary cursor-pointer hover:text-tyravex-text-primary">
                            <span>Oportunidad</span> <input type="checkbox" class="accent-tyravex-success">
                        </label>
                        <label class="flex items-center justify-between text-sm text-tyravex-text-secondary cursor-pointer hover:text-tyravex-text-primary">
                            <span>Densidad Pob.</span> <input type="checkbox" class="accent-tyravex-primary">
                        </label>
                        <label class="flex items-center justify-between text-sm text-tyravex-text-secondary cursor-pointer hover:text-tyravex-text-primary">
                            <span>Infraestructura</span> <input type="checkbox" checked class="accent-tyravex-warning">
                        </label>
                    </div>
                </div>

                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p class="text-tyravex-text-muted bg-tyravex-bg-primary/80 px-4 py-2 rounded backdrop-blur">Mapa Interactivo en Construcción (Integración Mapbox/Leaflet)</p>
                </div>
                
                <!-- Mock Hotspots -->
                <div class="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-tyravex-danger animate-ping"></div>
                <div class="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-tyravex-danger/50"></div>
                
                <div class="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-tyravex-warning animate-ping" style="animation-delay: 0.5s"></div>
                <div class="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-tyravex-warning/50"></div>
            </div>
            
            <!-- Zones List -->
            <div class="h-48 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto pr-2">
                <div v-for="zona in territorialData.zones" :key="zona.id" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-3 hover:border-tyravex-primary/50 transition-colors cursor-pointer">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-tyravex-text-primary text-sm">{{ zona.name }}</h4>
                        <span class="text-[10px] px-1.5 py-0.5 rounded uppercase border" 
                            :class="zona.status === 'Crítico' ? 'border-tyravex-danger text-tyravex-danger' : 'border-tyravex-success text-tyravex-success'"
                        >{{ zona.status }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-xs mt-2">
                        <div>
                            <span class="text-tyravex-text-muted block">Riesgo</span>
                            <span class="font-semibold" :class="getRiskColor(zona.risk)">{{ zona.risk }}</span>
                        </div>
                        <div>
                            <span class="text-tyravex-text-muted block">Oportunidad</span>
                            <span class="text-tyravex-text-primary">{{ zona.opportunity }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PLANNING TAB -->
        <div v-if="activeTab === 'planning'" class="flex-col h-full space-y-6">
            <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                <h3 class="font-bold text-tyravex-text-primary mb-6">Simulador de Impacto Futuro: {{ projectionYear }}</h3>
                
                <div class="px-4 mb-10">
                    <input type="range" min="2025" max="2045" step="5" v-model="projectionYear" class="w-full h-2 bg-tyravex-bg-tertiary rounded-lg appearance-none cursor-pointer accent-tyravex-primary">
                    <div class="flex justify-between text-xs text-tyravex-text-muted mt-2 font-mono">
                        <span>2025</span>
                        <span>2030</span>
                        <span>2035</span>
                        <span>2040</span>
                        <span>2045</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div class="p-4 bg-tyravex-bg-tertiary/30 rounded-lg">
                        <div class="text-tyravex-text-muted mb-2">Densidad Poblacional</div>
                        <div class="text-3xl font-bold text-tyravex-primary transition-all duration-500">{{ currentProjection.density }}%</div>
                        <div class="text-xs text-tyravex-text-secondary mt-1">vs 2024 Base</div>
                    </div>
                    <div class="p-4 bg-tyravex-bg-tertiary/30 rounded-lg">
                        <div class="text-tyravex-text-muted mb-2">Recursos Hídricos</div>
                        <div class="text-3xl font-bold text-tyravex-warning transition-all duration-500">{{ currentProjection.resources }}%</div>
                         <div class="text-xs text-tyravex-text-secondary mt-1">Disponibilidad proyectada</div>
                    </div>
                    <div class="p-4 bg-tyravex-bg-tertiary/30 rounded-lg">
                        <div class="text-tyravex-text-muted mb-2">Índice de Riesgo Social</div>
                        <div class="text-3xl font-bold text-tyravex-danger transition-all duration-500">{{ currentProjection.risk }}%</div>
                         <div class="text-xs text-tyravex-text-secondary mt-1">Probabilidad de conflicto</div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6">
                     <h4 class="font-bold text-tyravex-text-primary mb-4">Decisiones Actuales → Consecuencias {{ projectionYear }}</h4>
                     <ul class="space-y-3 text-sm">
                         <li class="flex items-start gap-2">
                             <span class="text-tyravex-danger mt-1">➜</span>
                             <span class="text-tyravex-text-secondary">Si no se invierte en infraestructura hídrica hoy, el colapso es inminente en 5 años.</span>
                         </li>
                         <li class="flex items-start gap-2">
                             <span class="text-tyravex-success mt-1">➜</span>
                             <span class="text-tyravex-text-secondary">La zonificación actual permite un crecimiento ordenado hasta 2030.</span>
                         </li>
                     </ul>
                 </div>
                 <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 flex items-center justify-center">
                     <p class="text-tyravex-text-muted italic">Visualización evolutiva del territorio en desarrollo...</p>
                 </div>
            </div>
        </div>

        <!-- DEPENDENCIES TAB -->
        <div v-if="activeTab === 'dependencies'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5">
                    <h3 class="font-bold text-tyravex-text-primary mb-4">Cuellos de Botella Críticos</h3>
                    <div class="space-y-3">
                        <div v-for="bottle in territorialData.bottlenecks" :key="bottle.id" class="p-3 bg-tyravex-bg-tertiary rounded border-l-4 border-tyravex-danger">
                            <div class="flex justify-between items-start mb-1">
                                <span class="font-bold text-sm text-tyravex-text-primary">{{ bottle.name }}</span>
                                <span class="text-[10px] bg-tyravex-danger/20 text-tyravex-danger px-1 rounded uppercase">{{ bottle.severity }}</span>
                            </div>
                            <div class="text-xs text-tyravex-text-secondary">Impacto: {{ bottle.impact }}</div>
                        </div>
                    </div>
                </div>
                 <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5">
                    <h3 class="font-bold text-tyravex-text-primary mb-4">Puntos Únicos de Falla (SPOF)</h3>
                    <p class="text-sm text-tyravex-text-secondary mb-2">Nodos cuya falla detiene el sistema completo:</p>
                    <ul class="list-disc list-inside text-sm text-tyravex-text-muted space-y-1">
                        <li>Subestación Central</li>
                        <li>Servidor de Base de Datos Principal</li>
                        <li>Puente de Acceso Sur</li>
                    </ul>
                </div>
            </div>
            
            <div class="lg:col-span-2 bg-tyravex-bg-card border border-tyravex-border rounded-card p-4 relative flex items-center justify-center">
                 <div class="absolute top-4 left-4 z-10">
                     <h3 class="font-bold text-tyravex-text-primary">Grafo de Dependencias</h3>
                     <p class="text-xs text-tyravex-text-muted">Visualización de interconexiones</p>
                 </div>
                 
                 <!-- Simple SVG Graph Placeholder -->
                 <svg class="w-full h-full text-tyravex-border" viewBox="0 0 400 300">
                     <!-- Connections -->
                     <line x1="50" y1="150" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
                     <line x1="50" y1="150" x2="150" y2="200" stroke="currentColor" stroke-width="2" />
                     <line x1="150" y1="100" x2="250" y2="150" stroke="currentColor" stroke-width="2" />
                     <line x1="150" y1="200" x2="250" y2="150" stroke="currentColor" stroke-width="2" />
                     <line x1="250" y1="150" x2="350" y2="150" stroke="#D32F2F" stroke-width="3" stroke-dasharray="5,5" /> 
                     
                     <!-- Nodes -->
                     <circle cx="50" cy="150" r="20" fill="#1C2530" stroke="#4A90E2" stroke-width="2" />
                     <circle cx="150" cy="100" r="20" fill="#1C2530" stroke="#4A90E2" stroke-width="2" />
                     <circle cx="150" cy="200" r="20" fill="#1C2530" stroke="#4A90E2" stroke-width="2" />
                     <circle cx="250" cy="150" r="25" fill="#1C2530" stroke="#E67E22" stroke-width="2" /> <!-- Critical Hub -->
                     <circle cx="350" cy="150" r="20" fill="#1C2530" stroke="#D32F2F" stroke-width="2" /> <!-- Danger Node -->
                     
                     <!-- Labels (Simplified) -->
                     <text x="50" y="155" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">A</text>
                     <text x="250" y="155" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">HUB</text>
                     <text x="350" y="155" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">!</text>
                 </svg>
            </div>
        </div>

    </div>
  </div>
</template>
