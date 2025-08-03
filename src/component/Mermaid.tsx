"use client";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";

export default function Mermaid({ children }: { children: string }) {
    // This component wraps the MermaidDiagram component to render Mermaid diagrams
    // It can be used in MDX files or other components where Mermaid diagrams are needed
    return (
        <div className="flex justify-center">
            <MermaidDiagram>{children}</MermaidDiagram>
        </div>
    );
}
