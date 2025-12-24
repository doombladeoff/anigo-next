import { getRandomAnime } from "@/app/api/getRandomAnime";
import { useRouter } from "next/navigation";
import { Dice5 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useIsMobile } from "@/hooks/useIsDesktop";

export const RandomAnimeButton = ({ onCloseMenu }: { onCloseMenu?: (v: boolean) => void }) => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleRandomAnime = async () => {
        const r = await getRandomAnime();
        onCloseMenu && onCloseMenu(false);
        router.push(`/anime/${r.id}`);
    };

    if (isMobile) {
        return (
            <Button variant={'outline'} className="gap-4" onClick={handleRandomAnime}>
                <span className="flex flex-row items-center gap-2 p-4">
                    <Dice5 className="size-6" />
                    Случайный релиз
                </span>
            </Button>
        );
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'link'} onClick={handleRandomAnime} className="cursor-pointer"
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85" }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}>
                    <Dice5 className="size-6" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-sm">Случайный релиз</p>
            </TooltipContent>
        </Tooltip>
    );
};