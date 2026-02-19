export interface Alert {
    id: string
    severidad: 'critical' | 'high' | 'medium' | 'low'
    titulo: string
    descripcion: string
    fuente: string
    tiempo: string
    alcance: number
    engagement: number
    sentimiento: number
}

export interface TrendingTopic {
    id: string
    tema: string
    menciones: number
    cambio: number
    sentimiento: 'positive' | 'negative' | 'neutral'
    alcance: number
    engagement: number
}

export interface Mention {
    id: string
    fuente: string
    usuario: string
    contenido: string
    sentimiento: 'positive' | 'negative' | 'neutral'
    alcance: number
    tiempo: string
    verificado: boolean
    seguidores: number
    likes: number
    shares: number
    comentarios: number
    vistas: number
}
