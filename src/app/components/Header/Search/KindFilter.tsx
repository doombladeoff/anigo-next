export const KindFilter = ({ kindArr, toggleKind, activeKindArr }: { kindArr: any[], toggleKind: (v: any) => void, activeKindArr: any[] }) => {
    return (
        <div className="space-y-6 text-white/90">
            <h3 className="text-lg font-semibold mb-2">Тип</h3>
            <div className="gap-5 flex-wrap grid grid-cols-2">
                {kindArr.map((item) => {
                    const active = activeKindArr.includes(item.key);
                    return (
                        <button
                            key={item.key}
                            onClick={() => toggleKind(item.key)}
                            className="flex items-center gap-2 select-none group"
                        >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300
                      ${active ? "border-indigo-400 bg-indigo-500/30" : "border-white/40 bg-white/10"}`}
                            >
                                <svg
                                    viewBox="0 0 15 15"
                                    className={`w-4 h-4 fill-white transition-all duration-300 ${active ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                                >
                                    <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" />
                                </svg>
                            </div>
                            <span className="text-white/70 transition-all duration-300 group-hover:text-white">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};