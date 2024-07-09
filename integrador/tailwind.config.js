/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: false, // o 'media' o 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Aquí defines qué capas están habilitadas
    preflight: true, // Base
    components: true, // Componentes
    utilities: true, // Utilidades
  },
}