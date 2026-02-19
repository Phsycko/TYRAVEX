export interface Oponente {
    id: string
    nombre: string
    partido: string
    foto: string | null
    edad: number
    cargo: string
    experiencia: string
    popularidad: number
    sentimiento: number
    nivelAmenaza: number
    scoreVulnerabilidad: number
    fortalezas: Fortaleza[]
    debilidades: Debilidad[]
    biografia?: Biografia
    alcanceDigital?: AlcanceDigital
}

export interface Fortaleza {
    titulo: string
    descripcion: string
    score: number
    impactoElectoral: number
    evidencia: string[]
    estrategiaMitigacion: string
}

export interface Debilidad {
    titulo: string
    descripcion: string
    score: number
    impactoElectoral: number
    evidencia: string[]
    estrategiaExplotacion: string
}

export interface Biografia {
    fechaNacimiento: string
    lugarNacimiento: string
    estadoCivil: string
    familia: string
    educacion: Educacion[]
    trayectoriaPolitica: TrayectoriaPolitica[]
    partidoActual: string
    posicionPartido: string
    alianzas: string[]
    situacionPatrimonial: SituacionPatrimonial
}

export interface Educacion {
    grado: string
    institucion: string
    periodo: string
}

export interface TrayectoriaPolitica {
    cargo: string
    periodo: string
    descripcion?: string
}

export interface SituacionPatrimonial {
    declaracion3de3: string
    propiedades: Propiedad[]
    inversiones: string
    alertas: string[]
}

export interface Propiedad {
    tipo: string
    ubicacion: string
    valor: string
}

export interface AlcanceDigital {
    seguidoresTwitter: number
    seguidoresFacebook: number
    seguidoresInstagram: number
    seguidoresTikTok: number
    engagement: number
}

export interface TimelineEvent {
    id: string
    fecha: string
    tipo: 'declaracion' | 'voto' | 'escandalo' | 'evento' | 'proyecto' | 'iniciativa'
    titulo: string
    descripcion: string
    fuente: string
    url?: string
    cita?: string
    inconsistenciaFlag?: boolean
}

export interface Inconsistencia {
    id: string
    oponenteId: string
    tema: string
    severidad: 'critical' | 'high' | 'medium' | 'low'
    confianzaIA: number
    descripcion: string

    // Posición 1 (flat structure matching mockData)
    fecha1: string
    posicion1: string
    fuente1: string
    evidencia1: {
        tipo: string
        cita: string | null
        contexto: string
        url: string
    }

    // Posición 2 (flat structure matching mockData)
    fecha2: string
    posicion2: string
    fuente2: string
    evidencia2: {
        tipo: string
        cita: string | null
        contexto: string
        url: string
    }

    // Análisis IA
    analisisIA: AnalisisIA

    // Impacto electoral
    impactoElectoral: number
    impactoDescripcion: string

    // Estrategia sugerida
    estrategiaSugerida: {
        prioridad: string
        acciones: string[]
        momentoOptimo: string
        riesgos: string[]
    }
}

export interface AnalisisIA {
    patron: string
    contextoAdicional: string[]
    factoresInfluyentes: FactorInfluyente[]
}

export interface FactorInfluyente {
    factor: string
    peso: number
}

export interface ArticuloMedio {
    id: string
    oponenteId: string
    titulo: string
    medio: string
    periodista: string
    fecha: string
    sentimiento: 'positive' | 'neutral' | 'negative'
    alcance: number
    resumen: string
    factCheck?: 'verificado' | 'en_revision' | null
    url?: string
}

export interface NodoRed {
    id: string
    nombre: string
    tipo: 'politico' | 'empresario' | 'familia' | 'organizacion' | 'asesor' | 'medio' | 'controversial'
    descripcion: string
    conflicto?: boolean
}

export interface ConexionRed {
    id: string
    origen: string
    destino: string
    tipo: 'politica' | 'empresarial' | 'familiar' | 'profesional' | 'media'
    descripcion: string
    fuerza: 'fuerte' | 'media' | 'debil'
    conflicto?: boolean
}

export interface Donante {
    nombre: string
    monto: number
    tipo: 'corporativo' | 'individual' | 'organizacion'
    sector: string
    conflicto?: string
}

export interface CandidatoComparacion {
    id: string
    nombre: string
    intencionVoto: number
    popularidad: number
    sentimiento: number
    experiencia: number
    edad: number
    seguidoresDigitales: number
    financiamiento: number
    alcanceMedios: number
    inconsistencias: number
    escandalos: number
}
