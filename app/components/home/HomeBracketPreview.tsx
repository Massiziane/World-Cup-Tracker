import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/images/hero.png";

export default function HomeBracketPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 pb-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-slate-950 p-8 shadow-2xl">
        <Image
          src={HERO_IMAGE}
          alt="World Cup stadium"
          fill
          className="pointer-events-none object-cover opacity-85"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/55 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#020617]/50" />

        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase">
            Road to the Final
          </h2>

          <p className="mt-2 max-w-xl text-slate-300">
            From the group stage to the final whistle,
            follow the entire knockout journey.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {[
              "Round of 32",
              "Round of 16",
              "Quarter Finals",
              "Semi Finals",
              "Final",
            ].map((round) => (
              <div
                key={round}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm"
              >
                <p className="text-center text-xs font-black uppercase text-emerald-300">
                  {round}
                </p>

                <div className="mt-4 space-y-3">
                  <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                  <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/bracket"
            className="mt-8 inline-flex items-center gap-2 font-black text-emerald-400"
          >
            See full bracket
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}