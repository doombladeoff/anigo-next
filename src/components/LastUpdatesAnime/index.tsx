import { getLastUpdatets } from "@/app/api/getLastUpdates";
import { LastUpdateItem } from "./LastUpdateItem";
import { ScrollDrag } from "../ScrollDrag";

export const LastUpdates = async () => {
    const results = await getLastUpdatets(15);

    if (!results) return;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Последние обновления</h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                <LastUpdateItem data={results} />
            </ScrollDrag>
        </div>
    );
};