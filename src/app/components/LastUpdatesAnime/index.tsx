import { getLastUpdatets } from "@/api/getLastUpdates";
import { LastUpdateItem } from "./LastUpdateItem";

export const LastUpdates = async () => {
    const results = await getLastUpdatets(15);

    if (!results) return;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-15">Последние обновления</h2>
            <div className="flex gap-5 overflow-x-auto py-2 no-scrollbar scroll-smooth px-15">
                <LastUpdateItem data={results} />
            </div>
        </div>
    );
};
