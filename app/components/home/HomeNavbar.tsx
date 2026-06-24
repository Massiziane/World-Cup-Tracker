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

        <Link
            href="/live"
            className="flex items-center gap-2 text-red-400 hover:text-red-300"
        >
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Live
        </Link>
        </div>
    </nav>
  );
}