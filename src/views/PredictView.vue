<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { predictData } from '@/data/mockData'

const activeTab = ref('prediccion')
const selectedScenario = ref<string | null>(null)
const simulando = ref(false)

const tabs = [
  { id: 'prediccion', label: 'Prediccion' },
  { id: 'simulador', label: 'Simulador' },
  { id: 'recomendaciones', label: 'Recomendaciones IA' }
]

const prediccion = computed(() => predictData.prediccion)
const probabilidad = computed(() => predictData.probabilidadVictoria)
const modelo = computed(() => predictData.modelo)
const tendencia = computed(() => predictData.tendenciaProbabilidad)
const escenarios = computed(() => predictData.escenarios)
const recomendaciones = computed(() => predictData.recomendaciones)

const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}

const getRiesgoColor = (riesgo: string) => {
  switch (riesgo) {
    case 'Bajo': return 'success'
    case 'Medio': return 'warning'
    case 'Alto': return 'danger'
    default: return 'neutral'
  }
}

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case 'Alta': return 'danger'
    case 'Media': return 'warning'
    case 'Baja': return 'neutral'
    default: return 'neutral'
  }
}

const simularEscenario = (id: string) => {
  selectedScenario.value = id
  simulando.value = true
  setTimeout(() => {
    simulando.value = false
  }, 1500)
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Predict</h1>
        <p class="text-tyravex-text-muted mt-1">Modelado predictivo con inteligencia artificial</p>
      </div>
      <div class="flex items-center gap-3">
        <Badge variant="success" dot>
          Modelo {{ modelo.nombre }}
        </Badge>
        <span class="text-sm text-tyravex-text-muted">
          Precision: <span class="font-mono text-tyravex-success">{{ modelo.precision }}%</span>
        </span>
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

    <!-- Tab Content: Prediccion -->
    <div v-if="activeTab === 'prediccion'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Prediccion principal -->
        <Card title="Prediccion de Resultados" class="lg:col-span-2">
          <div class="space-y-6">
            <!-- Tu candidato -->
            <div class="p-4 rounded-lg bg-tyravex-success/10 border border-tyravex-success/30">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="font-semibold text-tyravex-text-primary">{{ prediccion.candidato.nombre }}</h3>
                  <p class="text-sm text-tyravex-text-muted">Candidato principal</p>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold font-mono text-tyravex-success">{{ prediccion.candidato.porcentaje }}%</span>
                  <p class="text-xs text-tyravex-text-muted">± {{ prediccion.candidato.margenError }}%</p>
                </div>
              </div>
              <ProgressBar :value="prediccion.candidato.porcentaje" variant="success" size="lg" />
            </div>

            <!-- Oponente principal -->
            <div class="p-4 rounded-lg bg-tyravex-danger/10 border border-tyravex-danger/30">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="font-semibold text-tyravex-text-primary">{{ prediccion.oponente1.nombre }}</h3>
                  <p class="text-sm text-tyravex-text-muted">Oponente principal</p>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-bold font-mono text-tyravex-danger">{{ prediccion.oponente1.porcentaje }}%</span>
                  <p class="text-xs text-tyravex-text-muted">± {{ prediccion.oponente1.margenError }}%</p>
                </div>
              </div>
              <ProgressBar :value="prediccion.oponente1.porcentaje" variant="danger" size="lg" />
            </div>

            <!-- Otros -->
            <div class="p-4 rounded-lg bg-tyravex-bg-tertiary">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="font-semibold text-tyravex-text-primary">{{ prediccion.otros.nombre }}</h3>
                </div>
                <div class="text-right">
                  <span class="text-2xl font-bold font-mono text-tyravex-text-muted">{{ prediccion.otros.porcentaje }}%</span>
                  <p class="text-xs text-tyravex-text-muted">± {{ prediccion.otros.margenError }}%</p>
                </div>
              </div>
              <ProgressBar :value="prediccion.otros.porcentaje" variant="warning" size="md" />
            </div>
          </div>
        </Card>

        <!-- Probabilidad de victoria -->
        <Card title="Probabilidad de Victoria">
          <div class="flex flex-col items-center justify-center h-full py-8">
            <div class="relative w-48 h-48">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  stroke-width="12"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2ECC71"
                  stroke-width="12"
                  :stroke-dasharray="`${probabilidad * 2.51} 251`"
                  stroke-linecap="round"
                  class="transition-all duration-1000"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-bold font-mono text-tyravex-success">{{ probabilidad }}%</span>
                <span class="text-sm text-tyravex-text-muted mt-1">de ganar</span>
              </div>
            </div>

            <div class="mt-6 w-full p-4 rounded-lg bg-tyravex-bg-tertiary">
              <div class="flex items-center justify-between text-sm">
                <span class="text-tyravex-text-muted">Modelo</span>
                <span class="text-tyravex-text-primary">{{ modelo.nombre }}</span>
              </div>
              <div class="flex items-center justify-between text-sm mt-2">
                <span class="text-tyravex-text-muted">Precision</span>
                <span class="text-tyravex-success font-mono">{{ modelo.precision }}%</span>
              </div>
              <div class="flex items-center justify-between text-sm mt-2">
                <span class="text-tyravex-text-muted">Actualizado</span>
                <span class="text-tyravex-text-secondary">{{ modelo.ultimaActualizacion }}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Tendencia de probabilidad -->
      <Card title="Tendencia de Probabilidad (Ultimos 30 dias)">
        <div class="h-48 flex items-end justify-between gap-4 px-4">
          <div
            v-for="punto in tendencia"
            :key="punto.fecha"
            class="flex-1 flex flex-col items-center"
          >
            <div
              class="w-full max-w-12 bg-tyravex-success rounded-t transition-all duration-500 relative group"
              :style="{ height: `${punto.probabilidad * 1.8}px` }"
            >
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-tyravex-bg-secondary px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
                {{ punto.probabilidad }}%
              </div>
            </div>
            <span class="text-xs text-tyravex-text-muted mt-2">{{ punto.fecha }}</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Simulador -->
    <div v-if="activeTab === 'simulador'" class="space-y-6">
      <Card title="Simulador de Escenarios">
        <p class="text-tyravex-text-muted mb-6">
          Selecciona un escenario para simular su impacto en los resultados electorales.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="escenario in escenarios"
            :key="escenario.id"
            class="p-4 rounded-lg border cursor-pointer transition-all"
            :class="[
              selectedScenario === escenario.id
                ? 'border-tyravex-secondary bg-tyravex-secondary/10'
                : 'border-tyravex-border hover:border-tyravex-border-light bg-tyravex-bg-tertiary/50'
            ]"
            @click="simularEscenario(escenario.id)"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-tyravex-text-primary">{{ escenario.nombre }}</h3>
              <Badge :variant="getRiesgoColor(escenario.riesgo)">
                Riesgo {{ escenario.riesgo }}
              </Badge>
            </div>

            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p
                  class="text-lg font-bold font-mono"
                  :class="escenario.impactoVotos > 0 ? 'text-tyravex-success' : 'text-tyravex-danger'"
                >
                  {{ escenario.impactoVotos > 0 ? '+' : '' }}{{ escenario.impactoVotos }}%
                </p>
                <p class="text-xs text-tyravex-text-muted">Votos</p>
              </div>
              <div>
                <p class="text-lg font-bold font-mono text-tyravex-text-primary">
                  {{ escenario.costo > 0 ? formatCurrency(escenario.costo) : '-' }}
                </p>
                <p class="text-xs text-tyravex-text-muted">Costo</p>
              </div>
              <div>
                <p class="text-lg font-bold font-mono text-tyravex-text-primary">{{ escenario.tiempo }}</p>
                <p class="text-xs text-tyravex-text-muted">Tiempo</p>
              </div>
            </div>

            <div v-if="escenario.recomendado" class="mt-3 pt-3 border-t border-tyravex-border">
              <Badge variant="success" dot>Recomendado por IA</Badge>
            </div>
          </div>
        </div>
      </Card>

      <!-- Resultado de simulacion -->
      <Card v-if="selectedScenario" title="Resultado de Simulacion">
        <div v-if="simulando" class="flex flex-col items-center justify-center py-12">
          <div class="w-12 h-12 border-4 border-tyravex-secondary border-t-transparent rounded-full animate-spin" />
          <p class="text-tyravex-text-muted mt-4">Ejecutando simulacion...</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-sm font-medium text-tyravex-text-muted mb-4">Resultado actual</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-tyravex-text-secondary">Tu candidato</span>
                <span class="font-mono text-tyravex-text-primary">{{ prediccion.candidato.porcentaje }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-tyravex-text-secondary">Probabilidad</span>
                <span class="font-mono text-tyravex-success">{{ probabilidad }}%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium text-tyravex-text-muted mb-4">Resultado simulado</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-tyravex-text-secondary">Tu candidato</span>
                <span class="font-mono text-tyravex-success">
                  {{ (prediccion.candidato.porcentaje + (escenarios.find(e => e.id === selectedScenario)?.impactoVotos || 0)).toFixed(1) }}%
                  <span class="text-xs text-tyravex-success ml-1">
                    ({{ (escenarios.find(e => e.id === selectedScenario)?.impactoVotos || 0) > 0 ? '+' : '' }}{{ escenarios.find(e => e.id === selectedScenario)?.impactoVotos }}%)
                  </span>
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-tyravex-text-secondary">Probabilidad</span>
                <span class="font-mono text-tyravex-success">
                  {{ (probabilidad + (escenarios.find(e => e.id === selectedScenario)?.impactoVotos || 0) * 2).toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Recomendaciones -->
    <div v-if="activeTab === 'recomendaciones'" class="space-y-4">
      <div
        v-for="rec in recomendaciones"
        :key="rec.id"
        class="card"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="rec.prioridad === 'Alta' ? 'bg-tyravex-danger/20' : rec.prioridad === 'Media' ? 'bg-tyravex-warning/20' : 'bg-tyravex-gray-500/20'"
          >
            <svg class="w-6 h-6" :class="rec.prioridad === 'Alta' ? 'text-tyravex-danger' : rec.prioridad === 'Media' ? 'text-tyravex-warning' : 'text-tyravex-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-semibold text-tyravex-text-primary">{{ rec.titulo }}</h3>
              <Badge :variant="getPrioridadColor(rec.prioridad)">
                Prioridad {{ rec.prioridad }}
              </Badge>
            </div>
            <p class="text-sm text-tyravex-text-muted mb-3">{{ rec.descripcion }}</p>

            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <span class="text-sm text-tyravex-text-muted">Impacto potencial:</span>
                <span class="font-mono text-tyravex-success font-medium">{{ rec.impactoPotencial }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-tyravex-text-muted">Accion:</span>
                <span class="text-sm text-tyravex-secondary">{{ rec.accion }}</span>
              </div>
            </div>
          </div>

          <button class="btn-primary btn-sm">
            Implementar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
