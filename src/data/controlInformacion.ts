export const controlInfoData = {
    stats: {
        totalItems: 2847,
        photos: 1234,
        documents: 892,
        mentions: 521,
        videos: 200,
        riskScore: 68,
        criticalItems: 8
    },
    status: {
        controlled: 62,
        monitored: 28,
        critical: 10
    },
    sources: {
        websites: 47,
        social: 23,
        publicRegistry: 12
    },
    inventory: [
        { id: 1, type: 'Foto', source: 'Facebook', date: '2023-11-15', status: 'Monitoreado', risk: 'Bajo', content: 'Foto de perfil antigua' },
        { id: 2, type: 'Documento', source: 'Registro Público', date: '2023-10-02', status: 'Controlado', risk: 'Medio', content: 'Escritura Propiedad X' },
        { id: 3, type: 'Mención', source: 'Twitter', date: '2024-01-20', status: 'Crítico', risk: 'Alto', content: 'Hilo sobre contrato Y' },
        { id: 4, type: 'Video', source: 'YouTube', date: '2022-05-10', status: 'Controlado', risk: 'Bajo', content: 'Conferencia Tech 2022' },
        { id: 5, type: 'Foto', source: 'Instagram', date: '2024-02-01', status: 'Monitoreado', risk: 'Medio', content: 'Foto evento social' },
        { id: 6, type: 'Documento', source: 'Leak Database', date: '2024-01-15', status: 'Crítico', risk: 'Alto', content: 'Password hash antiguo' },
        { id: 7, type: 'Mención', source: 'News Site Local', date: '2023-12-12', status: 'Controlado', risk: 'Bajo', content: 'Nota de prensa inaguración' },
        { id: 8, type: 'Registro', source: 'SAT', date: '2023-01-01', status: 'Controlado', risk: 'Alto', content: 'Declaración anual' },
    ],
    timeline: [
        { date: '2023-08', count: 12 },
        { date: '2023-09', count: 15 },
        { date: '2023-10', count: 8 },
        { date: '2023-11', count: 25 },
        { date: '2023-12', count: 18 },
        { date: '2024-01', count: 42 },
        { date: '2024-02', count: 10 },
    ],
    riskMatrix: [
        { id: 1, name: 'Foto Familiar', sensitivity: 80, exposure: 20 },
        { id: 2, name: 'Dirección Casa', sensitivity: 95, exposure: 10 },
        { id: 3, name: 'Email Personal', sensitivity: 60, exposure: 90 },
        { id: 4, name: 'Contrato A', sensitivity: 90, exposure: 5 },
        { id: 5, name: 'Opinion Politica', sensitivity: 40, exposure: 80 },
        { id: 6, name: 'Historial Medico', sensitivity: 100, exposure: 0 },
        { id: 7, name: 'Teléfono', sensitivity: 70, exposure: 60 },
    ]
}
