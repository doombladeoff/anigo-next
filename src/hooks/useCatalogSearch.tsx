import { AnimeFields } from "@/app/api/AnimeFields";
import { useCallback, useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

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

const limit = 35;

export const useCatalogSearch = () => {
    const isMobile = useIsMobile();

    const [queryText, setQueryText] = useState<string>('');
    const [status, setStatus] = useState<string[]>([]);
    const [kind, setKind] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);

    const fetchPage = useCallback(async (pageNumber: number, reset = false) => {
        if (loading) return;

        const formatStatus = status.length ? status.join(",") : undefined;
        const formatKind = kind.length ? kind.join(",") : undefined;

        const variables = {
            ...(queryText.length > 0 && { search: queryText }),
            limit: limit,
            page: pageNumber,
            ...(formatStatus && { status: formatStatus }),
            ...(formatKind && { kind: formatKind }),
        };

        const res = await fetch("/api/anime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fields, variables }),
        })
            .then(r => r.json())
            .then(r => {
                const list = r.animes || [];

                setData(prev => (reset ? list : [...prev, ...list]));
                setHasMore(list.length === limit);
            })
            .then(() => setLoading(false));
        return res;
    }, [loading, status, kind, queryText]);


    useEffect(() => {
        fetchPage(1, true);
    }, []);


    useEffect(() => {
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
                setLoading(true);
                const nextPage = page + 1;
                setPage(nextPage);
                setTimeout(() => {
                    fetchPage(nextPage);
                }, 800);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [page, hasMore, loading]);

    useEffect(() => {
        if (openFilters)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = '';

        return () => { document.body.style.overflow = '' };
    }, [openFilters]);


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

    return {
        isMobile,
        queryText, setQueryText,
        status, setStatus,
        kind, setKind,
        page, setPage,
        hasMore, setHasMore,
        loading, setLoading,
        data, setData,
        toggleStatus, toggleKind, handleApplyFilters, handleClearFilters, handleOpenFilters,
        openFilters, setOpenFilters,
    }
}