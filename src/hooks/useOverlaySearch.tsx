import { AnimeFields } from "@/app/api/AnimeFields";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { buildAnimeQuery, client } from "@/lib/apollo";
import { useCallback, useEffect, useRef, useState } from "react";

const limit = 15;

const fields: AnimeFields = {
    id: true,
    russian: true,
    name: true,
    airedOn: { year: true },
    releasedOn: { year: true },
    kind: true,
    score: true,
    status: true,
    poster: { preview2xUrl: true, main2xUrl: true },
};
const query = buildAnimeQuery(fields);

type AnimeQueryResult = {
    animes: ShikimoriAnime[];
};

export const useOverlaySearch = () => {
    const [queryText, setQueryText] = useState("");
    const [data, setData] = useState<ShikimoriAnime[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const fetchPage = useCallback(
        async (reset = false) => {
            setLoading(true);
            if (loading) return;

            const { data: resultData, error } = await client.query<AnimeQueryResult>({
                query,
                variables: {
                    ...(queryText.length > 0 && { search: queryText }),
                    limit,
                    page,
                    kind: 'tv,movie,ona,ova',
                    rating: '!rx'
                },
                fetchPolicy: "network-only",
            });

            if (error) {
                setLoading(false);
                return;
            }

            const list = resultData?.animes ?? [];

            if (reset) {
                setData(list);
            } else {
                setData(prev => [...prev, ...list]);
            }

            setHasMore(list.length === limit);
            setLoading(false);
        },
        [queryText, page, loading]
    );


    useEffect(() => {
        if (!queryText.trim()) return;

        fetchPage(page === 1);
    }, [page]);

    useEffect(() => {
        if (!queryText.trim()) {
            setData([]);
            setPage(1);
            setHasMore(true);
            return;
        }

        const timeout = setTimeout(() => {
            setPage(1);
            fetchPage(true);
        }, 800);

        return () => clearTimeout(timeout);
    }, [queryText]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onScroll = () => {
            const scrollTop = el.scrollTop;
            const clientHeight = el.clientHeight;
            const scrollHeight = el.scrollHeight;
            const offset = 150;

            const isBottom = scrollTop + clientHeight >= scrollHeight - offset;

            if (isBottom && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [hasMore, loading]);

    return {queryText, setQueryText, data, scrollRef, loading, hasMore};
}