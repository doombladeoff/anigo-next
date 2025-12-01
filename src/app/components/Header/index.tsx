"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./Search/SearchOverlay";
import { RandomAnimeButton } from "./RandomAnimeButton";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNavigation } from "./HeaderNavigation";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { SideMenu } from "./SideMenu";

const Header = () => {
    const [searchMode, setSearchMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const pathname = usePathname();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (searchMode || menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [searchMode, menuOpen]);

    if (pathname === '/anime' && isMobile) return;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex flex-row gap-10">
                        <HeaderLogo />
                        <div className="flex flex-row items-center gap-4">
                            <nav className="hidden md:flex gap-6">
                                <HeaderNavigation />
                            </nav>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block">
                            <RandomAnimeButton />
                        </div>
                        <button onClick={() => setSearchMode(true)}>
                            <SearchIcon size={30} />
                        </button>

                        <Link href="/auth/login" className="hidden md:block">
                            <button className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl text-sm hover:bg-white/20 transition">
                                Войти
                            </button>
                        </Link>

                        <button
                            className="md:hidden flex flex-col gap-[5px]"
                            onClick={() => setMenuOpen((p) => !p)}
                        >
                            <MenuIcon size={32} />
                        </button>
                    </div>
                </div>
            </header>

            {searchMode && <SearchOverlay closeModal={setSearchMode} />}

            <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
};

export default Header;
