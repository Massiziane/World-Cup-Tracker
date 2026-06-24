import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { getTeamByTla } from "@/src/services/teams";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ tla: string }>;
}) {
  const { tla } = await params;
  const team = await getTeamByTla(tla);

  if (!team) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
          <h1 className="text-3xl font-black">Team not found</h1>
          <Link
            href="/teams"
            className="mt-6 inline-flex rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950"
          >
            Back to teams
          </Link>
        </div>
      </main>
    );
  }

  const matches = [...team.homeMatches, ...team.awayMatches].sort(
    (a, b) => a.utcDate.getTime() - b.utcDate.getTime()
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/teams"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            Back to teams
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05]">
              {team.crest ? (
                <Image
                  src={team.crest}
                  alt={team.name}
                  width={78}
                  height={78}
                  className="max-h-20 w-auto object-contain"
                />
              ) : (
                <Shield size={48} className="text-emerald-400" />
              )}
            </div>

            <div>
              <p className="mb-2 text-sm font-black uppercase text-emerald-400">
                {team.tla ?? "World Cup Team"}
              </p>

              <h1 className="text-4xl font-black uppercase md:text-6xl">
                {team.name}
              </h1>

              <p className="mt-3 text-slate-400">
                {matches.length} match{matches.length === 1 ? "" : "es"} in the
                World Cup database.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-5 text-2xl font-black uppercase">Matches</h2>

        <div className="space-y-3">
          {matches.map((match) => {
            const isHome = match.homeTeamId === team.id;

            return (
              <div
                key={match.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    {formatDate(match.utcDate)}
                  </p>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                    {match.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      {isHome ? "Home" : "Away"}
                    </p>
                    <p className="font-black">
                      {match.stage ?? match.group ?? "World Cup"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 px-4 py-2 text-xl font-black">
                    {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}