import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6EC1E4',
        'primary-dark': '#5BA3C7',
        accent: '#61CE70',
        'secondary': '#54595F',
        'text': '#7A7A7A',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
