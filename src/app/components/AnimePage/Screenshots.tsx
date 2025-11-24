"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Screenshots({ screenshots }: any) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    if (!screenshots || screenshots.length === 0) return null;

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold px-5 mb-4">Скриншоты</h2>

            <div className="flex gap-4 overflow-x-auto px-5 py-2">
                {screenshots.map((shot: any) => (
                    <motion.div
                        key={shot.id}
                        layoutId={shot.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 cursor-pointer rounded-xl shadow-lg overflow-hidden"
                        onClick={() => setSelectedImg(shot.id)}
                    >
                        <Image
                            src={shot.x332Url}
                            alt={`Screenshot ${shot.id}`}
                            width={250}
                            height={140}
                            style={{ objectFit: "cover", width: "250px", height: "140px" }}
                            className="w-[250px] h-[140px] object-cover rounded-3xl"
                            draggable={false}
                            unoptimized
                        />
                    </motion.div>
                ))}
            </div>

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
                            className="rounded-4xl shadow-xl bg-black/80"
                            style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
