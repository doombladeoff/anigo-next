'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

export const SearchItem = ({ el, index }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.03 }}
            className="
                                flex gap-4 p-3 rounded-xl 
                                bg-white/5 hover:bg-white/10 transition-all duration-300
                                backdrop-blur-sm border border-white/10 group
                            "
        >
            {/* Poster */}
            <div className="relative w-[90px] h-[140px] rounded-xl overflow-hidden">
                <Image
                    src={el.poster.originalUrl}
                    alt={`poster-${el?.title}`}
                    fill
                    sizes="90px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-between py-1">
                <p className="text-white font-semibold text-lg line-clamp-2">
                    {el.russian || el.name || el.title}
                </p>

                <p className="text-white/60 text-sm mt-1">
                    {el.kind} • {el?.airedOn?.year}
                </p>

                {el.status === "anons" ? (
                    <span className="mt-2 inline-block text-sm bg-red-500 text-white px-3 py-1 rounded-lg">
                        Анонс
                    </span>
                ) : (
                    el.score && (
                        <div className="flex items-center gap-2 mt-2">
                            <StarIcon color="green" fill="green" size={18} />
                            <span className="text-white text-sm">
                                {el.score.toFixed(1)}
                            </span>
                        </div>
                    )
                )}
            </div>
        </motion.div>
    );
};