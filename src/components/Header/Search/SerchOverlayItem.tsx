import { ShikimoriAnime } from "@/app/types/Shikimori.types"
import { KIND_FILTERS, STATUS_FILTERS } from "@/contants/Filters"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify";

export const SearchOverlayItem = ({ el }: { el: ShikimoriAnime }) => {
    const status = STATUS_FILTERS.find(s => s.key === el.status)?.label;
    const kind = KIND_FILTERS.find(k => k.key === el.kind)?.label;

    const link = `/anime/${slugify(el.name,
        {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            trim: true
        })}-${el.id}`;

    return (
        <Link
            href={link}
            className="flex gap-3">
            {el?.poster?.preview2xUrl && (
                <Image
                    src={el.poster.preview2xUrl}
                    alt={el?.russian}
                    width={60}
                    height={80}
                    style={{ width: 'auto' }}
                />
            )}
            <div className="flex flex-col justify-between py-1">
                <div className="flex flex-col">
                    <span className="text-sm">{status}</span>
                    <p
                        className="font-bold overflow-hidden"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            fontSize: 16
                        }}
                    >
                        {el?.russian || el?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2 text-black/40 dark:text-white/60 text-sm">
                    <span className="capitalize">
                        {kind}{el.kind === 'tv' ? ' Сериал' : ''}
                    </span>
                    {(el?.airedOn?.year || el?.releasedOn?.year) && (
                        <>
                            <span>&bull;</span>
                            <span>{el.airedOn?.year || el.releasedOn?.year || '—'}</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};