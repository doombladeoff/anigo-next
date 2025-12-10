'use client'

import { motion } from "framer-motion";

function NextEpisode({ nextEpisodeAt }: { nextEpisodeAt: string }) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const getDaysLeft = (dateStr: string) => {
        const now = new Date();
        const target = new Date(dateStr);
        const diff = target.getTime() - now.getTime();
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
    };

    const daysLeft = getDaysLeft(nextEpisodeAt);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
        >
            <div className="flex items-center gap-2">
                <svg
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="dark:fill-white/70"
                >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <span className="font-semibold text-sm md:text-base">Следующая серия выйдет</span>
            </div>

            <span className="font-medium text-sm md:text-base">
                {formatDate(nextEpisodeAt)} ({daysLeft} {daysLeft === 1 ? "день" : daysLeft < 5 ? "дня" : "дней"})
            </span>

            <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none bg-linear-to-r from-purple-400/20 via-pink-300/10 to-red-400/20" />
        </motion.div>
    );
}

export default NextEpisode;
