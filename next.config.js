// Load our custom plugin to process mdx
const withMDX = require("./lib/index")({ data: "data", out: "pages/_data" });

// Provide it to next
module.exports = withMDX({
    async rewrites() {
        return [
            {
              source: '/:path*',
              destination: '/_data/:path*',
            },
        ]
    },
    
	// Next config
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {

        // Skip layout page
        delete defaultPathMap['/_layout'];

        // Now loop on each entry in path map
        for (var page in defaultPathMap) {

            // If the page is coming from _data
            if (/^\/_data/.test(page)) {

                // Then remove page
                delete defaultPathMap[page];

                // and re include without _data prefix
                defaultPathMap[page.replace("/_data", "/").replace("//", "/")] = { page };

            }
        
        }

        // Return map
        return defaultPathMap
    }
});