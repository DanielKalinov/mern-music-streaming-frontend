const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: colors.zinc[800],
				secondary: colors.zinc[600],
				accent: colors.pink[400],
				inactive: colors.zinc[400],
			},
		},
	},
	plugins: [],
};
