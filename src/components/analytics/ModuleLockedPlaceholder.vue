<template>
  <div class="flex items-center justify-center py-16">
    <div class="max-w-md w-full">
      <Card class="text-center">
        <!-- Lock Icon -->
        <div class="mb-6 flex justify-center">
          <div class="relative">
            <!-- Glassmorphism background -->
            <div class="absolute inset-0 bg-tyravex-secondary/10 backdrop-blur-sm rounded-full blur-xl" />
            
            <!-- Icon container -->
            <div class="relative w-20 h-20 rounded-full bg-tyravex-bg-tertiary border border-tyravex-border flex items-center justify-center">
              <svg 
                class="w-10 h-10 text-tyravex-text-muted" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="1.5" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Title -->
        <h3 class="text-xl font-semibold text-tyravex-text-primary mb-2">
          {{ moduleName }}
        </h3>

        <!-- Message -->
        <p class="text-tyravex-text-muted mb-6">
          Este módulo no está disponible en tu plan actual
        </p>

        <!-- CTA Button (placeholder) -->
        <button 
          class="btn-primary inline-flex items-center gap-2"
          @click="handleUpgradeClick"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Contactar para upgrade
        </button>

        <!-- Additional info -->
        <p class="text-xs text-tyravex-text-muted mt-4">
          Contacta a tu ejecutivo de cuenta para más información
        </p>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/common/Card.vue'

// Props
interface Props {
  moduleName: string  // Nombre del módulo bloqueado (ej: "Mapa Electoral")
}

defineProps<Props>()

// ============================================
// HANDLERS
// ============================================

// TODO: Conectar con sistema de contacto/ventas
const handleUpgradeClick = () => {
  console.log('[Module Locked] Usuario solicitó upgrade')
  // PLACEHOLDER: En el futuro, abrir modal de contacto o redirigir a ventas
}
</script>
