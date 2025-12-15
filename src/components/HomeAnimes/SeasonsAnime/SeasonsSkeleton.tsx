import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentSeason } from "@/utils/getCurrentSeason";

const seasonNames: Record<string, string> = {
    winter: "зимнего",
    spring: "весеннего",
    summer: "летнего",
    fall: "осеннего",
};

const SeasonsAnimeSkeleton = () => {
    const { season } = getCurrentSeason();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">
                Аниме {seasonNames[season]} сезона
            </h2>

            <div className="flex gap-5 py-2 px-5 xl:px-15 overflow-x-scroll hide-scrollbar">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="w-[180px] shrink-0">
                        <Skeleton className="w-full h-[260px] rounded-xl mb-2" />
                        <Skeleton className="w-full h-5 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeasonsAnimeSkeleton;
