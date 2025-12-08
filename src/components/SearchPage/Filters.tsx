import { KIND_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { KindFilter } from "../Header/Search/Filters/KindFilter";
import { StatusFilter } from "../Header/Search/Filters/StatusFilter";
import { Button } from "../ui/button";
import { HandleButtons } from "../Header/Search/HandleButtons";

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
            className="hidden lg:flex sticky top-20 w-full max-w-[330px] h-[calc(100vh-160px)] rounded-md p-6 dark:bg-white/10 overflow-y-auto flex-col justify-between"
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

            <HandleButtons onApply={applyFilters} onClear={clearFilters} />
        </div>

    );
};