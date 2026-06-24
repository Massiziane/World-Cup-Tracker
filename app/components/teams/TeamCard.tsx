import Image from "next/image";
import Link from "next/link";

export default function TeamCard({
  team,
}: {
  team: any;
}) {
  return (
    <Link
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

      <h2 className="text-lg font-black">
        {team.name}
      </h2>

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
          {team.tla ?? "N/A"}
        </span>

        <span className="text-sm font-bold text-slate-500 group-hover:text-emerald-400">
          View team
        </span>
      </div>
    </Link>
  );
}