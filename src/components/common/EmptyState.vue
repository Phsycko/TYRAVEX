<script setup lang="ts">
import ActionButton from './ActionButton.vue'

defineProps<{
  title: string
  description: string
  icon?: any
  actionLabel?: string
}>()

defineEmits(['action'])
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-dashed border-border-medium bg-bg-tertiary/20">
    <div v-if="icon" class="p-4 bg-bg-tertiary rounded-full mb-4 ring-1 ring-border-medium shadow-lg">
      <component :is="icon" class="w-8 h-8 text-text-secondary" />
    </div>
    
    <h3 class="text-lg font-medium text-text-primary mb-2">{{ title }}</h3>
    <p class="text-sm text-text-tertiary max-w-md mb-6">{{ description }}</p>
    
    <ActionButton 
      v-if="actionLabel" 
      variant="primary" 
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </ActionButton>
  </div>
</template>
