import { Radio } from "lucide-react";

export default function LiveHero() {
  return (
    <>
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-black text-red-300">
        <Radio size={16} />
        Currently Playing
      </div>

      <h1 className="text-4xl font-black uppercase md:text-6xl">
        Live Matches
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        Matches currently marked as live from your synced World Cup database.
      </p>
    </>
  );
}