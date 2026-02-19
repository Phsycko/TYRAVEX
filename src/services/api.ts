import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
    (response) => response, // Return full response or response.data based on preference. Plan said response.data but standard axios returns object.
    async (error) => {
        const authStore = useAuthStore()
        if (error.response?.status === 401) {
            authStore.logout()
            // potentially redirect to login
        }
        return Promise.reject(error)
    }
)

export default api
