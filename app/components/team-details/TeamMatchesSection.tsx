import TeamMatchCard from "./TeamMatchCard";

export default function TeamMatchesSection({
  matches,
  teamId,
}: {
  matches: any[];
  teamId: number | string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-5 text-2xl font-black uppercase">
        Matches
      </h2>

      <div className="space-y-3">
        {matches.map((match) => (
          <TeamMatchCard
            key={match.id}
            match={match}
            teamId={teamId}
          />
        ))}
      </div>
    </section>
  );
}