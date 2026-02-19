<template>
  <div class="control-info-view">
    <!-- Main Dashboard (shown when no tab selected or dashboard tab) -->
    <div v-if="activeTab === 'dashboard'">
      <RiskDashboard :metrics="dashboardMetrics" :sources="sources" />
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-container">
      <div class="tabs-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab !== 'dashboard'" class="tab-content-wrapper">
      <!-- Tabs with sidebar layout (Inventory only) -->
      <div v-if="activeTab === 'inventory'" class="tab-content-container">
        <FilterSidebar :counts="filterCounts" @filter-change="handleFilterChange" />
        <div class="tab-content">
          <InventoryGrid :items="filteredItems" />
        </div>
      </div>

      <!-- Full-width tabs (functional tools) -->
      <div v-else class="tab-content-full">
        <!-- Tab 1: Digital Scanner -->
        <div v-if="activeTab === 'scanner'">
          <DigitalScanner />
        </div>

        <!-- Tab 2: Reverse Image Search -->
        <div v-else-if="activeTab === 'search'">
          <ReverseImageSearch />
        </div>

        <!-- Tab 3: Identity Vault -->
        <div v-else-if="activeTab === 'identity'">
          <IdentityVault />
        </div>

        <!-- Tab 4: Takedown Station -->
        <div v-else-if="activeTab === 'takedown'">
          <TakedownStation />
        </div>

        <!-- Tab 5: Risk Monitor -->
        <div v-else-if="activeTab === 'risk'">
          <RiskMonitor />
        </div>

        <!-- Tab 6: Versions & Audit (placeholders for now) -->
        <div v-else-if="activeTab === 'versions'">
          <div class="placeholder-tab">
            <div class="placeholder-icon">📋</div>
            <h2>Control de Versiones y Uso</h2>
            <p>Historial completo de versiones y rastreo de uso de assets.</p>
            <p class="status">🚧 En desarrollo - Próximamente</p>
          </div>
        </div>

        <div v-else-if="activeTab === 'audit'">
          <div class="placeholder-tab">
            <div class="placeholder-icon">📊</div>
            <h2>Auditoría y Compliance</h2>
            <p>Log completo de eventos y generación de reportes de cumplimiento.</p>
            <p class="status">🚧 En desarrollo - Próximamente</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RiskDashboard from '@/components/controlInfo/RiskDashboard.vue'
import FilterSidebar from '@/components/controlInfo/FilterSidebar.vue'
import InventoryGrid from '@/components/controlInfo/InventoryGrid.vue'
import DigitalScanner from '@/components/controlInfo/DigitalScanner.vue'
import ReverseImageSearch from '@/components/controlInfo/ReverseImageSearch.vue'
import IdentityVault from '@/components/controlInfo/IdentityVault.vue'
import TakedownStation from '@/components/controlInfo/TakedownStation.vue'
import RiskMonitor from '@/components/controlInfo/RiskMonitor.vue'
import { dashboardMetrics, sources, criticalItems, sovereignProfile } from '@/data/controlInfoData'
import type { DigitalItem } from '@/types/controlInfo'

const activeTab = ref('dashboard')

const tabs = [
  { id: 'inventory', label: 'Inventario Huella', icon: '📦' },
  { id: 'scanner', label: 'Digital Scanner', icon: '🔍' },
  { id: 'search', label: 'Reverse Image', icon: '🖼️' },
  { id: 'identity', label: 'Identity Vault', icon: '🔐' },
  { id: 'takedown', label: 'Takedown Station', icon: '🚫' },
  { id: 'risk', label: 'Risk Monitor', icon: '⚠️' },
  { id: 'versions', label: 'Versiones', icon: '📋' },
  { id: 'audit', label: 'Auditoría', icon: '📊' }
]

// Generate mock monitored and controlled items
const generateMockItems = (): DigitalItem[] => {
  const items: DigitalItem[] = [...criticalItems]
  
  // Add 28 monitored items
  for (let i = 1; i <= 28; i++) {
    items.push({
      id: `item-monitored-${i.toString().padStart(3, '0')}`,
      type: i % 4 === 0 ? 'photo' : i % 4 === 1 ? 'video' : i % 4 === 2 ? 'document' : 'mention',
      title: `Ítem Monitoreado ${i}`,
      description: `Contenido que requiere monitoreo activo`,
      content: `Contenido ${i}`,
      source: i % 3 === 0 ? 'Twitter' : i % 3 === 1 ? 'Facebook' : 'LinkedIn',
      sourceType: 'social_media',
      url: `https://example.com/monitored/${i}`,
      dateDiscovered: new Date(2024, 1, Math.floor(Math.random() * 28) + 1).toISOString(),
      riskScore: 40 + Math.floor(Math.random() * 20),
      riskLevel: 'medium',
      status: 'monitored',
      category: i % 5 === 0 ? 'professional' : i % 5 === 1 ? 'personal' : i % 5 === 2 ? 'political' : i % 5 === 3 ? 'academic' : 'corporate',
      estimatedViews: 10000 + Math.floor(Math.random() * 50000),
      estimatedReach: 5000 + Math.floor(Math.random() * 30000),
      locationsDetected: 1 + Math.floor(Math.random() * 3),
      isAuthorized: false,
      isOfficial: false,
      isDeprecated: false,
      hasInconsistency: false,
      tags: ['monitoreado'],
      lastUpdated: new Date().toISOString()
    })
  }
  
  // Add sample controlled items (we'll show first 10 in table)
  for (let i = 1; i <= 50; i++) {
    items.push({
      id: `item-controlled-${i.toString().padStart(3, '0')}`,
      type: i % 4 === 0 ? 'photo' : i % 4 === 1 ? 'video' : i % 4 === 2 ? 'document' : 'mention',
      title: `Ítem Controlado ${i}`,
      description: `Contenido bajo control`,
      content: `Contenido controlado ${i}`,
      source: i % 3 === 0 ? 'LinkedIn' : i % 3 === 1 ? 'Website Oficial' : 'YouTube',
      sourceType: i % 3 === 0 ? 'social_media' : 'website',
      url: `https://example.com/controlled/${i}`,
      dateDiscovered: new Date(2024, 0, Math.floor(Math.random() * 31) + 1).toISOString(),
      riskScore: 5 + Math.floor(Math.random() * 25),
      riskLevel: 'low',
      status: 'controlled',
      category: i % 5 === 0 ? 'professional' : i % 5 === 1 ? 'personal' : i % 5 === 2 ? 'political' : i % 5 === 3 ? 'academic' : 'corporate',
      estimatedViews: 1000 + Math.floor(Math.random() * 10000),
      estimatedReach: 500 + Math.floor(Math.random() * 5000),
      locationsDetected: 1,
      isAuthorized: true,
      isOfficial: true,
      isDeprecated: false,
      hasInconsistency: false,
      tags: ['controlado', 'oficial'],
      lastUpdated: new Date().toISOString()
    })
  }
  
  return items
}

const allItems = ref<DigitalItem[]>(generateMockItems())
const currentFilters = ref<any>({})

const filteredItems = computed(() => {
  // Apply filters here
  return allItems.value
})

const filterCounts = computed(() => ({
  critical: 8,
  high: 28,
  medium: 147,
  low: 2664,
  photos: 1434,
  videos: 287,
  documents: 892,
  mentions: 521,
  audio: 45,
  websites: 847,
  social: 734,
  publicRecords: 521,
  media: 389,
  forums: 111,
  controlled: 2811,
  monitored: 28,
  criticalStatus: 8,
  professional: 1278,
  personal: 797,
  political: 427,
  academic: 228,
  corporate: 117
}))

const handleFilterChange = (filters: any) => {
  currentFilters.value = filters
  // Apply filtering logic here
}
</script>

<style scoped>
.control-info-view {
  min-height: 100vh;
  background: #0B0E11;
}

/* Tabs Navigation */
.tabs-container {
  padding: 0 2rem;
  background: #0B0E11;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.tabs-nav {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #9AA0A6;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #E8EAED;
  background: rgba(255, 255, 255, 0.02);
}

.tab-btn.active {
  color: #E8EAED;
  border-bottom-color: #722ED1;
  background: rgba(114, 46, 209, 0.05);
}

.tab-icon {
  font-size: 1.1rem;
}

/* Tab Content Layout */
.tab-content-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
}

.tab-content {
  flex: 1;
  min-width: 0;
}

/* Placeholder Tabs */
.placeholder-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  background: #1A2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 4rem 2rem;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.placeholder-tab h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #E8EAED;
  margin: 0 0 1rem 0;
}

.placeholder-tab p {
  font-size: 1.1rem;
  color: #9AA0A6;
  margin: 0.5rem 0;
  max-width: 600px;
}

.placeholder-tab .status {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: rgba(114, 46, 209, 0.1);
  border: 1px solid rgba(114, 46, 209, 0.3);
  border-radius: 8px;
  color: #722ED1;
  font-weight: 600;
}
</style>
