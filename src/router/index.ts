/**
 * TYRAVEX Router Configuration
 * Navigation routes for all system domains
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/overview'
        },
        {
            path: '/overview',
            name: 'overview',
            component: () => import('../views/Overview.vue'),
            meta: {
                title: 'VISIÓN GENERAL'
            }
        },
        {
            path: '/domains',
            name: 'domains',
            component: () => import('../views/Domains.vue'),
            meta: {
                title: 'DOMINIOS'
            }
        },
        {
            path: '/intelligence',
            name: 'intelligence',
            component: () => import('../views/Intelligence.vue'),
            meta: {
                title: 'INTELIGENCIA'
            }
        },
        {
            path: '/operations',
            name: 'operations',
            component: () => import('../views/Operations.vue'),
            meta: {
                title: 'OPERACIONES'
            }
        },
        {
            path: '/audit',
            name: 'audit',
            component: () => import('../views/Audit.vue'),
            meta: {
                title: 'AUDITORÍA'
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/Settings.vue'),
            meta: {
                title: 'CONFIGURACIÓN'
            }
        }
    ]
})

export default router
