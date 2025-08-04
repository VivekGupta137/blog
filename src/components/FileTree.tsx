"use client";
import { useState } from "react";
import { LuFolder, LuFolderOpen, LuFile } from "react-icons/lu";

interface FileNode {
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    path: string;
}

interface FileTreeProps {
    data: FileNode[];
}

const FileTreeNode = ({ node }: { node: FileNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        if (node.type === "folder") {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="select-none">
            <div
                className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer ${
                    node.type === "folder" ? "" : "cursor-default"
                }`}
                onClick={toggleOpen}
            >
                {node.type === "folder" ? (
                    isOpen ? (
                        <LuFolderOpen className="text-blue-600" />
                    ) : (
                        <LuFolder className="text-blue-600" />
                    )
                ) : (
                    <LuFile className="text-gray-600" />
                )}
                <span className="text-sm font-mono">{node.name}</span>
            </div>
            {node.type === "folder" && isOpen && node.children && (
                <div className="ml-4 border-l border-gray-200">
                    {node.children.map((child, index) => (
                        <FileTreeNode
                            key={`${child.path}-${index}`}
                            node={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FileTree = ({ data }: FileTreeProps) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">
                Blog Content Structure
            </h3>
            <div className="font-mono text-sm">
                {data.map((node, index) => (
                    <FileTreeNode key={`${node.path}-${index}`} node={node} />
                ))}
            </div>
        </div>
    );
};

export default FileTree;
