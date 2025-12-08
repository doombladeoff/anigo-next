import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const KindFilter = ({ kindArr, toggleKind, activeKindArr }: { kindArr: any[], toggleKind: (v: any) => void, activeKindArr: any[] }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-2">Тип</h3>
            <div className="gap-5 flex-wrap grid grid-cols-2">
                {kindArr.map((item) => {
                    const active = activeKindArr.includes(item.key);
                    return (
                        <div
                            className="flex items-center space-x-2"
                            key={item.key}
                        >
                            <Checkbox id={`kind-${item.key}`} checked={active} onCheckedChange={() => { toggleKind(item.key) }} />
                            <Label htmlFor={`kind-${item.key}`}>{item.label}</Label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};