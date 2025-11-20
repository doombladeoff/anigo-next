'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export const SeasonItem = ({ item, index }: any) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-[180px] shrink-0 cursor-pointer group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="w-[180px] h-[260px] rounded-xl overflow-hidden shadow-lg relative">
                <Image
                    src={item?.poster.originalUrl || ""}
                    alt={item?.russian || "season_poster"}
                    unoptimized
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="180px"
                />

                {item?.score && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-green-500 shadow-lg">
                        {item.score.toFixed(1)}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-2 rounded-xl"
                >
                    <span className="text-white font-semibold text-sm">{item?.russian}</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
