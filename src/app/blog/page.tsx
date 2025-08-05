import { contentFiles, getContentFileTree } from "@/util/util";
import Link from "next/link";
import { LuExternalLink, LuFolder, LuClock, LuTag } from "react-icons/lu";
import MagicFileTree from "@/components/MagicFileTree";
import { FileTreeBlog } from "@/components/FileTreeBlog";

const page = () => {
    const fileTree = getContentFileTree();

    return (
        <div className="w-[300px] lg:w-[400px] ">
            <FileTreeBlog fileTree={fileTree} />
        </div>
    );
};

export default page;
