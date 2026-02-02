/**
 * TYRAVEX Mock Data
 * Datos de ejemplo para la plataforma de inteligencia electoral
 */

// ============================================
// DASHBOARD (COMMAND) DATA
// ============================================
export const dashboardData = {
  // KPIs principales
  kpis: {
    intencionVoto: {
      value: 48.3,
      change: 2.1,
      label: 'Intencion de Voto',
      unit: '%'
    },
    sentimientoPublico: {
      value: 62,
      change: 5.3,
      label: 'Sentimiento Publico',
      unit: '%'
    },
    alcanceMedios: {
      value: 2.4,
      change: 14.2,
      label: 'Alcance Medios',
      unit: 'M'
    },
    mencionesTotales: {
      value: 4973,
      change: 8.7,
      label: 'Menciones Totales',
      unit: ''
    }
  },

  // Tendencias ultimos 30 dias
  tendencias: [
    { fecha: '01 Ene', intencion: 42.1, sentimiento: 48 },
    { fecha: '05 Ene', intencion: 43.2, sentimiento: 51 },
    { fecha: '10 Ene', intencion: 44.8, sentimiento: 54 },
    { fecha: '15 Ene', intencion: 45.5, sentimiento: 52 },
    { fecha: '20 Ene', intencion: 46.2, sentimiento: 58 },
    { fecha: '25 Ene', intencion: 47.1, sentimiento: 60 },
    { fecha: '30 Ene', intencion: 48.3, sentimiento: 62 }
  ],

  // Alertas recientes
  alertas: [
    {
      id: '1',
      tipo: 'critical',
      mensaje: 'Articulo negativo en El Universal detectado',
      tiempo: 'Hace 15 min',
      modulo: 'monitor'
    },
    {
      id: '2',
      tipo: 'warning',
      mensaje: 'Video viral en TikTok supero 50K views',
      tiempo: 'Hace 2 hrs',
      modulo: 'monitor'
    },
    {
      id: '3',
      tipo: 'info',
      mensaje: 'Nueva prediccion disponible con datos actualizados',
      tiempo: 'Hace 3 hrs',
      modulo: 'predict'
    }
  ]
}

// ============================================
// ANALYTICS DATA
// ============================================
export const analyticsData = {
  // Distribucion demografica
  demografia: {
    edad: [
      { grupo: '18-29', porcentaje: 32, total: 245000 },
      { grupo: '30-44', porcentaje: 28, total: 214200 },
      { grupo: '45-59', porcentaje: 25, total: 191250 },
      { grupo: '60+', porcentaje: 15, total: 114750 }
    ],
    genero: [
      { grupo: 'Masculino', porcentaje: 48 },
      { grupo: 'Femenino', porcentaje: 52 }
    ],
    nse: [
      { nivel: 'A/B (Alto)', porcentaje: 15, color: '#2ECC71' },
      { nivel: 'C+ (Medio Alto)', porcentaje: 22, color: '#27AE60' },
      { nivel: 'C (Medio)', porcentaje: 30, color: '#F39C12' },
      { nivel: 'D+ (Medio Bajo)', porcentaje: 18, color: '#E67E22' },
      { nivel: 'D/E (Bajo)', porcentaje: 15, color: '#E74C3C' }
    ]
  },

  // Resultados historicos por seccion
  historico: [
    { seccion: '0001', municipio: 'Monterrey', ano2018: 45.2, ano2021: 48.1, ano2024: 52.3, tendencia: 'up' },
    { seccion: '0002', municipio: 'Monterrey', ano2018: 38.5, ano2021: 41.2, ano2024: 44.8, tendencia: 'up' },
    { seccion: '0003', municipio: 'San Pedro', ano2018: 52.1, ano2021: 55.3, ano2024: 58.7, tendencia: 'up' },
    { seccion: '0004', municipio: 'San Pedro', ano2018: 61.2, ano2021: 59.8, ano2024: 57.2, tendencia: 'down' },
    { seccion: '0005', municipio: 'Guadalupe', ano2018: 42.3, ano2021: 44.5, ano2024: 46.1, tendencia: 'up' },
    { seccion: '0006', municipio: 'Guadalupe', ano2018: 35.8, ano2021: 38.2, ano2024: 41.5, tendencia: 'up' },
    { seccion: '0007', municipio: 'Apodaca', ano2018: 48.9, ano2021: 46.2, ano2024: 43.8, tendencia: 'down' },
    { seccion: '0008', municipio: 'Apodaca', ano2018: 39.1, ano2021: 42.8, ano2024: 45.2, tendencia: 'up' },
    { seccion: '0009', municipio: 'Escobedo', ano2018: 44.5, ano2021: 47.1, ano2024: 49.8, tendencia: 'up' },
    { seccion: '0010', municipio: 'Escobedo', ano2018: 51.2, ano2021: 48.9, ano2024: 46.3, tendencia: 'down' },
    { seccion: '0011', municipio: 'Santa Catarina', ano2018: 47.3, ano2021: 49.8, ano2024: 52.1, tendencia: 'up' },
    { seccion: '0012', municipio: 'Santa Catarina', ano2018: 38.9, ano2021: 41.2, ano2024: 43.7, tendencia: 'up' },
    { seccion: '0013', municipio: 'Garcia', ano2018: 32.1, ano2021: 35.8, ano2024: 39.2, tendencia: 'up' },
    { seccion: '0014', municipio: 'Garcia', ano2018: 28.5, ano2021: 31.2, ano2024: 34.8, tendencia: 'up' },
    { seccion: '0015', municipio: 'Juarez', ano2018: 41.8, ano2021: 44.5, ano2024: 47.2, tendencia: 'up' },
    { seccion: '0016', municipio: 'Juarez', ano2018: 36.2, ano2021: 38.9, ano2024: 41.5, tendencia: 'up' },
    { seccion: '0017', municipio: 'San Nicolas', ano2018: 55.3, ano2021: 57.8, ano2024: 60.2, tendencia: 'up' },
    { seccion: '0018', municipio: 'San Nicolas', ano2018: 49.8, ano2021: 52.1, ano2024: 54.5, tendencia: 'up' },
    { seccion: '0019', municipio: 'Cadereyta', ano2018: 33.5, ano2021: 36.2, ano2024: 38.9, tendencia: 'up' },
    { seccion: '0020', municipio: 'Cadereyta', ano2018: 29.8, ano2021: 32.5, ano2024: 35.1, tendencia: 'up' }
  ],

  // Datos para el mapa (estados de Mexico)
  mapaEstados: [
    { id: 'NL', nombre: 'Nuevo Leon', fuerza: 65, clasificacion: 'strong' },
    { id: 'JAL', nombre: 'Jalisco', fuerza: 52, clasificacion: 'medium' },
    { id: 'CDMX', nombre: 'Ciudad de Mexico', fuerza: 45, clasificacion: 'medium' },
    { id: 'MEX', nombre: 'Estado de Mexico', fuerza: 38, clasificacion: 'weak' },
    { id: 'VER', nombre: 'Veracruz', fuerza: 42, clasificacion: 'medium' },
    { id: 'PUE', nombre: 'Puebla', fuerza: 35, clasificacion: 'weak' },
    { id: 'GTO', nombre: 'Guanajuato', fuerza: 58, clasificacion: 'medium' },
    { id: 'CHIH', nombre: 'Chihuahua', fuerza: 48, clasificacion: 'medium' },
    { id: 'TAM', nombre: 'Tamaulipas', fuerza: 55, clasificacion: 'medium' },
    { id: 'MICH', nombre: 'Michoacan', fuerza: 32, clasificacion: 'weak' }
  ],

  // Municipios con datos detallados
  municipios: [
    { id: 1, nombre: 'Monterrey', poblacion: 1142994, fuerza: 58, clasificacion: 'medium', lat: 25.6866, lng: -100.3161 },
    { id: 2, nombre: 'San Pedro Garza Garcia', poblacion: 122659, fuerza: 72, clasificacion: 'strong', lat: 25.6581, lng: -100.4032 },
    { id: 3, nombre: 'Guadalupe', poblacion: 678006, fuerza: 45, clasificacion: 'medium', lat: 25.6771, lng: -100.2557 },
    { id: 4, nombre: 'Apodaca', poblacion: 597207, fuerza: 42, clasificacion: 'medium', lat: 25.7818, lng: -100.1885 },
    { id: 5, nombre: 'San Nicolas de los Garza', poblacion: 443273, fuerza: 68, clasificacion: 'strong', lat: 25.7500, lng: -100.2833 },
    { id: 6, nombre: 'General Escobedo', poblacion: 425148, fuerza: 38, clasificacion: 'weak', lat: 25.7989, lng: -100.3185 },
    { id: 7, nombre: 'Santa Catarina', poblacion: 296954, fuerza: 52, clasificacion: 'medium', lat: 25.6733, lng: -100.4583 },
    { id: 8, nombre: 'Juarez', poblacion: 333481, fuerza: 35, clasificacion: 'weak', lat: 25.6500, lng: -100.0833 },
    { id: 9, nombre: 'Garcia', poblacion: 247370, fuerza: 28, clasificacion: 'weak', lat: 25.8167, lng: -100.5833 },
    { id: 10, nombre: 'Cadereyta Jimenez', poblacion: 95534, fuerza: 41, clasificacion: 'medium', lat: 25.5833, lng: -99.9833 }
  ],

  // Segmentos de micro-targeting
  segmentos: [
    {
      id: '1',
      nombre: 'Jovenes Profesionistas',
      descripcion: 'Edad 25-35, NSE C+, Urbano',
      tamano: 185000,
      potencial: 'Alto',
      mensajeSugerido: 'Enfocarse en empleo y oportunidades de crecimiento'
    },
    {
      id: '2',
      nombre: 'Madres de Familia',
      descripcion: 'Edad 30-45, Con hijos, NSE C/D+',
      tamano: 142000,
      potencial: 'Alto',
      mensajeSugerido: 'Seguridad, educacion y servicios de salud'
    },
    {
      id: '3',
      nombre: 'Adultos Mayores',
      descripcion: 'Edad 60+, Pensionados',
      tamano: 98000,
      potencial: 'Medio',
      mensajeSugerido: 'Pensiones, salud y tranquilidad'
    },
    {
      id: '4',
      nombre: 'Empresarios PYMES',
      descripcion: 'Duenos de negocios pequenos',
      tamano: 45000,
      potencial: 'Medio',
      mensajeSugerido: 'Reduccion de tramites y apoyo a PYMES'
    }
  ]
}

// ============================================
// MONITOR DATA
// ============================================
export const monitorData = {
  // Sentimiento general
  sentimiento: {
    score: 62,
    positivas: 2847,
    neutrales: 1234,
    negativas: 892,
    total: 4973
  },

  // Trending topics
  trending: [
    { id: '1', tema: '#PropuestaEducacion', menciones: 2341, cambio: 15.2, sentimiento: 'positive' },
    { id: '2', tema: 'Debate de anoche', menciones: 1892, cambio: 8.5, sentimiento: 'neutral' },
    { id: '3', tema: '#SeguridadPublica', menciones: 1456, cambio: -3.2, sentimiento: 'negative' },
    { id: '4', tema: 'Propuesta de empleo', menciones: 1234, cambio: 22.1, sentimiento: 'positive' },
    { id: '5', tema: '#InversionNL', menciones: 987, cambio: 5.8, sentimiento: 'positive' }
  ],

  // Feed de menciones
  menciones: [
    {
      id: '1',
      fuente: 'Twitter',
      usuario: '@ciudadano_nl',
      contenido: 'La propuesta de educacion me parece muy acertada, por fin alguien que entiende las necesidades de los jovenes.',
      sentimiento: 'positive',
      alcance: 1250,
      tiempo: 'Hace 2 min'
    },
    {
      id: '2',
      fuente: 'Facebook',
      usuario: 'Maria Garcia',
      contenido: 'Vi el debate y me quede con dudas sobre el tema de seguridad, necesitamos mas detalles concretos.',
      sentimiento: 'neutral',
      alcance: 890,
      tiempo: 'Hace 5 min'
    },
    {
      id: '3',
      fuente: 'Twitter',
      usuario: '@opositor_critico',
      contenido: 'Puras promesas vacias como siempre, ya veremos si cumplen algo de lo que dicen.',
      sentimiento: 'negative',
      alcance: 2340,
      tiempo: 'Hace 8 min'
    },
    {
      id: '4',
      fuente: 'Instagram',
      usuario: 'juan_mty',
      contenido: 'Excelente propuesta para las PYMES! Por fin alguien piensa en los pequenos empresarios.',
      sentimiento: 'positive',
      alcance: 567,
      tiempo: 'Hace 12 min'
    },
    {
      id: '5',
      fuente: 'Twitter',
      usuario: '@noticias_nl',
      contenido: 'ULTIMA HORA: Se anuncia nuevo plan de inversiones para el estado, se esperan mas detalles.',
      sentimiento: 'neutral',
      alcance: 15600,
      tiempo: 'Hace 15 min'
    },
    {
      id: '6',
      fuente: 'TikTok',
      usuario: 'politicajoven',
      contenido: 'Este video explica por que esta propuesta de empleo puede funcionar...',
      sentimiento: 'positive',
      alcance: 52000,
      tiempo: 'Hace 22 min'
    },
    {
      id: '7',
      fuente: 'Twitter',
      usuario: '@vecino_enojado',
      contenido: 'Llevamos 3 dias sin agua y nadie dice nada, pero si para campana hay dinero.',
      sentimiento: 'negative',
      alcance: 3420,
      tiempo: 'Hace 28 min'
    },
    {
      id: '8',
      fuente: 'Facebook',
      usuario: 'Pedro Ramirez',
      contenido: 'Asisti al evento de ayer y la verdad me gusto mucho lo que escuche sobre salud.',
      sentimiento: 'positive',
      alcance: 234,
      tiempo: 'Hace 35 min'
    },
    {
      id: '9',
      fuente: 'Twitter',
      usuario: '@analista_pol',
      contenido: 'Analisis: Las propuestas presentadas son ambiciosas pero faltan detalles de financiamiento.',
      sentimiento: 'neutral',
      alcance: 8900,
      tiempo: 'Hace 42 min'
    },
    {
      id: '10',
      fuente: 'Instagram',
      usuario: 'mty_ciudadano',
      contenido: 'Esto es lo que necesitamos! Mas propuestas y menos ataques entre candidatos.',
      sentimiento: 'positive',
      alcance: 1890,
      tiempo: 'Hace 48 min'
    }
  ],

  // Alertas criticas
  alertas: [
    {
      id: '1',
      tipo: 'critical',
      titulo: 'Articulo negativo en El Universal',
      descripcion: 'Se publico un articulo criticando la propuesta de seguridad',
      fuente: 'El Universal',
      tiempo: 'Hace 15 min',
      alcance: 125000
    },
    {
      id: '2',
      tipo: 'warning',
      titulo: 'Video viral negativo en TikTok',
      descripcion: 'Video satirico supero 50K visualizaciones',
      fuente: 'TikTok',
      tiempo: 'Hace 2 hrs',
      alcance: 52000
    },
    {
      id: '3',
      tipo: 'info',
      titulo: 'Mencion en programa de TV',
      descripcion: 'Se menciono positivamente en noticiario local',
      fuente: 'Multimedios',
      tiempo: 'Hace 4 hrs',
      alcance: 450000
    }
  ],

  // Share of voice vs oponentes
  shareOfVoice: [
    { candidato: 'Tu candidato', porcentaje: 42, color: '#2ECC71' },
    { candidato: 'Oponente 1', porcentaje: 35, color: '#E74C3C' },
    { candidato: 'Oponente 2', porcentaje: 15, color: '#F39C12' },
    { candidato: 'Otros', porcentaje: 8, color: '#95A5A6' }
  ],

  // Sentimiento por dia (ultimos 7 dias)
  sentimientoPorDia: [
    { dia: 'Lun', positivo: 410, neutral: 180, negativo: 95 },
    { dia: 'Mar', positivo: 385, neutral: 165, negativo: 120 },
    { dia: 'Mie', positivo: 420, neutral: 190, negativo: 88 },
    { dia: 'Jue', positivo: 395, neutral: 175, negativo: 145 },
    { dia: 'Vie', positivo: 450, neutral: 200, negativo: 110 },
    { dia: 'Sab', positivo: 380, neutral: 160, negativo: 85 },
    { dia: 'Dom', positivo: 407, neutral: 164, negativo: 149 }
  ]
}

// ============================================
// PREDICT DATA
// ============================================
export const predictData = {
  // Prediccion actual
  prediccion: {
    candidato: {
      nombre: 'Tu Candidato',
      porcentaje: 48.3,
      margenError: 2.1,
      color: '#2ECC71'
    },
    oponente1: {
      nombre: 'Juan Perez (Oponente)',
      porcentaje: 42.7,
      margenError: 1.8,
      color: '#E74C3C'
    },
    otros: {
      nombre: 'Otros candidatos',
      porcentaje: 9.0,
      margenError: 0.8,
      color: '#95A5A6'
    }
  },

  // Probabilidad de victoria
  probabilidadVictoria: 76.4,

  // Modelo utilizado
  modelo: {
    nombre: 'Bayesiano Multi-variable',
    precision: 94.2,
    ultimaActualizacion: '2024-01-30 14:30'
  },

  // Tendencia de probabilidad (ultimos 30 dias)
  tendenciaProbabilidad: [
    { fecha: '01 Ene', probabilidad: 62.5 },
    { fecha: '05 Ene', probabilidad: 65.2 },
    { fecha: '10 Ene', probabilidad: 68.1 },
    { fecha: '15 Ene', probabilidad: 70.5 },
    { fecha: '20 Ene', probabilidad: 72.8 },
    { fecha: '25 Ene', probabilidad: 74.2 },
    { fecha: '30 Ene', probabilidad: 76.4 }
  ],

  // Escenarios de simulacion
  escenarios: [
    {
      id: '1',
      nombre: 'Aumentar gasto TV 20% Zona Norte',
      impactoVotos: 1.3,
      costo: 2400000,
      tiempo: '3 semanas',
      riesgo: 'Bajo',
      recomendado: true
    },
    {
      id: '2',
      nombre: 'Enfoque en mensaje de Seguridad',
      impactoVotos: 0.8,
      costo: 500000,
      tiempo: '2 semanas',
      riesgo: 'Bajo',
      recomendado: true
    },
    {
      id: '3',
      nombre: 'Evento masivo en Garcia',
      impactoVotos: 0.5,
      costo: 800000,
      tiempo: '1 semana',
      riesgo: 'Medio',
      recomendado: false
    },
    {
      id: '4',
      nombre: 'Debate va mal (escenario negativo)',
      impactoVotos: -2.4,
      costo: 0,
      tiempo: 'Inmediato',
      riesgo: 'Alto',
      recomendado: false
    }
  ],

  // Recomendaciones de IA
  recomendaciones: [
    {
      id: '1',
      prioridad: 'Alta',
      titulo: 'Priorizar Municipio San Pedro',
      descripcion: 'San Pedro muestra un potencial de crecimiento de +2.1% con inversion moderada',
      impactoPotencial: '+2.1%',
      accion: 'Programar 3 eventos esta semana'
    },
    {
      id: '2',
      prioridad: 'Alta',
      titulo: 'Reforzar mensaje de Empleo',
      descripcion: 'El tema de empleo esta en tendencia positiva y resuena con votantes indecisos',
      impactoPotencial: '+1.5%',
      accion: 'Crear contenido especifico para redes'
    },
    {
      id: '3',
      prioridad: 'Media',
      titulo: 'Eventos en zonas amarillas',
      descripcion: 'Escobedo y Guadalupe son zonas competidas con oportunidad de conversion',
      impactoPotencial: '+0.8%',
      accion: 'Agenda eventos proximos 7 dias'
    },
    {
      id: '4',
      prioridad: 'Media',
      titulo: 'Responder criticas de seguridad',
      descripcion: 'El tema de seguridad esta generando menciones negativas',
      impactoPotencial: '-1.2% evitado',
      accion: 'Preparar respuesta y plan de comunicacion'
    },
    {
      id: '5',
      prioridad: 'Baja',
      titulo: 'Optimizar presencia en TikTok',
      descripcion: 'Audiencia joven esta mas activa en esta plataforma',
      impactoPotencial: '+0.5%',
      accion: 'Aumentar frecuencia de contenido'
    }
  ]
}

// ============================================
// RESEARCH DATA
// ============================================
export const researchData = {
  // Perfiles de oponentes
  oponentes: [
    {
      id: '1',
      nombre: 'Juan Perez Garcia',
      partido: 'Partido XYZ',
      foto: null,
      edad: 52,
      cargo: 'Senador (2018-2024)',
      experiencia: '15 anos en politica',
      popularidad: 42.7,
      sentimiento: 45,
      fortalezas: ['Experiencia politica', 'Base solida en zona sur', 'Reconocimiento de nombre'],
      debilidades: ['Escandalos pasados', 'Percepcion de edad', 'Poca presencia digital']
    },
    {
      id: '2',
      nombre: 'Maria Lopez Hernandez',
      partido: 'Partido ABC',
      foto: null,
      edad: 45,
      cargo: 'Diputada Federal (2021-2024)',
      experiencia: '8 anos en politica',
      popularidad: 28.3,
      sentimiento: 52,
      fortalezas: ['Imagen fresca', 'Fuerte en redes sociales', 'Mensaje de cambio'],
      debilidades: ['Poca experiencia', 'Recursos limitados', 'Bajo reconocimiento']
    }
  ],

  // Timeline de posiciones (oponente 1)
  timeline: [
    {
      id: '1',
      fecha: '2024-01-15',
      tipo: 'declaracion',
      titulo: 'A favor de la reforma fiscal',
      descripcion: 'Declaro apoyo total a la nueva reforma fiscal propuesta',
      fuente: 'Conferencia de prensa'
    },
    {
      id: '2',
      fecha: '2024-01-10',
      tipo: 'voto',
      titulo: 'Voto a favor de presupuesto de seguridad',
      descripcion: 'Voto afirmativo en el senado para aumentar presupuesto de seguridad',
      fuente: 'Senado de la Republica'
    },
    {
      id: '3',
      fecha: '2023-12-20',
      tipo: 'declaracion',
      titulo: 'Critico politica de vivienda',
      descripcion: 'Expreso desacuerdo con el programa de vivienda social',
      fuente: 'Entrevista Multimedios'
    },
    {
      id: '4',
      fecha: '2023-11-15',
      tipo: 'evento',
      titulo: 'Evento con empresarios',
      descripcion: 'Reunion privada con lideres empresariales del norte',
      fuente: 'Reporte de medios'
    },
    {
      id: '5',
      fecha: '2023-10-01',
      tipo: 'declaracion',
      titulo: 'Propuesta de mas policias',
      descripcion: 'Anuncio plan para aumentar 30% la fuerza policial',
      fuente: 'Mitin politico'
    },
    {
      id: '6',
      fecha: '2023-08-20',
      tipo: 'escandalo',
      titulo: 'Cuestionado por gastos',
      descripcion: 'Investigacion periodistica sobre gastos excesivos',
      fuente: 'El Norte'
    },
    {
      id: '7',
      fecha: '2022-06-15',
      tipo: 'voto',
      titulo: 'Voto contra reforma de impuestos',
      descripcion: 'Voto en contra de la reforma fiscal anterior',
      fuente: 'Senado de la Republica'
    },
    {
      id: '8',
      fecha: '2022-03-10',
      tipo: 'declaracion',
      titulo: 'Critico aumento de impuestos',
      descripcion: 'Se pronuncio fuertemente contra cualquier aumento fiscal',
      fuente: 'Entrevista radio'
    }
  ],

  // Inconsistencias detectadas
  inconsistencias: [
    {
      id: '1',
      tema: 'Impuestos',
      descripcion: 'Voto contra reforma fiscal en 2022, pero ahora la apoya',
      fecha1: '2022-06-15',
      posicion1: 'En contra de aumentos fiscales',
      fecha2: '2024-01-15',
      posicion2: 'A favor de reforma fiscal',
      severidad: 'Alta',
      fuentes: ['Senado de la Republica', 'Conferencia de prensa']
    },
    {
      id: '2',
      tema: 'Seguridad',
      descripcion: 'Propuso mas policias en 2023, pero voto para reducir presupuesto',
      fecha1: '2023-10-01',
      posicion1: 'Mas policias (+30%)',
      fecha2: '2024-01-10',
      posicion2: 'Aumento moderado de presupuesto',
      severidad: 'Media',
      fuentes: ['Mitin politico', 'Senado de la Republica']
    },
    {
      id: '3',
      tema: 'Transparencia',
      descripcion: 'Promueve transparencia pero no aclaro gastos cuestionados',
      fecha1: '2023-05-20',
      posicion1: 'Gobierno transparente',
      fecha2: '2023-08-20',
      posicion2: 'Sin respuesta a cuestionamientos',
      severidad: 'Alta',
      fuentes: ['Campana', 'El Norte']
    },
    {
      id: '4',
      tema: 'Vivienda',
      descripcion: 'Antes apoyo programa de vivienda, ahora lo critica',
      fecha1: '2021-09-15',
      posicion1: 'Apoyo programa de vivienda',
      fecha2: '2023-12-20',
      posicion2: 'Critico el programa',
      severidad: 'Media',
      fuentes: ['Declaraciones publicas', 'Entrevista Multimedios']
    }
  ],

  // Cobertura mediatica
  cobertura: {
    resumen: {
      positivas: 45,
      neutrales: 120,
      negativas: 35
    },
    porMedio: [
      { medio: 'El Norte', positivas: 12, neutrales: 28, negativas: 8 },
      { medio: 'Multimedios', positivas: 15, neutrales: 35, negativas: 10 },
      { medio: 'Milenio', positivas: 8, neutrales: 25, negativas: 7 },
      { medio: 'El Universal', positivas: 5, neutrales: 18, negativas: 5 },
      { medio: 'Redes Sociales', positivas: 5, neutrales: 14, negativas: 5 }
    ],
    articulosRecientes: [
      {
        id: '1',
        titulo: 'Perez Garcia presenta plan de seguridad',
        medio: 'El Norte',
        fecha: '2024-01-28',
        sentimiento: 'neutral',
        url: '#'
      },
      {
        id: '2',
        titulo: 'Criticas a propuesta fiscal de Perez',
        medio: 'Milenio',
        fecha: '2024-01-25',
        sentimiento: 'negative',
        url: '#'
      },
      {
        id: '3',
        titulo: 'Evento multitudinario en zona sur',
        medio: 'Multimedios',
        fecha: '2024-01-22',
        sentimiento: 'positive',
        url: '#'
      },
      {
        id: '4',
        titulo: 'Analisis: Las contradicciones del candidato',
        medio: 'El Universal',
        fecha: '2024-01-20',
        sentimiento: 'negative',
        url: '#'
      },
      {
        id: '5',
        titulo: 'Entrevista exclusiva sobre propuestas',
        medio: 'Multimedios',
        fecha: '2024-01-18',
        sentimiento: 'neutral',
        url: '#'
      }
    ]
  }
}

// ============================================
// SETTINGS DATA
// ============================================
export const settingsData = {
  campana: {
    nombre: 'Campana Gubernatura NL 2024',
    candidato: 'Roberto Martinez Gonzalez',
    partido: 'Coalicion Progreso',
    estado: 'Nuevo Leon',
    fechaInicio: '2024-01-01',
    fechaEleccion: '2024-06-02'
  },
  alertas: {
    mencionesNegativas: true,
    umbralMenciones: 10,
    trendingTopics: true,
    actualizacionPredicciones: true,
    emailNotificaciones: 'equipo@campana.mx'
  },
  integraciones: {
    twitter: true,
    facebook: true,
    instagram: true,
    tiktok: true,
    googleNews: true
  }
}
