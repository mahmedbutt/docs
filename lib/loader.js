// Using gray matter and mdx-remote
const matter = require("gray-matter");
const fs = require("fs/promises");
const prism = require("mdx-prism");

// Variable for async packages
var serialize = null;
var remark = null;

// Using this new approach
// We will first iterate on the directory
// read file, convert file to mdx
// and path to layout

// Function to read meta
const meta = async (path) => {
    // Try to open file
    try {
        // And parse
        return JSON.parse(await fs.readFile(`${path}/meta.json`, "utf-8"));

    } 
    catch (error) {
        // Return empty object
        return {}    
    }
}

// Function to read sort map
const sortMap = async (path) => {
    // Try to open file
    try {
        // And parse
        return JSON.parse(await fs.readFile(`${path}/sort.json`, "utf-8"));

    } 
    catch (error) {
        // Return empty object
        return []    
    }
}

// Function to parse file system
const parse = async (path, cwd, out) => {
    // Initial layout
    var layout = [];

    // Get list of files and subdirectories at the path
    var nodes = await fs.readdir(path);

    // Read sort map
    var map = await sortMap(path);

    // Also create an array to store sorted layout objects
    // it will be equal to the length of map
    var sorted = new Array(map.length);

    // Also create a list to store unsorted list
    var unsorted = [];

    // Iterate over nodes
    for (var node of nodes) {

        // Get stats of the node
        var stats = await fs.lstat(`${path}/${node}`);

        // Check if the node is directory
        if (stats.isDirectory()) {

            // Files are getting their TOC names from
            // front matter. Similarly, we are bringing 
            // meta files for naming directories
            // var name = await meta(path)[node];
            var name = (await meta(path))[node];

            // Create subtree
            var dir = {
                path: `${cwd}/${node}`,
                key: name || node,
                children: []
            }

            // Dive into the directory
            dir.children = await parse(`${path}/${node}`, `${cwd}/${node}`, out);

            // And push to layout, but only if the directory has some meaningful content
            if (dir.children.length > 0) {

                // Lookup the map and see if the user has designated a position for the node
                var position = map.indexOf(node);

                // If a position is determined, then place it in sorted
                if (position >= 0) sorted[position] = dir;

                // Otherwise insert it into the unsorted list
                else unsorted.push(dir);

            }

        }
        else {
            
            // But only if it matches the extensions we are looking for
            if (/\.(md|mdx)$/.test(node)) {

                // Trim extension out of filename
                const key = node.replace(/\.(md|mdx)$/, "");

                // Then read the file 
                const source = await fs.readFile(`${path}/${node}`, 'utf-8');

                // And convert the source file
                const { meta, converted } = await convert(source);

                // Ensure we have the directory at target path
                await fs.mkdir(`${out}/${cwd}`, { recursive: true })

                // Then output the converted data into pages directory
                await fs.writeFile(`${out}/${cwd}/${key}.js`, converted, "utf-8");

                // Create layout node
                var layoutNode = { path: `${cwd}/${key.replace("index", "")}`, key, meta };

                // Lookup the map and see if the user has designated a position for the node
                var position = map.indexOf(key);

                // If a position is determined, then place it in sorted
                if (position >= 0) sorted[position] = layoutNode;

                // Otherwise insert it into the unsorted list
                else unsorted.unshift(layoutNode);
            }
            
        }

    }

    // Layout should a union of sorted and unsorted layout
    layout = sorted.concat(unsorted);

    // Return the layout to user
    return layout;
}

async function convert(source) {

    // Source is getting the orignal file
    // We can process the file to separate frontmatter and content
    const { data, content } = matter(source);

    // Import Serializer
    serialize = serialize ? serialize : (await import("next-mdx-remote/serialize")).serialize;

    // Get plugins
    remark = remark ? remark : (await import("remark-gfm")).default;

    // Then convert source to mdx
    const mdx = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remark],
            rehypePlugins: [prism]
        }
    });

    // Convert into page jsx
    const converted =  `

        import { MDXRemote } from "next-mdx-remote";
        import Head from "next/head";
        
        export const meta = ${JSON.stringify(data)}

        export default function Page(props) {
            return <>
            
                <Head><title>${data.title}</title></Head>

                <MDXRemote {...${JSON.stringify(mdx)}} />

            </>;
        }

    `

    // and return the jsx and frontmatter
    return { meta: data, converted }
};

// Export parser
module.exports = async (data, out) => {
    // Run parser
    const layout = await parse(data, "", out); 

    // Take the layout and write to a file in pages
    await fs.writeFile(`${out}/layout.json`, JSON.stringify(layout, null, 4));
}