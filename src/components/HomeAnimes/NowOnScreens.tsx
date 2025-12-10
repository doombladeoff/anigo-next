'use client';

import { ScrollDrag } from "../ScrollDrag";
import { AnimeFields } from "@/app/api/AnimeFields";
import { RenderCard } from "./RenderCard";
import { SkeletonPlaceholder } from "./SkeletonPlaceholder";
import { useEffect, useState } from "react";

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
const variables = { limit: 15, order: "ranked", status: "ongoing", sort: "ranked", kind: "tv,movie" };

export const NowOnScreensAnime = () => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const res = await fetch("/api/anime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, variables }),
        })
            .then(r => r.json())
            .then(r => setData(r))
            .then(() => setLoading(false));
        return res;
    }
    useEffect(() => { getData() }, []);

    if (loading) {
        return <SkeletonPlaceholder title="Сейчас на экранах" num={15} />
    };

    if (!data?.animes) {
        return <span>Error loading top rated anime.</span>;
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Сейчас на экранах</h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {data.animes.map((anime: any, index: number) => (
                    <RenderCard key={anime.id} anime={anime} index={index} />
                ))}
            </ScrollDrag>
        </div>
    );
};