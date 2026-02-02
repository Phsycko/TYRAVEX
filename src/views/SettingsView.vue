<script setup lang="ts">
import { ref, reactive } from 'vue'
import Card from '@/components/common/Card.vue'
import Badge from '@/components/common/Badge.vue'
import { settingsData } from '@/data/mockData'

const activeTab = ref('campana')

const tabs = [
  { id: 'campana', label: 'Campana' },
  { id: 'alertas', label: 'Alertas' },
  { id: 'integraciones', label: 'Integraciones' }
]

const campana = reactive({ ...settingsData.campana })
const alertas = reactive({ ...settingsData.alertas })
const integraciones = reactive({ ...settingsData.integraciones })

const saving = ref(false)

const saveSettings = () => {
  saving.value = true
  setTimeout(() => {
    saving.value = false
  }, 1000)
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-tyravex-text-primary">Configuracion</h1>
        <p class="text-tyravex-text-muted mt-1">Administra la configuracion de tu campana</p>
      </div>
      <button class="btn-primary" :disabled="saving" @click="saveSettings">
        <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span v-else>Guardar cambios</span>
      </button>
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

    <!-- Tab Content: Campana -->
    <div v-if="activeTab === 'campana'">
      <Card title="Informacion de la Campana">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="label">Nombre de la campana</label>
            <input v-model="campana.nombre" type="text" class="input" />
          </div>
          <div>
            <label class="label">Candidato</label>
            <input v-model="campana.candidato" type="text" class="input" />
          </div>
          <div>
            <label class="label">Partido / Coalicion</label>
            <input v-model="campana.partido" type="text" class="input" />
          </div>
          <div>
            <label class="label">Estado</label>
            <select v-model="campana.estado" class="select">
              <option>Nuevo Leon</option>
              <option>Jalisco</option>
              <option>CDMX</option>
              <option>Estado de Mexico</option>
            </select>
          </div>
          <div>
            <label class="label">Fecha de inicio</label>
            <input v-model="campana.fechaInicio" type="date" class="input" />
          </div>
          <div>
            <label class="label">Fecha de eleccion</label>
            <input v-model="campana.fechaEleccion" type="date" class="input" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Alertas -->
    <div v-if="activeTab === 'alertas'">
      <Card title="Configuracion de Alertas">
        <div class="space-y-6">
          <div class="flex items-center justify-between p-4 rounded-lg bg-tyravex-bg-tertiary">
            <div>
              <h4 class="font-medium text-tyravex-text-primary">Alertas de menciones negativas</h4>
              <p class="text-sm text-tyravex-text-muted">Recibir notificaciones cuando se detecten menciones negativas</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="alertas.mencionesNegativas" type="checkbox" class="sr-only peer" />
              <div class="w-11 h-6 bg-tyravex-bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-tyravex-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg bg-tyravex-bg-tertiary">
            <div>
              <h4 class="font-medium text-tyravex-text-primary">Alertas de trending topics</h4>
              <p class="text-sm text-tyravex-text-muted">Notificar cuando un tema relacionado entre en tendencia</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="alertas.trendingTopics" type="checkbox" class="sr-only peer" />
              <div class="w-11 h-6 bg-tyravex-bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-tyravex-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg bg-tyravex-bg-tertiary">
            <div>
              <h4 class="font-medium text-tyravex-text-primary">Actualizaciones de predicciones</h4>
              <p class="text-sm text-tyravex-text-muted">Notificar cuando el modelo actualice las predicciones</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="alertas.actualizacionPredicciones" type="checkbox" class="sr-only peer" />
              <div class="w-11 h-6 bg-tyravex-bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-tyravex-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>

          <div>
            <label class="label">Umbral de menciones para alerta</label>
            <div class="flex items-center gap-4">
              <input v-model.number="alertas.umbralMenciones" type="range" min="1" max="50" class="flex-1" />
              <span class="w-12 text-center font-mono text-tyravex-text-primary">{{ alertas.umbralMenciones }}</span>
            </div>
          </div>

          <div>
            <label class="label">Email para notificaciones</label>
            <input v-model="alertas.emailNotificaciones" type="email" class="input" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Content: Integraciones -->
    <div v-if="activeTab === 'integraciones'">
      <Card title="Integraciones de Redes Sociales">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center justify-between p-4 rounded-lg border border-tyravex-border">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-tyravex-text-primary">Twitter / X</h4>
                <Badge :variant="integraciones.twitter ? 'success' : 'neutral'">
                  {{ integraciones.twitter ? 'Conectado' : 'Desconectado' }}
                </Badge>
              </div>
            </div>
            <button
              class="btn-sm"
              :class="integraciones.twitter ? 'btn-outline' : 'btn-primary'"
              @click="integraciones.twitter = !integraciones.twitter"
            >
              {{ integraciones.twitter ? 'Desconectar' : 'Conectar' }}
            </button>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg border border-tyravex-border">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-tyravex-text-primary">Facebook</h4>
                <Badge :variant="integraciones.facebook ? 'success' : 'neutral'">
                  {{ integraciones.facebook ? 'Conectado' : 'Desconectado' }}
                </Badge>
              </div>
            </div>
            <button
              class="btn-sm"
              :class="integraciones.facebook ? 'btn-outline' : 'btn-primary'"
              @click="integraciones.facebook = !integraciones.facebook"
            >
              {{ integraciones.facebook ? 'Desconectar' : 'Conectar' }}
            </button>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg border border-tyravex-border">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-tyravex-text-primary">Instagram</h4>
                <Badge :variant="integraciones.instagram ? 'success' : 'neutral'">
                  {{ integraciones.instagram ? 'Conectado' : 'Desconectado' }}
                </Badge>
              </div>
            </div>
            <button
              class="btn-sm"
              :class="integraciones.instagram ? 'btn-outline' : 'btn-primary'"
              @click="integraciones.instagram = !integraciones.instagram"
            >
              {{ integraciones.instagram ? 'Desconectar' : 'Conectar' }}
            </button>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg border border-tyravex-border">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-tyravex-text-primary">TikTok</h4>
                <Badge :variant="integraciones.tiktok ? 'success' : 'neutral'">
                  {{ integraciones.tiktok ? 'Conectado' : 'Desconectado' }}
                </Badge>
              </div>
            </div>
            <button
              class="btn-sm"
              :class="integraciones.tiktok ? 'btn-outline' : 'btn-primary'"
              @click="integraciones.tiktok = !integraciones.tiktok"
            >
              {{ integraciones.tiktok ? 'Desconectar' : 'Conectar' }}
            </button>
          </div>

          <div class="flex items-center justify-between p-4 rounded-lg border border-tyravex-border md:col-span-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-tyravex-text-primary">Google News</h4>
                <Badge :variant="integraciones.googleNews ? 'success' : 'neutral'">
                  {{ integraciones.googleNews ? 'Conectado' : 'Desconectado' }}
                </Badge>
              </div>
            </div>
            <button
              class="btn-sm"
              :class="integraciones.googleNews ? 'btn-outline' : 'btn-primary'"
              @click="integraciones.googleNews = !integraciones.googleNews"
            >
              {{ integraciones.googleNews ? 'Desconectar' : 'Conectar' }}
            </button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
