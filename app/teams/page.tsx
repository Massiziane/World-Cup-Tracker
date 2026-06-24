import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { getTeams } from "@/src/services/teams";

export default async function TeamsPage() {
  const teams = await getTeams();

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
            <Users size={16} />
            Qualified Nations
          </div>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            World Cup Teams
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Explore every team synced from the World Cup database.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/teams/${team.tla ?? team.id}`}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.08]"
          >
            <div className="mb-5 flex h-20 items-center justify-center rounded-2xl bg-slate-950/70">
              {team.crest ? (
                <Image
                  src={team.crest}
                  alt={team.name}
                  width={58}
                  height={58}
                  className="max-h-14 w-auto object-contain"
                />
              ) : (
                <div className="text-2xl font-black text-slate-600">
                  {team.tla ?? "TBD"}
                </div>
              )}
            </div>

            <h2 className="text-lg font-black">{team.name}</h2>

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                {team.tla ?? "N/A"}
              </span>

              <span className="text-sm font-bold text-slate-500 group-hover:text-emerald-400">
                View team
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}