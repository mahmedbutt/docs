// Using gray matter
const matter = require("gray-matter");

// Export the laoder
module.exports = async function layoutLoader(source) {
    // Callback is webpack way to handle promise
    const callback = this.async();

    // Use try catch to error handle with webpack
    try {
        // Source is getting the orignal file
        // We can process the file to separate frontmatter and content
        const { data, content } = matter(source);

        // Import Serializer
        const { serialize } = await import("next-mdx-remote/serialize");

        // Get plugins
        const { default: remark } = await import("remark-gfm");

        // Then convert source to mdx
        const mdx = await serialize(content, {
            mdxOptions: {
                remarkPlugins: [remark],
                rehypePlugins: [require("mdx-prism")]
            }
        });

        // And return page jsx to next
        callback(null, 
        `   
            import { MDXRemote } from "next-mdx-remote";
            
            export const frontMatter = ${JSON.stringify(data)}

            export default function Page() {
                return (
                     <MDXRemote {...${JSON.stringify(mdx)}} />
                );
            }

      `.trim());
    } 
    catch (err) {
        callback(err);
    }
};
