'use client';

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Loader } from "@/components/Loader";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const UserData = () => {
    const router = useRouter();
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

    // if (!userData) notFound();

    const logout = async () => {
        await signOut(auth).then(() => {
            console.log("User signed out from Firebase");
        }).catch((err) => {
            console.error("Error signing out:", err);
        });
        await fetch("/api/auth/logout", { method: "POST" })
            .then(() => {
                console.log("Logged out");
                router.replace("/auth/login");
            });
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen gap-4">
            <h1 className="text-xl font-bold">
                Привет, {userData?.name || userData?.displayName || user?.name || user?.displayName}
            </h1>

            <Button onClick={logout} variant="destructive">
                Выйти
            </Button>
        </div>
    );
}