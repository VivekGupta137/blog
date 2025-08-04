"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tree, Folder, File, CollapseButton, type TreeViewElement } from "@/components/magicui/file-tree";
import { FileTextIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

interface MagicFileTreeProps {
  data: TreeViewElement[];
  className?: string;
}

const renderTreeNode = (
  node: TreeViewElement, 
  onFileSelect?: (fileId: string, fileName: string) => void
) => {
  if (node.children && node.children.length > 0) {
    return (
      <Folder 
        key={node.id} 
        element={node.name} 
        value={node.id}
        isSelectable={node.isSelectable ?? true}
        className="file-tree-item hover:bg-muted/30 rounded-md transition-all duration-200"
      >
        {node.children.map((child) => renderTreeNode(child, onFileSelect))}
      </Folder>
    );
  } else {
    return (
      <File 
        key={node.id} 
        value={node.id}
        isSelectable={node.isSelectable ?? true}
        fileIcon={<FileTextIcon className="size-4 text-blue-500" />}
        onClick={() => onFileSelect?.(node.id, node.name)}
        className="file-tree-item hover:bg-muted/40 rounded-md transition-all duration-200 cursor-pointer"
      >
        <span className="text-sm font-medium truncate hover:text-blue-600 transition-colors">
          {node.name}
        </span>
      </File>
    );
  }
};

const MagicFileTree = ({ 
  data, 
  className = ""
}: MagicFileTreeProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const router = useRouter();

  const handleFileSelect = useCallback((fileId: string, fileName: string) => {
    setSelectedFile(fileId);
    // Navigate to the selected file if it's an MDX file
    if (fileName.endsWith('.mdx')) {
      const slug = fileId.replace('.mdx', '');
      router.push(`/blog/${slug}`);
    }
  }, [router]);

  return (
    <div className={`magic-file-tree relative flex h-96 w-full flex-col overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
        <h3 className="text-sm font-semibold text-foreground">Content Structure</h3>
        <div className="text-xs text-muted-foreground">
          {data.length} {data.length === 1 ? 'item' : 'items'}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Tree
          className="h-full p-2"
          initialSelectedId=""
          initialExpandedItems={["guides", "tutorials"]}
          indicator={true}
          openIcon={<FolderOpenIcon className="size-4 text-blue-600 folder-icon" />}
          closeIcon={<FolderIcon className="size-4 text-slate-600 folder-icon" />}
        >
          {data.map((node) => renderTreeNode(node, handleFileSelect))}
          <CollapseButton 
            elements={data}
            className="collapse-button !bottom-2 !right-2 bg-background/80 backdrop-blur-sm border hover:bg-muted transition-all duration-200 hover:scale-105"
          >
            <span className="text-xs font-medium">Toggle All</span>
          </CollapseButton>
        </Tree>
      </div>
      
      {selectedFile && (
        <div className="border-t bg-muted/20 px-4 py-2 animate-in slide-in-from-bottom-2 duration-200">
          <p className="text-xs text-muted-foreground">
            Selected: <span className="font-mono text-foreground bg-muted/50 px-1 rounded">{selectedFile}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MagicFileTree;