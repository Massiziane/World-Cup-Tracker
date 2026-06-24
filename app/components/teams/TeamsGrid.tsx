import TeamCard from "./TeamCard";

export default function TeamsGrid({
  teams,
}: {
  teams: any[];
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </section>
  );
}