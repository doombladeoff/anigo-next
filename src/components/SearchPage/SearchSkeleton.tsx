import { Skeleton } from "../ui/skeleton";

export const SearchSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 animate-pulse">
            <Skeleton className="h-[220px] w-full rounded-xl dark:bg-white/10 light:bg-dark/90" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 dark:bg-white/10 light:bg-dark/90" />
                <Skeleton className="h-4 w-1/2 dark:bg-white/10 light:bg-dark/90" />
            </div>
        </div>
    );
};