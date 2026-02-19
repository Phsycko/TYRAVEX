export interface Factor {
    factor: string
    impacto: number
}

export interface Candidato {
    nombre: string
    porcentaje: number
    margenError: number
    rangoMin?: number
    rangoMax?: number
    cambio7dias: number
    tendencia: 'positiva' | 'negativa' | 'neutral'
    color: string
    factoresClave?: Factor[]
    debilidades?: Factor[]
}

export interface Distrito {
    id: number
    nombre: string
    prediccion: number
    probVictoria: number
    cambio7d: number
    prioridad: 'seguro' | 'competido' | 'riesgo'
    color: string
    alerta?: boolean
}

export interface ResumenDistritos {
    seguros: number
    competidos: number
    enRiesgo: number
}

export interface Recomendacion {
    id: string
    severidad: 'critical' | 'high' | 'medium' | 'low'
    prioridad: string
    titulo: string
    descripcion: string
    situacion: string
    impactoPotencial: string
    confianza: number
    acciones: string[]
    costoEstimado: number
    tiempo: string
    roi: string
}
