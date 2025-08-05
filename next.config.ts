import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const nextConfig: NextConfig = {
    /* config options here */
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
    extension: /\.mdx?$/,

    options: {
        remarkPlugins: [
            remarkGfm,
            remarkFrontmatter,
            [remarkToc, { heading: "Contents" }],
        ],
        rehypePlugins: [
            rehypeSlug,
            [rehypeKatex, { strict: false }],
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                },
            ],
        ],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
