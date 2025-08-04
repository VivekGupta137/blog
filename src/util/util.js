import fs from "fs";
import path from "path";

import "server-only";

function getAllMdxFiles(dir, basePath = "") {
    const files = [];
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

function buildFileTree(dir, basePath = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const tree = [];

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
            const children = buildFileTree(fullPath, relativePath);
            tree.push({
                id: relativePath,
                name: item.name,
                isSelectable: true,
                children: children.length > 0 ? children : undefined
            });
        } else if (item.name.endsWith(".mdx")) {
            tree.push({
                id: relativePath,
                name: item.name,
                isSelectable: true
            });
        }
    }

    return tree;
}

export const contentFiles = () => {
    const contentDir = path.join(process.cwd(), "src", "content");
    const slugs = getAllMdxFiles(contentDir);
    return slugs.map((slug) => {
        const title = slug.split("/").pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const category = slug.includes('/') ? slug.split('/')[0] : 'General';
        const filePath = path.join(contentDir, `${slug}.mdx`);
        
        // Extract first line as description (basic implementation)
        let description = "No description available";
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
            if (lines.length > 0) {
                description = lines[0].replace(/[#*`]/g, '').trim().substring(0, 150) + '...';
            }
        } catch {
            // Fallback description
            description = `Learn about ${title.toLowerCase()}`;
        }
        
        return {
            title,
            url: `/blog/${slug}`,
            slug,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            description
        };
    });
};

export const getContentFileTree = () => {
    const contentDir = path.join(process.cwd(), "src", "content");
    return buildFileTree(contentDir);
};
