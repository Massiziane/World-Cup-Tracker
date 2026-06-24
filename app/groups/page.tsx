import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Table2, Trophy } from "lucide-react";
import { getStandingsByGroup } from "@/src/services/standing";

function cleanGroupName(group: string) {
  return group.replace("GROUP_", "Group ");
}

export default async function GroupsPage() {
  const groups = await getStandingsByGroup();

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            <Table2 size={16} />
            Group Standings
          </div>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            World Cup Groups
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Live group tables calculated from finished matches stored in your
            database.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2">
        {Object.entries(groups).map(([group, teams]) => (
          <div
            key={group}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-6 py-5">
              <Trophy className="text-emerald-400" />
              <h2 className="text-xl font-black uppercase">
                {cleanGroupName(group)}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase text-slate-400">
                    <th className="px-6 py-4 text-left">Team</th>
                    <th className="px-3 py-4 text-center">P</th>
                    <th className="px-3 py-4 text-center">W</th>
                    <th className="px-3 py-4 text-center">D</th>
                    <th className="px-3 py-4 text-center">L</th>
                    <th className="px-3 py-4 text-center">GF</th>
                    <th className="px-3 py-4 text-center">GA</th>
                    <th className="px-3 py-4 text-center">GD</th>
                    <th className="px-6 py-4 text-center">Pts</th>
                  </tr>
                </thead>

                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={team.teamId}
                      className="border-b border-white/5 transition hover:bg-white/[0.04]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-sm font-black text-slate-500">
                            {index + 1}
                          </span>

                          {team.crest && (
                            <Image
                              src={team.crest}
                              alt={team.name}
                              width={28}
                              height={28}
                              className="rounded object-contain"
                            />
                          )}

                          <div>
                            <p className="font-black">{team.shortName}</p>
                            <p className="text-xs font-bold text-slate-500">
                              {team.tla}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-center">{team.played}</td>
                      <td className="px-3 py-4 text-center">{team.wins}</td>
                      <td className="px-3 py-4 text-center">{team.draws}</td>
                      <td className="px-3 py-4 text-center">{team.losses}</td>
                      <td className="px-3 py-4 text-center">{team.goalsFor}</td>
                      <td className="px-3 py-4 text-center">
                        {team.goalsAgainst}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {team.goalDifference > 0
                          ? `+${team.goalDifference}`
                          : team.goalDifference}
                      </td>
                      <td className="px-6 py-4 text-center text-lg font-black text-emerald-400">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}