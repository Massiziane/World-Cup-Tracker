import HomeHero from "./components/home/HomeHero";
import HomeFeatures from "./components/home/HomeFeatures";
import HomeBracketPreview from "./components/home/HomeBracketPreview";
import HomeNavbar from "./components/home/HomeNavbar";
import MatchPanel from "./components/home/MatchPanel";
import MatchCard from "./components/home/MatchCard";
import ResultCard from "./components/home/ResultCard";

import {
  getFinishedMatches,
  getUpcomingMatches,
} from "@/src/services/matches";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const upcomingMatches = await getUpcomingMatches(5);
  const finishedMatches = await getFinishedMatches(4);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-4 z-50 mx-auto max-w-7xl px-6">
        <HomeNavbar />
      </div>

      <HomeHero />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-2">
        <MatchPanel title="Upcoming Matches" href="/matches">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </MatchPanel>

        <MatchPanel title="Latest Results" href="/matches">
          {finishedMatches.map((match) => (
            <ResultCard key={match.id} match={match} />
          ))}
        </MatchPanel>
      </section>

      <HomeBracketPreview />

      <HomeFeatures />
    </main>
  );
}