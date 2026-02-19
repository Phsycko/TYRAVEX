<script setup lang="ts">
import { ref, computed } from 'vue'
import Badge from '@/components/common/Badge.vue'
import LiveIndicator from '@/components/common/LiveIndicator.vue'

interface TrendingTopic {
  id: string
  tema: string
  menciones: number
  cambio: number
  sentimiento: 'positive' | 'negative' | 'neutral'
  alcance: number
  engagement: number
}

interface Props {
  topics: TrendingTopic[]
  isLive?: boolean
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLive: true,
  limit: 10
})

const emit = defineEmits<{
  topicClick: [topic: TrendingTopic]
  export: []
}>()

type SortKey = 'menciones' | 'cambio' | 'alcance' | 'engagement'
const sortKey = ref<SortKey>('menciones')
const sortDirection = ref<'asc' | 'desc'>('desc')

const sortedTopics = computed(() => {
  const limited = props.topics.slice(0, props.limit)
  return [...limited].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    const multiplier = sortDirection.value === 'asc' ? 1 : -1
    return (aVal - bVal) * multiplier
  })
})

const toggleSort = (key: SortKey) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'desc'
  }
}

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return '😊'
    case 'negative': return '😠'
    default: return '😐'
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'text-tyravex-success'
    case 'negative': return 'text-tyravex-danger'
    default: return 'text-tyravex-text-muted'
  }
}

const getChangeIcon = (cambio: number) => {
  if (cambio > 5) return '↑'
  if (cambio < -5) return '↓'
  return '→'
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <div class="trending-table-container">
    <div class="table-header">
      <h3 class="table-title">Trending Topics</h3>
      <LiveIndicator v-if="isLive" size="sm" text="ACTUALIZANDO" />
    </div>

    <div class="table-wrapper">
      <table class="trending-table">
        <thead>
          <tr>
            <th class="col-rank">#</th>
            <th class="col-topic">Topic</th>
            <th class="col-sortable" @click="toggleSort('menciones')">
              Menciones
              <span v-if="sortKey === 'menciones'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="col-sentiment">Sentimiento</th>
            <th class="col-sortable" @click="toggleSort('cambio')">
              Cambio
              <span v-if="sortKey === 'cambio'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="col-sortable" @click="toggleSort('alcance')">
              Alcance
              <span v-if="sortKey === 'alcance'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(topic, index) in sortedTopics"
            :key="topic.id"
            class="table-row"
            @click="emit('topicClick', topic)"
          >
            <td class="col-rank">
              <span class="rank-badge">{{ index + 1 }}</span>
            </td>
            <td class="col-topic">
              <span class="topic-name">{{ topic.tema }}</span>
            </td>
            <td class="col-menciones">
              <span class="metric-value">{{ formatNumber(topic.menciones) }}</span>
            </td>
            <td class="col-sentiment">
              <div class="sentiment-cell">
                <span class="sentiment-emoji">{{ getSentimentEmoji(topic.sentimiento) }}</span>
                <span :class="getSentimentColor(topic.sentimiento)">
                  {{ topic.cambio > 0 ? '+' : '' }}{{ topic.cambio.toFixed(1) }}%
                </span>
              </div>
            </td>
            <td class="col-cambio">
              <span 
                class="change-indicator"
                :class="topic.cambio > 0 ? 'positive' : topic.cambio < 0 ? 'negative' : 'neutral'"
              >
                <span class="change-icon">{{ getChangeIcon(topic.cambio) }}</span>
                <span class="change-value">{{ topic.cambio > 0 ? '+' : '' }}{{ topic.cambio.toFixed(1) }}%</span>
              </span>
            </td>
            <td class="col-alcance">
              <span class="metric-value">{{ formatNumber(topic.alcance) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-actions">
      <button class="btn-outline btn-sm" @click="$emit('export')">
        💾 Exportar CSV
      </button>
    </div>
  </div>
</template>

<style scoped>
.trending-table-container {
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #E8EAED;
  margin: 0;
}

.table-wrapper {
  overflow-x: auto;
}

.trending-table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #141B22;
}

th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.col-sortable {
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.col-sortable:hover {
  color: #E8EAED;
}

.sort-indicator {
  margin-left: 4px;
  color: #52C41A;
}

.col-rank {
  width: 50px;
  text-align: center;
}

.col-topic {
  min-width: 200px;
}

.col-sentiment {
  width: 140px;
}

.table-row {
  cursor: pointer;
  transition: background 0.2s;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #141B22;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: #9AA0A6;
}

.topic-name {
  font-size: 14px;
  font-weight: 500;
  color: #E8EAED;
}

.metric-value {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #E8EAED;
}

.sentiment-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sentiment-emoji {
  font-size: 16px;
}

.change-indicator {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Roboto Mono', monospace;
}

.change-indicator.positive {
  color: #52C41A;
}

.change-indicator.negative {
  color: #D32F2F;
}

.change-indicator.neutral {
  color: #9AA0A6;
}

.change-icon {
  font-size: 14px;
}

.table-actions {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 12px;
}
</style>
