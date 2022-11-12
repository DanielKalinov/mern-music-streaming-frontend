const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: colors.slate[800],
				secondary: colors.slate[600],
				accent: colors.pink[400],
				inactive: colors.slate[400],
			},
		},
	},
	plugins: [],
};
