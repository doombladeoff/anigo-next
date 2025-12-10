'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export const LastUpdateItem = ({ data }: { data: any }) => {
    return (
        <>
            {data.map((item: any, index: number) => {
                const poster = item?.material_data?.anime_poster_url || "";
                const title = item?.title || "";
                const translate = item?.translation?.title || "";
                const isVisible = index < 10;
                return (
                    <Link draggable={false} key={item.id} href={`/anime/${item.shikimori_id}`}>
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-[180px] shrink-0 cursor-pointer group"
                        >

                            <div className="relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-gray-800">
                                <Image
                                    src={poster || ''}
                                    alt={title}
                                    unoptimized
                                    fill
                                    className={`object-cover`}
                                    sizes="180px"
                                    draggable={false}
                                    loading={isVisible ? "eager" : "lazy"}
                                    priority={isVisible}
                                />

                                <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-linear-to-t from-black to-transparent rounded-b-xl" />
                                    <span className="relative text-white font-semibold text-sm">
                                        Эпизод {item.episodes_count}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                                {title}
                            </p>

                            {translate && (
                                <p className="text-xs opacity-60 mt-1 line-clamp-1">
                                    {translate}
                                </p>
                            )}
                        </motion.div>
                    </Link>
                );
            })}
        </>
    );
};