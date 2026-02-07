/**
 * useAnalytics Composable
 * Hook para consumir el contexto de Analytics
 * 
 * Proporciona acceso al estado global de Analytics con control de permisos
 */

import { inject } from 'vue'
import type { AnalyticsContext, AnalyticsModuleKey } from '@/types/analytics'

// Symbol único para el contexto de Analytics
export const ANALYTICS_CONTEXT_KEY = Symbol('analytics-context')

/**
 * Hook para consumir el contexto de Analytics
 * 
 * @throws Error si se usa fuera del AnalyticsProvider
 * @returns Contexto de Analytics con estado y métodos
 * 
 * @example
 * ```vue
 * <script setup>
 * const { selectedState, enabledStates, isModuleEnabled } = useAnalytics()
 * </script>
 * ```
 */
export function useAnalytics(): AnalyticsContext {
    const context = inject<AnalyticsContext>(ANALYTICS_CONTEXT_KEY)

    if (!context) {
        throw new Error(
            'useAnalytics() debe ser usado dentro de un componente envuelto por <AnalyticsProvider>'
        )
    }

    return context
}
