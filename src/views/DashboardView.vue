<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/common/Card.vue'
import Stat from '@/components/common/Stat.vue'
import Badge from '@/components/common/Badge.vue'
import LiveIndicator from '@/components/common/LiveIndicator.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { dashboardData, monitorData, predictData } from '@/data/mockData'

const router = useRouter()

// KPIs
const kpis = computed(() => dashboardData.kpis)
const tendencias = computed(() => dashboardData.tendencias)
const alertas = computed(() => dashboardData.alertas)

// Quick access modules
const modules = [
  {
    id: 'analytics',
    name: 'Analytics',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    description: 'Inteligencia geografica y demografica',
    path: '/analytics',
    color: 'bg-blue-500/20 text-blue-400'
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    description: 'Vigilancia en tiempo real',
    path: '/monitor',
    color: 'bg-green-500/20 text-green-400'
  },
  {
    id: 'predict',
    name: 'Predict',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    description: 'Modelado predictivo con IA',
    path: '/predict',
    color: 'bg-yellow-500/20 text-yellow-400'
  },
  {
    id: 'research',
    name: 'Research',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    description: 'Inteligencia de oposicion',
    path: '/research',
    color: 'bg-purple-500/20 text-purple-400'
  }
]

const navigateTo = (path: string) => {
  router.push(path)
}

const getAlertIcon = (tipo: string) => {
  switch (tipo) {
    case 'critical':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    case 'warning':
      return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const getAlertColor = (tipo: string) => {
  switch (tipo) {
    case 'critical': return 'text-tyravex-danger'
    case 'warning': return 'text-tyravex-warning'
    default: return 'text-tyravex-primary-light'
  }
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header con indicador LIVE -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Centro de Comando</h1>
        <p class="text-tyravex-text-muted mt-1">Vista 360° de la campana electoral</p>
      </div>
      <LiveIndicator />
    </div>

    <!-- KPIs principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat
        :label="kpis.intencionVoto.label"
        :value="`${kpis.intencionVoto.value}${kpis.intencionVoto.unit}`"
        :change="kpis.intencionVoto.change"
        change-label="vs semana pasada"
        icon="📊"
      />
      <Stat
        :label="kpis.sentimientoPublico.label"
        :value="`+${kpis.sentimientoPublico.value}${kpis.sentimientoPublico.unit}`"
        :change="kpis.sentimientoPublico.change"
        change-label="vs semana pasada"
        icon="💬"
      />
      <Stat
        :label="kpis.alcanceMedios.label"
        :value="`${kpis.alcanceMedios.value}${kpis.alcanceMedios.unit}`"
        :change="kpis.alcanceMedios.change"
        change-label="impresiones"
        icon="📡"
      />
      <Stat
        :label="kpis.mencionesTotales.label"
        :value="formatNumber(kpis.mencionesTotales.value)"
        :change="kpis.mencionesTotales.change"
        change-label="esta semana"
        icon="📱"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Grafico de tendencias -->
      <Card title="Tendencias Ultimos 30 Dias" class="lg:col-span-2">
        <div class="h-64 flex items-end justify-between gap-2 px-4">
          <div
            v-for="(punto, index) in tendencias"
            :key="index"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <div class="w-full flex flex-col items-center gap-1">
              <!-- Barra de intencion -->
              <div
                class="w-full max-w-8 bg-tyravex-success rounded-t transition-all duration-500"
                :style="{ height: `${punto.intencion * 2}px` }"
              />
              <!-- Barra de sentimiento -->
              <div
                class="w-full max-w-8 bg-tyravex-secondary rounded-b transition-all duration-500"
                :style="{ height: `${punto.sentimiento * 1.5}px` }"
              />
            </div>
            <span class="text-xs text-tyravex-text-muted">{{ punto.fecha }}</span>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-tyravex-border">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded bg-tyravex-success" />
            <span class="text-sm text-tyravex-text-muted">Intencion de voto</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded bg-tyravex-secondary" />
            <span class="text-sm text-tyravex-text-muted">Sentimiento</span>
          </div>
        </div>
      </Card>

      <!-- Alertas recientes -->
      <Card title="Alertas Recientes">
        <template #actions>
          <Badge variant="danger" dot pulse>{{ alertas.length }}</Badge>
        </template>

        <div class="space-y-3">
          <div
            v-for="alerta in alertas"
            :key="alerta.id"
            class="flex items-start gap-3 p-3 rounded-lg bg-tyravex-bg-tertiary/50 hover:bg-tyravex-bg-tertiary cursor-pointer transition-colors"
            @click="navigateTo(`/${alerta.modulo}`)"
          >
            <svg
              class="w-5 h-5 flex-shrink-0 mt-0.5"
              :class="getAlertColor(alerta.tipo)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getAlertIcon(alerta.tipo)" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-tyravex-text-primary">{{ alerta.mensaje }}</p>
              <p class="text-xs text-tyravex-text-muted mt-1">{{ alerta.tiempo }}</p>
            </div>
          </div>
        </div>

        <button class="w-full mt-4 text-sm text-tyravex-secondary hover:underline">
          Ver todas las alertas
        </button>
      </Card>
    </div>

    <!-- Prediccion rapida y Share of Voice -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Prediccion actual -->
      <Card title="Prediccion Actual">
        <template #actions>
          <Badge variant="success">Modelo activo</Badge>
        </template>

        <div class="space-y-4">
          <!-- Tu candidato -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-tyravex-text-primary">{{ predictData.prediccion.candidato.nombre }}</span>
              <span class="text-sm font-mono text-tyravex-success">{{ predictData.prediccion.candidato.porcentaje }}%</span>
            </div>
            <ProgressBar
              :value="predictData.prediccion.candidato.porcentaje"
              variant="success"
              size="lg"
            />
          </div>

          <!-- Oponente -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-tyravex-text-primary">{{ predictData.prediccion.oponente1.nombre }}</span>
              <span class="text-sm font-mono text-tyravex-danger">{{ predictData.prediccion.oponente1.porcentaje }}%</span>
            </div>
            <ProgressBar
              :value="predictData.prediccion.oponente1.porcentaje"
              variant="danger"
              size="lg"
            />
          </div>

          <!-- Otros -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-tyravex-text-muted">{{ predictData.prediccion.otros.nombre }}</span>
              <span class="text-sm font-mono text-tyravex-text-muted">{{ predictData.prediccion.otros.porcentaje }}%</span>
            </div>
            <ProgressBar
              :value="predictData.prediccion.otros.porcentaje"
              variant="warning"
              size="lg"
            />
          </div>

          <!-- Probabilidad de victoria -->
          <div class="mt-6 p-4 rounded-lg bg-tyravex-success/10 border border-tyravex-success/30">
            <div class="flex items-center justify-between">
              <span class="text-sm text-tyravex-success">Probabilidad de Victoria</span>
              <span class="text-2xl font-bold font-mono text-tyravex-success">{{ predictData.probabilidadVictoria }}%</span>
            </div>
          </div>
        </div>
      </Card>

      <!-- Share of Voice -->
      <Card title="Share of Voice">
        <template #actions>
          <span class="text-xs text-tyravex-text-muted">Ultimas 24 horas</span>
        </template>

        <div class="space-y-4">
          <div
            v-for="item in monitorData.shareOfVoice"
            :key="item.candidato"
            class="flex items-center gap-4"
          >
            <div class="w-24 text-sm text-tyravex-text-secondary truncate">{{ item.candidato }}</div>
            <div class="flex-1">
              <div class="h-6 bg-tyravex-bg-tertiary rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ width: `${item.porcentaje}%`, backgroundColor: item.color }"
                />
              </div>
            </div>
            <div class="w-12 text-right text-sm font-mono" :style="{ color: item.color }">
              {{ item.porcentaje }}%
            </div>
          </div>
        </div>

        <!-- Menciones totales -->
        <div class="mt-6 pt-4 border-t border-tyravex-border">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-tyravex-success" />
                <span class="text-xs text-tyravex-text-muted">Positivas: {{ monitorData.sentimiento.positivas }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-tyravex-gray-400" />
                <span class="text-xs text-tyravex-text-muted">Neutrales: {{ monitorData.sentimiento.neutrales }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-tyravex-danger" />
                <span class="text-xs text-tyravex-text-muted">Negativas: {{ monitorData.sentimiento.negativas }}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Acceso rapido a modulos -->
    <div>
      <h2 class="text-lg font-semibold text-tyravex-text-primary mb-4">Acceso Rapido</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="mod in modules"
          :key="mod.id"
          class="card text-left group hover:border-tyravex-secondary/50 transition-all"
          @click="navigateTo(mod.path)"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center"
              :class="mod.color"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mod.icon" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-tyravex-text-primary group-hover:text-tyravex-secondary transition-colors">
                {{ mod.name }}
              </h3>
              <p class="text-sm text-tyravex-text-muted mt-1">{{ mod.description }}</p>
            </div>
            <svg
              class="w-5 h-5 text-tyravex-text-muted group-hover:text-tyravex-secondary group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Trending Topics -->
    <Card title="Trending Topics">
      <template #actions>
        <LiveIndicator size="sm" text="ACTUALIZANDO" />
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="topic in monitorData.trending"
          :key="topic.id"
          class="p-4 rounded-lg bg-tyravex-bg-tertiary/50 hover:bg-tyravex-bg-tertiary cursor-pointer transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <Badge
              :variant="topic.sentimiento === 'positive' ? 'success' : topic.sentimiento === 'negative' ? 'danger' : 'neutral'"
              dot
            >
              {{ topic.sentimiento === 'positive' ? 'Positivo' : topic.sentimiento === 'negative' ? 'Negativo' : 'Neutral' }}
            </Badge>
            <span
              class="text-xs font-medium"
              :class="topic.cambio > 0 ? 'text-tyravex-success' : 'text-tyravex-danger'"
            >
              {{ topic.cambio > 0 ? '+' : '' }}{{ topic.cambio }}%
            </span>
          </div>
          <h4 class="font-medium text-tyravex-text-primary truncate">{{ topic.tema }}</h4>
          <p class="text-sm text-tyravex-text-muted mt-1">{{ formatNumber(topic.menciones) }} menciones</p>
        </div>
      </div>
    </Card>
  </div>
</template>
