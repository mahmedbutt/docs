// Import packages
const path = require("path");

// Next config object
const pluginOptions = {}

// Return a custom webpack plugin
// It gets the next config in parameter
// We will return an object
module.exports = (nextConfig) => ({
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
				loader: path.join(__dirname, "/lib/loader.js"),
				options: {...pluginOptions},
			},
		],
		})

		if (typeof nextConfig.webpack === 'function') {
			return nextConfig.webpack(config, options)
		}

		return config
	}
})