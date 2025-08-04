
export default function layout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here

    return (
        <div className="prose max-w-none w-full sm:px-6 lg:max-w-[900px] lg:mx-auto">
            {children}
        </div>
    );
}
