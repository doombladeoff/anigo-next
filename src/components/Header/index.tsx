"use client";

import * as React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

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
import { ToggleTheme } from "../ToggleTheme";
import { Button } from "../ui/button";


// Types
export interface Navbar01NavLink {
    href: string;
    label: string;
    active?: boolean;
}

const defaultNavigationLinks: Navbar01NavLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/anime', label: 'Аниме' },
];

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
    navigationLinks?: Navbar01NavLink[];
    signInText?: string;
    signInHref?: string;
    ctaText?: string;
    ctaHref?: string;
    onSignInClick?: () => void;
    onCtaClick?: () => void;
    onMenuOpen?: (v: boolean) => void;
}

const Header = React.forwardRef<HTMLElement, Navbar01Props>(
    (
        {
            className,
            logoHref = '/',
            navigationLinks = defaultNavigationLinks,
            signInText = 'Sign In',
            signInHref = '#signin',
            ctaText = 'Get Started',
            ctaHref = '#get-started',
            onSignInClick,
            onCtaClick,
            onMenuOpen,
            ...props
        },
        ref
    ) => {
        const [searchMode, setSearchMode] = useState(false);
        const [menuOpen, setMenuOpen] = useState(false);

        const pathname = usePathname();
        // const isMobile = useIsMobile();

        useEffect(() => {
            if (searchMode || menuOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        }, [searchMode, menuOpen]);

        const [isMobile, setIsMobile] = useState(false);
        const containerRef = React.useRef<HTMLElement>(null);

        useEffect(() => {
            const checkWidth = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth;
                    setIsMobile(width < 768); // 768px is md breakpoint
                }
            };

            checkWidth();

            const resizeObserver = new ResizeObserver(checkWidth);
            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            return () => {
                resizeObserver.disconnect();
            };
        }, []);

        // Combine refs
        const combinedRef = React.useCallback((node: HTMLElement | null) => {
            containerRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        }, [ref]);

        if (pathname === '/anime' && isMobile) return;

        return (
            <>
                <header
                    ref={combinedRef}
                    className={cn(
                        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
                        className
                    )}
                    {...(props as any)}
                >
                    <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                        {/* Left side */}
                        <div className="flex items-center gap-2">
                            {/* Main nav */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer">
                                    <HeaderLogo />
                                </div>
                                {/* Navigation menu */}
                                {!isMobile && (
                                    <NavigationMenu className="flex">
                                        <NavigationMenuList className="gap-1">
                                            {navigationLinks.map((link, index) => (
                                                <NavigationMenuItem key={index}>
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        className={cn(
                                                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                                                            link.active
                                                                ? "bg-accent text-accent-foreground"
                                                                : "text-foreground/80 hover:text-foreground"
                                                        )}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </NavigationMenuItem>
                                            ))}
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                )}
                            </div>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <RandomAnimeButton />
                            <button onClick={() => setSearchMode(true)}>
                                <SearchIcon />
                            </button>
                            <ToggleTheme />
                            {isMobile && (
                                <Button
                                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMenuOpen(true)}
                                >
                                    <MenuIcon />
                                </Button>
                            )}
                        </div>
                    </div>
                </header>


                {/* <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10">
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
                        <ModeToggle />

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
            </header> */}

                {searchMode && <SearchOverlay closeModal={setSearchMode} />}

                <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </>
        );
    });

export default Header;
