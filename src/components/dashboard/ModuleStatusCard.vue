<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StatusIndicator from '@/components/common/StatusIndicator.vue'
import ActionButton from '@/components/common/ActionButton.vue'
import { Cog6ToothIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  id: string
  name: string
  status: 'active' | 'ready' | 'idle' | 'warning' | 'error' | 'offline' | string
  alerts?: number
  lastUpdate?: Date | null
  icon?: any
}>()

const router = useRouter()

const statusColor = computed(() => {
  switch (props.status) {
    case 'active': return 'border-success/30 shadow-glow-success'
    case 'ready': return 'border-success/20'
    case 'warning': return 'border-warning/50'
    case 'error': return 'border-danger/50 shadow-glow-danger'
    default: return 'border-border-medium'
  }
})

function navigate() {
  router.push(`/${props.id}`)
}
</script>

<template>
  <div 
    class="card relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
    :class="statusColor"
  >
    <!-- Background Gradient for Active State -->
    <div v-if="status === 'active'" class="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent pointer-events-none"></div>
    <div v-if="status === 'error'" class="absolute inset-0 bg-gradient-to-br from-danger/5 to-transparent pointer-events-none"></div>

    <div class="relative z-10 flex flex-col h-full">
      
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-bg-tertiary border border-border-subtle text-text-secondary group-hover:text-text-primary group-hover:border-text-secondary transition-colors">
             <component v-if="icon" :is="icon" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-base font-bold text-text-primary tracking-tight">{{ name }}</h3>
            <div class="text-[10px] font-mono text-text-tertiary uppercase">MOD-{{ id.substring(0,3).toUpperCase() }}</div>
          </div>
        </div>
        <StatusIndicator :status="status" size="sm" pulse />
      </div>

      <!-- Metrics / Info -->
      <div class="flex-1 space-y-3 mb-6">
        <div class="flex justify-between items-center text-sm border-b border-border-subtle pb-2 border-dashed">
          <span class="text-text-secondary">Status</span>
          <span class="font-mono text-text-primary uppercase">{{ status }}</span>
        </div>
        
        <div class="flex justify-between items-center text-sm border-b border-border-subtle pb-2 border-dashed">
          <span class="text-text-secondary">Last Update</span>
          <span class="font-mono text-text-tertiary">{{ lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : '--:--:--' }}</span>
        </div>

        <div class="flex justify-between items-center text-sm">
          <span class="text-text-secondary">Alerts</span>
          <span 
            class="font-mono font-bold"
            :class="alerts && alerts > 0 ? 'text-danger' : 'text-text-tertiary'"
          >
            {{ alerts || 0 }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 mt-auto">
        <ActionButton variant="secondary" size="sm" class="flex-1" @click="navigate">
            <Cog6ToothIcon class="w-4 h-4 mr-1" />
            Config
        </ActionButton>
        <ActionButton variant="primary" size="sm" class="flex-1" @click="navigate">
            Open
            <ArrowRightIcon class="w-4 h-4 ml-1" />
        </ActionButton>
      </div>

    </div>
  </div>
</template>
