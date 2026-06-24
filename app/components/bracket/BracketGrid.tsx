import BracketRound from "./BracketRound";
import EmptyBracket from "./EmptyBracket";

export default function BracketGrid({
  groupedMatches,
}: {
  groupedMatches: {
    stage: string;
    matches: any[];
  }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {groupedMatches.length === 0 ? (
        <EmptyBracket />
      ) : (
        <div className="overflow-x-auto pb-6">
          <div
            className="grid min-w-[1200px] gap-5"
            style={{
              gridTemplateColumns: `repeat(${groupedMatches.length}, minmax(260px, 1fr))`,
            }}
          >
            {groupedMatches.map((round) => (
              <BracketRound
                key={round.stage}
                stage={round.stage}
                matches={round.matches}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}