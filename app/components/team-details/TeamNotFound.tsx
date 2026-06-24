import Link from "next/link";

export default function TeamNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
        <h1 className="text-3xl font-black">Team not found</h1>

        <Link
          href="/teams"
          className="mt-6 inline-flex rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950"
        >
          Back to teams
        </Link>
      </div>
    </main>
  );
}