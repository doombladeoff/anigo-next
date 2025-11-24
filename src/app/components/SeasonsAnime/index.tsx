import { ANIME_QUERY, client } from "@/lib/apollo";
import Link from "next/link";
import { SeasonItem } from "./SeasonsItem";
import { getCurrentSeason } from "@/utils/getCurrentSeason";

const seasonNames: Record<string, string> = {
    winter: "зимнего",
    spring: "весеннего",
    summer: "летнего",
    fall: "осеннего",
};

const SeasonsAnime = async () => {
    const { season, year } = getCurrentSeason();

    const { data }: { data: { animes: any[] } | undefined } = await client.query({
        query: ANIME_QUERY,
        variables: { limit: 7, season: `${season}_${year}` },
    });

    if (!data?.animes?.length) return null;

    return (
        <>
            <h1 className="px-5 sm:px-5 md:px-10 xl:px-15 font-semibold text-2xl mb-4">
                Аниме {seasonNames[season]} сезона
            </h1>

            <div className="flex gap-5 overflow-x-auto py-4 px-5 justify-start xl:justify-center no-scrollbar">
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
