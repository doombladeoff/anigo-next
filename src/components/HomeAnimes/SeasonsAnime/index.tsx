import Link from "next/link";
import { SeasonItem } from "./SeasonsItem";
import { getCurrentSeason } from "@/utils/getCurrentSeason";
import { AnimeFields } from "@/app/api/AnimeFields";

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
        originalUrl: true,
    },
    score: true,
};

async function getSeasonsAnime() {
    const { season, year } = getCurrentSeason();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fields,
            variables: { limit: 7, season: `${season}_${year}` },
        }),
        cache: "no-store",
    });

    return res.json();
}

const SeasonsAnime = async () => {
    const { season } = getCurrentSeason();
    const data = await getSeasonsAnime();

    if (!data?.animes?.length) return null;

    return (
        <>
            <h2 className="px-5 md:px-10 xl:px-15 font-semibold text-2xl mb-4">
                Аниме {seasonNames[season]} сезона
            </h2>

            <div className="flex gap-5 overflow-x-auto px-5 xl:px-15 xl:justify-center hide-scrollbar">
                {data.animes.map((anime: any, index: number) => (
                    <Link
                        key={anime.id}
                        href={`/anime/${anime.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}-${anime.id}`}
                    >
                        <SeasonItem item={anime} index={index} />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SeasonsAnime;
