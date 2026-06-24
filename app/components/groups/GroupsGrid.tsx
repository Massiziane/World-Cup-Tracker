import GroupCard from "./GroupCard";

export default function GroupsGrid({
  groups,
}: {
  groups: Record<string, any[]>;
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2">
      {Object.entries(groups).map(([group, teams]) => (
        <GroupCard key={group} group={group} teams={teams} />
      ))}
    </section>
  );
}