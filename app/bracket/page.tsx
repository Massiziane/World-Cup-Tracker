import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GitBranch, Trophy } from "lucide-react";
import { getBracketMatches } from "@/src/services/bracket";

const ROUND_ORDER = [
  "LAST_32",
  "ROUND_OF_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL",
];

function formatStage(stage?: string | null) {
  if (!stage) return "Knockout";

  return stage
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function BracketPage() {
  const matches = await getBracketMatches();

  const groupedMatches = ROUND_ORDER.map((stage) => ({
    stage,
    matches: matches.filter((match) => match.stage === stage),
  })).filter((round) => round.matches.length > 0);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-400"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            <GitBranch size={16} />
            Knockout Stage
          </div>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            World Cup Bracket
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Follow the road from the knockout rounds to the final.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {groupedMatches.length === 0 ? (
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
        ) : (
          <div className="overflow-x-auto pb-6">
            <div
              className="grid min-w-[1200px] gap-5"
              style={{
                gridTemplateColumns: `repeat(${groupedMatches.length}, minmax(260px, 1fr))`,
              }}
            >
              {groupedMatches.map((round) => (
                <div key={round.stage} className="space-y-4">
                  <div className="sticky top-0 z-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center">
                    <h2 className="text-sm font-black uppercase text-emerald-300">
                      {formatStage(round.stage)}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {round.matches.map((match) => (
                      <BracketMatch key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function BracketMatch({ match }: { match: any }) {
  const homeWon = match.winner === "HOME_TEAM";
  const awayWon = match.winner === "AWAY_TEAM";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-500">
        {formatDate(match.utcDate)}
      </p>

      <TeamRow
        team={match.homeTeam}
        score={match.homeScore}
        isWinner={homeWon}
      />

      <div className="my-3 border-t border-white/10" />

      <TeamRow
        team={match.awayTeam}
        score={match.awayScore}
        isWinner={awayWon}
      />

      <div className="mt-4 flex justify-between text-xs font-bold uppercase text-slate-500">
        <span>{match.status}</span>
        <span>{match.group ?? match.stage}</span>
      </div>
    </div>
  );
}

function TeamRow({
  team,
  score,
  isWinner,
}: {
  team: any;
  score?: number | null;
  isWinner?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 ${
        isWinner ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-3">
        {team?.crest && (
          <Image
            src={team.crest}
            alt={team.name ?? "Team crest"}
            width={28}
            height={28}
            className="rounded object-contain"
          />
        )}

        <div>
          <p className="font-black">{team?.shortName ?? team?.name ?? "TBD"}</p>
          <p className="text-xs font-bold text-slate-500">{team?.tla ?? ""}</p>
        </div>
      </div>

      <span className="text-xl font-black">{score ?? "-"}</span>
    </div>
  );
}