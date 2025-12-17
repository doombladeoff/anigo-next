import { LastUpdateItem } from "./LastUpdateItem";
import { ScrollDrag } from "../../ScrollDrag";
import { KodikMaterialObject } from "@/app/types/Kodik.types";

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
                <LastUpdateItem data={results} />
            </ScrollDrag>
        </div>
    );
};

export default LastUpdates;