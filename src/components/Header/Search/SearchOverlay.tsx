'use client'

import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SearchOverlayItem } from "./SerchOverlayItem";
import { useIsMobile } from "@/hooks/useIsDesktop";
import { useOverlaySearch } from "@/hooks/useOverlaySearch";

export const SearchOverlay = ({ closeModal }: { closeModal: (v: boolean) => void }) => {
    const { queryText, setQueryText, data, scrollRef, loading, hasMore } = useOverlaySearch();

    const isMobile = useIsMobile();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const blurInput = () => {
            if (document.activeElement === inputRef.current) {
                inputRef.current?.blur();
            }
        };

        window.addEventListener("scroll", blurInput, { passive: true });
        return () => window.removeEventListener("scroll", blurInput);
    }, []);

    return (
        <div
            onClick={() => closeModal(false)}
            className="overlay-container animate-fade"
        >
            <div className="z-50 h-full lg:h-auto w-full flex flex-1 justify-center lg:pt-10 lg:pb-4">
                <div className="overlay"
                    onClick={(e) => e.stopPropagation()}
                >
                    {isMobile && (
                        <button className="py-3 flex flex-row gap-2" onClick={() => closeModal(false)}>
                            <ArrowLeftIcon size={24} />
                            Быстрый поиск
                        </button>
                    )}

                    <div className="relative w-full lg:w-[740px]">
                        <input
                            ref={inputRef}
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            type="text"
                            placeholder="Solo Leveling, Jujutsu Kaisen, Naruto"
                            className="w-full h-12 px-4 pl-12 rounded-md bg-black text-white placeholder-white/40 outline-none"
                        />

                        <SearchIcon
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2"
                            color="white"
                        />
                    </div>

                    {data.length > 0 && (
                        <div
                            className="mt-4 h-full lg:max-h-[60vh] overflow-y-auto flex flex-col gap-4 pb-30 lg:pb-2"
                            ref={scrollRef}
                        >
                            {data.map(el => (
                                <SearchOverlayItem el={el} key={el.id} />
                            ))}

                            {loading && hasMore && (
                                <div className="flex w-full justify-center py-2">
                                    <p className="text-white/70">Загрузка...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {(!data.length && !loading && queryText) && (
                        <div className="flex h-[100px] w-full justify-center items-center">
                            <p className="text-black/70 dark:text-white/70 font-medium text-center">
                                По запросу "{queryText}" ничего не найдено.
                            </p>
                        </div>
                    )}

                    {!data.length && !loading && queryText === "" && (
                        <div className="flex px-1 py-5 lg:p-0 lg:h-[100px] w-full justify-center lg:items-center">
                            <p className="dark:text-white/70 font-medium">
                                Расширенный поиск находится в{" "}
                                <Link href="/anime/catalog" onClick={() => closeModal(false)}>
                                    <span className="text-purple-400 font-semibold hover:text-purple-600">
                                        каталоге
                                    </span>
                                </Link>
                            </p>
                        </div>
                    )}

                    {loading && data.length === 0 && (
                        <div className="flex h-[100px] w-full justify-center items-center">
                            <p className="text-white/70 font-medium">Загрузка...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};