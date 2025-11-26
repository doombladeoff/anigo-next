import { buildAnimeQuery, client } from "@/lib/apollo";
import { AnimeFields } from "./AnimeFields";
import { ShikimoriAnime } from "../types/Shikimori.types";

export const getAnime = async (id: number | string) => {
    const fields: AnimeFields = {
        id: true,
        russian: true,
        name: true,
        episodes: true,
        episodesAired: true,
        nextEpisodeAt: true,
        rating: true,
        kind: true,
        status: true,
        descriptionHtml: true,
        description: true,
        poster: {
            main2xUrl: true,
            preview2xUrl: true,
        },
        screenshots: {
            id: true,
            originalUrl: true,
            x332Url: true,
        },
        score: true,
    };
    const query = buildAnimeQuery(fields);

    const { data }: { data: any } = await client.query({
        query: query,
        variables: { ids: id, limit: 1 },
    });

    console.log('Anime:', data);
    return data?.animes?.[0] as ShikimoriAnime;
}