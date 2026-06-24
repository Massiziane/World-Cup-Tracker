import StatCard from "./StatCard";

export default function HomeStats() {
  return (
    <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
      <StatCard label="Matches" value="104" />
      <StatCard label="Teams" value="48" />
      <StatCard label="Groups" value="12" />
    </div>
  );
}