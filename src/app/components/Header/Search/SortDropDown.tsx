'use client'

interface SortOption {
    key: string;
    label: string;
}

interface Props {
    options: SortOption[];
    selected: string;
    onChange: (key: string) => void;
}

export const SortDropdown = ({ options, selected, onChange }: Props) => {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 w-40 focus:outline-none"
        >
            {options.map(option => (
                <option key={option.key} value={option.key} className="text-black">
                    {option.label}
                </option>
            ))}
        </select>
    );
};
