cd /Users/chema/Desktop/software-tyravex

cat > README.md << 'EOF'
# TYRAVEX OS
**Sistema Operativo de Inteligencia Enterprise**  
*Palantir Mexicano · $1,000,000 MXN al mes*

[![Status](https://img.shields.io/badge/Status-Beta_v1.0-orange.svg)](.)
[![Tech](https://img.shields.io/badge/Tech-Vue_3_+_TypeScript-42b883.svg)](.)
[![Modules](https://img.shields.io/badge/Modules-16_Active-ff6b35.svg)](.)
[![Security](https://img.shields.io/badge/Security-Offline_First-red.svg)](.)

---

## 📋 Índice

- [¿Qué es TYRAVEX?](#qué-es-tyravex)
- [Para quién es](#para-quién-es)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Módulos (16 totales)](#módulos)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación y Setup](#instalación-y-setup)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Roadmap](#roadmap)
- [FAQ Técnico](#faq-técnico)

---

## 🎯 ¿Qué es TYRAVEX?

**TYRAVEX** es una plataforma de inteligencia operacional enterprise diseñada para campañas políticas, gobierno, fuerzas de seguridad y operaciones tácticas en México. Se posiciona como el **"Palantir Mexicano"** — software de inteligencia de $1,000,000 MXN mensuales.

### El Problema que Resuelve

Las campañas políticas y operaciones gubernamentales en México enfrentan:
- **Sobrecarga de información**: Miles de menciones diarias en redes sin sistema unificado
- **Decisiones sin datos**: Estrategias basadas en intuición vs inteligencia
- **Amenazas no detectadas**: Narrativas hostiles, coordinación de bots, crisis sin alerta temprana
- **Recursos mal asignados**: Sin visibilidad territorial real ni optimización basada en datos
- **Reacción lenta a crisis**: Sin protocolos automatizados ni sistemas de alerta

### La Solución

TYRAVEX integra **16 módulos** en un sistema unificado que:
1. **Monitorea** 24/7 redes sociales, medios y fuentes de datos
2. **Analiza** con IA en español mexicano (NLP, sentiment, predicción)
3. **Predice** probabilidad de victoria y escenarios futuros
4. **Alerta** ante amenazas con scoring predictivo
5. **Coordina** operaciones territoriales con mapas interactivos
6. **Protege** con blindaje de inteligencia de amenazas
7. **Decide** con simulaciones what-if y optimización de recursos

**Valor único**: Todo en una plataforma offline cifrada. Sin cloud. Máxima seguridad.

---

## 🎯 Para quién es

### Mercados Objetivo

| Segmento | Buyer | Módulos Clave | Precio | Ciclo |
|----------|-------|---------------|--------|-------|
| **Campañas Electorales** | Director de campaña | Todos (16 módulos) | $1M MXN/mes | 6-18 meses |
| **Gobierno Municipal/Estatal** | Secretario de Gobierno | Territorio, Crisis, Analytics, Blindaje | $500K MXN/año | Anual |
| **Seguridad Pública** | Comandante / Fiscal | Territorio, Blindaje, Crisis, Espacios | $600K MXN/año | Anual + certificación |
| **Fuerzas Armadas** | Oficial de Inteligencia | Territorio Táctico, Blindaje, Espacios | Clasificado | Multi-anual |
| **Empresas con exposición política** | Director de Comunicación | Analytics, Monitor, Control Info, Blindaje | $300K MXN/año | Anual |

---

## 🏗 Arquitectura del Sistema
```
┌─────────────────────────────────────────────────────────────┐
│  FUENTES EXTERNAS                                           │
│  Twitter/X · Facebook · Instagram · TikTok · YouTube ·      │
│  Telegram · INE · INEGI · NewsAPI · RSS Medios MX           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  BACKEND — FastAPI (Python)                                 │
│  ┌──────────┬──────────┬──────────┬────────────────────┐   │
│  │PostgreSQL│ MongoDB  │  Redis   │  Elasticsearch     │   │
│  │(users,   │(intel,   │(cache,   │(search,           │   │
│  │ config)  │ docs)    │ sessions)│ full-text)        │   │
│  └──────────┴──────────┴──────────┴────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ CAPA IA / ML                                       │    │
│  │ NLP Español · Sentiment · Predicción · Detección   │    │
│  │ Anomalías · Clasificación · GPT/Claude API         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↓
              REST /api/v1/ + WebSocket /ws/
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND — Vue 3 SPA                                       │
│  TypeScript · Vite · Pinia · Vue Router · ECharts ·         │
│  Leaflet · Tailwind CSS                                     │
│                                                              │
│  16 Módulos:                                                │
│  Command Center · Analytics · Monitor · Predict ·           │
│  Research · Territorio · Crisis · Control Info ·            │
│  Estrategia · Blindaje (7 sub-módulos)                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  DISTRIBUCIÓN SEGURA                                        │
│  Docker Cifrado + USB Cifrada + PC Full Disk Encryption    │
│  Sin cloud · Sin internet · Máxima seguridad                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Módulos

### 1. COMMAND LAYER

#### **Command Center** 
Dashboard principal. Vista de estado de todos los módulos en tiempo real.
- **Qué hace**: Hub central. Feed de actividad global. Alertas críticas. Quick actions.
- **Tech**: WebSocket real-time, Pinia global state
- **Para quién**: Directores de campaña, comandantes, coordinadores

#### **Estrategia** 
Meta-módulo que orquesta todos los demás. War Room integrado.
- **Qué hace**: Simula campañas completas. Optimiza recursos con IA. Timeline maestro. Decisiones multi-dominio.
- **Tech**: IA de optimización, integración con todos los módulos
- **Para quién**: Estrategas, directores generales

---

### 2. INTELLIGENCE LAYER

#### **Analytics** 
Métricas electorales en tiempo real.
- **Qué hace**: Intención de voto · Sentimiento público · Share of voice · Demografía · Comparación vs competencia
- **Fuentes**: Redes sociales, encuestas, medios
- **Tech**: NLP español mexicano, ECharts dashboards
- **Para quién**: Analistas políticos, coordinadores de campaña

#### **Monitor** 
Vigilancia 24/7 de redes sociales y medios.
- **Qué hace**: Detecta menciones · Trending topics · Narrativas · Bots · Alertas automáticas por umbral
- **Fuentes**: Twitter/X, Facebook, Instagram, TikTok, YouTube, Telegram, medios MX
- **Tech**: Stream processing, NLP, detector de bots
- **Para quién**: Equipos de comunicación, analistas digitales

#### **Predict** 
Modelos predictivos de IA.
- **Qué hace**: Proyecta probabilidad de victoria · Simulador what-if · Escenarios con intervalo de confianza
- **Tech**: ML models (Python), datos históricos 20+ años
- **Para quién**: Estrategas, directores de campaña

#### **Research** 
Inteligencia de oposición.
- **Qué hace**: Perfiles de oponentes · Detector de inconsistencias · Timeline de declaraciones · Análisis de red
- **Tech**: NLP, web scraping, análisis de texto
- **Para quién**: Investigadores, equipos de contraste

---

### 3. OPERATIONS LAYER

#### **Territorio** 
Mapa interactivo de México (estados y municipios).
- **Qué hace**: Control distrital · Planificación de operaciones · Despliegue de recursos · 4 modos (Electoral/Seguridad/Táctico/Social)
- **Tech**: Leaflet, GeoJSON INEGI, capas dinámicas
- **Para quién**: Coordinadores territoriales, comandantes de operaciones

#### **Crisis** 
Sistema de alerta temprana y gestión de emergencias.
- **Qué hace**: Monitorea 47+ indicadores · Activa protocolos · Coordina recursos · Simulador de crisis
- **Tech**: Real-time monitoring, WebSocket alerts
- **Para quién**: Equipos de seguridad, gestores de crisis

#### **Control Info** 
Gestión de huella digital y reputación.
- **Qué hace**: Scanner de presencia online · Vault de assets · Detección uso no autorizado · Takedowns DMCA
- **Tech**: Reverse image search, web scraping, APIs DMCA
- **Para quién**: Equipos de comunicación, protección de imagen

---

### 4. BLINDAJE LAYER — Threat Intelligence

Módulo completo de 7 sub-módulos para inteligencia de amenazas.

#### **Dashboard Blindaje** 
Centro de control de amenazas.
- **Qué hace**: Score de amenaza 0-100 · Mapa de calor de riesgo · Feed de señales live · Predicciones 24-72h
- **Tech**: IA predictiva, scoring en tiempo real

#### **Análisis de Señales (Amenazas en Red)** 
Monitoreo profundo de señales hostiles.
- **Qué hace**: Tabla de amenazas · Análisis de narrativas · Red de difusión · Detección de coordinación · Gestión de keywords
- **Tech**: NLP avanzado, análisis de redes sociales

#### **Riesgo Geográfico** 
Mapa de calor de hostilidad digital por región.
- **Qué hace**: Colorea estados/municipios por score de riesgo · Capas activables · Eventos con pins de alerta
- **Tech**: Leaflet + scoring geográfico

#### **Predicciones de Amenaza** 
Modelo que anticipa escalamiento.
- **Qué hace**: Predice score en 24-72h · 3 escenarios (optimista/base/adverso) · Factores de riesgo · Historial de precisión
- **Tech**: ML predictivo, series de tiempo

#### **Alertas Tiempo Real** 
Notificaciones automáticas.
- **Qué hace**: Feed live de alertas · Configuración de umbrales · Multi-canal (email/SMS/Slack) · Escalamiento automático
- **Tech**: WebSocket, integración Twilio/SMTP

#### **Informes de Inteligencia** 
Generador de reportes.
- **Qué hace**: Brief ejecutivo automático · Reportes técnicos · Generador PDF · Historial
- **Tech**: Plantillas dinámicas, exportación PDF

#### **Gestión de Espacios** 
Constructor de planos para crisis físicas.
- **Qué hace**: Editor SVG de planos · Zonas interactivas · Rutas de evacuación · Puntos críticos · Modo emergencia con protocolos
- **Tech**: SVG editor, localStorage, canvas interactivo
- **Para quién**: Equipos de seguridad física, coordinadores de eventos, bomberos, policía

---

## 💻 Stack Tecnológico

### Frontend
```
Vue 3            — Framework principal (Composition API)
TypeScript       — Type safety en todo el código
Vite             — Build tool y dev server
Pinia            — Estado global
Vue Router       — Navegación SPA
Tailwind CSS     — Estilos utility-first
ECharts 5        — Gráficos y visualizaciones
Leaflet          — Mapas interactivos
Socket.io-client — WebSocket real-time
Axios            — HTTP client
```

### Backend (Planeado)
```
FastAPI          — API REST + WebSocket
Python 3.11+     — Lenguaje principal
PostgreSQL       — Datos estructurados (usuarios, configs)
MongoDB          — Documentos, inteligencia, perfiles
Redis            — Cache, sesiones, pub/sub
Elasticsearch    — Búsqueda full-text, análisis
```

### IA / ML
```
spaCy            — NLP en español
Hugging Face     — Modelos transformers
scikit-learn     — ML clásico (predicción)
OpenAI API       — GPT-4 para análisis complejo
Anthropic Claude — Generación de reportes
```

### DevOps
```
Docker           — Contenedores
Docker Compose   — Orquestación local
Nginx            — Reverse proxy
Certbot          — SSL (si cloud)
```

### Seguridad
```
OpenSSL          — Cifrado AES-256
LUKS             — Full disk encryption
JWT              — Autenticación API
bcrypt           — Hashing passwords
```

---

## 🚀 Instalación y Setup

### Requisitos
- Node.js 18+
- npm o pnpm
- Git

### Clonar el repo
```bash
git clone https://github.com/TU_USUARIO/tyravex.git
cd tyravex
```

### Instalar dependencias
```bash
npm install
```

### Variables de entorno
```bash
cp .env.example .env
```

Edita `.env`:
```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000
VITE_MAPBOX_TOKEN=tu_token_aqui
```

### Correr en desarrollo
```bash
npm run dev
```

Abre: http://localhost:5173

### Build para producción
```bash
npm run build
```

Output en `/dist`

### Preview del build
```bash
npm run preview
```

---

## 📁 Estructura del Proyecto
```
tyravex/
├── public/                    # Assets estáticos
├── src/
│   ├── main.ts               # Entry point
│   ├── App.vue               # Root component
│   ├── router/
│   │   └── index.ts          # Definición de rutas
│   ├── stores/               # Pinia stores
│   │   ├── auth.ts
│   │   ├── app.ts
│   │   ├── modules.ts
│   │   └── websocket.ts
│   ├── services/             # API clients
│   │   ├── api.ts            # Axios base + interceptors
│   │   ├── analytics.ts
│   │   ├── monitor.ts
│   │   ├── predict.ts
│   │   ├── research.ts
│   │   ├── territory.ts
│   │   ├── crisis.ts
│   │   ├── controlInfo.ts
│   │   └── strategy.ts
│   ├── composables/          # Hooks reutilizables
│   │   ├── useApi.ts
│   │   ├── useWebSocket.ts
│   │   ├── useChart.ts
│   │   └── useToast.ts
│   ├── components/
│   │   ├── ui/               # Componentes base
│   │   ├── shared/           # Componentes compartidos
│   │   ├── charts/           # Wrappers de ECharts
│   │   ├── maps/             # Componentes de mapas
│   │   └── blindaje/         # Específicos de Blindaje
│   ├── views/                # Vistas por módulo
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── monitor/
│   │   ├── predict/
│   │   ├── research/
│   │   ├── territory/
│   │   ├── crisis/
│   │   ├── control-info/
│   │   ├── strategy/
│   │   └── blindaje/
│   ├── data/                 # Datos mock
│   │   ├── mockData.ts
│   │   ├── blindajeData.ts
│   │   ├── espaciosData.ts
│   │   ├── municipalityData.ts
│   │   └── geo/mx/           # GeoJSON México
│   ├── types/                # TypeScript interfaces
│   │   ├── api.ts
│   │   ├── modules.ts
│   │   └── user.ts
│   └── assets/
│       └── styles/
│           ├── main.css
│           ├── typography.css
│           └── components.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🔄 Flujo de Trabajo

### Para desarrolladores

1. **Crear feature**
```bash
git checkout -b feature/nombre-feature
```

2. **Desarrollar**
- Componentes → `src/components/`
- Vistas → `src/views/`
- Estado global → `src/stores/`
- API → `src/services/`

3. **Commit**
```bash
git add .
git commit -m "feat: descripción clara"
```

4. **Push y PR**
```bash
git push origin feature/nombre-feature
```

### Convenciones

- **Componentes**: PascalCase (`MyComponent.vue`)
- **Composables**: camelCase + `use` (`useMyHook.ts`)
- **Stores**: camelCase (`myStore.ts`)
- **Services**: camelCase + `Service` (`myService.ts`)
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` nueva feature
  - `fix:` bug fix
  - `refactor:` refactor sin cambio funcional
  - `docs:` documentación
  - `style:` formato
  - `test:` tests

---

## 🗺 Roadmap

### ✅ Fase 1 — Frontend Complete (ACTUAL)
- [x] 16 módulos implementados
- [x] Diseño enterprise
- [x] Componentes reutilizables
- [x] Router completo
- [x] Mock data funcional
- [x] Responsive desktop-first

### 🚧 Fase 2 — Backend Core (2-3 meses)
- [ ] FastAPI + PostgreSQL + MongoDB + Redis + Elasticsearch
- [ ] Autenticación JWT + roles
- [ ] WebSocket real-time
- [ ] Endpoints todos los módulos
- [ ] 3 integraciones (Twitter, INEGI, NewsAPI)
- [ ] Docker Compose dev

### 🔮 Fase 3 — IA Propia (3-6 meses)
- [ ] NLP español mexicano
- [ ] Análisis sentimiento fine-tuned
- [ ] Modelo predictivo electoral
- [ ] Detector amenazas y bots
- [ ] Generador reportes LLM

### 🎯 Fase 4 — Primer Cliente (6-9 meses)
- [ ] Docker cifrado
- [ ] USB cifrada
- [ ] Onboarding documentado
- [ ] SLA soporte 24/7
- [ ] Primer cliente real

### 🌎 Fase 5 — Expansión (Año 2)
- [ ] App móvil brigadistas
- [ ] Internacionalización Latam
- [ ] Marca blanca
- [ ] ISO 27001
- [ ] Módulos adicionales

---

## 🤔 FAQ Técnico

### ¿Por qué Vue 3 y no React?
Vue 3 es más productivo para equipos pequeños. Menos boilerplate, mejor DX, integración excelente con ECharts y Leaflet.

### ¿Por qué FastAPI?
Más rápido para APIs Python. Built-in OpenAPI docs, async nativo, perfecto para ML/IA.

### ¿Por qué 4 bases de datos?
- **PostgreSQL**: Relacional ACID (usuarios, configs)
- **MongoDB**: Documentos flexibles (intel, perfiles)
- **Redis**: Cache in-memory (sesiones, pub/sub)
- **Elasticsearch**: Full-text search español

### ¿Por qué offline (USB cifrada)?
**Seguridad máxima**. Clientes manejan datos extremadamente sensibles. Offline elimina vectores de ataque remotos. Diferenciador único en el mercado.

### ¿Cómo escala si es offline?
Cada cliente tiene instancia aislada. Escalamiento vertical (más RAM/CPU) + horizontal (múltiples usuarios en LAN).

### ¿Cómo se actualizan?
USB cifrada con nuevo Docker build. Script de migración. Datos persisten en disco cifrado local. Zero downtime blue-green.

### ¿Qué pasa si se pierde la USB?
AES-256 + hardware key. Sin contraseña es inerte. Sistema de revocación: nueva USB con nuevas claves invalida la anterior.

### ¿Dónde está el backend?
**No existe**. Frontend consume mock data (`src/data/`). Fase 2 construye FastAPI completo.

### ¿Cómo contribuyo?
1. Lee este README
2. Clona repo
3. Branch feature/
4. Desarrolla con convenciones
5. PR con descripción
6. Code review

---

## 📞 Contacto

**Fundador**: José Manuel  
**Email**: [josecamachojsmith99@gmail.com]  
**Slack**: [#tyravex-dev]  

---

## 🔐 Seguridad

Vulnerabilidades: **NO abrir issue público**.  
Contactar: security@tyravex.com

---

**CONFIDENTIAL // INTERNAL USE ONLY // 2026**
EOF

git add README.md
git commit -m "docs: add comprehensive README.md for collaborators"
git push origin main

echo "✅ README.md creado y subido"
