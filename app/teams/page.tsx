import { getTeams } from "@/src/services/teams";

import HomeNavbar from "../components/home/HomeNavbar";
import TeamsHero from "../components/teams/TeamsHero";
import TeamsGrid from "../components/teams/TeamsGrid";

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-4 z-50 mx-auto max-w-7xl px-6">
        <HomeNavbar />
      </div>

      <TeamsHero teams={teams} />

      <TeamsGrid teams={teams} />
    </main>
  );
}