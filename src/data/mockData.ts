// @ts-nocheck
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
  // Metricas principales mejoradas
  metricas: {
    sentimientoGeneral: {
      valor: 62,
      cambio: 5.3,
      tendencia: [58, 59, 60, 59, 61, 62, 62]
    },
    mencionesTotales: {
      valor: 4973,
      cambio: 8.7,
      cambio24h: 340,
      tendencia: [4200, 4350, 4500, 4600, 4750, 4850, 4973]
    },
    alcanceTotal: {
      valor: 2400000,
      cambio: 18.2,
      tendencia: [2000000, 2050000, 2150000, 2200000, 2300000, 2350000, 2400000]
    },
    engagementTotal: {
      valor: 89200,
      cambio: 12.4,
      tendencia: [75000, 78000, 80000, 82000, 85000, 87000, 89200]
    }
  },

  // Sentimiento general
  sentimiento: {
    score: 62,
    positivas: 2847,
    neutrales: 1234,
    negativas: 892,
    total: 4973
  },

  // Trending topics expandido (20+ items)
  trending: [
    { id: '1', tema: '#PropuestaEducacion', menciones: 2341, cambio: 15.2, sentimiento: 'positive', alcance: 580000, engagement: 12400 },
    { id: '2', tema: 'Debate de anoche', menciones: 1892, cambio: 8.5, sentimiento: 'neutral', alcance: 450000, engagement: 8900 },
    { id: '3', tema: '#SeguridadPublica', menciones: 1456, cambio: -3.2, sentimiento: 'negative', alcance: 320000, engagement: 6200 },
    { id: '4', tema: 'Propuesta de empleo', menciones: 1234, cambio: 22.1, sentimiento: 'positive', alcance: 290000, engagement: 9800 },
    { id: '5', tema: '#InversionNL', menciones: 987, cambio: 5.8, sentimiento: 'positive', alcance: 180000, engagement: 4500 },
    { id: '6', tema: 'Crisis economica', menciones: 854, cambio: -12.4, sentimiento: 'negative', alcance: 210000, engagement: 5600 },
    { id: '7', tema: 'Reforma fiscal', menciones: 720, cambio: 1.2, sentimiento: 'neutral', alcance: 150000, engagement: 3200 },
    { id: '8', tema: 'Infraestructura', menciones: 680, cambio: 9.8, sentimiento: 'positive', alcance: 130000, engagement: 2800 },
    { id: '9', tema: '#SaludParaTodos', menciones: 645, cambio: 18.5, sentimiento: 'positive', alcance: 125000, engagement: 3900 },
    { id: '10', tema: 'Corrupcion', menciones: 598, cambio: -8.3, sentimiento: 'negative', alcance: 195000, engagement: 7200 },
    { id: '11', tema: '#ApoyoAlCandidato', menciones: 542, cambio: 340.2, sentimiento: 'positive', alcance: 98000, engagement: 4100 },
    { id: '12', tema: 'Transporte publico', menciones: 489, cambio: 6.7, sentimiento: 'neutral', alcance: 87000, engagement: 1900 },
    { id: '13', tema: '#MexicoUnido', menciones: 456, cambio: 3.4, sentimiento: 'positive', alcance: 76000, engagement: 2100 },
    { id: '14', tema: 'Inseguridad', menciones: 423, cambio: -15.8, sentimiento: 'negative', alcance: 142000, engagement: 5800 },
    { id: '15', tema: 'Medio ambiente', menciones: 398, cambio: 12.3, sentimiento: 'positive', alcance: 68000, engagement: 1700 },
    { id: '16', tema: '#DebatePresidencial', menciones: 367, cambio: -22.1, sentimiento: 'neutral', alcance: 245000, engagement: 8900 },
    { id: '17', tema: 'Vivienda social', menciones: 334, cambio: 7.9, sentimiento: 'positive', alcance: 54000, engagement: 1400 },
    { id: '18', tema: 'Impuestos', menciones: 312, cambio: -5.6, sentimiento: 'negative', alcance: 98000, engagement: 3200 },
    { id: '19', tema: '#JusticiaYa', menciones: 289, cambio: 24.7, sentimiento: 'neutral', alcance: 112000, engagement: 4500 },
    { id: '20', tema: 'Tecnologia educativa', menciones: 267, cambio: 31.2, sentimiento: 'positive', alcance: 45000, engagement: 1200 }
  ] as TrendingTopic[],

  // Feed de menciones expandido (50+ items)
  menciones: [
    { id: '1', fuente: 'Twitter', usuario: '@ciudadano_nl', contenido: 'La propuesta de educacion me parece muy acertada, por fin alguien que entiende las necesidades de los jovenes.', sentimiento: 'positive', alcance: 1250, tiempo: 'Hace 2 min', verificado: false, seguidores: 2300, likes: 45, shares: 12, comentarios: 8, vistas: 320 },
    { id: '2', fuente: 'Facebook', usuario: 'Maria Garcia', contenido: 'Vi el debate y me quede con dudas sobre el tema de seguridad, necesitamos mas detalles concretos.', sentimiento: 'neutral', alcance: 890, tiempo: 'Hace 5 min', verificado: false, seguidores: 1200, likes: 23, shares: 5, comentarios: 12, vistas: 890 },
    { id: '3', fuente: 'Twitter', usuario: '@opositor_critico', contenido: 'Puras promesas vacias como siempre, ya veremos si cumplen algo de lo que dicen.', sentimiento: 'negative', alcance: 2340, tiempo: 'Hace 8 min', verificado: false, seguidores: 8900, likes: 67, shares: 23, comentarios: 34, vistas: 2340 },
    { id: '4', fuente: 'Instagram', usuario: 'juan_mty', contenido: 'Excelente propuesta para las PYMES! Por fin alguien piensa en los pequenos empresarios.', sentimiento: 'positive', alcance: 567, tiempo: 'Hace 12 min', verificado: false, seguidores: 3400, likes: 89, shares: 15, comentarios: 6, vistas: 567 },
    { id: '5', fuente: 'Twitter', usuario: '@noticias_nl', contenido: 'ULTIMA HORA: Se anuncia nuevo plan de inversiones para el estado, se esperan mas detalles.', sentimiento: 'neutral', alcance: 15600, tiempo: 'Hace 15 min', verificado: true, seguidores: 125000, likes: 234, shares: 89, comentarios: 45, vistas: 15600 },
    { id: '6', fuente: 'TikTok', usuario: 'politicajoven', contenido: 'Este video explica por que esta propuesta de empleo puede funcionar...', sentimiento: 'positive', alcance: 52000, tiempo: 'Hace 22 min', verificado: false, seguidores: 45000, likes: 3200, shares: 890, comentarios: 456, vistas: 52000 },
    { id: '7', fuente: 'Twitter', usuario: '@vecino_enojado', contenido: 'Llevamos 3 dias sin agua y nadie dice nada, pero si para campana hay dinero.', sentimiento: 'negative', alcance: 3420, tiempo: 'Hace 28 min', verificado: false, seguidores: 890, likes: 123, shares: 45, comentarios: 67, vistas: 3420 },
    { id: '8', fuente: 'Facebook', usuario: 'Pedro Ramirez', contenido: 'Asisti al evento de ayer y la verdad me gusto mucho lo que escuche sobre salud.', sentimiento: 'positive', alcance: 234, tiempo: 'Hace 35 min', verificado: false, seguidores: 567, likes: 12, shares: 3, comentarios: 2, vistas: 234 },
    { id: '9', fuente: 'Twitter', usuario: '@analista_pol', contenido: 'Analisis: Las propuestas presentadas son ambiciosas pero faltan detalles de financiamiento.', sentimiento: 'neutral', alcance: 8900, tiempo: 'Hace 42 min', verificado: true, seguidores: 67000, likes: 189, shares: 67, comentarios: 89, vistas: 8900 },
    { id: '10', fuente: 'Instagram', usuario: 'mty_ciudadano', contenido: 'Esto es lo que necesitamos! Mas propuestas y menos ataques entre candidatos.', sentimiento: 'positive', alcance: 1890, tiempo: 'Hace 48 min', verificado: false, seguidores: 4500, likes: 234, shares: 34, comentarios: 12, vistas: 1890 },
    { id: '11', fuente: 'Twitter', usuario: '@influencer_mx', contenido: 'El debate de anoche estuvo interesante, pero esperaba mas propuestas concretas sobre medio ambiente.', sentimiento: 'neutral', alcance: 34500, tiempo: 'Hace 52 min', verificado: true, seguidores: 234000, likes: 567, shares: 123, comentarios: 234, vistas: 34500 },
    { id: '12', fuente: 'Facebook', usuario: 'Grupo Ciudadanos NL', contenido: 'Organizamos foro para discutir las propuestas de los candidatos. Todos invitados!', sentimiento: 'neutral', alcance: 5600, tiempo: 'Hace 1 hora', verificado: false, seguidores: 12000, likes: 89, shares: 45, comentarios: 23, vistas: 5600 },
    { id: '13', fuente: 'TikTok', usuario: 'comediante_politico', contenido: 'Parodia del debate presidencial - version corta', sentimiento: 'neutral', alcance: 89000, tiempo: 'Hace 1 hora', verificado: false, seguidores: 156000, likes: 8900, shares: 2300, comentarios: 1200, vistas: 89000 },
    { id: '14', fuente: 'Twitter', usuario: '@periodista_inv', contenido: 'Investigacion: Los numeros detras de las promesas de campana #Fact Check', sentimiento: 'neutral', alcance: 12300, tiempo: 'Hace 1 hora', verificado: true, seguidores: 89000, likes: 345, shares: 156, comentarios: 89, vistas: 12300 },
    { id: '15', fuente: 'Instagram', usuario: 'estudiante_uanl', contenido: 'Me gusta que finalmente hablen de educacion superior y becas!', sentimiento: 'positive', alcance: 890, tiempo: 'Hace 1 hora', verificado: false, seguidores: 1200, likes: 67, shares: 8, comentarios: 4, vistas: 890 },
    { id: '16', fuente: 'Facebook', usuario: 'Empresarios MTY', contenido: 'Reunion con el candidato fue productiva. Escucho nuestras preocupaciones sobre regulaciones.', sentimiento: 'positive', alcance: 3400, tiempo: 'Hace 2 horas', verificado: false, seguidores: 8900, likes: 123, shares: 34, comentarios: 45, vistas: 3400 },
    { id: '17', fuente: 'Twitter', usuario: '@activista_social', contenido: 'Exigimos que todos los candidatos se pronuncien sobre derechos humanos. #DerechosYa', sentimiento: 'neutral', alcance: 6700, tiempo: 'Hace 2 horas', verificado: false, seguidores: 23000, likes: 234, shares: 89, comentarios: 67, vistas: 6700 },
    { id: '18', fuente: 'TikTok', usuario: 'joven_votante', contenido: 'Primera vez que voto y estoy emocionado! Aqui mis razones...', sentimiento: 'positive', alcance: 12000, tiempo: 'Hace 2 horas', verificado: false, seguidores: 8900, likes: 890, shares: 234, comentarios: 123, vistas: 12000 },
    { id: '19', fuente: 'Twitter', usuario: '@economista_nl', contenido: 'Analisis economico de las propuestas fiscales presentadas en el debate.', sentimiento: 'neutral', alcance: 9800, tiempo: 'Hace 2 horas', verificado: true, seguidores: 45000, likes: 267, shares: 98, comentarios: 56, vistas: 9800 },
    { id: '20', fuente: 'Instagram', usuario: 'mama_preocupada', contenido: 'Como madre me preocupa la seguridad. Necesitamos soluciones reales, no promesas.', sentimiento: 'negative', alcance: 1200, tiempo: 'Hace 3 horas', verificado: false, seguidores: 890, likes: 45, shares: 12, comentarios: 23, vistas: 1200 },
    { id: '21', fuente: 'Facebook', usuario: 'Sindicato Trabajadores', contenido: 'Esperamos que las promesas laborales se cumplan. Ya hemos visto muchas decepciones.', sentimiento: 'neutral', alcance: 8900, tiempo: 'Hace 3 horas', verificado: false, seguidores: 34000, likes: 234, shares: 67, comentarios: 89, vistas: 8900 },
    { id: '22', fuente: 'Twitter', usuario: '@tech_startup_mty', contenido: 'Propuestas de innovacion y tecnologia son prometedoras. Esperamos apoyo real al ecosistema.', sentimiento: 'positive', alcance: 4500, tiempo: 'Hace 3 horas', verificado: false, seguidores: 12000, likes: 156, shares: 45, comentarios: 23, vistas: 4500 },
    { id: '23', fuente: 'TikTok', usuario: 'reportero_joven', contenido: 'Entrevista rapida con votantes en la calle sobre el debate', sentimiento: 'neutral', alcance: 23000, tiempo: 'Hace 3 horas', verificado: false, seguidores: 34000, likes: 1200, shares: 345, comentarios: 234, vistas: 23000 },
    { id: '24', fuente: 'Twitter', usuario: '@ambientalista_mx', contenido: 'Decepcionante que el medio ambiente no sea prioridad en ningun discurso.', sentimiento: 'negative', alcance: 5600, tiempo: 'Hace 4 horas', verificado: false, seguidores: 18000, likes: 189, shares: 67, comentarios: 45, vistas: 5600 },
    { id: '25', fuente: 'Instagram', usuario: 'fitness_influencer', contenido: 'Propuesta de espacios deportivos publicos me encanta! #VidaSana', sentimiento: 'positive', alcance: 34000, tiempo: 'Hace 4 horas', verificado: true, seguidores: 234000, likes: 2300, shares: 456, comentarios: 189, vistas: 34000 },
    { id: '26', fuente: 'Facebook', usuario: 'Vecinos Organizados', contenido: 'Reunion comunitaria para discutir propuestas de los candidatos. Sabado 10am.', sentimiento: 'neutral', alcance: 2300, tiempo: 'Hace 4 horas', verificado: false, seguidores: 5600, likes: 67, shares: 23, comentarios: 12, vistas: 2300 },
    { id: '27', fuente: 'Twitter', usuario: '@medico_nl', contenido: 'Como profesional de salud, aplaudo las propuestas de mejora al sistema de salud publica.', sentimiento: 'positive', alcance: 3400, tiempo: 'Hace 5 horas', verificado: false, seguidores: 8900, likes: 123, shares: 34, comentarios: 19, vistas: 3400 },
    { id: '28', fuente: 'TikTok', usuario: 'estudiante_derecho', contenido: 'Explicacion legal de las propuestas de reforma judicial', sentimiento: 'neutral', alcance: 15000, tiempo: 'Hace 5 horas', verificado: false, seguidores: 23000, likes: 890, shares: 234, comentarios: 156, vistas: 15000 },
    { id: '29', fuente: 'Twitter', usuario: '@transportista_mx', contenido: 'Propuestas de infraestructura vial son necesarias pero falta presupuesto claro.', sentimiento: 'neutral', alcance: 4500, tiempo: 'Hace 5 horas', verificado: false, seguidores: 12000, likes: 89, shares: 23, comentarios: 34, vistas: 4500 },
    { id: '30', fuente: 'Instagram', usuario: 'chef_local', contenido: 'Apoyo a pequenos negocios es crucial. Esperamos que se cumpla!', sentimiento: 'positive', alcance: 2300, tiempo: 'Hace 6 horas', verificado: false, seguidores: 6700, likes: 156, shares: 23, comentarios: 12, vistas: 2300 },
    { id: '31', fuente: 'Facebook', usuario: 'Maestros Unidos NL', contenido: 'Propuestas educativas suenan bien en papel. Queremos ver implementacion real.', sentimiento: 'neutral', alcance: 12000, tiempo: 'Hace 6 horas', verificado: false, seguidores: 45000, likes: 345, shares: 89, comentarios: 123, vistas: 12000 },
    { id: '32', fuente: 'Twitter', usuario: '@artista_urbano', contenido: 'Cultura y arte tambien son importantes! No solo economia y seguridad.', sentimiento: 'neutral', alcance: 3400, tiempo: 'Hace 6 horas', verificado: false, seguidores: 9800, likes: 123, shares: 34, comentarios: 23, vistas: 3400 },
    { id: '33', fuente: 'TikTok', usuario: 'abuela_sabia', contenido: 'He visto muchas campanas en mi vida. Espero que esta vez sea diferente.', sentimiento: 'neutral', alcance: 45000, tiempo: 'Hace 7 horas', verificado: false, seguidores: 67000, likes: 3400, shares: 890, comentarios: 567, vistas: 45000 },
    { id: '34', fuente: 'Twitter', usuario: '@ingeniero_civil', contenido: 'Propuestas de infraestructura son tecnicamente viables. Buen trabajo del equipo.', sentimiento: 'positive', alcance: 5600, tiempo: 'Hace 7 horas', verificado: false, seguidores: 15000, likes: 189, shares: 45, comentarios: 28, vistas: 5600 },
    { id: '35', fuente: 'Instagram', usuario: 'fotografo_mty', contenido: 'Galeria de fotos del evento de campana. Muy buena organizacion!', sentimiento: 'positive', alcance: 8900, tiempo: 'Hace 7 horas', verificado: false, seguidores: 23000, likes: 567, shares: 89, comentarios: 34, vistas: 8900 },
    { id: '36', fuente: 'Facebook', usuario: 'Jubilados Activos', contenido: 'Propuestas para adultos mayores son insuficientes. Necesitamos mas atencion.', sentimiento: 'negative', alcance: 6700, tiempo: 'Hace 8 horas', verificado: false, seguidores: 18000, likes: 234, shares: 67, comentarios: 89, vistas: 6700 },
    { id: '37', fuente: 'Twitter', usuario: '@contador_publico', contenido: 'Analisis financiero de las promesas de campana. Los numeros no cuadran del todo.', sentimiento: 'negative', alcance: 7800, tiempo: 'Hace 8 horas', verificado: false, seguidores: 23000, likes: 234, shares: 78, comentarios: 56, vistas: 7800 },
    { id: '38', fuente: 'TikTok', usuario: 'bailarin_urbano', contenido: 'Coreografia inspirada en las propuestas de cambio social', sentimiento: 'positive', alcance: 34000, tiempo: 'Hace 8 horas', verificado: false, seguidores: 89000, likes: 2300, shares: 567, comentarios: 234, vistas: 34000 },
    { id: '39', fuente: 'Twitter', usuario: '@psicologa_clinica', contenido: 'Importante que se hable de salud mental en las propuestas. Es un tema olvidado.', sentimiento: 'positive', alcance: 4500, tiempo: 'Hace 9 horas', verificado: false, seguidores: 12000, likes: 167, shares: 45, comentarios: 23, vistas: 4500 },
    { id: '40', fuente: 'Instagram', usuario: 'runner_mty', contenido: 'Propuesta de ciclovias y espacios para correr es genial!', sentimiento: 'positive', alcance: 3400, tiempo: 'Hace 9 horas', verificado: false, seguidores: 8900, likes: 234, shares: 34, comentarios: 19, vistas: 3400 },
    { id: '41', fuente: 'Facebook', usuario: 'Padres de Familia', contenido: 'Seguridad escolar debe ser prioridad numero uno. Nuestros hijos primero.', sentimiento: 'neutral', alcance: 9800, tiempo: 'Hace 10 horas', verificado: false, seguidores: 34000, likes: 456, shares: 123, comentarios: 167, vistas: 9800 },
    { id: '42', fuente: 'Twitter', usuario: '@abogado_laboral', contenido: 'Propuestas laborales necesitan mas detalle sobre proteccion de derechos.', sentimiento: 'neutral', alcance: 5600, tiempo: 'Hace 10 horas', verificado: false, seguidores: 16000, likes: 189, shares: 56, comentarios: 34, vistas: 5600 },
    { id: '43', fuente: 'TikTok', usuario: 'musico_indie', contenido: 'Cancion sobre las esperanzas de cambio en esta eleccion', sentimiento: 'positive', alcance: 23000, tiempo: 'Hace 11 horas', verificado: false, seguidores: 45000, likes: 1890, shares: 456, comentarios: 234, vistas: 23000 },
    { id: '44', fuente: 'Twitter', usuario: '@veterinaria_mty', contenido: 'Gracias por incluir bienestar animal en las propuestas!', sentimiento: 'positive', alcance: 2300, tiempo: 'Hace 11 horas', verificado: false, seguidores: 6700, likes: 89, shares: 23, comentarios: 12, vistas: 2300 },
    { id: '45', fuente: 'Instagram', usuario: 'disenador_grafico', contenido: 'El branding de la campana esta muy bien logrado visualmente.', sentimiento: 'positive', alcance: 4500, tiempo: 'Hace 12 horas', verificado: false, seguidores: 12000, likes: 234, shares: 45, comentarios: 19, vistas: 4500 },
    { id: '46', fuente: 'Facebook', usuario: 'Comerciantes Centro', contenido: 'Necesitamos apoyo real para reactivar el comercio local post-pandemia.', sentimiento: 'neutral', alcance: 7800, tiempo: 'Hace 12 horas', verificado: false, seguidores: 23000, likes: 267, shares: 78, comentarios: 89, vistas: 7800 },
    { id: '47', fuente: 'Twitter', usuario: '@nutriologa_cert', contenido: 'Propuestas de alimentacion saludable en escuelas son excelentes!', sentimiento: 'positive', alcance: 3400, tiempo: 'Hace 13 horas', verificado: false, seguidores: 9800, likes: 123, shares: 34, comentarios: 16, vistas: 3400 },
    { id: '48', fuente: 'TikTok', usuario: 'gamer_profesional', contenido: 'Propuesta de apoyo a esports y tecnologia es innovadora', sentimiento: 'positive', alcance: 56000, tiempo: 'Hace 13 horas', verificado: true, seguidores: 234000, likes: 4500, shares: 1200, comentarios: 890, vistas: 56000 },
    { id: '49', fuente: 'Twitter', usuario: '@arquitecta_urbana', contenido: 'Planes de desarrollo urbano necesitan mas participacion ciudadana.', sentimiento: 'neutral', alcance: 4500, tiempo: 'Hace 14 horas', verificado: false, seguidores: 11000, likes: 156, shares: 45, comentarios: 28, vistas: 4500 },
    { id: '50', fuente: 'Instagram', usuario: 'yoga_instructor', contenido: 'Propuestas de bienestar y salud preventiva son muy necesarias.', sentimiento: 'positive', alcance: 6700, tiempo: 'Hace 14 horas', verificado: false, seguidores: 18000, likes: 456, shares: 67, comentarios: 34, vistas: 6700 }
  ] as Mention[],

  // Alertas criticas expandidas (10+ items)
  alertas: [
    { id: '1', severidad: 'critical', titulo: 'Articulo negativo en El Universal', descripcion: 'Candidato enfrenta criticas por gestion de recursos publicos - Alcance estimado: 120K', fuente: 'El Universal', tiempo: 'Hace 15 min', alcance: 125000, engagement: 1200, sentimiento: -85 },
    { id: '2', severidad: 'high', titulo: 'Video viral en TikTok', descripcion: 'Usuario @influencer_mx comparte clip de debate - 50K views en 2 horas', fuente: 'TikTok', tiempo: 'Hace 2 horas', alcance: 52000, engagement: 3500, sentimiento: -62 },
    { id: '3', severidad: 'medium', titulo: 'Trending topic positivo: #ApoyoAlCandidato', descripcion: '2.3K menciones en ultimas 6 horas, crecimiento +340%', fuente: 'Twitter', tiempo: 'Hace 5 horas', alcance: 98000, engagement: 4100, sentimiento: 78 },
    { id: '4', severidad: 'critical', titulo: 'Investigacion periodistica publicada', descripcion: 'Medio nacional publica investigacion sobre financiamiento de campana', fuente: 'Proceso', tiempo: 'Hace 8 horas', alcance: 340000, engagement: 8900, sentimiento: -72 },
    { id: '5', severidad: 'high', titulo: 'Pico de menciones negativas detectado', descripcion: 'Incremento de 340% en menciones negativas sobre tema de seguridad', fuente: 'Multiple', tiempo: 'Hace 12 horas', alcance: 78000, engagement: 2300, sentimiento: -58 },
    { id: '6', severidad: 'medium', titulo: 'Entrevista en programa matutino', descripcion: 'Candidato aparecera en programa de alto rating manana 8am', fuente: 'Televisa', tiempo: 'Hace 18 horas', alcance: 890000, engagement: 12000, sentimiento: 45 },
    { id: '7', severidad: 'low', titulo: 'Mencion en podcast popular', descripcion: 'Podcast politico discute propuestas del candidato positivamente', fuente: 'Spotify', tiempo: 'Hace 1 dia', alcance: 23000, engagement: 890, sentimiento: 62 },
    { id: '8', severidad: 'high', titulo: 'Hashtag de oposicion trending', descripcion: '#CuestionamosAlCandidato alcanza trending nacional', fuente: 'Twitter', tiempo: 'Hace 1 dia', alcance: 234000, engagement: 12000, sentimiento: -68 },
    { id: '9', severidad: 'medium', titulo: 'Encuesta publicada por medio local', descripcion: 'Nueva encuesta muestra ligero aumento en intencion de voto', fuente: 'El Norte', tiempo: 'Hace 2 dias', alcance: 156000, engagement: 3400, sentimiento: 55 },
    { id: '10', severidad: 'low', titulo: 'Evento comunitario exitoso', descripcion: 'Evento en zona sur supera expectativas con 2K asistentes', fuente: 'Equipo de campana', tiempo: 'Hace 2 dias', alcance: 45000, engagement: 1200, sentimiento: 72 }
  ] as Alert[],

  // Share of voice vs oponentes con datos detallados
  shareOfVoice: [
    { candidato: 'Tu candidato', porcentaje: 42, menciones: 2087, color: '#52C41A', cambio: 12 },
    { candidato: 'Oponente 1', porcentaje: 35, menciones: 1745, color: '#D32F2F', cambio: 8 },
    { candidato: 'Oponente 2', porcentaje: 15, menciones: 730, color: '#FA8C16', cambio: -3 },
    { candidato: 'Otros', porcentaje: 8, menciones: 411, color: '#8C8C8C', cambio: 5 }
  ],

  // Comparacion de candidatos
  comparacionCandidatos: {
    candidatos: ['Tu Candidato', 'Oponente 1', 'Oponente 2', 'Otros'],
    metricas: {
      menciones: [2087, 1745, 730, 411],
      sentimiento: [62, 48, -12, 22],
      alcance: [1200000, 980000, 340000, 180000],
      engagement: [42300, 38100, 12400, 6800],
      shareOfVoice: [42, 35, 15, 8],
      crecimiento24h: [12, 8, -3, 5]
    }
  },

  // Distribucion por fuente
  distribucionFuentes: [
    { fuente: 'Twitter', menciones: 1492, porcentaje: 30, color: '#1DA1F2' },
    { fuente: 'Facebook', menciones: 995, porcentaje: 20, color: '#4267B2' },
    { fuente: 'Instagram', menciones: 647, porcentaje: 13, color: '#E4405F' },
    { fuente: 'TikTok', menciones: 398, porcentaje: 8, color: '#000000' },
    { fuente: 'Noticias Web', menciones: 348, porcentaje: 7, color: '#FF6B6B' },
    { fuente: 'YouTube', menciones: 100, porcentaje: 2, color: '#FF0000' },
    { fuente: 'Otros', menciones: 993, porcentaje: 20, color: '#95A5A6' }
  ],

  // Sentimiento por dia (ultimos 7 dias)
  sentimientoPorDia: [
    { dia: 'Lun', fecha: '2026-02-01', positivo: 410, neutral: 180, negativo: 95, total: 685 },
    { dia: 'Mar', fecha: '2026-02-02', positivo: 385, neutral: 165, negativo: 120, total: 670 },
    { dia: 'Mie', fecha: '2026-02-03', positivo: 420, neutral: 190, negativo: 88, total: 698 },
    { dia: 'Jue', fecha: '2026-02-04', positivo: 395, neutral: 175, negativo: 145, total: 715 },
    { dia: 'Vie', fecha: '2026-02-05', positivo: 450, neutral: 200, negativo: 110, total: 760 },
    { dia: 'Sab', fecha: '2026-02-06', positivo: 380, neutral: 160, negativo: 85, total: 625 },
    { dia: 'Dom', fecha: '2026-02-07', positivo: 407, neutral: 164, negativo: 149, total: 720 }
  ]
}

// ============================================
// PREDICT DATA (ENHANCED)
// ============================================
export const predictData = {
  // ========== MODELOS ML DISPONIBLES ==========
  modelos: [
    {
      id: 'bayesiano',
      nombre: 'Bayesiano Multi-variable',
      precision: 94.2,
      recall: 91.8,
      f1Score: 93.0,
      mae: 1.2,
      tiempoProcesamiento: 0.8,
      activo: true,
      descripcion: 'Modelo probabilístico con actualización bayesiana'
    },
    {
      id: 'random-forest',
      nombre: 'Random Forest Ensemble',
      precision: 92.8,
      recall: 90.5,
      f1Score: 91.6,
      mae: 1.4,
      tiempoProcesamiento: 1.2,
      activo: false,
      descripcion: 'Ensemble de árboles de decisión'
    },
    {
      id: 'xgboost',
      nombre: 'XGBoost Optimizado',
      precision: 93.5,
      recall: 91.2,
      f1Score: 92.3,
      mae: 1.3,
      tiempoProcesamiento: 0.5,
      activo: false,
      descripcion: 'Gradient boosting optimizado'
    },
    {
      id: 'neural-network',
      nombre: 'Neural Network Deep',
      precision: 91.3,
      recall: 89.7,
      f1Score: 90.5,
      mae: 1.6,
      tiempoProcesamiento: 3.1,
      activo: false,
      descripcion: 'Red neuronal profunda con 5 capas'
    },
    {
      id: 'ensemble',
      nombre: 'Ensemble Voting (Todos)',
      precision: 95.1,
      recall: 93.2,
      f1Score: 94.1,
      mae: 1.0,
      tiempoProcesamiento: 2.3,
      activo: false,
      descripcion: 'Votación ponderada de todos los modelos',
      mejor: true
    }
  ],

  // ========== PREDICCIÓN PRINCIPAL (MEJORADA) ==========
  prediccion: {
    candidato: {
      nombre: 'Tu Candidato',
      porcentaje: 48.3,
      margenError: 2.1,
      rangoMin: 46.2,
      rangoMax: 50.4,
      cambio7dias: 2.1,
      tendencia: 'positiva',
      color: '#52C41A',
      factoresClave: [
        { factor: 'Sentimiento público', impacto: 0.8 },
        { factor: 'Eventos recientes', impacto: 0.6 },
        { factor: 'Demografía favorable', impacto: 0.5 },
        { factor: 'Gasto en medios', impacto: 0.2 }
      ]
    } as Candidato,
    oponente1: {
      nombre: 'Juan Pérez (Oponente)',
      porcentaje: 42.7,
      margenError: 1.8,
      rangoMin: 40.9,
      rangoMax: 44.5,
      cambio7dias: -1.8,
      tendencia: 'negativa',
      color: '#D32F2F',
      debilidades: [
        { factor: 'Controversia reciente', impacto: -1.2 },
        { factor: 'Sentimiento descendente', impacto: -0.4 },
        { factor: 'Pérdida de momentum', impacto: -0.2 }
      ]
    } as Candidato,
    otros: {
      nombre: 'Otros candidatos',
      porcentaje: 9.0,
      margenError: 0.8,
      rangoMin: 8.2,
      rangoMax: 9.8,
      cambio7dias: 0.0,
      tendencia: 'neutral',
      color: '#8C8C8C'
    } as Candidato
  },

  // ========== PROBABILIDAD DE VICTORIA (MEJORADA) ==========
  probabilidadVictoria: {
    probabilidad: 76.4,
    factoresVictoria: [
      { factor: 'Ventaja en intención de voto', valor: '+18 puntos', positivo: true },
      { factor: 'Tendencia positiva sostenida', valor: '7 días ↑', positivo: true },
      { factor: 'Sentimiento favorable', valor: '+62%', positivo: true },
      { factor: 'Momento favorable', valor: 'Score: 8.2', positivo: true },
      { factor: 'Zonas competidas', valor: '12 distritos', positivo: false },
      { factor: 'Tiempo hasta elección', valor: '45 días', positivo: false }
    ],
    escenarios: [
      { tipo: 'Optimista', probabilidad: 90, votos: 51.2 },
      { tipo: 'Base', probabilidad: 76.4, votos: 48.3 },
      { tipo: 'Pesimista', probabilidad: 10, votos: 45.7 }
    ]
  },

  // ========== PROYECCIÓN TEMPORAL (90 DÍAS) ==========
  proyeccionTemporal: [
    { dia: 0, label: 'Hoy', tuCandidato: 48.3, oponente: 42.7, min: 46.2, max: 50.4 },
    { dia: 7, label: '+7d', tuCandidato: 48.7, oponente: 42.5, min: 46.6, max: 50.8 },
    { dia: 14, label: '+14d', tuCandidato: 49.1, oponente: 42.3, min: 47.0, max: 51.2 },
    { dia: 21, label: '+21d', tuCandidato: 49.4, oponente: 42.1, min: 47.3, max: 51.5 },
    { dia: 30, label: '+30d', tuCandidato: 49.8, oponente: 41.8, min: 47.7, max: 51.9 },
    { dia: 37, label: '+37d', tuCandidato: 50.1, oponente: 41.6, min: 48.0, max: 52.2 },
    { dia: 45, label: 'Elección', tuCandidato: 50.5, oponente: 41.3, min: 48.4, max: 52.6 }
  ],

  eventosProgramados: [
    { dia: 7, nombre: 'Debate televisado', impactoEstimado: 1.5, tipo: 'variable' },
    { dia: 21, nombre: 'Cierre de campaña', impactoEstimado: 0.8, tipo: 'positivo' },
    { dia: 30, nombre: 'Último debate', impactoEstimado: 2.0, tipo: 'variable' }
  ],

  // ========== DESGLOSE POR DISTRITO (35 DISTRITOS) ==========
  distritos: [
    { id: 1, nombre: 'Distrito 01', prediccion: 54.2, probVictoria: 92, cambio7d: 1.2, prioridad: 'seguro', color: '#52C41A' },
    { id: 2, nombre: 'Distrito 02', prediccion: 52.8, probVictoria: 87, cambio7d: 0.8, prioridad: 'seguro', color: '#52C41A' },
    { id: 3, nombre: 'Distrito 03', prediccion: 49.1, probVictoria: 58, cambio7d: 0.3, prioridad: 'competido', color: '#FA8C16' },
    { id: 4, nombre: 'Distrito 04', prediccion: 48.7, probVictoria: 54, cambio7d: -0.2, prioridad: 'competido', color: '#FA8C16', alerta: true },
    { id: 5, nombre: 'Distrito 05', prediccion: 47.3, probVictoria: 42, cambio7d: 0.0, prioridad: 'competido', color: '#FA8C16' },
    { id: 6, nombre: 'Distrito 06', prediccion: 43.2, probVictoria: 18, cambio7d: -1.1, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 7, nombre: 'Distrito 07', prediccion: 41.8, probVictoria: 12, cambio7d: -0.9, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 8, nombre: 'Distrito 08', prediccion: 55.1, probVictoria: 94, cambio7d: 1.5, prioridad: 'seguro', color: '#52C41A' },
    { id: 9, nombre: 'Distrito 09', prediccion: 51.3, probVictoria: 82, cambio7d: 0.6, prioridad: 'seguro', color: '#52C41A' },
    { id: 10, nombre: 'Distrito 10', prediccion: 49.8, probVictoria: 64, cambio7d: 0.4, prioridad: 'competido', color: '#FA8C16' },
    { id: 11, nombre: 'Distrito 11', prediccion: 48.2, probVictoria: 51, cambio7d: -0.1, prioridad: 'competido', color: '#FA8C16' },
    { id: 12, nombre: 'Distrito 12', prediccion: 46.9, probVictoria: 38, cambio7d: -0.3, prioridad: 'competido', color: '#FA8C16' },
    { id: 13, nombre: 'Distrito 13', prediccion: 44.5, probVictoria: 22, cambio7d: -0.8, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 14, nombre: 'Distrito 14', prediccion: 53.7, probVictoria: 89, cambio7d: 1.1, prioridad: 'seguro', color: '#52C41A' },
    { id: 15, nombre: 'Distrito 15', prediccion: 52.1, probVictoria: 84, cambio7d: 0.7, prioridad: 'seguro', color: '#52C41A' },
    { id: 16, nombre: 'Distrito 16', prediccion: 50.2, probVictoria: 68, cambio7d: 0.5, prioridad: 'competido', color: '#FA8C16' },
    { id: 17, nombre: 'Distrito 17', prediccion: 48.9, probVictoria: 56, cambio7d: 0.2, prioridad: 'competido', color: '#FA8C16' },
    { id: 18, nombre: 'Distrito 18', prediccion: 47.6, probVictoria: 45, cambio7d: -0.1, prioridad: 'competido', color: '#FA8C16' },
    { id: 19, nombre: 'Distrito 19', prediccion: 45.8, probVictoria: 28, cambio7d: -0.6, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 20, nombre: 'Distrito 20', prediccion: 43.9, probVictoria: 20, cambio7d: -0.9, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 21, nombre: 'Distrito 21', prediccion: 54.8, probVictoria: 93, cambio7d: 1.3, prioridad: 'seguro', color: '#52C41A' },
    { id: 22, nombre: 'Distrito 22', prediccion: 51.9, probVictoria: 85, cambio7d: 0.9, prioridad: 'seguro', color: '#52C41A' },
    { id: 23, nombre: 'Distrito 23', prediccion: 49.5, probVictoria: 61, cambio7d: 0.3, prioridad: 'competido', color: '#FA8C16' },
    { id: 24, nombre: 'Distrito 24', prediccion: 48.4, probVictoria: 53, cambio7d: 0.1, prioridad: 'competido', color: '#FA8C16' },
    { id: 25, nombre: 'Distrito 25', prediccion: 47.1, probVictoria: 41, cambio7d: -0.2, prioridad: 'competido', color: '#FA8C16' },
    { id: 26, nombre: 'Distrito 26', prediccion: 44.2, probVictoria: 21, cambio7d: -1.0, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 27, nombre: 'Distrito 27', prediccion: 42.5, probVictoria: 15, cambio7d: -1.2, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 28, nombre: 'Distrito 28', prediccion: 53.2, probVictoria: 88, cambio7d: 1.0, prioridad: 'seguro', color: '#52C41A' },
    { id: 29, nombre: 'Distrito 29', prediccion: 51.5, probVictoria: 83, cambio7d: 0.8, prioridad: 'seguro', color: '#52C41A' },
    { id: 30, nombre: 'Distrito 30', prediccion: 49.3, probVictoria: 59, cambio7d: 0.4, prioridad: 'competido', color: '#FA8C16' },
    { id: 31, nombre: 'Distrito 31', prediccion: 48.1, probVictoria: 52, cambio7d: 0.0, prioridad: 'competido', color: '#FA8C16' },
    { id: 32, nombre: 'Distrito 32', prediccion: 46.7, probVictoria: 37, cambio7d: -0.4, prioridad: 'competido', color: '#FA8C16' },
    { id: 33, nombre: 'Distrito 33', prediccion: 44.8, probVictoria: 24, cambio7d: -0.7, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 34, nombre: 'Distrito 34', prediccion: 43.1, probVictoria: 17, cambio7d: -1.1, prioridad: 'riesgo', color: '#D32F2F' },
    { id: 35, nombre: 'Distrito 35', prediccion: 52.5, probVictoria: 86, cambio7d: 0.9, prioridad: 'seguro', color: '#52C41A' }
  ] as Distrito[],

  resumenDistritos: {
    seguros: 15,
    competidos: 12,
    enRiesgo: 8
  },

  // ========== ESCENARIOS GUARDADOS (12+) ==========
  escenariosGuardados: [
    { id: '1', nombre: 'Agresivo en medios digitales', resultado: 50.8, inversion: 5050000, guardado: 'Hace 2 días' },
    { id: '2', nombre: 'Enfoque zona metropolitana', resultado: 49.2, inversion: 3200000, guardado: 'Hace 5 días' },
    { id: '3', nombre: 'Campaña negativa vs oponente', resultado: 51.1, inversion: 6800000, guardado: 'Hace 1 sem' },
    { id: '4', nombre: 'Conservador bajo presupuesto', resultado: 47.9, inversion: 1500000, guardado: 'Hace 2 sem' },
    { id: '5', nombre: 'Máximo en TV tradicional', resultado: 50.2, inversion: 8200000, guardado: 'Hace 3 sem' },
    { id: '6', nombre: 'Solo digital y redes', resultado: 49.5, inversion: 2800000, guardado: 'Hace 3 sem' },
    { id: '7', nombre: 'Eventos masivos', resultado: 49.8, inversion: 4500000, guardado: 'Hace 1 mes' },
    { id: '8', nombre: 'Enfoque en jóvenes', resultado: 48.9, inversion: 3100000, guardado: 'Hace 1 mes' },
    { id: '9', nombre: 'Refuerzo zona norte', resultado: 50.1, inversion: 4200000, guardado: 'Hace 1 mes' },
    { id: '10', nombre: 'Equilibrado moderado', resultado: 49.4, inversion: 3800000, guardado: 'Hace 1 mes' },
    { id: '11', nombre: 'Alto riesgo alto retorno', resultado: 51.5, inversion: 9500000, guardado: 'Hace 2 mes' },
    { id: '12', nombre: 'Plan de contingencia', resultado: 48.2, inversion: 2200000, guardado: 'Hace 2 mes' }
  ],

  // ========== ANÁLISIS DE SENSIBILIDAD ==========
  sensibilidad: [
    { variable: 'Sentimiento público', impacto: 2.8, elasticidad: 'Alto', nivel: 16 },
    { variable: 'Resultado de debates', impacto: 2.4, elasticidad: 'Alto', nivel: 15 },
    { variable: 'Inversión en TV', impacto: 1.2, elasticidad: 'Medio', nivel: 10 },
    { variable: 'Eventos externos', impacto: 1.0, elasticidad: 'Medio', nivel: 8 },
    { variable: 'Inversión digital', impacto: 0.8, elasticidad: 'Medio-bajo', nivel: 6 },
    { variable: 'Enfoque geográfico', impacto: 0.6, elasticidad: 'Bajo', nivel: 5 },
    { variable: 'Mensaje de campaña', impacto: 0.4, elasticidad: 'Bajo', nivel: 4 },
    { variable: 'Gasto en exterior', impacto: 0.3, elasticidad: 'Bajo', nivel: 3 }
  ],

  // ========== HISTÓRICO DE PREDICCIONES ==========
  historico: [
    { id: 1, eleccion: '2024 Alcaldía Monterrey', prediccion: 52.1, real: 51.8, error: 0.3, resultado: 'ganó', año: 2024 },
    { id: 2, eleccion: '2023 Gubernatura Jalisco', prediccion: 48.9, real: 49.2, error: -0.3, resultado: 'ganó', año: 2023 },
    { id: 3, eleccion: '2023 Alcaldía Guadalajara', prediccion: 49.8, real: 48.2, error: 1.6, resultado: 'perdió', año: 2023 },
    { id: 4, eleccion: '2022 Senador Nuevo León', prediccion: 51.2, real: 52.8, error: -1.6, resultado: 'ganó', año: 2022 },
    { id: 5, eleccion: '2021 Gubernatura Chihuahua', prediccion: 47.3, real: 46.1, error: 1.2, resultado: 'perdió', año: 2021 },
    { id: 6, eleccion: '2021 Alcaldía Puebla', prediccion: 53.2, real: 52.9, error: 0.3, resultado: 'ganó', año: 2021 },
    { id: 7, eleccion: '2020 Gubernatura Hidalgo', prediccion: 50.1, real: 49.8, error: 0.3, resultado: 'perdió', año: 2020 },
    { id: 8, eleccion: '2020 Alcaldía Querétaro', prediccion: 54.8, real: 55.2, error: -0.4, resultado: 'ganó', año: 2020 },
    { id: 9, eleccion: '2019 Gubernatura Baja California', prediccion: 48.2, real: 47.1, error: 1.1, resultado: 'perdió', año: 2019 },
    { id: 10, eleccion: '2019 Alcaldía León', prediccion: 51.9, real: 52.3, error: -0.4, resultado: 'ganó', año: 2019 }
  ],

  estadisticasHistoricas: {
    precisionPromedio: 94.2,
    errorAbsolutoPromedio: 1.2,
    tasaAcierto: 80,
    totalElecciones: 10,
    ganadas: 8,
    perdidas: 2
  },

  // ========== CASOS DE ERROR (LECCIONES APRENDIDAS) ==========
  casosError: [
    {
      id: 1,
      eleccion: 'Elección 2021 - Gubernatura Estado X',
      prediccion: 49.2,
      real: 47.8,
      error: 1.4,
      causa: 'Debate final tuvo impacto negativo no anticipado',
      leccion: 'Incorporar análisis de debates más granular'
    },
    {
      id: 2,
      eleccion: 'Elección 2022 - Alcaldía Ciudad Y',
      prediccion: 51.1,
      real: 52.8,
      error: -1.7,
      causa: 'Endorsement sorpresa de figura popular',
      leccion: 'Mejorar tracking de endorsements potenciales'
    }
  ],

  // ========== EVOLUCIÓN TEMPORAL DE PREDICCIÓN ==========
  evolucionCampana: [
    { dias: -90, prediccion: 42.1, evento: 'Inicio de campaña' },
    { dias: -75, prediccion: 43.8, evento: null },
    { dias: -60, prediccion: 45.4, evento: 'Anuncio de candidatura (+2.3%)' },
    { dias: -45, prediccion: 46.6, evento: 'Primer debate (+1.2%)' },
    { dias: -30, prediccion: 47.4, evento: 'Endorsement importante (+0.8%)' },
    { dias: -15, prediccion: 48.9, evento: 'Propuesta viral en redes (+1.5%)' },
    { dias: 0, prediccion: 48.3, evento: 'Hoy' }
  ],

  // ========== RECOMENDACIONES IA (MEJORADAS) ==========
  recomendaciones: [
    {
      id: '1',
      severidad: 'critical',
      prioridad: 'Alta',
      titulo: 'Reforzar presencia en Distrito 04 (Zona Norte)',
      descripcion: 'Distrito competido (48.7%, -0.2% esta semana)',
      situacion: 'Distrito competido con tendencia negativa',
      impactoPotencial: '+2.1% probabilidad victoria',
      confianza: 89,
      acciones: [
        'Organizar 3 eventos comunitarios en próximos 10 días',
        'Aumentar inversión digital targeting zona (+$450K)',
        'Activar red de voluntarios locales (280 contactos)',
        'Mensaje enfocado en tema #1 local: Seguridad vial'
      ],
      costoEstimado: 620000,
      tiempo: '2 semanas',
      roi: 'Alto'
    },
    {
      id: '2',
      severidad: 'high',
      prioridad: 'Alta',
      titulo: 'Capitalizar momento positivo en redes sociales',
      descripcion: 'Sentimiento +62%, trending topic #PropuestaEducacion',
      situacion: 'Momento viral favorable',
      impactoPotencial: '+0.8% votos',
      confianza: 85,
      acciones: [
        'Amplificar contenido educativo con inversión de $180K',
        'Coordinar AMA (Ask Me Anything) con influencers educativos',
        'Crear video explicativo de propuesta (inversión $45K)'
      ],
      costoEstimado: 225000,
      tiempo: '1 semana',
      roi: 'Medio-Alto'
    },
    {
      id: '3',
      severidad: 'medium',
      prioridad: 'Media',
      titulo: 'Preparación intensiva para próximo debate (en 7 días)',
      descripcion: 'Los debates tienen impacto de ±1.5% según análisis histórico',
      situacion: 'Evento de alto impacto próximo',
      impactoPotencial: '±1.5% votos',
      confianza: 78,
      acciones: [
        'Sesiones de preparación diarias',
        'Análisis de debilidades del oponente',
        'Preparar respuestas a temas controversiales'
      ],
      costoEstimado: 150000,
      tiempo: '7 días',
      roi: 'Alto'
    },
    {
      id: '4',
      severidad: 'medium',
      prioridad: 'Media',
      titulo: 'Aumentar presencia en segmento 30-44 años',
      descripcion: 'Segmento con bajo engagement pero alto potencial',
      situacion: 'Oportunidad demográfica',
      impactoPotencial: '+0.6% votos',
      confianza: 72,
      acciones: [
        'Contenido específico para este grupo',
        'Eventos en horarios accesibles',
        'Mensajes enfocados en economía familiar'
      ],
      costoEstimado: 320000,
      tiempo: '3 semanas',
      roi: 'Medio'
    },
    {
      id: '5',
      severidad: 'low',
      prioridad: 'Media',
      titulo: 'Contrarrestar narrativa negativa en medios tradicionales',
      descripcion: 'Cobertura negativa en 3 medios principales',
      situacion: 'Riesgo reputacional',
      impactoPotencial: '+0.4% votos',
      confianza: 68,
      acciones: [
        'Conferencia de prensa aclaratoria',
        'Entrevistas en medios clave',
        'Campaña de fact-checking'
      ],
      costoEstimado: 280000,
      tiempo: '2 semanas',
      roi: 'Medio'
    }
  ] as Recomendacion[],

  // ========== MÉTRICAS DEL MODELO ==========
  metricasModelo: {
    precision: 94.2,
    recall: 91.8,
    f1Score: 93.0,
    mae: 1.2,
    historicoAccuracy: [
      { eleccion: 'E1', accuracy: 94.5 },
      { eleccion: 'E2', accuracy: 95.2 },
      { eleccion: 'E3', accuracy: 96.1 },
      { eleccion: 'E4', accuracy: 93.8 },
      { eleccion: 'E5', accuracy: 94.7 },
      { eleccion: 'E6', accuracy: 95.3 },
      { eleccion: 'E7', accuracy: 93.2 },
      { eleccion: 'E8', accuracy: 94.9 },
      { eleccion: 'E9', accuracy: 91.3 },
      { eleccion: 'E10', accuracy: 94.2 }
    ],
    featuresImportantes: [
      { feature: 'Sentimiento público', peso: 0.28 },
      { feature: 'Resultados históricos', peso: 0.22 },
      { feature: 'Demografía', peso: 0.18 },
      { feature: 'Inversión en medios', peso: 0.15 },
      { feature: 'Eventos externos', peso: 0.12 },
      { feature: 'Endorsements', peso: 0.05 }
    ]
  },

  // Modelo activo (legacy)
  modelo: {
    nombre: 'Bayesiano Multi-variable',
    precision: 94.2,
    ultimaActualizacion: 'Hace 15 min'
  },

  // Tendencia (legacy)
  tendenciaProbabilidad: [
    { fecha: '01 Ene', probabilidad: 62.5 },
    { fecha: '05 Ene', probabilidad: 65.2 },
    { fecha: '10 Ene', probabilidad: 68.1 },
    { fecha: '15 Ene', probabilidad: 70.5 },
    { fecha: '20 Ene', probabilidad: 72.8 },
    { fecha: '25 Ene', probabilidad: 74.2 },
    { fecha: '30 Ene', probabilidad: 76.4 }
  ],

  // Escenarios (legacy)
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
  ]
}

import type { Oponente, TimelineEvent, Inconsistencia } from '@/types/research'
import type { Alert, TrendingTopic, Mention } from '@/types/monitor'
import type { Candidato, Distrito, Recomendacion } from '@/types/predict'

// ============================================
// RESEARCH DATA
// ============================================
export const researchData = {
  // Perfiles completos de oponentes
  oponentes: [
    {
      id: '1',
      nombre: 'Juan Antonio Pérez García',
      partido: 'Partido XYZ',
      foto: null,
      edad: 52,
      cargo: 'Senador de la República',
      experiencia: '15 años',
      scoreVulnerabilidad: 6.8,

      // Datos biográficos completos
      biografia: {
        nombreCompleto: 'Juan Antonio Pérez García',
        fechaNacimiento: '1972-03-15',
        edad: 52,
        lugarNacimiento: 'Guadalajara, Jalisco',
        estadoCivil: 'Casado',
        conyuge: 'María Elena Rodríguez',
        fechaMatrimonio: '1998-06-20',
        hijos: [
          { nombre: 'Ana Pérez Rodríguez', edad: 24 },
          { nombre: 'Carlos Pérez Rodríguez', edad: 21 },
          { nombre: 'Sofía Pérez Rodríguez', edad: 18 }
        ],
        educacion: [
          { grado: 'Licenciatura en Derecho', institucion: 'UNAM', periodo: '1990-1994' },
          { grado: 'Maestría en Administración Pública', institucion: 'ITAM', periodo: '1996-1998' },
          { grado: 'Diplomado en Política Internacional', institucion: 'Harvard Kennedy School', periodo: '2005' }
        ]
      },

      // Trayectoria política
      trayectoria: [
        { cargo: 'Senador de la República', periodo: '2018-2024', entidad: 'Jalisco' },
        { cargo: 'Diputado Federal', periodo: '2012-2015', distrito: '10 Jalisco' },
        { cargo: 'Secretario de Desarrollo Económico', periodo: '2009-2012', entidad: 'Jalisco' },
        { cargo: 'Director de Obras Públicas', periodo: '2006-2009', municipio: 'Guadalajara' }
      ],

      // Afiliaciones partidistas
      partidoActual: 'Partido XYZ',
      afiliacionDesde: '2005-01-15',
      posicionPartido: 'Miembro del Comité Ejecutivo Nacional',
      alianzas: [
        'Coordinador Caucus Económico',
        'Red de Alcaldes XYZ',
        'Grupo Parlamentario - Coordinador área económica'
      ],

      // Situación patrimonial
      patrimonio: {
        declaracion3de3: {
          total: 12400000,
          ultimaActualizacion: '2023-12-31',
          propiedades: [
            { tipo: 'Casa habitación', ubicacion: 'Guadalajara, Jalisco', valor: 3200000 },
            { tipo: 'Departamento', ubicacion: 'Ciudad de México', valor: 2800000 },
            { tipo: 'Terreno', ubicacion: 'Puerto Vallarta, Jalisco', valor: 1500000 }
          ],
          inversiones: 4900000,
          alertas: [
            'Incremento patrimonial 340% en últimos 6 años',
            'Adquisición de terreno coincide con obra pública aprobada'
          ]
        }
      },

      // Métricas clave
      nivelAmenaza: 8.0,
      vulnerabilidad: 6.8,
      popularidad: 42.7,
      tendenciaPopularidad: -1.2,
      sentimiento: 45,
      momentum: 4.2,
      alcanceMedios: 890000,
      engagement: 12300,
      seguidoresRedes: {
        twitter: 45000,
        facebook: 89000,
        instagram: 23000,
        tiktok: 5600
      },

      // Fortalezas detalladas
      fortalezas: [
        {
          titulo: 'Experiencia política consolidada',
          descripcion: '15 años en cargos públicos con conocimiento profundo del sistema',
          score: 9,
          impactoElectoral: 2.3,
          evidencia: ['Historial legislativo extenso', 'Red de contactos amplia', 'Conocimiento institucional'],
          estrategiaMitigacion: 'Resaltar necesidad de renovación y nuevas ideas'
        },
        {
          titulo: 'Base sólida en zona sur',
          descripcion: '58% de aprobación en Jalisco con alcaldes aliados en 12 municipios',
          score: 8,
          impactoElectoral: 1.8,
          evidencia: ['Obra pública visible', 'Relaciones con líderes locales', 'Inversión histórica en la región'],
          estrategiaMitigacion: 'Enfocar recursos en zonas norte y centro para contrarrestar'
        },
        {
          titulo: 'Reconocimiento de nombre',
          descripcion: '78% lo conocen en su estado, buena relación con medios tradicionales',
          score: 7,
          impactoElectoral: 1.1,
          evidencia: ['Cobertura mediática constante', 'Trayectoria conocida', 'Presencia en eventos públicos'],
          estrategiaMitigacion: 'Vincular su nombre a resultados negativos del pasado'
        },
        {
          titulo: 'Respaldo empresarial',
          descripcion: 'Fuerte apoyo del sector empresarial y cámaras de comercio',
          score: 7,
          impactoElectoral: 0.9,
          evidencia: ['Donaciones significativas', 'Eventos conjuntos', 'Agenda pro-empresarial'],
          estrategiaMitigacion: 'Exponer conflicto de intereses con grandes corporaciones'
        }
      ],

      // Debilidades detalladas
      debilidades: [
        {
          titulo: 'Escándalos de corrupción pasados',
          descripcion: 'Investigación por conflicto de interés en 2019 (archivada) y acusaciones de nepotismo',
          score: 8,
          impactoElectoral: -1.8,
          evidencia: ['Artículos periodísticos', 'Investigación archivada', 'Testimonios públicos'],
          estrategiaExplotacion: 'Revivir el caso con nueva evidencia visual y testimonios'
        },
        {
          titulo: 'Percepción de "vieja guardia"',
          descripcion: 'Considerado parte del establishment, dificultad conectando con votantes jóvenes',
          score: 7,
          impactoElectoral: -1.2,
          evidencia: ['Encuestas de percepción', 'Bajo engagement con menores de 35', 'Mensaje tradicional'],
          estrategiaExplotacion: 'Contrastar con imagen fresca y propuestas innovadoras'
        },
        {
          titulo: 'Presencia digital débil',
          descripcion: 'Solo 45K seguidores en Twitter, estrategia digital poco efectiva',
          score: 6,
          impactoElectoral: -0.9,
          evidencia: ['Métricas de redes sociales', 'Contenido poco viral', 'Baja interacción'],
          estrategiaExplotacion: 'Dominar la narrativa digital y saturar canales que el oponente ignora'
        },
        {
          titulo: 'Inconsistencias en posiciones',
          descripcion: '8 inconsistencias detectadas entre declaraciones y votos',
          score: 8,
          impactoElectoral: -1.5,
          evidencia: ['Registro legislativo', 'Declaraciones públicas', 'Análisis de IA'],
          estrategiaExplotacion: 'Publicar comparativas video/audio de contradicciones'
        }
      ],

      // Próximos eventos
      proximosEventos: [
        { fecha: '2024-02-12', tipo: 'Debate', descripcion: 'Debate televisado nacional', importancia: 'Alta' },
        { fecha: '2024-02-18', tipo: 'Entrevista', descripcion: 'Entrevista en Radio Fórmula', importancia: 'Media' },
        { fecha: '2024-02-25', tipo: 'Evento', descripcion: 'Cierre de campaña en Guadalajara', importancia: 'Alta' }
      ]
    },
    {
      id: '2',
      nombre: 'María Elena López Hernández',
      partido: 'Partido ABC',
      foto: null,
      edad: 45,
      cargo: 'Diputada Federal',
      experiencia: '8 años',
      scoreVulnerabilidad: 3.2,

      // Datos biográficos completos
      biografia: {
        nombreCompleto: 'María Elena López Hernández',
        fechaNacimiento: '1979-08-22',
        edad: 45,
        lugarNacimiento: 'Monterrey, Nuevo León',
        estadoCivil: 'Divorciada',
        conyuge: null,
        fechaMatrimonio: null,
        hijos: [
          { nombre: 'Diego López', edad: 15 }
        ],
        educacion: [
          { grado: 'Licenciatura en Ciencias Políticas', institucion: 'ITESM', periodo: '1997-2001' },
          { grado: 'Maestría en Políticas Públicas', institucion: 'Georgetown University', periodo: '2008-2010' }
        ]
      },

      // Trayectoria política
      trayectoria: [
        { cargo: 'Diputada Federal', periodo: '2021-2024', distrito: '5 Nuevo León' },
        { cargo: 'Regidora', periodo: '2018-2021', municipio: 'Monterrey' },
        { cargo: 'Directora de Participación Ciudadana', periodo: '2015-2018', entidad: 'Nuevo León' }
      ],

      // Afiliaciones partidistas
      partidoActual: 'Partido ABC',
      afiliacionDesde: '2015-03-10',
      posicionPartido: 'Secretaria de Acción Juvenil',
      alianzas: [
        'Red de Mujeres en Política',
        'Frente Progresista',
        'Colectivo de Jóvenes Legisladores'
      ],

      // Situación patrimonial
      patrimonio: {
        declaracion3de3: {
          total: 2800000,
          ultimaActualizacion: '2023-12-31',
          propiedades: [
            { tipo: 'Departamento', ubicacion: 'Monterrey, Nuevo León', valor: 1900000 }
          ],
          inversiones: 900000,
          alertas: []
        }
      },

      // Métricas clave
      nivelAmenaza: 4.5,
      vulnerabilidad: 3.2,
      popularidad: 28.3,
      tendenciaPopularidad: 0.8,
      sentimiento: 52,
      momentum: 6.7,
      alcanceMedios: 340000,
      engagement: 45600,
      seguidoresRedes: {
        twitter: 120000,
        facebook: 78000,
        instagram: 156000,
        tiktok: 89000
      },

      // Fortalezas detalladas
      fortalezas: [
        {
          titulo: 'Imagen fresca y renovación',
          descripcion: 'Representa cambio generacional, mensaje de renovación resuena con votantes',
          score: 8,
          impactoElectoral: 1.5,
          evidencia: ['Encuestas de percepción', 'Alto engagement con jóvenes', 'Narrativa de cambio'],
          estrategiaMitigacion: 'Cuestionar falta de experiencia y capacidad de gobernar'
        },
        {
          titulo: 'Fuerte presencia digital',
          descripcion: '120K seguidores Twitter, contenido viral frecuente, estrategia digital efectiva',
          score: 9,
          impactoElectoral: 1.2,
          evidencia: ['Métricas de redes', 'Contenido viral', 'Alta interacción'],
          estrategiaMitigacion: 'Inundar redes con contra-narrativa y fact-checking'
        },
        {
          titulo: 'Perfil limpio',
          descripcion: 'Sin escándalos, imagen de honestidad, difícil de atacar',
          score: 7,
          impactoElectoral: 0.8,
          evidencia: ['Historial limpio', 'Declaraciones patrimoniales transparentes'],
          estrategiaMitigacion: 'Investigar entorno cercano y equipo para encontrar vulnerabilidades indirectas'
        }
      ],

      // Debilidades detalladas
      debilidades: [
        {
          titulo: 'Poca experiencia política',
          descripcion: 'Solo 8 años en política, sin experiencia ejecutiva',
          score: 7,
          impactoElectoral: -1.3,
          evidencia: ['Trayectoria corta', 'Sin cargos ejecutivos', 'Cuestionamientos sobre capacidad'],
          estrategiaExplotacion: 'Enfatizar riesgos de inexperiencia en tiempos de crisis'
        },
        {
          titulo: 'Recursos limitados',
          descripcion: 'Financiamiento 3x menor que oponente principal',
          score: 6,
          impactoElectoral: -0.9,
          evidencia: ['Reportes de financiamiento', 'Menor presencia en medios tradicionales'],
          estrategiaExplotacion: 'Saturar medios masivos pagados donde ella no puede competir'
        },
        {
          titulo: 'Bajo reconocimiento',
          descripcion: 'Solo 34% la conoce fuera de Nuevo León',
          score: 8,
          impactoElectoral: -1.5,
          evidencia: ['Encuestas de reconocimiento', 'Cobertura mediática limitada'],
          estrategiaExplotacion: 'Definirla negativamente antes de que logre presentarse al electorado'
        }
      ],

      // Próximos eventos
      proximosEventos: [
        { fecha: '2024-02-14', tipo: 'Evento', descripcion: 'Foro juvenil en UANL', importancia: 'Media' },
        { fecha: '2024-02-20', tipo: 'Entrevista', descripcion: 'Podcast "Política Joven"', importancia: 'Media' }
      ]
    }
  ] as Oponente[],


  // Timeline expandido de posiciones y eventos (oponente 1: Juan Pérez)
  timeline: [
    // 2024
    { id: '1', oponenteId: '1', fecha: '2024-01-28', tipo: 'declaracion', titulo: 'Presenta plan integral de seguridad', descripcion: 'Anunció estrategia de 10 puntos para combatir inseguridad, incluyendo aumento de policías y tecnología', fuente: 'Conferencia de prensa', fuenteUrl: '#', cita: '"La seguridad es mi prioridad número uno, implementaremos un plan sin precedentes"', inconsistenciaFlag: false },
    { id: '2', oponenteId: '1', fecha: '2024-01-15', tipo: 'declaracion', titulo: 'A favor de la reforma fiscal', descripcion: 'Declaró apoyo total a la nueva reforma fiscal propuesta por el gobierno federal', fuente: 'Conferencia de prensa', fuenteUrl: '#', cita: '"Es momento de que todos contribuyamos equitativamente al desarrollo del país"', inconsistenciaFlag: true },
    { id: '3', oponenteId: '1', fecha: '2024-01-10', tipo: 'voto', titulo: 'Voto a favor de presupuesto de seguridad', descripcion: 'Votó afirmativo en el senado para aumentar presupuesto de seguridad en 15%', fuente: 'Senado de la República', fuenteUrl: '#', cita: null, inconsistenciaFlag: true },
    { id: '4', oponenteId: '1', fecha: '2024-01-05', tipo: 'evento', titulo: 'Gira por municipios del sur', descripcion: 'Visitó 8 municipios en 3 días, enfocándose en temas de desarrollo rural', fuente: 'Equipo de campaña', fuenteUrl: '#', asistencia: 12000, inconsistenciaFlag: false },

    // 2023
    { id: '5', oponenteId: '1', fecha: '2023-12-20', tipo: 'declaracion', titulo: 'Critica política de vivienda', descripcion: 'Expresó desacuerdo con el programa de vivienda social del gobierno actual', fuente: 'Entrevista Multimedios', fuenteUrl: '#', cita: '"El programa de vivienda ha sido un fracaso rotundo, necesitamos un nuevo enfoque"', inconsistenciaFlag: true },
    { id: '6', oponenteId: '1', fecha: '2023-12-10', tipo: 'evento', titulo: 'Foro empresarial en Monterrey', descripcion: 'Participó como ponente principal en foro de desarrollo económico', fuente: 'COPARMEX', fuenteUrl: '#', asistencia: 450, inconsistenciaFlag: false },
    { id: '7', oponenteId: '1', fecha: '2023-11-25', tipo: 'declaracion', titulo: 'Propone alianza público-privada para infraestructura', descripcion: 'Presentó iniciativa para atraer inversión privada en obras públicas', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '8', oponenteId: '1', fecha: '2023-11-15', tipo: 'evento', titulo: 'Reunión privada con empresarios', descripcion: 'Encuentro cerrado con líderes empresariales del norte del país', fuente: 'Reporte de medios', fuenteUrl: '#', asistencia: 35, inconsistenciaFlag: false },
    { id: '9', oponenteId: '1', fecha: '2023-10-30', tipo: 'voto', titulo: 'Aprueba ley de transparencia', descripcion: 'Votó a favor de nueva ley de transparencia y acceso a la información', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: true },
    { id: '10', oponenteId: '1', fecha: '2023-10-01', tipo: 'declaracion', titulo: 'Propuesta de aumentar policías 30%', descripcion: 'Anunció plan para incrementar significativamente la fuerza policial', fuente: 'Mitin político', fuenteUrl: '#', cita: '"Necesitamos 30% más policías en las calles para recuperar la seguridad"', inconsistenciaFlag: true },
    { id: '11', oponenteId: '1', fecha: '2023-09-15', tipo: 'evento', titulo: 'Inauguración de obra pública', descripcion: 'Inauguró hospital regional gestionado durante su periodo como secretario', fuente: 'Gobierno de Jalisco', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '12', oponenteId: '1', fecha: '2023-08-20', tipo: 'escandalo', titulo: 'Cuestionado por gastos excesivos', descripcion: 'Investigación periodística reveló gastos de representación superiores al promedio', fuente: 'El Norte', fuenteUrl: '#', inconsistenciaFlag: true },
    { id: '13', oponenteId: '1', fecha: '2023-08-05', tipo: 'declaracion', titulo: 'Defiende gestión como secretario', descripcion: 'Respondió a críticas sobre su periodo en el gobierno estatal', fuente: 'Twitter', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '14', oponenteId: '1', fecha: '2023-07-20', tipo: 'voto', titulo: 'Rechaza reforma laboral', descripcion: 'Votó en contra de modificaciones a la ley federal del trabajo', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '15', oponenteId: '1', fecha: '2023-06-30', tipo: 'evento', titulo: 'Asiste a cumbre internacional', descripcion: 'Participó en cumbre de legisladores en Washington DC', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '16', oponenteId: '1', fecha: '2023-05-20', tipo: 'declaracion', titulo: 'Compromiso con gobierno transparente', descripcion: 'Prometió implementar máximos estándares de transparencia si es electo', fuente: 'Campaña electoral', fuenteUrl: '#', cita: '"Mi gobierno será el más transparente de la historia"', inconsistenciaFlag: true },
    { id: '17', oponenteId: '1', fecha: '2023-04-15', tipo: 'evento', titulo: 'Foro sobre educación', descripcion: 'Organizó foro con maestros y académicos sobre reforma educativa', fuente: 'Senado de la República', fuenteUrl: '#', asistencia: 230, inconsistenciaFlag: false },
    { id: '18', oponenteId: '1', fecha: '2023-03-10', tipo: 'voto', titulo: 'Aprueba presupuesto educativo', descripcion: 'Votó a favor del presupuesto para educación pública', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '19', oponenteId: '1', fecha: '2023-02-28', tipo: 'declaracion', titulo: 'Propone reducción de impuestos a PYMES', descripcion: 'Presentó iniciativa para beneficiar a pequeñas y medianas empresas', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '20', oponenteId: '1', fecha: '2023-01-20', tipo: 'evento', titulo: 'Gira por zonas rurales', descripcion: 'Recorrió comunidades rurales escuchando necesidades de agricultores', fuente: 'Equipo senatorial', fuenteUrl: '#', inconsistenciaFlag: false },

    // 2022
    { id: '21', oponenteId: '1', fecha: '2022-12-15', tipo: 'declaracion', titulo: 'Anuncia precandidatura', descripcion: 'Oficialmente anunció su intención de buscar la gubernatura', fuente: 'Conferencia de prensa', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '22', oponenteId: '1', fecha: '2022-11-10', tipo: 'evento', titulo: 'Reunión con líderes sindicales', descripcion: 'Encuentro con representantes de sindicatos de trabajadores', fuente: 'Medios locales', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '23', oponenteId: '1', fecha: '2022-10-05', tipo: 'voto', titulo: 'Aprueba reforma de salud', descripcion: 'Votó a favor de modificaciones al sistema de salud pública', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '24', oponenteId: '1', fecha: '2022-09-20', tipo: 'declaracion', titulo: 'Critica manejo de pandemia', descripcion: 'Cuestionó decisiones del gobierno federal durante COVID-19', fuente: 'Entrevista televisiva', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '25', oponenteId: '1', fecha: '2022-08-15', tipo: 'evento', titulo: 'Inauguración de centro comunitario', descripcion: 'Inauguró instalaciones deportivas en zona marginada', fuente: 'Gobierno de Jalisco', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '26', oponenteId: '1', fecha: '2022-07-30', tipo: 'voto', titulo: 'Rechaza reforma energética', descripcion: 'Votó en contra de la reforma al sector energético', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '27', oponenteId: '1', fecha: '2022-06-15', tipo: 'voto', titulo: 'Voto contra reforma de impuestos', descripcion: 'Votó en contra de la reforma fiscal propuesta por el ejecutivo', fuente: 'Senado de la República', fuenteUrl: '#', cita: null, inconsistenciaFlag: true },
    { id: '28', oponenteId: '1', fecha: '2022-05-20', tipo: 'declaracion', titulo: 'Propone ley anticorrupción', descripcion: 'Presentó iniciativa para endurecer penas por corrupción', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '29', oponenteId: '1', fecha: '2022-04-10', tipo: 'evento', titulo: 'Foro de seguridad ciudadana', descripcion: 'Organizó foro con expertos en seguridad pública', fuente: 'Senado de la República', fuenteUrl: '#', asistencia: 180, inconsistenciaFlag: false },
    { id: '30', oponenteId: '1', fecha: '2022-03-10', tipo: 'declaracion', titulo: 'Fuerte crítica a aumento de impuestos', descripcion: 'Se pronunció enfáticamente contra cualquier incremento fiscal', fuente: 'Entrevista radio', fuenteUrl: '#', cita: '"Los impuestos ya son demasiado altos, no podemos seguir asfixiando a los contribuyentes"', inconsistenciaFlag: true },
    { id: '31', oponenteId: '1', fecha: '2022-02-15', tipo: 'voto', titulo: 'Aprueba presupuesto de infraestructura', descripcion: 'Votó a favor del presupuesto para obras públicas', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '32', oponenteId: '1', fecha: '2022-01-20', tipo: 'evento', titulo: 'Gira internacional', descripcion: 'Viaje de trabajo a España para estudiar políticas públicas', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },

    // 2021
    { id: '33', oponenteId: '1', fecha: '2021-12-10', tipo: 'declaracion', titulo: 'Balance legislativo del año', descripcion: 'Presentó informe de actividades legislativas', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '34', oponenteId: '1', fecha: '2021-11-15', tipo: 'voto', titulo: 'Aprueba ley de movilidad', descripcion: 'Votó a favor de nueva ley de movilidad sustentable', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '35', oponenteId: '1', fecha: '2021-10-20', tipo: 'evento', titulo: 'Reunión con sector agrícola', descripcion: 'Encuentro con productores agrícolas de Jalisco', fuente: 'Medios locales', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '36', oponenteId: '1', fecha: '2021-09-15', tipo: 'declaracion', titulo: 'Apoya programa de vivienda', descripcion: 'Expresó respaldo al programa federal de vivienda social', fuente: 'Declaraciones públicas', fuenteUrl: '#', cita: '"El programa de vivienda es fundamental para las familias mexicanas"', inconsistenciaFlag: true },
    { id: '37', oponenteId: '1', fecha: '2021-08-10', tipo: 'voto', titulo: 'Aprueba reforma electoral', descripcion: 'Votó a favor de modificaciones a la ley electoral', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '38', oponenteId: '1', fecha: '2021-07-05', tipo: 'evento', titulo: 'Inauguración de carretera', descripcion: 'Inauguró tramo carretero gestionado durante su periodo como secretario', fuente: 'Gobierno de Jalisco', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '39', oponenteId: '1', fecha: '2021-06-20', tipo: 'declaracion', titulo: 'Propone reforma de pensiones', descripcion: 'Presentó iniciativa para mejorar sistema de pensiones', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '40', oponenteId: '1', fecha: '2021-05-15', tipo: 'evento', titulo: 'Foro de desarrollo económico', descripcion: 'Participó en foro sobre reactivación económica post-pandemia', fuente: 'COPARMEX', fuenteUrl: '#', asistencia: 320, inconsistenciaFlag: false },

    // 2020
    { id: '41', oponenteId: '1', fecha: '2020-12-10', tipo: 'voto', titulo: 'Aprueba presupuesto 2021', descripcion: 'Votó a favor del presupuesto de egresos de la federación', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '42', oponenteId: '1', fecha: '2020-09-15', tipo: 'declaracion', titulo: 'Propone apoyo a empresas afectadas por COVID', descripcion: 'Presentó iniciativa para apoyar a empresas durante la pandemia', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '43', oponenteId: '1', fecha: '2020-06-20', tipo: 'evento', titulo: 'Donación de equipo médico', descripcion: 'Gestionó donación de equipo médico para hospitales', fuente: 'Medios locales', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '44', oponenteId: '1', fecha: '2020-03-15', tipo: 'declaracion', titulo: 'Llamado a unidad ante pandemia', descripcion: 'Hizo llamado a la unidad nacional frente a COVID-19', fuente: 'Twitter', fuenteUrl: '#', inconsistenciaFlag: false },

    // 2019
    { id: '45', oponenteId: '1', fecha: '2019-11-20', tipo: 'escandalo', titulo: 'Investigación por conflicto de interés', descripcion: 'Se abrió investigación por posible conflicto de interés en adjudicación de obra (posteriormente archivada)', fuente: 'Órgano interno de control', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '46', oponenteId: '1', fecha: '2019-08-10', tipo: 'voto', titulo: 'Aprueba reforma judicial', descripcion: 'Votó a favor de modificaciones al poder judicial', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false },
    { id: '47', oponenteId: '1', fecha: '2019-05-15', tipo: 'evento', titulo: 'Gira por universidades', descripcion: 'Visitó 5 universidades públicas dialogando con estudiantes', fuente: 'Equipo senatorial', fuenteUrl: '#', inconsistenciaFlag: false },

    // 2018
    { id: '48', oponenteId: '1', fecha: '2018-09-01', tipo: 'evento', titulo: 'Toma de protesta como senador', descripcion: 'Inició su periodo como senador de la república', fuente: 'Senado de la República', fuenteUrl: '#', inconsistenciaFlag: false }
  ] as TimelineEvent[],



  // Inconsistencias detectadas por IA
  inconsistencias: [
    {
      id: '1',
      oponenteId: '1',
      tema: 'Política Fiscal',
      severidad: 'critical',
      confianzaIA: 94,
      descripcion: 'Cambio radical de posición sobre reforma fiscal en menos de 2 años',

      // Posición 1
      fecha1: '2022-03-10',
      posicion1: 'Fuertemente en contra de aumentos fiscales',
      fuente1: 'Entrevista radio',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"Los impuestos ya son demasiado altos, no podemos seguir asfixiando a los contribuyentes"',
        contexto: 'Entrevista en programa matutino de radio',
        url: '#'
      },

      // Posición 2
      fecha2: '2024-01-15',
      posicion2: 'Totalmente a favor de reforma fiscal',
      fuente2: 'Conferencia de prensa',
      evidencia2: {
        tipo: 'declaracion',
        cita: '"Es momento de que todos contribuyamos equitativamente al desarrollo del país"',
        contexto: 'Conferencia de prensa oficial',
        url: '#'
      },

      // Análisis de IA
      analisisIA: {
        patron: 'Cambio de posición coincide con periodo electoral y necesidad de alinearse con gobierno federal',
        contextoAdicional: [
          'En 2022 votó contra reforma fiscal en el Senado',
          'Su partido cambió de postura oficial en 2023',
          'Principales donantes empresariales se oponen a reforma'
        ],
        factoresInfluyentes: [
          { factor: 'Presión del partido', peso: 0.7 },
          { factor: 'Cálculo electoral', peso: 0.8 },
          { factor: 'Donantes corporativos', peso: 0.6 }
        ]
      },

      // Impacto electoral
      impactoElectoral: -2.1,
      impactoDescripcion: 'Alto potencial de daño por percepción de oportunismo político',

      // Estrategia sugerida
      estrategiaSugerida: {
        prioridad: 'alta',
        acciones: [
          'Crear infografía comparativa con citas textuales',
          'Video corto para redes sociales (30 seg)',
          'Mencionar en debate: "¿Qué cambió en 2 años?"',
          'Artículo de opinión sobre inconsistencia'
        ],
        momentoOptimo: 'Durante debate sobre economía',
        riesgos: ['Puede argumentar "evolución de pensamiento"', 'Contexto económico cambió']
      }
    },
    {
      id: '2',
      oponenteId: '1',
      tema: 'Seguridad Pública',
      severidad: 'high',
      confianzaIA: 87,
      descripcion: 'Propuso aumento masivo de policías pero votó por presupuesto moderado',

      fecha1: '2023-10-01',
      posicion1: 'Propuesta de aumentar policías 30%',
      fuente1: 'Mitin político',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"Necesitamos 30% más policías en las calles para recuperar la seguridad"',
        contexto: 'Mitin de campaña en zona afectada por inseguridad',
        url: '#'
      },

      fecha2: '2024-01-10',
      posicion2: 'Votó por aumento moderado de presupuesto (15%)',
      fuente2: 'Senado de la República',
      evidencia2: {
        tipo: 'voto',
        cita: null,
        contexto: 'Votación en Senado sobre presupuesto de seguridad',
        url: '#'
      },

      analisisIA: {
        patron: 'Discurso populista en campaña vs. voto pragmático en legislatura',
        contextoAdicional: [
          'Presupuesto aprobado es insuficiente para cumplir promesa',
          'No presentó iniciativa para aumentar presupuesto',
          'Silencio en redes sobre la discrepancia'
        ],
        factoresInfluyentes: [
          { factor: 'Disciplina partidista', peso: 0.9 },
          { factor: 'Restricciones presupuestales', peso: 0.5 }
        ]
      },

      impactoElectoral: -1.4,
      impactoDescripcion: 'Moderado impacto, puede argumentar restricciones presupuestales',

      estrategiaSugerida: {
        prioridad: 'media',
        acciones: [
          'Contrastar promesa vs. voto en infografía',
          'Pregunta directa en debate: "¿Por qué no votó por lo que prometió?"',
          'Post en redes con video de promesa + resultado de voto'
        ],
        momentoOptimo: 'Durante discusión de seguridad pública',
        riesgos: ['Puede justificar con "responsabilidad fiscal"']
      }
    },
    {
      id: '3',
      oponenteId: '1',
      tema: 'Transparencia y Rendición de Cuentas',
      severidad: 'critical',
      confianzaIA: 91,
      descripcion: 'Promueve transparencia pero evadió cuestionamientos sobre gastos excesivos',

      fecha1: '2023-05-20',
      posicion1: 'Compromiso con máxima transparencia',
      fuente1: 'Campaña electoral',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"Mi gobierno será el más transparente de la historia"',
        contexto: 'Evento de campaña sobre anticorrupción',
        url: '#'
      },

      fecha2: '2023-08-20',
      posicion2: 'No respondió a cuestionamientos sobre gastos',
      fuente2: 'El Norte',
      evidencia2: {
        tipo: 'escandalo',
        cita: null,
        contexto: 'Investigación periodística sobre gastos de representación 340% superiores al promedio',
        url: '#'
      },

      analisisIA: {
        patron: 'Discurso de transparencia contradice comportamiento ante escrutinio',
        contextoAdicional: [
          'Gastos de representación: $890,000 vs. promedio $260,000',
          'No publicó desglose detallado',
          'Votó a favor de ley de transparencia 2 meses después del escándalo',
          'Equipo bloqueó solicitudes de información'
        ],
        factoresInfluyentes: [
          { factor: 'Protección de imagen', peso: 0.9 },
          { factor: 'Información comprometedora', peso: 0.7 }
        ]
      },

      impactoElectoral: -2.3,
      impactoDescripcion: 'Alto impacto por hipocresía evidente entre discurso y acción',

      estrategiaSugerida: {
        prioridad: 'crítica',
        acciones: [
          'Video comparativo: promesa vs. realidad',
          'Solicitar públicamente que publique desglose de gastos',
          'Artículo investigativo profundo',
          'Mencionar en cada debate sobre corrupción'
        ],
        momentoOptimo: 'Inmediatamente, tema de alta resonancia',
        riesgos: ['Puede contraatacar con "campaña de desprestigio"']
      }
    },
    {
      id: '4',
      oponenteId: '1',
      tema: 'Política de Vivienda',
      severidad: 'medium',
      confianzaIA: 82,
      descripcion: 'Apoyó programa de vivienda en 2021, lo critica duramente en 2023',

      fecha1: '2021-09-15',
      posicion1: 'Apoyo explícito al programa de vivienda',
      fuente1: 'Declaraciones públicas',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"El programa de vivienda es fundamental para las familias mexicanas"',
        contexto: 'Evento de inauguración de desarrollo habitacional',
        url: '#'
      },

      fecha2: '2023-12-20',
      posicion2: 'Crítica severa al mismo programa',
      fuente2: 'Entrevista Multimedios',
      evidencia2: {
        tipo: 'declaracion',
        cita: '"El programa de vivienda ha sido un fracaso rotundo, necesitamos un nuevo enfoque"',
        contexto: 'Entrevista televisiva',
        url: '#'
      },

      analisisIA: {
        patron: 'Cambio de narrativa coincide con cambio de administración',
        contextoAdicional: [
          'Programa es el mismo, solo cambió administración',
          'En 2021 su partido estaba en el gobierno',
          'En 2023 su partido está en oposición'
        ],
        factoresInfluyentes: [
          { factor: 'Alineación partidista', peso: 0.8 },
          { factor: 'Estrategia electoral', peso: 0.6 }
        ]
      },

      impactoElectoral: -0.9,
      impactoDescripcion: 'Moderado impacto, puede argumentar que programa se deterioró',

      estrategiaSugerida: {
        prioridad: 'media',
        acciones: [
          'Comparación visual de declaraciones',
          'Señalar que programa no cambió, solo administración',
          'Post en redes sobre oportunismo político'
        ],
        momentoOptimo: 'Durante discusión de políticas sociales',
        riesgos: ['Puede argumentar deterioro del programa']
      }
    },
    {
      id: '5',
      oponenteId: '1',
      tema: 'Relaciones con Empresarios',
      severidad: 'high',
      confianzaIA: 88,
      descripcion: 'Critica privilegios empresariales pero mantiene reuniones privadas frecuentes',

      fecha1: '2023-06-10',
      posicion1: 'Discurso contra privilegios empresariales',
      fuente1: 'Mitin popular',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"No más privilegios para unos cuantos, gobernaré para todos"',
        contexto: 'Mitin en zona popular',
        url: '#'
      },

      fecha2: '2023-11-15',
      posicion2: 'Reunión privada con élite empresarial',
      fuente2: 'Reporte de medios',
      evidencia2: {
        tipo: 'evento',
        cita: null,
        contexto: 'Encuentro cerrado con 35 líderes empresariales del norte',
        url: '#'
      },

      analisisIA: {
        patron: 'Doble discurso: populista en público, pro-empresarial en privado',
        contextoAdicional: [
          'Principales donantes son empresarios',
          'Votó a favor de iniciativas pro-empresariales',
          'Asistió a 8 eventos empresariales en 6 meses'
        ],
        factoresInfluyentes: [
          { factor: 'Financiamiento de campaña', peso: 0.9 },
          { factor: 'Estrategia de comunicación dual', peso: 0.7 }
        ]
      },

      impactoElectoral: -1.6,
      impactoDescripcion: 'Alto impacto con votantes populares si se expone adecuadamente',

      estrategiaSugerida: {
        prioridad: 'alta',
        acciones: [
          'Investigar y publicar lista de donantes empresariales',
          'Contrastar discurso populista vs. agenda pro-empresarial',
          'Video: "¿A quién representa realmente?"'
        ],
        momentoOptimo: 'Durante debate sobre economía popular',
        riesgos: ['Puede argumentar "diálogo con todos los sectores"']
      }
    },
    {
      id: '6',
      oponenteId: '1',
      tema: 'Medio Ambiente',
      severidad: 'medium',
      confianzaIA: 76,
      descripcion: 'Promovió proyecto de infraestructura en zona protegida que ahora critica',

      fecha1: '2011-03-20',
      posicion1: 'Promovió carretera en zona ecológica',
      fuente1: 'Gobierno de Jalisco',
      evidencia1: {
        tipo: 'proyecto',
        cita: null,
        contexto: 'Como Director de Obras Públicas aprobó proyecto controvertido',
        url: '#'
      },

      fecha2: '2023-09-10',
      posicion2: 'Critica proyectos que afectan medio ambiente',
      fuente2: 'Twitter',
      evidencia2: {
        tipo: 'declaracion',
        cita: '"Debemos proteger nuestras áreas naturales de proyectos depredadores"',
        contexto: 'Tweet sobre proyecto de otro gobierno',
        url: '#'
      },

      analisisIA: {
        patron: 'Critica en otros lo que él mismo hizo',
        contextoAdicional: [
          'Proyecto que aprobó generó protestas ambientales',
          'Ahora usa retórica ecologista',
          'No ha reconocido su rol en proyecto pasado'
        ],
        factoresInfluyentes: [
          { factor: 'Cambio de narrativa electoral', peso: 0.7 },
          { factor: 'Voto joven ecologista', peso: 0.6 }
        ]
      },

      impactoElectoral: -0.7,
      impactoDescripcion: 'Moderado impacto, proyecto es antiguo pero hipocresía es clara',

      estrategiaSugerida: {
        prioridad: 'baja',
        acciones: [
          'Recordar su historial ambiental',
          'Contrastar con retórica actual',
          'Compartir con grupos ambientalistas'
        ],
        momentoOptimo: 'Si surge tema ambiental en debate',
        riesgos: ['Puede argumentar "aprendizaje y evolución"']
      }
    },
    {
      id: '7',
      oponenteId: '1',
      tema: 'Nepotismo',
      severidad: 'high',
      confianzaIA: 85,
      descripcion: 'Critica nepotismo pero contrató familiares en su equipo senatorial',

      fecha1: '2022-08-15',
      posicion1: 'Discurso contra nepotismo',
      fuente1: 'Iniciativa legislativa',
      evidencia1: {
        tipo: 'iniciativa',
        cita: '"El nepotismo es una lacra que debemos erradicar del servicio público"',
        contexto: 'Presentación de iniciativa anticorrupción',
        url: '#'
      },

      fecha2: '2023-01-20',
      posicion2: 'Contrató a sobrino como asesor',
      fuente2: 'Nómina senatorial',
      evidencia2: {
        tipo: 'contratacion',
        cita: null,
        contexto: 'Carlos Pérez Rodríguez (sobrino) aparece en nómina con salario de $45,000/mes',
        url: '#'
      },

      analisisIA: {
        patron: 'Hipocresía directa: predica lo contrario de lo que practica',
        contextoAdicional: [
          'Sobrino sin experiencia previa en política',
          'Salario superior al promedio de asesores',
          'También contrató a cuñado en 2019'
        ],
        factoresInfluyentes: [
          { factor: 'Lealtad familiar', peso: 0.8 },
          { factor: 'Control de equipo', peso: 0.6 }
        ]
      },

      impactoElectoral: -1.9,
      impactoDescripcion: 'Alto impacto por hipocresía evidente y documentable',

      estrategiaSugerida: {
        prioridad: 'alta',
        acciones: [
          'Publicar nómina con nombres y parentesco',
          'Infografía: "Dice vs. Hace"',
          'Solicitar explicación pública',
          'Artículo investigativo sobre su equipo'
        ],
        momentoOptimo: 'Durante debate sobre corrupción',
        riesgos: ['Puede argumentar "capacidad profesional"']
      }
    },
    {
      id: '8',
      oponenteId: '1',
      tema: 'Austeridad',
      severidad: 'high',
      confianzaIA: 90,
      descripcion: 'Promueve austeridad pero tiene gastos de representación excesivos',

      fecha1: '2023-03-15',
      posicion1: 'Discurso de austeridad republicana',
      fuente1: 'Foro político',
      evidencia1: {
        tipo: 'declaracion',
        cita: '"Debemos gobernar con austeridad, cada peso cuenta"',
        contexto: 'Foro sobre responsabilidad fiscal',
        url: '#'
      },

      fecha2: '2023-08-20',
      posicion2: 'Gastos excesivos documentados',
      fuente2: 'El Norte - Investigación',
      evidencia2: {
        tipo: 'investigacion',
        cita: null,
        contexto: 'Gastos de $890,000 anuales vs. promedio de $260,000',
        url: '#'
      },

      analisisIA: {
        patron: 'Discurso de austeridad contradice comportamiento personal',
        contextoAdicional: [
          'Gastos incluyen viajes de lujo',
          'Comidas en restaurantes de alto nivel',
          'Hospedaje en hoteles 5 estrellas',
          'No justificó la diferencia con promedio'
        ],
        factoresInfluyentes: [
          { factor: 'Estilo de vida', peso: 0.8 },
          { factor: 'Sentido de privilegio', peso: 0.7 }
        ]
      },

      impactoElectoral: -2.0,
      impactoDescripcion: 'Alto impacto, especialmente con votantes de bajos ingresos',

      estrategiaSugerida: {
        prioridad: 'crítica',
        acciones: [
          'Desglose visual de gastos excesivos',
          'Comparación con salario mínimo',
          'Video: "La austeridad que no practica"',
          'Exigir rendición de cuentas detallada'
        ],
        momentoOptimo: 'Inmediatamente, alta resonancia popular',
        riesgos: ['Puede contraatacar con "trabajo intenso requiere recursos"']
      }
    }
  ] as Inconsistencia[],



  // Cobertura mediática expandida
  cobertura: {
    resumen: {
      total: 187,
      positivas: 52,
      neutrales: 98,
      negativas: 37,
      alcanceTotal: 2340000
    },
    porMedio: [
      { medio: 'El Norte', positivas: 15, neutrales: 32, negativas: 11, alcance: 450000, tono: 'neutral' },
      { medio: 'Multimedios', positivas: 18, neutrales: 28, negativas: 9, alcance: 380000, tono: 'ligeramente_positivo' },
      { medio: 'Milenio', positivas: 9, neutrales: 22, negativas: 8, alcance: 320000, tono: 'neutral' },
      { medio: 'El Universal', positivas: 4, neutrales: 12, negativas: 6, alcance: 560000, tono: 'ligeramente_negativo' },
      { medio: 'Reforma', positivas: 3, neutrales: 4, negativas: 3, alcance: 340000, tono: 'neutral' },
      { medio: 'Redes Sociales', positivas: 3, neutrales: 0, negativas: 0, alcance: 290000, tono: 'mixto' }
    ],
    periodistasClaves: [
      { nombre: 'Ana Martínez', medio: 'El Norte', handle: '@anamartinez_norte', tono: 'crítico', influencia: 8, seguidores: 89000 },
      { nombre: 'Carlos Gómez', medio: 'Multimedios', handle: '@carlosgomez_tv', tono: 'neutral', influencia: 7, seguidores: 120000 },
      { nombre: 'Laura Sánchez', medio: 'Milenio', handle: '@laurasanchez_mil', tono: 'favorable', influencia: 6, seguidores: 45000 },
      { nombre: 'Roberto Díaz', medio: 'El Universal', handle: '@robertodiaz_uni', tono: 'crítico', influencia: 9, seguidores: 234000 },
      { nombre: 'Patricia Ruiz', medio: 'Reforma', handle: '@patriciaruiz_ref', tono: 'neutral', influencia: 8, seguidores: 156000 }
    ],
    articulosRecientes: [
      // Últimos 40 artículos (el resto en researchDataExtended.ts)
      { id: 'art_001', oponenteId: '1', titulo: 'Pérez García presenta plan integral de seguridad', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2024-01-28', sentimiento: 'neutral', alcance: 45000, resumen: 'El senador presentó su estrategia de 10 puntos para combatir la inseguridad', url: '#', factCheck: null },
      { id: 'art_002', oponenteId: '1', titulo: 'Críticas a propuesta fiscal del candidato', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2024-01-25', sentimiento: 'negative', alcance: 32000, resumen: 'Economistas cuestionan viabilidad de reforma fiscal propuesta', url: '#', factCheck: 'verificado' },
      { id: 'art_003', oponenteId: '1', titulo: 'Evento multitudinario en zona sur', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2024-01-22', sentimiento: 'positive', alcance: 28000, resumen: 'Más de 5,000 personas asistieron al mitin en Guadalajara', url: '#', factCheck: null },
      { id: 'art_004', oponenteId: '1', titulo: 'Análisis: Las contradicciones del candidato', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2024-01-20', sentimiento: 'negative', alcance: 67000, resumen: 'Investigación revela inconsistencias entre declaraciones y votos', url: '#', factCheck: 'verificado' },
      { id: 'art_005', oponenteId: '1', titulo: 'Entrevista exclusiva sobre propuestas', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2024-01-18', sentimiento: 'neutral', alcance: 34000, resumen: 'El candidato detalla su plan de gobierno en entrevista de 45 minutos', url: '#', factCheck: null },
      { id: 'art_006', oponenteId: '1', titulo: 'Gira por municipios del interior', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2024-01-15', sentimiento: 'neutral', alcance: 23000, resumen: 'Visitó 8 municipios en 3 días escuchando necesidades locales', url: '#', factCheck: null },
      { id: 'art_007', oponenteId: '1', titulo: 'Apoyo empresarial al candidato', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2024-01-12', sentimiento: 'positive', alcance: 41000, resumen: 'Cámaras empresariales expresan respaldo a propuestas económicas', url: '#', factCheck: null },
      { id: 'art_008', oponenteId: '1', titulo: 'Cuestionan financiamiento de campaña', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2024-01-10', sentimiento: 'negative', alcance: 56000, resumen: 'Organizaciones civiles piden transparencia en donaciones', url: '#', factCheck: 'en_revision' },
      { id: 'art_009', oponenteId: '1', titulo: 'Propuesta educativa genera debate', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2024-01-08', sentimiento: 'neutral', alcance: 29000, resumen: 'Maestros y académicos discuten viabilidad de reforma propuesta', url: '#', factCheck: null },
      { id: 'art_010', oponenteId: '1', titulo: 'Encuesta muestra ligero avance', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2024-01-05', sentimiento: 'positive', alcance: 38000, resumen: 'Nueva encuesta coloca al candidato con 42.7% de intención de voto', url: '#', factCheck: 'verificado' },
      { id: 'art_011', oponenteId: '1', titulo: 'Balance del año legislativo', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-12-28', sentimiento: 'neutral', alcance: 31000, resumen: 'Senador presenta informe de actividades 2023', url: '#', factCheck: null },
      { id: 'art_012', oponenteId: '1', titulo: 'Critica programa de vivienda', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-12-20', sentimiento: 'neutral', alcance: 27000, resumen: 'Candidato cuestiona efectividad de política habitacional', url: '#', factCheck: null },
      { id: 'art_013', oponenteId: '1', titulo: 'Foro empresarial en Monterrey', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-12-15', sentimiento: 'positive', alcance: 35000, resumen: 'Participó como ponente principal en foro de COPARMEX', url: '#', factCheck: null },
      { id: 'art_014', oponenteId: '1', titulo: 'Alianzas políticas en construcción', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-12-10', sentimiento: 'neutral', alcance: 48000, resumen: 'Negociaciones con partidos aliados avanzan', url: '#', factCheck: null },
      { id: 'art_015', oponenteId: '1', titulo: 'Propone alianza público-privada', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-12-05', sentimiento: 'positive', alcance: 26000, resumen: 'Iniciativa busca atraer inversión privada en infraestructura', url: '#', factCheck: null },
      { id: 'art_016', oponenteId: '1', titulo: 'Reunión con empresarios del norte', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-11-25', sentimiento: 'neutral', alcance: 22000, resumen: 'Encuentro privado con líderes empresariales', url: '#', factCheck: null },
      { id: 'art_017', oponenteId: '1', titulo: 'Voto a favor de ley de transparencia', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-11-15', sentimiento: 'positive', alcance: 29000, resumen: 'Senador apoya nueva legislación anticorrupción', url: '#', factCheck: 'verificado' },
      { id: 'art_018', oponenteId: '1', titulo: 'Debate sobre seguridad pública', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-11-10', sentimiento: 'neutral', alcance: 52000, resumen: 'Candidato participa en foro sobre estrategias de seguridad', url: '#', factCheck: null },
      { id: 'art_019', oponenteId: '1', titulo: 'Propuesta de más policías genera dudas', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-11-05', sentimiento: 'negative', alcance: 34000, resumen: 'Expertos cuestionan viabilidad presupuestal de propuesta', url: '#', factCheck: 'verificado' },
      { id: 'art_020', oponenteId: '1', titulo: 'Gira por zonas rurales', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-11-01', sentimiento: 'neutral', alcance: 19000, resumen: 'Visitó comunidades agrícolas escuchando necesidades', url: '#', factCheck: null },
      { id: 'art_021', oponenteId: '1', titulo: 'Anuncia plan de seguridad', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-10-28', sentimiento: 'positive', alcance: 36000, resumen: 'Propone aumentar 30% la fuerza policial', url: '#', factCheck: null },
      { id: 'art_022', oponenteId: '1', titulo: 'Inauguración de hospital regional', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-10-20', sentimiento: 'positive', alcance: 28000, resumen: 'Obra gestionada durante su periodo como secretario', url: '#', factCheck: 'verificado' },
      { id: 'art_023', oponenteId: '1', titulo: 'Críticas a gestión anterior', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-10-15', sentimiento: 'negative', alcance: 45000, resumen: 'Organizaciones cuestionan obras realizadas', url: '#', factCheck: 'en_revision' },
      { id: 'art_024', oponenteId: '1', titulo: 'Foro sobre educación', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-10-10', sentimiento: 'neutral', alcance: 24000, resumen: 'Organizó encuentro con maestros y académicos', url: '#', factCheck: null },
      { id: 'art_025', oponenteId: '1', titulo: 'Aprueba presupuesto educativo', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-10-05', sentimiento: 'positive', alcance: 31000, resumen: 'Voto a favor de incremento para educación pública', url: '#', factCheck: 'verificado' },
      { id: 'art_026', oponenteId: '1', titulo: 'Propone reducción de impuestos a PYMES', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-09-25', sentimiento: 'positive', alcance: 33000, resumen: 'Iniciativa busca beneficiar a pequeñas empresas', url: '#', factCheck: null },
      { id: 'art_027', oponenteId: '1', titulo: 'Recorre comunidades rurales', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-09-18', sentimiento: 'neutral', alcance: 21000, resumen: 'Escuchó necesidades de agricultores y ganaderos', url: '#', factCheck: null },
      { id: 'art_028', oponenteId: '1', titulo: 'Anuncia precandidatura oficial', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-09-10', sentimiento: 'neutral', alcance: 58000, resumen: 'Confirma intención de buscar gubernatura', url: '#', factCheck: 'verificado' },
      { id: 'art_029', oponenteId: '1', titulo: 'Reunión con líderes sindicales', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-09-05', sentimiento: 'neutral', alcance: 26000, resumen: 'Encuentro con representantes de trabajadores', url: '#', factCheck: null },
      { id: 'art_030', oponenteId: '1', titulo: 'Aprueba reforma de salud', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-09-01', sentimiento: 'positive', alcance: 29000, resumen: 'Voto a favor de modificaciones al sistema de salud', url: '#', factCheck: 'verificado' },
      { id: 'art_031', oponenteId: '1', titulo: 'Escándalo por gastos excesivos', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-08-20', sentimiento: 'negative', alcance: 72000, resumen: 'Investigación revela gastos 340% superiores al promedio', url: '#', factCheck: 'verificado' },
      { id: 'art_032', oponenteId: '1', titulo: 'Defiende su gestión', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-08-15', sentimiento: 'neutral', alcance: 34000, resumen: 'Responde a críticas sobre gastos de representación', url: '#', factCheck: null },
      { id: 'art_033', oponenteId: '1', titulo: 'Inauguración de centro comunitario', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-08-10', sentimiento: 'positive', alcance: 25000, resumen: 'Instalaciones deportivas en zona marginada', url: '#', factCheck: 'verificado' },
      { id: 'art_034', oponenteId: '1', titulo: 'Rechaza reforma energética', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-08-05', sentimiento: 'neutral', alcance: 41000, resumen: 'Voto en contra de modificaciones al sector energético', url: '#', factCheck: 'verificado' },
      { id: 'art_035', oponenteId: '1', titulo: 'Critica manejo de pandemia', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-08-01', sentimiento: 'negative', alcance: 37000, resumen: 'Cuestiona decisiones del gobierno federal durante COVID-19', url: '#', factCheck: null },
      { id: 'art_036', oponenteId: '1', titulo: 'Voto contra reforma fiscal', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-07-20', sentimiento: 'neutral', alcance: 39000, resumen: 'Rechaza propuesta de modificación fiscal', url: '#', factCheck: 'verificado' },
      { id: 'art_037', oponenteId: '1', titulo: 'Propone ley anticorrupción', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-07-15', sentimiento: 'positive', alcance: 32000, resumen: 'Iniciativa para endurecer penas por corrupción', url: '#', factCheck: null },
      { id: 'art_038', oponenteId: '1', titulo: 'Foro de seguridad ciudadana', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-07-10', sentimiento: 'neutral', alcance: 27000, resumen: 'Organizó encuentro con expertos en seguridad', url: '#', factCheck: null },
      { id: 'art_039', oponenteId: '1', titulo: 'Fuerte crítica a aumento de impuestos', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-07-05', sentimiento: 'negative', alcance: 44000, resumen: 'Se pronuncia contra incrementos fiscales', url: '#', factCheck: 'verificado' },
      { id: 'art_040', oponenteId: '1', titulo: 'Aprueba presupuesto de infraestructura', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-07-01', sentimiento: 'positive', alcance: 28000, resumen: 'Voto a favor de recursos para obras públicas', url: '#', factCheck: 'verificado' }
    ]
  },

  // Red de conexiones (Network Graph)
  network: {
    oponenteId: '1',
    nodos: [
      // Nodo central
      { id: 'n_000', tipo: 'candidato', nombre: 'Juan Antonio Pérez García', categoria: 'político', importancia: 10 },

      // Conexiones políticas
      { id: 'n_001', tipo: 'político', nombre: 'Roberto Sánchez', cargo: 'Líder partidista', categoria: 'político', importancia: 8 },
      { id: 'n_002', tipo: 'político', nombre: 'María González', cargo: 'Senadora aliada', categoria: 'político', importancia: 7 },
      { id: 'n_003', tipo: 'político', nombre: 'Carlos Mendoza', cargo: 'Diputado federal', categoria: 'político', importancia: 6 },
      { id: 'n_004', tipo: 'político', nombre: 'Laura Ramírez', cargo: 'Alcaldesa Guadalajara', categoria: 'político', importancia: 7 },
      { id: 'n_005', tipo: 'político', nombre: 'Jorge Torres', cargo: 'Gobernador aliado', categoria: 'político', importancia: 8 },

      // Conexiones empresariales
      { id: 'n_006', tipo: 'empresario', nombre: 'Grupo Empresarial del Norte', cargo: 'Conglomerado', categoria: 'empresa', importancia: 9 },
      { id: 'n_007', tipo: 'empresario', nombre: 'Ricardo Fernández', cargo: 'CEO Constructora MX', categoria: 'empresa', importancia: 7 },
      { id: 'n_008', tipo: 'empresario', nombre: 'Patricia Morales', cargo: 'Presidenta COPARMEX', categoria: 'empresa', importancia: 6 },
      { id: 'n_009', tipo: 'empresario', nombre: 'Inversiones Jalisco SA', cargo: 'Fondo de inversión', categoria: 'empresa', importancia: 8 },
      { id: 'n_010', tipo: 'empresario', nombre: 'Alberto Guzmán', cargo: 'Desarrollador inmobiliario', categoria: 'empresa', importancia: 7 },

      // Conexiones familiares
      { id: 'n_011', tipo: 'familiar', nombre: 'María Elena Rodríguez', cargo: 'Esposa', categoria: 'familia', importancia: 5 },
      { id: 'n_012', tipo: 'familiar', nombre: 'Carlos Pérez Rodríguez', cargo: 'Sobrino/Asesor', categoria: 'familia', importancia: 4 },
      { id: 'n_013', tipo: 'familiar', nombre: 'Ana Pérez Rodríguez', cargo: 'Hija', categoria: 'familia', importancia: 3 },

      // Organizaciones
      { id: 'n_014', tipo: 'organizacion', nombre: 'Fundación Progreso', cargo: 'ONG', categoria: 'organizacion', importancia: 5 },
      { id: 'n_015', tipo: 'organizacion', nombre: 'Cámara de Comercio Jalisco', cargo: 'Asociación', categoria: 'organizacion', importancia: 6 },
      { id: 'n_016', tipo: 'organizacion', nombre: 'Sindicato de Trabajadores', cargo: 'Sindicato', categoria: 'organizacion', importancia: 5 },

      // Asesores y equipo
      { id: 'n_017', tipo: 'asesor', nombre: 'Miguel Ángel Ruiz', cargo: 'Estratega de campaña', categoria: 'equipo', importancia: 8 },
      { id: 'n_018', tipo: 'asesor', nombre: 'Sofía Martínez', cargo: 'Directora de comunicación', categoria: 'equipo', importancia: 7 },
      { id: 'n_019', tipo: 'asesor', nombre: 'Fernando López', cargo: 'Asesor legal', categoria: 'equipo', importancia: 6 },
      { id: 'n_020', tipo: 'asesor', nombre: 'Gabriela Hernández', cargo: 'Coordinadora de redes', categoria: 'equipo', importancia: 5 },

      // Medios de comunicación
      { id: 'n_021', tipo: 'medio', nombre: 'Grupo Multimedios', cargo: 'Corporativo mediático', categoria: 'medios', importancia: 7 },
      { id: 'n_022', tipo: 'medio', nombre: 'Carlos Gómez', cargo: 'Periodista', categoria: 'medios', importancia: 5 },

      // Conexiones controvertidas
      { id: 'n_023', tipo: 'empresario', nombre: 'Constructora Obras SA', cargo: 'Empresa constructora', categoria: 'empresa_conflicto', importancia: 8 },
      { id: 'n_024', tipo: 'empresario', nombre: 'Desarrollos Urbanos Inc', cargo: 'Desarrollador', categoria: 'empresa_conflicto', importancia: 7 }
    ],

    conexiones: [
      // Conexiones políticas
      { id: 'c_001', origen: 'n_000', destino: 'n_001', tipo: 'político', fuerza: 'fuerte', descripcion: 'Aliado estratégico del partido', conflicto: false },
      { id: 'c_002', origen: 'n_000', destino: 'n_002', tipo: 'político', fuerza: 'fuerte', descripcion: 'Colaboración legislativa', conflicto: false },
      { id: 'c_003', origen: 'n_000', destino: 'n_003', tipo: 'político', fuerza: 'media', descripcion: 'Coordinación parlamentaria', conflicto: false },
      { id: 'c_004', origen: 'n_000', destino: 'n_004', tipo: 'político', fuerza: 'fuerte', descripcion: 'Alianza municipal', conflicto: false },
      { id: 'c_005', origen: 'n_000', destino: 'n_005', tipo: 'político', fuerza: 'media', descripcion: 'Coordinación estatal', conflicto: false },

      // Conexiones empresariales
      { id: 'c_006', origen: 'n_000', destino: 'n_006', tipo: 'empresarial', fuerza: 'fuerte', descripcion: 'Principal donante de campaña', conflicto: true, detalleConflicto: 'Donación $2.5M, recibió contratos por $45M' },
      { id: 'c_007', origen: 'n_000', destino: 'n_007', tipo: 'empresarial', fuerza: 'fuerte', descripcion: 'Donante y contratista', conflicto: true, detalleConflicto: 'Donación $890K, contratos de obra pública $12M' },
      { id: 'c_008', origen: 'n_000', destino: 'n_008', tipo: 'empresarial', fuerza: 'media', descripcion: 'Relación institucional', conflicto: false },
      { id: 'c_009', origen: 'n_000', destino: 'n_009', tipo: 'empresarial', fuerza: 'fuerte', descripcion: 'Inversión en campaña', conflicto: true, detalleConflicto: 'Fondo invirtió $1.2M, beneficiado en licitaciones' },
      { id: 'c_010', origen: 'n_000', destino: 'n_010', tipo: 'empresarial', fuerza: 'media', descripcion: 'Donante menor', conflicto: false },

      // Conexiones familiares
      { id: 'c_011', origen: 'n_000', destino: 'n_011', tipo: 'familiar', fuerza: 'fuerte', descripcion: 'Cónyuge', conflicto: false },
      { id: 'c_012', origen: 'n_000', destino: 'n_012', tipo: 'familiar', fuerza: 'fuerte', descripcion: 'Sobrino contratado como asesor', conflicto: true, detalleConflicto: 'Nepotismo: salario $45K/mes sin experiencia' },
      { id: 'c_013', origen: 'n_000', destino: 'n_013', tipo: 'familiar', fuerza: 'media', descripcion: 'Hija', conflicto: false },

      // Conexiones con organizaciones
      { id: 'c_014', origen: 'n_000', destino: 'n_014', tipo: 'organizacion', fuerza: 'media', descripcion: 'Fundador y presidente honorario', conflicto: false },
      { id: 'c_015', origen: 'n_000', destino: 'n_015', tipo: 'organizacion', fuerza: 'fuerte', descripcion: 'Miembro activo', conflicto: false },
      { id: 'c_016', origen: 'n_000', destino: 'n_016', tipo: 'organizacion', fuerza: 'debil', descripcion: 'Relación tensa', conflicto: false },

      // Conexiones con equipo
      { id: 'c_017', origen: 'n_000', destino: 'n_017', tipo: 'profesional', fuerza: 'fuerte', descripcion: 'Estratega principal', conflicto: false },
      { id: 'c_018', origen: 'n_000', destino: 'n_018', tipo: 'profesional', fuerza: 'fuerte', descripcion: 'Directora de comunicación', conflicto: false },
      { id: 'c_019', origen: 'n_000', destino: 'n_019', tipo: 'profesional', fuerza: 'media', descripcion: 'Asesor legal', conflicto: false },
      { id: 'c_020', origen: 'n_000', destino: 'n_020', tipo: 'profesional', fuerza: 'media', descripcion: 'Coordinadora digital', conflicto: false },

      // Conexiones con medios
      { id: 'c_021', origen: 'n_000', destino: 'n_021', tipo: 'medios', fuerza: 'fuerte', descripcion: 'Relación cercana con corporativo', conflicto: false },
      { id: 'c_022', origen: 'n_000', destino: 'n_022', tipo: 'medios', fuerza: 'media', descripcion: 'Fuente frecuente', conflicto: false },

      // Conexiones controvertidas
      { id: 'c_023', origen: 'n_000', destino: 'n_023', tipo: 'empresarial', fuerza: 'fuerte', descripcion: 'Contratos durante gestión como secretario', conflicto: true, detalleConflicto: 'Adjudicación directa $23M sin licitación' },
      { id: 'c_024', origen: 'n_000', destino: 'n_024', tipo: 'empresarial', fuerza: 'media', descripcion: 'Compra de terreno coincide con obra pública', conflicto: true, detalleConflicto: 'Adquirió terreno 6 meses antes de anuncio de proyecto' }
    ],

    conflictosDetectados: [
      {
        id: 'conf_001',
        severidad: 'alta',
        tipo: 'quid_pro_quo',
        descripcion: 'Donación de campaña seguida de contratos públicos',
        involucrados: ['n_006', 'n_007', 'n_009'],
        montoTotal: 60500000,
        evidencia: 'Donaciones totales: $4.59M → Contratos otorgados: $60.5M',
        impactoElectoral: -2.4
      },
      {
        id: 'conf_002',
        severidad: 'alta',
        tipo: 'nepotismo',
        descripcion: 'Contratación de familiar sin experiencia con salario elevado',
        involucrados: ['n_012'],
        montoTotal: 540000,
        evidencia: 'Sobrino contratado: $45K/mes sin experiencia previa',
        impactoElectoral: -1.9
      },
      {
        id: 'conf_003',
        severidad: 'media',
        tipo: 'informacion_privilegiada',
        descripcion: 'Compra de terreno antes de anuncio de obra pública',
        involucrados: ['n_024'],
        montoTotal: 1500000,
        evidencia: 'Adquisición 6 meses antes de proyecto vial',
        impactoElectoral: -1.3
      }
    ]
  },

  // Datos de financiamiento
  financiamiento: {
    oponenteId: '1',

    resumen: {
      totalRecaudado: 45600000,
      totalGastado: 38900000,
      saldoActual: 6700000,
      periodo: '2023-01-01 a 2024-02-08',
      limiteGasto: 52000000,
      porcentajeUtilizado: 74.8
    },

    donantes: [
      { id: 'd_001', nombre: 'Grupo Empresarial del Norte', tipo: 'corporativo', monto: 2500000, fecha: '2023-06-15', sector: 'Construcción', conflicto: true, detalleConflicto: 'Recibió contratos por $45M' },
      { id: 'd_002', nombre: 'Inversiones Jalisco SA', tipo: 'corporativo', monto: 1200000, fecha: '2023-07-20', sector: 'Financiero', conflicto: true, detalleConflicto: 'Beneficiado en licitaciones' },
      { id: 'd_003', nombre: 'Ricardo Fernández', tipo: 'individual', monto: 890000, fecha: '2023-08-10', sector: 'Construcción', conflicto: true, detalleConflicto: 'CEO de empresa contratista' },
      { id: 'd_004', nombre: 'Desarrollos Urbanos Inc', tipo: 'corporativo', monto: 750000, fecha: '2023-09-05', sector: 'Inmobiliario', conflicto: false },
      { id: 'd_005', nombre: 'Cámara de Comercio Jalisco', tipo: 'organizacion', monto: 680000, fecha: '2023-05-12', sector: 'Comercio', conflicto: false },
      { id: 'd_006', nombre: 'Alberto Guzmán', tipo: 'individual', monto: 520000, fecha: '2023-10-18', sector: 'Inmobiliario', conflicto: false },
      { id: 'd_007', nombre: 'Transportes del Norte SA', tipo: 'corporativo', monto: 480000, fecha: '2023-06-25', sector: 'Transporte', conflicto: false },
      { id: 'd_008', nombre: 'Patricia Morales', tipo: 'individual', monto: 450000, fecha: '2023-07-30', sector: 'Empresarial', conflicto: false },
      { id: 'd_009', nombre: 'Grupo Hotelero Jalisco', tipo: 'corporativo', monto: 420000, fecha: '2023-08-22', sector: 'Turismo', conflicto: false },
      { id: 'd_010', nombre: 'Agroindustrias del Bajío', tipo: 'corporativo', monto: 380000, fecha: '2023-09-14', sector: 'Agroindustria', conflicto: false },
      { id: 'd_011', nombre: 'Tecnología y Sistemas SA', tipo: 'corporativo', monto: 350000, fecha: '2023-10-05', sector: 'Tecnología', conflicto: false },
      { id: 'd_012', nombre: 'Jorge Torres', tipo: 'individual', monto: 320000, fecha: '2023-11-12', sector: 'Político', conflicto: false },
      { id: 'd_013', nombre: 'Minera del Pacífico', tipo: 'corporativo', monto: 290000, fecha: '2023-06-08', sector: 'Minería', conflicto: false },
      { id: 'd_014', nombre: 'Farmacéutica Nacional', tipo: 'corporativo', monto: 270000, fecha: '2023-12-03', sector: 'Salud', conflicto: false },
      { id: 'd_015', nombre: 'Medios del Centro', tipo: 'corporativo', monto: 250000, fecha: '2023-07-17', sector: 'Medios', conflicto: false },
      { id: 'd_016', nombre: 'Automotriz Jalisco', tipo: 'corporativo', monto: 230000, fecha: '2023-08-29', sector: 'Automotriz', conflicto: false },
      { id: 'd_017', nombre: 'Energía Renovable MX', tipo: 'corporativo', monto: 210000, fecha: '2023-09-21', sector: 'Energía', conflicto: false },
      { id: 'd_018', nombre: 'Textiles del Norte', tipo: 'corporativo', monto: 190000, fecha: '2023-10-27', sector: 'Textil', conflicto: false },
      { id: 'd_019', nombre: 'Alimentos Procesados SA', tipo: 'corporativo', monto: 170000, fecha: '2023-11-19', sector: 'Alimentos', conflicto: false },
      { id: 'd_020', nombre: 'Servicios Financieros GDL', tipo: 'corporativo', monto: 150000, fecha: '2023-12-28', sector: 'Financiero', conflicto: false }
    ],

    porTipo: {
      corporativo: { monto: 32400000, porcentaje: 71.1, cantidad: 145 },
      individual: { monto: 11200000, porcentaje: 24.6, cantidad: 89 },
      organizacion: { monto: 2000000, porcentaje: 4.4, cantidad: 12 }
    },

    porSector: [
      { sector: 'Construcción', monto: 12800000, porcentaje: 28.1 },
      { sector: 'Financiero', monto: 8900000, porcentaje: 19.5 },
      { sector: 'Inmobiliario', monto: 6700000, porcentaje: 14.7 },
      { sector: 'Comercio', monto: 4500000, porcentaje: 9.9 },
      { sector: 'Turismo', monto: 3200000, porcentaje: 7.0 },
      { sector: 'Agroindustria', monto: 2800000, porcentaje: 6.1 },
      { sector: 'Tecnología', monto: 2100000, porcentaje: 4.6 },
      { sector: 'Otros', monto: 4600000, porcentaje: 10.1 }
    ],

    banderasRojas: [
      {
        id: 'br_001',
        tipo: 'donante_excesivo',
        severidad: 'alta',
        descripcion: 'Grupo Empresarial del Norte excede límite individual',
        donante: 'd_001',
        monto: 2500000,
        limite: 2000000,
        exceso: 500000
      },
      {
        id: 'br_002',
        tipo: 'quid_pro_quo',
        severidad: 'crítica',
        descripcion: 'Patrón de donación → contrato en múltiples casos',
        donantes: ['d_001', 'd_002', 'd_003'],
        montoTotal: 4590000,
        contratosOtorgados: 60500000,
        ratio: 13.2
      },
      {
        id: 'br_003',
        tipo: 'timing_sospechoso',
        severidad: 'media',
        descripcion: 'Donaciones masivas 1 semana antes de licitación',
        fecha: '2023-09-01',
        montoTotal: 1890000,
        licitacion: 'Carretera Norte-Sur'
      },
      {
        id: 'br_004',
        tipo: 'fraccionamiento',
        severidad: 'media',
        descripcion: 'Múltiples donaciones pequeñas del mismo origen',
        donante: 'Grupo Empresarial del Norte (subsidiarias)',
        montoTotal: 890000,
        numeroTransacciones: 12
      }
    ],

    gastos: [
      { categoria: 'Publicidad TV/Radio', monto: 15600000, porcentaje: 40.1 },
      { categoria: 'Publicidad Digital', monto: 8900000, porcentaje: 22.9 },
      { categoria: 'Eventos y logística', monto: 6700000, porcentaje: 17.2 },
      { categoria: 'Personal de campaña', monto: 4200000, porcentaje: 10.8 },
      { categoria: 'Materiales impresos', monto: 2100000, porcentaje: 5.4 },
      { categoria: 'Encuestas y estudios', monto: 1400000, porcentaje: 3.6 }
    ]
  },

  // Comparación entre candidatos
  comparacion: {
    candidatos: ['Juan Antonio Pérez García', 'María Elena López Hernández', 'Tu Candidato'],

    metricas: {
      intencionVoto: [42.7, 28.3, 29.0],
      popularidad: [42.7, 28.3, 35.2],
      sentimiento: [45, 52, 68],
      experienciaPolitica: [15, 8, 12],
      edad: [52, 45, 48],
      seguidoresDigitales: [162600, 443000, 234000],
      financiamiento: [45600000, 15200000, 28900000],
      alcanceMedios: [890000, 340000, 560000],
      inconsistencias: [8, 2, 1],
      escandalos: [3, 0, 0]
    },

    posicionamiento: [
      { candidato: 'Juan Antonio Pérez García', vulnerabilidad: 6.8, fortaleza: 7.2, x: 6.8, y: 7.2 },
      { candidato: 'María Elena López Hernández', vulnerabilidad: 3.2, fortaleza: 5.8, x: 3.2, y: 5.8 },
      { candidato: 'Tu Candidato', vulnerabilidad: 2.1, fortaleza: 8.5, x: 2.1, y: 8.5 }
    ],

    recomendaciones: [
      {
        prioridad: 'crítica',
        accion: 'Explotar inconsistencias de Pérez García',
        descripcion: 'Usar las 8 inconsistencias detectadas en debates y publicidad',
        impactoEstimado: 3.2
      },
      {
        prioridad: 'alta',
        accion: 'Contrastar experiencia vs. escándalos',
        descripcion: 'Posicionar experiencia limpia vs. experiencia cuestionable',
        impactoEstimado: 2.8
      },
      {
        prioridad: 'alta',
        accion: 'Capitalizar ventaja en redes vs. López',
        descripcion: 'Aprovechar mayor alcance digital para llegar a jóvenes',
        impactoEstimado: 1.9
      },
      {
        prioridad: 'media',
        accion: 'Destacar transparencia financiera',
        descripcion: 'Contrastar financiamiento limpio vs. conflictos de interés',
        impactoEstimado: 1.5
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
