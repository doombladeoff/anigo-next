import { PageContent } from "@/components/AnimePage/PageContent";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const match = slug.match(/-(\d+)$/);
    const id = match ? match[1] : null;

    const getVideoLink = async () => {
        const KODIK_TOKEN = process.env.KODIK_TOKEN;
        const kodikRes = await fetch(`https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${id}&limit=1`);
        const kodikData = await kodikRes.json();
        const videolink = kodikData?.results?.[0]?.link || "";
        return videolink;
    };
    const link = await getVideoLink();

    if (!id || !link) {
        return notFound();
    }

    return (
        <div className="min-h-screen flex-1 flex">
            <PageContent id={id} link={link} />
        </div>
    );
}