/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2.5rem',
        xl: '3.5rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        paper: '#ffffff',
        ivory: {
          DEFAULT: '#f5f2ea',
          deep: '#efeadd',
        },
        ink: {
          DEFAULT: '#17233a',
          soft: '#243450',
          muted: '#5b6472',
        },
        line: {
          DEFAULT: '#e4ddca',
          soft: '#ece6d7',
        },
        gold: {
          DEFAULT: '#a8814a',
          soft: '#c2a06a',
          deep: '#8a6a3b',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      letterSpacing: {
        label: '0.14em',
        widelabel: '0.22em',
      },
      maxWidth: {
        prose: '38rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
