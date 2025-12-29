import { SeasonItem } from "./SeasonsItem";
import { getCurrentSeason } from "@/utils/getCurrentSeason";
import { AnimeFields } from "@/app/api/AnimeFields";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

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
        mainUrl: true,
        preview2xUrl: true,
    },
    score: true,
};

async function getSeasonsAnime() {
    const { season, year } = await getCurrentSeason();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fields,
            variables: { limit: 7, season: `${season}_${year}` },
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
                {data.animes.map((anime: ShikimoriAnime, index: number) => (
                    <SeasonItem key={anime.id} item={anime} index={index} />
                ))}
            </div>
        </div>
    );
};

export default SeasonsAnime;
