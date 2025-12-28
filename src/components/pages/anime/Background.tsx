'use client';

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

export const Backgoround = ({ img, id }: { img: string, id?: string }) => {
    const isMobile = useIsMobile();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="background-container">
            <div className="background" />
            {mounted && !isMobile && (
                <video autoPlay={true} muted={true} loop className="w-full absolute z-1">
                    <source src={`https://files.thousandcursedcats.com/trailers/${id}/trailer.webm`} type="video/webm" />
                </video>
            )}
            <div
                className="background-image"
                style={{
                    backgroundImage: `url("${img}")`,
                }}
            />
            <div className="absolute inset-0 z-[-1] bg-black/40 dark:bg-black/60" />
        </div>
    );
};
