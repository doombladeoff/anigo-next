import Image from "next/image";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const SeasonItem = ({ item }: { item: ShikimoriAnime; }) => {
    return (
        <div className="w-[180px] shrink-0 group">
            <div className="relative w-[180px] h-[260px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src={item.poster.mainUrl}
                    alt={item.russian || item.name}
                    fill
                    sizes="180px"
                    quality={50}
                    loading={'eager'}
                    draggable={false}
                    className="
                        object-cover
                        bg-black/25
                        dark:bg-white/15
                        transition-transform duration-500 ease-out
                        group-hover:scale-105
                    "
                />

                {item.score && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
                        {item.score.toFixed(1)}
                    </div>
                )}

                <div className="
                    absolute inset-0
                    bg-black/60
                    opacity-0
                    transition-opacity duration-300
                    group-hover:opacity-100
                    flex items-center justify-center
                    px-2 text-center
                ">
                    <span className="text-white text-sm font-semibold line-clamp-3">
                        {item.russian}
                    </span>
                </div>
            </div>

            <p className="mt-2 text-sm font-semibold line-clamp-2 opacity-90">
                {item.russian}
            </p>
        </div>
    );
};
