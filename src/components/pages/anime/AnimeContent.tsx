'use client';

import { SimilarAnime } from "./Similar"
import Player from "./Player"
import { Description } from "./Description"
import NextEpisode from "./NextEpisodeDate"
import { AnimeFields } from "@/app/api/AnimeFields";
import { Loader } from "../../Loader";
import { notFound } from "next/navigation";
import { Tabs } from "./Tabs";
import { Info as InfoCard } from "./Info";
import { Score } from "./Score";
import { Suspense, useEffect, useState } from "react";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    episodes: true,
    episodesAired: true,
    nextEpisodeAt: true,
    rating: true,
    kind: true,
    status: true,
    descriptionHtml: true,
    description: true,
    poster: {
        mainUrl: true,
        main2xUrl: true,
        preview2xUrl: true,
    },
    screenshots: {
        id: true,
        originalUrl: true,
        x332Url: true,
    },
    score: true,
    related: {
        id: true,
        anime: {
            id: true,
            name: true,
            poster: {
                preview2xUrl: true
            }
        },
        relationKind: true,
        relationText: true
    }
};

export const AnimeContent = ({ id, link }: { id: string, link: string }) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const res = await fetch("/api/anime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, variables: { ids: id, limit: 1 } }),
        })
            .then(r => r.json())
            .then(r => setData(r))
            .then(() => setLoading(false));
        return res;
    }
    useEffect(() => { getData() }, [id]);

    if (loading) {
        return <Loader />;
    };

    if (!data?.animes && !loading) {
        return notFound();
    };

    const anime = data.animes[0] as ShikimoriAnime;

    const poster = anime?.poster?.main2xUrl;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="py-5 xl:py-20 xl:pt-10 max-w-7xl w-full space-y-10 z-10">
                <div className="md:flex flex-row gap-5 items-center">
                    <h1 className="px-5 text-left text-3xl sm:text-4xl md:text-5xl font-bold leading-tight z-9999 md:flex flex-row gap-5 items-center">
                        {anime?.russian || anime?.name}
                        <Score score={anime.score} />
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-8 px-5">
                    <div className="relative w-68 perspective-[1000px] group">
                        <div className="object-cover w-full h-full 
                        relative rounded-3xl overflow-hidden 
                        transition-transform duration-500 transform-gpu 
                        will-change-transform group-hover:rotate-y-[8deg] 
                        group-hover:rotate-x-5 group-hover:scale-[1.05] group-hover:shadow-2xl 
                        group-hover:shadow-black/40backface-hidden transform-3d shadow-2xl"
                            style={{
                                height: '100%',
                                width: '100%',
                            }}>
                            {poster && (
                                <img
                                    alt={anime.russian || anime.name}
                                    loading='eager'
                                    src={poster}
                                    decoding='async'
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        inset: '0px',
                                        color: 'transparent'
                                    }}
                                />
                                // <Image
                                //     src={poster}
                                //     alt={anime.russian || anime.name}
                                //     width={100}
                                //     height={240}
                                //     className="object-cover w-full h-full relative rounded-3xl overflow-hidden transition-transform duration-500 transform-gpu will-change-transform group-hover:rotate-y-[8deg] group-hover:rotate-x-5 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:shadow-black/40backface-hidden transform-3d shadow-2xl"
                                //     loading="eager"
                                //     draggable={false}
                                //     priority
                                //     fetchPriority='high'
                                // />
                            )}
                        </div>
                    </div>
                    <div className="z-0 flex flex-col gap-4">
                        <InfoCard anime={anime} />
                        {anime.nextEpisodeAt && (
                            <NextEpisode nextEpisodeAt={anime.nextEpisodeAt} />
                        )}
                    </div>
                </div>

                <Description htmlDescription={anime.descriptionHtml} description={anime.description} />
                <Tabs anime={anime} id={id} />
                <Player link={link} />
                <Suspense fallback={<div>Loading...</div>}>
                    <SimilarAnime id={id} />
                </Suspense>

            </div>
        </div>
    );
};