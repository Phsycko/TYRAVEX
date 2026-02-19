<script setup lang="ts">
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="min-h-screen" style="background: #0f1115; color: #e0e0e0;">
    <Topbar />
    <Sidebar />
    <main class="pl-[240px] pt-[60px] overflow-y-auto" style="height: 100vh;">
      <div class="p-6 max-w-[1920px] mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
