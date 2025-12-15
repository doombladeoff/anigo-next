import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Image from "next/image";
import Link from "next/link";

export const RenderCard = ({ anime, index }: { anime: ShikimoriAnime; index: number }) => {
    return (
        <Link
            href={`/anime/${anime?.name?.toLowerCase().replace(/\s+/g, "-")}-${anime.id}`}
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
                <div
                    className={`
                        relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-gray-800
                        opacity-0 animate-fade
                        transition-opacity duration-700 delay-${index * 50}
                    `}
                >
                    <Image
                        src={anime?.poster?.main2xUrl || ""}
                        alt={anime?.russian || "anime_poster"}
                        className="object-cover w-full h-full bg-white/50"
                        loading={index < 10 ? "eager" : "lazy"}
                        draggable={false}
                        width={180}
                        height={260}
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