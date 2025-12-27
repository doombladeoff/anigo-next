import { AnimeContent } from "@/components/pages/anime/AnimeContent";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cleanSlug = slug.split(/[?=]/)[0];
    const id = cleanSlug.match(/-(\d+)$/)?.[1];

    const getVideoLink = async () => {
        const KODIK_TOKEN = process.env.KODIK_TOKEN;
        const kodikRes = await fetch(`https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${id}&limit=1`);
        const kodikData = await kodikRes.json();
        const videolink = kodikData?.results?.[0]?.link;
        return videolink;
    };
    const link = await getVideoLink();

    if (!id || !link) return notFound();

    return (
        <main className="min-h-screen flex-1 flex">
            <AnimeContent id={id} link={link} />
        </main>
    );
}