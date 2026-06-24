import TeamSide from "./TeamSide";

export default function ResultCard({
  match,
}: {
  match: any;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-400">
        {match.group ?? match.stage}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamSide team={match.homeTeam} />

        <div className="rounded-xl bg-white/10 px-4 py-2 text-xl font-black">
          {match.homeScore ?? "-"} -{" "}
          {match.awayScore ?? "-"}
        </div>

        <TeamSide team={match.awayTeam} reverse />
      </div>
    </div>
  );
}