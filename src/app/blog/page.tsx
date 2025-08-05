import { contentFiles, getContentFileTree } from "@/util/util";
import Link from "next/link";
import { LuExternalLink, LuFolder, LuClock, LuTag } from "react-icons/lu";
import MagicFileTree from "@/components/MagicFileTree";
import { FileTreeBlog } from "@/components/FileTreeBlog";

const page = () => {
    const content = contentFiles();
    const fileTree = getContentFileTree();

    // Group content by category
    const contentByCategory: Record<string, typeof content> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content.forEach((post: any) => {
        if (!contentByCategory[post.category]) {
            contentByCategory[post.category] = [];
        }
        contentByCategory[post.category].push(post);
    });

    const totalPosts = content.length;
    const categories = Object.keys(contentByCategory);

    console.log({ fileTree });

    return (
        <div className="w-[500px]">
            {/* <MagicFileTree data={fileTree} /> */}
            <FileTreeBlog fileTree={fileTree} />
        </div>
    );
};

export default page;
