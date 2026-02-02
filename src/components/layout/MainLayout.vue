<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
</script>

<template>
  <div class="min-h-screen bg-tyravex-bg-primary">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Topbar -->
    <Topbar />

    <!-- Main Content -->
    <main class="ml-64 pt-16 min-h-screen">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
