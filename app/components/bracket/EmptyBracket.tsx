import { Trophy } from "lucide-react";

export default function EmptyBracket() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
      <Trophy className="mx-auto mb-4 text-emerald-400" size={48} />

      <h2 className="text-2xl font-black uppercase">
        Bracket not ready yet
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-slate-400">
        Knockout matches will appear here once they are available from the
        synced World Cup data.
      </p>
    </div>
  );
}