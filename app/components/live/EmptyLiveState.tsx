export default function EmptyLiveState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
      <h2 className="text-2xl font-black">
        No match currently playing
      </h2>

      <p className="mt-3 text-slate-400">
        Check back later or sync the latest World Cup data.
      </p>
    </div>
  );
}