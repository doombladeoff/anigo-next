"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./Search/SearchOverlay";
import { HeaderLogo } from "./HeaderLogo";
import { usePathname } from "next/navigation";
import { SideMenu } from "./Sidemenu";
import { UserAuth } from './User';
import { Navigation } from './Nav/Navigation';
import { NavigationLinks } from "@/contants/NavLinks";
import { useIsMobile } from "@/hooks/use-mobile";
import SwitchTheme from "./SwitchTheme";

const Header = () => {
    const [searchMode, setSearchMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    const pathname = usePathname();
    const isMobile = useIsMobile();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (searchMode || menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [searchMode, menuOpen]);

    if (pathname === '/anime/catalog' && isMobile) return;

    if (!mounted) return;

    return (
        <>
            <header className="header-base-style">
                <div className="flex h-16 w-full items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer">
                                <HeaderLogo />
                            </div>
                            {!isMobile && (<Navigation navigationLinks={NavigationLinks} />)}
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSearchMode(true)}
                            className="cursor-pointer"
                            aria-label="Открыть поиск"
                        >
                            <SearchIcon aria-hidden="true" />
                        </button>
                        {!isMobile && (<SwitchTheme />)}
                        {isMobile && (
                            <button
                                className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setMenuOpen(true)}
                            >
                                <MenuIcon />
                            </button>
                        )}
                        {!isMobile && (<UserAuth />)}
                    </div>
                </div>
            </header>

            {searchMode && <SearchOverlay closeModal={setSearchMode} />}

            <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
};

export default Header;
