import Header from "./components/Header";
import { LastUpdates } from "./components/LastUpdatesAnime";
import SeasonsAnime from "./components/SeasonsAnime";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-zinc-50 dark:bg-black text-black dark:text-white">
      <Header />
      <main
        className="
          w-full 
          mx-auto 
          pt-18 
          pb-10
        "
      >
        <SeasonsAnime />
        <LastUpdates />
      </main>
    </div>
  );
}
