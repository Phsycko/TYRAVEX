/**
 * TYRAVEX Router Configuration
 * Electoral Intelligence Platform - Navigation Routes
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: {
                title: 'Centro de Comando',
                module: 'command'
            }
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: () => import('../views/AnalyticsView.vue'),
            meta: {
                title: 'Analytics - Inteligencia Geografica',
                module: 'analytics'
            }
        },
        {
            path: '/monitor',
            name: 'monitor',
            component: () => import('../views/MonitorView.vue'),
            meta: {
                title: 'Monitor - Vigilancia en Tiempo Real',
                module: 'monitor'
            }
        },
        {
            path: '/predict',
            name: 'predict',
            component: () => import('../views/PredictView.vue'),
            meta: {
                title: 'Predict - Modelado Predictivo',
                module: 'predict'
            }
        },
        {
            path: '/research',
            name: 'research',
            component: () => import('../views/ResearchView.vue'),
            meta: {
                title: 'Research - Inteligencia de Oposicion',
                module: 'research'
            }
        },
        // --- NEW MODULES ---
        {
            path: '/control-informacion',
            name: 'control-informacion',
            component: () => import('../views/ControlInformacionView.vue'),
            meta: {
                title: 'Control de Informacion',
                module: 'control-informacion'
            }
        },
        {
            path: '/gestion-crisis',
            name: 'gestion-crisis',
            component: () => import('../views/GestionCrisisView.vue'),
            meta: {
                title: 'Gestion de Crisis',
                module: 'gestion-crisis'
            }
        },
        {
            path: '/analisis-territorial',
            name: 'analisis-territorial',
            component: () => import('../views/AnalisisTerritorialView.vue'),
            meta: {
                title: 'Analisis Territorial',
                module: 'analisis-territorial'
            }
        },
        {
            path: '/estrategia-seguridad',
            name: 'estrategia-seguridad',
            component: () => import('../views/EstrategiaSeguridadView.vue'),
            meta: {
                title: 'Estrategia y Seguridad',
                module: 'estrategia-seguridad'
            }
        },
        {
            path: '/vista-ejecutiva',
            name: 'vista-ejecutiva',
            component: () => import('../views/VistaEjecutivaView.vue'),
            meta: {
                title: 'Vista Ejecutiva',
                module: 'vista-ejecutiva'
            }
        },
        {
            path: '/seguridad',
            name: 'seguridad',
            component: () => import('../views/SeguridadView.vue'),
            meta: {
                title: 'Seguridad y Soberania',
                module: 'seguridad'
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue'),
            meta: {
                title: 'Configuracion',
                module: 'settings'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/dashboard'
        }
    ]
})

// Update document title on navigation
router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || 'TYRAVEX'} | TYRAVEX Electoral Intelligence`
    next()
})

export default router
