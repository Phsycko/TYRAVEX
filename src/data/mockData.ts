import type { Message, Metric, Event, Operation, Domain, SystemStatus, RiskLevel, QuickCommand } from '@/types/types'

// Initial system messages
export const initialMessages: Omit<Message, 'id' | 'timestamp'>[] = [
    {
        type: 'system',
        sender: 'TYRAVEX',
        content: 'Sistema iniciado. Todos los dominios operativos están en línea. Ejecutando diagnóstico de rutina...'
    },
    {
        type: 'system',
        sender: 'TYRAVEX',
        content: 'Estado general estable. Detecté 3 operaciones que requieren atención y una anomalía menor en el nodo BETA-3. ¿Deseas que analice la situación?'
    }
]

// Mock metrics
export const mockMetrics: Metric[] = [
    {
        id: 'm1',
        name: 'Eventos Procesados',
        value: '2.4M',
        interpretation: 'Procesamos 2.4M eventos en las últimas 24h. El sistema se mantiene dentro de parámetros normales.',
        trend: 'stable',
        status: 'normal'
    },
    {
        id: 'm2',
        name: 'Latencia Promedio',
        value: '45ms',
        interpretation: 'La latencia promedio es de 45ms, ligeramente por encima del objetivo de 40ms.',
        trend: 'up',
        status: 'warning'
    },
    {
        id: 'm3',
        name: 'Tasa de Éxito',
        value: '99.7%',
        interpretation: 'Tasa de éxito operacional del 99.7%. Dentro de los estándares esperados.',
        trend: 'stable',
        status: 'normal'
    },
    {
        id: 'm4',
        name: 'Nodos Activos',
        value: '47/48',
        interpretation: 'Un nodo está en mantenimiento programado. Capacidad al 98%.',
        trend: 'stable',
        status: 'normal'
    }
]

// Mock events
export const mockEvents: Event[] = [
    {
        id: 'e1',
        type: 'warning',
        description: 'Latencia elevada detectada en nodo BETA-3',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        node: 'BETA-3'
    },
    {
        id: 'e2',
        type: 'info',
        description: 'Actualización de seguridad completada en cluster ALPHA',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        node: 'ALPHA'
    },
    {
        id: 'e3',
        type: 'info',
        description: 'Backup automático ejecutado correctamente',
        timestamp: new Date(Date.now() - 1000 * 60 * 120)
    }
]

// Mock operations
export const mockOperations: Operation[] = [
    {
        id: 'op1',
        name: 'Sincronización de datos',
        status: 'running',
        progress: 67
    },
    {
        id: 'op2',
        name: 'Análisis de patrones',
        status: 'running',
        progress: 34
    },
    {
        id: 'op3',
        name: 'Optimización de índices',
        status: 'pending'
    }
]

// Mock domains
export const mockDomains: Domain[] = [
    {
        id: 'd1',
        name: 'Operaciones Core',
        status: 'ONLINE',
        description: 'Procesamiento principal de eventos'
    },
    {
        id: 'd2',
        name: 'Análisis Predictivo',
        status: 'ONLINE',
        description: 'Modelos de machine learning'
    },
    {
        id: 'd3',
        name: 'Infraestructura',
        status: 'ALERT',
        description: 'Gestión de recursos y nodos'
    }
]

// Initial quick commands
export const initialQuickCommands: QuickCommand[] = [
    {
        id: 'qc1',
        label: 'Analizar causa',
        action: 'analyze_latency',
        context: 'latency_issue'
    },
    {
        id: 'qc2',
        label: 'Mostrar impacto',
        action: 'show_impact',
        context: 'latency_issue'
    },
    {
        id: 'qc3',
        label: 'Ignorar por ahora',
        action: 'dismiss',
        context: 'latency_issue'
    },
    {
        id: 'qc4',
        label: 'Ejecutar diagnóstico completo',
        action: 'full_diagnostic',
        context: 'general'
    }
]

// System responses based on user actions
export const systemResponses: Record<string, string> = {
    analyze_latency: 'Analizando causa raíz de la latencia en BETA-3... El nodo está procesando un volumen 23% superior al promedio debido a redistribución de carga. Esto es temporal y se resolverá en aproximadamente 12 minutos.',
    show_impact: 'El impacto actual es mínimo. La latencia afecta al 2.3% de las solicitudes totales. Los usuarios finales no han reportado degradación perceptible. El sistema está compensando automáticamente.',
    dismiss: 'Entendido. Continuaré monitoreando la situación. Te notificaré si la latencia supera el umbral crítico de 100ms.',
    full_diagnostic: 'Iniciando diagnóstico completo del sistema... Esto tomará aproximadamente 30 segundos.',
    default: 'Comando procesado. ¿Hay algo más en lo que pueda asistirte?'
}

// Current system state
export const currentSystemState = {
    status: 'ONLINE' as SystemStatus,
    activeDomain: mockDomains[0],
    riskLevel: 'LOW' as RiskLevel,
    uptime: '47 días, 13 horas'
}
