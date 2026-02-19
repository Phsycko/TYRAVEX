// ═══════════════════════════════════════════════════════════════════════════
//                    TACTICAL COMMAND CENTER - MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════

import type {
    TacticalUnit,
    TacticalOperation,
    TerrainAnalysis,
    VectorAnalysis,
    TerritoryControl,
    WeatherConditions,
    IntelReport
} from '../types/tactical'

// ─────────────────────────────────────────────────────────────────────────────
// TACTICAL UNITS (50+ units)
// ─────────────────────────────────────────────────────────────────────────────

export const tacticalUnits: TacticalUnit[] = [
    // INFANTRY SQUADS
    {
        id: 'unit-alfa-3',
        name: 'Escuadrón Relámpago',
        callSign: 'ALFA-3',
        type: 'infantry',
        status: 'operational',
        position: { lat: 19.4326, lng: -99.1332, elevation: 2240 },
        commander: 'Cpt. Juan Ramírez',
        capabilities: {
            actionRadius: 50,
            autonomy: 8,
            speed: 80,
            personnel: 12,
            specialty: ['urban', 'assault']
        },
        equipment: {
            vehicles: ['2x Vehículos tácticos 4x4'],
            weapons: ['Rifles de asalto', 'Armas cortas', 'Granadas'],
            communication: ['Radio encriptada', 'GPS', 'Satélite'],
            special: ['Drones reconocimiento', 'Visión nocturna', 'Equipo breaching']
        },
        currentMission: 'Patrullaje preventivo',
        lastUpdate: new Date().toISOString(),
        morale: 95,
        readiness: 100
    },
    {
        id: 'unit-bravo-7',
        name: 'Lobos Grises',
        callSign: 'BRAVO-7',
        type: 'infantry',
        status: 'operational',
        position: { lat: 19.4412, lng: -99.1280, elevation: 2255 },
        commander: 'Lt. María González',
        capabilities: {
            actionRadius: 45,
            autonomy: 10,
            speed: 70,
            personnel: 12,
            specialty: ['rural', 'reconnaissance']
        },
        equipment: {
            vehicles: ['2x Vehículos todo terreno'],
            weapons: ['Rifles precisión', 'Armas cortas'],
            communication: ['Radio táctica', 'GPS'],
            special: ['Equipo escalada', 'Visión térmica', 'Cámaras largo alcance']
        },
        lastUpdate: new Date().toISOString(),
        morale: 88,
        readiness: 95
    },
    {
        id: 'unit-charlie-2',
        name: 'Águilas',
        callSign: 'CHARLIE-2',
        type: 'infantry',
        status: 'standby',
        position: { lat: 19.4389, lng: -99.1405, elevation: 2310 },
        commander: 'Sgt. Carlos Mendoza',
        capabilities: {
            actionRadius: 40,
            autonomy: 12,
            speed: 65,
            personnel: 12,
            specialty: ['defense', 'support']
        },
        equipment: {
            vehicles: ['1x Vehículo táctico'],
            weapons: ['Rifles asalto', 'Ametralladoras ligeras', 'Lanzagranadas'],
            communication: ['Radio encriptada', 'GPS'],
            special: ['Equipo médico avanzado', 'Visión nocturna']
        },
        lastUpdate: new Date().toISOString(),
        morale: 92,
        readiness: 98
    },
    {
        id: 'unit-delta-5',
        name: 'Tormenta',
        callSign: 'DELTA-5',
        type: 'special',
        status: 'operational',
        position: { lat: 19.4301, lng: -99.1298, elevation: 2225 },
        commander: 'Maj. Roberto Silva',
        capabilities: {
            actionRadius: 60,
            autonomy: 6,
            speed: 90,
            personnel: 8,
            specialty: ['urban', 'assault', 'reconnaissance']
        },
        equipment: {
            vehicles: ['2x Vehículos blindados ligeros'],
            weapons: ['Armamento especial', 'Explosivos', 'Armas silenciadas'],
            communication: ['Radio encriptada', 'Satélite', 'Comunicación táctica'],
            special: ['Equipo infiltración', 'Visión nocturna avanzada', 'Drones tácticos', 'Equipo breaching']
        },
        lastUpdate: new Date().toISOString(),
        morale: 100,
        readiness: 100
    },
    {
        id: 'unit-echo-1',
        name: 'Centinelas',
        callSign: 'ECHO-1',
        type: 'infantry',
        status: 'operational',
        position: { lat: 19.4445, lng: -99.1356, elevation: 2268 },
        commander: 'Lt. Ana Torres',
        capabilities: {
            actionRadius: 35,
            autonomy: 14,
            speed: 60,
            personnel: 10,
            specialty: ['defense', 'urban']
        },
        equipment: {
            vehicles: ['1x Vehículo táctico'],
            weapons: ['Rifles asalto', 'Armas cortas'],
            communication: ['Radio táctica', 'GPS'],
            special: ['Equipo vigilancia', 'Cámaras portátiles']
        },
        lastUpdate: new Date().toISOString(),
        morale: 85,
        readiness: 90
    },

    // VEHICLE UNITS
    {
        id: 'unit-foxtrot-4',
        name: 'Rhinos',
        callSign: 'FOXTROT-4',
        type: 'vehicle',
        status: 'operational',
        position: { lat: 19.4356, lng: -99.1423, elevation: 2245 },
        commander: 'Cpt. Luis Hernández',
        capabilities: {
            actionRadius: 120,
            autonomy: 16,
            speed: 110,
            personnel: 16,
            specialty: ['assault', 'support']
        },
        equipment: {
            vehicles: ['4x Vehículos blindados APC'],
            weapons: ['Ametralladoras montadas', 'Lanzagranadas', 'Armamento pesado'],
            communication: ['Radio encriptada', 'GPS', 'Satélite'],
            special: ['Blindaje nivel III', 'Sistema contramedidas']
        },
        lastUpdate: new Date().toISOString(),
        morale: 90,
        readiness: 95
    },
    {
        id: 'unit-golf-9',
        name: 'Halcones Veloces',
        callSign: 'GOLF-9',
        type: 'vehicle',
        status: 'moving',
        position: { lat: 19.4278, lng: -99.1445, elevation: 2198 },
        commander: 'Lt. Pedro Morales',
        capabilities: {
            actionRadius: 150,
            autonomy: 12,
            speed: 130,
            personnel: 8,
            specialty: ['reconnaissance', 'assault']
        },
        equipment: {
            vehicles: ['4x Vehículos ligeros tácticos'],
            weapons: ['Ametralladoras ligeras', 'Armas cortas'],
            communication: ['Radio táctica', 'GPS'],
            special: ['Alta movilidad', 'Equipo reconocimiento']
        },
        currentMission: 'Patrullaje sector sur',
        lastUpdate: new Date().toISOString(),
        morale: 87,
        readiness: 92
    },

    // AIR SUPPORT
    {
        id: 'unit-hotel-1',
        name: 'Cóndor',
        callSign: 'HOTEL-1',
        type: 'air',
        status: 'standby',
        position: { lat: 19.4512, lng: -99.1234, elevation: 2280 },
        commander: 'Maj. Francisco Ruiz',
        capabilities: {
            actionRadius: 200,
            autonomy: 4,
            speed: 250,
            personnel: 4,
            specialty: ['reconnaissance', 'support']
        },
        equipment: {
            vehicles: ['1x Helicóptero táctico'],
            weapons: ['Ametralladoras montadas'],
            communication: ['Radio encriptada', 'Satélite', 'Radar'],
            special: ['Cámara térmica', 'Sistema visión nocturna', 'Winch rescate']
        },
        lastUpdate: new Date().toISOString(),
        morale: 94,
        readiness: 100
    },

    // COMMAND & SUPPORT
    {
        id: 'unit-india-cmd',
        name: 'Puesto de Comando Central',
        callSign: 'INDIA-CMD',
        type: 'command',
        status: 'operational',
        position: { lat: 19.4389, lng: -99.1332, elevation: 2250 },
        commander: 'Col. Miguel Ángel Sánchez',
        capabilities: {
            actionRadius: 0,
            autonomy: 48,
            speed: 0,
            personnel: 24,
            specialty: ['support']
        },
        equipment: {
            vehicles: ['Vehículo comando móvil'],
            weapons: ['Armamento defensivo'],
            communication: ['Centro comunicaciones', 'Satélite', 'Radio multi-banda', 'Sistemas encriptados'],
            special: ['Centro comando', 'Sistemas C4I', 'Enlace satélite', 'Análisis en tiempo real']
        },
        lastUpdate: new Date().toISOString(),
        morale: 98,
        readiness: 100
    },
    {
        id: 'unit-juliet-med',
        name: 'Ángeles de Rescate',
        callSign: 'JULIET-MED',
        type: 'support',
        status: 'operational',
        position: { lat: 19.4401, lng: -99.1367, elevation: 2260 },
        commander: 'Dr. Laura Martínez',
        capabilities: {
            actionRadius: 80,
            autonomy: 20,
            speed: 90,
            personnel: 8,
            specialty: ['support']
        },
        equipment: {
            vehicles: ['2x Ambulancias tácticas'],
            weapons: ['Armamento defensivo ligero'],
            communication: ['Radio médica', 'GPS'],
            special: ['Equipo médico completo', 'Quirófano móvil', 'Banco sangre']
        },
        lastUpdate: new Date().toISOString(),
        morale: 96,
        readiness: 100
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// TACTICAL OPERATIONS (10+ operations)
// ─────────────────────────────────────────────────────────────────────────────

export const tacticalOperations: TacticalOperation[] = [
    {
        id: 'op-001',
        name: 'Operación Trueno del Norte',
        type: 'assault',
        phase: 'planning',
        objectives: [
            {
                id: 'obj-001-primary',
                type: 'primary',
                description: 'Captura de punto estratégico - Edificio Industrial #45',
                location: { lat: 19.4398, lng: -99.1389, elevation: 2248 },
                priority: 1,
                status: 'pending'
            },
            {
                id: 'obj-001-secondary',
                type: 'secondary',
                description: 'Desarticular célula operativa hostil',
                location: { lat: 19.4395, lng: -99.1395, elevation: 2245 },
                priority: 2,
                status: 'pending'
            }
        ],
        routes: [
            {
                id: 'route-alfa',
                name: 'Aproximación Norte',
                waypoints: [
                    { lat: 19.4426, lng: -99.1332 },
                    { lat: 19.4415, lng: -99.1355 },
                    { lat: 19.4405, lng: -99.1375 },
                    { lat: 19.4398, lng: -99.1389 }
                ],
                assignedUnit: 'unit-alfa-3',
                distance: 780,
                estimatedTime: 15,
                difficulty: 'moderate',
                cover: 65,
                exposure: 35
            },
            {
                id: 'route-bravo',
                name: 'Flanqueo Este',
                waypoints: [
                    { lat: 19.4412, lng: -99.1280 },
                    { lat: 19.4408, lng: -99.1310 },
                    { lat: 19.4402, lng: -99.1350 },
                    { lat: 19.4398, lng: -99.1389 }
                ],
                assignedUnit: 'unit-bravo-7',
                distance: 920,
                estimatedTime: 18,
                difficulty: 'moderate',
                cover: 72,
                exposure: 28
            }
        ],
        zones: [
            {
                id: 'zone-objective',
                name: 'Zona Objetivo',
                type: 'objective',
                polygon: [
                    { lat: 19.4400, lng: -99.1385 },
                    { lat: 19.4400, lng: -99.1393 },
                    { lat: 19.4396, lng: -99.1393 },
                    { lat: 19.4396, lng: -99.1385 }
                ],
                description: 'Edificio Industrial #45 y perímetro inmediato'
            },
            {
                id: 'zone-rally',
                name: 'Punto de Reunión Norte',
                type: 'rally',
                polygon: [
                    { lat: 19.4426, lng: -99.1328 },
                    { lat: 19.4426, lng: -99.1336 },
                    { lat: 19.4422, lng: -99.1336 },
                    { lat: 19.4422, lng: -99.1328 }
                ],
                description: 'Punto de concentración pre-operación'
            },
            {
                id: 'zone-extraction',
                name: 'Zona de Extracción',
                type: 'extraction',
                polygon: [
                    { lat: 19.4385, lng: -99.1395 },
                    { lat: 19.4385, lng: -99.1405 },
                    { lat: 19.4380, lng: -99.1405 },
                    { lat: 19.4380, lng: -99.1395 }
                ],
                description: 'Zona segura para extracción post-operación'
            }
        ],
        unitAssignments: [
            {
                unitId: 'unit-alfa-3',
                role: 'Asalto frontal',
                route: 'route-alfa',
                tasks: ['Aproximación sigilosa', 'Asalto coordinado', 'Aseguramiento zona']
            },
            {
                unitId: 'unit-bravo-7',
                role: 'Flanqueo Este',
                route: 'route-bravo',
                tasks: ['Aproximación cubierta', 'Apoyo asalto', 'Bloqueo escape']
            },
            {
                unitId: 'unit-charlie-2',
                role: 'Cobertura elevada',
                position: { lat: 19.4410, lng: -99.1375, elevation: 2280 },
                tasks: ['Establecer posición', 'Cobertura de fuego', 'Vigilancia perímetro']
            },
            {
                unitId: 'unit-delta-5',
                role: 'Reserva táctica',
                position: { lat: 19.4385, lng: -99.1395 },
                tasks: ['Standby', 'Reacción rápida', 'Extracción si necesario']
            }
        ],
        timeline: [
            { hMinus: 60, event: 'Despliegue unidades a puntos de partida', units: ['unit-alfa-3', 'unit-bravo-7', 'unit-charlie-2', 'unit-delta-5'], critical: true },
            { hMinus: 30, event: 'Verificación comunicaciones', critical: true },
            { hMinus: 15, event: 'Reconocimiento final con drones', critical: false },
            { hMinus: 0, event: '🔴 INICIO DE OPERACIÓN', critical: true },
            { hMinus: -5, event: 'Alfa-3 y Bravo-7 inician aproximación', units: ['unit-alfa-3', 'unit-bravo-7'], critical: true },
            { hMinus: -10, event: 'Charlie-2 toma posición de cobertura', units: ['unit-charlie-2'], critical: true },
            { hMinus: -15, event: 'Contacto con objetivo esperado', critical: true },
            { hMinus: -25, event: 'Aseguramiento de zona', critical: true },
            { hMinus: -35, event: 'Extracción completada', critical: true }
        ],
        hHour: '2024-02-09T03:00:00Z',
        risks: [
            {
                id: 'risk-001',
                severity: 'high',
                description: 'Ruta de aproximación Alfa expuesta',
                probability: 65,
                impact: '200m sin cobertura con línea de visión directa desde objetivo',
                mitigation: 'Aproximación nocturna + uso de humo',
                location: { lat: 19.4405, lng: -99.1375 }
            },
            {
                id: 'risk-002',
                severity: 'medium',
                description: 'Tiempo de respuesta policial 8-12 min',
                probability: 80,
                impact: 'Puede comprometer extracción',
                mitigation: 'Bloqueo temporal de rutas de acceso'
            },
            {
                id: 'risk-003',
                severity: 'low',
                description: 'Condiciones meteorológicas variables',
                probability: 30,
                impact: 'Puede afectar visibilidad nocturna',
                mitigation: 'Equipo de visión térmica'
            }
        ],
        contingencies: [
            {
                id: 'cont-001',
                trigger: 'Resistencia mayor a esperada',
                plan: 'Retirada táctica ordenada a zona de reunión',
                resources: ['unit-delta-5', 'unit-hotel-1']
            },
            {
                id: 'cont-002',
                trigger: 'Clima adverso',
                plan: 'Cambio a operación diurna',
                resources: []
            },
            {
                id: 'cont-003',
                trigger: 'Bajas propias',
                plan: 'Activación equipo médico y extracción inmediata',
                resources: ['unit-juliet-med', 'unit-hotel-1']
            }
        ],
        successProbability: 76,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'op-002',
        name: 'Operación Sombra Silenciosa',
        type: 'infiltration',
        phase: 'planning',
        objectives: [
            {
                id: 'obj-002-primary',
                type: 'primary',
                description: 'Infiltración y recopilación de inteligencia',
                location: { lat: 19.4456, lng: -99.1412, elevation: 2265 },
                priority: 1,
                status: 'pending'
            }
        ],
        routes: [
            {
                id: 'route-stealth-1',
                name: 'Infiltración Nocturna',
                waypoints: [
                    { lat: 19.4445, lng: -99.1356 },
                    { lat: 19.4452, lng: -99.1385 },
                    { lat: 19.4456, lng: -99.1412 }
                ],
                assignedUnit: 'unit-delta-5',
                distance: 520,
                estimatedTime: 45,
                difficulty: 'extreme',
                cover: 88,
                exposure: 12
            }
        ],
        zones: [],
        unitAssignments: [
            {
                unitId: 'unit-delta-5',
                role: 'Equipo infiltración',
                route: 'route-stealth-1',
                tasks: ['Infiltración sigilosa', 'Recopilación intel', 'Exfiltración sin detección']
            }
        ],
        timeline: [
            { hMinus: 120, event: 'Preparación equipo especializado', units: ['unit-delta-5'], critical: true },
            { hMinus: 30, event: 'Despliegue a punto de inicio', units: ['unit-delta-5'], critical: true },
            { hMinus: 0, event: 'Inicio infiltración', critical: true },
            { hMinus: -45, event: 'Llegada a objetivo', critical: true },
            { hMinus: -90, event: 'Recopilación completada', critical: true },
            { hMinus: -135, event: 'Exfiltración completada', critical: true }
        ],
        hHour: '2024-02-10T02:00:00Z',
        risks: [
            {
                id: 'risk-inf-001',
                severity: 'critical',
                description: 'Detección durante infiltración',
                probability: 25,
                impact: 'Compromete misión y seguridad del equipo',
                mitigation: 'Equipo altamente entrenado, tecnología sigilo avanzada'
            }
        ],
        contingencies: [
            {
                id: 'cont-inf-001',
                trigger: 'Detección del equipo',
                plan: 'Exfiltración de emergencia con apoyo aéreo',
                resources: ['unit-hotel-1', 'unit-alfa-3']
            }
        ],
        successProbability: 68,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'op-003',
        name: 'Operación Centinela Vigilante',
        type: 'reconnaissance',
        phase: 'planning',
        objectives: [
            {
                id: 'obj-003-primary',
                type: 'primary',
                description: 'Reconocimiento de zona industrial',
                location: { lat: 19.4378, lng: -99.1445, elevation: 2235 },
                priority: 1,
                status: 'pending'
            }
        ],
        routes: [],
        zones: [
            {
                id: 'zone-recon',
                name: 'Zona de Reconocimiento',
                type: 'objective',
                polygon: [
                    { lat: 19.4390, lng: -99.1430 },
                    { lat: 19.4390, lng: -99.1460 },
                    { lat: 19.4365, lng: -99.1460 },
                    { lat: 19.4365, lng: -99.1430 }
                ],
                description: 'Área industrial a reconocer'
            }
        ],
        unitAssignments: [
            {
                unitId: 'unit-bravo-7',
                role: 'Reconocimiento terrestre',
                tasks: ['Patrullaje perímetro', 'Identificación puntos clave', 'Documentación fotográfica']
            },
            {
                unitId: 'unit-hotel-1',
                role: 'Reconocimiento aéreo',
                tasks: ['Sobrevuelo zona', 'Captura imágenes térmicas', 'Mapeo área']
            }
        ],
        timeline: [
            { hMinus: 30, event: 'Despliegue unidades', units: ['unit-bravo-7', 'unit-hotel-1'], critical: true },
            { hMinus: 0, event: 'Inicio reconocimiento', critical: true },
            { hMinus: -60, event: 'Reconocimiento completado', critical: true }
        ],
        hHour: '2024-02-11T10:00:00Z',
        risks: [],
        contingencies: [],
        successProbability: 92,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// MOCK TERRAIN ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

export const terrainAnalyses: TerrainAnalysis[] = [
    {
        areaId: 'area-industrial-norte',
        bounds: [
            { lat: 19.4390, lng: -99.1430 },
            { lat: 19.4390, lng: -99.1350 },
            { lat: 19.4340, lng: -99.1350 },
            { lat: 19.4340, lng: -99.1430 }
        ],
        area: 2.5,
        elevation: {
            minElevation: 2180,
            maxElevation: 2340,
            averageSlope: 8,
            maxSlope: 24,
            contours: [
                {
                    elevation: 2200,
                    path: [
                        { lat: 19.4385, lng: -99.1425 },
                        { lat: 19.4380, lng: -99.1410 },
                        { lat: 19.4375, lng: -99.1395 }
                    ]
                },
                {
                    elevation: 2250,
                    path: [
                        { lat: 19.4370, lng: -99.1420 },
                        { lat: 19.4365, lng: -99.1405 },
                        { lat: 19.4360, lng: -99.1390 }
                    ]
                },
                {
                    elevation: 2300,
                    path: [
                        { lat: 19.4355, lng: -99.1415 },
                        { lat: 19.4350, lng: -99.1400 },
                        { lat: 19.4345, lng: -99.1385 }
                    ]
                }
            ]
        },
        strategicPoints: [
            {
                id: 'sp-001',
                type: 'elevated',
                location: { lat: 19.4410, lng: -99.1375, elevation: 2340 },
                description: 'Edificio Norte - Punto más elevado',
                tacticalValue: 95,
                accessibility: 'moderate'
            },
            {
                id: 'sp-002',
                type: 'chokepoint',
                location: { lat: 19.4365, lng: -99.1390 },
                description: 'Paso estrecho entre edificios',
                tacticalValue: 88,
                accessibility: 'easy'
            },
            {
                id: 'sp-003',
                type: 'observation',
                location: { lat: 19.4380, lng: -99.1360 },
                description: 'Torre de agua - excelente visual',
                tacticalValue: 92,
                accessibility: 'difficult'
            }
        ],
        accessibility: [
            {
                id: 'acc-001',
                type: 'vehicle',
                path: [
                    { lat: 19.4390, lng: -99.1430 },
                    { lat: 19.4380, lng: -99.1410 },
                    { lat: 19.4370, lng: -99.1390 }
                ],
                difficulty: 'easy',
                distance: 850,
                estimatedTime: 8,
                cover: 45,
                description: 'Acceso vehicular principal'
            },
            {
                id: 'acc-002',
                type: 'foot',
                path: [
                    { lat: 19.4385, lng: -99.1425 },
                    { lat: 19.4378, lng: -99.1408 },
                    { lat: 19.4372, lng: -99.1395 }
                ],
                difficulty: 'moderate',
                distance: 620,
                estimatedTime: 12,
                cover: 72,
                description: 'Ruta peatonal cubierta'
            }
        ],
        cover: {
            buildings: 23,
            vegetation: 0.4,
            exposedArea: 1.3,
            coverPercentage: 48,
            tacticalPositions: [
                {
                    location: { lat: 19.4410, lng: -99.1375, elevation: 2340 },
                    type: 'hard_cover',
                    description: 'Edificio A - Altura, cobertura, visual 360°',
                    score: 95
                },
                {
                    location: { lat: 19.4375, lng: -99.1395 },
                    type: 'soft_cover',
                    description: 'Zona arbórea B - Ocultamiento, aproximación cubierta',
                    score: 78
                }
            ]
        },
        vulnerabilities: [
            {
                severity: 'critical',
                description: 'Único acceso vehicular controlable (cuello de botella)',
                location: { lat: 19.4365, lng: -99.1390 }
            },
            {
                severity: 'high',
                description: '52% del área sin cobertura natural'
            },
            {
                severity: 'medium',
                description: 'Terreno irregular dificulta movimiento rápido'
            }
        ]
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// MOCK VECTOR ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

export const vectorAnalyses: VectorAnalysis[] = [
    {
        targetId: 'target-edificio-45',
        targetLocation: { lat: 19.4398, lng: -99.1389, elevation: 2248 },
        radius: 500,
        approachVectors: [
            {
                id: 'vector-001',
                name: 'Aproximación Norte-Este',
                direction: 'NE',
                path: [
                    { lat: 19.4426, lng: -99.1332 },
                    { lat: 19.4415, lng: -99.1355 },
                    { lat: 19.4405, lng: -99.1375 },
                    { lat: 19.4398, lng: -99.1389 }
                ],
                distance: 780,
                cover: 72,
                slope: 6,
                exposure: 28,
                exposurePoints: [
                    {
                        location: { lat: 19.4405, lng: -99.1375 },
                        distance: 40,
                        severity: 'medium'
                    }
                ],
                estimatedTime: 10,
                score: 87,
                rating: 'optimal'
            },
            {
                id: 'vector-002',
                name: 'Aproximación Sur',
                direction: 'S',
                path: [
                    { lat: 19.4370, lng: -99.1389 },
                    { lat: 19.4380, lng: -99.1389 },
                    { lat: 19.4390, lng: -99.1389 },
                    { lat: 19.4398, lng: -99.1389 }
                ],
                distance: 420,
                cover: 45,
                slope: 14,
                exposure: 55,
                exposurePoints: [
                    {
                        location: { lat: 19.4385, lng: -99.1389 },
                        distance: 180,
                        severity: 'high'
                    }
                ],
                estimatedTime: 15,
                score: 58,
                rating: 'risky'
            }
        ],
        infiltrationPoints: [
            {
                id: 'infil-001',
                location: { lat: 19.4398, lng: -99.1392 },
                type: 'wall',
                accessibility: 'easy',
                visibility: 'hidden',
                proximity: 20,
                requirements: ['Equipo escalada básico'],
                score: 92,
                rating: 'excellent'
            },
            {
                id: 'infil-002',
                location: { lat: 19.4396, lng: -99.1389 },
                type: 'window',
                accessibility: 'moderate',
                visibility: 'medium',
                proximity: 5,
                requirements: ['Herramientas breaching', 'Silenciador'],
                score: 65,
                rating: 'acceptable'
            }
        ],
        ambushZones: [
            {
                id: 'ambush-001',
                name: 'Paso estrecho Norte',
                location: { lat: 19.4405, lng: -99.1375 },
                polygon: [
                    { lat: 19.4406, lng: -99.1373 },
                    { lat: 19.4406, lng: -99.1377 },
                    { lat: 19.4404, lng: -99.1377 },
                    { lat: 19.4404, lng: -99.1373 }
                ],
                type: 'chokepoint',
                cover: 'excellent',
                fireLines: [
                    {
                        position: { lat: 19.4407, lng: -99.1375 },
                        coverage: 180,
                        range: 150
                    },
                    {
                        position: { lat: 19.4403, lng: -99.1375 },
                        coverage: 180,
                        range: 150
                    }
                ],
                escapeRoutes: [
                    [
                        { lat: 19.4407, lng: -99.1375 },
                        { lat: 19.4410, lng: -99.1370 }
                    ],
                    [
                        { lat: 19.4403, lng: -99.1375 },
                        { lat: 19.4400, lng: -99.1380 }
                    ]
                ],
                capacity: 15,
                effectiveness: 95
            }
        ],
        firePositions: [
            {
                location: { lat: 19.4410, lng: -99.1375, elevation: 2340 },
                elevation: 2340,
                range: 800,
                coverage: 270,
                score: 94
            },
            {
                location: { lat: 19.4380, lng: -99.1360, elevation: 2310 },
                elevation: 2310,
                range: 600,
                coverage: 180,
                score: 82
            }
        ],
        optimalVector: 'vector-001',
        optimalInfiltration: 'infil-001'
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// MOCK TERRITORY CONTROL
// ─────────────────────────────────────────────────────────────────────────────

export const territoryControl: TerritoryControl = {
    timestamp: new Date().toISOString(),
    zones: [
        {
            id: 'zone-norte',
            name: 'Sector Norte',
            polygon: [
                { lat: 19.4450, lng: -99.1450 },
                { lat: 19.4450, lng: -99.1300 },
                { lat: 19.4400, lng: -99.1300 },
                { lat: 19.4400, lng: -99.1450 }
            ],
            status: 'full',
            controlPercentage: 95,
            population: 45000,
            strategicValue: 85,
            lastChange: new Date(Date.now() - 86400000 * 7).toISOString(),
            trend: 'stable',
            unitsPresent: ['unit-alfa-3', 'unit-echo-1'],
            threats: []
        },
        {
            id: 'zone-industrial',
            name: 'Zona Industrial',
            polygon: [
                { lat: 19.4400, lng: -99.1450 },
                { lat: 19.4400, lng: -99.1350 },
                { lat: 19.4340, lng: -99.1350 },
                { lat: 19.4340, lng: -99.1450 }
            ],
            status: 'disputed',
            controlPercentage: 62,
            population: 12000,
            strategicValue: 92,
            lastChange: new Date(Date.now() - 900000).toISOString(),
            trend: 'declining',
            unitsPresent: ['unit-bravo-7'],
            threats: [
                {
                    type: 'Actividad hostil incrementada',
                    severity: 'medium',
                    description: 'Incremento del 40% en actividad hostil en últimas 24h'
                }
            ]
        },
        {
            id: 'zone-sur',
            name: 'Sector Sur',
            polygon: [
                { lat: 19.4340, lng: -99.1450 },
                { lat: 19.4340, lng: -99.1300 },
                { lat: 19.4280, lng: -99.1300 },
                { lat: 19.4280, lng: -99.1450 }
            ],
            status: 'disputed',
            controlPercentage: 58,
            population: 38000,
            strategicValue: 70,
            lastChange: new Date(Date.now() - 3600000).toISOString(),
            trend: 'improving',
            unitsPresent: ['unit-golf-9'],
            threats: [
                {
                    type: 'Zona en recuperación',
                    severity: 'low',
                    description: 'Mejora gradual tras operación reciente'
                }
            ]
        },
        {
            id: 'zone-este',
            name: 'Sector Este',
            polygon: [
                { lat: 19.4450, lng: -99.1300 },
                { lat: 19.4450, lng: -99.1200 },
                { lat: 19.4350, lng: -99.1200 },
                { lat: 19.4350, lng: -99.1300 }
            ],
            status: 'full',
            controlPercentage: 88,
            population: 52000,
            strategicValue: 78,
            lastChange: new Date(Date.now() - 86400000 * 14).toISOString(),
            trend: 'stable',
            unitsPresent: ['unit-charlie-2'],
            threats: []
        }
    ],
    summary: {
        fullControl: 62,
        disputed: 23,
        noControl: 15,
        totalArea: 18.5
    },
    recentChanges: [
        {
            zoneId: 'zone-industrial',
            timestamp: new Date(Date.now() - 900000).toISOString(),
            from: 'full',
            to: 'disputed',
            reason: 'Incremento actividad hostil'
        },
        {
            zoneId: 'zone-sur',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            from: 'hostile',
            to: 'disputed',
            reason: 'Operación exitosa, hostiles retirados'
        }
    ],
    alerts: [
        {
            id: 'alert-001',
            zoneId: 'zone-industrial',
            severity: 'medium',
            message: 'Incremento del 40% en actividad hostil detectada',
            timestamp: new Date(Date.now() - 900000).toISOString()
        }
    ]
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK WEATHER & INTEL
// ─────────────────────────────────────────────────────────────────────────────

export const currentWeather: WeatherConditions = {
    timestamp: new Date().toISOString(),
    temperature: 18,
    conditions: 'clear',
    visibility: 15,
    windSpeed: 12,
    windDirection: 45,
    precipitation: 0,
    impact: {
        visibility: 'none',
        movement: 'none',
        operations: 'none'
    }
}

export const intelReports: IntelReport[] = [
    {
        id: 'intel-001',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'movement',
        reliability: 'confirmed',
        location: { lat: 19.4378, lng: -99.1445 },
        description: 'Movimiento de 3 vehículos hostiles hacia zona industrial',
        source: 'Reconocimiento aéreo',
        expiresAt: new Date(Date.now() + 3600000).toISOString()
    },
    {
        id: 'intel-002',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'position',
        reliability: 'probable',
        location: { lat: 19.4398, lng: -99.1389 },
        description: 'Posible punto de reunión hostil en Edificio Industrial #45',
        source: 'Inteligencia humana',
        expiresAt: new Date(Date.now() + 7200000).toISOString()
    }
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT ALL DATA
// ─────────────────────────────────────────────────────────────────────────────

export const tacticalData = {
    units: tacticalUnits,
    operations: tacticalOperations,
    terrainAnalyses,
    vectorAnalyses,
    territoryControl,
    weather: currentWeather,
    intel: intelReports
}
