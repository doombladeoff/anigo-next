import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchItem } from "./SearchItem";
import { ANIME_QUERY, client } from "@/lib/apollo";

const limit = 20;

export const SearchOverlay = (props: any) => {
    const [queryText, setQueryText] = useState('');

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const fetchPage = async (pageNumber: number, reset = false) => {
        if (loading) return;
        setLoading(true);

        const { data }: { data: { animes: any[] } | any } = await client.query({
            query: ANIME_QUERY,
            variables: { search: queryText, limit, page: pageNumber },
        });

        const list = data.animes as any[];

        if (reset) {
            setData(list);
        } else {
            setData((prev: any[]) => [...prev, ...list]);
        }

        setHasMore(list.length === limit);
        setLoading(false);
    };

    useEffect(() => {
        if (!queryText) {
            setData([]);
            return;
        }

        const handler = setTimeout(() => {
            console.log("Поиск:", queryText);
            fetchPage(1, true);
        }, 800);

        return () => {
            clearTimeout(handler);
        };
    }, [queryText]);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const onScroll = () => {
            const bottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 150;

            if (bottom && hasMore && !loading) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPage(nextPage);
            }
        };

        element.addEventListener("scroll", onScroll);
        return () => element.removeEventListener("scroll", onScroll);
    }, [page, hasMore, loading]);

    return (
        <div className="w-full h-screen flex items-center justify-center px-6">
            <div className="flex gap-6 w-full max-w-5xl" {...props}>
                {/* LEFT */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-3xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-slideDown"
                >
                    {/* Input */}
                    <div className="relative">
                        <input
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            type="text"
                            placeholder="Solo Leveling, Jujutsu Kaisen, Naruto"
                            className="w-full p-4 pl-12 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner"
                        />
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                    </div>

                    {/* RESULTS */}
                    <div
                        ref={scrollRef}
                        className="overflow-y-auto h-[520px] mt-6 pr-2 no-scrollbar space-y-4"
                    >
                        {data.map((el: any, index: number) => (
                            <Link
                                href={`/anime/${el.id}`}
                                key={`${el.id}-${index}`}
                                className="block"
                            >
                                <SearchItem el={el} index={index} />
                            </Link>
                        ))}

                        {loading && (
                            <div className="text-center text-white/70 py-6 animate-pulse">
                                Загрузка...
                            </div>
                        )}

                        {!loading && data.length === 0 && queryText && (
                            <p className="text-center text-white/70 py-10 text-lg">
                                Ничего не найдено
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT — FILTERS */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="animate-slideDown w-[280px] rounded-3xl p-6 bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Фильтры
                    </h3>

                    <div className="space-y-6 text-white/90">
                    // TODO - фильтры
                    </div>
                </div>
            </div>

        </div>
    );
};