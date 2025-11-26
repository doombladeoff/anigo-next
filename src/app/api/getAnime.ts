import { ANIME_QUERY, client } from "@/lib/apollo";

export const getAnime = async (id: number | string) => {
    const { data }: { data: any } = await client.query({
        query: ANIME_QUERY,
        variables: { ids: id, limit: 1 },
    });

    return data?.animes?.[0] || [];
}