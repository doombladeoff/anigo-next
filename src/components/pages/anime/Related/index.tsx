'use client';

import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import slugify from "slugify";

export const RelatedAnime = memo(({ data }: { data: ShikimoriAnime }) => {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {data?.related.map((item) => {
                if (!item.anime) return null;

                const link = `/anime/${slugify(item.anime.name, {
                    replacement: "-",
                    lower: true,
                    strict: true,
                    trim: true
                })}-${item.anime.id}`;

                return (
                    <Link
                        key={item.id}
                        href={link}
                        className="flex flex-col items-center text-center space-y-1"
                        draggable={false}
                    >
                        <div className="w-[140px] h-[180px] md:w-[200px] md:h-[280px] relative rounded-lg overflow-hidden">
                            <Image
                                src={item.anime.poster?.preview2xUrl}
                                alt={item.anime.name || ""}
                                fill    
                                className="object-cover"
                                draggable={false}
                            />
                        </div>

                        <p className="font-semibold text-[0.75rem] sm:text-sm line-clamp-2">
                            {item.anime.name || "—"}
                        </p>

                        <p className="text-[0.65rem] sm:text-xs text-gray-400 dark:text-gray-500">
                            {item.relationText}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
});
