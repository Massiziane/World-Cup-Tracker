import { Table2 } from "lucide-react";

export default function GroupsHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
          <Table2 size={16} />
          Group Standings
        </div>

        <h1 className="text-4xl font-black uppercase md:text-6xl">
          World Cup Groups
        </h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Live group tables calculated from completed World Cup matches.
        </p>
      </div>
    </section>
  );
}