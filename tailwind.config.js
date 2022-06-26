// Configuration for Tailwind

module.exports = {

	content: [
		'./pages/**/*.{html,js}',
		'./components/**/*.{html,js,jsx}',
	],
	safelist: [
		{
			pattern: /grid-cols-.+/,
			variants: ['sm', 'md', 'lg']
		},
		{
			pattern: /col-span-.+/,
			variants: ['sm', 'md', 'lg']
		}
	],

	// Define theme
	theme: {

		// Fonts
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif']
		},

		// Font size
		fontSize: {
			'xs': '0.55rem',
			'sm': '0.65rem',
			'base': '0.75rem',
			'lg': '0.85rem',
			'title': '2rem'
		},

		// Colors
		colors: {
			// Gray
			gray: {

				// Pallete 1
				1 : '#16161d', // hsl(240, 12%, 10%)'
				2 : '#1d1d25', // hsl(240, 12%, 13%)'
				3 : '#24242e', // hsl(240, 12%, 16%)'
				4 : '#2b2b36', // hsl(240, 12%, 19%)'
				5 : '#31313f', // hsl(240, 12%, 22%)'
				
			},

			// White
			white: {
				1 : '#ededed',
				2 : '#8C8C8C',
			},

			// Accent
			accent: {
				DEFAULT: '#7A15D1',
			},

			// Danger 
			'danger': '#95323E',
		},
		

		extend: {

			keyframes: {
				'fade-in': {
						'0%': {
								opacity: '0'
						},
						'100%': {
								opacity: '1'
						},
				},
				'text': {
					'0%, 100%': {
					   'background-size':'200% 200%',
						'background-position': 'left center'
					},
					'50%': {
					   'background-size':'200% 200%',
						'background-position': 'right center'
					}
				},
				'loading': {
					'0%, 100%': {
						'transform': 'translate(0px, 0)'
					},
					'50%': {
						'transform': 'translate(150px, 0)',
						'background-color': '#ededed',
						'width': '20px'
					}
				}
			},
			animation: {
					'fade-in': 'fade-in 0.5s ease-out',
					'text': 'text 5s ease infinite',
					'loading': 'loading 1s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite'
			},
			spacing: {
				'21': '21em',
				'22': '22em',
				'23': '23em',
				'24': '24em',
				'25': '25em',
				'26': '26em',
				'27': '27em',
				'28': '28em',
				'29': '29em',
				'30': '30em'
			  }
		},
	},
	
	plugins: [
		require('@tailwindcss/typography')
	],
}