import { contentFiles } from "@/util/util";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here

    const content = contentFiles();

    return (
        <div className="flex">
            <div className="w-40">
                <div>content</div>
                {content.map(({ title, url }) => (
                    <div key={url}>
                        <Link href={url}>{title}</Link>
                    </div>
                ))}
            </div>
            <div className="pl-40">
                <div className="prose">{children}</div>
            </div>
        </div>
    );
}
