import Image from "next/image";
import { KIND_FILTERS } from "@/contants/Filters";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const SearchItem = ({ el, index }: { el: ShikimoriAnime, index: number }) => {
    const kindLabel = KIND_FILTERS.find(k => k.key === el?.kind)?.label;
    return (
        <div>
            <div className="relative w-full aspect-2/3 rounded-xl">
                {el?.poster?.main2xUrl && (
                    <Image
                        draggable={false}
                        src={el?.poster?.preview2xUrl}
                        alt={el.russian}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md bg-gray-600/20"
                        loading={index < 10 ? "eager" : "lazy"}
                        quality={75}
                    />
                )}

                <div className="absolute top-2 left-2 z-10">
                    {el.status === "anons" ? (
                        <span className="text-xs bg-red-500 px-2 py-1 rounded-lg text-white">
                            Анонс
                        </span>
                    ) : (
                        el.score && (
                            <span className="text-xs bg-black/70 px-2 py-1 rounded-lg text-white">
                                {el.score.toFixed(1)}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between py-1">
                <p className="font-semibold text-sm line-clamp-2">
                    {el.russian || el.name}
                </p>

                <p className="dark:text-white/60 text-black/50 text-sm mt-1">
                    {kindLabel || el.kind} {el.kind === 'tv' ? 'Сериал' : ''}
                </p>
            </div>
        </div>
    );
};