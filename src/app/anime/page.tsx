'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimeFields } from "../api/AnimeFields";
import { buildAnimeQuery, client } from "@/lib/apollo";
import Link from "next/link";
import { SearchItem } from "../../components/Header/Search/SearchItem";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { Header } from "../../components/SearchPage/Header";
import { MobileFilters } from "../../components/SearchPage/MobileFilters";
import { Filters } from "../../components/SearchPage/Filters";
import { SearchSkeleton } from "../../components/SearchPage/SearchSkeleton";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { STATUS_FILTERS } from "@/contants/Filters";

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    kind: true,
    score: true,
    status: true,
    poster: {
        preview2xUrl: true,
        main2xUrl: true,
    },
    description: true,
    descriptionHtml: true,
    genres: {
        id: true,
        russian: true,
    },
    airedOn: {
        day: true,
        month: true,
        year: true,
        date: true,
    },
    releasedOn: {
        day: true,
        month: true,
        year: true,
    },
    episodes: true,
    episodesAired: true,
};

const query = buildAnimeQuery(fields);
const limit = 20;

function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function AnimeSearchPage() {
    const [queryText, setQueryText] = useState<string>('');
    const [status, setStatus] = useState<string[]>([]);
    const [kind, setKind] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isMobile = useIsMobile();

    const fetchPage = useCallback(async (pageNumber: number, reset = false) => {
        if (loading) return;
        setLoading(true);

        const formatStatus = status.length ? status.join(",") : undefined;
        const formatKind = kind.length ? kind.join(",") : undefined;

        try {
            const { data }: { data: any } = await client.query({
                query,
                variables: {
                    ...(queryText.length > 0 && { search: queryText }),
                    limit: limit,
                    page: pageNumber,
                    ...(formatStatus && { status: formatStatus }),
                    ...(formatKind && { kind: formatKind }),
                },
                fetchPolicy: "network-only",
            });

            const list = data.animes || [];

            setData(prev => (reset ? list : [...prev, ...list]));
            setHasMore(list.length === limit);
        } catch (err) {
            console.error("API ERROR:", err);
        }

        setLoading(false);
    }, [loading, status, kind]);

    useEffect(() => {
        fetchPage(1, true);
    }, []);

    useEffect(() => {
        if (!queryText) {
            setData([]);
            return;
        }

        let timeout = 500;
        const handler = setTimeout(() => fetchPage(1, true), timeout);

        return () => clearTimeout(handler);
    }, [queryText]);

    useEffect(() => {
        const onScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300;

            if (bottom && hasMore && !loading) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPage(nextPage);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [page, hasMore, loading]);

    useEffect(() => {
        const handleScroll = () => {
            if (inputRef.current && document.activeElement === inputRef.current) {
                inputRef.current.blur();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (openFilters)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = '';

        return () => { document.body.style.overflow = '' };
    }, [openFilters]);

    useEffect(() => {
        console.log('Status changed: ', status);
    }, [status])

    const toggleStatus = (value: string) => {
        setStatus(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
    };

    const toggleKind = (value: string) => {
        setKind(prev => prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]);
    };

    const handleApplyFilters = () => {
        setPage(1)
        fetchPage(1, true);
        if (isMobile) {
            setOpenFilters(false)
        }
    };

    const handleClearFilters = () => {
        setPage(1)
        setStatus([]);
        setKind([]);
    };

    const handleOpenFilters = () => setOpenFilters(!openFilters);

    return (
        <>
            {isMobile && <Header openFilters={handleOpenFilters} />}
            <div className="flex-1 flex justify-center py-15 md:py-5">
                <div className="flex flex-row gap-10 w-full max-w-7xl">
                    {/* LEFT side (scrolls with the page) */}
                    <div
                        ref={scrollRef}
                        className={`flex-1 bg-white/10 rounded-md p-4 ${!data.length ? '' : 'min-h-screen'}`}
                    >
                        <Input id="search" type="search" placeholder="Solo Leveling, Jujutsu Kaisen, Naruto"
                            ref={inputRef}
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            className="focus:outline-none outline-none"
                        />
                        <div>
                            {(!loading && data.length <= 0) && (
                                <p className="w-full text-center text-white/70 py-10 text-lg">
                                    Ничего не найдено
                                </p>
                            )}
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                {/* First-page skeleton */}
                                {loading && page === 1 ? (
                                    Array.from({ length: 20 }).map((_, i) => <SearchSkeleton key={i} />)
                                ) : data.length > 0 && (
                                    <>
                                        {data.map((el, index) => {
                                            if (isMobile) return (
                                                <Link key={el.id} href={`/anime/${el?.name?.toLowerCase().replace(/\s+/g, '-')}-${el.id}`} className="block">
                                                    <SearchItem el={el} index={index} />
                                                </Link>
                                            );

                                            //IF episodesAired < episodes in release status
                                            const episodesAired =
                                                el.status === "anons"
                                                    ? 0
                                                    : el.status === "released" && (el.episodesAired <= 0 || el.episodesAired < el.episodes)
                                                        ? el.episodes
                                                        : el.episodesAired;

                                            return (
                                                <HoverCard openDelay={300} key={`${el.id}-${index}`}>
                                                    <HoverCardTrigger asChild>
                                                        <Link href={`/anime/${el?.name?.toLowerCase().replace(/\s+/g, '-')}-${el.id}`} className="block">
                                                            <SearchItem el={el} index={index} />
                                                        </Link>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent
                                                        className="w-lg"
                                                        side="right"
                                                        align="start"
                                                    >
                                                        <div className="space-y-4">
                                                            {/* Заголовок */}
                                                            <div className="space-y-1">
                                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{el.russian}</h4>
                                                                <h5 className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">{el.name}</h5>
                                                            </div>

                                                            {/* Основная информация */}
                                                            <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-gray-700 dark:text-gray-200">Статус</span>
                                                                    <span className="mt-1">{STATUS_FILTERS.find(s => s.key === el.status)?.label || "—"}</span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-gray-700 dark:text-gray-200">Выпуск</span>
                                                                    <span className="mt-1">{el.airedOn ? `${formatDate(el.airedOn.date)}` : "—"}</span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-gray-700 dark:text-gray-200">Эпизоды</span>
                                                                    <span className="mt-1">{episodesAired} из {el.episodes || "—"}</span>
                                                                </div>
                                                            </div>

                                                            {/* Жанры */}
                                                            {el?.genres?.length > 0 && (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {el.genres.map((g: any) => (
                                                                        <Link
                                                                            href={''}
                                                                            onClick={() => { }}
                                                                            key={g.id}
                                                                            className="px-2 py-1 text-xs font-medium border rounded-sm border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200"
                                                                        >
                                                                            {g.russian}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            )
                                        })}

                                        {/* Loader skeleton for next pages */}
                                        {loading && page > 1 && (
                                            Array.from({ length: 12 }).map((_, i) => (
                                                <SearchSkeleton key={`load-${i}`} />
                                            ))
                                        )}
                                    </>)
                                }
                            </div>
                        </div>
                    </div>

                    <Filters
                        status={status}
                        toggleStatus={toggleStatus}
                        kind={kind}
                        toggleKind={toggleKind}
                        clearFilters={handleClearFilters}
                        applyFilters={handleApplyFilters}
                    />

                </div>
            </div>
            <MobileFilters
                openFilters={openFilters}
                closeFilters={setOpenFilters}
                status={status}
                toggleStatus={toggleStatus}
                kind={kind}
                toggleKind={toggleKind}
                clearFilters={handleClearFilters}
                applyFilters={handleApplyFilters}
            />
        </>
    );
};