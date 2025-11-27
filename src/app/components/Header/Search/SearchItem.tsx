'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { KIND_FILTERS } from "@/contants/Filters";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const SearchItem = ({ el, index }: { el: ShikimoriAnime, index: number }) => {
    const kindLabel = KIND_FILTERS.find(k => k.key === el?.kind)?.label;
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.03 }}
        >
            <div className="relative w-full aspect-2/3 rounded-xl">
                {el?.poster?.main2xUrl && (
                    <Image
                        draggable={false}
                        src={el?.poster?.main2xUrl}
                        alt={el.russian}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-md bg-gray-600/20"
                    />
                )}

                <div className="absolute top-2 left-2 z-10">
                    {el.status === "anons" ? (
                        <span className="text-xs bg-red-500 px-2 py-1 rounded-lg text-white">
                            Анонс
                        </span>
                    ) : (
                        el.score && (
                            <span className="text-xs bg-black/70 px-2 py-1 rounded-lg text-white">
                                {el.score.toFixed(1)}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between py-1">
                <p className="text-white font-semibold text-sm line-clamp-2">
                    {el.russian || el.name}
                </p>

                <p className="text-white/60 text-sm mt-1">
                    {kindLabel || el.kind} {el.kind === 'tv' ? 'Сериал' : ''}
                </p>
            </div>
        </motion.div>
    );
};