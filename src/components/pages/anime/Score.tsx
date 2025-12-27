import { StarIcon } from "lucide-react";

export const Score = ({ score }: { score: number | string }) => {
    if (!score) return;

    return (
        <div className="flex flex-row gap-2 items-center">
            <StarIcon
                size={42}
                fill="rgb(92, 220, 52)"
                color="rgb(92, 220, 52)"
            />
            <h1 className="font-semibold text-[rgb(92,220,52)]">
                {score}
            </h1>
        </div>
    );
};