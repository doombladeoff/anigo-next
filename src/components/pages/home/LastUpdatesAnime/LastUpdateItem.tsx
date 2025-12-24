import Image from "next/image";
import { KodikMaterialObject } from "@/app/types/Kodik.types";

export const LastUpdateItem = ({ item, index }: { item: KodikMaterialObject; index: number }) => {
    const poster = item?.material_data?.anime_poster_url || "";
    const title = item?.title || "";
    const translate = item?.translation?.title || "";
    const isVisible = index < 10;

    return (
        <>
            <div className={"w-[180px] shrink-0 cursor-pointer group transition-transform duration-300 ease-out transform hover:-translate-y-1"}>
                <div className="relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-black/25 dark:bg-white/15 opacity-0 animate-fade">
                    <Image
                        src={poster || ""}
                        alt={title}
                        unoptimized
                        fill
                        className="object-cover"
                        sizes="180px"
                        draggable={false}
                        loading={isVisible ? "eager" : "lazy"}
                        priority={isVisible}
                        quality={75}
                    />

                    <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent rounded-b-xl" />
                        <span className="relative text-white font-semibold text-sm">
                            Эпизод {item.episodes_count}
                        </span>
                    </div>
                </div>
            </div>

            <p className="mt-2 font-semibold text-sm line-clamp-2 opacity-90">
                {title}
            </p>
            <p className="text-xs opacity-60 mt-1 line-clamp-1">
                {translate}
            </p>
        </>
    );
};
