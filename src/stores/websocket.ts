import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebSocketStore = defineStore('websocket', () => {
    const isConnected = ref(false)
    const lastMessage = ref<any>(null)

    function setConnected(status: boolean) {
        isConnected.value = status
    }

    function setLastMessage(msg: any) {
        lastMessage.value = msg
    }

    return { isConnected, lastMessage, setConnected, setLastMessage }
})
