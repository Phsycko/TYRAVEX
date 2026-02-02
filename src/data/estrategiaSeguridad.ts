export const estrategiaData = {
    stats: {
        activeScenarios: 4,
        systemicRisk: 78,
        escalationPoints: 6,
        timeToCritical: '12 días'
    },
    scenarios: [
        { id: 1, name: 'Conflicto Regional A', type: 'Político-Social', probability: 65, severity: 'Alta', status: 'Activo' },
        { id: 2, name: 'Crisis Suministro Agua', type: 'Recursos', probability: 80, severity: 'Crítica', status: 'Inminente' },
        { id: 3, name: 'Desinformación Coordinada', type: 'Info', probability: 45, severity: 'Media', status: 'Monitoreo' },
        { id: 4, name: 'Paro Transporte', type: 'Social', probability: 30, severity: 'Media', status: 'Latente' },
    ],
    risks: [
        { id: 1, source: 'Protestas Zona Norte', target: 'Bloqueo Carreteras', probability: 90, impact: 'Alto' },
        { id: 2, source: 'Falla Eléctrica', target: 'Sistemas Seguridad', probability: 15, impact: 'Crítico' },
        { id: 3, source: 'Escándalo Mediático', target: 'Pérdida Confianza', probability: 60, impact: 'Medio' },
    ],
    resources: [
        { id: 1, name: 'Fuerza Operativa', available: 85, required: 40, status: 'Óptimo' },
        { id: 2, name: 'Reservas Agua', available: 30, required: 50, status: 'Crítico' },
        { id: 3, name: 'Presupuesto Contingencia', available: 60, required: 20, status: 'Estable' },
        { id: 4, name: 'Vehículos', available: 45, required: 45, status: 'Límite' },
    ],
    decisions: [
        { id: 1, title: 'Activar Protocolo Omega', description: 'Despliegue preventivo en zonas rojas', impact: 'Alto', timeLimit: '4h' },
        { id: 2, title: 'Comunicado Oficial', description: 'Desmentir rumor viral', impact: 'Medio', timeLimit: '1h' },
        { id: 3, title: 'Reasignar Recursos Hídricos', description: 'Priorizar hospitales sobre industria', impact: 'Crítico', timeLimit: '24h' },
    ]
}
