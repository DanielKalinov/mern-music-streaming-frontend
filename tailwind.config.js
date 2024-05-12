import colors from 'tailwindcss/colors';
import { screens } from 'tailwindcss/defaultTheme';
import accentColor from './src/utils/accentColor';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': colors.slate[900],
        'background-darker': colors.slate[950],
        primary: colors.slate[800],
        secondary: colors.slate[700],
        accent: accentColor,
        inactive: colors.slate[400],
        disabled: colors.slate[500],
      },
      screens: {
        disablemobilehover: { raw: '(hover: hover)' },
      },
      boxShadow: {
        card: '0 5px 15px rgba(0, 0, 0, 0.3)',
      },
    },
    screens: {
      xs: '425px',
      ...screens,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
