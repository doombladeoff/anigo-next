import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchItem } from "./Search/SearchItem";
import { buildAnimeQuery, client } from "@/lib/apollo";
import { StatusFilter } from "./Search/StatusFilter";
import { KindFilter } from "./Search/KindFilter";
import { SortDropdown } from "./Search/SortDropDown";
import { AnimeFields } from "@/app/api/AnimeFields";

const limit = 20;
const STATUS_FILTERS = [
    { key: "anons", label: "Анонс" },
    { key: "ongoing", label: "Онгоинг" },
    { key: "released", label: "Завершён" },
];
export const KIND_FILTERS = [
    { key: "tv", label: "TV" },
    { key: "movie", label: "Фильм" },
    { key: "ova", label: "OVA" },
    { key: "ona", label: "ONA" },
    { key: "tv_special", label: "Спешл" },
];
const SORT_OPTIONS = [
    { key: "id", label: "ID" },
    { key: "id_desc", label: "ID Desc" },
    { key: "ranked", label: "Ранк" },
    { key: "kind", label: "Тип" },
    { key: "popularity", label: "Популяронсть" },
    { key: "name", label: "Тип" },
    { key: "aired_on", label: "По релизу" },
    { key: "name", label: "Тип" },
    { key: "status", label: "Статус" },
    { key: "random", label: "Рандом" },
    { key: "ranked_random", label: "Ранкед рандом" },
    { key: "random_shiki", label: "Рандом шики" },
];

export const SearchOverlay = () => {
    const [queryText, setQueryText] = useState('');
    const [status, setStatus] = useState<string[]>([]);
    const [kind, setKind] = useState<string[]>([]);
    const [sort, setSort] = useState("rating");
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    const fields: AnimeFields = {
        id: true,
        russian: true,
        name: true,
        airedOn: {
            year: true
        },
        kind: true,
        score: true,
        status: true,
        poster: {
            preview2xUrl: true,
        },
    };
    const query = buildAnimeQuery(fields);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const resetScrollTop = () => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };

    const fetchPage = async (pageNumber: number, reset = false) => {
        if (loading) return;
        setLoading(true);

        const formatStatus = status.length > 0 ? status.join(',') : undefined;
        const formatKind = kind.length > 0 ? kind.join(',') : undefined;

        try {
            const { data }: { data: any } = await client.query({
                query: query,
                variables: {
                    search: queryText || undefined,
                    limit,
                    page: pageNumber,
                    ...(formatStatus && { status: formatStatus }),
                    ...(formatKind && { kind: formatKind }),
                },
                fetchPolicy: "network-only",
            });

            const list = data.animes as any[];

            setData(prev => reset ? list : [...prev, ...list]);
            setHasMore(list.length === limit);

        } catch (error) {
            console.error('[API ERROR]:', error);
        }

        setLoading(false);
    };

    useEffect(() => {
        resetScrollTop();

        if (!queryText && status.length === 0 && kind.length === 0) {
            setData([]);
            return;
        }

        let timeout = 500;
        if (status.length > 0 || kind.length > 0) {
            timeout = 20;
        }

        const handler = setTimeout(() => fetchPage(1, true), timeout);

        return () => clearTimeout(handler);
    }, [queryText, status, kind]);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const onScroll = () => {
            if (element.scrollTop + element.clientHeight >= element.scrollHeight - 150 && hasMore && !loading) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPage(nextPage);
            }
        };

        element.addEventListener("scroll", onScroll);
        return () => element.removeEventListener("scroll", onScroll);
    }, [page, hasMore, loading]);

    const toggleStatus = (value: string) => {
        setStatus(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
        setPage(1);
    };

    const toggleKind = (value: string) => {
        setKind(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
        setPage(1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="flex gap-6 w-full max-w-5xl">
                {/* LEFT: SEARCH RESULTS */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-3xl p-6 shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-slideDown"
                >
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

                    <div
                        ref={scrollRef}
                        className="overflow-y-auto h-[520px] mt-6 pr-2 no-scrollbar space-y-4"
                    >
                        {data.length > 0 ? (
                            data.map((el, index) => (
                                <Link href={`/anime/${el.id}`} key={`${el.id}-${index}`} className="block">
                                    <SearchItem el={el} index={index} />
                                </Link>
                            ))
                        ) : queryText && !loading ? (
                            <p className="text-center text-white/70 py-10 text-lg">Ничего не найдено</p>
                        ) : null}

                        {loading && (
                            <div className="text-center text-white/70 py-6 animate-pulse">Загрузка...</div>
                        )}
                    </div>
                </div>

                {/* RIGHT: FILTERS */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="animate-slideDown w-[280px] rounded-3xl p-6 bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                    <h4 className="text-xl font-semibold text-white mb-4 w-full text-center">Фильтры</h4>
                    <div className="flex flex-col gap-5">
                        <StatusFilter statusArr={STATUS_FILTERS} activeArr={status} toggleStatus={toggleStatus} />
                        <KindFilter kindArr={KIND_FILTERS} activeKindArr={kind} toggleKind={toggleKind} />
                        <SortDropdown options={SORT_OPTIONS} selected={sort} onChange={setSort} />
                    </div>
                </div>
            </div>
        </div>
    );
};