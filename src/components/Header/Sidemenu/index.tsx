'use client';

import { motion, AnimatePresence } from "framer-motion";
import { HeaderNavigation } from "./HeaderNavigation";
import { RandomAnimeButton } from "../RandomAnimeButton";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useUser } from "@/context/UserContext";

interface SideMenuProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}
export const SideMenu = ({ menuOpen, setMenuOpen }: SideMenuProps) => {
    const { user } = useUser();
    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-50 backdrop-blur-md md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-0 h-full w-64 dark:bg-black bg-white border-l border-white/10 p-6 flex flex-col gap-6"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <HeaderNavigation closeMenu={() => setMenuOpen(false)} />
                        <RandomAnimeButton onCloseMenu={setMenuOpen} />
                        {!user ? (
                            <Link href="/auth/login">
                                <Button onClick={() => setMenuOpen(false)} className="mt-4 px-3 py-2 w-full text-sm hover:bg-white/20 transition">
                                    Войти
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/dashboard">
                                <Button onClick={() => setMenuOpen(false)} className="mt-4 px-3 py-2 w-full text-sm hover:bg-white/20 transition">
                                    Профиль
                                </Button>
                            </Link>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};