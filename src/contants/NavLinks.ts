export interface NavbarLink {
    href: string;
    label: string;
}

export const NavigationLinks: NavbarLink[] = [
    { href: '/', label: 'Главная' },
    { href: '/anime/catalog', label: 'Аниме' },
];
