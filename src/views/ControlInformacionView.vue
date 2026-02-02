<script setup lang="ts">
import { ref, computed } from 'vue'
import { controlInfoData } from '../data/controlInformacion'

const activeTab = ref('inventory')

const tabs = [
  { id: 'inventory', label: 'Inventario Huella', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'search', label: 'Busqueda Profunda', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'identity', label: 'Identidad Soberana', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'versions', label: 'Versiones & Uso', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'risk', label: 'Gestion Riesgo', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
]

const searchQuery = ref('')
const filteredInventory = computed(() => {
    if (!searchQuery.value) return controlInfoData.inventory
    return controlInfoData.inventory.filter(item => 
        item.content.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        item.source.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Controlado': return 'bg-tyravex-success/20 text-tyravex-success border-tyravex-success/30'
        case 'Monitoreado': return 'bg-tyravex-warning/20 text-tyravex-warning border-tyravex-warning/30'
        case 'Crítico': return 'bg-tyravex-danger/20 text-tyravex-danger border-tyravex-danger/30'
        default: return 'bg-tyravex-gray-500/20 text-tyravex-gray-300'
    }
}
</script>

<template>
  <div class="h-full flex flex-col p-6 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
        <div>
            <h1 class="text-3xl font-bold text-tyravex-text-primary">Control de Información</h1>
            <p class="text-tyravex-text-secondary mt-1">Gestión integral de huella digital y exposición de información.</p>
        </div>
        <div class="flex gap-4">
             <div class="text-right">
                <p class="text-sm text-tyravex-text-muted">Riesgo Global</p>
                <div class="text-2xl font-bold text-tyravex-warning">{{ controlInfoData.stats.riskScore }}/100</div>
            </div>
            <div class="text-right">
                <p class="text-sm text-tyravex-text-muted">Items Críticos</p>
                <div class="text-2xl font-bold text-tyravex-danger">{{ controlInfoData.stats.criticalItems }}</div>
            </div>
        </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4">
            <div class="text-tyravex-text-muted text-sm mb-1">Total Items</div>
            <div class="text-3xl font-bold text-tyravex-text-primary">{{ controlInfoData.stats.totalItems.toLocaleString() }}</div>
            <div class="text-xs text-tyravex-success mt-2">↑ 12 nuevos esta semana</div>
        </div>
        <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4">
            <div class="text-tyravex-text-muted text-sm mb-1">Fotos/Videos</div>
            <div class="text-3xl font-bold text-tyravex-text-primary">{{ (controlInfoData.stats.photos + controlInfoData.stats.videos).toLocaleString() }}</div>
            <div class="w-full bg-tyravex-bg-tertiary h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-tyravex-secondary h-full" style="width: 45%"></div>
            </div>
        </div>
        <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4">
            <div class="text-tyravex-text-muted text-sm mb-1">Documentos</div>
            <div class="text-3xl font-bold text-tyravex-text-primary">{{ controlInfoData.stats.documents.toLocaleString() }}</div>
             <div class="w-full bg-tyravex-bg-tertiary h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-tyravex-primary h-full" style="width: 30%"></div>
            </div>
        </div>
        <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-4">
            <div class="text-tyravex-text-muted text-sm mb-1">Menciones</div>
            <div class="text-3xl font-bold text-tyravex-text-primary">{{ controlInfoData.stats.mentions.toLocaleString() }}</div>
             <div class="w-full bg-tyravex-bg-tertiary h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-tyravex-data-purple h-full" style="width: 20%"></div>
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
        
        <!-- INVENTORY TAB -->
        <div v-if="activeTab === 'inventory'" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <!-- Charts Section -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5">
                        <h3 class="font-bold text-tyravex-text-primary mb-4">Estado de Control</h3>
                        <!-- Simple visual representation since we don't have a chart lib installed yet -->
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-tyravex-text-secondary">Controlado</span>
                                    <span class="text-tyravex-text-primary font-bold">{{ controlInfoData.status.controlled }}%</span>
                                </div>
                                <div class="w-full bg-tyravex-bg-tertiary h-2 rounded-full overflow-hidden">
                                    <div class="bg-tyravex-success h-full" :style="`width: ${controlInfoData.status.controlled}%`"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-tyravex-text-secondary">Monitoreado</span>
                                    <span class="text-tyravex-text-primary font-bold">{{ controlInfoData.status.monitored }}%</span>
                                </div>
                                <div class="w-full bg-tyravex-bg-tertiary h-2 rounded-full overflow-hidden">
                                    <div class="bg-tyravex-warning h-full" :style="`width: ${controlInfoData.status.monitored}%`"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-tyravex-text-secondary">Crítico</span>
                                    <span class="text-tyravex-text-primary font-bold">{{ controlInfoData.status.critical }}%</span>
                                </div>
                                <div class="w-full bg-tyravex-bg-tertiary h-2 rounded-full overflow-hidden">
                                    <div class="bg-tyravex-danger h-full" :style="`width: ${controlInfoData.status.critical}%`"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-5">
                         <h3 class="font-bold text-tyravex-text-primary mb-4">Fuentes Principales</h3>
                         <ul class="space-y-3">
                             <li class="flex justify-between items-center border-b border-tyravex-border/50 pb-2">
                                 <span class="text-tyravex-text-secondary">Sitios Web</span>
                                 <span class="bg-tyravex-bg-tertiary px-2 py-0.5 rounded text-xs text-tyravex-text-primary">{{ controlInfoData.sources.websites }}</span>
                             </li>
                             <li class="flex justify-between items-center border-b border-tyravex-border/50 pb-2">
                                 <span class="text-tyravex-text-secondary">Redes Sociales</span>
                                 <span class="bg-tyravex-bg-tertiary px-2 py-0.5 rounded text-xs text-tyravex-text-primary">{{ controlInfoData.sources.social }}</span>
                             </li>
                             <li class="flex justify-between items-center pb-2">
                                 <span class="text-tyravex-text-secondary">Registros Públicos</span>
                                 <span class="bg-tyravex-bg-tertiary px-2 py-0.5 rounded text-xs text-tyravex-text-primary">{{ controlInfoData.sources.publicRegistry }}</span>
                             </li>
                         </ul>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="lg:col-span-2 bg-tyravex-bg-card border border-tyravex-border rounded-card p-5 flex flex-col h-full">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-tyravex-text-primary">Detalle de Hallazgos</h3>
                        <div class="relative">
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                placeholder="Buscar..." 
                                class="bg-tyravex-bg-tertiary border border-tyravex-border rounded-btn py-1.5 px-3 text-sm text-tyravex-text-primary focus:outline-none focus:border-tyravex-primary w-64"
                            >
                        </div>
                    </div>
                    
                    <div class="overflow-auto flex-1">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-tyravex-bg-tertiary text-tyravex-text-secondary uppercase text-xs font-semibold">
                                <tr>
                                    <th class="px-4 py-3 rounded-l-lg">Tipo</th>
                                    <th class="px-4 py-3">Contenido</th>
                                    <th class="px-4 py-3">Fuente</th>
                                    <th class="px-4 py-3">Fecha</th>
                                    <th class="px-4 py-3 text-center">Riesgo</th>
                                    <th class="px-4 py-3 rounded-r-lg text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-tyravex-border/50">
                                <tr v-for="item in filteredInventory" :key="item.id" class="hover:bg-tyravex-bg-tertiary/50 transition-colors">
                                    <td class="px-4 py-3 text-tyravex-text-primary font-medium">{{ item.type }}</td>
                                    <td class="px-4 py-3 text-tyravex-text-secondary truncate max-w-xs">{{ item.content }}</td>
                                    <td class="px-4 py-3 text-tyravex-text-muted">{{ item.source }}</td>
                                    <td class="px-4 py-3 text-tyravex-text-muted">{{ item.date }}</td>
                                    <td class="px-4 py-3 text-center">
                                        <span class="block w-2 h-2 rounded-full mx-auto" 
                                            :class="{'bg-tyravex-success': item.risk === 'Bajo', 'bg-tyravex-warning': item.risk === 'Medio', 'bg-tyravex-danger': item.risk === 'Alto'}"
                                        ></span>
                                    </td>
                                    <td class="px-4 py-3 text-center">
                                        <span class="px-2 py-0.5 rounded text-xs border" :class="getStatusColor(item.status)">
                                            {{ item.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEARCH TAB (Mock) -->
        <div v-if="activeTab === 'search'" class="flex flex-col items-center justify-center h-96 text-center space-y-6">
            <h2 class="text-2xl font-bold text-tyravex-text-primary">Búsqueda Profunda Multifurente</h2>
            <div class="w-full max-w-2xl relative">
                <input type="text" placeholder="Ingresa nombre, email, teléfono o alias..." class="w-full bg-tyravex-bg-card border border-tyravex-border rounded-full py-4 px-6 text-lg text-tyravex-text-primary shadow-glow-blue focus:outline-none focus:border-tyravex-primary transition-all">
                <button class="absolute right-2 top-2 bg-tyravex-primary text-white p-2 rounded-full hover:bg-tyravex-primary-light transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </div>
            <div class="flex gap-4 text-sm text-tyravex-text-muted">
                <label class="flex items-center gap-2"><input type="checkbox" checked class="accent-tyravex-primary"> Web Superficial</label>
                <label class="flex items-center gap-2"><input type="checkbox" checked class="accent-tyravex-primary"> Redes Sociales</label>
                <label class="flex items-center gap-2"><input type="checkbox" checked class="accent-tyravex-primary"> Registros Públicos</label>
                <label class="flex items-center gap-2"><input type="checkbox" class="accent-tyravex-primary"> Deep Web</label>
            </div>
        </div>

        <!-- RISK MATRIX TAB (Simplified) -->
        <div v-if="activeTab === 'risk'" class="bg-tyravex-bg-card border border-tyravex-border rounded-card p-6 h-full flex flex-col">
            <h3 class="font-bold text-tyravex-text-primary mb-6">Matriz de Riesgo: Sensibilidad vs Exposición</h3>
            <div class="flex-1 border-l-2 border-b-2 border-tyravex-border relative p-4">
                <!-- Axis Labels -->
                <div class="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-tyravex-text-muted tracking-wider">EXPOSICIÓN</div>
                <div class="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-xs text-tyravex-text-muted tracking-wider">SENSIBILIDAD</div>

                <!-- Quadrants BG -->
                <div class="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div class="bg-tyravex-success/5 m-0.5 rounded-tl-lg"></div> <!-- Low Exp, Low Sens -->
                    <div class="bg-tyravex-warning/10 m-0.5 rounded-tr-lg"></div> <!-- Low Exp, High Sens -->
                    <div class="bg-tyravex-warning/10 m-0.5 rounded-bl-lg"></div> <!-- High Exp, Low Sens -->
                    <div class="bg-tyravex-danger/10 m-0.5 rounded-br-lg"></div> <!-- High Exp, High Sens -->
                </div>

                <!-- Plot Points -->
                <div 
                    v-for="point in controlInfoData.riskMatrix" 
                    :key="point.id"
                    class="absolute w-3 h-3 rounded-full border border-white/50 cursor-pointer hover:scale-150 transition-transform group"
                    :class="point.exposure > 50 && point.sensitivity > 50 ? 'bg-tyravex-danger' : (point.exposure > 50 || point.sensitivity > 50 ? 'bg-tyravex-warning' : 'bg-tyravex-success')"
                    :style="{ left: `${point.sensitivity}%`, bottom: `${point.exposure}%` }"
                >
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-tyravex-bg-primary border border-tyravex-border px-2 py-1 rounded text-xs text-tyravex-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        {{ point.name }} ({{ point.sensitivity }}, {{ point.exposure }})
                    </div>
                </div>
            </div>
        </div>

        <!-- OTHER TABS PLACEHOLDER -->
        <div v-if="activeTab === 'identity' || activeTab === 'versions'" class="flex flex-col items-center justify-center h-64 text-center">
            <div class="p-4 rounded-full bg-tyravex-bg-tertiary mb-4">
                <svg class="w-8 h-8 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 class="text-lg font-medium text-tyravex-text-primary">Sección en desarrollo</h3>
            <p class="text-tyravex-text-muted">Próximamente disponible en la Fase 3.</p>
        </div>

    </div>
  </div>
</template>
