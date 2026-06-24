import LiveTeam from "./LiveTeam";

export default function LiveMatchCard({
  match,
}: {
  match: any;
}) {
  return (
    <div className="rounded-3xl border border-red-400/20 bg-white/[0.04] p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black uppercase">
          Live
        </span>

        <span className="text-sm font-bold text-slate-400">
          {match.group ?? match.stage}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <LiveTeam team={match.homeTeam} />

        <div className="rounded-2xl bg-white/10 px-6 py-3 text-3xl font-black">
          {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
        </div>

        <LiveTeam team={match.awayTeam} reverse />
      </div>
    </div>
  );
}