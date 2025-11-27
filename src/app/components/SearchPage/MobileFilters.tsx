import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon } from "lucide-react"
import { StatusFilter } from "../Header/Search/StatusFilter"
import { KindFilter } from "../Header/Search/KindFilter"
import { KIND_FILTERS, STATUS_FILTERS } from "@/contants/Filters";

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
                    className="fixed inset-0 z-50 bg-black/80 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-0 h-full max-w-440 bg-black justify-between border-l border-white/20 p-6 gap-6 flex flex-col"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    >
                        <div className="flex flex-col gap-5">
                            <button
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
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

                        <div className="flex gap-4 mt-4">
                            <button onClick={clearFilters} className="flex-1 border border-amber-50/10 rounded-lg py-2 px-5 text-white hover:bg-white/10 transition-colors">
                                Сбросить
                            </button>
                            <button onClick={applyFilters} className="flex-1bg-purple-600 rounded-lg py-2 px-5 text-white bg-purple-900">
                                Применить
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};