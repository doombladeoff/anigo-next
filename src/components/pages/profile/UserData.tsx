'use client';

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Loader } from "@/components/AnimePage/Loader";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const UserData = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            return;
        };

        console.log('Fetch User ', user?.uid);

        fetch(`/api/user/${user?.uid}`)
            .then((res) => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader />
            </div>
        );
    }

    if (!userData) notFound();

    const logout = async () => {
        await signOut(auth);
        await fetch("/api/auth/logout", { method: "POST" });
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen gap-4">
            <h1 className="text-xl font-bold">
                Привет, {userData?.name ?? user?.displayName}
            </h1>

            <Button onClick={logout} variant="destructive">
                Выйти
            </Button>
        </div>
    );
}