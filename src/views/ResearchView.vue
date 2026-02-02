<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { researchData } from '@/data/mockData'

type Oponente = (typeof researchData.oponentes)[number]

const activeTab = ref('perfil')
const selectedOponente = ref<Oponente>(researchData.oponentes[0]!)

const tabs = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'inconsistencias', label: 'Inconsistencias' },
  { id: 'cobertura', label: 'Cobertura Mediatica' }
]

const oponentes = computed(() => researchData.oponentes)
const timeline = computed(() => researchData.timeline)
const inconsistencias = computed(() => researchData.inconsistencias)
const cobertura = computed(() => researchData.cobertura)

const selectOponente = (oponente: typeof researchData.oponentes[0]) => {
  selectedOponente.value = oponente
}

const getTimelineIcon = (tipo: string) => {
  switch (tipo) {
    case 'declaracion': return 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    case 'voto': return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    case 'evento': return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    case 'escandalo': return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
}

const getTimelineColor = (tipo: string) => {
  switch (tipo) {
    case 'declaracion': return 'bg-blue-500/20 text-blue-400'
    case 'voto': return 'bg-green-500/20 text-green-400'
    case 'evento': return 'bg-purple-500/20 text-purple-400'
    case 'escandalo': return 'bg-red-500/20 text-red-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const getSeveridadColor = (severidad: string) => {
  switch (severidad) {
    case 'Alta': return 'danger'
    case 'Media': return 'warning'
    default: return 'neutral'
  }
}

const getSentimentColor = (sentimiento: string) => {
  switch (sentimiento) {
    case 'positive': return 'bg-tyravex-success'
    case 'negative': return 'bg-tyravex-danger'
    default: return 'bg-tyravex-gray-500'
  }
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Research</h1>
        <p class="text-tyravex-text-muted mt-1">Inteligencia sobre la oposicion</p>
      </div>
      <button class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Generar Reporte
      </button>
    </div>

    <!-- Selector de oponente -->
    <Card>
      <div class="flex items-center gap-4">
        <span class="text-sm text-tyravex-text-muted">Seleccionar oponente:</span>
        <div class="flex gap-2">
          <button
            v-for="oponente in oponentes"
            :key="oponente.id"
            class="px-4 py-2 rounded-lg transition-all"
            :class="selectedOponente.id === oponente.id
              ? 'bg-tyravex-secondary text-white'
              : 'bg-tyravex-bg-tertiary text-tyravex-text-muted hover:text-tyravex-text-primary'"
            @click="selectOponente(oponente)"
          >
            {{ oponente.nombre }}
          </button>
        </div>
      </div>
    </Card>

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
        <Badge v-if="tab.id === 'inconsistencias'" variant="danger" class="ml-2">{{ inconsistencias.length }}</Badge>
      </button>
    </div>

    <!-- Tab Content: Perfil -->
    <div v-if="activeTab === 'perfil'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Perfil principal -->
      <Card class="lg:col-span-2">
        <div class="flex items-start gap-6">
          <!-- Avatar placeholder -->
          <div class="w-24 h-24 rounded-xl bg-tyravex-bg-tertiary flex items-center justify-center flex-shrink-0">
            <svg class="w-12 h-12 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h2 class="text-xl font-bold text-tyravex-text-primary">{{ selectedOponente.nombre }}</h2>
              <Badge variant="primary">{{ selectedOponente.partido }}</Badge>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span class="text-sm text-tyravex-text-muted">Edad</span>
                <p class="text-tyravex-text-primary font-medium">{{ selectedOponente.edad }} años</p>
              </div>
              <div>
                <span class="text-sm text-tyravex-text-muted">Cargo actual</span>
                <p class="text-tyravex-text-primary font-medium">{{ selectedOponente.cargo }}</p>
              </div>
              <div>
                <span class="text-sm text-tyravex-text-muted">Experiencia</span>
                <p class="text-tyravex-text-primary font-medium">{{ selectedOponente.experiencia }}</p>
              </div>
              <div>
                <span class="text-sm text-tyravex-text-muted">Popularidad</span>
                <p class="text-tyravex-text-primary font-medium font-mono">{{ selectedOponente.popularidad }}%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-tyravex-border">
          <!-- Fortalezas -->
          <div>
            <h4 class="text-sm font-medium text-tyravex-success mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Fortalezas
            </h4>
            <ul class="space-y-2">
              <li
                v-for="fortaleza in selectedOponente.fortalezas"
                :key="fortaleza"
                class="flex items-center gap-2 text-sm text-tyravex-text-secondary"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-tyravex-success" />
                {{ fortaleza }}
              </li>
            </ul>
          </div>

          <!-- Debilidades -->
          <div>
            <h4 class="text-sm font-medium text-tyravex-danger mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Debilidades
            </h4>
            <ul class="space-y-2">
              <li
                v-for="debilidad in selectedOponente.debilidades"
                :key="debilidad"
                class="flex items-center gap-2 text-sm text-tyravex-text-secondary"
              >
                <div class="w-1.5 h-1.5 rounded-full bg-tyravex-danger" />
                {{ debilidad }}
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <!-- Metricas -->
      <div class="space-y-4">
        <Card title="Popularidad">
          <div class="flex flex-col items-center py-4">
            <span class="text-4xl font-bold font-mono text-tyravex-text-primary">{{ selectedOponente.popularidad }}%</span>
            <ProgressBar :value="selectedOponente.popularidad" variant="danger" class="mt-4" />
          </div>
        </Card>

        <Card title="Sentimiento Publico">
          <div class="flex flex-col items-center py-4">
            <span class="text-4xl font-bold font-mono text-tyravex-warning">+{{ selectedOponente.sentimiento }}%</span>
            <p class="text-sm text-tyravex-text-muted mt-2">Moderado</p>
          </div>
        </Card>
      </div>
    </div>

    <!-- Tab Content: Timeline -->
    <div v-if="activeTab === 'timeline'">
      <Card title="Timeline de Posiciones">
        <div class="relative">
          <!-- Linea vertical -->
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-tyravex-border" />

          <div class="space-y-6">
            <div
              v-for="evento in timeline"
              :key="evento.id"
              class="relative flex items-start gap-4 pl-14"
            >
              <!-- Icono -->
              <div
                class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center"
                :class="getTimelineColor(evento.tipo)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTimelineIcon(evento.tipo)" />
                </svg>
              </div>

              <div class="flex-1 p-4 rounded-lg bg-tyravex-bg-tertiary/50">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-tyravex-text-primary">{{ evento.titulo }}</h4>
                  <span class="text-xs text-tyravex-text-muted">{{ evento.fecha }}</span>
                </div>
                <p class="text-sm text-tyravex-text-muted">{{ evento.descripcion }}</p>
                <p class="text-xs text-tyravex-text-muted mt-2">Fuente: {{ evento.fuente }}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Inconsistencias -->
    <div v-if="activeTab === 'inconsistencias'" class="space-y-4">
      <div
        v-for="inconsistencia in inconsistencias"
        :key="inconsistencia.id"
        class="card border border-tyravex-danger/30 bg-tyravex-danger/5"
      >
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-lg bg-tyravex-danger/20 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-tyravex-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-semibold text-tyravex-text-primary">{{ inconsistencia.tema }}</h3>
              <Badge :variant="getSeveridadColor(inconsistencia.severidad)">
                Severidad {{ inconsistencia.severidad }}
              </Badge>
            </div>

            <p class="text-sm text-tyravex-text-muted mb-4">{{ inconsistencia.descripcion }}</p>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 rounded-lg bg-tyravex-bg-tertiary">
                <p class="text-xs text-tyravex-text-muted mb-1">{{ inconsistencia.fecha1 }}</p>
                <p class="text-sm text-tyravex-text-secondary">{{ inconsistencia.posicion1 }}</p>
              </div>
              <div class="p-3 rounded-lg bg-tyravex-bg-tertiary">
                <p class="text-xs text-tyravex-text-muted mb-1">{{ inconsistencia.fecha2 }}</p>
                <p class="text-sm text-tyravex-text-secondary">{{ inconsistencia.posicion2 }}</p>
              </div>
            </div>

            <div class="flex items-center gap-2 mt-3">
              <span class="text-xs text-tyravex-text-muted">Fuentes:</span>
              <Badge v-for="fuente in inconsistencia.fuentes" :key="fuente" variant="neutral">
                {{ fuente }}
              </Badge>
            </div>
          </div>

          <button class="btn-outline btn-sm">
            Generar Contraste
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Content: Cobertura -->
    <div v-if="activeTab === 'cobertura'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Resumen -->
      <Card title="Resumen de Cobertura">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-tyravex-text-muted">Positivas</span>
            <span class="font-mono text-tyravex-success">{{ cobertura.resumen.positivas }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-tyravex-text-muted">Neutrales</span>
            <span class="font-mono text-tyravex-gray-400">{{ cobertura.resumen.neutrales }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-tyravex-text-muted">Negativas</span>
            <span class="font-mono text-tyravex-danger">{{ cobertura.resumen.negativas }}</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-tyravex-border">
          <div class="h-4 rounded-full flex overflow-hidden">
            <div
              class="bg-tyravex-success"
              :style="{ width: `${(cobertura.resumen.positivas / 200) * 100}%` }"
            />
            <div
              class="bg-tyravex-gray-500"
              :style="{ width: `${(cobertura.resumen.neutrales / 200) * 100}%` }"
            />
            <div
              class="bg-tyravex-danger"
              :style="{ width: `${(cobertura.resumen.negativas / 200) * 100}%` }"
            />
          </div>
        </div>
      </Card>

      <!-- Por medio -->
      <Card title="Cobertura por Medio" class="lg:col-span-2">
        <div class="space-y-4">
          <div
            v-for="medio in cobertura.porMedio"
            :key="medio.medio"
            class="flex items-center gap-4"
          >
            <div class="w-28 text-sm text-tyravex-text-secondary">{{ medio.medio }}</div>
            <div class="flex-1 h-4 rounded-full flex overflow-hidden bg-tyravex-bg-tertiary">
              <div
                class="bg-tyravex-success"
                :style="{ width: `${(medio.positivas / (medio.positivas + medio.neutrales + medio.negativas)) * 100}%` }"
              />
              <div
                class="bg-tyravex-gray-500"
                :style="{ width: `${(medio.neutrales / (medio.positivas + medio.neutrales + medio.negativas)) * 100}%` }"
              />
              <div
                class="bg-tyravex-danger"
                :style="{ width: `${(medio.negativas / (medio.positivas + medio.neutrales + medio.negativas)) * 100}%` }"
              />
            </div>
            <div class="w-24 text-right text-xs text-tyravex-text-muted">
              {{ medio.positivas + medio.neutrales + medio.negativas }} notas
            </div>
          </div>
        </div>
      </Card>

      <!-- Articulos recientes -->
      <Card title="Articulos Recientes" class="lg:col-span-3">
        <div class="space-y-3">
          <div
            v-for="articulo in cobertura.articulosRecientes"
            :key="articulo.id"
            class="flex items-center gap-4 p-3 rounded-lg bg-tyravex-bg-tertiary/50 hover:bg-tyravex-bg-tertiary cursor-pointer transition-colors"
          >
            <div
              class="w-2 h-2 rounded-full flex-shrink-0"
              :class="getSentimentColor(articulo.sentimiento)"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-tyravex-text-primary truncate">{{ articulo.titulo }}</p>
              <p class="text-xs text-tyravex-text-muted">{{ articulo.medio }} - {{ articulo.fecha }}</p>
            </div>
            <Badge
              :variant="articulo.sentimiento === 'positive' ? 'success' : articulo.sentimiento === 'negative' ? 'danger' : 'neutral'"
            >
              {{ articulo.sentimiento === 'positive' ? 'Positivo' : articulo.sentimiento === 'negative' ? 'Negativo' : 'Neutral' }}
            </Badge>
            <svg class="w-4 h-4 text-tyravex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
