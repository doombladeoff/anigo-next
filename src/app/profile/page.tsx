import Stats from "@/components/pages/profile/Stats";
import { UserCard } from "@/components/pages/profile/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/firebase/server/getCurrentUser";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Профиль | AniGO",
    description: "Ваш профиль.",
};

export default async function ProfilePage() {
    const { user, userData } = await getCurrentUser();

    return (
        <div className="min-h-(--main-height) py-8 w-full flex justify-center">
            <div className="w-full max-w-7xl px-4 space-y-4">
                <UserCard userData={userData} />
                <section>
                    <Suspense fallback={
                        <div className="flex items-center space-x-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-7xl" />
                            </div>
                        </div>
                    }>
                        <Stats userId={user.uid} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
};
