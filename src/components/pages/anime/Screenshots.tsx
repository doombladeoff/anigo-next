"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Screenshot } from "@/app/types/Shikimori.types";
import { ScrollDrag } from "@/components/ScrollDrag";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";


export default function Screenshots({ screenshots }: { screenshots: Screenshot[] }) {
    if (!screenshots || screenshots.length === 0) return null;

    return (
        <div className="relative">
            <ScrollDrag>
                {screenshots.map((shot: Screenshot, index) => {
                    const isVisible = index < 8;
                    return (
                        <motion.div
                            key={shot.id}
                            layoutId={String(shot.id)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 shadow-lg overflow-hidden"
                        >
                            <ImageZoom>
                                <Image
                                    className="h-[140px] w-[250px] aspect-auto bg-white/10"
                                    height={800}
                                    src={shot.originalUrl}
                                    alt={`Screenshot ${shot.id}`}
                                    unoptimized
                                    width={1200}
                                    draggable={false}
                                    loading={isVisible ? "eager" : "lazy"}
                                    priority={isVisible}
                                />
                            </ImageZoom>
                        </motion.div>
                    )
                })}
            </ScrollDrag>
        </div>
    );
}
