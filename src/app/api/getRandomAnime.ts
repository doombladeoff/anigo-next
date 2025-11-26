import { buildAnimeQuery, client } from "@/lib/apollo";
import { OrderEnum } from "./OrderEnum";
import { AnimeFields } from "./AnimeFields";

export const getRandomAnime = async () => {
    const fields: AnimeFields = { id: true };
    const query = buildAnimeQuery(fields);
    try {
        const { data }: { data: any } = await client.query({
            query: query,
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