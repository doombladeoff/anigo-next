import Image from "next/image";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Link from "next/link";
import slugify from "slugify";

export const SeasonItem = ({ item, index }: { item: ShikimoriAnime; index: number }) => {

    const isLCP = index < 3;

    const poster = item.poster.preview2xUrl;
    const score = item.score.toFixed(1);

    return (
        <Link
            draggable={false}
            href={`/anime/${slugify(item.name, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                trim: true
            })}-${item.id}`}
        >
            <div className="group w-[180px] py-2">
                <div className="relative w-[180px] h-[250px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out transform hover:-translate-y-1">
                    <Image
                        src={poster}
                        alt={item.russian || item.name}
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                        quality={30}
                        className="object-cover bg-black/25 dark:bg-white/15"
                        loading={isLCP ? "eager" : "lazy"}
                        fetchPriority={isLCP ? "high" : "auto"}
                        draggable={false}
                    />

                    {item.score && (
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-700 text-white dark:bg-green-400 dark:text-black text-xs font-bold shadow-lg">
                            {score}
                        </div>
                    )}
                </div>
                <p className="mt-2 text-sm font-semibold line-clamp-2 opacity-90">
                    {item.russian}
                </p>
            </div>
        </Link>
    );
};
