import { contentFiles } from "@/util/util";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

const page = () => {
    const content = contentFiles();

    return (
        <div className="">
            <ul>
                {content.map(({ title, url }) => (
                    <li key={url} className="underline">
                        <Link href={url} className="flex items-center gap-2">
                            {title} <LuExternalLink className="inline" />
                        </Link>{" "}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default page;
