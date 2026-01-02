import { getCurrentSeason } from "@/utils/getCurrentSeason";
import { AnimeFields } from "@/app/api/AnimeFields";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import RenderCard from "../RenderCard";

const seasonNames: Record<string, string> = {
    winter: "зимнего",
    spring: "весеннего",
    summer: "летнего",
    fall: "осеннего",
};

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    poster: {
        preview2xUrl: true,
    },
    score: true,
    status: true,
};

async function getSeasonsAnime() {
    const { season, year } = await getCurrentSeason();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fields,
            variables: {
                limit: 7,
                season: `${season}_${year}`,
                order: "ranked",
                kind: "tv",
            },
        }),
    });

    return res.json();
}

const SeasonsAnime = async () => {
    const { season } = await getCurrentSeason();
    const data = await getSeasonsAnime();

    if (!data?.animes?.length) return null;

    return (
        <div className="relative">
            <h2 className="px-5 md:px-10 xl:px-15 font-semibold text-2xl mb-4">
                Аниме {seasonNames[season]} сезона
            </h2>

            <div className="flex gap-5 overflow-x-auto px-5 xl:px-15 xl:justify-center hide-scrollbar">
                {data.animes.map((anime: ShikimoriAnime, index: number) => {
                    const score = anime.status === 'anons' ? -1 : anime.score?.toFixed(1) || null;

                    return (
                        <RenderCard
                            key={anime.id}
                            index={index}
                            title={anime.name}
                            russian={anime.russian}
                            posterUrl={anime.poster?.preview2xUrl}
                            id={anime.id}
                            isLCP={true}
                            score={score}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SeasonsAnime;
