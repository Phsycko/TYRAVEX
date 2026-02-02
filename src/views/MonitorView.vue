<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import LiveIndicator from '@/components/common/LiveIndicator.vue'
import SentimentGauge from '@/components/common/SentimentGauge.vue'
import { monitorData } from '@/data/mockData'

const activeTab = ref('dashboard')
const selectedSource = ref('all')

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'feed', label: 'Feed en Vivo' },
  { id: 'alertas', label: 'Alertas' },
  { id: 'trending', label: 'Trending' }
]

const sources = [
  { id: 'all', label: 'Todas' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' }
]

const sentimiento = computed(() => monitorData.sentimiento)
const trending = computed(() => monitorData.trending)
const menciones = computed(() => {
  if (selectedSource.value === 'all') return monitorData.menciones
  return monitorData.menciones.filter(m => m.fuente.toLowerCase() === selectedSource.value)
})
const alertas = computed(() => monitorData.alertas)
const shareOfVoice = computed(() => monitorData.shareOfVoice)
const sentimientoPorDia = computed(() => monitorData.sentimientoPorDia)

const getSentimentBg = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'bg-tyravex-success/10 border-tyravex-success/30'
    case 'negative': return 'bg-tyravex-danger/10 border-tyravex-danger/30'
    default: return 'bg-tyravex-gray-500/10 border-tyravex-gray-500/30'
  }
}

const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case 'twitter': return 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
    case 'facebook': return 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
    case 'instagram': return 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z'
    case 'tiktok': return 'M9 12a4 4 0 104 4V4a5 5 0 005 5'
    default: return 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const getAlertTypeColor = (tipo: string) => {
  switch (tipo) {
    case 'critical': return 'bg-tyravex-danger/20 border-tyravex-danger/30 text-tyravex-danger'
    case 'warning': return 'bg-tyravex-warning/20 border-tyravex-warning/30 text-tyravex-warning'
    default: return 'bg-tyravex-primary/20 border-tyravex-primary/30 text-tyravex-gray-200'
  }
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Monitor</h1>
        <p class="text-tyravex-text-muted mt-1">Vigilancia en tiempo real de medios y redes sociales</p>
      </div>
      <LiveIndicator />
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
        <Badge v-if="tab.id === 'alertas'" variant="danger" class="ml-2">{{ alertas.length }}</Badge>
      </button>
    </div>

    <!-- Tab Content: Dashboard -->
    <div v-if="activeTab === 'dashboard'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Medidor de sentimiento -->
        <Card title="Sentimiento General" class="flex flex-col items-center">
          <SentimentGauge :value="sentimiento.score" size="lg" />
          <div class="grid grid-cols-3 gap-4 w-full mt-6 pt-4 border-t border-tyravex-border">
            <div class="text-center">
              <div class="text-lg font-bold font-mono text-tyravex-success">{{ formatNumber(sentimiento.positivas) }}</div>
              <div class="text-xs text-tyravex-text-muted">Positivas</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold font-mono text-tyravex-gray-400">{{ formatNumber(sentimiento.neutrales) }}</div>
              <div class="text-xs text-tyravex-text-muted">Neutrales</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold font-mono text-tyravex-danger">{{ formatNumber(sentimiento.negativas) }}</div>
              <div class="text-xs text-tyravex-text-muted">Negativas</div>
            </div>
          </div>
        </Card>

        <!-- Grafico de sentimiento por dia -->
        <Card title="Sentimiento Ultimos 7 Dias" class="lg:col-span-2">
          <div class="h-48 flex items-end justify-between gap-2">
            <div
              v-for="dia in sentimientoPorDia"
              :key="dia.dia"
              class="flex-1 flex flex-col items-center"
            >
              <div class="w-full flex flex-col gap-0.5" style="height: 160px;">
                <div
                  class="w-full bg-tyravex-success rounded-t flex-shrink-0"
                  :style="{ height: `${(dia.positivo / 7)}px` }"
                />
                <div
                  class="w-full bg-tyravex-gray-500 flex-shrink-0"
                  :style="{ height: `${(dia.neutral / 3)}px` }"
                />
                <div
                  class="w-full bg-tyravex-danger rounded-b flex-shrink-0"
                  :style="{ height: `${(dia.negativo / 2)}px` }"
                />
              </div>
              <span class="text-xs text-tyravex-text-muted mt-2">{{ dia.dia }}</span>
            </div>
          </div>
          <div class="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-tyravex-border">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded bg-tyravex-success" />
              <span class="text-sm text-tyravex-text-muted">Positivas</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded bg-tyravex-gray-500" />
              <span class="text-sm text-tyravex-text-muted">Neutrales</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded bg-tyravex-danger" />
              <span class="text-sm text-tyravex-text-muted">Negativas</span>
            </div>
          </div>
        </Card>
      </div>

      <!-- Share of Voice y Trending -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Share of Voice -->
        <Card title="Share of Voice">
          <div class="space-y-4">
            <div
              v-for="item in shareOfVoice"
              :key="item.candidato"
              class="flex items-center gap-4"
            >
              <div class="w-28 text-sm text-tyravex-text-secondary truncate">{{ item.candidato }}</div>
              <div class="flex-1">
                <div class="h-4 bg-tyravex-bg-tertiary rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :style="{ width: `${item.porcentaje}%`, backgroundColor: item.color }"
                  />
                </div>
              </div>
              <div class="w-12 text-right text-sm font-mono font-medium" :style="{ color: item.color }">
                {{ item.porcentaje }}%
              </div>
            </div>
          </div>
        </Card>

        <!-- Trending Topics -->
        <Card title="Trending Topics">
          <template #actions>
            <LiveIndicator size="sm" text="LIVE" />
          </template>

          <div class="space-y-3">
            <div
              v-for="(topic, index) in trending"
              :key="topic.id"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-tyravex-bg-tertiary/50 cursor-pointer transition-colors"
            >
              <span class="w-6 h-6 rounded-full bg-tyravex-bg-tertiary flex items-center justify-center text-xs font-bold text-tyravex-text-muted">
                {{ index + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-tyravex-text-primary truncate">{{ topic.tema }}</p>
                <p class="text-xs text-tyravex-text-muted">{{ formatNumber(topic.menciones) }} menciones</p>
              </div>
              <Badge
                :variant="topic.sentimiento === 'positive' ? 'success' : topic.sentimiento === 'negative' ? 'danger' : 'neutral'"
                dot
              >
                {{ topic.cambio > 0 ? '+' : '' }}{{ topic.cambio }}%
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Tab Content: Feed -->
    <div v-if="activeTab === 'feed'" class="space-y-4">
      <!-- Filtros -->
      <Card>
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2">
            <span class="text-sm text-tyravex-text-muted">Fuente:</span>
            <div class="flex gap-1">
              <button
                v-for="source in sources"
                :key="source.id"
                class="px-3 py-1.5 text-xs rounded-full transition-colors"
                :class="selectedSource === source.id ? 'bg-tyravex-secondary text-white' : 'bg-tyravex-bg-tertiary text-tyravex-text-muted hover:text-tyravex-text-primary'"
                @click="selectedSource = source.id"
              >
                {{ source.label }}
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <input type="text" placeholder="Buscar menciones..." class="input input-sm w-64" />
          </div>
        </div>
      </Card>

      <!-- Feed de menciones -->
      <div class="space-y-3">
        <div
          v-for="mencion in menciones"
          :key="mencion.id"
          class="card border"
          :class="getSentimentBg(mencion.sentimiento)"
        >
          <div class="flex items-start gap-4">
            <!-- Icon de fuente -->
            <div class="w-10 h-10 rounded-full bg-tyravex-bg-tertiary flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSourceIcon(mencion.fuente)" />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-tyravex-text-primary">{{ mencion.usuario }}</span>
                <Badge :variant="mencion.sentimiento === 'positive' ? 'success' : mencion.sentimiento === 'negative' ? 'danger' : 'neutral'">
                  {{ mencion.fuente }}
                </Badge>
              </div>
              <p class="text-sm text-tyravex-text-secondary">{{ mencion.contenido }}</p>
              <div class="flex items-center gap-4 mt-2">
                <span class="text-xs text-tyravex-text-muted">{{ mencion.tiempo }}</span>
                <span class="text-xs text-tyravex-text-muted">Alcance: {{ formatNumber(mencion.alcance) }}</span>
              </div>
            </div>

            <div
              class="w-3 h-3 rounded-full flex-shrink-0"
              :class="mencion.sentimiento === 'positive' ? 'bg-tyravex-success' : mencion.sentimiento === 'negative' ? 'bg-tyravex-danger' : 'bg-tyravex-gray-500'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content: Alertas -->
    <div v-if="activeTab === 'alertas'" class="space-y-4">
      <div
        v-for="alerta in alertas"
        :key="alerta.id"
        class="card border"
        :class="getAlertTypeColor(alerta.tipo)"
      >
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="alerta.tipo === 'critical' ? 'bg-tyravex-danger/20' : alerta.tipo === 'warning' ? 'bg-tyravex-warning/20' : 'bg-tyravex-primary/20'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold">{{ alerta.titulo }}</h3>
              <Badge
                :variant="alerta.tipo === 'critical' ? 'danger' : alerta.tipo === 'warning' ? 'warning' : 'primary'"
              >
                {{ alerta.tipo === 'critical' ? 'Critico' : alerta.tipo === 'warning' ? 'Advertencia' : 'Info' }}
              </Badge>
            </div>
            <p class="text-sm opacity-80">{{ alerta.descripcion }}</p>
            <div class="flex items-center gap-4 mt-2 text-xs opacity-60">
              <span>Fuente: {{ alerta.fuente }}</span>
              <span>{{ alerta.tiempo }}</span>
              <span>Alcance: {{ formatNumber(alerta.alcance) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button class="btn-outline btn-sm">Ver detalles</button>
            <button class="btn-sm bg-white/10 hover:bg-white/20">Ignorar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content: Trending -->
    <div v-if="activeTab === 'trending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="topic in trending"
        :key="topic.id"
      >
        <div class="flex items-start justify-between mb-3">
          <Badge
            :variant="topic.sentimiento === 'positive' ? 'success' : topic.sentimiento === 'negative' ? 'danger' : 'neutral'"
            dot
          >
            {{ topic.sentimiento === 'positive' ? 'Positivo' : topic.sentimiento === 'negative' ? 'Negativo' : 'Neutral' }}
          </Badge>
          <span
            class="text-sm font-medium"
            :class="topic.cambio > 0 ? 'text-tyravex-success' : 'text-tyravex-danger'"
          >
            {{ topic.cambio > 0 ? '+' : '' }}{{ topic.cambio }}%
          </span>
        </div>

        <h3 class="text-lg font-semibold text-tyravex-text-primary mb-2">{{ topic.tema }}</h3>
        <p class="text-2xl font-bold font-mono text-tyravex-text-primary">{{ formatNumber(topic.menciones) }}</p>
        <p class="text-sm text-tyravex-text-muted">menciones</p>

        <button class="btn-outline w-full mt-4">Ver menciones</button>
      </Card>
    </div>
  </div>
</template>
