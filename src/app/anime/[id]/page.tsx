import NextEpisode from "@/app/components/AnimePage/NextEpisodeDate";
import { Player } from "@/app/components/AnimePage/Player";
import Screenshots from "@/app/components/AnimePage/Screenshots";
import { SimilarAnime } from "@/app/components/AnimePage/Similar";
import { KIND_FILTERS, RATING_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { ANIME_QUERY, client } from "@/lib/apollo";
import { cleanDescription } from "@/utils/cleanDescription";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default async function AnimePage({ params }: any) {
    const { id } = await params;

    const { data }: { data: any } = await client.query({
        query: ANIME_QUERY,
        variables: { ids: id, limit: 1 },
    });

    const anime = data?.animes?.[0];

    return (
        <div className="min-h-screen w-full flex-1 flex bg-[#0a0a0c] text-white">
            <div className="absolute inset-0 z-0 w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden">
                <Image
                    src={anime.poster.mainUrl}
                    alt="bg"
                    fill
                    unoptimized
                    priority
                    className="object-cover scale-110 blur-3xl opacity-60"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/30 to-[#0a0a0c]" />
            </div>

            <div className="py-20 xl:pt-30 w-full">
                <div className="
                    flex 
                    flex-col 
                    xl:flex-row 
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
                                src={anime?.poster?.originalUrl || ""}
                                alt="poster"
                                fill
                                className="object-cover rounded-3xl overflow-hidden"
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="z-0 flex flex-col gap-4">
                        <h1 className="text-center sm:text-left text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            {anime.russian || anime.name}
                        </h1>

                        {anime.score && (
                            <div className="flex flex-row gap-2">
                                <StarIcon
                                    size={32}
                                    fill="rgb(92, 220, 52)"
                                    color="rgb(92, 220, 52)"
                                />
                                <span className="text-3xl font-semibold text-[rgb(92,220,52)]">
                                    {anime.score}
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

                {(anime.description_html || anime.description) && (
                    <div className="w-full flex-1 justify-center items-center self-center px-5 my-5 mt-10">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                            <h2 className="text-2xl font-semibold mb-4">Описание</h2>
                            {anime.description_html ? (
                                <div
                                    className="prose prose-invert max-w-none opacity-90 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: anime.description_html || "Нет описания" }}
                                />
                            ) : (
                                <p className="prose prose-invert max-w-none opacity-90 leading-relaxed">
                                    {cleanDescription(anime.description || '') || "Нет описания"}
                                </p>
                            )}

                        </div>
                    </div>
                )}

                {anime?.screenshots?.length > 0 && (
                    <Screenshots screenshots={anime.screenshots.slice(0, 12)} />
                )}

                <div className="mt-10">
                    <Player id={id} />
                </div>

                <div className="mt-10">
                    <SimilarAnime id={id} />
                </div>

            </div>
        </div>
    );
}

function Info({ label, value }: any) {
    return (
        <div className="flex justify-between bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-white/50">{label}</span>
            <span className="font-semibold">{value || "—"}</span>
        </div>
    );
}