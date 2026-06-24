import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import HomeNavbar from "./HomeNavbar";
import HomeStats from "./HomeStats";

const TROPHY_IMAGE = "/images/trophy.png";

export default function HomeHero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden">
      <Image
        src={TROPHY_IMAGE}
        alt="World Cup trophy"
        width={1350}
        height={1350}
        priority
        className="pointer-events-none absolute right-[-140px] top-1/2 z-0 hidden -translate-y-1/2 select-none object-contain opacity-95 drop-shadow-[0_0_80px_rgba(16,185,129,0.35)] lg:block"
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020617]/95 via-[#020617]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-[#020617] to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 px-6 py-10">

        <div className="max-w-3xl pt-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            <Sparkles size={16} />
            FIFA World Cup 2026
          </div>

          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            Follow the road to{" "}
            <span className="text-emerald-400">glory.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            A clean and free World Cup dashboard for matches,
            results, groups, teams, and the knockout bracket.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
            >
              Explore Matches
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/bracket"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-black backdrop-blur transition hover:bg-white/10"
            >
              View Bracket
            </Link>
          </div>

          <HomeStats />
        </div>
      </div>
    </section>
  );
}