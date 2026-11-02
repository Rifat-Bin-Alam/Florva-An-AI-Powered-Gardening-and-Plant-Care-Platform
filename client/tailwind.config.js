/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F6F2',
          100: '#DDECE2',
          200: '#BDDAC7',
          300: '#94C0A3',
          400: '#6AA67F',
          500: '#3D8259',
          600: '#236542',
          700: '#174D32', // Approved Primary Forest Green
          DEFAULT: '#174D32',
          800: '#113A26',
          900: '#0B2619',
        },
        sage: {
          50: '#F5F8F4',
          100: '#E9EFE7',
          200: '#D4E2D0',
          300: '#A8C5A0', // Approved Sage Accent
          DEFAULT: '#A8C5A0',
          400: '#8FB585',
          500: '#75A169',
          600: '#5B8350',
          700: '#43613B',
          800: '#2D4127',
          900: '#182315',
        },
        offwhite: {
          50: '#FFFFFF',
          DEFAULT: '#F8FAF6', // Approved Off-White Background
          100: '#F1F5EE',
          200: '#E6ECE1',
        },
        charcoal: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          DEFAULT: '#1F2937', // Approved Charcoal Text
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'botanical': '0 4px 20px -2px rgba(23, 77, 50, 0.08), 0 2px 6px -1px rgba(23, 77, 50, 0.04)',
        'botanical-lg': '0 10px 30px -4px rgba(23, 77, 50, 0.12), 0 4px 10px -2px rgba(23, 77, 50, 0.06)',
      }
    },
  },
  plugins: [],
}
