import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function TeamDetailsHero({
  team,
  matchesCount,
}: {
  team: any;
  matchesCount: number;
}) {
  return (
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
              {matchesCount} match{matchesCount === 1 ? "" : "es"} in the World
              Cup database.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}