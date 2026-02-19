/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0f1115',
                    secondary: '#14161c',
                    tertiary: '#1a1d24',
                    card: 'rgba(20, 22, 28, 0.7)',
                },
                border: {
                    subtle: 'rgba(255, 255, 255, 0.05)',
                    medium: 'rgba(255, 255, 255, 0.08)',
                    accent: 'rgba(255, 255, 255, 0.12)',
                },
                text: {
                    primary: '#e0e0e0',
                    secondary: '#a0a0a0',
                    tertiary: '#888888',
                },
                accent: '#ff6b35',
                success: '#00ffaa',
                danger: '#ff4444',
                warning: '#ffcc00',
                info: '#4A90E2',
            },
            fontFamily: {
                display: ['Oswald', 'sans-serif'],
                sans: ['Montserrat', 'system-ui', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
            },
            borderRadius: {
                none: '0',
                sm: '2px',
                DEFAULT: '4px',
                md: '4px',
                lg: '4px',
                full: '9999px',
            },
            boxShadow: {
                none: 'none',
                subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
                DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
                glow: '0 0 10px rgba(255, 107, 53, 0.15)',
            },
        },
    },
    plugins: [],
}
