import { contentFiles } from "@/util/util";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here

    return <div className="prose lg:w-[900px]">{children}</div>;
}
