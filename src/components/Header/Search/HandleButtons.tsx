import { Button } from "@/components/ui/button"

export const HandleButtons = ({ onClear, onApply }: { onClear: () => void, onApply: () => void }) => {
    return (
        <div className="flex gap-4 mt-4">
            <Button variant="outline" className="flex-1" onClick={onClear}>
                Сбросить
            </Button>
            <Button className="flex-1" onClick={onApply}>
                Применить
            </Button>
        </div>
    )
}