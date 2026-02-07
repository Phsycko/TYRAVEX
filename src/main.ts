/**
 * TYRAVEX Application Entry Point
 * Initializes Vue app with Pinia and Vue Router
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import './styles/tailwind.css'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
