import { LastUpdates, NowOnScreensAnime, SeasonsAnime, TopRatedAnime } from "@/components/HomeAnimes";

export default function Home() {
  return (
    <div className="w-full">
      <main className="w-full py-10">
        <div className="space-y-10">
          <SeasonsAnime />
          <LastUpdates />
          <NowOnScreensAnime />
          <TopRatedAnime />
        </div>
      </main>
    </div>
  );
}
