'use client';

import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const RelatedAnime = memo(({ data }: { data: ShikimoriAnime }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {data?.related.map((item) => {
                if (!item.anime) return null;

                return (
                    <Link
                        href={`/anime/${item?.anime.name?.toLowerCase().replace(/\s+/g, '-')}-${item.anime.id}`}
                        key={item.id}
                        className="p-2 flex flex-col items-center justify-start text-center bg-white dark:bg-black rounded-md shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Image
                            src={item.anime.poster?.preview2xUrl || '/placeholder.png'}
                            alt={item.anime?.name || 'No Image'}
                            width={100}
                            height={140}
                            className="mb-2 rounded-md object-cover h-70 w-50"
                            unoptimized
                            draggable={false}
                        />
                        <div className="font-semibold text-sm line-clamp-2 w-full">
                            {item.anime?.name || "—"}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{item.relationText}</div>
                    </Link>
                )
            })}
        </div>

    );
});