import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const RenderCard = ({ anime, index }: { anime: ShikimoriAnime, index: number }) => {
    return (
        <Link
            href={`/anime/${anime?.name?.toLowerCase().replace(/\s+/g, '-')}-${anime.id}`}
            className="w-[180px] shrink-0 cursor-pointer group"
            draggable={false}
        >
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-[180px] shrink-0 cursor-pointer group"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-gray-800"
                >
                    <Image
                        src={anime?.poster?.main2xUrl || ""}
                        alt={anime?.russian || "anime_poster"}
                        className="object-cover w-full h-full bg-white/50"
                        loading={index < 10 ? "eager" : "lazy"}
                        draggable={false}
                        width={180}
                        height={260}
                    />

                    {anime?.score && (
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-green-500 shadow-lg">
                            {anime.score.toFixed(1)}
                        </div>
                    )}
                </motion.div>
            </motion.div>
            <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                {anime?.russian}
            </p>
        </Link>
    );
};