import { AnimeStatusBar } from "./AnimatedStatusBar";
import admin from "@/lib/firebase-admin";

type StatusStats = {
    completed: number;
    planned: number;
    watching: number;
    dropped: number;
    total: number;
};

export default async function Stats({ userId }: { userId: string }) {
    async function getAnimeStats(userId: string): Promise<StatusStats> {
        const snapshot = await admin
            .firestore()
            .collection("user-favorites")
            .doc(userId)
            .collection("favorites")
            .get();

        const stats: StatusStats = {
            completed: 0,
            planned: 0,
            watching: 0,
            dropped: 0,
            total: snapshot.size,
        };

        snapshot.docs.forEach((doc) => {
            const status = doc.data().status;
            if (status in stats) {
                // @ts-ignore
                stats[status]++;
            }
        });
        return stats;
    }

    const stats = await getAnimeStats(userId);
    return (
        <div className="space-y-4">
            <span className="text-[28px] font-medium">Статистика</span>
            <div className="text-[22px] font-medium">Аниме</div>
            {/* <span>
                Время за просмотром: 2 м. 61 д. 9 ч.
            </span> */}
            <AnimeStatusBar stats={stats} />
        </div>
    );
}