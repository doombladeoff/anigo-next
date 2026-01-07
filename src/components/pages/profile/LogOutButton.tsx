'use client';

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/firebase/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogOutButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => logout().then(() => router.replace("/auth/login"))} variant="destructive" className="cursor-pointer">
            <LogOut />
            Выйти
        </Button>
    );
}