<template>
  <div class="node-map">
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Node {
  id: string
  x: number
  y: number
  type: 'primary' | 'secondary' | 'tertiary'
}

interface Connection {
  from: string
  to: string
}

interface Props {
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 600
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Placeholder nodes and connections
const nodes: Node[] = [
  { id: 'node-1', x: 400, y: 300, type: 'primary' },
  { id: 'node-2', x: 250, y: 200, type: 'secondary' },
  { id: 'node-3', x: 550, y: 200, type: 'secondary' },
  { id: 'node-4', x: 250, y: 400, type: 'secondary' },
  { id: 'node-5', x: 550, y: 400, type: 'secondary' },
  { id: 'node-6', x: 150, y: 150, type: 'tertiary' },
  { id: 'node-7', x: 650, y: 150, type: 'tertiary' },
  { id: 'node-8', x: 150, y: 450, type: 'tertiary' },
  { id: 'node-9', x: 650, y: 450, type: 'tertiary' }
]

const connections: Connection[] = [
  { from: 'node-1', to: 'node-2' },
  { from: 'node-1', to: 'node-3' },
  { from: 'node-1', to: 'node-4' },
  { from: 'node-1', to: 'node-5' },
  { from: 'node-2', to: 'node-6' },
  { from: 'node-3', to: 'node-7' },
  { from: 'node-4', to: 'node-8' },
  { from: 'node-5', to: 'node-9' }
]

onMounted(() => {
  if (!canvasRef.value) return
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.fillStyle = '#0a0e14'
  ctx.fillRect(0, 0, props.width, props.height)

  // Draw connections
  connections.forEach(conn => {
    const fromNode = nodes.find(n => n.id === conn.from)
    const toNode = nodes.find(n => n.id === conn.to)
    
    if (fromNode && toNode) {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.stroke()
    }
  })

  // Draw nodes
  nodes.forEach(node => {
    let radius = 8
    let color = '#3b82f6'
    
    if (node.type === 'primary') {
      radius = 12
      color = '#10b981'
    } else if (node.type === 'secondary') {
      radius = 10
      color = '#3b82f6'
    } else {
      radius = 6
      color = '#6b7280'
    }

    // Outer glow
    ctx.shadowBlur = 15
    ctx.shadowColor = color
    
    // Node circle
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
    ctx.fill()
    
    // Inner circle
    ctx.shadowBlur = 0
    ctx.fillStyle = '#0a0e14'
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius - 3, 0, Math.PI * 2)
    ctx.fill()
  })
})
</script>

<style scoped>
.node-map {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: auto;
}
</style>
