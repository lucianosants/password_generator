/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				slideRight: {
					'0%, 100%': {
						transform: 'translateX(-100%)',
					},
					'50%': { transform: 'translateX(0)' },
				},
			},
			animation: {
				slideRight: 'slideRight 1s ease-in-out normal',
			},
		},
	},
	plugins: [],
};
