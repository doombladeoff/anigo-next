import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export const RenderCard = ({ anime }: { anime: ShikimoriAnime; }) => {
    if (!anime) return null;

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
            <div
                className={`
                    w-[180px] shrink-0 cursor-pointer group
                    transition-transform duration-300 ease-out
                    transform hover:-translate-y-1
                `}
            >
                <div className={"relative w-[180px] h-[260px] overflow-hidden rounded-xl shadow-2xl animate-fade"}>
                    <Image
                        src={anime.poster.mainUrl}
                        alt={anime.russian || "anime_poster"}
                        fill
                        sizes="180px"
                        quality={50}
                        loading={"lazy"}
                        draggable={false}
                        className="object-cover bg-black/25 dark:bg-white/15 transition-transform duration-500 ease-out"
                    />
                    {anime?.score && (
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-green-500 shadow-lg">
                            {anime.score.toFixed(1)}
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                {anime?.russian}
            </p>
        </Link>
    );
};