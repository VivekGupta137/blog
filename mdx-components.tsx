import type { MDXComponents } from "mdx/types";
import Mermaid from "./src/components/Mermaid";
import CodeBlock from "./src/components/CodeBlock";
import ScrollablePlantUML from "./src/components/ScrollablePlantUML";
import React, { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import GesturePlantUML from "@/components/GesturePlantUML";
import ShikiCodeBlock from "@/components/ShikiCodeBlock";

const jetbrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

const components: MDXComponents = {
    // Add your custom components here
    // For example:
    h2: (props) => {
        const { children, className: _, ref, ...rest } = props;
        return (
            <h2 {...rest} className="text-4xl font-[500px]">
                {children as ReactNode}
            </h2>
        );
    },
    // p: (props) => <p className="text-base" {...props} />,
    code: (props) => {
        const { children, className: _, ref, ...rest } = props;

        return (
            <code
                className={cn(
                    "before:content-[''] after:content-[''] border rounded-md px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-900 dark:text-gray-100 ",
                    jetbrains_mono.className
                )}
            >
                {children as ReactNode}
            </code>
        );
    },
    pre: (props) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ref, ...rest } = props;
        if (children && typeof children === "object" && "props" in children) {
            const { className, children: code } = children.props;

            // Handle mermaid diagrams
            if (className === "language-mermaid" && typeof code === "string") {
                return <Mermaid>{code}</Mermaid>;
            }

            // Handle plantuml diagrams
            if (className === "language-plantuml" && typeof code === "string") {
                return <GesturePlantUML src={code} alt="PlantUML Diagram" />;
            }

            // Handle regular code blocks
            if (className && typeof code === "string") {
                const language = className.replace("language-", "");

                // Extract fi\lename and highlight info from code if it starts with a comment
                let filename;
                let highlightLines;
                let cleanCode = code;
                const lines = code.split("\n");

                if (
                    lines[0] &&
                    (lines[0].trim().startsWith("//") ||
                        lines[0].trim().startsWith("#"))
                ) {
                    const firstLine = lines[0].trim();

                    // Check for filename
                    const filenameMatch = firstLine.match(
                        /^(?:\/\/|#)\s*(.+\.[a-zA-Z]+)(?:\s+highlight=(.+))?$/
                    );
                    if (filenameMatch) {
                        filename = filenameMatch[1];
                        if (filenameMatch[2]) {
                            highlightLines = filenameMatch[2];
                        }
                        cleanCode = lines
                            .slice(1)
                            .join("\n")
                            .replace(/^\n/, "");
                    } else {
                        // Check for highlight-only comment
                        const highlightMatch = firstLine.match(
                            /^(?:\/\/|#)\s*highlight=(.+)$/
                        );
                        if (highlightMatch) {
                            highlightLines = highlightMatch[1];
                            cleanCode = lines
                                .slice(1)
                                .join("\n")
                                .replace(/^\n/, "");
                        }
                    }
                }

                return (
                    <ShikiCodeBlock
                        lang={language}
                        highlightLines={highlightLines}
                        filename={filename}
                    >
                        {cleanCode}
                    </ShikiCodeBlock>
                );
            }
        }
        return <pre {...rest}>{children as ReactNode}</pre>;
    },
};

export function useMDXComponents(): MDXComponents {
    return components;
}
