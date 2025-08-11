import fs from "fs";
import path from "path";

function getAllMdxFiles(dir: string, basePath: string = ""): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
            files.push(...getAllMdxFiles(fullPath, relativePath));
        } else if (item.name.endsWith(".mdx")) {
            files.push(relativePath.replace(".mdx", ""));
        }
    }

    return files;
}

import { notFound } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const slugArray = (await params)?.slug ?? [];
    const slugPath = slugArray.join("/");

    try {
        const { default: Post, metadata } = await import(
            `@/content/${decodeURIComponent(slugPath)}.mdx`
        );
        console.log("slug:", slugPath);

        return <Post metadata={metadata} />;
    } catch {
        // If the MDX file doesn't exist or import fails, show 404 page for this route
        notFound();
    }
}

export function generateStaticParams() {
    const contentDir = path.join(process.cwd(), "src", "content");
    const slugs = getAllMdxFiles(contentDir);

    return slugs.map((slugPath) => ({
        slug: slugPath.split("/"),
    }));
}

export const dynamicParams = false;
