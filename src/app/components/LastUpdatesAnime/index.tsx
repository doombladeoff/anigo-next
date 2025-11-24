import { getLastUpdatets } from "@/api/getLastUpdates";
import { LastUpdateItem } from "./LastUpdateItem";
import HorizontalScrollContainer from "../HorizontalScroll";

export const LastUpdates = async () => {
    const results = await getLastUpdatets(15);

    if (!results) return;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Последние обновления</h2>
            <HorizontalScrollContainer className="flex gap-5 overflow-x-auto py-2 px-5 xl:px-15 no-scrollbar cursor-grab active:cursor-grabbing">
                <LastUpdateItem data={results} />
            </HorizontalScrollContainer>
        </div>
    );
};