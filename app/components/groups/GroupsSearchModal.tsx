"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

type TeamStanding = {
  teamId: string;
  name: string;
  shortName: string;
  tla: string;
  crest: string | null;
  group: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export default function GroupsSearchModal({
  groups,
}: {
  groups: Record<string, TeamStanding[]>;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const teams = useMemo(() => {
    return Object.entries(groups).flatMap(([group, teams]) =>
      teams.map((team, index) => ({
        ...team,
        group,
        position: index + 1,
      }))
    );
  }, [groups]);

  const filteredTeams = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return teams.slice(0, 12);

    return teams.filter((team) => {
      const searchable = [
        team.name,
        team.shortName,
        team.tla,
        team.group,
        team.group.replace("GROUP_", "Group "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(value);
    });
  }, [teams, query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:border-emerald-400/50 hover:bg-white/[0.08]"
      >
        <Search size={18} />
        Search by country
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 py-20 backdrop-blur">
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="text-xl font-black uppercase">Search Groups</h2>
                <p className="text-sm text-slate-400">
                  Search by team, country code, or group.
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
                  placeholder="Search Canada, Brazil, Group B, ARG..."
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="max-h-[520px] space-y-3 overflow-y-auto p-5">
              {filteredTeams.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                  <p className="font-black">No teams found</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Try another team, code, or group.
                  </p>
                </div>
              ) : (
                filteredTeams.map((team) => (
                  <div
                    key={`${team.group}-${team.teamId}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-sm font-black text-slate-500">
                          {team.position}
                        </span>

                        {team.crest && (
                          <Image
                            src={team.crest}
                            alt={team.name}
                            width={34}
                            height={34}
                            className="rounded object-contain"
                          />
                        )}

                        <div>
                          <p className="font-black">{team.shortName}</p>
                          <p className="text-xs font-bold text-slate-500">
                            {team.tla}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-emerald-400">
                          {team.points} pts
                        </p>
                        <p className="text-xs font-bold uppercase text-slate-500">
                          {team.group.replace("GROUP_", "Group ")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs font-bold text-slate-400">
                      <Stat label="P" value={team.played} />
                      <Stat label="W" value={team.wins} />
                      <Stat label="D" value={team.draws} />
                      <Stat label="L" value={team.losses} />
                      <Stat
                        label="GD"
                        value={
                          team.goalDifference > 0
                            ? `+${team.goalDifference}`
                            : team.goalDifference
                        }
                      />
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

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white/[0.04] px-3 py-2">
      <p className="text-slate-500">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}