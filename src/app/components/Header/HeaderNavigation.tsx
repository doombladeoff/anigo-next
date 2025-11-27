import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
    { name: "Главная", href: "/" },
    { name: "Аниме", href: "/anime" },
];

export const HeaderNavigation = ({ closeMenu }: { closeMenu?: () => void }) => {
    const pathname = usePathname();
    return (
        <>
            {nav.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu ? closeMenu : undefined}
                        className={`text-lg transition-all ${active
                            ? "text-indigo-400 font-semibold"
                            : "text-white/60 hover:text-white"
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </>
    );
};