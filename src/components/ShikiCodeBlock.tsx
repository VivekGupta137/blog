import { cn } from "@/lib/utils";
import { convertRangeStringToArray } from "@/util/util";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import ShikiCodeBlockHeader from "./ShikiCodeBlockHeader";
import ShikiCodeBlockContent from "./ShikiCodeBlockContent";

interface Props {
    children: string;
    lang: BundledLanguage;
    highlightLines?: string;
    filename?: string;
    collapsed: boolean;
}
const ShikiCodeBlock = async (props: Props) => {
    const lineNumbers = props.highlightLines
        ? convertRangeStringToArray(props.highlightLines)
        : [];

    const out = await codeToHtml(props.children, {
        lang: props.lang,
        theme: "github-dark-dimmed",
        transformers: [
            {
                pre(node) {
                    this.addClassToHast(node, "!my-0 has-line-numbers group");
                },
                line(node, line) {
                    node.properties["data-line"] = line;
                    if (lineNumbers.includes(line))
                        this.addClassToHast(
                            node,
                            "highlighted pr-4 pl-[12px] border-l-4 border-l-green-500 box-border duration-300 -mx-4 inline-block w-fit min-w-[calc(100%+32px)] bg-gray-50/20 transition-all group-hover:bg-gray-100/20 "
                        );
                    else
                        this.addClassToHast(
                            node,
                            cn(
                                lineNumbers.length > 0 &&
                                    "not-highlighted group-hover:opacity-80 transition-all duration-300"
                            )
                        );
                },
            },
        ],
    });

    return (
        <div className="relative group mt-5 min-h-4">
            <ShikiCodeBlockContent
                filename={props.filename}
                initiallyExpanded={!props.collapsed}
            >
                <div
                    className=" text-lg sm:text-xl rounded-md border-black border-dashed sm:-mx-6"
                    dangerouslySetInnerHTML={{ __html: out }}
                />
            </ShikiCodeBlockContent>
        </div>
    );
};

export default ShikiCodeBlock;
