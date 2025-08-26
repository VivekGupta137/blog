import { CheckCircle, CheckIcon, QuoteIcon } from "lucide-react";
import Quote from "./Quote";

const SuccessQuote = ({ children }: { children: React.ReactNode }) => {
    return (
        <Quote className="flex items-stretch h-fit w-full">
            <div className="relative w-6 bg-green-50 ">
                <div className="absolute flex justify-center items-center bg-white size-12 shrink-0 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full ">
                    <CheckCircle className="size-9 text-green-500 " />
                </div>
                <div className="bg-green-500 w-1 h-full rounded-full "></div>
            </div>

            <div className="bg-green-50 basis-full">{children}</div>
        </Quote>
    );
};

export default SuccessQuote;
