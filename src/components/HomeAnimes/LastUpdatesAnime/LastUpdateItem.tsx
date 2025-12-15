import Link from "next/link";
import Image from "next/image";
import { MaterialObject } from "kodikwrapper";

export const LastUpdateItem = ({ data }: { data: MaterialObject[] }) => {
    return (
        <>
            {data.map((item: any, index: number) => {
                const poster = item?.material_data?.anime_poster_url || "";
                const title = item?.title || "";
                const translate = item?.translation?.title || "";
                const isVisible = index < 10;

                return (
                    <Link
                        key={item.id}
                        href={`/anime/${item?.material_data?.title_en?.toLowerCase().replace(/\s+/g, '-')}-${item.shikimori_id}`}
                        className="w-[180px] shrink-0 cursor-pointer group"
                        draggable={false}
                    >
                        <div
                            className={`
                w-[180px] shrink-0 cursor-pointer group
                transition-transform duration-300 ease-out transform hover:-translate-y-1
              `}
                        >
                            <div className="relative w-full h-[260px] overflow-hidden rounded-xl shadow-2xl bg-gray-800 opacity-0 animate-fade transition-opacity duration-700 delay-[${index * 50}ms]">
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
                    </Link>
                );
            })}
        </>
    );
};
