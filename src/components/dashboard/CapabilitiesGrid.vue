<template>
  <div class="capabilities-grid">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- ANALYTICS -->
      <div class="capability-card border-l-4 border-l-blue-500">
        <div class="card-header">
          <span class="icon text-blue-400">📊</span>
          <h3 class="title">ANALYTICS</h3>
        </div>
        <ul class="features-list">
          <li>• Dashboards en tiempo real</li>
          <li>• 50+ métricas electorales</li>
          <li>• Segmentación demográfica</li>
          <li>• Comparación vs competencia</li>
        </ul>
        <button class="explore-btn text-blue-400 border-blue-400 hover:bg-blue-500/10">Explorar →</button>
      </div>

      <!-- MONITOR -->
      <div class="capability-card border-l-4 border-l-green-500">
        <div class="card-header">
          <span class="icon text-green-400">👁️</span>
          <h3 class="title">MONITOR</h3>
        </div>
        <ul class="features-list">
          <li>• Vigilancia 24/7 multi-fuente</li>
          <li>• Detección de crisis</li>
          <li>• Análisis sentimiento</li>
          <li>• Trending topics</li>
        </ul>
        <button class="explore-btn text-green-400 border-green-400 hover:bg-green-500/10">Explorar →</button>
      </div>

      <!-- PREDICT -->
      <div class="capability-card border-l-4 border-l-purple-500">
        <div class="card-header">
          <span class="icon text-purple-400">🔮</span>
          <h3 class="title">PREDICT</h3>
        </div>
        <ul class="features-list">
          <li>• Simulador de escenarios</li>
          <li>• 5 modelos ML simultáneos</li>
          <li>• Probabilidad de victoria</li>
          <li>• Proyecciones distritales</li>
        </ul>
        <button class="explore-btn text-purple-400 border-purple-400 hover:bg-purple-500/10">Explorar →</button>
      </div>

      <!-- RESEARCH -->
      <div class="capability-card border-l-4 border-l-orange-500">
        <div class="card-header">
          <span class="icon text-orange-400">🔍</span>
          <h3 class="title">RESEARCH</h3>
        </div>
        <ul class="features-list">
          <li>• Intel oponentes</li>
          <li>• Detector inconsistencias</li>
          <li>• Timeline de posiciones</li>
          <li>• Network graph</li>
        </ul>
        <button class="explore-btn text-orange-400 border-orange-400 hover:bg-orange-500/10">Explorar →</button>
      </div>

      <!-- TERRITORIO -->
      <div class="capability-card border-l-4 border-l-red-500">
        <div class="card-header">
          <span class="icon text-red-500">🗺️</span>
          <h3 class="title">TERRITORIO</h3>
        </div>
        <ul class="features-list">
          <li>• Mapas tácticos interactivos</li>
          <li>• Planificador operaciones</li>
          <li>• Análisis de terreno</li>
          <li>• Vectores de ataque</li>
        </ul>
        <button class="explore-btn text-red-500 border-red-500 hover:bg-red-500/10">Explorar →</button>
      </div>

       <!-- CRISIS -->
       <div class="capability-card border-l-4 border-l-yellow-500">
        <div class="card-header">
          <span class="icon text-yellow-500">⚠️</span>
          <h3 class="title">CRISIS</h3>
        </div>
        <ul class="features-list">
          <li>• Simulador de crisis</li>
          <li>• Sistema alerta temprana</li>
          <li>• Protocolos activables</li>
          <li>• Resource commander</li>
        </ul>
        <button class="explore-btn text-yellow-500 border-yellow-500 hover:bg-yellow-500/10">Explorar →</button>
      </div>

      <!-- CONTROL INFO -->
      <div class="capability-card border-l-4 border-l-cyan-500">
        <div class="card-header">
          <span class="icon text-cyan-500">🔐</span>
          <h3 class="title">CONTROL INFO</h3>
        </div>
        <ul class="features-list">
          <li>• Scanner huella digital</li>
          <li>• Reverse image search</li>
          <li>• Identity vault</li>
          <li>• Takedown automation</li>
        </ul>
        <button class="explore-btn text-cyan-500 border-cyan-500 hover:bg-cyan-500/10">Explorar →</button>
      </div>

      <!-- ESTRATEGIA -->
      <div class="capability-card border-l-4 border-l-indigo-500">
        <div class="card-header">
          <span class="icon text-indigo-500">🎯</span>
          <h3 class="title">ESTRATEGIA</h3>
        </div>
        <ul class="features-list">
          <li>• War Room multi-dominio</li>
          <li>• Timeline maestro</li>
          <li>• Optimizador recursos</li>
          <li>• Dashboard ejecutivo</li>
        </ul>
        <button class="explore-btn text-indigo-500 border-indigo-500 hover:bg-indigo-500/10">Explorar →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capability-card {
  @apply bg-tyravex-bg-secondary p-5 rounded-lg border border-tyravex-border flex flex-col h-full
         hover:bg-tyravex-bg-tertiary transition-colors duration-300;
}

.card-header {
  @apply flex items-center gap-3 mb-4;
}

.icon {
  @apply text-2xl;
}

.title {
  @apply font-bold text-tyravex-text-primary text-sm tracking-wider;
}

.features-list {
  @apply space-y-2 mb-6 flex-grow;
}

.features-list li {
  @apply text-xs text-tyravex-text-muted flex items-start;
}

.explore-btn {
  @apply w-full py-2 text-xs font-bold border rounded uppercase transition-colors mt-auto;
}
</style>
