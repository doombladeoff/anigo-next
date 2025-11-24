"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { RandomAnimeButton } from "./RandomAnimeButton";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNavigation } from "./HeaderNavigation";

const Header = () => {
    const [searchMode, setSearchMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

            {searchMode && (
                <div
                    onClick={() => setSearchMode(false)}
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade"
                >
                    <SearchOverlay />
                </div>
            )}

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="
                                absolute right-0 top-0 h-full w-64 
                                bg-black/80 backdrop-blur-xl 
                                border-l border-white/10 
                                p-6 flex flex-col gap-6
                            "
                            initial={{ x: 300 }}
                            animate={{ x: 0 }}
                            exit={{ x: 300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <HeaderNavigation />
                            <RandomAnimeButton onCloseMenu={setMenuOpen} />
                            <Link href="/auth/login">
                                <button onClick={() => setMenuOpen(false)} className="mt-4 px-3 py-2 w-full bg-white/10 border border-white/10 rounded-xl text-sm hover:bg-white/20 transition">
                                    Войти
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
