import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  GitBranch,
  Sparkles,
  Table2,
  Trophy,
  Users,
} from "lucide-react";
import {
  getFinishedMatches,
  getUpcomingMatches,
} from "@/src/services/matches";

const HERO_IMAGE =
  "/images/hero.png";

const TROPHY_IMAGE =
  "/images/trophy.png";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function HomePage() {
  const upcomingMatches = await getUpcomingMatches(5);
  const finishedMatches = await getFinishedMatches(4);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative min-h-[760px] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="World Cup stadium"
          fill
          priority
          className="object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#020617]/80 to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.35),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-6 py-10">
          <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl">
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

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <Sparkles size={16} />
                FIFA World Cup 2026
              </div>

              <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
                Follow the road to{" "}
                <span className="text-emerald-400">glory.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                A clean and free World Cup dashboard for matches, results,
                groups, teams, and the knockout bracket.
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

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                <StatCard label="Matches" value="104" />
                <StatCard label="Teams" value="48" />
                <StatCard label="Groups" value="12" />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <Image
                  src={TROPHY_IMAGE}
                  alt="World Cup trophy"
                  width={700}
                  height={700}
                  className="aspect-square rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-24 grid max-w-7xl gap-4 px-6 pb-8 md:grid-cols-4">
        <FeatureCard
          title="Matches"
          text="Upcoming fixtures and final scores."
          href="/matches"
          icon={<CalendarDays />}
        />
        <FeatureCard
          title="Groups"
          text="Follow every group table."
          href="/groups"
          icon={<Table2 />}
        />
        <FeatureCard
          title="Bracket"
          text="Track the road to the final."
          href="/bracket"
          icon={<GitBranch />}
        />
        <FeatureCard
          title="Teams"
          text="Explore every nation."
          href="/teams"
          icon={<Users />}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-2">
        <MatchPanel title="Upcoming Matches" href="/matches">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </MatchPanel>

        <MatchPanel title="Latest Results" href="/matches">
          {finishedMatches.map((match) => (
            <ResultCard key={match.id} match={match} />
          ))}
        </MatchPanel>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-8 shadow-2xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-black uppercase">Road to the Final</h2>
            <p className="mt-2 max-w-xl text-slate-300">
              From the group stage to the final whistle, follow the entire
              knockout journey.
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
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
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
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold uppercase text-slate-400">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  text,
  href,
  icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.09]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
        {icon}
      </div>
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
    </Link>
  );
}

function MatchPanel({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase">{title}</h2>
        <Link href={href} className="text-sm font-bold text-emerald-400">
          View all
        </Link>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MatchCard({ match }: { match: any }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-400">
        {formatDate(match.utcDate)} · {match.group ?? match.stage}
      </p>

      <div className="flex items-center justify-between gap-4">
        <TeamSide team={match.homeTeam} />
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">
          VS
        </span>
        <TeamSide team={match.awayTeam} reverse />
      </div>
    </div>
  );
}

function ResultCard({ match }: { match: any }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-emerald-400/40">
      <p className="mb-3 text-xs font-bold uppercase text-slate-400">
        {match.group ?? match.stage}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamSide team={match.homeTeam} />
        <div className="rounded-xl bg-white/10 px-4 py-2 text-xl font-black">
          {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
        </div>
        <TeamSide team={match.awayTeam} reverse />
      </div>
    </div>
  );
}

function TeamSide({ team, reverse = false }: { team: any; reverse?: boolean }) {
  return (
    <div
      className={`flex flex-1 items-center gap-3 ${
        reverse ? "justify-end" : ""
      }`}
    >
      {!reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={30}
          height={30}
          className="rounded object-contain"
        />
      )}

      <span className="font-bold">{team?.shortName ?? team?.name ?? "TBD"}</span>

      {reverse && team?.crest && (
        <Image
          src={team.crest}
          alt={team.name ?? "Team crest"}
          width={30}
          height={30}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}