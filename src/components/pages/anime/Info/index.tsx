import { KIND_FILTERS, RATING_FILTERS, STATUS_FILTERS } from "@/contants/Filters";
import { InfoRow } from "./InfoRow";
import { ShikimoriAnime } from "@/app/types/Shikimori.types";

export const Info = ({ anime }: { anime: ShikimoriAnime }) => {
    console.log(anime);

    const type = KIND_FILTERS.find(k => k.key === anime.kind)?.label || "—";
    const status = STATUS_FILTERS.find(k => k.key === anime.status)?.label || "—";
    const rating = RATING_FILTERS.find(k => k.key === anime.rating)?.label || "—";

    const epAried = anime.status == 'released' ? (Number(anime.episodesAired) < Number(anime.episodes) ? anime.episodesAired + 1 : anime.episodesAired) : anime.episodesAired;

    return (
        <div className="space-y-4">
            <div className="text-2xl font-bold">Детали</div>
            <div className="space-y-2">
                <InfoRow label="Тип" value={type} />
                <InfoRow label="Статус" value={status} />
                <InfoRow label="Эпизоды" value={anime.episodes} />
                <InfoRow label="Эпизодов доступно" value={epAried} />
                <InfoRow label="Возрастной рейтинг" value={rating} />
            </div>
        </div>
    );
};