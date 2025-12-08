import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const StatusFilter = ({ statusArr, toggleStatus, activeArr }: { statusArr: any[], toggleStatus: (v: any) => void, activeArr: any[] }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-2">Статус</h3>
            <div className="gap-5 flex-wrap grid grid-cols-2">
                {statusArr.map((item) => {
                    const active = activeArr.includes(item.key);
                    return (
                        <div
                            className="flex items-center space-x-2"
                            key={item.key}
                        >
                            <Checkbox id={`status-${item.key}`} checked={active} onCheckedChange={() => { toggleStatus(item.key) }} />
                            <Label htmlFor={`status-${item.key}`}>{item.label}</Label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};