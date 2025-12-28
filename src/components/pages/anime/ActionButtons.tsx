'use client';

import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext";
import { Bookmark, Check, Eye, Plus } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useIsMobile } from "@/hooks/use-mobile";

const action = [
    { lable: 'Смотрю', icon: <Eye /> },
    { lable: 'В закладки', icon: <Bookmark /> },
    { lable: 'Просмотренно', icon: <Check /> },
];

export const ActionButtons = () => {
    const isMobile = useIsMobile();
    const { user } = useUser();

    if (isMobile) return;

    return (
        <div className="flex flex-col lg:flex-row items-start xl:items-center justify-between gap-5">
            <div className="md:space-x-2 flex flex-col md:flex-row gap-5">
                {action.map((btn) => {
                    return (
                        <AlertDialog key={btn.lable}>
                            <AlertDialogTrigger asChild>
                                <Button disabled={!user} className="cursor-pointer">
                                    {btn.icon}
                                    {btn.lable}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Alert</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        В разработке.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Закрыть </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    );
                })}
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="cursor-pointer">
                        <Plus />
                        Добавить в коллекцию
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Alert</AlertDialogTitle>
                        <AlertDialogDescription>
                            В разработке.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Закрыть</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};