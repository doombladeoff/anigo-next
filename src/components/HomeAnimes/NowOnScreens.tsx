'use client';

import { useQuery } from "@apollo/client/react";
import { ScrollDrag } from "../ScrollDrag";
import { AnimeFields } from "@/app/api/AnimeFields";
import { buildAnimeQuery } from "@/lib/apollo";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { Skeleton } from "../ui/skeleton";
import { RenderCard } from "./RenderCard";
import { SkeletonPlaceholder } from "./SkeletonPlaceholder";

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
        return <SkeletonPlaceholder title="Сейчас на экранах" num={15} />
    };

    if (!data?.animes || error) {
        return <span>Error loading top rated anime.</span>;
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Сейчас на экранах</h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {data.animes.map((anime: any, index: number) => (
                    <RenderCard key={anime.id} anime={anime} index={index} />
                ))}
            </ScrollDrag>
        </div>
    );
};