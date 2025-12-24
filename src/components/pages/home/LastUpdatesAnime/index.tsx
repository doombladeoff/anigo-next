import { LastUpdateItem } from "./LastUpdateItem";
import { KodikMaterialObject } from "@/app/types/Kodik.types";
import { ScrollDrag } from "@/components/ScrollDrag";
import Link from "next/link";
import slugify from "slugify";

async function getLastUpdates(): Promise<KodikMaterialObject[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/last-updates?limit=20`,
        {
            cache: "no-store",
        }
    );

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
                    if (!item) return null;

                    return (
                        <Link
                            key={item.id}
                            href={`/anime/${slugify(item.material_data.title_en!,
                                {
                                    replacement: '-',
                                    remove: undefined,
                                    lower: true,
                                    strict: true,
                                    trim: true
                                })}-${item.shikimori_id}`
                            }
                            className="w-[180px] shrink-0 cursor-pointer group"
                            draggable={false}
                        >
                            <LastUpdateItem item={item} index={index} />
                        </Link>
                    );
                })}
            </ScrollDrag>
        </div>
    );
};

export default LastUpdates;