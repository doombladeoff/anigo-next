import { NextResponse } from "next/server";
import { buildAnimeQuery, client } from "@/lib/apollo";
import { AnimeFields } from "@/app/api/AnimeFields";
import { OrderEnum } from "@/app/api/OrderEnum";

const getRandomAnime = async () => {
    const fields: AnimeFields = { id: true, name: true };
    const query = buildAnimeQuery(fields);
    try {
        const { data }: { data: any } = await client.query({
            query: query,
            variables: { order: OrderEnum.random, limit: 1, kind: 'tv,movie', status: 'ongoing,released', score: 7, rating: 'pg_13,r,r_plus' },
            fetchPolicy: "no-cache",
        });

        const anime = data?.animes?.[0];

        const getVideoLink = async () => {
            const KODIK_TOKEN = process.env.NEXT_PUBLIC_KODIK_TOKEN;
            const kodikRes = await fetch(`https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${anime.id}&limit=1`);
            const kodikData = await kodikRes.json();
            const videolink = !!kodikData?.results?.[0]?.link;
            return videolink;
        };

        const hasVideo = await getVideoLink();
        if (hasVideo) {
            console.log('[API Random anime]', anime);
            return anime;
        }
        else {
            console.warn('[API Random anime]: Повторный поиск')
            await getRandomAnime();
        }
    } catch (error) {
        console.error('[API ERROR]: ', error);
        return [];
    };
};

export async function GET() {
    try {
        const anime = await getRandomAnime();

        if (!anime) {
            return NextResponse.json(
                { error: "Anime with video not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(anime);
    } catch (error) {
        console.error("[API RANDOM ANIME ERROR]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
