import { ExpandIcon, ListCollapseIcon, Shrink } from "lucide-react";

const ShikiCodeBlockHeader = ({
    filename,
    expanded,
    toggleExpand,
}: {
    filename?: string;
    expanded: boolean;
    toggleExpand: () => void;
}) => {
    return (
        <div>
            {filename && (
                <>
                    <button
                        className=" absolute flex items-center gap-1 cursor-pointer group-hover:underline -top-4 border border-black font-mono font-bold left-0 bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 text-sm"
                        onClick={toggleExpand}
                    >
                        {filename}{" "}
                        {expanded ? (
                            <Shrink className="h-4 w-4 text-blue-500" />
                        ) : (
                            <ExpandIcon className="h-4 w-4 text-red-500" />
                        )}
                    </button>
                </>
            )}
        </div>
    );
};

export default ShikiCodeBlockHeader;
