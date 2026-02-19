<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentModule = computed(() => {
  return (route.meta?.title as string) || 'TYRAVEX'
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 h-[60px] z-50 flex items-center px-6 justify-between"
    style="background: #0f1115; border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 flex items-center justify-center" style="background: linear-gradient(135deg, #ff6b35, #ff4444); border-radius: 2px;">
          <span style="font-family: 'Roboto Mono', monospace; font-weight: 700; color: #fff; font-size: 18px;">T</span>
        </div>
        <span style="font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 18px; color: #fff; letter-spacing: -0.02em;">TYRAVEX <span style="color: #ff6b35;">OS</span></span>
      </div>
      <div class="h-6 w-px" style="background: rgba(255,255,255,0.08);"></div>
      <div class="hidden md:flex items-center">
        <span style="font-family: 'Roboto Mono', monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #a0a0a0;">{{ currentModule }}</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden lg:flex items-center gap-2 px-3 py-1" style="background: rgba(20,22,28,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 2px;">
        <span class="live-dot"></span>
        <span style="font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #00ffaa;">OPERATIONAL</span>
      </div>
      <div class="flex items-center gap-3 pl-4" style="border-left: 1px solid rgba(255,255,255,0.08);">
        <div class="text-right hidden sm:block">
          <div style="font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500; color: #e0e0e0;">Admin User</div>
          <div style="font-family: 'Roboto Mono', monospace; font-size: 10px; color: #888; margin-top: 2px;">LEVEL 5 ACCESS</div>
        </div>
        <div class="w-9 h-9 flex items-center justify-center" style="background: rgba(255,107,53,0.15); color: #ff6b35; border: 1px solid rgba(255,107,53,0.3); border-radius: 2px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px;">AU</div>
      </div>
    </div>
  </header>
</template>
