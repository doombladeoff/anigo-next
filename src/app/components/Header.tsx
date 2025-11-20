"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    const nav = [
        { name: "Главная", href: "/" },
        { name: "Аниме", href: "/anime" },
        { name: "Обновления", href: "/updates" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="text-3xl font-extrabold tracking-tight text-white">
                    <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">Ani</span>
                    <span className="text-white">GO</span>
                </Link>

                <nav className="hidden md:flex gap-6">
                    {nav.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm transition-all ${active
                                    ? "text-indigo-400 font-semibold"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-8">
                    <button>
                        <SearchIcon size={32} />
                    </button>
                    <button className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl text-sm hover:bg-white/20 transition">
                        Войти
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
