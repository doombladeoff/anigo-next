'use client';

import { buildAnimeQuery, client } from "@/lib/apollo";
import Link from "next/link";
import { SeasonItem } from "./SeasonsItem";
import { getCurrentSeason } from "@/utils/getCurrentSeason";
import { AnimeFields } from "@/app/api/AnimeFields";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { useQuery } from "@apollo/client/react";
import { Skeleton } from "../../ui/skeleton";

const seasonNames: Record<string, string> = {
    winter: "зимнего",
    spring: "весеннего",
    summer: "летнего",
    fall: "осеннего",
};

const fields: AnimeFields = {
    id: true,
    russian: true,
    poster: {
        originalUrl: true
    },
    score: true,
};
const query = buildAnimeQuery(fields);

type AnimeQueryResult = {
    animes: ShikimoriAnime[];
};

const SeasonsAnime = () => {
    const { season, year } = getCurrentSeason();

    const { data, loading, error } = useQuery<AnimeQueryResult>(query, {
        variables: { limit: 7, season: `${season}_${year}` },
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

    if (error) return null;
    if (!data?.animes?.length) return null;

    return (
        <>
            <h1 className="px-5 sm:px-5 md:px-10 xl:px-15 font-semibold text-2xl mb-4">
                Аниме {seasonNames[season]} сезона
            </h1>

            <div className="flex gap-5 overflow-x-auto px-5 justify-start xl:justify-center hide-scrollbar">
                {data.animes.map((anime: any, index) => (
                    <Link
                        key={anime.id}
                        href={`/anime/${anime.id}`}
                    >
                        <SeasonItem item={anime} index={index} />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SeasonsAnime;
