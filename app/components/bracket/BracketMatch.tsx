import BracketTeamRow from "./BracketTeamRow";
import MatchTime from "../MatchTime";

export default function BracketMatch({
  match,
}: {
  match: any;
}) {
  const homeWon = match.winner === "HOME_TEAM";
  const awayWon = match.winner === "AWAY_TEAM";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-500">
        <MatchTime date={match.utcDate} />
      </p>

      <BracketTeamRow
        team={match.homeTeam}
        score={match.homeScore}
        isWinner={homeWon}
      />

      <div className="my-3 border-t border-white/10" />

      <BracketTeamRow
        team={match.awayTeam}
        score={match.awayScore}
        isWinner={awayWon}
      />

      <div className="mt-4 flex justify-between text-xs font-bold uppercase text-slate-500">
        <span>{match.status}</span>
        <span>{match.group ?? match.stage}</span>
      </div>
    </div>
  );
}