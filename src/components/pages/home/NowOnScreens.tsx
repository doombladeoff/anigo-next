import { AnimeFields } from "@/app/api/AnimeFields";
import RenderCard from "./RenderCard";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { ScrollDrag } from "@/components/ScrollDrag";

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    poster: {
        preview2xUrl: true
    },
    score: true,
};

const variables = {
    limit: 15,
    order: "ranked",
    status: "ongoing",
    sort: "ranked",
    kind: "tv,movie",
    rating: "pg_13",
    score: 6
};

async function getNowOnScreensAnime() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, variables }),
        }
    );

    return res.json();
}

const NowOnScreensAnime = async () => {
    const data = await getNowOnScreensAnime();

    if (!data?.animes?.length) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">
                Сейчас на экранах
            </h2>

            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {data.animes.map((anime: ShikimoriAnime, index: number) => {
                    const isLCP = index < 3;

                    return (
                        <RenderCard
                            key={anime.id}
                            index={index}
                            title={anime.name}
                            russian={anime.russian}
                            posterUrl={anime.poster?.preview2xUrl}
                            score={anime.score.toFixed(1)}
                            id={anime.id}
                            isLCP={isLCP}
                        />
                    );
                })}
            </ScrollDrag>
        </div>
    );
};

export default NowOnScreensAnime;
