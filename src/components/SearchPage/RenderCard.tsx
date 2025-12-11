import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { SearchItem } from "../Header/Search/SearchItem";
import { STATUS_FILTERS } from "@/contants/Filters";


function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export const RenderCard = ({ item, index }: { item: any, index: number }) => {
    const episodesAired =
        item.status === "anons"
            ? 0
            : item.status === "released" && (item.episodesAired <= 0 || item.episodesAired < item.episodes)
                ? item.episodes
                : item.episodesAired;

    return (
        <HoverCard openDelay={300}>
            <HoverCardTrigger asChild>
                <Link href={`/anime/${item?.name?.toLowerCase().replace(/\s+/g, '-')}-${item.id}`} className="block">
                    <SearchItem item={item} index={index} />
                </Link>
            </HoverCardTrigger>
            <HoverCardContent
                className="w-lg"
                side="right"
                align="start"
            >
                <div className="space-y-4">
                    {/* Заголовок */}
                    <div className="space-y-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{item.russian}</h4>
                        <h5 className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">{item.name}</h5>
                    </div>

                    {/* Основная информация */}
                    <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 dark:text-gray-200">Статус</span>
                            <span className="mt-1">{STATUS_FILTERS.find(s => s.key === item.status)?.label || "—"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 dark:text-gray-200">Выпуск</span>
                            <span className="mt-1">{item.airedOn ? `${formatDate(item.airedOn.date)}` : "—"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 dark:text-gray-200">Эпизоды</span>
                            <span className="mt-1">{episodesAired} из {item.episodes || "—"}</span>
                        </div>
                    </div>

                    {/* Жанры */}
                    {item?.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {item.genres.map((g: any) => (
                                <Link
                                    href={''}
                                    onClick={() => { }}
                                    key={g.id}
                                    className="px-2 py-1 text-xs font-medium border rounded-sm border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200"
                                >
                                    {g.russian}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};