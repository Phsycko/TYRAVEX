<template>
  <div class="module-empty-state p-8 h-full bg-tyravex-bg-primary">
    <!-- Module Header -->
    <header class="flex justify-between items-center mb-8 border-b border-tyravex-border pb-4">
      <div>
        <h1 class="text-3xl font-bold text-tyravex-text-primary flex items-center gap-3">
          {{ icon }} {{ title }}
        </h1>
        <p class="text-tyravex-text-muted mt-1">{{ subtitle }}</p>
      </div>
      <div>
         <span class="px-3 py-1 rounded-full bg-tyravex-bg-tertiary text-tyravex-text-muted text-xs font-mono border border-tyravex-border">MODULO INACTIVO</span>
      </div>
    </header>

    <div class="max-w-4xl mx-auto text-center py-12">
      <!-- Hero Section -->
      <div class="mb-12">
        <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tyravex-primary to-blue-400 mb-6">
          {{ heroTitle }}
        </h2>
        <p class="text-xl text-tyravex-text-secondary leading-relaxed max-w-2xl mx-auto">
          {{ heroDescription }}
        </p>
      </div>

      <!-- Steps Card -->
      <div class="bg-tyravex-bg-secondary border border-tyravex-border rounded-xl p-8 mb-12 text-left shadow-2xl shadow-black/50">
         <h3 class="text-lg font-bold text-tyravex-text-primary mb-6 border-b border-tyravex-border pb-2">PARA COMENZAR:</h3>
         
         <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <!-- Step 1 -->
           <div class="relative pl-4">
             <div class="absolute left-0 top-0 bottom-0 w-1 bg-tyravex-primary rounded-full"></div>
             <h4 class="font-bold text-tyravex-text-primary mb-2">1️⃣ Conectar Fuentes</h4>
             <ul class="text-sm text-tyravex-text-muted space-y-1">
               <li v-for="item in steps.connect" :key="item">• {{ item }}</li>
             </ul>
           </div>
           
           <!-- Step 2 -->
           <div class="relative pl-4">
             <div class="absolute left-0 top-0 bottom-0 w-1 bg-tyravex-secondary rounded-full"></div>
             <h4 class="font-bold text-tyravex-text-primary mb-2">2️⃣ Configurar Métricas</h4>
             <ul class="text-sm text-tyravex-text-muted space-y-1">
              <li v-for="item in steps.configure" :key="item">• {{ item }}</li>
             </ul>
           </div>

           <!-- Step 3 -->
           <div class="relative pl-4">
             <div class="absolute left-0 top-0 bottom-0 w-1 bg-tyravex-success rounded-full"></div>
             <h4 class="font-bold text-tyravex-text-primary mb-2">3️⃣ Procesamiento IA</h4>
             <ul class="text-sm text-tyravex-text-muted space-y-1">
               <li v-for="item in steps.process" :key="item">• {{ item }}</li>
             </ul>
           </div>
         </div>

         <div class="mt-8 flex justify-center gap-4">
           <button class="px-8 py-3 bg-tyravex-primary hover:bg-tyravex-primary-dark text-white rounded-lg font-bold shadow-lg shadow-tyravex-primary/20 transition-all transform hover:scale-105">
             🎯 CONFIGURAR {{ title.toUpperCase() }} AHORA
           </button>
           <button class="px-6 py-3 border border-tyravex-border hover:bg-tyravex-bg-tertiary text-tyravex-text-secondary rounded-lg font-medium transition-colors">
             📚 Ver documentación
           </button>
         </div>
      </div>

      <!-- Capabilities Preview -->
      <div class="border-t border-tyravex-border pt-12">
        <h3 class="text-sm font-bold text-tyravex-text-muted uppercase tracking-wider mb-8">
          💡 LO QUE PODRÁS HACER UNA VEZ ACTIVADO
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div v-for="feature in features" :key="feature" class="p-4 bg-tyravex-bg-secondary rounded-lg border border-tyravex-border/50">
            <span class="text-green-400 mr-2">✓</span>
            <span class="text-sm text-tyravex-text-secondary">{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Steps {
  connect: string[]
  configure: string[]
  process: string[]
}

defineProps<{
  icon: string
  title: string
  subtitle: string
  heroTitle: string
  heroDescription: string
  steps: Steps
  features: string[]
}>()
</script>
