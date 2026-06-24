import TeamSide from "./TeamSide";
import { formatDate } from "@/src/lib/format-date";

export default function MatchCard({
  match,
}: {
  match: any;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-400">
        {formatDate(match.utcDate)} ·{" "}
        {match.group ?? match.stage}
      </p>

      <div className="flex items-center justify-between gap-4">
        <TeamSide team={match.homeTeam} />

        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">
          VS
        </span>

        <TeamSide team={match.awayTeam} reverse />
      </div>
    </div>
  );
}