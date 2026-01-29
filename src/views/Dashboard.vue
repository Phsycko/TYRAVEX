<template>
  <div class="dashboard min-h-screen flex flex-col bg-tyravex-bg-primary">
    <!-- Header -->
    <SystemHeader />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Context Panel (Left) -->
      <ContextPanel />

      <!-- Conversational Panel (Center) -->
      <main class="flex-1 flex flex-col">
        <ConversationalPanel />
      </main>

      <!-- Intel Panel (Right) - Conditional -->
      <IntelPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useConversationStore } from '@/store/conversationStore'
import SystemHeader from '@/components/SystemHeader.vue'
import ContextPanel from '@/components/ContextPanel.vue'
import ConversationalPanel from '@/components/ConversationalPanel.vue'
import IntelPanel from '@/components/IntelPanel.vue'

const conversationStore = useConversationStore()

onMounted(() => {
  // Initialize conversation with system greeting
  conversationStore.initializeConversation()
})
</script>
