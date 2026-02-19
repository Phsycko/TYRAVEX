<template>
  <div class="risk-gauge">
    <svg viewBox="0 0 200 120" class="gauge-svg">
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4A90E2" />
          <stop offset="30%" stop-color="#00ffaa" />
          <stop offset="60%" stop-color="#ffcc00" />
          <stop offset="80%" stop-color="#ff6b35" />
          <stop offset="100%" stop-color="#ff4444" />
        </linearGradient>
      </defs>
      <!-- Background arc -->
      <path :d="bgArc" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12" stroke-linecap="round" />
      <!-- Value arc -->
      <path :d="valueArc" fill="none" stroke="url(#gaugeGrad)" stroke-width="12" stroke-linecap="round" />
      <!-- Needle -->
      <line :x1="needleStart.x" :y1="needleStart.y" :x2="needleEnd.x" :y2="needleEnd.y"
            stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" />
      <circle cx="100" cy="95" r="4" :fill="scoreColor" />
      <!-- Score text -->
      <text x="100" y="80" text-anchor="middle" :fill="scoreColor"
            font-family="Oswald" font-size="32" font-weight="600">{{ score }}</text>
      <text x="100" y="112" text-anchor="middle" fill="#888"
            font-family="Roboto Mono" font-size="10" letter-spacing="0.1em">{{ label }}</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  score: number
  label?: string
}>(), {
  label: 'NIVEL DE AMENAZA',
})

const scoreColor = computed(() => {
  if (props.score >= 80) return '#ff4444'
  if (props.score >= 60) return '#ff6b35'
  if (props.score >= 30) return '#ffcc00'
  return '#00ffaa'
})

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

const bgArc = computed(() => describeArc(100, 95, 60, -210, 30))
const valueArc = computed(() => {
  const angle = -210 + (props.score / 100) * 240
  return describeArc(100, 95, 60, -210, Math.min(angle, 30))
})

const needleEnd = computed(() => {
  const angle = -210 + (props.score / 100) * 240
  return polarToCartesian(100, 95, 50, angle)
})
const needleStart = computed(() => ({ x: 100, y: 95 }))
</script>

<style scoped>
.risk-gauge { width: 100%; max-width: 220px; margin: 0 auto; }
.gauge-svg { width: 100%; height: auto; }
</style>
