// Import moudles
const path = require("path");

// Export plugin
module.exports = (/** @type {import('next').NextConfig} */ nextConfig) => /** Return a function instead of object */ (phase) => {

	// console.log(phase)
	
	return {

		// With orignal config
		...nextConfig,

		// Add page extensions to support md and mdx files
		pageExtensions: Array.from(
			new Set([...(nextConfig.pageExtensions ?? []), "md", "mdx"])
		),

		// and return custom webpack plugin
		webpack(config, options) {

			// Add a rule to webpack 
			config.module.rules.push({

			// Test for md and mdx files
			test: /\.mdx$/,
			use: [
				options.defaultLoaders.babel,
				{
					// And load custom parser
					loader: path.join(__dirname, "/loader.js"),
					options: {},
				},
			],
			})

			// If user also tried to override webpack
			// then patch our config to the webpack config provided by user
			// and return user provided config (you don't wanna
			// override user provided config in our pass through webpack
			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options)
			}

			// Otherwise just return the config
			return config
		}
    
	}
}