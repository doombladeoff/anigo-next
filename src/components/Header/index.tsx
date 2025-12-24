"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./Search/SearchOverlay";
import { RandomAnimeButton } from "./RandomAnimeButton";
import { HeaderLogo } from "./HeaderLogo";
import { usePathname } from "next/navigation";
import { SideMenu } from "./Sidemenu";
import { ToggleTheme } from "./ToggleTheme";
import { UserAuth } from './User';
import { Navigation } from './Navigation';
import { NavigationLinks } from "@/contants/NavLinks";
import { useIsMobile } from "@/hooks/use-mobile";

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

    if (pathname === '/anime/catalog' && isMobile) return null;

    return (
        <>
            <header className={'sticky top-0 z-50 w-full dark:bg-black bg-white px-4 md:px-6 **:no-underline'}>
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
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
                        {!isMobile && (<RandomAnimeButton />)}
                        <button onClick={() => setSearchMode(true)} className="cursor-pointer">
                            <SearchIcon />
                        </button>
                        <ToggleTheme />
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
