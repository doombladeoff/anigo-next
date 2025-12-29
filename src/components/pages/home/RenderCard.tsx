import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export const RenderCard = ({ anime, index }: { anime: ShikimoriAnime; index: number }) => {
    if (!anime) return null;

    const isLCP = index < 3;

    const poster = anime.poster.mainUrl;
    const score = anime.score.toFixed(1);

    return (
        <Link
            href={`/anime/${slugify(anime.name, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                trim: true
            })}-${anime.id}`}
            className="w-[180px] shrink-0 cursor-pointer group"
            draggable={false}
        >
            <div className="w-[180px] transition-transform duration-300 ease-out transform hover:-translate-y-1 cursor-pointer">
                <div className="relative h-[250px] overflow-hidden rounded-xl shadow-2xl animate-fade">
                    <Image
                        src={poster}
                        alt={anime.russian || anime.name}
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                        quality={30}
                        className="object-cover bg-black/25 dark:bg-white/15 h-[250px] w-auto"
                        loading={isLCP ? "eager" : "lazy"}
                        fetchPriority={isLCP ? "high" : undefined}
                        draggable={false}
                    />

                    {anime.score && (
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-green-700 text-white dark:bg-green-400 dark:text-black text-xs font-bold shadow-lg">
                            {score}
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                {anime.russian}
            </p>
        </Link>
    );
};