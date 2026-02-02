<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number // -100 to +100
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showLabels: true
})

const sizeConfig = {
  sm: { width: 150, height: 90, strokeWidth: 12, fontSize: 20 },
  md: { width: 200, height: 120, strokeWidth: 16, fontSize: 28 },
  lg: { width: 280, height: 160, strokeWidth: 20, fontSize: 36 }
}

const config = computed(() => sizeConfig[props.size])

const normalizedValue = computed(() => {
  return Math.max(-100, Math.min(100, props.value))
})

const percentage = computed(() => {
  return (normalizedValue.value + 100) / 200
})

const color = computed(() => {
  if (normalizedValue.value >= 30) return '#2ECC71' // success
  if (normalizedValue.value >= -30) return '#F39C12' // warning
  return '#E74C3C' // danger
})

const strokeDasharray = computed(() => {
  const circumference = Math.PI * 80 // semi-circle circumference
  const filled = circumference * percentage.value
  return `${filled} ${circumference}`
})

const displayValue = computed(() => {
  const sign = normalizedValue.value > 0 ? '+' : ''
  return `${sign}${normalizedValue.value}%`
})

const sentiment = computed(() => {
  if (normalizedValue.value >= 30) return 'Positivo'
  if (normalizedValue.value >= -30) return 'Neutral'
  return 'Negativo'
})
</script>

<template>
  <div class="gauge-container" :style="{ width: `${config.width}px` }">
    <svg
      :width="config.width"
      :height="config.height"
      viewBox="0 0 200 120"
    >
      <!-- Background arc -->
      <path
        d="M 10 100 A 80 80 0 0 1 190 100"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        :stroke-width="config.strokeWidth"
        stroke-linecap="round"
      />

      <!-- Gradient definition -->
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E74C3C" />
          <stop offset="50%" stop-color="#F39C12" />
          <stop offset="100%" stop-color="#2ECC71" />
        </linearGradient>
      </defs>

      <!-- Value arc -->
      <path
        d="M 10 100 A 80 80 0 0 1 190 100"
        fill="none"
        :stroke="color"
        :stroke-width="config.strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="strokeDasharray"
        class="transition-all duration-500 ease-out"
      />

      <!-- Labels -->
      <template v-if="showLabels">
        <text x="10" y="115" class="text-[10px] fill-tyravex-text-muted">-100</text>
        <text x="95" y="25" class="text-[10px] fill-tyravex-text-muted text-center">0</text>
        <text x="175" y="115" class="text-[10px] fill-tyravex-text-muted">+100</text>
      </template>
    </svg>

    <!-- Value display -->
    <div
      class="absolute font-mono font-bold text-tyravex-text-primary"
      :style="{
        fontSize: `${config.fontSize}px`,
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }"
    >
      {{ displayValue }}
    </div>

    <!-- Sentiment label -->
    <div class="text-sm text-tyravex-text-muted mt-2" :style="{ color }">
      {{ sentiment }}
    </div>
  </div>
</template>
