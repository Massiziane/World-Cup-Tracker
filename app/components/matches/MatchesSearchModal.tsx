"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

type Match = {
  id: string | number;
  status: string;
  group?: string | null;
  stage?: string | null;
  utcDate: Date | string;
  homeScore?: number | null;
  awayScore?: number | null;
  homeTeam?: {
    name?: string | null;
    shortName?: string | null;
    tla?: string | null;
    crest?: string | null;
  } | null;
  awayTeam?: {
    name?: string | null;
    shortName?: string | null;
    tla?: string | null;
    crest?: string | null;
  } | null;
};

export default function MatchesSearchModal({ matches }: { matches: Match[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredMatches = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return matches.slice(0, 12);

    return matches.filter((match) => {
      const searchable = [
        match.status,
        match.group,
        match.stage,
        match.homeTeam?.name,
        match.homeTeam?.shortName,
        match.homeTeam?.tla,
        match.awayTeam?.name,
        match.awayTeam?.shortName,
        match.awayTeam?.tla,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(value);
    });
  }, [matches, query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:border-emerald-400/50 hover:bg-white/[0.08]"
      >
        <Search size={18} />
        Search matches
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 py-20 backdrop-blur">
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="text-xl font-black uppercase">Search Matches</h2>
                <p className="text-sm text-slate-400">
                  Search by team, group, stage, or status.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/10 p-2 text-slate-300 transition hover:bg-white/20 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
                <Search size={18} className="text-emerald-400" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Canada, Brazil, Group B, finished..."
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="max-h-[520px] space-y-3 overflow-y-auto p-5">
              {filteredMatches.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                  <p className="font-black">No matches found</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Try another team, group, or status.
                  </p>
                </div>
              ) : (
                filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300">
                        {match.group ?? match.stage ?? "World Cup"}
                      </span>

                      <span className="text-xs font-bold uppercase text-slate-500">
                        {match.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                      <Team team={match.homeTeam} />

                      <div className="rounded-xl bg-white/10 px-4 py-2 text-center font-black">
                        {match.status === "FINISHED"
                          ? `${match.homeScore ?? "-"} - ${
                              match.awayScore ?? "-"
                            }`
                          : "VS"}
                      </div>

                      <Team team={match.awayTeam} reverse />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Team({
  team,
  reverse = false,
}: {
  team: Match["homeTeam"];
  reverse?: boolean;
}) {
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
          width={30}
          height={30}
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
          width={30}
          height={30}
          className="rounded object-contain"
        />
      )}
    </div>
  );
}