"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ScrollDrag } from "../ScrollDrag";
import { Screenshot } from "@/app/types/Shikimori.types";

export default function Screenshots({ screenshots }: { screenshots: Screenshot[] }) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    if (!screenshots || screenshots.length === 0) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold px-5 mb-4">Кадры</h2>

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
                            className="shrink-0 cursor-pointer shadow-lg overflow-hidden"
                            onClick={() => setSelectedImg(String(shot.id))}
                        >
                            <Image
                                src={shot.x332Url}
                                alt={`Screenshot ${shot.id}`}
                                width={250}
                                height={140}
                                style={{ objectFit: "cover", width: "250px", height: "140px" }}
                                className="w-[250px] h-[140px] object-cover"
                                draggable={false}
                                unoptimized
                                loading={isVisible ? "eager" : "lazy"}
                                priority={isVisible}
                            />
                        </motion.div>
                    )
                })}
            </ScrollDrag>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        onClick={() => setSelectedImg(null)}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={screenshots.find((s: any) => s.id === selectedImg)?.originalUrl}
                            alt="Screenshot Full"
                            layoutId={selectedImg}
                            className="shadow-xl bg-black/80"
                            style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
