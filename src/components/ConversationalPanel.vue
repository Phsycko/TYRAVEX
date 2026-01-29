<template>
  <div class="conversational-panel panel h-full flex flex-col">
    <!-- Messages Container -->
    <div 
      ref="messagesContainer"
      class="messages-container flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4"
    >
      <template v-for="message in messages" :key="message.id">
        <SystemMessage 
          v-if="message.type === 'system'"
          :content="message.content"
        />
        <UserMessage 
          v-else
          :content="message.content"
        />
      </template>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex items-center space-x-2 text-tyravex-text-muted">
        <div class="w-2 h-2 rounded-full bg-tyravex-accent-cyan animate-pulse"></div>
        <span class="terminal-text text-xs">TYRAVEX está procesando...</span>
      </div>
    </div>

    <!-- Quick Commands -->
    <div class="px-6 pb-4">
      <QuickCommands 
        :commands="quickCommands"
        @execute="handleCommandExecute"
      />
    </div>

    <!-- Input Area -->
    <div class="input-area border-t border-tyravex-border p-4">
      <div class="flex space-x-3">
        <input
          v-model="userInput"
          @keyup.enter="handleSendMessage"
          type="text"
          placeholder="Escribe tu mensaje o usa los comandos rápidos..."
          class="flex-1 bg-tyravex-bg-tertiary border border-tyravex-border rounded px-4 py-2 
                 text-tyravex-text-primary terminal-text focus:outline-none focus:border-tyravex-accent-blue
                 transition-colors"
        />
        <button
          @click="handleSendMessage"
          :disabled="!userInput.trim()"
          class="px-6 py-2 bg-tyravex-accent-blue/20 border border-tyravex-accent-blue 
                 text-tyravex-accent-blue rounded hover:bg-tyravex-accent-blue/30 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                 font-medium text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useConversationStore } from '@/store/conversationStore'
import SystemMessage from './SystemMessage.vue'
import UserMessage from './UserMessage.vue'
import QuickCommands from './QuickCommands.vue'

const conversationStore = useConversationStore()
const messagesContainer = ref<HTMLElement | null>(null)

const messages = computed(() => conversationStore.allMessages)
const quickCommands = computed(() => conversationStore.availableCommands)
const isTyping = computed(() => conversationStore.isTyping)
const userInput = ref('')

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleCommandExecute = (action: string) => {
  conversationStore.executeCommand(action)
  scrollToBottom()
}

const handleSendMessage = () => {
  if (userInput.value.trim()) {
    conversationStore.addUserMessage(userInput.value)
    userInput.value = ''
    
    // Simulate system response
    conversationStore.isTyping = true
    setTimeout(() => {
      conversationStore.addSystemMessage('Entendido. Procesando tu solicitud...')
      conversationStore.isTyping = false
    }, 1000)
    
    scrollToBottom()
  }
}

// Auto-scroll when new messages arrive
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped>
.messages-container {
  max-height: calc(100vh - 300px);
}

.input-area {
  background: linear-gradient(to top, rgba(10, 14, 20, 0.95), transparent);
}
</style>
