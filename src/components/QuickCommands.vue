<template>
  <div class="quick-commands mt-4 flex flex-wrap gap-2">
    <button
      v-for="command in commands"
      :key="command.id"
      @click="handleCommand(command.action)"
      class="btn-command"
    >
      {{ command.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { QuickCommand } from '@/types/types'

interface Props {
  commands: QuickCommand[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  execute: [action: string]
}>()

const handleCommand = (action: string) => {
  emit('execute', action)
}
</script>

<style scoped>
.quick-commands {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
