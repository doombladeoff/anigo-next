import Link from "next/link";

export const HeaderLogo = () => {
    return (
        <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight text-white"
        >
            <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                Ani
            </span>
            <span className="text-white">GO</span>
        </Link>
    );
};