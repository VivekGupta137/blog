import Mermaid from "@/component/Mermaid";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
    // Add your custom components here
    // For example:
    // h1: (props) => <h1 className="text-2xl font-bold" {...props} />,
    // p: (props) => <p className="text-base" {...props} />,
    // You can also import and use components from your project
    Mermaid: (props) => <Mermaid {...props} />,
};

export function useMDXComponents(): MDXComponents {
    return components;
}
