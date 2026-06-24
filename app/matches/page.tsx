import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Trophy, ArrowLeft } from "lucide-react";
import { getMatches } from "@/src/services/matches";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function MatchesPage() {
  const matches = await getMatches();

  const upcoming = matches.filter((match) =>
    ["TIMED", "SCHEDULED"].includes(match.status)
  );

  const finished = matches.filter((match) => match.status === "FINISHED");

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

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <CalendarDays size={16} />
                World Cup Schedule
              </div>

              <h1 className="text-4xl font-black uppercase md:text-6xl">
                Matches
              </h1>

              <p className="mt-4 max-w-2xl text-slate-300">
                Follow every World Cup fixture, upcoming game, and final result
                from the database.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="Total" value={matches.length} />
              <Stat label="Upcoming" value={upcoming.length} />
              <Stat label="Finished" value={finished.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr]">
        <MatchSection title="Upcoming Matches" matches={upcoming} />
        <MatchSection title="Finished Matches" matches={finished} isResult />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
      <p className="text-2xl font-black text-emerald-400">{value}</p>
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    </div>
  );
}

function MatchSection({
  title,
  matches,
  isResult = false,
}: {
  title: string;
  matches: any[];
  isResult?: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="text-emerald-400" />
        <h2 className="text-xl font-black uppercase">{title}</h2>
      </div>

      <div className="max-h-[900px] space-y-3 overflow-y-auto pr-2">
        {matches.map((match) => (
          <div
            key={match.id}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40 hover:bg-slate-900/80"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase text-slate-400">
                {formatDate(match.utcDate)}
              </p>

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300">
                {match.group ?? match.stage ?? "World Cup"}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <Team team={match.homeTeam} />

              <div className="rounded-xl bg-white/10 px-4 py-2 text-center font-black">
                {isResult ? (
                  <span className="text-xl">
                    {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
                  </span>
                ) : (
                  <span className="text-sm text-slate-300">VS</span>
                )}
              </div>

              <Team team={match.awayTeam} reverse />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Team({ team, reverse = false }: { team: any; reverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        reverse ? "justify-end text-right" : ""
      }`}
    >
      {!reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={32}
          height={32}
          className="rounded object-contain"
        />
      )}

      <div>
        <p className="font-black">{team?.shortName ?? team?.name ?? "TBD"}</p>
        <p className="text-xs font-bold text-slate-500">{team?.tla ?? ""}</p>
      </div>

      {reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={32}
          height={32}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}