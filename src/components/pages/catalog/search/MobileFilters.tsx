import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon } from "lucide-react"

import { KIND_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { StatusFilter } from "@/components/Header/Search/Filters/StatusFilter";
import { KindFilter } from "@/components/Header/Search/Filters/KindFilter";
import { HandleButtons } from "@/components/Header/Search/HandleButtons";

interface MobileFilters {
    openFilters: boolean
    closeFilters: (v: boolean) => void
    status: any
    toggleStatus: (v: string) => void
    kind: any
    toggleKind: (v: string) => void
    clearFilters: () => void;
    applyFilters: () => void;
}
export const MobileFilters = ({ openFilters, closeFilters, status, toggleStatus, kind, toggleKind, clearFilters, applyFilters }: MobileFilters) => {
    return (
        <AnimatePresence>
            {openFilters && (
                <motion.div
                    onClick={() => closeFilters(false)}
                    className="fixed inset-0 z-50 bg-white dark:bg-black md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-0 h-full w-full light:bg-white dark:bg-black justify-between border-l border-white/20 p-6 gap-6 flex flex-col"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    >
                        <div className="flex flex-col gap-5">
                            <button
                                className="flex items-center gap-2 text-gray-700"
                                onClick={() => closeFilters(false)}
                            >
                                <ArrowLeftIcon size={24} />
                                <span>Фильтры</span>
                            </button>

                            <StatusFilter
                                statusArr={STATUS_FILTERS}
                                activeArr={status}
                                toggleStatus={toggleStatus}
                            />
                            <KindFilter
                                kindArr={KIND_FILTERS}
                                activeKindArr={kind}
                                toggleKind={toggleKind}
                            />
                        </div>
                        <HandleButtons onApply={applyFilters} onClear={clearFilters} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};