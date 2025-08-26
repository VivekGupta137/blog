import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

const Quote = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: ClassValue;
}) => {
    return (
        <div
            className={cn(
                className ?? "border-l-4 pl-4 border-gray-500",
                "mt-8 mb-4"
            )}
        >
            {children}
        </div>
    );
};

export default Quote;
