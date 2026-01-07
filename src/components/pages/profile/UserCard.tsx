import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { dateFormats } from "@/utils/dateFormats";
import { Settings } from "lucide-react";
import { LogOutButton } from "./LogOutButton";

export const UserCard = ({ userData }: { userData: any }) => {
    const date = dateFormats(userData.lastLoginAt);
    return (
        <div className="border rounded-xl p-3 flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <Avatar style={{ width: 65, height: 65 }} className="bg-gray-500">
                    <AvatarImage src={userData.avatarURL} className="animate-fade" />
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-1 items-center">
                        <span className="text-[18px] font-medium">
                            {userData.displayName}
                        </span>
                        <Tooltip>
                            <TooltipTrigger className="opacity-45 hover:opacity-100">
                                <span className="text-[12px]">
                                    Последний вход: {date.short}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                {date.full}
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <span className="text-[12px] text-muted-foreground">
                        Уровень {userData.rang.level}
                    </span>
                </div>
            </div>
            <div className="space-x-2">
                <Button className="cursor-pointer">
                    <Settings />
                    Настройки
                </Button>
                <LogOutButton />
            </div>
        </div>
    );
}