'use client';
import { useEffect, useState } from "react";
import { ScrollDrag } from "../../ScrollDrag";
import { SimilarAnimeType } from "./Similar.types";
import { SimilarItem } from "./SimilarItem";

export const SimilarAnime = ({ id }: { id: string | number }) => {
    const [animes, setAnimes] = useState<SimilarAnimeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const res = await fetch(
                    `https://shikimori.one/api/animes/${id}/similar`,
                    { cache: "no-store" }
                );
                if (!res.ok) return;

                const json = await res.json();
                if (!Array.isArray(json)) return;

                setAnimes(json);
            } catch (err) {
                console.error("Ошибка загрузки похожих:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilar();
    }, [id]);

    if (!animes.length || loading || !id) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5">Похожие аниме</h2>
            <ScrollDrag>
                {animes.slice(0, 15).map((similar, index) => (
                    <SimilarItem key={similar.id} similar={similar} index={index} />
                ))}
            </ScrollDrag>
        </div>
    );
};
