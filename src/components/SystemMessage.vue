<template>
  <div class="system-message mb-4 flex items-start space-x-3">
    <div class="flex-shrink-0">
      <div class="w-2 h-2 rounded-full bg-tyravex-accent-cyan mt-2 animate-pulse-slow"></div>
    </div>
    <div class="flex-1">
      <div class="text-tyravex-accent-cyan font-mono text-xs mb-1">TYRAVEX</div>
      <div class="terminal-text text-tyravex-text-primary">
        <span v-if="isTyping">{{ displayedText }}<span class="animate-typing">▊</span></span>
        <span v-else>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  content: string
  enableTyping?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enableTyping: true
})

const displayedText = ref('')
const isTyping = ref(false)
const typingSpeed = 30 // milliseconds per character

const typeText = () => {
  if (!props.enableTyping) {
    displayedText.value = props.content
    return
  }

  isTyping.value = true
  displayedText.value = ''
  let index = 0

  const interval = setInterval(() => {
    if (index < props.content.length) {
      displayedText.value += props.content[index]
      index++
    } else {
      clearInterval(interval)
      isTyping.value = false
    }
  }, typingSpeed)
}

onMounted(() => {
  typeText()
})

watch(() => props.content, () => {
  typeText()
})
</script>

<style scoped>
.system-message {
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
