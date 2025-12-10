
'use client'

import Link from "next/link";
import Image from "next/image";

type Update = {
    id: string;
    shikimori_id: string;
    title: string;
    translation?: { title?: string };
    material_data?: { anime_poster_url?: string };
    updated_at: string; // ISO дата обновления
};

interface Props {
    updates: Update[];
}

export const LastUpdatesSection = ({ updates }: Props) => {
    // Разбиваем по дате
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (dateStr: string) => new Date(dateStr).toDateString();

    const todayUpdates = updates.filter(u => formatDate(u.updated_at) === today.toDateString());
    const yesterdayUpdates = updates.filter(u => formatDate(u.updated_at) === yesterday.toDateString());
console.log(updates)
    const renderCards = (items: Update[]) => (
        <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            {items.map(item => (
                <Link key={item.id}
                    //href={`/anime/${item.shikimori_id}`}
                    href={`/anime/${item?.title?.toLowerCase().replace(/\s+/g, '-')}-${item.id}`}
                >
                    <div className="w-[180px] flex-shrink-0 cursor-pointer group bg-amber-100">
                        <div className="relative w-full h-[260px] rounded-xl shadow-lg bg-amber-100">
                            {/* <Image
                                src={item.material_data?.anime_poster_url || ''}
                                alt={item.title}
                                fill
                                className="object-cover bg-amber-100 transition-transform duration-300 group-hover:scale-105"
                            /> */}
                        </div>
                        <p className="mt-2 font-semibold text-sm line-clamp-2">{item.title}</p>
                        {item.translation?.title && (
                            <p className="text-xs opacity-60 mt-1 line-clamp-1">{item.translation.title}</p>
                        )}
                    </div>
                </Link>
            ))
            }
        </div >
    );

    return (
        <div className="space-y-8">
            {todayUpdates.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Сегодня</h2>
                    {renderCards(todayUpdates)}
                </div>
            )}

            {yesterdayUpdates.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Вчера</h2>
                    {renderCards(yesterdayUpdates)}
                </div>
            )}
        </div>
    );
};
