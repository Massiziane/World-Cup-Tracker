type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
      <p className="text-3xl font-black text-white">{value}</p>

      <p className="mt-1 text-sm font-semibold uppercase text-slate-400">
        {label}
      </p>
    </div>
  );
}