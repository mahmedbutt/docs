// Load our custom plugin to process mdx
const withMDX = require("./lib/index")({ data: "data", out: "pages" });

// Provide it to next
module.exports = withMDX({
	// Next config
	trailingSlash: true,
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        // Delete default config for 404 page
        delete defaultPathMap['/404'];
  
        // and replace it with 404.html
        // means basically instead of creating a new directory
        // simply render the file
        defaultPathMap['/404.html'] = {page: '/404'}
  
        // Return map
        return defaultPathMap
    }
});