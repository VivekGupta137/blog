"use client";
import React, { useState } from "react";
import PlantUML from "react-plantuml";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface ScrollablePlantUMLProps {
    src: string;
    alt?: string;
    maxHeight?: string | number;
    maxWidth?: string | number;
    className?: string;
}

const ScrollablePlantUML: React.FC<ScrollablePlantUMLProps> = ({
    src,
    alt = "PlantUML Diagram",
    maxHeight = "500px",
    maxWidth = "100%",
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={cn("my-4", className)}>
            <div className="flex justify-end mb-1">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                    {isExpanded ? "Collapse" : "Expand"}
                </button>
            </div>
            <ScrollArea className="w-full border rounded-md">
                <div
                    className="overflow-auto"
                    style={{
                        maxHeight: isExpanded ? "none" : maxHeight,
                        maxWidth: isExpanded ? "none" : maxWidth,
                    }}
                >
                    <div className="min-w-max p-2">
                        <PlantUML src={src} alt={alt} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default ScrollablePlantUML;
