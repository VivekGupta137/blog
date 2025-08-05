import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { getContentFileTree } from "@/util/util";
import clsx from "clsx";
import { X } from "lucide-react";
import Link from "next/link";
import { BsMarkdown } from "react-icons/bs";

export function FileTreeBlog({
    fileTree,
}: {
    fileTree: ReturnType<typeof getContentFileTree>;
}) {
    // build the tree structure from the fileTree data
    const buildTree = (items: typeof fileTree): React.ReactNode[] => {
        return items.map((item) => {
            if (item.type === "folder") {
                return (
                    <Folder
                        key={item.id}
                        element={item.id}
                        value={item.id}
                        isSelectable={item.isSelectable}
                        className={clsx(
                            item.children && "hover:bg-muted/30 rounded-md"
                        )}
                    >
                        {item.children && buildTree(item.children)}
                        {!item.children && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1 text-red-400">
                                <X className="inline h-4 w-4 " /> Empty folder
                            </span>
                        )}
                    </Folder>
                );
            } else {
                return (
                    <Link
                        href={item.url || "#"}
                        className="flex items-center gap-2"
                        passHref
                        key={item.id}
                        prefetch
                    >
                        <File
                            value={item.id}
                            isSelectable={item.isSelectable}
                            fileIcon={<BsMarkdown className="h-4 w-4" />}
                        >
                            <span>{item.name}</span>
                        </File>
                    </Link>
                );
            }
        });
    };

    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
            <Tree
                className="overflow-hidden rounded-md bg-background p-2"
                initialExpandedItems={["1"]}
            >
                <Folder element="contents" value="1">
                    {buildTree(fileTree)}
                </Folder>
            </Tree>
        </div>
    );
}
