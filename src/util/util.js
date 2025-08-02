import fs from "fs";
import path from "path";

import "server-only";

export const contentFiles = () => {
    const contentDir = path.join(process.cwd(), "src", "content");
    const files = fs.readdirSync(contentDir);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => ({
            title: file.replace(".mdx", ""),
            url: `/blog/${file.replace(".mdx", "")}`,
        }));
};
