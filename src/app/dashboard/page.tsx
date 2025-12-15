'use client';

import { notFound } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/AnimePage/Loader";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

const fetchUser = async (id: string) => {
    const res = await fetch(`/api/user/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
};

export default function DashboardPage() {
    const { user } = useUser();
    const [userd, setUser] = useState<any>(null);

    useEffect(() => {
        if (user)
            fetchUser(user?.uid)
                .then((r) => setUser(r))
                .catch(console.error);
    }, [user]);

    if (!user) notFound();
    if (!userd) return (
        <div className="flex justify-center py-10">
            <Loader />
        </div>
    );

    const logout = async () => {
        await signOut(auth);
        await fetch("/api/auth/logout", { method: "POST" });
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen">
            <Button onClick={logout} className="px-4 py-2 bg-red-500 rounded">Выйти</Button>
        </div>
    );
}
