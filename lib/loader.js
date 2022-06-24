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

// Function to parse file system
const parse = async (path, cwd, out) => {
    // Initial layout
    var layout = [];

    // Get list of files and subdirectories at the path
    var nodes = await fs.readdir(path);

    // Iterate over nodes
    for (var node of nodes) {

        // Get stats of the node
        var stats = await fs.lstat(`${path}/${node}`);

        // Check if the node is directory
        if (stats.isDirectory()) {

            // Create subtree
            var dir = {
                path: `${cwd}/${node}`,
                key: node,
                children: []
            }

            // Dive into the directory
            dir.children = await parse(`${path}/${node}`, `${cwd}/${node}`, out);

            // And push to layout, but only if the directory has some meaningful content
            dir.children.length > 0 ? layout.push(dir) : null

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
                await fs.writeFile(`${out}/${cwd}/${key}.jsx`, converted, "utf-8");

                // Add to layout
                layout.push({ path: `${cwd}/${key}`, key, meta });
            }
            
        }

    }

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