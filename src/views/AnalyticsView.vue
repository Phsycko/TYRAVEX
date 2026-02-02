<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import DataTable from '@/components/common/DataTable.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { analyticsData } from '@/data/mockData'

const activeTab = ref('mapa')
const selectedMunicipio = ref<string | null>(null)

const tabs = [
  { id: 'mapa', label: 'Mapa Electoral' },
  { id: 'demografia', label: 'Demografia' },
  { id: 'historico', label: 'Historico' },
  { id: 'targeting', label: 'Micro-Targeting' }
]

const demografiaEdad = computed(() => analyticsData.demografia.edad)
const demografiaNSE = computed(() => analyticsData.demografia.nse)
const historico = computed(() => analyticsData.historico)
const municipios = computed(() => analyticsData.municipios)
const segmentos = computed(() => analyticsData.segmentos)

const historicoColumns = [
  { key: 'seccion', label: 'Seccion', sortable: true },
  { key: 'municipio', label: 'Municipio', sortable: true },
  { key: 'ano2018', label: '2018', sortable: true, align: 'right' as const },
  { key: 'ano2021', label: '2021', sortable: true, align: 'right' as const },
  { key: 'ano2024', label: '2024', sortable: true, align: 'right' as const },
  { key: 'tendencia', label: 'Tendencia', align: 'center' as const }
]

const getClasificacionColor = (clasificacion: string) => {
  switch (clasificacion) {
    case 'strong': return 'bg-tyravex-electoral-strong'
    case 'medium': return 'bg-tyravex-electoral-medium'
    case 'weak': return 'bg-tyravex-electoral-weak'
    default: return 'bg-tyravex-gray-500'
  }
}

const getClasificacionLabel = (clasificacion: string) => {
  switch (clasificacion) {
    case 'strong': return 'Fuerte (>60%)'
    case 'medium': return 'Competido (40-60%)'
    case 'weak': return 'Debil (<40%)'
    default: return 'Sin datos'
  }
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('es-MX')
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Analytics</h1>
        <p class="text-tyravex-text-muted mt-1">Inteligencia geografica y demografica</p>
      </div>
      <div class="flex items-center gap-3">
        <select class="select w-48">
          <option>Nuevo Leon</option>
          <option>Jalisco</option>
          <option>CDMX</option>
        </select>
        <button class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content: Mapa -->
    <div v-if="activeTab === 'mapa'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Mapa simulado -->
      <Card title="Mapa Electoral" class="lg:col-span-2" no-padding>
        <div class="p-4">
          <div class="aspect-video bg-tyravex-bg-tertiary rounded-lg relative overflow-hidden">
            <!-- Mapa visual simplificado con municipios -->
            <div class="absolute inset-0 p-6">
              <div class="grid grid-cols-4 grid-rows-3 gap-3 h-full">
                <div
                  v-for="muni in municipios"
                  :key="muni.id"
                  class="rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                  :class="[
                    getClasificacionColor(muni.clasificacion),
                    selectedMunicipio === muni.nombre ? 'ring-2 ring-white ring-offset-2 ring-offset-tyravex-bg-primary' : ''
                  ]"
                  @click="selectedMunicipio = muni.nombre"
                >
                  <span class="text-white text-xs font-medium text-center px-1">{{ muni.nombre }}</span>
                  <span class="text-white/80 text-xs font-mono">{{ muni.fuerza }}%</span>
                </div>
              </div>
            </div>

            <!-- Leyenda -->
            <div class="absolute bottom-4 left-4 bg-tyravex-bg-secondary/90 backdrop-blur-sm rounded-lg p-3">
              <p class="text-xs text-tyravex-text-muted mb-2">Fuerza Electoral</p>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded bg-tyravex-electoral-strong" />
                  <span class="text-xs text-tyravex-text-secondary">>60%</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded bg-tyravex-electoral-medium" />
                  <span class="text-xs text-tyravex-text-secondary">40-60%</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded bg-tyravex-electoral-weak" />
                  <span class="text-xs text-tyravex-text-secondary"><40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Detalle del municipio seleccionado -->
      <Card :title="selectedMunicipio || 'Selecciona un municipio'">
        <template v-if="selectedMunicipio">
          <div class="space-y-4">
            <div
              v-for="muni in municipios.filter(m => m.nombre === selectedMunicipio)"
              :key="muni.id"
            >
              <div class="flex items-center justify-between mb-4">
                <Badge
                  :variant="muni.clasificacion === 'strong' ? 'success' : muni.clasificacion === 'weak' ? 'danger' : 'warning'"
                >
                  {{ getClasificacionLabel(muni.clasificacion) }}
                </Badge>
                <span class="text-2xl font-bold font-mono text-tyravex-text-primary">{{ muni.fuerza }}%</span>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-tyravex-text-muted">Poblacion</span>
                  <span class="text-tyravex-text-primary font-mono">{{ formatNumber(muni.poblacion) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-tyravex-text-muted">Coordenadas</span>
                  <span class="text-tyravex-text-primary font-mono text-xs">{{ muni.lat.toFixed(4) }}, {{ muni.lng.toFixed(4) }}</span>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-tyravex-border">
                <p class="text-sm text-tyravex-text-muted mb-2">Fuerza Electoral</p>
                <ProgressBar
                  :value="muni.fuerza"
                  :variant="muni.clasificacion === 'strong' ? 'success' : muni.clasificacion === 'weak' ? 'danger' : 'warning'"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-center py-8 text-tyravex-text-muted">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p class="text-sm">Haz clic en un municipio para ver detalles</p>
          </div>
        </template>
      </Card>
    </div>

    <!-- Tab Content: Demografia -->
    <div v-if="activeTab === 'demografia'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribucion por edad -->
      <Card title="Distribucion por Edad">
        <div class="space-y-4">
          <div
            v-for="grupo in demografiaEdad"
            :key="grupo.grupo"
            class="flex items-center gap-4"
          >
            <div class="w-16 text-sm text-tyravex-text-secondary">{{ grupo.grupo }}</div>
            <div class="flex-1">
              <ProgressBar :value="grupo.porcentaje" variant="primary" />
            </div>
            <div class="w-20 text-right">
              <span class="text-sm font-mono text-tyravex-text-primary">{{ grupo.porcentaje }}%</span>
              <span class="text-xs text-tyravex-text-muted block">{{ formatNumber(grupo.total) }}</span>
            </div>
          </div>
        </div>
      </Card>

      <!-- Distribucion por NSE -->
      <Card title="Nivel Socioeconomico">
        <div class="space-y-4">
          <div
            v-for="nivel in demografiaNSE"
            :key="nivel.nivel"
            class="flex items-center gap-4"
          >
            <div class="w-28 text-sm text-tyravex-text-secondary">{{ nivel.nivel }}</div>
            <div class="flex-1">
              <div class="h-2 bg-tyravex-bg-tertiary rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :style="{ width: `${nivel.porcentaje}%`, backgroundColor: nivel.color }"
                />
              </div>
            </div>
            <div class="w-12 text-right text-sm font-mono text-tyravex-text-primary">{{ nivel.porcentaje }}%</div>
          </div>
        </div>

        <!-- Grafico de dona visual -->
        <div class="mt-6 flex items-center justify-center">
          <div class="relative w-40 h-40">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                v-for="(nivel, index) in demografiaNSE"
                :key="nivel.nivel"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                :stroke="nivel.color"
                stroke-width="20"
                :stroke-dasharray="`${nivel.porcentaje * 2.51} 251`"
                :stroke-dashoffset="-demografiaNSE.slice(0, index).reduce((acc, n) => acc + n.porcentaje * 2.51, 0)"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <span class="text-2xl font-bold text-tyravex-text-primary">765K</span>
                <span class="text-xs text-tyravex-text-muted block">Votantes</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Distribucion por genero -->
      <Card title="Distribucion por Genero" class="lg:col-span-2">
        <div class="flex items-center justify-center gap-8">
          <div
            v-for="genero in analyticsData.demografia.genero"
            :key="genero.grupo"
            class="text-center"
          >
            <div
              class="w-24 h-24 rounded-full flex items-center justify-center mb-3"
              :class="genero.grupo === 'Masculino' ? 'bg-blue-500/20' : 'bg-pink-500/20'"
            >
              <span class="text-3xl font-bold font-mono" :class="genero.grupo === 'Masculino' ? 'text-blue-400' : 'text-pink-400'">
                {{ genero.porcentaje }}%
              </span>
            </div>
            <p class="text-sm text-tyravex-text-secondary">{{ genero.grupo }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Historico -->
    <div v-if="activeTab === 'historico'">
      <Card title="Resultados Historicos por Seccion">
        <template #actions>
          <div class="flex items-center gap-2">
            <input type="text" placeholder="Buscar seccion..." class="input input-sm w-48" />
            <select class="select input-sm w-36">
              <option>Todos</option>
              <option>Monterrey</option>
              <option>San Pedro</option>
              <option>Guadalupe</option>
            </select>
          </div>
        </template>

        <DataTable
          :columns="historicoColumns"
          :data="historico"
          :rows-per-page="10"
        >
          <template #cell-ano2018="{ value }">
            <span class="font-mono">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-ano2021="{ value }">
            <span class="font-mono">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-ano2024="{ value }">
            <span class="font-mono font-medium">{{ value.toFixed(1) }}%</span>
          </template>
          <template #cell-tendencia="{ value }">
            <div class="flex items-center justify-center">
              <svg
                v-if="value === 'up'"
                class="w-5 h-5 text-tyravex-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-tyravex-danger"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </template>
        </DataTable>
      </Card>
    </div>

    <!-- Tab Content: Micro-Targeting -->
    <div v-if="activeTab === 'targeting'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card
        v-for="segmento in segmentos"
        :key="segmento.id"
        :title="segmento.nombre"
      >
        <template #actions>
          <Badge :variant="segmento.potencial === 'Alto' ? 'success' : 'warning'">
            Potencial {{ segmento.potencial }}
          </Badge>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-tyravex-text-muted">{{ segmento.descripcion }}</p>

          <div class="flex items-center justify-between p-3 rounded-lg bg-tyravex-bg-tertiary">
            <span class="text-sm text-tyravex-text-muted">Tamano del segmento</span>
            <span class="text-lg font-bold font-mono text-tyravex-text-primary">{{ formatNumber(segmento.tamano) }}</span>
          </div>

          <div class="p-3 rounded-lg border border-tyravex-secondary/30 bg-tyravex-secondary/5">
            <p class="text-xs text-tyravex-secondary font-medium mb-1">Mensaje sugerido</p>
            <p class="text-sm text-tyravex-text-secondary">{{ segmento.mensajeSugerido }}</p>
          </div>

          <button class="btn-outline w-full">
            Ver analisis detallado
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>
