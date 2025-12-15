import { LastUpdates, NowOnScreensAnime, SeasonsAnime, TopRatedAnime } from "@/components/HomeAnimes";
import SeasonsAnimeSkeleton from "@/components/HomeAnimes/SeasonsAnime/SeasonsSkeleton";
import { SkeletonPlaceholder } from "@/components/HomeAnimes/SkeletonPlaceholder";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full">
      <main className="w-full py-10">
        <div className="space-y-10">
          <Suspense fallback={<SeasonsAnimeSkeleton />}>
            <SeasonsAnime />
          </Suspense>
          <Suspense fallback={<SkeletonPlaceholder title="Последние обновления" num={15} />}>
            <LastUpdates />
          </Suspense>
          <Suspense fallback={<SkeletonPlaceholder title="Сейчас на экранах" num={15} />}>
            <NowOnScreensAnime />
          </Suspense>
          <Suspense fallback={<SkeletonPlaceholder title="Топ рейтинга" num={15} />}>
            <TopRatedAnime />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
