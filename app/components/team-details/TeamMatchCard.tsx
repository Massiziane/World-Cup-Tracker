import { formatDate } from "@/src/lib/format-date";

export default function TeamMatchCard({
  match,
  teamId,
}: {
  match: any;
  teamId: number | string;
}) {
  const isHome = match.homeTeamId === teamId;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
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
}