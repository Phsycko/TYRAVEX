import { io, Socket } from 'socket.io-client'
import { useWebSocketStore } from '@/stores/websocket'
import { useModulesStore } from '@/stores/modules'

class WebSocketService {
    private socket: Socket | null = null
    private listeners: Map<string, Function[]> = new Map()

    connect(token: string) {
        if (this.socket?.connected) return

        const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8000' // Default to localhost if env not set

        this.socket = io(wsUrl, {
            auth: { token },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        })

        const wsStore = useWebSocketStore()

        this.socket.on('connect', () => {
            console.log('WebSocket connected')
            wsStore.setConnected(true)
        })

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected')
            wsStore.setConnected(false)
        })

        // Global event handlers
        this.socket.on('module:update', (data: any) => {
            const modulesStore = useModulesStore()
            if (data.moduleId && data.status) {
                modulesStore.updateStatus(data.moduleId, data.status)
            }
            this.emitLocal('module:update', data)
        })

        this.socket.on('alert:new', (data: any) => {
            this.emitLocal('alert:new', data)
        })
    }

    // Local event bus wrapper
    subscribe(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, [])
        }
        this.listeners.get(event)?.push(callback)
    }

    emitLocal(event: string, data: any) {
        const callbacks = this.listeners.get(event) || []
        callbacks.forEach(cb => cb(data))
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
            useWebSocketStore().setConnected(false)
        }
    }
}

export default new WebSocketService()
