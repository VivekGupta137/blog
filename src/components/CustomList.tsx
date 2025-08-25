"use client";

import React from "react";

interface CustomListProps {
    type: "pros" | "cons";
    children: React.ReactNode;
    title?: string;
}

/**
 * A simple container component for pros and cons lists
 */
const CustomList = ({ type, children, title }: CustomListProps) => {
    return (
        <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
            {title && (
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-4 rounded-t-lg">
                    <h3 className="font-medium !my-0">{title}</h3>
                </div>
            )}
            <div className="p-4">
                <div className={`prose dark:prose-invert list-${type} `}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomList;
