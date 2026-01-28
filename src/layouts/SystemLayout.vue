<template>
  <div class="system-layout">
    <TopBar />
    <SideNav />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/navigation/TopBar.vue'
import SideNav from '@/components/navigation/SideNav.vue'
</script>

<style scoped>
.system-layout {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

.main-content {
  margin-top: var(--topbar-height);
  margin-left: var(--sidenav-width);
  padding: var(--space-6);
  min-height: calc(100vh - var(--topbar-height));
}
</style>
