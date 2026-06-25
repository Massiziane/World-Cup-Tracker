import { getMatches } from "@/src/services/matches";

import HomeNavbar from "../components/home/HomeNavbar";
import MatchSection from "../components/matches/MatchSection";
import MatchesStats from "../components/matches/MatchesStats";

import { CalendarDays } from "lucide-react";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function MatchesPage() {
  const matches = await getMatches();

  const upcoming = matches.filter((match) =>
    ["TIMED", "SCHEDULED"].includes(match.status)
  );

  const finished = matches.filter(
    (match) => match.status === "FINISHED"
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-4 z-50 mx-auto max-w-7xl px-6">
        <HomeNavbar />
      </div>

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <CalendarDays size={16} />
                World Cup Schedule
              </div>

              <h1 className="text-4xl font-black uppercase md:text-6xl">
                Matches
              </h1>

              <p className="mt-4 max-w-2xl text-slate-300">
                Follow every World Cup fixture, upcoming game,
                and final result from the database.
              </p>
            </div>

            <MatchesStats
              total={matches.length}
              upcoming={upcoming.length}
              finished={finished.length}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-2">
        <MatchSection
          title="Upcoming Matches"
          matches={upcoming}
        />

        <MatchSection
          title="Finished Matches"
          matches={finished}
          isResult
        />
      </section>
    </main>
  );
}