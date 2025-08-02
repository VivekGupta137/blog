export default function layout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <div className="prose ">{children}</div>;
}
