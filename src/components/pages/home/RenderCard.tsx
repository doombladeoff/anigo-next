import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

type CardProps = {
    title: string;
    russian: string;
    posterUrl: string;
    score?: number | string | null;
    translate?: string;
    id: number;
    index: number;
    episodes_count?: number;
    isLCP?: boolean;
    lazy?: boolean;
};

export default function RenderCard({ title, russian, posterUrl, score, translate, id, index, episodes_count, isLCP, lazy }: CardProps) {
    if (!title) return null;

    return (
        <Link
            href={`/anime/${slugify(title, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                trim: true
            })}-${id}`}
            className="w-[180px] shrink-0 cursor-pointer group"
            draggable={false}
        >
            <div className="w-[180px] transition-transform duration-300 ease-out transform hover:-translate-y-1 cursor-pointer  py-2">
                <div className="relative h-[250px] overflow-hidden rounded-xl shadow-2xl animate-fade">
                    <Image
                        src={posterUrl}
                        alt={russian || title}
                        loading={lazy ? "lazy" : isLCP ? "eager" : "eager"}
                        fetchPriority="high"
                        width={240}
                        height={360}
                        unoptimized
                        className="object-cover"
                        draggable={false}
                    />

                    {score && (
                        <div className={cn("absolute top-2 left-2 px-2 py-1 rounded-full text-white dark:text-black text-xs font-bold shadow-lg", `${Number(score) < 0 ? "bg-red-500 dark:bg-red-400" : "bg-green-700 dark:bg-green-400"}`)}>
                            {Number(score) < 0 ? "АНОНС" : score}
                        </div>
                    )}

                    {episodes_count && (
                        <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent rounded-b-xl" />
                            <span className="relative text-white font-semibold text-sm">
                                Эпизод {episodes_count}
                            </span>
                        </div>
                    )}
                </div>

                <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                    {russian}
                </p>

                {translate && (
                    <p className="font-semibold text-sm opacity-60 mt-1 line-clamp-1">
                        {translate}
                    </p>
                )}
            </div>
        </Link>
    );
};