import Header from "./components/Header";
import { LastUpdates } from "./components/LastUpdatesAnime";
import SeasonsAnime from "./components/SeasonsAnime";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-black dark:text-white">
      <Header />
      <main
        className="
          w-full
          pt-20
          pb-16
        "
      >
        <div className="mb-12">
          <SeasonsAnime />
        </div>

        <div className="mb-10">
          <LastUpdates />
        </div>
      </main>
    </div>
  );
}
