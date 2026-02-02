export const crisisData = {
    globalAlertLevel: 'Precaución', // Precaución, Crítico, Estable
    stressSignals: [
        { id: 1, type: 'Social', location: 'Zona Norte', severity: 'Alto', message: 'Sobrecarga en comedores comunitarios', trend: 'up' },
        { id: 2, type: 'Recursos', location: 'Municipio Y', severity: 'Medio', message: 'Escasez de agua potable proyectada', trend: 'stable' },
        { id: 3, type: 'Infraestructura', location: 'Zona Industrial', severity: 'Alto', message: 'Falla en red eléctrica por tormenta', trend: 'down' },
    ],
    catastrophes: [
        { id: 1, name: 'Temporal Costero', type: 'Natural', probability: 78, impact: 'Alto', eta: '3 días' },
        { id: 2, name: 'Crisis Hídrica', type: 'Social', probability: 45, impact: 'Medio', eta: '15 días' },
    ],
    saturation: {
        hospitals: 67,
        water: 82,
        transport: 54,
        energy: 41
    },
    leaks: [
        { id: 1, type: 'Datos Sensibles', severity: 'Crítico', source: 'Servidor Externo', status: 'Contenido', time: 'Hace 2h' },
        { id: 2, type: 'Rumor Viral', severity: 'Moderado', source: 'Twitter', status: 'Propagando', time: 'Hace 45m' },
        { id: 3, type: 'Documento Interno', severity: 'Bajo', source: 'Email', status: 'Investigando', time: 'Hace 5h' },
    ],
    timeline: [
        { time: '08:00', event: 'Inicio monitoreo diario', type: 'info' },
        { time: '10:23', event: 'Alerta temprana: Zona Norte', type: 'warning' },
        { time: '12:45', event: 'Reporte saturación hospitalaria', type: 'danger' },
        { time: '14:00', event: 'Activación protocolo preventivo', type: 'success' },
    ]
}
