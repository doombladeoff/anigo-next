import Image from "next/image";
import { KIND_FILTERS } from "@/contants/Filters";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const SearchItem = ({ item, index }: { item: ShikimoriAnime, index: number }) => {
    const kindLabel = KIND_FILTERS.find(k => k.key === item?.kind)?.label;
    const title = item.russian || item.name;
    return (
        <>
            <div className="relative w-full aspect-2/3 rounded-xl">
                {item?.poster?.main2xUrl && (
                    <Image
                        draggable={false}
                        src={item?.poster?.preview2xUrl}
                        alt={item.russian}
                        fill
                        fetchPriority='high'
                        className="object-cover rounded-md bg-gray-600/20 shadow-xl animate-fade"
                        loading={index < 10 ? "eager" : "lazy"}
                        quality={75}
                        unoptimized
                    />
                )}

                <div className="absolute top-2 left-2 z-10">
                    {item.status === "anons" ? (
                        <div className="text-xs bg-red-500 px-2 py-1 rounded-lg text-white">
                            Анонс
                        </div>
                    ) : (
                        item.score && (
                            <div className="text-xs bg-green-500 px-2 py-1 rounded-lg text-white">
                                {item.score.toFixed(1)}
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between py-1">
                <p className="font-semibold text-sm line-clamp-2">
                    {title}
                </p>

                <p className="dark:text-white/60 text-black/50 text-sm mt-1">
                    {kindLabel || item.kind} {item.kind === 'tv' ? 'Сериал' : ''}
                </p>
            </div>
        </>
    );
};