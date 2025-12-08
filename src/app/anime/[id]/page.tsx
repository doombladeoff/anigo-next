import { PageContent } from "@/components/AnimePage/PageContent";
import { notFound } from "next/navigation";

export default async function AnimePage({ params }: any) {
    const { id } = await params;

    const getVideoLink = async () => {
        const KODIK_TOKEN = process.env.KODIK_TOKEN;
        const kodikRes = await fetch(`https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${id}&limit=1`);
        const kodikData = await kodikRes.json();
        const videolink = kodikData?.results?.[0]?.link || "";
        return videolink;
    };

    const link = await getVideoLink();

    if (!link) notFound();

    return (
        <div className="min-h-screen w-full flex-1 flex bg-[#0a0a0c] text-white">
            <PageContent id={id} link={link} />
        </div>
    );
};