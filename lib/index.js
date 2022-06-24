// Import moudles
const path = require("path");

// Export plugin
module.exports = (/** @type {import('next').NextConfig} */ nextConfig) => ({

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

		if (typeof nextConfig.webpack === 'function') {
			return nextConfig.webpack(config, options)
		}

		return config
	}
    
})