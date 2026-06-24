import Link from "next/link";
import { Trophy } from "lucide-react";

export default function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-3 font-black">
        <Trophy className="text-emerald-400" />
        <span>WORLD CUP TRACKER</span>
      </Link>

      <div className="hidden gap-6 text-sm font-semibold text-slate-300 md:flex">
        <Link href="/matches" className="hover:text-emerald-400">
          Matches
        </Link>

        <Link href="/groups" className="hover:text-emerald-400">
          Groups
        </Link>

        <Link href="/bracket" className="hover:text-emerald-400">
          Bracket
        </Link>

        <Link href="/teams" className="hover:text-emerald-400">
          Teams
        </Link>
      </div>

      <div className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-300">
        LIVE DATA
      </div>
    </nav>
  );
}