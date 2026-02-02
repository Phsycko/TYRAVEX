export const ejecutivaData = {
    globalStatus: 'Atención Requerida', // Atencion Requerida, Crítico, Óptimo
    score: 84,
    modules: [
        { id: 1, name: 'Analytics', status: 'Óptimo', trend: 'up' },
        { id: 2, name: 'Monitor Social', status: 'Atención', trend: 'stable' },
        { id: 3, name: 'Predictivo', status: 'Óptimo', trend: 'up' },
        { id: 4, name: 'Control Info', status: 'Atención', trend: 'down' },
        { id: 5, name: 'Crisis', status: 'Crítico', trend: 'down' },
        { id: 6, name: 'Seguridad', status: 'Óptimo', trend: 'stable' },
    ],
    priorities: [
        { id: 1, text: 'Contención de Crisis Informacional Zona Norte', type: 'Crítico' },
        { id: 2, text: 'Aprobación Presupuesto Emergencia Hídrica', type: 'Alto' },
        { id: 3, text: 'Revisión Reporte Mensual de Riesgos', type: 'Medio' },
    ],
    alerts: [
        { id: 1, time: '10:45', message: 'Saturación Hospitalaria alcanzó 85%', type: 'critical' },
        { id: 2, time: '09:30', message: 'Detectada campaña negativa coordinada', type: 'warning' },
        { id: 3, time: '08:15', message: 'Inicio de operaciones normal', type: 'info' },
    ]
}
