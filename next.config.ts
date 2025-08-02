import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
    theme: {
        dark: "github-dark-dimmed",
        light: "github-light-default",
    },
    keepBackground: false,
};

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
            // [rehypePrettyCode, options],
        ],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
