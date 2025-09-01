"use client";
import { useState } from "react";
import ShikiCodeBlockHeader from "./ShikiCodeBlockHeader";

const ShikiCodeBlockContent = ({
    children,
    filename,
    initiallyExpanded = true,
}: {
    children: React.ReactNode;
    filename?: string;
    initiallyExpanded?: boolean;
}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div>
            <ShikiCodeBlockHeader
                filename={filename}
                expanded={expanded}
                toggleExpand={toggleExpand}
            />
            {expanded && <div className="code-block-content">{children}</div>}
        </div>
    );
};

export default ShikiCodeBlockContent;
