'use client'

import { useIsMobile } from "@/hooks/useIsDesktop";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SimilarAnimeType = {
    id: number
    name: string
    russian: string
    image: Image
    url: string
    kind: string
    score: string
    status: string
    episodes: number
    episodes_aired: number
    aired_on: string
    released_on: string
}

interface Image {
    original: string
    preview: string
    x96: string
    x48: string
}

export const SimilarAnime = ({ id }: { id: string | number }) => {
    const [animes, setAnimes] = useState<SimilarAnimeType[]>([]);
    const [loading, setLoading] = useState(true);

    const isMobile = useIsMobile();

    useEffect(() => {
        fetch(`https://shikimori.one/api/animes/${id}/similar`)
            .then(res => res.json())
            .then(data => {
                setAnimes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="px-5">Загрузка...</p>;
    if (animes.length === 0) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5">Похожие аниме</h2>
            <div className="flex gap-4 overflow-x-auto py-2 px-5">
                {animes.slice(0, 15).map((similar, index) => (
                    <Link key={similar.id} href={`/anime/${similar.id}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 1, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative shrink-0 w-[175px] h-240px rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            <Image
                                src={`https://shikimori.one${similar.image.original}`}
                                alt={similar.russian}
                                width={175}
                                height={240}
                                className="object-cover rounded-3xl"
                            />
                            {!isMobile && (
                                <div className="absolute inset-0 flex items-center justify-center 
                                            bg-black/50 opacity-0 hover:opacity-100 
                                            transition-opacity duration-300 rounded-3xl">
                                    <p className="text-white font-semibold text-center px-2">
                                        {similar.russian}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                        {isMobile && (
                            <p className="text-white font-semibold text-center px-2">
                                {similar.russian}
                            </p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
