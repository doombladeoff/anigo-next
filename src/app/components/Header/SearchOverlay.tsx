import { ArrowDownNarrowWideIcon, ArrowLeftIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchItem } from "./Search/SearchItem";
import { buildAnimeQuery, client } from "@/lib/apollo";
import { StatusFilter } from "./Search/StatusFilter";
import { KindFilter } from "./Search/KindFilter";
import { SortDropdown } from "./Search/SortDropDown";
import { AnimeFields } from "@/app/api/AnimeFields";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { KIND_FILTERS, SORT_OPTIONS, STATUS_FILTERS } from "@/contants/Filters";
import { AnimatePresence, motion } from "framer-motion";

const limit = 20;

export const SearchOverlay = ({ closeModal }: { closeModal: (v: boolean) => void }) => {
    const [queryText, setQueryText] = useState('');
    const [status, setStatus] = useState<string[]>([]);
    const [kind, setKind] = useState<string[]>([]);
    const [sort, setSort] = useState("rating");
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [openFilters, setOpenFilters] = useState(false)

    const isMobile = useIsMobile();

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
            main2xUrl: true,
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

            console.log('Search:', data)
            const list = data.animes as any[];

            setData(prev => reset ? list : [...prev, ...list]);
            setHasMore(list.length === limit);

        } catch (error) {
            console.error('[API ERROR]:', error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchPage(1, true);
    }, []);

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

    if (!false) return;
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center sm:p-6 xl:max-w-900`}>
            <div className="flex gap-6 w-full h-full">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        rounded-3xl 
                        bg-white/10 
                        border border-white/20 
                        backdrop-blur-3xl 
                        shadow-[0_0_50px_rgba(255,255,255,0.15)] 
                        animate-slideDown
                        ${isMobile ? "h-full w-full p-4" : ""}
                    `}
                >
                    <div className="w-full">
                        {isMobile && (
                            <div className="flex flex-row w-full items-center justify-between mb-5">
                                <button className="relative flex flex-row items-center" onClick={() => closeModal(false)}>
                                    <ArrowLeftIcon size={24} color="white" onClick={() => document.body.classList.remove("overflow-hidden")} />
                                    Назад
                                </button>
                                <div className="flex flex-row items-center gap-4">
                                    <button className="relative flex flex-row items-center" onClick={() => { }}>
                                        <ArrowDownNarrowWideIcon size={24} color="white" />
                                        Сортировка
                                    </button>
                                    <button className="relative flex flex-row items-center" onClick={() => setOpenFilters(!openFilters)}>
                                        <SlidersHorizontalIcon size={24} color="white" />
                                        Фильтр
                                    </button>
                                </div>
                            </div>
                        )}

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
                    </div>

                    {data?.length > 0 ? (
                        <div
                            ref={scrollRef}
                            className={`mt-4 ${isMobile ? "h-full" : "h-[520px]"} grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4`}
                        >
                            {
                                data.map((el, index) => (
                                    <Link href={`/anime/${el.id}`} key={`${el.id}-${index}`} onClick={() => closeModal(false)} className="block">
                                        <SearchItem el={el} index={index} />
                                    </Link>
                                ))
                            }
                        </div>
                    ) : null}
                    {(queryText && !loading) && (
                        <p className="w-full text-center text-white/70 py-10 text-lg">Ничего не найдено</p>
                    )}

                    {loading && (
                        <div className="text-center text-white/70 py-6 animate-pulse">Загрузка...</div>
                    )}
                </div>

                {(!isMobile || openFilters) && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-slideDown max-w-330 rounded-3xl p-6 bg-white/10 border border-white/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    >
                        <h4 className="text-xl font-semibold text-white mb-4 w-full text-center">Фильтры</h4>
                        <div className="flex flex-col gap-5">
                            <StatusFilter statusArr={STATUS_FILTERS} activeArr={status} toggleStatus={toggleStatus} />
                            <KindFilter kindArr={KIND_FILTERS} activeKindArr={kind} toggleKind={toggleKind} />
                            {/* <SortDropdown options={SORT_OPTIONS} selected={sort} onChange={setSort} /> */}
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {openFilters && (
                    <motion.div
                        onClick={() => setOpenFilters(false)}
                        className="fixed inset-0 z-[60] bg-black/60 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="
                    absolute right-0 top-0 h-full max-w-440
                    bg-white/10 backdrop-blur-xl 
                    border-l border-white/20 
                    p-6 flex flex-col gap-6
                    shadow-[0_0_40px_rgba(255,255,255,0.15)]
                "
                            initial={{ x: 300 }}
                            animate={{ x: 0 }}
                            exit={{ x: 300 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                        >
                            <div>
                                <button className="relative flex flex-row items-center" onClick={() => closeModal(false)}>
                                    <ArrowLeftIcon size={24} color="white" onClick={() => document.body.classList.remove("overflow-hidden")} />
                                    Назад
                                </button>
                                <h4 className="text-xl font-semibold text-white mb-4 w-full text-center">
                                    Фильтры
                                </h4>
                            </div>


                            <StatusFilter
                                statusArr={STATUS_FILTERS}
                                activeArr={status}
                                toggleStatus={toggleStatus}
                            />
                            <KindFilter
                                kindArr={KIND_FILTERS}
                                activeKindArr={kind}
                                toggleKind={toggleKind}
                            />
                            <SortDropdown
                                options={SORT_OPTIONS}
                                selected={sort}
                                onChange={setSort}
                            />

                            <button
                                onClick={() => setOpenFilters(false)}
                                className="mt-auto py-3 bg-white/20 rounded-xl text-white"
                            >
                                Закрыть
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};