import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/dashboard' },
        { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: 'COMMAND CENTER' } },
        { path: '/analytics', name: 'analytics', component: () => import('../views/AnalyticsView.vue'), meta: { title: 'ANALYTICS' } },
        { path: '/monitor', name: 'monitor', component: () => import('../views/MonitorView.vue'), meta: { title: 'MONITOR' } },
        { path: '/predict', name: 'predict', component: () => import('../views/PredictView.vue'), meta: { title: 'PREDICT' } },
        { path: '/research', name: 'research', component: () => import('../views/ResearchView.vue'), meta: { title: 'RESEARCH' } },
        { path: '/territorio', name: 'territorio', component: () => import('../views/AnalisisTerritorialView.vue'), meta: { title: 'TERRITORIO' } },
        { path: '/gestion-crisis', name: 'gestion-crisis', component: () => import('../views/GestionCrisisView.vue'), meta: { title: 'CRISIS MANAGEMENT' } },
        { path: '/control-info', name: 'control-info', component: () => import('../views/ControlInformacionView.vue'), meta: { title: 'CONTROL INFO' } },
        { path: '/estrategia', name: 'estrategia', component: () => import('../views/EstrategiaView.vue'), meta: { title: 'ESTRATEGIA' } },
        { path: '/vista-ejecutiva', name: 'vista-ejecutiva', component: () => import('../views/VistaEjecutivaView.vue'), meta: { title: 'VISTA EJECUTIVA' } },
        { path: '/seguridad', name: 'seguridad', component: () => import('../views/SeguridadView.vue'), meta: { title: 'SEGURIDAD' } },
        { path: '/blindaje', name: 'blindaje', component: () => import('../views/blindaje/BlindajeDashboard.vue'), meta: { title: 'BLINDAJE' } },
        { path: '/blindaje/amenazas', name: 'blindaje-amenazas', component: () => import('../views/blindaje/AmenazasRed.vue'), meta: { title: 'BLINDAJE — AMENAZAS' } },
        { path: '/blindaje/riesgo-geografico', name: 'blindaje-riesgo', component: () => import('../views/blindaje/RiesgoGeografico.vue'), meta: { title: 'BLINDAJE — RIESGO' } },
        { path: '/blindaje/alertas', name: 'blindaje-alertas', component: () => import('../views/blindaje/AlertasTiempoReal.vue'), meta: { title: 'BLINDAJE — ALERTAS' } },
        { path: '/blindaje/informes', name: 'blindaje-informes', component: () => import('../views/blindaje/InformesDiarios.vue'), meta: { title: 'BLINDAJE — INFORMES' } },
        { path: '/blindaje/espacios', name: 'blindaje-espacios', component: () => import('../views/blindaje/GestionEspacios.vue'), meta: { title: 'BLINDAJE — ESPACIOS' } },
        { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue'), meta: { title: 'SETTINGS' } },
        { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
    ]
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || 'TYRAVEX'} | TYRAVEX Intelligence`
    next()
})

export default router
