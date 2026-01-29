<template>
  <div class="user-message mb-4 flex items-start space-x-3 justify-end">
    <div class="flex-1 text-right">
      <div class="text-tyravex-accent-blue font-mono text-xs mb-1">USER</div>
      <div class="terminal-text text-tyravex-text-secondary inline-block bg-tyravex-bg-tertiary px-4 py-2 rounded-lg border border-tyravex-accent-blue/20">
        {{ content }}
      </div>
    </div>
    <div class="flex-shrink-0">
      <div class="w-2 h-2 rounded-full bg-tyravex-accent-blue mt-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: string
}

defineProps<Props>()
</script>

<style scoped>
.user-message {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
