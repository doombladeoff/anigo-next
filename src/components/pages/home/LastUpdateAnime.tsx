import { KodikMaterialObject } from "@/app/types/Kodik.types";
import RenderCard from "./RenderCard";
import { ScrollDrag } from "@/components/ScrollDrag";

async function getLastUpdates(): Promise<KodikMaterialObject[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/last-updates?limit=12`);
    return res.json();
}

const LastUpdates = async () => {
    const results = await getLastUpdates();

    if (!results?.length) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">
                Последние обновления
            </h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                {results.map((item, index) => {
                    const isLCP = index < 6;

                    return (
                        <RenderCard key={item.id} index={index}
                            title={item.title}
                            russian={item.title}
                            posterUrl={item?.material_data?.anime_poster_url || ""}
                            id={Number(item.shikimori_id)}
                            translate={item?.translation?.title || ""}
                            episodes_count={item.episodes_count}
                            isLCP={isLCP}
                        />
                    );
                })}
            </ScrollDrag>
        </div>
    );
};

export default LastUpdates;