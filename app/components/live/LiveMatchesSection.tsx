import EmptyLiveState from "./EmptyLiveState";
import LiveMatchCard from "./LiveMatchCard";

export default function LiveMatchesSection({
  liveMatches,
}: {
  liveMatches: any[];
}) {
  return (
    <section className="mt-10 grid gap-4">
      {liveMatches.length === 0 ? (
        <EmptyLiveState />
      ) : (
        liveMatches.map((match) => (
          <LiveMatchCard key={match.id} match={match} />
        ))
      )}
    </section>
  );
}