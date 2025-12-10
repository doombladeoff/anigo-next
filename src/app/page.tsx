import { TopRatedAnime } from "@/components/TopRatedAnime";
import { LastUpdates } from "../components/LastUpdatesAnime";
import SeasonsAnime from "../components/SeasonsAnime";
import { NowOnScreensAnime } from "@/components/NowOnScreens";

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
