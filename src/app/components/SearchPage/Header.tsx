import { ArrowDownNarrowWideIcon, ArrowLeftIcon, SlidersHorizontalIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    openFilters: () => void
};

export const Header = ({ openFilters }: HeaderProps) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/10 border-b border-white/10" style={{ backgroundColor: 'rgb(28,28,28)' }}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href='/' draggable={false}>
                    <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <ArrowLeftIcon size={24} />
                        <span>Назад</span>
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    <button
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        onClick={() => { }}
                    >
                        <ArrowDownNarrowWideIcon size={24} />
                        <span>Сортировка</span>
                    </button>
                    <button
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        onClick={openFilters}
                    >
                        <SlidersHorizontalIcon size={24} />
                        <span>Фильтр</span>
                    </button>
                </div>

            </div>
        </header>
    );
};