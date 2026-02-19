import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        name: 'Admin User',
        role: 'Administrator',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
    })
    const token = ref<string | null>(null)
    const isAuthenticated = computed(() => !!token.value || true) // Mocked true for dev

    function login(credentials: any) {
        // Mock login
        console.log('Logging in with', credentials)
        token.value = 'mock-token'
    }

    function logout() {
        token.value = null
        user.value = { name: '', role: '', avatar: '' }
    }

    return { user, token, isAuthenticated, login, logout }
})
