export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0712',
        stone: {
          DEFAULT: '#241C30',
          dark: '#181222',
          light: '#3A3049',
          border: '#4A3E5C'
        },
        parchment: '#EDE6D6',
        olympus: {
          violet: '#7C3AED',
          gold: '#D4AF37',
          spark: '#E9D5FF',
        },
        god: {
          zeus: '#7C3AED',
          athena: '#10B981',
          hephaestus: '#F97316',
          apollo: '#FBBF24',
          ares: '#DC2626',
          hermes: '#22D3EE',
          poseidon: '#0EA5E9',
          dionysus: '#C026D3',
          artemis: '#84CC16',
          prometheus: '#EA580C',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Cormorant SC', 'serif'],
        wordmark: ['Rajdhani', 'Clash Display', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'lightning': 'lightning 2s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        lightning: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
