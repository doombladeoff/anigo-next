import { LastUpdates } from "../components/LastUpdatesAnime";
import SeasonsAnime from "../components/SeasonsAnime";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="w-full pt-10">
        <div className="space-y-10">
          <SeasonsAnime />
          <LastUpdates />
        </div>
      </main>
    </div>
  );
}
