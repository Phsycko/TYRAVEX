<script setup lang="ts">
import { ref, computed } from 'vue'
import Badge from '@/components/common/Badge.vue'

interface Mention {
  id: string
  fuente: string
  usuario: string
  contenido: string
  sentimiento: 'positive' | 'negative' | 'neutral'
  alcance: number
  tiempo: string
  verificado: boolean
  seguidores: number
  likes: number
  shares: number
  comentarios: number
  vistas: number
}

interface Props {
  mentions: Mention[]
  autoScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoScroll: true
})

const emit = defineEmits<{
  pause: []
  view: [mention: Mention]
  analyze: [mention: Mention]
  tag: [mention: Mention]
  alert: [mention: Mention]
  loadMore: []
}>()

const isPaused = ref(!props.autoScroll)

const togglePause = () => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    emit('pause')
  }
}

const getSentimentBorderClass = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'border-l-tyravex-success'
    case 'negative': return 'border-l-tyravex-danger'
    default: return 'border-l-tyravex-text-muted'
  }
}

const getSentimentBadge = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return { variant: 'success', label: '😊 POSITIVO' }
    case 'negative': return { variant: 'danger', label: '😠 NEGATIVO' }
    default: return { variant: 'neutral', label: '😐 NEUTRAL' }
  }
}

const getSourceIcon = (source: string) => {
  const icons: Record<string, string> = {
    'Twitter': '𝕏',
    'Facebook': 'f',
    'Instagram': '📷',
    'TikTok': '🎵',
    'YouTube': '▶️'
  }
  return icons[source] || '🌐'
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="live-feed">
    <div class="feed-header">
      <h3 class="feed-title">Feed de Menciones en Tiempo Real</h3>
      <div class="feed-controls">
        <button 
          class="btn-control"
          :class="{ active: !isPaused }"
          @click="togglePause"
        >
          {{ isPaused ? '▶️ Reanudar' : '⏸ Pausar' }}
        </button>
      </div>
    </div>

    <div class="feed-list">
      <div
        v-for="mention in mentions"
        :key="mention.id"
        class="mention-card"
        :class="getSentimentBorderClass(mention.sentimiento)"
      >
        <div class="mention-header">
          <div class="mention-meta">
            <span class="source-icon">{{ getSourceIcon(mention.fuente) }}</span>
            <span class="mention-source">{{ mention.fuente }}</span>
            <span class="mention-separator">|</span>
            <span class="mention-user">{{ mention.usuario }}</span>
            <span v-if="mention.verificado" class="verified-badge" title="Cuenta verificada">✓</span>
            <span class="mention-separator">|</span>
            <span class="mention-followers">{{ formatNumber(mention.seguidores) }} followers</span>
            <span class="mention-separator">|</span>
            <span class="mention-time">{{ mention.tiempo }}</span>
          </div>
          <Badge 
            :variant="getSentimentBadge(mention.sentimiento).variant as any"
            size="sm"
          >
            {{ getSentimentBadge(mention.sentimiento).label }}
          </Badge>
        </div>

        <p class="mention-content">{{ mention.contenido }}</p>

        <div class="mention-metrics">
          <div class="metric-item">
            <span class="metric-icon">❤️</span>
            <span class="metric-value">{{ formatNumber(mention.likes) }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-icon">🔁</span>
            <span class="metric-value">{{ formatNumber(mention.shares) }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-icon">💬</span>
            <span class="metric-value">{{ formatNumber(mention.comentarios) }}</span>
          </div>
          <div class="metric-item">
            <span class="metric-icon">👁</span>
            <span class="metric-value">{{ formatNumber(mention.vistas) }}</span>
          </div>
        </div>

        <div class="mention-actions">
          <button class="action-btn" @click="emit('view', mention)">Ver</button>
          <button class="action-btn" @click="emit('analyze', mention)">Analizar</button>
          <button class="action-btn" @click="emit('tag', mention)">Etiquetar</button>
          <button class="action-btn" @click="emit('alert', mention)">Alertar</button>
        </div>
      </div>
    </div>

    <div class="feed-footer">
      <button class="btn-load-more" @click="emit('loadMore')">
        Cargar más menciones
      </button>
    </div>
  </div>
</template>

<style scoped>
.live-feed {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.feed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #141B22;
}

.feed-title {
  font-size: 16px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0;
}

.feed-controls {
  display: flex;
  gap: 8px;
}

.btn-control {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #9AA0A6;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-control:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: #E8EAED;
}

.btn-control.active {
  background: #52C41A;
  border-color: #52C41A;
  color: white;
}

.feed-list {
  max-height: 600px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mention-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left-width: 4px;
  border-radius: 6px;
  padding: 14px;
  transition: all 0.2s;
}

.mention-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}

.mention-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 8px;
}

.mention-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9AA0A6;
  flex-wrap: wrap;
}

.source-icon {
  font-size: 14px;
}

.mention-source {
  font-weight: 600;
  color: #E8EAED;
}

.mention-user {
  font-weight: 500;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: #4A90E2;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  font-weight: 700;
}

.mention-separator {
  color: rgba(255, 255, 255, 0.2);
}

.mention-content {
  font-size: 14px;
  color: #E8EAED;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.mention-metrics {
  display: flex;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.metric-icon {
  font-size: 14px;
}

.metric-value {
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
  color: #9AA0A6;
}

.mention-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #9AA0A6;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: #E8EAED;
}

.feed-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.btn-load-more {
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #E8EAED;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-load-more:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}
</style>
