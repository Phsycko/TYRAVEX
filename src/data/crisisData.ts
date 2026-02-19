import type {
    CrisisScenario,
    AlertSignal,
    Protocol,
    Resource,
    Message,
    CapacitySystem,
    Sensor
} from '../types/crisis'

// ============================================================================
// CRISIS SCENARIOS
// ============================================================================

export const crisisScenarios: CrisisScenario[] = [
    {
        id: 'scenario-001',
        name: 'Terremoto 7.2 - Zona Metropolitana',
        type: 'natural',
        description: 'Sismo de magnitud 7.2 en zona metropolitana durante hora pico',
        parameters: {
            magnitude: 72,
            populationAffected: 2500000,
            timing: '14:30 (hora pico)',
            duration: 45
        },
        initialConditions: [
            'Hospitales al 75% capacidad',
            'Temporada de lluvias (riesgo deslaves)',
            'Evento masivo en estadio (50K personas)'
        ],
        events: [],
        decisions: []
    },
    {
        id: 'scenario-002',
        name: 'Pandemia - Brote Epidémico',
        type: 'health',
        description: 'Brote de enfermedad respiratoria con alta transmisibilidad',
        parameters: {
            magnitude: 85,
            populationAffected: 1200000,
            timing: 'Inicio de temporada invernal',
            duration: 10080 // 7 días
        },
        initialConditions: [
            'Sistema de salud al 80% capacidad',
            'Temporada de gripe estacional',
            'Alta movilidad urbana'
        ],
        events: [],
        decisions: []
    },
    {
        id: 'scenario-003',
        name: 'Apagón Masivo - Red Eléctrica',
        type: 'infrastructure',
        description: 'Fallo en cascada de la red eléctrica nacional',
        parameters: {
            magnitude: 78,
            populationAffected: 3500000,
            timing: '20:00 (noche)',
            duration: 480 // 8 horas
        },
        initialConditions: [
            'Ola de calor (demanda máxima)',
            'Hospitales con plantas de emergencia',
            'Tráfico vehicular intenso'
        ],
        events: [],
        decisions: []
    }
]

// ============================================================================
// ALERT SIGNALS
// ============================================================================

export const alertSignals: AlertSignal[] = [
    {
        id: 'signal-001',
        title: 'Sobrecarga en comedores comunitarios - Zona Norte',
        category: 'Recursos alimentarios',
        severity: 'critical',
        score: 89,
        location: {
            lat: 25.6866,
            lng: -100.3161,
            name: 'Zona Norte'
        },
        indicators: [
            {
                name: 'Demanda',
                value: 340,
                unit: '% vs promedio',
                change: 340,
                threshold: 120,
                status: 'critical'
            },
            {
                name: 'Capacidad restante',
                value: 15,
                unit: '%',
                change: -85,
                threshold: 30,
                status: 'critical'
            },
            {
                name: 'Tiempo hasta saturación',
                value: 4,
                unit: 'días',
                change: -50,
                threshold: 7,
                status: 'critical'
            }
        ],
        causes: [
            'Cierre de 3 fábricas principales (2,400 empleos perdidos)',
            'Aumento de precios de canasta básica (+18%)',
            'Inmigración interna (+450 familias/mes)'
        ],
        projection: {
            timeToImpact: 4,
            impactLevel: 'critical',
            affectedPopulation: 15000,
            probability: 92,
            description: 'Colapso del sistema de comedores comunitarios con 15K personas sin acceso a alimentos'
        },
        suggestedActions: [
            'Activar protocolo de emergencia alimentaria',
            'Abrir 2 comedores adicionales (requiere: $450K, 10 días)',
            'Solicitar apoyo federal (DIF, SEDENA)',
            'Campaña de donaciones empresariales'
        ],
        trend: 'accelerating',
        detectedAt: '2024-02-01T08:00:00Z'
    },
    {
        id: 'signal-002',
        title: 'Escasez de agua potable proyectada - Municipio Y',
        category: 'Recursos hídricos',
        severity: 'warning',
        score: 72,
        location: {
            lat: 25.6714,
            lng: -100.3089,
            name: 'Municipio Y'
        },
        indicators: [
            {
                name: 'Nivel de presas',
                value: 34,
                unit: '% capacidad',
                change: -15,
                threshold: 40,
                status: 'warning'
            },
            {
                name: 'Consumo',
                value: 108,
                unit: '% vs año anterior',
                change: 8,
                threshold: 105,
                status: 'warning'
            },
            {
                name: 'Precipitación',
                value: 58,
                unit: '% vs promedio',
                change: -42,
                threshold: 80,
                status: 'critical'
            }
        ],
        causes: [
            'Sequía prolongada (8 meses)',
            'Crecimiento poblacional (+4% anual)',
            'Fugas en red de distribución (30% pérdida)'
        ],
        projection: {
            timeToImpact: 45,
            impactLevel: 'high',
            affectedPopulation: 450000,
            probability: 78,
            description: 'Nivel crítico de agua en 45 días, requiriendo tandeo severo'
        },
        suggestedActions: [
            'Implementar campaña de ahorro de agua',
            'Reparación urgente de fugas principales',
            'Activar pozos de emergencia',
            'Restricciones de consumo industrial'
        ],
        trend: 'stable',
        detectedAt: '2024-01-28T10:00:00Z'
    },
    {
        id: 'signal-003',
        title: 'Saturación hospitalaria proyectada - Temporada gripe',
        category: 'Salud pública',
        severity: 'warning',
        score: 68,
        location: {
            lat: 25.6751,
            lng: -100.3185,
            name: 'Zona Metropolitana'
        },
        indicators: [
            {
                name: 'Ocupación camas',
                value: 78,
                unit: '%',
                change: 12,
                threshold: 85,
                status: 'warning'
            },
            {
                name: 'Casos respiratorios',
                value: 145,
                unit: '% vs semana anterior',
                change: 45,
                threshold: 120,
                status: 'warning'
            },
            {
                name: 'UCI disponible',
                value: 28,
                unit: '%',
                change: -22,
                threshold: 30,
                status: 'warning'
            }
        ],
        causes: [
            'Inicio de temporada invernal',
            'Baja cobertura de vacunación (62%)',
            'Alta movilidad urbana'
        ],
        projection: {
            timeToImpact: 14,
            impactLevel: 'high',
            affectedPopulation: 120000,
            probability: 71,
            description: 'Saturación de hospitales en 2 semanas, requiriendo activación de hospital de campaña'
        },
        suggestedActions: [
            'Campaña intensiva de vacunación',
            'Preparar hospital de campaña',
            'Ampliar horarios de consulta externa',
            'Activar telemedicina'
        ],
        trend: 'accelerating',
        detectedAt: '2024-02-05T14:00:00Z'
    }
]

// ============================================================================
// SENSORS
// ============================================================================

export const sensors: Sensor[] = [
    {
        id: 'sensor-001',
        name: 'Demanda en servicios de salud',
        category: 'Salud',
        dataSource: 'Sistema hospitalario municipal',
        metric: 'Ocupación de camas',
        thresholds: {
            critical: 85,
            warning: 70
        },
        conditions: [
            'Detectar tendencias aceleradas (>10% crecimiento semanal)',
            'Correlacionar con temporada (gripe, dengue)',
            'Alertar si capacidad <15% en fin de semana'
        ],
        frequency: 'realtime',
        active: true
    },
    {
        id: 'sensor-002',
        name: 'Nivel de presas',
        category: 'Recursos hídricos',
        dataSource: 'CONAGUA',
        metric: 'Porcentaje de capacidad',
        thresholds: {
            critical: 30,
            warning: 40
        },
        conditions: [
            'Monitorear tendencia de precipitación',
            'Alertar si descenso >5% semanal'
        ],
        frequency: 'daily',
        active: true
    },
    {
        id: 'sensor-003',
        name: 'Demanda alimentaria',
        category: 'Asistencia social',
        dataSource: 'DIF Municipal',
        metric: 'Personas atendidas en comedores',
        thresholds: {
            critical: 90,
            warning: 75
        },
        conditions: [
            'Comparar vs capacidad instalada',
            'Detectar picos anormales (>20% vs promedio)'
        ],
        frequency: 'daily',
        active: true
    }
]

// ============================================================================
// PROTOCOLS
// ============================================================================

export const protocols: Protocol[] = [
    {
        id: 'protocol-001',
        code: 'PROT-ALI-001',
        name: 'Emergencia Alimentaria',
        type: 'Crisis de recursos',
        severity: 'critical',
        description: 'Protocolo para respuesta rápida ante crisis alimentaria. Incluye coordinación inter-agencias, movilización de recursos y comunicación con población afectada.',
        steps: [
            {
                id: 'step-001',
                number: 1,
                title: 'Activar sala de crisis',
                description: 'Convocar equipo de respuesta y establecer centro de comando',
                estimatedDuration: 15,
                responsible: 'Coordinador de Crisis',
                status: 'pending',
                dependencies: []
            },
            {
                id: 'step-002',
                number: 2,
                title: 'Evaluar alcance y necesidades',
                description: 'Determinar población afectada y requerimientos de recursos',
                estimatedDuration: 30,
                responsible: 'Analista de Datos',
                status: 'pending',
                dependencies: ['step-001']
            },
            {
                id: 'step-003',
                number: 3,
                title: 'Contactar agencias federales',
                description: 'Solicitar apoyo a DIF Nacional y SEDENA',
                estimatedDuration: 60,
                responsible: 'Enlace Federal',
                status: 'pending',
                dependencies: ['step-002']
            },
            {
                id: 'step-004',
                number: 4,
                title: 'Movilizar inventarios de emergencia',
                description: 'Activar almacenes y preparar distribución',
                estimatedDuration: 120,
                responsible: 'Jefe de Logística',
                status: 'pending',
                dependencies: ['step-002']
            },
            {
                id: 'step-005',
                number: 5,
                title: 'Establecer centros de distribución',
                description: 'Abrir 5 centros temporales de distribución',
                estimatedDuration: 240,
                responsible: 'Coordinador de Operaciones',
                status: 'pending',
                dependencies: ['step-004']
            }
        ],
        resources: [
            { type: 'Personal', quantity: 45, duration: 8 },
            { type: 'Vehículos', quantity: 8, duration: 8 },
            { type: 'Presupuesto', quantity: 450000, duration: 1 }
        ],
        estimatedDuration: 8,
        lastActivated: null,
        activationCount: 0
    },
    {
        id: 'protocol-002',
        code: 'PROT-SIS-001',
        name: 'Respuesta a Sismo',
        type: 'Desastre natural',
        severity: 'critical',
        description: 'Protocolo de respuesta inmediata ante evento sísmico mayor',
        steps: [
            {
                id: 'step-101',
                number: 1,
                title: 'Activar alerta sísmica',
                description: 'Difundir alerta a través de todos los canales',
                estimatedDuration: 2,
                responsible: 'Centro de Comando',
                status: 'pending',
                dependencies: []
            },
            {
                id: 'step-102',
                number: 2,
                title: 'Evaluar daños preliminares',
                description: 'Recibir reportes de brigadas y evaluar zonas críticas',
                estimatedDuration: 30,
                responsible: 'Brigadas de Evaluación',
                status: 'pending',
                dependencies: ['step-101']
            },
            {
                id: 'step-103',
                number: 3,
                title: 'Movilizar equipos de rescate',
                description: 'Desplegar bomberos, paramédicos y equipos especializados',
                estimatedDuration: 15,
                responsible: 'Comandante de Operaciones',
                status: 'pending',
                dependencies: ['step-102']
            }
        ],
        resources: [
            { type: 'Equipos de rescate', quantity: 12, duration: 24 },
            { type: 'Ambulancias', quantity: 25, duration: 12 },
            { type: 'Helicópteros', quantity: 3, duration: 8 }
        ],
        estimatedDuration: 24,
        lastActivated: '2023-09-19T11:14:00Z',
        activationCount: 3
    }
]

// ============================================================================
// RESOURCES
// ============================================================================

export const resources: Resource[] = [
    // Ambulancias
    {
        id: 'amb-001',
        type: 'ambulance',
        name: 'Ambulancia #AM-023',
        status: 'in-service',
        location: {
            lat: 25.6866,
            lng: -100.3161,
            address: 'Av. Juárez #450, Centro'
        },
        assignment: 'Hospital General - Base Norte',
        crew: {
            count: 3,
            roles: ['2 paramédicos', '1 conductor']
        },
        equipment: ['Soporte vital básico', 'Desfibrilador', 'Oxígeno'],
        fuel: 78,
        lastMaintenance: '2024-01-15',
        stats: {
            servicesCompleted: 6,
            kmTraveled: 42,
            hoursInService: 4.5
        }
    },
    {
        id: 'amb-002',
        type: 'ambulance',
        name: 'Ambulancia #AM-015',
        status: 'available',
        location: {
            lat: 25.6751,
            lng: -100.3089,
            address: 'Hospital Central'
        },
        assignment: 'Hospital Central - Urgencias',
        crew: {
            count: 3,
            roles: ['2 paramédicos', '1 conductor']
        },
        equipment: ['Soporte vital avanzado', 'Desfibrilador', 'Oxígeno', 'Ventilador'],
        fuel: 92,
        lastMaintenance: '2024-02-01',
        stats: {
            servicesCompleted: 3,
            kmTraveled: 18,
            hoursInService: 2.1
        }
    },
    // Bomberos
    {
        id: 'fire-001',
        type: 'firetruck',
        name: 'Unidad de Bomberos #B-12',
        status: 'available',
        location: {
            lat: 25.6714,
            lng: -100.3185,
            address: 'Estación Central de Bomberos'
        },
        assignment: 'Estación Central',
        crew: {
            count: 6,
            roles: ['1 capitán', '5 bomberos']
        },
        equipment: ['Mangueras', 'Escaleras', 'Equipo de rescate', 'Herramientas hidráulicas'],
        fuel: 85,
        lastMaintenance: '2024-01-20',
        stats: {
            servicesCompleted: 4,
            kmTraveled: 28,
            hoursInService: 3.2
        }
    },
    // Policía
    {
        id: 'police-001',
        type: 'police',
        name: 'Patrulla #P-234',
        status: 'in-service',
        location: {
            lat: 25.6800,
            lng: -100.3200,
            address: 'Av. Constitución #890'
        },
        assignment: 'Sector Norte - Patrullaje',
        crew: {
            count: 2,
            roles: ['2 oficiales']
        },
        equipment: ['Radio', 'Equipo táctico', 'Primeros auxilios'],
        fuel: 65,
        lastMaintenance: '2024-01-25',
        stats: {
            servicesCompleted: 8,
            kmTraveled: 67,
            hoursInService: 6.5
        }
    },
    // Helicópteros
    {
        id: 'heli-001',
        type: 'helicopter',
        name: 'Helicóptero #H-01',
        status: 'available',
        location: {
            lat: 25.6850,
            lng: -100.3100,
            address: 'Helipuerto Municipal'
        },
        assignment: 'Base Aérea Municipal',
        crew: {
            count: 4,
            roles: ['1 piloto', '1 copiloto', '2 paramédicos']
        },
        equipment: ['Camilla aérea', 'Equipo médico avanzado', 'Winch de rescate'],
        fuel: 100,
        lastMaintenance: '2024-02-05',
        stats: {
            servicesCompleted: 1,
            kmTraveled: 45,
            hoursInService: 1.2
        }
    },
    // Hospitales
    {
        id: 'hosp-001',
        type: 'hospital',
        name: 'Hospital General',
        status: 'in-service',
        location: {
            lat: 25.6866,
            lng: -100.3161,
            address: 'Av. Madero #1200'
        },
        assignment: 'Atención general',
        capacity: {
            current: 850,
            max: 1000,
            unit: 'camas'
        }
    },
    {
        id: 'hosp-002',
        type: 'hospital',
        name: 'Hospital Central',
        status: 'in-service',
        location: {
            lat: 25.6751,
            lng: -100.3089,
            address: 'Calle Hidalgo #450'
        },
        assignment: 'Urgencias y trauma',
        capacity: {
            current: 680,
            max: 800,
            unit: 'camas'
        }
    },
    // Almacenes
    {
        id: 'ware-001',
        type: 'warehouse',
        name: 'Almacén Central DIF',
        status: 'in-service',
        location: {
            lat: 25.6800,
            lng: -100.3150,
            address: 'Zona Industrial Norte'
        },
        assignment: 'Distribución de alimentos',
        capacity: {
            current: 45,
            max: 120,
            unit: 'toneladas'
        }
    }
]

// ============================================================================
// MESSAGES
// ============================================================================

export const messages: Message[] = [
    {
        id: 'msg-001',
        type: 'alert',
        title: 'ALERTA: Sobrecarga en servicios de alimentos',
        content: 'Gobierno Municipal informa: Hemos detectado alta demanda en comedores comunitarios de Zona Norte...',
        audience: {
            general: true,
            specificZone: 'Zona Norte',
            responders: false,
            media: false
        },
        channels: {
            sms: true,
            speakers: true,
            social: true,
            app: true,
            radio: true,
            sirens: false
        },
        status: 'sent',
        sentAt: '2024-02-08T14:30:00Z',
        reach: 2300000,
        engagement: {
            delivered: 2300000,
            read: 2001000,
            actions: 45000
        }
    },
    {
        id: 'msg-002',
        type: 'update',
        title: 'Actualización: Nuevos centros de distribución',
        content: 'Se han abierto 2 centros adicionales de distribución de alimentos...',
        audience: {
            general: true,
            specificZone: 'Zona Norte',
            responders: false,
            media: true
        },
        channels: {
            sms: false,
            speakers: false,
            social: true,
            app: true,
            radio: false,
            sirens: false
        },
        status: 'sent',
        sentAt: '2024-02-08T11:00:00Z',
        reach: 890000,
        engagement: {
            delivered: 890000,
            read: 623000,
            actions: 12000
        }
    }
]

// ============================================================================
// CAPACITY SYSTEMS
// ============================================================================

export const capacitySystems: CapacitySystem[] = [
    {
        id: 'cap-001',
        name: 'Sistema de Salud',
        category: 'Salud',
        metrics: [
            {
                name: 'Camas hospitalarias',
                current: 850,
                max: 1000,
                unit: 'camas',
                percentage: 85,
                status: 'warning',
                trend: 'increasing'
            },
            {
                name: 'UCI',
                current: 48,
                max: 50,
                unit: 'camas',
                percentage: 96,
                status: 'critical',
                trend: 'increasing'
            },
            {
                name: 'Urgencias',
                current: 124,
                max: 180,
                unit: 'camas',
                percentage: 69,
                status: 'normal',
                trend: 'stable'
            }
        ],
        projection: {
            hours: [0, 6, 12, 18, 24],
            values: [85, 88, 91, 94, 98],
            thresholds: {
                warning: 85,
                critical: 95
            },
            alerts: [
                {
                    time: 12,
                    level: 91,
                    status: 'warning',
                    description: '91% ocupación - Alto'
                },
                {
                    time: 18,
                    level: 94,
                    status: 'critical',
                    description: '94% ocupación - Crítico'
                },
                {
                    time: 24,
                    level: 98,
                    status: 'collapse',
                    description: '98% ocupación - Colapso inminente'
                }
            ]
        },
        alerts: [
            {
                severity: 'critical',
                message: 'UCI con solo 2 camas disponibles'
            },
            {
                severity: 'warning',
                message: 'Saturación proyectada en 18 horas',
                timeToImpact: 18
            }
        ],
        recommendations: [
            'Activar hospital de campaña (capacidad +80 camas)',
            'Trasladar pacientes estables a hospitales de zona (libera 15%)',
            'Solicitar apoyo a hospitales privados (convenio existente)'
        ]
    },
    {
        id: 'cap-002',
        name: 'Red de Agua Potable',
        category: 'Infraestructura',
        metrics: [
            {
                name: 'Nivel de presas',
                current: 34,
                max: 100,
                unit: '% capacidad',
                percentage: 34,
                status: 'warning',
                trend: 'decreasing'
            },
            {
                name: 'Presión de red',
                current: 40,
                max: 100,
                unit: '% nominal',
                percentage: 40,
                status: 'warning',
                trend: 'decreasing'
            }
        ],
        projection: {
            hours: [0, 168, 336, 504, 672, 840, 1008],
            values: [34, 32, 29, 27, 24, 22, 19],
            thresholds: {
                warning: 40,
                critical: 25
            },
            alerts: [
                {
                    time: 504,
                    level: 27,
                    status: 'warning',
                    description: '27% capacidad - Requiere tandeo'
                },
                {
                    time: 840,
                    level: 22,
                    status: 'critical',
                    description: '22% capacidad - Tandeo severo'
                }
            ]
        },
        alerts: [
            {
                severity: 'warning',
                message: 'Nivel de presas por debajo del 40%',
                timeToImpact: 504
            }
        ],
        recommendations: [
            'Implementar campaña de ahorro de agua',
            'Reparación urgente de fugas principales',
            'Activar pozos de emergencia'
        ]
    }
]

export const crisisData = {
    scenarios: crisisScenarios,
    signals: alertSignals,
    sensors,
    protocols,
    resources,
    messages,
    capacitySystems
}
