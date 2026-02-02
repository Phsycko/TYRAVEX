import { defineStore } from 'pinia'

// Simplified store for the new electoral intelligence platform
export const useConversationStore = defineStore('conversation', {
    state: () => ({
        notifications: [] as { id: string; type: string; message: string; read: boolean }[],
        userPreferences: {
            darkMode: true,
            language: 'es'
        }
    }),

    getters: {
        unreadNotifications: (state) => state.notifications.filter(n => !n.read).length
    },

    actions: {
        addNotification(notification: { type: string; message: string }) {
            this.notifications.unshift({
                id: `notif-${Date.now()}`,
                type: notification.type,
                message: notification.message,
                read: false
            })
        },

        markNotificationAsRead(id: string) {
            const notification = this.notifications.find(n => n.id === id)
            if (notification) {
                notification.read = true
            }
        },

        markAllAsRead() {
            this.notifications.forEach(n => n.read = true)
        }
    }
})
