'use client';

import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarLink } from "@/contants/NavLinks";

export const Navigation = ({ navigationLinks }: { navigationLinks: NavbarLink[] }) => {
    const pathname = usePathname();
    return (
        <NavigationMenu className="flex">
            <NavigationMenuList className="gap-1">
                {navigationLinks.map((link, index) => {
                    const active = link.href === pathname;
                    return (
                        <NavigationMenuItem key={index}>
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                                    active
                                        ? "bg-accent text-accent-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};