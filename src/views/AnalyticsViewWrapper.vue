<template>
  <AnalyticsProvider>
    <AnalyticsView />
  </AnalyticsProvider>
</template>

<script setup lang="ts">
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider.vue'
import AnalyticsView from './AnalyticsView.vue'
</script>
