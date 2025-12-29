'use client';

import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarLink } from "@/contants/NavLinks";
import RandomReleaseButton from "./RandomReleaseButton";

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
                                    active
                                        ? "bg-accent text-accent-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                    , 'header-link')}
                            >
                                {link.label}
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
                <NavigationMenuItem>
                    <RandomReleaseButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};