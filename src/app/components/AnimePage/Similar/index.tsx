import { ScrollDrag } from "../../ScrollDrag";
import { SimilarAnimeType } from "./Similar.types";
import { SimilarItem } from "./SimilarItem"

export const SimilarAnime = async ({ id }: { id: string | number }) => {
    let animes: SimilarAnimeType[] = [];

    try {
        const res = await fetch(
            `https://shikimori.one/api/animes/${id}/similar`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const json = await res.json();

        if (!Array.isArray(json)) return null;

        animes = json;

    } catch (err) {
        console.error("Ошибка загрузки похожих:", err);
        return null;
    }
    
    if (!animes.length || !id) return;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5">Похожие аниме</h2>
            <ScrollDrag>
                {animes.slice(0, 15).map((similar) => (
                    <SimilarItem key={similar.id} similar={similar} />
                ))}
            </ScrollDrag>
        </div>
    );
};
