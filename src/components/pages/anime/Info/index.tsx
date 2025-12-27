import { KIND_FILTERS, RATING_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { InfoRow } from "./InfoRow";

export const Info = ({ anime }: any) => {
    return (
        <div className="space-y-2">
            <InfoRow label="Тип" value={KIND_FILTERS.find(k => k.key === anime.kind)?.label || "—"} />
            <InfoRow label="Статус" value={STATUS_FILTERS.find(k => k.key === anime.status)?.label || "—"} />
            <InfoRow label="Эпизоды" value={anime.episodes} />
            <InfoRow label="Эпизодов доступно" value={anime.episodesAired} />
            <InfoRow label="Возрастной рейтинг" value={RATING_FILTERS.find(k => k.key === anime.rating)?.label || "—"} />
        </div>
    );
};