import { ANIME_QUERY, client } from "@/lib/apollo";
import { OrderEnum } from "./OrderEnum";

export const getRandomAnime = async () => {
    try {
        const { data }: { data: any } = await client.query({
            query: ANIME_QUERY,
            variables: { order: OrderEnum.random, limit: 1, kind: 'tv,movie', status: 'ongoing,released', score: 7, rating: 'pg_13,r,r_plus' },
            fetchPolicy: "no-cache",
        });

        const anime = data?.animes?.[0];
        console.log('[API Random anime]', anime);
        return anime;
    } catch (error) {
        console.error('[API ERROR]: ', error);
        return [];
    };
};