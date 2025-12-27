'use client';

import { usePathname, useRouter } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarLink } from "@/contants/NavLinks";
import slugify from "slugify";

export const Navigation = ({ navigationLinks }: { navigationLinks: NavbarLink[] }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleRandomAnime = async () => {
        const res = await fetch("/api/anime/random");
        const anime = await res.json();
        router.push(`/anime/${slugify(anime.name,
            {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                trim: true
            })}-${anime.id}`);
    };

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
                    <a onClick={handleRandomAnime} className="header-link">
                        Случайный релиз
                    </a>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};