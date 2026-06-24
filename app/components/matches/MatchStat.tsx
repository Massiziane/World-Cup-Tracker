type MatchStatProps = {
  label: string;
  value: number;
};

export default function MatchStat({
  label,
  value,
}: MatchStatProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
      <p className="text-2xl font-black text-emerald-400">
        {value}
      </p>

      <p className="text-xs font-bold uppercase text-slate-400">
        {label}
      </p>
    </div>
  );
}