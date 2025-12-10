'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { SimilarAnimeType } from "./Similar.types";

export const SimilarItem = ({ similar, index }: { similar: SimilarAnimeType, index: number }) => {
    const isMobile = useIsMobile();
    const isVisible = index < 10;

    return (
        <Link
            href={`/anime/${similar?.name?.toLowerCase().replace(/\s+/g, '-')}-${similar.id}`}
            draggable={false}
            className="flex flex-col items-center w-[175px] select-none"
        >
            <motion.div
                onDragStart={(e) => e.preventDefault()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={!isMobile ? { scale: 1.03 } : undefined}
                className="relative w-[175px] h-[270px] rounded-2xl overflow-hidden bg-neutral-800/40 backdrop-blur-sm shadow-md"
            >
                <Image
                    src={`https://shikimori.one${similar.image.original}`}
                    alt={similar.russian}
                    draggable={false}
                    width={175}
                    height={270}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    className="bg-neutral-700"
                    loading={isVisible ? "eager" : "lazy"}
                    priority={isVisible}
                />
                {!isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                        <p className="text-white font-medium text-[14px] px-2 text-center leading-tight">
                            {similar.russian}
                        </p>
                    </div>
                )}
            </motion.div>

            {isMobile && (
                <p className="text-white font-medium text-[14px] mt-2 text-center px-1 line-clamp-2 leading-snug">
                    {similar.russian}
                </p>
            )}
        </Link>
    );
};
