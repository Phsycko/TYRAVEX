/**
 * TYRAVEX Operator Store
 * Active operator state management
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Operator {
    id: string
    name: string
    role: string
    clearance: number // 1-5, where 5 is highest
}

export const useOperatorStore = defineStore('operator', () => {
    // State - Mock operator for demonstration
    const operator = ref<Operator>({
        id: 'OPR-7743',
        name: 'SISTEMA',
        role: 'ADMINISTRADOR',
        clearance: 5
    })

    // Computed
    const clearanceLevel = computed(() => {
        return `NIVEL ${operator.value.clearance}`
    })

    const clearanceColor = computed(() => {
        if (operator.value.clearance >= 4) return 'var(--color-status-online)'
        if (operator.value.clearance >= 2) return 'var(--color-status-warning)'
        return 'var(--color-status-critical)'
    })

    // Actions
    function setOperator(newOperator: Operator) {
        operator.value = newOperator
    }

    function updateClearance(level: number) {
        if (level >= 1 && level <= 5) {
            operator.value.clearance = level
        }
    }

    return {
        // State
        operator,

        // Computed
        clearanceLevel,
        clearanceColor,

        // Actions
        setOperator,
        updateClearance
    }
})
