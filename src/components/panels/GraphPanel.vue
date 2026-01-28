<template>
  <div class="graph-panel">
    <div class="graph-header">
      <h3 class="graph-title">{{ title }}</h3>
    </div>
    <div class="graph-content">
      <canvas ref="canvasRef" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'GRÁFICO',
  width: 600,
  height: 300
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  // Draw placeholder grid
  ctx.strokeStyle = 'rgba(61, 69, 86, 0.3)'
  ctx.lineWidth = 1

  // Vertical lines
  for (let x = 0; x <= props.width; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, props.height)
    ctx.stroke()
  }

  // Horizontal lines
  for (let y = 0; y <= props.height; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(props.width, y)
    ctx.stroke()
  }

  // Draw placeholder data line
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  const points = 20
  for (let i = 0; i < points; i++) {
    const x = (props.width / points) * i
    const y = props.height / 2 + Math.sin(i * 0.5) * 50 + Math.random() * 30
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  
  ctx.stroke()
})
</script>

<style scoped>
.graph-panel {
  padding: var(--space-6);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.graph-header {
  margin-bottom: var(--space-4);
}

.graph-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.graph-content {
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: auto;
}
</style>
