// Import moudles
const loader = require("./loader");
const fs = require("fs");

// Get constants for next
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// Export plugin
module.exports = ({ data, out }) => (/** @type {import('next').NextConfig} */ nextConfig) => /** Return a function instead of object */ async (phase) => {

	// Convert paths to cwd relative
	data = `${process.cwd()}/${data}`;
	out = `${process.cwd()}/${out}`;

	// Log message
	console.log("mdx   - Compiling pages");

	// Convert files from mdx to pages
	await loader(data, out);

	// If we are running in dev mode
	if (phase === PHASE_DEVELOPMENT_SERVER)

		// Then attach a watcher to data directory
		fs.watch(data, { recursive: true }, async (eventType, filename) => {
			// Log a message
			console.log("mdx   - Recompiling pages");

			// Run the parser
			await loader(data, out) 
		})
	
	// Return the config provided by user
	return nextConfig;
}