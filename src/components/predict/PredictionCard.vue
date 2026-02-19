<template>
  <div class="prediction-card" :class="`prediction-card--${tipo}`">
    <!-- Header -->
    <div class="prediction-card__header">
      <h3 class="prediction-card__nombre">{{ candidato.nombre }}</h3>
      <div class="prediction-card__tendencia" :class="`tendencia--${candidato.tendencia}`">
        <span class="tendencia__icono">{{ candidato.cambio7dias >= 0 ? '↑' : '↓' }}</span>
        <span class="tendencia__valor">{{ Math.abs(candidato.cambio7dias).toFixed(1) }}%</span>
        <span class="tendencia__label">7d</span>
      </div>
    </div>

    <!-- Porcentaje Principal -->
    <div class="prediction-card__main">
      <div class="prediction-card__porcentaje">{{ candidato.porcentaje.toFixed(1) }}%</div>
      <div class="prediction-card__rango">
        {{ candidato.rangoMin?.toFixed(1) }}% - {{ candidato.rangoMax?.toFixed(1) }}%
      </div>
    </div>

    <!-- Barra de Progreso -->
    <div class="prediction-card__progress-container">
      <div 
        class="prediction-card__progress-bar" 
        :style="{ width: `${candidato.porcentaje}%`, backgroundColor: candidato.color }"
      ></div>
      <div class="prediction-card__threshold" v-if="mostrarUmbral"></div>
    </div>

    <!-- Factores Clave (solo para candidato principal) -->
    <div v-if="candidato.factoresClave && candidato.factoresClave.length > 0" class="prediction-card__factores">
      <div class="factores__titulo">Factores clave</div>
      <div class="factores__lista">
        <div 
          v-for="(factor, index) in candidato.factoresClave.slice(0, 3)" 
          :key="index"
          class="factor-item"
        >
          <div class="factor-item__nombre">{{ factor.factor }}</div>
          <div class="factor-item__impacto">
            <div class="factor-bar" :style="{ width: `${factor.impacto * 50}%` }"></div>
            <span class="factor-valor">+{{ factor.impacto.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Debilidades (para oponentes) -->
    <div v-if="candidato.debilidades && candidato.debilidades.length > 0" class="prediction-card__debilidades">
      <div class="debilidades__titulo">Debilidades detectadas</div>
      <div class="debilidades__lista">
        <div 
          v-for="(debilidad, index) in candidato.debilidades.slice(0, 2)" 
          :key="index"
          class="debilidad-item"
        >
          <span class="debilidad-icono">⚠</span>
          <span class="debilidad-texto">{{ debilidad.factor }}</span>
          <span class="debilidad-impacto">{{ debilidad.impacto.toFixed(1) }}%</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="prediction-card__footer">
      <span class="footer__margen">±{{ candidato.margenError }}% margen</span>
      <button class="footer__btn" @click="$emit('ver-detalle', candidato)">
        Ver análisis →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Factor {
  factor: string
  impacto: number
}

interface Candidato {
  nombre: string
  porcentaje: number
  margenError: number
  rangoMin?: number
  rangoMax?: number
  cambio7dias: number
  tendencia: 'positiva' | 'negativa' | 'neutral'
  color: string
  factoresClave?: Factor[]
  debilidades?: Factor[]
}

interface Props {
  candidato: Candidato
  tipo?: 'principal' | 'oponente' | 'otros'
  mostrarUmbral?: boolean
}

withDefaults(defineProps<Props>(), {
  tipo: 'principal',
  mostrarUmbral: true
})

defineEmits<{
  'ver-detalle': [candidato: Candidato]
}>()
</script>

<style scoped>
.prediction-card {
  background: #1A2332;
  border: 1px solid #2A3F5F;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.prediction-card:hover {
  border-color: #4A90E2;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
  transform: translateY(-2px);
}

.prediction-card--principal {
  border-left: 3px solid #52C41A;
}

.prediction-card--oponente {
  border-left: 3px solid #D32F2F;
}

.prediction-card--otros {
  border-left: 3px solid #8C8C8C;
}

/* Header */
.prediction-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.prediction-card__nombre {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #E8EAED;
  margin: 0;
}

.prediction-card__tendencia {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
}

.tendencia--positiva {
  background: rgba(82, 196, 26, 0.1);
  color: #52C41A;
}

.tendencia--negativa {
  background: rgba(211, 47, 47, 0.1);
  color: #D32F2F;
}

.tendencia--neutral {
  background: rgba(140, 140, 140, 0.1);
  color: #8C8C8C;
}

.tendencia__icono {
  font-size: 14px;
}

.tendencia__label {
  opacity: 0.7;
  font-size: 10px;
}

/* Main */
.prediction-card__main {
  text-align: center;
  margin-bottom: 16px;
}

.prediction-card__porcentaje {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #E8EAED;
  line-height: 1;
  margin-bottom: 4px;
}

.prediction-card__rango {
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  color: #9AA0A6;
}

/* Progress Bar */
.prediction-card__progress-container {
  position: relative;
  height: 6px;
  background: #0B0E11;
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: visible;
}

.prediction-card__progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.prediction-card__threshold {
  position: absolute;
  left: 50%;
  top: -2px;
  width: 2px;
  height: 10px;
  background: #FA8C16;
  transform: translateX(-50%);
}

.prediction-card__threshold::before {
  content: '50%';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #FA8C16;
  font-family: 'Roboto Mono', monospace;
}

/* Factores */
.prediction-card__factores {
  margin-bottom: 16px;
}

.factores__titulo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.factores__lista {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.factor-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.factor-item__nombre {
  font-size: 12px;
  color: #E8EAED;
}

.factor-item__impacto {
  display: flex;
  align-items: center;
  gap: 8px;
}

.factor-bar {
  height: 4px;
  background: #52C41A;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.factor-valor {
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #52C41A;
  min-width: 40px;
}

/* Debilidades */
.prediction-card__debilidades {
  margin-bottom: 16px;
}

.debilidades__titulo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #9AA0A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.debilidades__lista {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.debilidad-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #E8EAED;
}

.debilidad-icono {
  color: #FA8C16;
}

.debilidad-texto {
  flex: 1;
}

.debilidad-impacto {
  font-family: 'Roboto Mono', monospace;
  color: #D32F2F;
  font-size: 11px;
}

/* Footer */
.prediction-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #2A3F5F;
}

.footer__margen {
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #9AA0A6;
}

.footer__btn {
  background: transparent;
  border: 1px solid #4A90E2;
  color: #4A90E2;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer__btn:hover {
  background: rgba(74, 144, 226, 0.1);
  border-color: #6BA3E8;
}
</style>
