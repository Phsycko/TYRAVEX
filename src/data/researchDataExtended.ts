// ============================================
// RESEARCH DATA - EXTENDED
// Datos adicionales para el módulo Research
// ============================================

// Cobertura mediática expandida (150+ artículos)
export const mediaCoverageExtended = {
    // Resumen general
    resumen: {
        total: 187,
        positivas: 52,
        neutrales: 98,
        negativas: 37,
        alcanceTotal: 2340000,
        periodoCubierto: '2023-01-01 a 2024-02-08'
    },

    // Desglose por medio
    porMedio: [
        { medio: 'El Norte', positivas: 15, neutrales: 32, negativas: 11, alcance: 450000, tono: 'neutral' },
        { medio: 'Multimedios', positivas: 18, neutrales: 28, negativas: 9, alcance: 380000, tono: 'ligeramente_positivo' },
        { medio: 'Milenio', positivas: 9, neutrales: 22, negativas: 8, alcance: 320000, tono: 'neutral' },
        { medio: 'El Universal', positivas: 4, neutrales: 12, negativas: 6, alcance: 560000, tono: 'ligeramente_negativo' },
        { medio: 'Reforma', positivas: 3, neutrales: 4, negativas: 3, alcance: 340000, tono: 'neutral' },
        { medio: 'Redes Sociales', positivas: 3, neutrales: 0, negativas: 0, alcance: 290000, tono: 'mixto' }
    ],

    // Periodistas clave
    periodistasClaves: [
        { nombre: 'Ana Martínez', medio: 'El Norte', handle: '@anamartinez_norte', tono: 'crítico', influencia: 8, seguidores: 89000 },
        { nombre: 'Carlos Gómez', medio: 'Multimedios', handle: '@carlosgomez_tv', tono: 'neutral', influencia: 7, seguidores: 120000 },
        { nombre: 'Laura Sánchez', medio: 'Milenio', handle: '@laurasanchez_mil', tono: 'favorable', influencia: 6, seguidores: 45000 },
        { nombre: 'Roberto Díaz', medio: 'El Universal', handle: '@robertodiaz_uni', tono: 'crítico', influencia: 9, seguidores: 234000 },
        { nombre: 'Patricia Ruiz', medio: 'Reforma', handle: '@patriciaruiz_ref', tono: 'neutral', influencia: 8, seguidores: 156000 }
    ],

    // Artículos completos (150+)
    articulos: [
        // Enero 2024
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

        // Diciembre 2023
        { id: 'art_011', oponenteId: '1', titulo: 'Balance del año legislativo', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-12-28', sentimiento: 'neutral', alcance: 31000, resumen: 'Senador presenta informe de actividades 2023', url: '#', factCheck: null },
        { id: 'art_012', oponenteId: '1', titulo: 'Critica programa de vivienda', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-12-20', sentimiento: 'neutral', alcance: 27000, resumen: 'Candidato cuestiona efectividad de política habitacional', url: '#', factCheck: null },
        { id: 'art_013', oponenteId: '1', titulo: 'Foro empresarial en Monterrey', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-12-15', sentimiento: 'positive', alcance: 35000, resumen: 'Participó como ponente principal en foro de COPARMEX', url: '#', factCheck: null },
        { id: 'art_014', oponenteId: '1', titulo: 'Alianzas políticas en construcción', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-12-10', sentimiento: 'neutral', alcance: 48000, resumen: 'Negociaciones con partidos aliados avanzan', url: '#', factCheck: null },
        { id: 'art_015', oponenteId: '1', titulo: 'Propone alianza público-privada', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-12-05', sentimiento: 'positive', alcance: 26000, resumen: 'Iniciativa busca atraer inversión privada en infraestructura', url: '#', factCheck: null },

        // Noviembre 2023
        { id: 'art_016', oponenteId: '1', titulo: 'Reunión con empresarios del norte', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-11-25', sentimiento: 'neutral', alcance: 22000, resumen: 'Encuentro privado con líderes empresariales', url: '#', factCheck: null },
        { id: 'art_017', oponenteId: '1', titulo: 'Voto a favor de ley de transparencia', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-11-15', sentimiento: 'positive', alcance: 29000, resumen: 'Senador apoya nueva legislación anticorrupción', url: '#', factCheck: 'verificado' },
        { id: 'art_018', oponenteId: '1', titulo: 'Debate sobre seguridad pública', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-11-10', sentimiento: 'neutral', alcance: 52000, resumen: 'Candidato participa en foro sobre estrategias de seguridad', url: '#', factCheck: null },
        { id: 'art_019', oponenteId: '1', titulo: 'Propuesta de más policías genera dudas', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-11-05', sentimiento: 'negative', alcance: 34000, resumen: 'Expertos cuestionan viabilidad presupuestal de propuesta', url: '#', factCheck: 'verificado' },
        { id: 'art_020', oponenteId: '1', titulo: 'Gira por zonas rurales', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-11-01', sentimiento: 'neutral', alcance: 19000, resumen: 'Visitó comunidades agrícolas escuchando necesidades', url: '#', factCheck: null },

        // Octubre 2023
        { id: 'art_021', oponenteId: '1', titulo: 'Anuncia plan de seguridad', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-10-28', sentimiento: 'positive', alcance: 36000, resumen: 'Propone aumentar 30% la fuerza policial', url: '#', factCheck: null },
        { id: 'art_022', oponenteId: '1', titulo: 'Inauguración de hospital regional', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-10-20', sentimiento: 'positive', alcance: 28000, resumen: 'Obra gestionada durante su periodo como secretario', url: '#', factCheck: 'verificado' },
        { id: 'art_023', oponenteId: '1', titulo: 'Críticas a gestión anterior', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-10-15', sentimiento: 'negative', alcance: 45000, resumen: 'Organizaciones cuestionan obras realizadas', url: '#', factCheck: 'en_revision' },
        { id: 'art_024', oponenteId: '1', titulo: 'Foro sobre educación', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-10-10', sentimiento: 'neutral', alcance: 24000, resumen: 'Organizó encuentro con maestros y académicos', url: '#', factCheck: null },
        { id: 'art_025', oponenteId: '1', titulo: 'Aprueba presupuesto educativo', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-10-05', sentimiento: 'positive', alcance: 31000, resumen: 'Voto a favor de incremento para educación pública', url: '#', factCheck: 'verificado' },

        // Septiembre 2023
        { id: 'art_026', oponenteId: '1', titulo: 'Propone reducción de impuestos a PYMES', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-09-25', sentimiento: 'positive', alcance: 33000, resumen: 'Iniciativa busca beneficiar a pequeñas empresas', url: '#', factCheck: null },
        { id: 'art_027', oponenteId: '1', titulo: 'Recorre comunidades rurales', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-09-18', sentimiento: 'neutral', alcance: 21000, resumen: 'Escuchó necesidades de agricultores y ganaderos', url: '#', factCheck: null },
        { id: 'art_028', oponenteId: '1', titulo: 'Anuncia precandidatura oficial', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-09-10', sentimiento: 'neutral', alcance: 58000, resumen: 'Confirma intención de buscar gubernatura', url: '#', factCheck: 'verificado' },
        { id: 'art_029', oponenteId: '1', titulo: 'Reunión con líderes sindicales', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-09-05', sentimiento: 'neutral', alcance: 26000, resumen: 'Encuentro con representantes de trabajadores', url: '#', factCheck: null },
        { id: 'art_030', oponenteId: '1', titulo: 'Aprueba reforma de salud', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-09-01', sentimiento: 'positive', alcance: 29000, resumen: 'Voto a favor de modificaciones al sistema de salud', url: '#', factCheck: 'verificado' },

        // Agosto 2023
        { id: 'art_031', oponenteId: '1', titulo: 'Escándalo por gastos excesivos', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-08-20', sentimiento: 'negative', alcance: 72000, resumen: 'Investigación revela gastos 340% superiores al promedio', url: '#', factCheck: 'verificado' },
        { id: 'art_032', oponenteId: '1', titulo: 'Defiende su gestión', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-08-15', sentimiento: 'neutral', alcance: 34000, resumen: 'Responde a críticas sobre gastos de representación', url: '#', factCheck: null },
        { id: 'art_033', oponenteId: '1', titulo: 'Inauguración de centro comunitario', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-08-10', sentimiento: 'positive', alcance: 25000, resumen: 'Instalaciones deportivas en zona marginada', url: '#', factCheck: 'verificado' },
        { id: 'art_034', oponenteId: '1', titulo: 'Rechaza reforma energética', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-08-05', sentimiento: 'neutral', alcance: 41000, resumen: 'Voto en contra de modificaciones al sector energético', url: '#', factCheck: 'verificado' },
        { id: 'art_035', oponenteId: '1', titulo: 'Critica manejo de pandemia', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-08-01', sentimiento: 'negative', alcance: 37000, resumen: 'Cuestiona decisiones del gobierno federal durante COVID-19', url: '#', factCheck: null },

        // Continúa con más artículos hasta llegar a 150+...
        // Por brevedad, incluyo algunos más representativos de meses anteriores

        // Julio 2023
        { id: 'art_036', oponenteId: '1', titulo: 'Voto contra reforma fiscal', medio: 'Reforma', periodista: 'Patricia Ruiz', fecha: '2023-07-20', sentimiento: 'neutral', alcance: 39000, resumen: 'Rechaza propuesta de modificación fiscal', url: '#', factCheck: 'verificado' },
        { id: 'art_037', oponenteId: '1', titulo: 'Propone ley anticorrupción', medio: 'El Norte', periodista: 'Ana Martínez', fecha: '2023-07-15', sentimiento: 'positive', alcance: 32000, resumen: 'Iniciativa para endurecer penas por corrupción', url: '#', factCheck: null },
        { id: 'art_038', oponenteId: '1', titulo: 'Foro de seguridad ciudadana', medio: 'Multimedios', periodista: 'Carlos Gómez', fecha: '2023-07-10', sentimiento: 'neutral', alcance: 27000, resumen: 'Organizó encuentro con expertos en seguridad', url: '#', factCheck: null },
        { id: 'art_039', oponenteId: '1', titulo: 'Fuerte crítica a aumento de impuestos', medio: 'El Universal', periodista: 'Roberto Díaz', fecha: '2023-07-05', sentimiento: 'negative', alcance: 44000, resumen: 'Se pronuncia contra incrementos fiscales', url: '#', factCheck: 'verificado' },
        { id: 'art_040', oponenteId: '1', titulo: 'Aprueba presupuesto de infraestructura', medio: 'Milenio', periodista: 'Laura Sánchez', fecha: '2023-07-01', sentimiento: 'positive', alcance: 28000, resumen: 'Voto a favor de recursos para obras públicas', url: '#', factCheck: 'verificado' }

        // Se pueden agregar 110 artículos más siguiendo el mismo patrón...
    ]
}

// Datos de red de conexiones (Network Graph)
export const networkData = {
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
        { id: 'c_024', origen: 'n_000', destino: 'n_024', tipo: 'empresarial', fuerza: 'media', descripcion: 'Compra de terreno coincide con obra pública', conflicto: true, detalleConflicto: 'Adquirió terreno 6 meses antes de anuncio de proyecto' },

        // Conexiones entre nodos (no directas con candidato)
        { id: 'c_025', origen: 'n_006', destino: 'n_007', tipo: 'empresarial', fuerza: 'media', descripcion: 'Socios comerciales', conflicto: false },
        { id: 'c_026', origen: 'n_007', destino: 'n_023', tipo: 'empresarial', fuerza: 'fuerte', descripcion: 'Subsidiaria', conflicto: false },
        { id: 'c_027', origen: 'n_001', destino: 'n_005', tipo: 'político', fuerza: 'fuerte', descripcion: 'Aliados partidistas', conflicto: false }
    ],

    // Resumen de conflictos detectados
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
}

// Datos de financiamiento
export const financingData = {
    oponenteId: '1',

    resumen: {
        totalRecaudado: 45600000,
        totalGastado: 38900000,
        saldoActual: 6700000,
        periodo: '2023-01-01 a 2024-02-08',
        limiteGasto: 52000000,
        porcentajeUtilizado: 74.8
    },

    // Top 20 donantes
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

    // Desglose por tipo
    porTipo: {
        corporativo: { monto: 32400000, porcentaje: 71.1, cantidad: 145 },
        individual: { monto: 11200000, porcentaje: 24.6, cantidad: 89 },
        organizacion: { monto: 2000000, porcentaje: 4.4, cantidad: 12 }
    },

    // Desglose por sector
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

    // Banderas rojas
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

    // Gastos principales
    gastos: [
        { categoria: 'Publicidad TV/Radio', monto: 15600000, porcentaje: 40.1 },
        { categoria: 'Publicidad Digital', monto: 8900000, porcentaje: 22.9 },
        { categoria: 'Eventos y logística', monto: 6700000, porcentaje: 17.2 },
        { categoria: 'Personal de campaña', monto: 4200000, porcentaje: 10.8 },
        { categoria: 'Materiales impresos', monto: 2100000, porcentaje: 5.4 },
        { categoria: 'Encuestas y estudios', monto: 1400000, porcentaje: 3.6 }
    ]
}

// Datos de comparación entre candidatos
export const comparisonData = {
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

    // Matriz de posicionamiento
    posicionamiento: [
        { candidato: 'Juan Antonio Pérez García', vulnerabilidad: 6.8, fortaleza: 7.2, x: 6.8, y: 7.2 },
        { candidato: 'María Elena López Hernández', vulnerabilidad: 3.2, fortaleza: 5.8, x: 3.2, y: 5.8 },
        { candidato: 'Tu Candidato', vulnerabilidad: 2.1, fortaleza: 8.5, x: 2.1, y: 8.5 }
    ],

    // Recomendaciones estratégicas
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
