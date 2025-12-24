'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { SkeletonPlaceholder } from "@/components/pages/home/SkeletonPlaceholder";
import { MaterialData, MaterialObject } from "kodikwrapper";

interface UpdateItem {
    id: string;
    shikimori_id: string;
    title: string;
    translation: { title: string };
    material_data: { anime_poster_url: string };
    updated_at: string;
}

export default function UpdatesPage() {
    const [updates, setUpdates] = useState<MaterialObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/last-updates?limit=20")
            .then((res) => res.json())
            .then((res) => setUpdates(res))
            .then(() => setLoading(false))
            .catch(console.error);
    }, []);

    if (loading) {
        return <SkeletonPlaceholder title="Последние обновления" num={15} />
    }

    if (!updates) return;

    // Разделяем по дате
    const today = new Date().toDateString();
    const grouped = {
        today: updates.filter(u => new Date(u.updated_at).toDateString() === today),
        yesterday: updates.filter(u => new Date(u.updated_at).toDateString() !== today),
    };

    return (
        <div className="bg-zinc-50 dark:bg-black text-black dark:text-white py-20 px-4 flex flex-col items-center">
            {["today", "yesterday"].map((group) => (
                <div key={group} className="w-full max-w-5xl mb-10">
                    <h2 className="text-2xl font-semibold mb-4 capitalize">
                        {group === "today" ? "Сегодня" : "Вчера"}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {grouped[group as "today" | "yesterday"].map((item: any, index) => (
                            <div
                                key={item.id}
                                className="w-[180px] cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg transform translate-y-6 animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                            >
                                <div className="relative w-full h-[260px]">
                                    <Image
                                        src={item?.material_data?.anime_poster_url}
                                        alt={item.title}
                                        width={180}
                                        height={260}
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-3 text-center">
                                    <p className="font-semibold line-clamp-2">{item.title}</p>
                                    {item.translation.title && (
                                        <p className="text-sm text-white/70 line-clamp-1">{item.translation.title}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
