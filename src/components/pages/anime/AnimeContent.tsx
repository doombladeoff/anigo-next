import { SimilarAnime } from "./Similar"
import Player from "./Player"
import NextEpisode from "./NextEpisodeDate"
import { AnimeFields } from "@/app/api/AnimeFields";
import { notFound } from "next/navigation";
import { Tabs } from "./Tabs";
import { Score } from "./Score";
import { Suspense } from "react";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { Backgoround } from "./Background";
import { ActionButtons } from "./ActionButtons";
import Image from "next/image";

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

async function getData(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, variables: { ids: id, limit: 1 } }),
        cache: "no-store"
    });

    return res.json();
}

export async function AnimeContent({ id, link }: { id: string; link: string }) {
    const data = await getData(id);

    if (!data) return notFound();

    const anime = data?.animes?.[0] as ShikimoriAnime;
    const poster = anime?.poster?.main2xUrl;

    return (
        <main className="container-page">
            <Backgoround img={anime.poster.preview2xUrl} id={id} />
            <div className="wrapp">
                <div className="top-section">
                    {/* Poster */}
                    <div className="poster-container group">
                        <div
                            className="
                                poster-hover
                                group-hover:rotate-y-[8deg]
                                group-hover:rotate-x-5
                                group-hover:scale-105
                                group-hover:shadow-2xl
                                group-hover:shadow-black/40
                            "
                        >
                            <Image
                                className="poster"
                                src={poster}
                                alt={anime.russian || anime.name}
                                width={600}
                                height={900}
                                priority
                            />
                        </div>
                    </div>

                    {/* Title and buttons */}
                    <div className="flex flex-col space-y-5 w-full">
                        <div className="space-y-2 items-center">
                            <div className="text-left text-2xl sm:text-4xl md:text-4xl font-bold leading-tight z-9999 md:flex flex-row gap-5 items-center">
                                {anime?.russian || anime?.name}
                            </div>
                            <Score score={anime.score} />
                        </div>
                        {anime.nextEpisodeAt && (
                            <NextEpisode nextEpisodeAt={anime.nextEpisodeAt} />
                        )}
                        <ActionButtons />
                    </div>
                </div>

                <Tabs anime={anime} id={id} />
                <Player link={link} />
                <Suspense fallback={<div className="text-center py-10">Загружаем похожие</div>}>
                    <SimilarAnime id={id} />
                </Suspense>
            </div>
        </main>
    );
};