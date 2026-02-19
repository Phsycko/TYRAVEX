// @ts-nocheck
// ═══════════════════════════════════════════════════════════════════════════
//                    STRATEGIC COMMAND META-CENTER - MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════

import type {
    Scenario,
    SimulationEvent,
    ScenarioTemplate,
    KPISnapshot,
    GlobalKPIs,
    TimelineActivity,
    Milestone
} from '../types/strategic'

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const scenarioTemplates: ScenarioTemplate[] = [
    {
        id: 'template-001',
        name: 'Campaña Electoral Estándar',
        description: 'Escenario completo para campaña electoral de 120 días con todos los dominios activos',
        category: 'electoral',
        defaultTimeline: 120,
        defaultBudget: 38000000,
        defaultPersonnel: 450,
        domainConfigs: [
            {
                domain: 'analytics',
                enabled: true,
                budget: 3800000,
                personnel: 35,
                priority: 'high'
            },
            {
                domain: 'territorio',
                enabled: true,
                budget: 8500000,
                personnel: 180,
                priority: 'critical'
            },
            {
                domain: 'predict',
                enabled: true,
                budget: 1900000,
                personnel: 12,
                priority: 'medium'
            },
            {
                domain: 'monitor',
                enabled: true,
                budget: 6200000,
                personnel: 45,
                priority: 'high'
            },
            {
                domain: 'research',
                enabled: true,
                budget: 2100000,
                personnel: 28,
                priority: 'medium'
            },
            {
                domain: 'crisis',
                enabled: true,
                budget: 2500000,
                personnel: 45,
                priority: 'high'
            }
        ],
        objectives: [],
        tags: ['electoral', 'completo', 'estándar']
    },
    {
        id: 'template-002',
        name: 'Gestión de Crisis Política',
        description: 'Respuesta rápida a crisis política con enfoque en control de daños',
        category: 'crisis',
        defaultTimeline: 30,
        defaultBudget: 15000000,
        defaultPersonnel: 200,
        domainConfigs: [
            {
                domain: 'crisis',
                enabled: true,
                budget: 6000000,
                personnel: 80,
                priority: 'critical'
            },
            {
                domain: 'monitor',
                enabled: true,
                budget: 5000000,
                personnel: 60,
                priority: 'critical'
            },
            {
                domain: 'analytics',
                enabled: true,
                budget: 2500000,
                personnel: 30,
                priority: 'high'
            },
            {
                domain: 'predict',
                enabled: true,
                budget: 1500000,
                personnel: 30,
                priority: 'high'
            }
        ],
        objectives: [],
        tags: ['crisis', 'urgente', 'control-daños']
    },
    {
        id: 'template-003',
        name: 'Expansión Territorial Agresiva',
        description: 'Conquista de nuevos distritos con operaciones tácticas intensivas',
        category: 'expansion',
        defaultTimeline: 60,
        defaultBudget: 25000000,
        defaultPersonnel: 350,
        domainConfigs: [
            {
                domain: 'territorio',
                enabled: true,
                budget: 15000000,
                personnel: 220,
                priority: 'critical'
            },
            {
                domain: 'analytics',
                enabled: true,
                budget: 5000000,
                personnel: 50,
                priority: 'high'
            },
            {
                domain: 'predict',
                enabled: true,
                budget: 3000000,
                personnel: 40,
                priority: 'high'
            },
            {
                domain: 'monitor',
                enabled: true,
                budget: 2000000,
                personnel: 40,
                priority: 'medium'
            }
        ],
        objectives: [],
        tags: ['territorial', 'expansión', 'agresivo']
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETE SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────

export const scenarios: Scenario[] = [
    {
        id: 'scenario-001',
        name: 'Operación Reelección 2024',
        objective: 'Ganar elección con 52%+ de votos',
        timeline: 120,
        domains: [
            {
                domain: 'analytics',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-analytics-001',
                        description: 'Alcanzar 52% de intención de voto',
                        metric: 'voteIntention',
                        currentValue: 48.3,
                        targetValue: 52.0,
                        deadline: 90,
                        priority: 1,
                        status: 'in-progress'
                    },
                    {
                        id: 'obj-analytics-002',
                        description: 'Mantener sentimiento positivo +70%',
                        metric: 'sentiment',
                        currentValue: 62,
                        targetValue: 70,
                        deadline: 60,
                        priority: 2,
                        status: 'in-progress'
                    },
                    {
                        id: 'obj-analytics-003',
                        description: 'Lograr 55% share of voice',
                        metric: 'shareOfVoice',
                        currentValue: 48,
                        targetValue: 55,
                        deadline: 90,
                        priority: 2,
                        status: 'in-progress'
                    }
                ],
                currentState: {
                    voteIntention: 48.3,
                    sentiment: 62,
                    shareOfVoice: 48
                },
                budget: 3800000,
                personnel: 35,
                priority: 'high'
            },
            {
                domain: 'territorio',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-territorio-001',
                        description: 'Asegurar 20 distritos de 35',
                        metric: 'districtsControlled',
                        currentValue: 15,
                        targetValue: 20,
                        deadline: 90,
                        priority: 1,
                        status: 'in-progress'
                    },
                    {
                        id: 'obj-territorio-002',
                        description: 'Completar 45 eventos masivos',
                        metric: 'eventsCompleted',
                        currentValue: 0,
                        targetValue: 45,
                        deadline: 120,
                        priority: 2,
                        status: 'pending'
                    }
                ],
                currentState: {
                    districtsControlled: 15,
                    totalDistricts: 35,
                    eventsCompleted: 0
                },
                budget: 8500000,
                personnel: 180,
                priority: 'critical'
            },
            {
                domain: 'predict',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-predict-001',
                        description: 'Alcanzar 80% probabilidad de victoria',
                        metric: 'victoryProbability',
                        currentValue: 76.4,
                        targetValue: 80.0,
                        deadline: 90,
                        priority: 1,
                        status: 'in-progress'
                    }
                ],
                currentState: {
                    victoryProbability: 76.4,
                    voteProjection: 49.8,
                    modelConfidence: 94.2
                },
                budget: 1900000,
                personnel: 12,
                priority: 'medium'
            },
            {
                domain: 'monitor',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-monitor-001',
                        description: 'Mantener menos de 5 alertas activas',
                        metric: 'activeAlerts',
                        currentValue: 12,
                        targetValue: 5,
                        deadline: 30,
                        priority: 1,
                        status: 'in-progress'
                    },
                    {
                        id: 'obj-monitor-002',
                        description: 'Alcanzar 3M menciones mensuales',
                        metric: 'mentions',
                        currentValue: 2300000,
                        targetValue: 3000000,
                        deadline: 60,
                        priority: 2,
                        status: 'in-progress'
                    }
                ],
                currentState: {
                    mentions: 2300000,
                    activeAlerts: 12,
                    trendingTopics: ['#PropuestaEconomica', '#DebatePresidencial']
                },
                budget: 6200000,
                personnel: 45,
                priority: 'high'
            },
            {
                domain: 'research',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-research-001',
                        description: 'Identificar 15+ inconsistencias críticas',
                        metric: 'inconsistenciesFound',
                        currentValue: 8,
                        targetValue: 15,
                        deadline: 60,
                        priority: 2,
                        status: 'in-progress'
                    }
                ],
                currentState: {
                    inconsistenciesFound: 8,
                    vulnerabilitiesDetected: 12
                },
                budget: 2100000,
                personnel: 28,
                priority: 'medium'
            },
            {
                domain: 'crisis',
                enabled: true,
                objectives: [
                    {
                        id: 'obj-crisis-001',
                        description: 'Mantener nivel de alerta bajo 50',
                        metric: 'alertLevel',
                        currentValue: 68,
                        targetValue: 50,
                        deadline: 30,
                        priority: 1,
                        status: 'in-progress'
                    }
                ],
                currentState: {
                    alertLevel: 68,
                    activeProtocols: 0
                },
                budget: 2500000,
                personnel: 45,
                priority: 'high'
            }
        ],
        resources: {
            budget: 38000000,
            personnel: 450,
            timeline: 120,
            allocation: [
                {
                    domain: 'analytics',
                    budget: 3800000,
                    budgetPercentage: 10,
                    personnel: 35,
                    personnelPercentage: 7.8,
                    priority: 'high',
                    roi: 2.2,
                    effectiveness: 88
                },
                {
                    domain: 'territorio',
                    budget: 8500000,
                    budgetPercentage: 22,
                    personnel: 180,
                    personnelPercentage: 40,
                    priority: 'critical',
                    roi: 1.8,
                    effectiveness: 92
                },
                {
                    domain: 'predict',
                    budget: 1900000,
                    budgetPercentage: 5,
                    personnel: 12,
                    personnelPercentage: 2.7,
                    priority: 'medium',
                    roi: 0.4,
                    effectiveness: 65
                },
                {
                    domain: 'monitor',
                    budget: 6200000,
                    budgetPercentage: 16,
                    personnel: 45,
                    personnelPercentage: 10,
                    priority: 'high',
                    roi: 1.5,
                    effectiveness: 85
                },
                {
                    domain: 'research',
                    budget: 2100000,
                    budgetPercentage: 6,
                    personnel: 28,
                    personnelPercentage: 6.2,
                    priority: 'medium',
                    roi: 0.3,
                    effectiveness: 58
                },
                {
                    domain: 'crisis',
                    budget: 2500000,
                    budgetPercentage: 7,
                    personnel: 45,
                    personnelPercentage: 10,
                    priority: 'high',
                    roi: 0.7,
                    effectiveness: 78
                }
            ]
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATION EVENTS LIBRARY
// ─────────────────────────────────────────────────────────────────────────────

export const simulationEvents: SimulationEvent[] = [
    // CRITICAL EVENTS
    {
        id: 'event-001',
        day: 34,
        time: '14:30',
        domain: ['monitor', 'crisis'],
        type: 'crisis',
        severity: 'critical',
        title: 'Video comprometedor viralizado',
        description: 'Video comprometedor de tu candidato viralizado en redes. Alcance: 450K views (creciendo 50K/hora). Sentimiento: -78% negativo. Trending topic #1 nacional.',
        impacts: [
            {
                domain: 'analytics',
                metric: 'voteIntention',
                change: -2.8,
                timeframe: 2,
                probability: 85,
                description: 'Caída de intención de voto si no se actúa'
            },
            {
                domain: 'predict',
                metric: 'victoryProbability',
                change: -12,
                timeframe: 2,
                probability: 80,
                description: 'Reducción de probabilidad de victoria'
            },
            {
                domain: 'monitor',
                metric: 'sentiment',
                change: -25,
                timeframe: 1,
                probability: 95,
                description: 'Crisis reputacional nivel 9/10'
            },
            {
                domain: 'territorio',
                metric: 'districtsControlled',
                change: -2,
                timeframe: 7,
                probability: 70,
                description: 'Pérdida de 2 distritos competidos'
            }
        ],
        requiresDecision: true,
        decisionPoint: {
            id: 'decision-001',
            eventId: 'event-001',
            day: 34,
            domains: ['monitor', 'crisis', 'analytics'],
            title: 'Respuesta a video viral',
            description: 'Video comprometedor viralizado. Decisión urgente requerida.',
            urgency: 'critical',
            timeLimit: 45,
            deadline: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
            aiRecommendation: 'ESTRATEGIA B: Reconocimiento y pivote',
            aiConfidence: 78,
            options: [
                {
                    id: 'option-001-a',
                    name: 'Negación inmediata',
                    description: 'Comunicado oficial desestimando video, conferencia de prensa, campaña digital contranarrativa',
                    actions: [
                        {
                            id: 'action-001-a-1',
                            domain: 'monitor',
                            type: 'comunicado',
                            description: 'Comunicado oficial desestimando video',
                            duration: 0.08,
                            cost: 50000
                        },
                        {
                            id: 'action-001-a-2',
                            domain: 'monitor',
                            type: 'conferencia',
                            description: 'Conferencia de prensa',
                            duration: 0.17,
                            cost: 150000
                        },
                        {
                            id: 'action-001-a-3',
                            domain: 'monitor',
                            type: 'campaña-digital',
                            description: 'Campaña digital contranarrativa',
                            duration: 3,
                            cost: 500000
                        }
                    ],
                    impacts: [
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: -1.2,
                            timeframe: 2,
                            probability: 75,
                            description: 'Mejor que no actuar pero aún negativo'
                        },
                        {
                            domain: 'crisis',
                            metric: 'alertLevel',
                            change: -30,
                            timeframe: 1,
                            probability: 70,
                            description: 'Reducción a nivel 6/10'
                        }
                    ],
                    cost: 850000,
                    timeRequired: 15,
                    risks: [
                        {
                            id: 'risk-001-a-1',
                            severity: 'critical',
                            description: 'Si video resulta auténtico, pérdida total de credibilidad',
                            probability: 40,
                            mitigation: 'Verificar autenticidad antes de negar'
                        }
                    ],
                    benefits: ['Respuesta rápida', 'Control de narrativa inicial'],
                    expectedValue: -890000,
                    probability: 60
                },
                {
                    id: 'option-001-b',
                    name: 'Reconocimiento y pivote',
                    description: 'Video del candidato aceptando error, protocolo de redención, tour "Aprendiendo de errores"',
                    actions: [
                        {
                            id: 'action-001-b-1',
                            domain: 'monitor',
                            type: 'video-respuesta',
                            description: 'Video del candidato aceptando error',
                            duration: 0.04,
                            cost: 200000
                        },
                        {
                            id: 'action-001-b-2',
                            domain: 'crisis',
                            type: 'protocolo-redencion',
                            description: 'Activar protocolo de redención',
                            duration: 21,
                            cost: 1200000
                        },
                        {
                            id: 'action-001-b-3',
                            domain: 'territorio',
                            type: 'tour',
                            description: 'Tour "Aprendiendo de errores" (10 días, 8 ciudades)',
                            duration: 10,
                            cost: 400000
                        }
                    ],
                    impacts: [
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: -0.8,
                            timeframe: 7,
                            probability: 70,
                            description: 'Caída corto plazo'
                        },
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: 1.5,
                            timeframe: 21,
                            probability: 75,
                            description: 'Recuperación y crecimiento'
                        },
                        {
                            domain: 'crisis',
                            metric: 'alertLevel',
                            change: -50,
                            timeframe: 3,
                            probability: 85,
                            description: 'Control total, narrativa de honestidad'
                        },
                        {
                            domain: 'monitor',
                            metric: 'sentiment',
                            change: 15,
                            timeframe: 21,
                            probability: 80,
                            description: 'Fortalece imagen de autenticidad'
                        }
                    ],
                    cost: 1800000,
                    timeRequired: 21,
                    risks: [
                        {
                            id: 'risk-001-b-1',
                            severity: 'medium',
                            description: 'Requiere 21 días de campaña intensiva',
                            probability: 60,
                            mitigation: 'Equipo dedicado y recursos asegurados'
                        }
                    ],
                    benefits: [
                        'Fortalece imagen de autenticidad',
                        'Control total de narrativa',
                        'Beneficio largo plazo'
                    ],
                    expectedValue: 2100000,
                    probability: 75
                },
                {
                    id: 'option-001-c',
                    name: 'Contraataque agresivo',
                    description: 'Activar inconsistencias oponente, publicar dossier, guerra de narrativas',
                    actions: [
                        {
                            id: 'action-001-c-1',
                            domain: 'research',
                            type: 'activar-dossier',
                            description: 'Activar inconsistencias oponente',
                            duration: 0.04,
                            cost: 100000
                        },
                        {
                            id: 'action-001-c-2',
                            domain: 'monitor',
                            type: 'publicar-dossier',
                            description: 'Publicar dossier de oponente principal',
                            duration: 1,
                            cost: 900000
                        },
                        {
                            id: 'action-001-c-3',
                            domain: 'monitor',
                            type: 'guerra-narrativas',
                            description: 'Guerra de narrativas en redes',
                            duration: 7,
                            cost: 1500000
                        }
                    ],
                    impacts: [
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: -1.5,
                            timeframe: 7,
                            probability: 70,
                            description: 'Caída propia'
                        },
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: 0.5,
                            timeframe: 7,
                            probability: 65,
                            description: 'Ventaja neta vs oponente (-2.0% oponente)'
                        },
                        {
                            domain: 'territorio',
                            metric: 'districtsControlled',
                            change: -1,
                            timeframe: 14,
                            probability: 60,
                            description: 'Desgaste en distritos competidos'
                        }
                    ],
                    cost: 2400000,
                    timeRequired: 7,
                    risks: [
                        {
                            id: 'risk-001-c-1',
                            severity: 'high',
                            description: 'Escalada de guerra sucia, fatiga del electorado',
                            probability: 75,
                            mitigation: 'Monitoreo constante de sentimiento'
                        }
                    ],
                    benefits: ['Daña al oponente', 'Cambia conversación'],
                    expectedValue: -450000,
                    probability: 55
                },
                {
                    id: 'option-001-d',
                    name: 'Ignorar y enfocar en propuestas',
                    description: 'Mantener agenda, lanzar propuesta impactante como distractor',
                    actions: [
                        {
                            id: 'action-001-d-1',
                            domain: 'analytics',
                            type: 'propuesta',
                            description: 'Lanzar propuesta impactante',
                            duration: 2,
                            cost: 600000
                        }
                    ],
                    impacts: [
                        {
                            domain: 'analytics',
                            metric: 'voteIntention',
                            change: -2.2,
                            timeframe: 2,
                            probability: 80,
                            description: 'Absorber golpe completo'
                        },
                        {
                            domain: 'monitor',
                            metric: 'activeAlerts',
                            change: 3,
                            timeframe: 7,
                            probability: 85,
                            description: 'Crisis persiste 5-7 días'
                        }
                    ],
                    cost: 600000,
                    timeRequired: 2,
                    risks: [
                        {
                            id: 'risk-001-d-1',
                            severity: 'high',
                            description: 'Riesgo no controlado, crisis puede escalar',
                            probability: 70
                        }
                    ],
                    benefits: ['Bajo costo', 'Posible recuperación si propuesta resuena'],
                    expectedValue: -1200000,
                    probability: 40
                }
            ]
        },
        resolved: false
    },
    // MORE EVENTS
    {
        id: 'event-002',
        day: 10,
        time: '10:15',
        domain: ['territorio'],
        type: 'milestone',
        severity: 'medium',
        title: 'Distrito 16 asegurado',
        description: 'Operación territorial exitosa. Distrito 16 ahora controlado con 51.2% de apoyo.',
        impacts: [
            {
                domain: 'territorio',
                metric: 'districtsControlled',
                change: 1,
                timeframe: 0,
                probability: 100,
                description: 'Distrito adicional asegurado'
            },
            {
                domain: 'analytics',
                metric: 'voteIntention',
                change: 0.3,
                timeframe: 1,
                probability: 70,
                description: 'Impulso de momentum'
            }
        ],
        requiresDecision: false,
        resolved: true
    },
    {
        id: 'event-003',
        day: 15,
        time: '18:00',
        domain: ['analytics'],
        type: 'info',
        severity: 'low',
        title: 'Nueva encuesta muestra +0.5%',
        description: 'Encuesta nacional muestra incremento de 0.5% en intención de voto. Ahora en 48.8%.',
        impacts: [
            {
                domain: 'analytics',
                metric: 'voteIntention',
                change: 0.5,
                timeframe: 0,
                probability: 100,
                description: 'Actualización de métrica'
            },
            {
                domain: 'predict',
                metric: 'victoryProbability',
                change: 1.2,
                timeframe: 0,
                probability: 100,
                description: 'Ajuste de modelo predictivo'
            }
        ],
        requiresDecision: false,
        resolved: true
    },
    {
        id: 'event-004',
        day: 45,
        time: '20:00',
        domain: ['monitor', 'analytics'],
        type: 'milestone',
        severity: 'critical',
        title: 'Primer Debate Presidencial',
        description: 'Debate presidencial en vivo. Audiencia estimada: 15M espectadores. Performance crítica para narrativa.',
        impacts: [],
        requiresDecision: true,
        resolved: false
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE ACTIVITIES
// ─────────────────────────────────────────────────────────────────────────────

export const timelineActivities: TimelineActivity[] = [
    // Analytics activities
    {
        id: 'activity-analytics-001',
        domain: 'analytics',
        name: 'Encuestas semanales',
        type: 'encuesta',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 1200000, personnel: 15 },
        status: 'in-progress',
        priority: 'high',
        dependencies: []
    },
    {
        id: 'activity-analytics-002',
        domain: 'analytics',
        name: 'Estudios cualitativos mensuales',
        type: 'estudio',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 800000, personnel: 10 },
        status: 'in-progress',
        priority: 'medium',
        dependencies: []
    },
    // Territorio activities
    {
        id: 'activity-territorio-001',
        domain: 'territorio',
        name: 'Eventos masivos',
        type: 'evento',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 4500000, personnel: 120 },
        status: 'in-progress',
        priority: 'critical',
        dependencies: []
    },
    {
        id: 'activity-territorio-002',
        domain: 'territorio',
        name: 'Operativos territoriales',
        type: 'operativo',
        startDay: 30,
        duration: 90,
        endDay: 120,
        resources: { budget: 2500000, personnel: 80 },
        status: 'planned',
        priority: 'high',
        dependencies: ['activity-analytics-001']
    },
    {
        id: 'activity-territorio-003',
        domain: 'territorio',
        name: 'Despliegue de brigadas',
        type: 'brigada',
        startDay: 60,
        duration: 60,
        endDay: 120,
        resources: { budget: 1500000, personnel: 100 },
        status: 'planned',
        priority: 'high',
        dependencies: ['activity-territorio-002']
    },
    // Monitor activities
    {
        id: 'activity-monitor-001',
        domain: 'monitor',
        name: 'Monitoreo 24/7',
        type: 'monitoreo',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 3500000, personnel: 30 },
        status: 'in-progress',
        priority: 'critical',
        dependencies: []
    },
    {
        id: 'activity-monitor-002',
        domain: 'monitor',
        name: 'Reportes diarios',
        type: 'reporte',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 500000, personnel: 10 },
        status: 'in-progress',
        priority: 'high',
        dependencies: []
    },
    // Predict activities
    {
        id: 'activity-predict-001',
        domain: 'predict',
        name: 'Simulaciones semanales',
        type: 'simulacion',
        startDay: 0,
        duration: 120,
        endDay: 120,
        resources: { budget: 1200000, personnel: 8 },
        status: 'in-progress',
        priority: 'medium',
        dependencies: ['activity-analytics-001']
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// MILESTONES
// ─────────────────────────────────────────────────────────────────────────────

export const milestones: Milestone[] = [
    {
        id: 'milestone-001',
        day: 15,
        name: 'Primer Debate',
        description: 'Debate presidencial en vivo con todos los candidatos',
        critical: true,
        domains: ['monitor', 'analytics', 'research'],
        status: 'pending'
    },
    {
        id: 'milestone-002',
        day: 45,
        name: 'Lanzamiento Propuestas Clave',
        description: 'Presentación oficial de propuestas económicas y sociales',
        critical: true,
        domains: ['analytics', 'monitor', 'territorio'],
        status: 'pending'
    },
    {
        id: 'milestone-003',
        day: 75,
        name: 'Segundo Debate',
        description: 'Debate final antes de cierre de campaña',
        critical: true,
        domains: ['monitor', 'analytics', 'research'],
        status: 'pending'
    },
    {
        id: 'milestone-004',
        day: 105,
        name: 'Cierre de Campaña',
        description: 'Evento masivo de cierre de campaña',
        critical: true,
        domains: ['territorio', 'monitor', 'analytics'],
        status: 'pending'
    },
    {
        id: 'milestone-005',
        day: 120,
        name: 'Día de Elección',
        description: 'Jornada electoral',
        critical: true,
        domains: ['analytics', 'territorio', 'predict', 'monitor'],
        status: 'pending'
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// KPI SNAPSHOTS (for simulation)
// ─────────────────────────────────────────────────────────────────────────────

export const kpiSnapshots: KPISnapshot[] = [
    {
        day: 0,
        timestamp: new Date().toISOString(),
        global: {
            victoryProbability: 76.4,
            voteIntention: 48.3,
            trend: 'stable',
            overallHealth: 'warning'
        },
        analytics: {
            voteIntention: 48.3,
            sentiment: 62,
            shareOfVoice: 48,
            engagement: 25,
            target: 52,
            status: 'warning'
        },
        territorio: {
            districtsControlled: 15,
            totalDistricts: 35,
            eventsCompleted: 0,
            eventsPlanned: 45,
            target: 20,
            status: 'warning'
        },
        predict: {
            victoryProbability: 76.4,
            voteProjection: 49.8,
            modelConfidence: 94.2,
            target: 80,
            status: 'healthy'
        },
        monitor: {
            mentions: 2300000,
            activeAlerts: 12,
            trendingPosition: 3,
            narrativeControl: 65,
            status: 'warning'
        },
        crisis: {
            alertLevel: 68,
            activeProtocols: 0,
            signalsDetected: 3,
            responseTime: 15,
            status: 'warning'
        },
        resources: {
            budgetRemaining: 38000000,
            budgetTotal: 38000000,
            burnRate: 0,
            personnelUtilization: 0,
            daysRemaining: 120,
            status: 'healthy'
        }
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL DATA
// ─────────────────────────────────────────────────────────────────────────────

export const strategicData = {
    scenarios,
    scenarioTemplates,
    simulationEvents,
    timelineActivities,
    milestones,
    kpiSnapshots
}
