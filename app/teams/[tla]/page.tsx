import { getTeamByTla } from "@/src/services/teams";

import TeamNotFound from "@/app/components/team-details/TeamNotFound";
import TeamDetailsHero from "@/app/components/team-details/TeamDetailsHero";
import TeamMatchesSection from "@/app/components/team-details/TeamMatchesSection";
import HomeNavbar from "@/app/components/home/HomeNavbar";

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ tla: string }>;
}) {
  const { tla } = await params;
  const team = await getTeamByTla(tla);

  if (!team) {
    return <TeamNotFound />;
  }

  const matches = [...team.homeMatches, ...team.awayMatches].sort(
    (a, b) => a.utcDate.getTime() - b.utcDate.getTime()
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-4 z-50 mx-auto max-w-7xl px-6">
          <HomeNavbar />
      </div>
      <TeamDetailsHero
        team={team}
        matchesCount={matches.length}
      />

      <TeamMatchesSection
        matches={matches}
        teamId={team.id}
      />
    </main>
  );
}