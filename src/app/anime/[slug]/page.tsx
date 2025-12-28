import { notFound } from "next/navigation";
import { AnimeContent } from "@/components/pages/anime/AnimeContent";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const cleanSlug = slug.split(/[?=]/)[0];
    const id = cleanSlug.match(/-(\d+)$/)?.[1];

    if (!id) return notFound();

    const KODIK_TOKEN = process.env.KODIK_TOKEN;
    const kodikRes = await fetch(
        `https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${id}&limit=1`,
        { cache: "no-store" }
    );
    const kodikData = await kodikRes.json();
    const link = kodikData?.results?.[0]?.link;

    if (!link) return notFound();

    return <AnimeContent id={id} link={link} />;
};