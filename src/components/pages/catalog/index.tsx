'use client'

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchItem } from "../../../components/Header/Search/SearchItem";

import { Input } from "@/components/ui/input";
import { Header } from "@/components/pages/catalog/search/Header";
import { SearchSkeleton } from "@/components/pages/catalog/search/SearchSkeleton";
import { RenderCard } from "@/components/pages/catalog/search/RenderCard";
import { Filters } from "@/components/pages/catalog/search/Filters";
import { MobileFilters } from "@/components/pages/catalog/search/MobileFilters";
import { useCatalogSearch } from "@/hooks/useCatalogSearch";

export const Catalog = () => {

    const {
        isMobile,
        queryText,
        setQueryText,
        status,
        kind,
        page,
        loading,
        data,
        toggleStatus, toggleKind, handleApplyFilters, handleClearFilters, handleOpenFilters,
        openFilters,
        setOpenFilters,
    } = useCatalogSearch();

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (inputRef.current && document.activeElement === inputRef.current) {
                inputRef.current.blur();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const CardLoadPlaceholder = useCallback(() => {
        return (
            <>
                {loading && page > 1 && (
                    Array.from({ length: 12 }).map((_, i) => (
                        <SearchSkeleton key={`load-${i}`} />
                    ))
                )}
            </>
        )
    }, [loading, page]);

    return (
        <main>
            {isMobile && <Header openFilters={handleOpenFilters} />}
            <div className="flex-1 flex justify-center py-15 md:py-5">
                <div className="flex flex-row gap-10 w-full max-w-7xl">
                    <div ref={scrollRef} className={`flex-1 rounded-md p-4 min-h-full dark:bg-white/10`}>
                        <Input id="search" type="search" placeholder="Solo Leveling, Jujutsu Kaisen, Naruto"
                            ref={inputRef}
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            className="focus:outline-none outline-none"
                        />
                        <div>
                            {(!loading && data.length <= 0) && (
                                <p className="w-full text-center text-white/70 py-10 text-lg">
                                    Ничего не найдено
                                </p>
                            )}
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                {/* First-page skeleton */}
                                {loading && page === 1 ? (
                                    Array.from({ length: 20 }).map((_, i) => <SearchSkeleton key={i} />)
                                ) : data.length > 0 && (
                                    <>
                                        {data.map((el, index) => {
                                            if (isMobile) return (
                                                <Link key={el.id} href={`/anime/${el?.name?.toLowerCase().replace(/\s+/g, '-')}-${el.id}`} className="block">
                                                    <SearchItem item={el} index={index} />
                                                </Link>
                                            );

                                            return (<RenderCard key={`${el.id}-${index}`} index={index} item={el} />);
                                        })}

                                        {/* Loader skeleton for next pages */}
                                        <CardLoadPlaceholder />
                                    </>)
                                }
                            </div>
                        </div>
                    </div>

                    <Filters
                        status={status}
                        toggleStatus={toggleStatus}
                        kind={kind}
                        toggleKind={toggleKind}
                        clearFilters={handleClearFilters}
                        applyFilters={handleApplyFilters}
                    />

                </div>
            </div>

            <MobileFilters
                openFilters={openFilters}
                closeFilters={setOpenFilters}
                status={status}
                toggleStatus={toggleStatus}
                kind={kind}
                toggleKind={toggleKind}
                clearFilters={handleClearFilters}
                applyFilters={handleApplyFilters}
            />
        </main>
    );
};