import { getBracketMatches } from "@/src/services/bracket";

import HomeNavbar from "../components/home/HomeNavbar";
import BracketHero from "../components/bracket/BracketHero";
import BracketGrid from "../components/bracket/BracketGrid";

const ROUND_ORDER = [
  "LAST_32",
  "ROUND_OF_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL",
];
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BracketPage() {
  const matches = await getBracketMatches();

  const groupedMatches = ROUND_ORDER.map((stage) => ({
    stage,
    matches: matches.filter((match) => match.stage === stage),
  })).filter((round) => round.matches.length > 0);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <HomeNavbar />
      </div>

      <BracketHero />

      <BracketGrid groupedMatches={groupedMatches} />
    </main>
  );
}