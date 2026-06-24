import { getLiveMatches } from "@/src/services/live";

import HomeNavbar from "../components/home/HomeNavbar";
import LiveHero from "../components/live/LiveHero";
import LiveMatchesSection from "../components/live/LiveMatchesSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function LivePage() {
  const liveMatches = await getLiveMatches();

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <HomeNavbar />

        <div className="mt-10">
          <LiveHero />

          <LiveMatchesSection liveMatches={liveMatches} />
        </div>
      </div>
    </main>
  );
}