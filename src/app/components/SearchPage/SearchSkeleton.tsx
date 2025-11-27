export const SearchSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col gap-3">
            <div className="w-full h-[220px] bg-white/10 rounded-md" />
            <div className="h-4 w-3/4 bg-white/10 rounded" />
            <div className="h-3 w-1/2 bg-white/10 rounded" />
        </div>
    );
};