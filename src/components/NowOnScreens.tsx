'use client';

import { useQuery } from "@apollo/client/react";
import { ScrollDrag } from "./ScrollDrag";
import { AnimeFields } from "@/app/api/AnimeFields";
import { buildAnimeQuery } from "@/lib/apollo";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const fields: AnimeFields = {
    id: true,
    russian: true,
    poster: {
        originalUrl: true,
        main2xUrl: true,
    },
    score: true,
};
const query = buildAnimeQuery(fields);

type AnimeQueryResult = {
    animes: ShikimoriAnime[];
};

export const NowOnScreensAnime = () => {
    const { data, loading, error } = useQuery<AnimeQueryResult>(query, {
        variables: { limit: 15, order: "ranked", status: "ongoing", sort: "ranked", kind: "tv,movie" },
    });

    if (loading) {
        const skeletons = Array.from({ length: 15 });
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Топ рейтинга</h2>
                <div className="flex gap-5 py-2 px-5 xl:px-15 overflow-x-scroll hide-scrollbar">
                    {skeletons.map((_, index) => (
                        <div key={index} className="w-[180px] shrink-0">
                            <Skeleton className="w-full h-[260px] rounded-xl mb-2" />
                            <Skeleton className="w-full h-5 rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (!data?.animes || error) {
        return <span>Error loading top rated anime.</span>;
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Сейчас на экранах</h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {data.animes.map((anime: any, index: number) => (
                    <Link
                        key={anime.id}
                        href={`/anime/${anime.id}`}
                        className="w-[180px] shrink-0 cursor-pointer group"
                        draggable={false}
                    >
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-[180px] shrink-0 cursor-pointer group"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                className="relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-gray-800"
                            >
                                <Image
                                    src={anime?.poster?.main2xUrl || ""}
                                    alt={anime?.russian || "anime_poster"}
                                    className="object-cover w-full h-full bg-white/50"
                                    loading={index < 10 ? "eager" : "lazy"}
                                    draggable={false}
                                    width={180}
                                    height={260}
                                    unoptimized
                                />

                                {anime?.score && (
                                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-green-500 shadow-lg">
                                        {anime.score.toFixed(1)}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                        <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                            {anime?.russian}
                        </p>
                    </Link>
                ))}
            </ScrollDrag>
        </div>
    );
};