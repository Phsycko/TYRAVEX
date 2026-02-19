<template>
  <div class="team-summary bg-tyravex-bg-secondary border border-tyravex-border rounded-xl p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold text-tyravex-text-primary">👥 GESTIÓN DE EQUIPO</h3>
      <span class="text-xs font-mono text-tyravex-text-muted bg-tyravex-bg-tertiary px-2 py-1 rounded">1/100 usuarios</span>
    </div>

    <p class="text-sm text-tyravex-text-muted mb-4">Tu plan permite hasta 100 usuarios simultáneos con roles personalizados.</p>

    <div class="bg-tyravex-bg-tertiary/30 rounded-lg p-3 mb-4 border border-tyravex-border/50">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-tyravex-primary flex items-center justify-center text-white text-xs font-bold">AD</div>
        <div>
          <div class="text-sm font-bold text-tyravex-text-primary">Admin (tú)</div>
          <div class="text-xs text-tyravex-text-muted">Acceso total • Última sesion: Ahora</div>
        </div>
        <div class="ml-auto">
          <span class="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">Activo</span>
        </div>
      </div>
    </div>

    <div class="roles-preview mb-6">
      <h4 class="text-xs font-bold text-tyravex-text-muted uppercase mb-2">Roles Disponibles:</h4>
      <div class="flex flex-wrap gap-2">
        <span class="role-badge">Administrador</span>
        <span class="role-badge">Estratega</span>
        <span class="role-badge">Analista</span>
        <span class="role-badge">Operador</span>
        <span class="role-badge">Comunicador</span>
        <span class="role-badge">Observador</span>
      </div>
    </div>

    <div class="flex gap-4">
      <button class="px-4 py-2 bg-tyravex-primary hover:bg-tyravex-primary-dark text-white rounded text-sm transition-colors font-medium">
        + INVITAR MIEMBROS
      </button>
      <button class="px-4 py-2 border border-tyravex-border hover:border-tyravex-text-muted text-tyravex-text-muted hover:text-tyravex-text-primary rounded text-sm transition-colors">
        ⚙️ Configurar roles
      </button>
    </div>
  </div>
</template>

<style scoped>
.role-badge {
  @apply text-xs px-2 py-1 rounded bg-tyravex-bg-tertiary text-tyravex-text-secondary border border-tyravex-border/50;
}
</style>
