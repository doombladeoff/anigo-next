"use client"

import { useState, useRef, useEffect } from "react";
import Screenshots from "../Screenshots";
import { RelatedAnime } from "../Related";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";
import { Overview } from "../Overview";
import { cn } from "@/lib/utils";

interface TabsProps {
    anime: ShikimoriAnime;
    id: string;
}

export const Tabs = ({ anime }: TabsProps) => {
    const tabs = [
        { value: "overview", label: "Обзор", },
        { value: "screenshots", label: "Кадры", disabled: !(anime?.screenshots?.length > 0) },
        { value: "related", label: "Связанное", disabled: !(anime.related.filter(item => item.anime !== null).length > 0) },
    ];

    const defaultTab = tabs.find((tab) => !tab.disabled)?.value || "overview";
    const [active, setActive] = useState(defaultTab);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateUnderline = () => {
            const container = containerRef.current;
            if (!container) return;

            const activeTab = container.querySelector<HTMLButtonElement>(
                `[data-value="${active}"]`
            );
            if (activeTab) {
                setUnderlineStyle({
                    left: activeTab.offsetLeft,
                    width: activeTab.offsetWidth,
                });
            }
        };

        updateUnderline();
        window.addEventListener("resize", updateUnderline);
        return () => window.removeEventListener("resize", updateUnderline);
    }, [active]);

    return (
        <div className="flex justify-center w-full">
            <div className="w-full">
                <div className="relative">
                    <div ref={containerRef} className="flex relative border-b border-gray-300 dark:border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                data-value={tab.value}
                                onClick={() => !tab.disabled && setActive(tab.value)}
                                disabled={tab.disabled}
                                className={cn('tab', `
                                    ${tab.disabled
                                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                        : active === tab.value
                                            ? "text-black dark:text-white"
                                            : "text-gray-500 dark:text-gray-400"
                                    }
                                `)}
                            >
                                {tab.label}
                            </button>
                        ))}

                        {/* Индикатор активного таба */}
                        <span
                            className='tab-indicator'
                            style={{
                                left: underlineStyle.left,
                                width: underlineStyle.width,
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        {active === "overview" && !tabs[0].disabled && (
                            <Overview animeData={anime} />
                        )}
                        {active === "screenshots" && !tabs[0].disabled && (
                            <Screenshots screenshots={anime.screenshots.slice(0, 12)} />
                        )}
                        {active === "related" && <RelatedAnime data={anime} />}
                    </div>
                </div>
            </div>
        </div>
    );
};
