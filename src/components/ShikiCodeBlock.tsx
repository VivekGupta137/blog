import { convertRangeStringToArray } from "@/util/util";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface Props {
    children: string;
    lang: BundledLanguage;
    highlightLines?: string;
    filename?: string;
}
const ShikiCodeBlock = async (props: Props) => {
    const lineNumbers = props.highlightLines
        ? convertRangeStringToArray(props.highlightLines)
        : [];

    const out = await codeToHtml(props.children, {
        lang: props.lang,
        theme: "vitesse-light",
        meta: {
            filename: "example.ts",
            lineNumbers: true,
        },
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
                            "highlighted pr-4 pl-[14px] -mx-4 inline-block w-fit min-w-[calc(100%+32px)] bg-gray-50 transition-all group-hover:bg-gray-100 dark:bg-green-900/20 border-l-2 border-l-green-500 box-border"
                        );
                },
            },
        ],
    });

    return (
        <div className="relative">
            {props.filename && (
                <div className="absolute -top-3 border font-mono font-bold left-0 bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 text-sm">
                    {props.filename}
                </div>
            )}

            <div
                className=" text-lg sm:text-xl border-4 rounded-md border-dashed sm:-mx-6"
                dangerouslySetInnerHTML={{ __html: out }}
            />
        </div>
    );
};

export default ShikiCodeBlock;
