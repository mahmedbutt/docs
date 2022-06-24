// Load our custom plugin to process mdx
const withMDX = require("./lib/index")({ data: "data", out: "pages" });

// Provide it to next
module.exports = withMDX({
	// Next config

});