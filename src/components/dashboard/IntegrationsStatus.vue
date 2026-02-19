<template>
  <div class="integrations-status bg-tyravex-bg-secondary border border-tyravex-border rounded-xl p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-bold text-tyravex-text-primary">🔧 INTEGRACIONES Y CONECTORES</h3>
      <span class="text-xs font-mono text-tyravex-text-muted bg-tyravex-bg-tertiary px-2 py-1 rounded">0/24 activos</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- SOCIAL MEDIA -->
      <div>
        <h4 class="text-xs font-bold text-tyravex-text-muted uppercase mb-3 border-b border-tyravex-border pb-1">Redes Sociales</h4>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Twitter API
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Facebook Graph
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Instagram Business
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> TikTok
          </label>
        </div>
      </div>

       <!-- ANALYTICS -->
       <div>
        <h4 class="text-xs font-bold text-tyravex-text-muted uppercase mb-3 border-b border-tyravex-border pb-1">Analytics</h4>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Google Analytics
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Mixpanel
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Amplitude
          </label>
        </div>
      </div>

       <!-- DATA -->
       <div>
        <h4 class="text-xs font-bold text-tyravex-text-muted uppercase mb-3 border-b border-tyravex-border pb-1">Datos</h4>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> PostgreSQL
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> MongoDB
          </label>
          <label class="flex items-center gap-2 text-sm text-tyravex-text-secondary cursor-pointer hover:text-white">
            <input type="checkbox" disabled class="rounded border-tyravex-border bg-tyravex-bg-tertiary"> Excel / CSV
          </label>
        </div>
      </div>

      <!-- ML -->
      <div>
        <h4 class="text-xs font-bold text-tyravex-text-muted uppercase mb-3 border-b border-tyravex-border pb-1">Machine Learning</h4>
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm text-tyravex-success">
            <span class="text-xs">✅</span> Sentiment Analysis
          </div>
          <div class="flex items-center gap-2 text-sm text-tyravex-success">
            <span class="text-xs">✅</span> Predictive Models
          </div>
          <div class="flex items-center gap-2 text-sm text-tyravex-success">
            <span class="text-xs">✅</span> Image Recognition
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-tyravex-border flex gap-4">
      <button class="px-4 py-2 bg-tyravex-bg-tertiary hover:bg-tyravex-primary text-tyravex-text-primary rounded text-sm transition-colors font-medium">
        ⚙️ CONFIGURAR INTEGRACIONES
      </button>
      <button class="px-4 py-2 border border-tyravex-border hover:border-tyravex-text-muted text-tyravex-text-muted hover:text-tyravex-text-primary rounded text-sm transition-colors">
        📚 Ver documentación API
      </button>
    </div>
  </div>
</template>
