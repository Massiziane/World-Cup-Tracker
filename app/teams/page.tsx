import { getTeams } from "@/src/services/teams";

import HomeNavbar from "../components/home/HomeNavbar";
import TeamsHero from "../components/teams/TeamsHero";
import TeamsGrid from "../components/teams/TeamsGrid";

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <HomeNavbar />
      </div>

      <TeamsHero />

      <TeamsGrid teams={teams} />
    </main>
  );
}