export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'tyravex': {
                    'bg-primary': '#0a0e14',
                    'bg-secondary': '#0f1419',
                    'bg-tertiary': '#151a21',
                    'accent-blue': '#00d4ff',
                    'accent-cyan': '#00ffcc',
                    'accent-green': '#00ff88',
                    'accent-yellow': '#ffcc00',
                    'accent-orange': '#ff8800',
                    'accent-red': '#ff3366',
                    'text-primary': '#e6e8eb',
                    'text-secondary': '#a0a8b0',
                    'text-muted': '#6b7280',
                    'border': '#1f2937',
                    'status-online': '#00ff88',
                    'status-alert': '#ffcc00',
                    'status-critical': '#ff3366',
                }
            },
            fontFamily: {
                'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'typing': 'typing 0.05s steps(1) infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                typing: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                }
            }
        },
    },
    plugins: [],
}
