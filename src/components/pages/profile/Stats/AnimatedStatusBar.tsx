type Props = {
    stats: {
        completed: number;
        planned: number;
        watching: number;
        dropped: number;
        total: number;
    };
};

const STATUS_COLORS: Record<string, string> = {
    completed: "bg-emerald-500",
    watching: "bg-sky-500",
    planned: "bg-amber-500",
    dropped: "bg-rose-500",
};

export function AnimeStatusBar({ stats }: Props) {
    return (
        <div className="w-full animate-fade">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                {Object.entries(STATUS_COLORS).map(([status, color]) => {
                    const value = stats[status as keyof typeof stats];
                    if (!value) return null;

                    const percent = (value / stats.total) * 100;

                    return (
                        <div
                            key={status}
                            className={color}
                            style={{ width: `${percent}%` }}
                        />
                    );
                })}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <LegendItem color="bg-emerald-500" label="Просмотрено" value={stats.completed || 0} />
                <LegendItem color="bg-sky-500" label="Смотрю" value={stats.watching || 0} />
                <LegendItem color="bg-amber-500" label="В планах" value={stats.planned || 0} />
                <LegendItem color="bg-rose-500" label="Брошено" value={stats.dropped || 0} />
                <LegendItem color="bg-muted" label="Всего" value={stats.total || 0} />
            </div>
        </div>
    );
}

function LegendItem({
    color,
    label,
    value,
}: {
    color: string;
    label: string;
    value: number;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <span>
                {label}: <b>{value}</b>
            </span>
        </div>
    );
}
