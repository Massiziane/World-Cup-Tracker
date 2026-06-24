import MatchTeam from "./MatchTeam";
import { formatDate } from "@/src/lib/format-date";

export default function MatchCard({
  match,
  isResult = false,
}: {
  match: any;
  isResult?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40 hover:bg-slate-900/80">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase text-slate-400">
          {formatDate(match.utcDate)}
        </p>

        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300">
          {match.group ?? match.stage ?? "World Cup"}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <MatchTeam team={match.homeTeam} />

        <div className="rounded-xl bg-white/10 px-4 py-2 text-center font-black">
          {isResult ? (
            <span className="text-xl">
              {match.homeScore ?? "-"} -{" "}
              {match.awayScore ?? "-"}
            </span>
          ) : (
            <span className="text-sm text-slate-300">
              VS
            </span>
          )}
        </div>

        <MatchTeam
          team={match.awayTeam}
          reverse
        />
      </div>
    </div>
  );
}