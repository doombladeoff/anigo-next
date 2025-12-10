'use client';

import { LastUpdateItem } from "./LastUpdateItem";
import { ScrollDrag } from "../../ScrollDrag";
import { useEffect, useState } from "react";
import { MaterialObject } from "kodikwrapper";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder";

export const LastUpdates = () => {
    const [results, setResults] = useState<MaterialObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/last-updates?limit=20")
            .then((res) => res.json())
            .then((res) => setResults(res))
            .then(() => setLoading(false))
            .catch(console.error);
    }, []);

    if (loading) {
        return <SkeletonPlaceholder title="Последние обновления" num={15} />
    }

    if (!results) return;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold mb-4 px-5 md:px-10 xl:px-15">Последние обновления</h2>
            <ScrollDrag style="flex gap-5 py-2 px-5 xl:px-15 cursor-grab active:cursor-grabbing overflow-x-scroll hide-scrollbar">
                <LastUpdateItem data={results} />
            </ScrollDrag>
        </div>
    );
};