'use client';

import Image from "next/image"
import { BlurBackgoround } from "./BlurBackground"
import { StarIcon } from "lucide-react"
import { SimilarAnime } from "./Similar"
import Player from "./Player"
import { Description } from "./Description"
import NextEpisode from "./NextEpisodeDate"
import { AnimeFields } from "@/app/api/AnimeFields";
import { buildAnimeQuery } from "@/lib/apollo";
import { useQuery } from "@apollo/client/react";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { KIND_FILTERS, RATING_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { Loader } from "./Loader";
import { notFound } from "next/navigation";

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
const query = buildAnimeQuery(fields);
type AnimeQueryResult = {
    animes: ShikimoriAnime[];
};

export const PageContent = ({ id, link }: { id: string, link: string }) => {

    const { data, loading, error } = useQuery<AnimeQueryResult>(query, {
        variables: { ids: id, limit: 1 },
    });

    if (loading) {
        return <Loader />;
    };

    if (!data?.animes || error) {
        return notFound();
    };

    const anime = data.animes[0];

    return (
        <div className="w-full flex flex-col items-center">
            <BlurBackgoround img={anime?.poster?.preview2xUrl} />
            <div className="py-5 xl:py-20 xl:pt-10 max-w-7xl w-full space-y-10 z-10">
                <h1 className="px-5 sm:px-0 text-left sm:text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight z-9999">
                    {anime?.russian || anime?.name}
                </h1>
                <div className="flex flex-col md:flex-row gap-8 px-5">
                    <div className="relative w-68 perspective-[1000px] group">
                        <div className="relative w-full rounded-3xl overflow-hidden transition-transform duration-500 transform-gpu will-change-transform
                            group-hover:rotate-y-[8deg] group-hover:rotate-x-5 group-hover:scale-[1.05]
                            group-hover:shadow-2xl group-hover:shadow-black/40
                            backface-hidden transform-3d shadow-2xl
                            "
                        >
                            <Image
                                src={anime?.poster?.main2xUrl || ""}
                                alt="poster"
                                width={100}
                                height={240}
                                className="object-cover w-full h-full"
                                unoptimized
                                loading="eager"
                                draggable={false}
                                priority
                                fetchPriority='high'
                            />
                        </div>
                    </div>
                    <div className="z-0 flex flex-col gap-4">
                        {anime?.score && (
                            <div className="flex flex-row gap-2">
                                <StarIcon
                                    size={32}
                                    fill="rgb(92, 220, 52)"
                                    color="rgb(92, 220, 52)"
                                />
                                <span className="text-3xl font-semibold text-[rgb(92,220,52)]">
                                    {anime?.score}
                                </span>
                            </div>
                        )}

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl w-full">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Информация</h2>

                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                                <Info label="Тип" value={KIND_FILTERS.find(k => k.key === anime.kind)?.label || "—"} />
                                <Info label="Статус" value={STATUS_FILTERS.find(k => k.key === anime.status)?.label || "—"} />
                                <Info label="Эпизоды" value={anime.episodes} />
                                <Info label="Эпизодов доступно" value={anime.episodesAired} />
                                <Info label="Возрастной рейтинг" value={RATING_FILTERS.find(k => k.key === anime.rating)?.label || "—"} />
                            </div>
                        </div>
                        {anime.nextEpisodeAt && (
                            <NextEpisode nextEpisodeAt={anime.nextEpisodeAt} />
                        )}
                    </div>
                </div>

                <Description htmlDescription={anime.descriptionHtml} description={anime.description} />
                <Player link={link} />
                <SimilarAnime id={id} />
            </div>
        </div>
    )
}

function Info({ label, value }: any) {
    return (
        <div className="flex justify-between bg-white/5 p-3 rounded-xl border border-white/10">
            <span>{label}</span>
            <span className="font-semibold">{value || "—"}</span>
        </div>
    );
}