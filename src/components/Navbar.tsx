"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    // check active link

    const currentPath = usePathname();

    return (
        <div className="flex gap-4 my-8 justify-center">
            {/* <Link
                href="/"
                className={currentPath === "/" ? "font-bold underline" : ""}
            >
                Home
            </Link>
            <Link
                href="/about"
                className={
                    currentPath === "/about" ? "font-bold underline" : ""
                }
            >
                About
            </Link> */}
            <Link
                href="/"
                className={
                    currentPath.includes("/") ? "font-bold underline" : ""
                }
            >
                Blog
            </Link>
        </div>
    );
};

export default Navbar;
