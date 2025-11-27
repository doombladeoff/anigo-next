import { KIND_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { KindFilter } from "../Header/Search/KindFilter";
import { StatusFilter } from "../Header/Search/StatusFilter";

interface Filters {
    status: any
    toggleStatus: (v: string) => void
    kind: any
    toggleKind: (v: string) => void
    clearFilters: () => void;
    applyFilters: () => void;
};

export const Filters = ({ status, toggleStatus, kind, toggleKind, clearFilters, applyFilters }: Filters) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:flex sticky top-20 w-full max-w-[330px] h-[calc(100vh-160px)] rounded-md p-6 bg-white/10  overflow-y-auto flex-col justify-between"
        >
            <div className="flex flex-col gap-5">
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
                <button onClick={clearFilters} className="flex-1border border-amber-50/10 rounded-lg py-2 px-5 text-white hover:bg-white/10 ransition-colors">
                    Сбросить
                </button>
                <button onClick={applyFilters} className="flex-1 bg-purple-600 rounded-lg py-2 px-5 text-white hover:bg-purple-500  transition-colors">
                    Применить
                </button>
            </div>
        </div>

    );
};