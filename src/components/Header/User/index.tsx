'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export const UserAuth = () => {
    const { user, loading } = useUser();

    if (loading) return null;

    if (!user) return (
        <Link href={'/auth'}>
            <Button variant='default' className="cursor-pointer">Войти</Button>
        </Link>
    );

    return (
        <Link href={'/profile'}>
            <Avatar>
                {(user.avatarURL || user.photoURL || "") ? (
                    <AvatarImage src={user.avatarURL || user.photoURL || ""} />
                ) : (
                    <AvatarFallback>U</AvatarFallback>
                )}
            </Avatar>
        </Link>
    );
};