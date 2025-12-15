import { ScrollDrag } from "../ScrollDrag";
import { AnimeFields } from "@/app/api/AnimeFields";
import { RenderCard } from "./RenderCard";

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    poster: {
        originalUrl: true,
        main2xUrl: true,
    },
    score: true,
};

const variables = { limit: 15, order: "ranked", kind: "tv,movie" };

async function getTopRatedAnime() {
    await delay(1000);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/anime`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, variables }),
            cache: "no-store", // всегда свежие данные
        }
    );

    return res.json();
}

const TopRatedAnime = async () => {
    const data = await getTopRatedAnime();

    if (!data?.animes?.length) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">
                Топ рейтинга
            </h2>

            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {data.animes.map((anime: any, index: number) => (
                    <RenderCard key={anime.id} anime={anime} index={index} />
                ))}
            </ScrollDrag>
        </div>
    );
};

export default TopRatedAnime;