const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'background-dark': colors.slate[900],
				primary: colors.slate[800],
				secondary: colors.slate[600],
				accent: colors.yellow[300],
				inactive: colors.slate[400],
				disabled: colors.slate[500],
			},
			screens: {
				xs: '425px',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
