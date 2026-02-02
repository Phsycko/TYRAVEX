export const territorialData = {
    stats: {
        criticalZones: 12,
        dependencies: 47,
        bottlenecks: 5,
        resilienceScore: 62
    },
    zones: [
        { id: 1, name: 'Zona Industrial A', risk: 'Alto', opportunity: 'Bajo', density: 'Alta', status: 'Crítico' },
        { id: 2, name: 'Distrito Financiero', risk: 'Medio', opportunity: 'Alto', density: 'Muy Alta', status: 'Estable' },
        { id: 3, name: 'Periferia Norte', risk: 'Alto', opportunity: 'Medio', density: 'Media', status: 'Vulnerable' },
        { id: 4, name: 'Zona Residencial Sur', risk: 'Bajo', opportunity: 'Bajo', density: 'Baja', status: 'Seguro' },
        { id: 5, name: 'Corredor Comercial', risk: 'Medio', opportunity: 'Alto', density: 'Alta', status: 'Estable' },
    ],
    dependencies: [
        { id: 1, source: 'Planta Energía Principal', target: 'Hospital General', criticality: 'Crítica' },
        { id: 2, source: 'Acueducto Norte', target: 'Zona Industrial A', criticality: 'Alta' },
        { id: 3, source: 'Vía Acceso Oeste', target: 'Centro Logístico', criticality: 'Media' },
        { id: 4, source: 'Servidor Central', target: 'Sistema Semáforos', criticality: 'Crítica' },
    ],
    projections: [
        { year: 2025, density: 100, resources: 100, risk: 20 },
        { year: 2030, density: 115, resources: 92, risk: 35 },
        { year: 2035, density: 134, resources: 88, risk: 55 },
        { year: 2045, density: 160, resources: 75, risk: 78 },
    ],
    bottlenecks: [
        { id: 1, name: 'Puente Acceso Norte', impact: 'Tráfico/Logística', severity: 'Alta' },
        { id: 2, name: 'Subestación Eléctrica B', impact: 'Energía', severity: 'Critica' },
        { id: 3, name: 'Drenaje Profundo Zona 4', impact: 'Salud/Inundación', severity: 'Media' },
    ]
}
