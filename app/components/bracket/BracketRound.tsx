import BracketMatch from "./BracketMatch";

function formatStage(stage?: string | null) {
  if (!stage) return "Knockout";

  return stage
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BracketRound({
  stage,
  matches,
}: {
  stage: string;
  matches: any[];
}) {
  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center">
        <h2 className="text-sm font-black uppercase text-emerald-300">
          {formatStage(stage)}
        </h2>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <BracketMatch key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}