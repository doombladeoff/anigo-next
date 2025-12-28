'use client';

import { useIsMobile } from "@/hooks/use-mobile";
import { StarIcon } from "lucide-react";

export const Score = ({ score }: { score: number | string }) => {
    const isMobile = useIsMobile();

    if (!score) return;

    return (
        <div className="flex flex-row gap-2 items-center">
            <StarIcon
                size={isMobile ? 24 : 32}
                fill="rgb(92, 220, 52)"
                color="rgb(92, 220, 52)"
            />
            <div className="text-2xl md:text-4xl font-semibold text-[rgb(92,220,52)]">
                {score}
            </div>
        </div>
    );
};