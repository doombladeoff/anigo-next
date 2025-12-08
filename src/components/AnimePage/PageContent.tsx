'use client';

import Image from "next/image"
import { BlurBackgoround } from "./BlurBackground"
import { StarIcon } from "lucide-react"
import { SimilarAnime } from "./Similar"
import Player from "./Player"
import Screenshots from "./Screenshots"
import { Description } from "./Description"
import NextEpisode from "./NextEpisodeDate"
import { AnimeFields } from "@/app/api/AnimeFields";
import { buildAnimeQuery } from "@/lib/apollo";
import { useQuery } from "@apollo/client/react";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { KIND_FILTERS, RATING_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

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
        return (
            <div className="min-h-screen w-full flex-1 flex bg-[#0a0a0c] text-white justify-center items-center">
                <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0c] text-white">
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-2xl animate-pulse" />
                        <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-20 animate-[pulse_1.5s_ease-in-out_infinite]" />

                        <Spinner variant="ring" size={48} className="relative z-10 animate-spin-slow text-purple-400" />
                    </div>
                </div>

                <style jsx>{`
                    .animate-spin-slow {
                        animation: spin 10s linear infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(0.9); opacity: 0.3; }
                        50% { transform: scale(1.2); opacity: 0.5; }
                    }
                `}</style>

            </div>
        );
    };

    if (!data?.animes || error) {
        return <div>Error loading anime data.</div>;
    };

    const anime = data.animes[0];

    return (
        <>
            <BlurBackgoround img={anime?.poster?.preview2xUrl} />
            <div className="py-20 xl:pt-30 w-full">
                <div className="
                    flex 
                    flex-col 
                    md:flex-row 
                    gap-8 
                    items-center
                    justify-center
                    px-5
                ">
                    <div className="relative w-68 h-106 shadow-2xl perspective-[1000px] group">
                        <div
                            className="
                                relative w-full h-full rounded-3xl overflow-hidden
                                transition-transform duration-500 transform-gpu will-change-transform
                                group-hover:transform-[rotateY(8deg)_rotateX(6deg)_scale(1.05)]
                                group-hover:shadow-2xl group-hover:shadow-black/40
                                transform-3d
                            "
                        >
                            <Image
                                src={anime?.poster?.main2xUrl || ""}
                                alt="poster"
                                width={100}
                                height={240}
                                className="object-cover rounded-3xl overflow-hidden w-100"
                                unoptimized
                                loading="eager"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="z-0 flex flex-col gap-4">
                        <h1 className="text-center sm:text-left text-3xl max-w-200 sm:text-4xl md:text-5xl font-bold leading-tight">
                            {anime?.russian || anime?.name}
                        </h1>

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

                {anime?.screenshots?.length > 0 && (
                    <Screenshots screenshots={anime.screenshots.slice(0, 12)} />
                )}

                <div className="mt-10">
                    <Player link={link} />
                </div>

                <div className="mt-10">
                    <SimilarAnime id={id} />
                </div>
            </div>
        </>
    )
}

function Info({ label, value }: any) {
    return (
        <div className="flex justify-between bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-white/50">{label}</span>
            <span className="font-semibold">{value || "—"}</span>
        </div>
    );
}