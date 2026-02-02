/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // TYRAVEX Electoral Intelligence Platform - Color Palette
                'tyravex': {
                    // Primary - Blue (Profesional, sobrio)
                    'primary': '#4A90E2',
                    'primary-light': '#357ABD',
                    'primary-dark': '#2A5D8F',

                    // Secondary - Orange/Bronze (Acento refinado)
                    'secondary': '#E67E22',
                    'secondary-light': '#F39C12',
                    'secondary-dark': '#D35400',

                    // Background - Dark mode (Deep Blue/Black)
                    'bg-primary': '#0B0E11',    // Main background
                    'bg-secondary': '#141B22',  // Sidebar/Panels
                    'bg-tertiary': '#1C2530',   // Hover states
                    'bg-card': '#1A2332',       // Cards

                    // Success - Muted Green
                    'success': '#52C41A',
                    'success-dark': '#389E0D',

                    // Danger - Professional Red
                    'danger': '#D32F2F',
                    'danger-dark': '#B71C1C',

                    // Warning - Muted Orange
                    'warning': '#FA8C16',
                    'warning-dark': '#D46B08',

                    // Neutrals
                    'gray-100': '#FFFFFF',
                    'gray-200': '#E8EAED',      // Main Text
                    'gray-300': '#9AA0A6',      // Secondary Text
                    'gray-400': '#5F6368',      // Disabled/Muted
                    'gray-500': '#3C4043',
                    'gray-600': '#202124',

                    // Text colors
                    'text-primary': '#E8EAED',
                    'text-secondary': '#9AA0A6',
                    'text-muted': '#5F6368',
                    'text-dark': '#0B0E11',

                    // Borders
                    'border': 'rgba(255, 255, 255, 0.08)',
                    'border-light': 'rgba(255, 255, 255, 0.12)',

                    // Data Colors (Charts & Graphs)
                    'data-positive': '#52C41A',
                    'data-negative': '#D32F2F',
                    'data-neutral': '#1890FF',
                    'data-gray': '#8C8C8C',
                    'data-purple': '#722ED1',
                    'data-cyan': '#13C2C2',

                    // Electoral specific colors
                    'electoral-strong': '#52C41A',
                    'electoral-medium': '#FA8C16',
                    'electoral-weak': '#D32F2F',

                    // Sentiment colors
                    'sentiment-positive': '#52C41A',
                    'sentiment-neutral': '#8C8C8C',
                    'sentiment-negative': '#D32F2F',

                    // Status indicators
                    'status-live': '#D32F2F',
                    'status-online': '#52C41A',
                    'status-alert': '#FA8C16',
                    'status-critical': '#D32F2F',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                'mono': ['Roboto Mono', 'JetBrains Mono', 'Consolas', 'monospace'],
            },
            fontSize: {
                'h1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],    // 36px
                'h2': ['1.75rem', { lineHeight: '2rem', fontWeight: '700' }],       // 28px
                'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],    // 20px
                'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],      // 16px
                'small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],// 14px
                'xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],       // 12px
            },
            borderRadius: {
                'card': '12px',
                'btn': '8px',
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'glow-orange': '0 0 20px rgba(255, 107, 53, 0.3)',
                'glow-blue': '0 0 20px rgba(10, 36, 99, 0.5)',
                'glow-success': '0 0 15px rgba(46, 204, 113, 0.3)',
                'glow-danger': '0 0 15px rgba(231, 76, 60, 0.3)',
            },
            backdropBlur: {
                'glass': '12px',
            },
            animation: {
                'pulse-live': 'pulse-live 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'number-scroll': 'numberScroll 0.5s ease-out',
            },
            keyframes: {
                'pulse-live': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'fadeIn': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slideUp': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slideInRight': {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'numberScroll': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
            transitionDuration: {
                'DEFAULT': '200ms',
            },
        },
    },
    plugins: [],
}
