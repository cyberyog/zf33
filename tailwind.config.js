/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1a1a1a',    // Deep charcoal
          DEFAULT: '#2a2a2a', // Dark grey
        },
        accent: {
          blue: '#00d4ff',    // Electric blue
          purple: '#6e4ff6',  // Bluish purple
          gold: '#B8A082',    // Gold accent
          sage: '#7C9A92',    // Sage green
          lavender: '#9D91C6', // Soft lavender
          matrix: '#7E57C2',   // Matrix purple (added)
        },
        neutral: {
          light: '#f8f8f8',   // Matte white
          DEFAULT: '#2a2a2a', // Dark grey
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        accent: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      spacing: {
        '128': '32rem',
      },
      gridTemplateColumns: {
        'gallery': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      transitionDuration: {
        '400': '400ms',
      },
      lineHeight: {
        'tight': '1.15',
        'snug': '1.3',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 212, 255, 0.2)',
        'neon-hover': '0 0 25px rgba(110, 79, 246, 0.3)',
      },
      backgroundImage: {
        'cyber-texture': 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 100%)',
      },
      animation: {
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};