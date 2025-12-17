'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const SeasonItem = ({ item }: { item: ShikimoriAnime }) => {
    const [hovered, setHovered] = useState(false);
    const isMobile = useIsMobile();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-[180px] shrink-0 cursor-pointer group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="w-[180px] h-[260px] rounded-xl overflow-hidden shadow-2xl relative">
                <Image
                    src={item?.poster.main2xUrl || ""}
                    alt={item?.russian || "season_poster"}
                    unoptimized
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 bg-gray-600"
                    sizes="180px"
                    loading={"lazy"}
                    fetchPriority='high'
                />

                {item?.score && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-green-500 shadow-lg">
                        {item.score.toFixed(1)}
                    </div>
                )}
                {!isMobile && (<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-2 rounded-xl"
                >
                    <span className="text-white font-semibold text-sm">{item?.russian}</span>
                </motion.div>)}
            </div>
            {isMobile && (
                <span className="font-semibold text-sm text-cente">{item?.russian}</span>
            )}
        </motion.div>
    )
}
