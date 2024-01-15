import colors from 'tailwindcss/colors';
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
				xs: '425px',
			},
			boxShadow: {
				card: '0 10px 20px rgba(0, 0, 0, 0.2)',
				btn: '0 12px 24px rgba(0, 0, 0, 0.5)',
				img: '0 12px 24px rgba(0, 0, 0, 0.4)',
				'audio-panel': '0 0 12px rgba(0, 0, 0, 0.5)',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
