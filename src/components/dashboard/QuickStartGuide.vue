<template>
  <div class="quick-start-guide">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- STEP 1 -->
      <div class="step-card group">
        <div class="step-header">
          <span class="step-badge">PASO 1</span>
          <span class="step-time">⏱️ 10 min</span>
        </div>
        <h3 class="step-title">Configuración Inicial</h3>
        <ul class="step-list">
          <li class="step-item">
            <span class="check-box"></span>
            Crear tu primera campaña
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Conectar fuentes de datos
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Configurar equipo y permisos
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Definir objetivos y KPIs
          </li>
        </ul>
        <button class="step-action-btn group-hover:bg-tyravex-primary group-hover:text-white">
          🎯 INICIAR CONFIGURACIÓN
        </button>
      </div>

      <!-- STEP 2 -->
      <div class="step-card group">
        <div class="step-header">
          <span class="step-badge">PASO 2</span>
          <span class="step-time">⏱️ 15 min</span>
        </div>
        <h3 class="step-title">Integración de Datos</h3>
        <ul class="step-list">
          <li class="step-item">
            <span class="check-box"></span>
            Conectar Google Analytics/Mixpanel
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Integrar Social Media APIs
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Cargar datos históricos (CSV)
          </li>
          <li class="step-item">
            <span class="check-box"></span>
            Configurar webhooks
          </li>
        </ul>
        <button class="step-action-btn group-hover:bg-tyravex-secondary group-hover:text-white">
          🔌 CONFIGURAR INTEGRACIONES
        </button>
      </div>

      <!-- STEP 3 -->
      <div class="step-card group">
        <div class="step-header">
          <span class="step-badge">PASO 3</span>
          <span class="step-time">⏱️ 5 min</span>
        </div>
        <h3 class="step-title">Activar Módulos</h3>
        <p class="text-sm text-tyravex-text-muted mb-3">Selecciona los módulos activos:</p>
        <div class="modules-grid">
          <span class="module-tag checked">Analytics</span>
          <span class="module-tag checked">Monitor</span>
          <span class="module-tag checked">Predict</span>
          <span class="module-tag checked">Research</span>
          <span class="module-tag checked">Territorio</span>
          <span class="module-tag checked">Crisis</span>
        </div>
        <button class="step-action-btn group-hover:bg-tyravex-success group-hover:text-white mt-auto">
          ✅ ACTIVAR TODOS
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.step-card {
  @apply bg-tyravex-bg-secondary border border-tyravex-border rounded-xl p-5 flex flex-col 
         hover:border-tyravex-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-tyravex-primary/5 cursor-pointer;
}

.step-header {
  @apply flex justify-between items-center mb-3;
}

.step-badge {
  @apply text-xs font-bold bg-tyravex-bg-tertiary px-2 py-1 rounded text-tyravex-text-secondary;
}

.step-time {
  @apply text-xs text-tyravex-text-muted;
}

.step-title {
  @apply text-lg font-bold text-tyravex-text-primary mb-4;
}

.step-list {
  @apply space-y-2 mb-6 flex-grow;
}

.step-item {
  @apply flex items-center gap-2 text-sm text-tyravex-text-secondary;
}

.check-box {
  @apply w-4 h-4 border border-tyravex-text-muted rounded block;
}

.step-action-btn {
  @apply w-full py-2 rounded-lg border border-tyravex-border text-tyravex-text-primary 
         font-semibold text-sm transition-all text-center mt-auto;
}

.modules-grid {
  @apply flex flex-wrap gap-2 mb-6;
}

.module-tag {
  @apply text-xs px-2 py-1 rounded bg-tyravex-bg-tertiary text-tyravex-text-muted border border-tyravex-border;
}

.module-tag.checked {
  @apply border-tyravex-success/30 text-tyravex-success bg-tyravex-success/10;
}
</style>
