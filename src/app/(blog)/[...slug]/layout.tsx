import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const wortFardFont = localFont({
    src: "./wotfard-regular-webfont.woff2",
    display: "swap",
});

export default function layout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here

    return (
        <div
            className={cn(
                `prose max-w-none w-full sm:px-6 lg:max-w-[900px] lg:mx-auto`,
                wortFardFont.className
            )}
        >
            <ScrollProgress className="h-1" />
            {children}
        </div>
    );
}
